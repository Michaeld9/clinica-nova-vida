"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { EASE_OUT } from "@/lib/clinica";

const AREAS = [
  {
    nome: "Joelho e quadril",
    resumo:
      "Artrose e lesões de menisco e ligamentos, com técnicas minimamente invasivas e próteses articulares quando indicadas.",
    condicoes: ["Artrose", "Lesão meniscal", "Reconstrução de ligamentos", "Próteses articulares"],
    imagem: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=1400&auto=format&fit=crop",
    alt: "Grupo de pessoas correndo ao ar livre em um dia ensolarado",
  },
  {
    nome: "Ombro e cotovelo",
    resumo:
      "Tendinites, luxações e lesões do manguito rotador, com artroscopia para os casos que precisam de cirurgia.",
    condicoes: ["Tendinite", "Luxação", "Manguito rotador", "Artroscopia"],
    imagem: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=1400&auto=format&fit=crop",
    alt: "Pessoa treinando com cordas de batalha em um galpão",
  },
  {
    nome: "Coluna vertebral",
    resumo: "Hérnia de disco, desvios posturais e dores crônicas nas regiões lombar e cervical.",
    condicoes: ["Hérnia de disco", "Desvios posturais", "Dor lombar", "Dor cervical"],
    imagem: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1400&auto=format&fit=crop",
    alt: "Fisioterapeuta fazendo terapia manual na região lombar de uma paciente",
  },
] as const;

export function AreasAtuacao() {
  const [ativa, setAtiva] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const area = AREAS[ativa];

  // Navegação por setas entre as abas (padrão WAI-ARIA Tabs)
  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const passo = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    let proxima: number | undefined;
    if (passo !== undefined) proxima = (i + passo + AREAS.length) % AREAS.length;
    else if (e.key === "Home") proxima = 0;
    else if (e.key === "End") proxima = AREAS.length - 1;
    if (proxima === undefined) return;
    e.preventDefault();
    setAtiva(proxima);
    tabsRef.current[proxima]?.focus();
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      <div
        role="tablist"
        aria-label="Regiões do corpo"
        className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto snap-x -mx-6 px-6 lg:mx-0 lg:px-0 pb-1 lg:pb-0"
      >
        {AREAS.map((a, i) => {
          const selecionada = i === ativa;
          return (
            <button
              key={a.nome}
              ref={(el) => {
                tabsRef.current[i] = el;
              }}
              id={`${baseId}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={selecionada}
              aria-controls={`${baseId}-painel`}
              tabIndex={selecionada ? 0 : -1}
              onClick={() => setAtiva(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`group snap-start shrink-0 flex items-center justify-between gap-4 rounded-full lg:rounded-3xl px-5 py-3 lg:px-6 lg:py-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2 ${
                selecionada
                  ? "bg-zinc-950 text-zinc-50"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-950"
              }`}
            >
              <span className="text-base lg:text-2xl font-medium tracking-tight whitespace-nowrap">{a.nome}</span>
              <ArrowRight
                size={20}
                aria-hidden="true"
                className={`hidden lg:block shrink-0 transition-transform duration-300 ${
                  selecionada ? "translate-x-0 text-cyan-400" : "-translate-x-1 opacity-0 group-hover:opacity-60"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-painel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${ativa}`}
        tabIndex={0}
        className="lg:col-span-8 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-4"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={area.nome}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8"
          >
            <div className="md:col-span-3 relative aspect-[4/3] md:aspect-auto md:min-h-[380px] rounded-3xl overflow-hidden bg-zinc-200">
              <Image
                src={area.imagem}
                alt={area.alt}
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="md:col-span-2 flex flex-col justify-end">
              <h3 className="text-2xl font-medium tracking-tight text-zinc-950 mb-3">{area.nome}</h3>
              <p className="text-zinc-600 leading-relaxed mb-6">{area.resumo}</p>
              <ul className="flex flex-wrap gap-2" aria-label={`Condições tratadas em ${area.nome.toLowerCase()}`}>
                {area.condicoes.map((c) => (
                  <li key={c} className="rounded-full border border-zinc-300 px-3.5 py-1.5 text-sm text-zinc-700">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
