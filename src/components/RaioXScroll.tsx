"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useScrubVideo, type ScrubVideoSources } from "@/hooks/useScrubVideo";

// H.264 all-intra (todo quadro é keyframe) a 12 fps, sem áudio, 120 quadros.
// O recorte de retrato é 9:16 centrado em 55% da largura, onde fica o joelho.
const VIDEO_FPS = 12;
const VIDEO_SOURCES: ScrubVideoSources = {
  portrait: "/raio-x-joelho-mobile.mp4",
  landscape: "/raio-x-joelho.mp4",
};

// Cada frase acompanha um trecho do vídeo: corredor (0 a 3 s), mergulho no joelho (3 a 6 s), anatomia com legendas (6 a 10 s).
const ETAPAS = [
  {
    titulo: "Cada passo passa pelo joelho.",
    texto: "Correr, subir escadas e agachar dependem de uma articulação estável.",
    de: 0,
    ate: 0.3,
  },
  {
    titulo: "Por dentro, tudo trabalha junto.",
    texto: "Fêmur, tíbia e patela deslizam sobre a cartilagem, guiados pelos ligamentos.",
    de: 0.3,
    ate: 0.62,
  },
  {
    titulo: "É ali que a avaliação começa.",
    texto: "Exame físico e de imagem mostram qual estrutura está causando a dor.",
    de: 0.62,
    ate: 1,
  },
] as const;

const FADE = 0.04;

function Etapa({
  etapa,
  progress,
  isStatic,
}: {
  etapa: (typeof ETAPAS)[number];
  progress: MotionValue<number>;
  isStatic: boolean;
}) {
  const { de, ate } = etapa;
  // 0 = fora do trecho, 1 = trecho atual
  const ativa = useTransform(
    progress,
    de === 0 ? [0, ate - FADE, ate] : ate === 1 ? [de - FADE, de, 1] : [de - FADE, de, ate - FADE, ate],
    de === 0 ? [1, 1, 0] : ate === 1 ? [0, 1, 1] : [0, 1, 1, 0],
  );

  return (
    <motion.li
      // No celular só a frase atual aparece; no desktop as três ficam visíveis e a atual se destaca.
      // Sem vídeo (reduced motion), --ativa fica indefinida e a opacidade volta ao padrão: tudo visível.
      style={isStatic ? undefined : ({ "--ativa": ativa } as unknown as CSSProperties)}
      className={
        isStatic
          ? undefined
          : "[grid-area:etapa] md:[grid-area:auto] motion-reduce:[grid-area:auto] opacity-[var(--ativa)] md:opacity-[calc(0.3_+_0.7*var(--ativa))] motion-reduce:!opacity-100"
      }
    >
      <h3 className="text-xl md:text-2xl font-medium tracking-tight text-zinc-950 mb-1.5 text-balance">
        {etapa.titulo}
      </h3>
      <p className="text-zinc-600 leading-relaxed max-w-[42ch]">{etapa.texto}</p>
    </motion.li>
  );
}

export function RaioXScroll() {
  const trackRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const { isStatic } = useScrubVideo({
    videoRef,
    progress: scrollYProgress,
    sources: VIDEO_SOURCES,
    fps: VIDEO_FPS,
    lazy: true,
  });

  return (
    <section
      ref={trackRef}
      aria-labelledby="raio-x-titulo"
      // Sem vídeo não há o que "rolar": a seção vira uma tela só.
      className={`relative w-full ${isStatic ? "" : "h-[260vh] motion-reduce:h-auto"}`}
    >
      <div
        className={`flex flex-col gap-6 px-6 py-6 ${
          isStatic ? "min-h-[100dvh]" : "sticky top-0 h-[100dvh] motion-reduce:static motion-reduce:h-auto motion-reduce:min-h-[100dvh]"
        }`}
      >
        <h2 id="raio-x-titulo" className="sr-only">
          Por dentro do joelho
        </h2>

        {/* Tela na horizontal: o cartão fica em 16:9 exato (o vídeo inteiro aparece, sem cortar as legendas)
            e é dimensionado pelo espaço livre, via container query units. Em pé, preenche a área com o recorte 9:16. */}
        <div className="w-full max-w-7xl mx-auto flex-1 min-h-[50dvh] landscape:min-h-0 landscape:[container-type:size] landscape:flex landscape:items-center landscape:justify-center">
          <div
            className="relative w-full h-full landscape:h-auto landscape:aspect-video landscape:w-[min(100cqw,calc(100cqh*16/9))] rounded-3xl overflow-hidden bg-zinc-900"
            aria-hidden="true"
          >
            {/* Poster: aparece enquanto o vídeo carrega (o <video> sem dados é transparente) */}
            <picture>
              <source media="(orientation: portrait)" srcSet="/raio-x-joelho-poster-mobile.webp" />
              {/* eslint-disable-next-line @next/next/no-img-element -- art direction por orientação; next/image não cobre */}
              <img
                src="/raio-x-joelho-poster.webp"
                alt=""
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </picture>
            {!isStatic && (
              // A fonte é escolhida e carregada (como Blob) por useScrubVideo; sem src no HTML não há download duplo.
              <video
                ref={videoRef}
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                disableRemotePlayback
                className="absolute inset-0 w-full h-full object-cover motion-reduce:hidden"
              />
            )}
          </div>
        </div>

        <ol
          className={`w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 ${
            isStatic ? "" : "[grid-template-areas:'etapa'] md:[grid-template-areas:none] motion-reduce:[grid-template-areas:none]"
          }`}
        >
          {ETAPAS.map((etapa) => (
            <Etapa key={etapa.titulo} etapa={etapa} progress={scrollYProgress} isStatic={isStatic} />
          ))}
        </ol>
      </div>
    </section>
  );
}
