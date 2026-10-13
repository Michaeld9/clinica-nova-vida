"use client";

import { useRef } from "react";
import { useScroll } from "motion/react";
import { CalendarPlus } from "@phosphor-icons/react";
import { FadeIn } from "@/components/FadeIn";
import { useScrubVideo, type ScrubVideoSources } from "@/hooks/useScrubVideo";
import { whatsappUrl } from "@/lib/clinica";

// Os vídeos são H.264 all-intra (todo quadro é keyframe) a 12 fps, sem áudio.
// Se reencodar com outro frame rate, atualize VIDEO_FPS.
const VIDEO_FPS = 12;
const VIDEO_SOURCES: ScrubVideoSources = {
  portrait: "/movimentos-mobile.mp4", // recorte 9:16 centrado no paciente
  landscape: "/movimentos.mp4",
};

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const { isStatic } = useScrubVideo({
    videoRef,
    progress: scrollYProgress,
    sources: VIDEO_SOURCES,
    fps: VIDEO_FPS,
  });

  return (
    <section
      ref={containerRef}
      // Sem vídeo (reduced motion / economia de dados) não há o que "rolar": a seção vira uma tela só.
      className={`relative w-full bg-zinc-950 ${isStatic ? "h-[100dvh]" : "h-[250vh] motion-reduce:h-[100dvh]"}`}
    >
      <div className="sticky top-0 h-[100dvh] w-full flex items-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full" aria-hidden="true">
          {/* Poster com direção de arte: aparece enquanto o vídeo carrega (o <video> sem dados é transparente) */}
          <picture>
            <source media="(orientation: portrait)" srcSet="/movimentos-poster-mobile.webp" />
            {/* eslint-disable-next-line @next/next/no-img-element -- art direction por orientação; next/image não cobre */}
            <img
              src="/movimentos-poster.webp"
              alt=""
              fetchPriority="high"
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
          {/* Overlay para legibilidade: no retrato o texto ocupa a largura toda */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/50 to-transparent portrait:bg-gradient-to-t portrait:from-zinc-950/95 portrait:via-zinc-950/70 portrait:to-zinc-950/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex items-center">
          <div className="max-w-2xl">
            <FadeIn>
              <span className="text-sm font-semibold tracking-wide text-cyan-400 uppercase mb-4 block">
                Reabilitação Avançada
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-white leading-[1.05] mb-6">
                Recupere seus movimentos com especialistas.
              </h1>
              <p className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-[55ch] mb-8">
                Atendimento ortopédico e fisioterapêutico focado na sua qualidade de vida. Diagnóstico preciso e tratamento humanizado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-full hover:bg-cyan-500 transition-colors active:scale-[0.98]"
                >
                  <CalendarPlus weight="bold" />
                  Agendar Consulta
                </a>
                <a
                  href="#corpo-clinico"
                  className="flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-3 rounded-full hover:bg-white/20 transition-colors active:scale-[0.98]"
                >
                  Conhecer Corpo Clínico
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
