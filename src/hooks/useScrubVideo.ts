"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useMotionValueEvent, type MotionValue } from "motion/react";

/** MP4 H.264 all-intra. (VP9 all-intra foi medido pior: menos qualidade por byte e seek mais lento no Chrome.) */
export type ScrubVideoSources = {
  /** Usado quando a tela está em pé (celulares, tablets em retrato). */
  portrait: string;
  landscape: string;
};

type Options = {
  videoRef: RefObject<HTMLVideoElement>;
  /** Progresso do scroll de 0 a 1 (ex.: `useScroll().scrollYProgress`). */
  progress: MotionValue<number>;
  sources: ScrubVideoSources;
  /** Frame rate com que os arquivos foram codificados. */
  fps: number;
  /** Constante de tempo da suavização, em ms. 0 desliga. */
  smoothingMs?: number;
  /** Só baixa o vídeo quando ele se aproxima da viewport (para vídeos abaixo da dobra). */
  lazy?: boolean;
};

const PORTRAIT = "(orientation: portrait)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

/** Sem vídeo para quem pediu menos movimento ou está economizando dados. */
function shouldStayStatic() {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  return (
    window.matchMedia(REDUCED_MOTION).matches ||
    connection?.saveData === true ||
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g"
  );
}

function pickSource(sources: ScrubVideoSources) {
  return window.matchMedia(PORTRAIT).matches ? sources.portrait : sources.landscape;
}

/**
 * Liga o `currentTime` de um <video> ao progresso do scroll.
 *
 * - Baixa o arquivo inteiro como Blob: todo quadro fica em memória e nenhum seek espera a rede.
 * - Um rAF aproxima o quadro exibido do alvo com suavização exponencial (scroll de mouse vira
 *   uma sequência de quadros em vez de um salto) e só pede um novo seek quando o anterior terminou.
 * - Retorna `isStatic` quando o vídeo não deve ser carregado (reduced motion / economia de dados).
 */
export function useScrubVideo({ videoRef, progress, sources, fps, smoothingMs = 80, lazy = false }: Options) {
  const [isStatic, setIsStatic] = useState(false);
  const anim = useRef({ target: 0, current: 0, lastFrame: -1, raf: 0, lastTs: 0 });

  const tick = (ts: number) => {
    const s = anim.current;
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
      s.raf = 0;
      return;
    }

    const dt = s.lastTs ? ts - s.lastTs : 16;
    s.lastTs = ts;
    const k = smoothingMs > 0 ? 1 - Math.exp(-dt / smoothingMs) : 1;
    s.current += (s.target - s.current) * k;
    if (Math.abs(s.target - s.current) < 0.0005) s.current = s.target;

    const totalFrames = Math.round(video.duration * fps);
    const frame = Math.min(totalFrames - 1, Math.max(0, Math.floor(s.current * totalFrames)));

    // Um seek por vez: enquanto o navegador decodifica, o loop só espera o próximo rAF.
    if (frame !== s.lastFrame && !video.seeking) {
      s.lastFrame = frame;
      // Meio do quadro, para não cair no anterior por arredondamento.
      video.currentTime = (frame + 0.5) / fps;
    }

    if (s.current !== s.target || frame !== s.lastFrame) {
      s.raf = requestAnimationFrame(tick);
    } else {
      s.raf = 0;
      s.lastTs = 0;
    }
  };

  const kick = () => {
    if (!anim.current.raf) anim.current.raf = requestAnimationFrame(tick);
  };

  /** Pula direto para a posição atual, sem suavizar (carregamento, reload no meio da página). */
  const jumpToScroll = () => {
    const s = anim.current;
    s.target = s.current = progress.get();
    s.lastFrame = -1;
    kick();
  };

  useMotionValueEvent(progress, "change", (value) => {
    anim.current.target = value;
    kick();
  });

  useEffect(() => {
    if (shouldStayStatic()) {
      setIsStatic(true);
      return;
    }
    const video = videoRef.current;
    if (!video) return;
    const s = anim.current;

    let controller: AbortController | undefined;
    let objectUrl: string | undefined;

    const load = async (url: string) => {
      controller?.abort();
      controller = new AbortController();
      const { signal } = controller;
      try {
        const response = await fetch(url, { signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const blob = await response.blob();
        if (signal.aborted) return;
        if (objectUrl) URL.revokeObjectURL(objectUrl);
        objectUrl = URL.createObjectURL(blob);
        video.src = objectUrl;
      } catch {
        if (signal.aborted) return;
        video.src = url; // fallback: download progressivo
      }
      // iOS Safari só pinta quadros de um vídeo que já foi reproduzido uma vez.
      video
        .play()
        .then(() => {
          video.pause();
          jumpToScroll();
        })
        .catch(() => {
          // Autoplay bloqueado (ex.: modo de economia de energia): o poster continua visível.
        });
    };

    const onLoadedMetadata = () => jumpToScroll();
    // Girar o aparelho troca o recorte (retrato ↔ paisagem).
    const orientation = window.matchMedia(PORTRAIT);
    const onOrientationChange = () => load(pickSource(sources));

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    orientation.addEventListener("change", onOrientationChange);

    // Abaixo da dobra: começa a baixar uma tela antes de a seção aparecer.
    let observer: IntersectionObserver | undefined;
    if (lazy && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          observer?.disconnect();
          load(pickSource(sources));
        },
        { rootMargin: "100% 0px" },
      );
      observer.observe(video);
    } else {
      load(pickSource(sources));
    }

    return () => {
      observer?.disconnect();
      controller?.abort();
      cancelAnimationFrame(s.raf);
      s.raf = 0;
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      orientation.removeEventListener("change", onOrientationChange);
      video.removeAttribute("src");
      video.load();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
    // Fontes e fps são constantes do componente; o efeito roda uma vez.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isStatic };
}
