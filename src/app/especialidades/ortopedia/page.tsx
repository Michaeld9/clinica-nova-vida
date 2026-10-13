import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  CalendarPlus,
  CaretDown,
  CaretRight,
  HandHeart,
  PersonSimpleWalk,
  Phone,
  Scan,
} from "@phosphor-icons/react/dist/ssr";
import { AreasAtuacao } from "@/components/AreasAtuacao";
import { RaioXScroll } from "@/components/RaioXScroll";
import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";
import { CLINICA, CORPO_CLINICO, telefoneUrl, whatsappUrl } from "@/lib/clinica";

export const metadata: Metadata = {
  title: "Ortopedia Especializada | Clínica Nova Vida",
  description:
    "Diagnóstico de alta precisão e tratamento cirúrgico e conservador para joelho, quadril, ombro, cotovelo e coluna.",
};

const MENSAGEM_AGENDAMENTO = "Olá! Gostaria de agendar uma avaliação ortopédica.";

// Um único rótulo para a intenção "agendar" em toda a página
function BotaoAgendar({ variante = "cyan" }: { variante?: "cyan" | "claro" }) {
  const estilo =
    variante === "cyan"
      ? "bg-cyan-700 text-white hover:bg-cyan-800"
      : "bg-zinc-50 text-cyan-900 hover:bg-white";
  return (
    <a
      href={whatsappUrl(MENSAGEM_AGENDAMENTO)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-3.5 font-medium transition-[background-color,transform] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2 ${estilo}`}
    >
      <CalendarPlus size={20} weight="bold" aria-hidden="true" />
      Agendar avaliação
    </a>
  );
}

const ABORDAGEM = {
  imagem: {
    titulo: "Exames de imagem na própria clínica",
    texto: "Raio-x e ultrassom feitos aqui mesmo, para que o diagnóstico não dependa de outro agendamento.",
  },
  fisioterapia: {
    titulo: "Fisioterapia no mesmo endereço",
    texto: "Do consultório para a reabilitação sem trocar de lugar, com médico e fisioterapeuta discutindo o seu caso.",
  },
  conservador: {
    titulo: "Cirurgia só quando é a melhor opção",
    texto: "Começamos pelo tratamento conservador sempre que as evidências mostram que ele é seguro e eficaz para você.",
  },
};

const PERGUNTAS = [
  {
    pergunta: "Preciso de encaminhamento médico?",
    resposta: "Não. Você pode agendar a consulta diretamente com nossos especialistas para a avaliação inicial.",
  },
  {
    pergunta: "Quais convênios são aceitos?",
    resposta:
      "Atendemos os principais planos de saúde em regime de reembolso e credenciamento direto. Entre em contato para consultar o seu.",
  },
  {
    pergunta: "Toda lesão ortopédica precisa de cirurgia?",
    resposta:
      "Não. Sempre que as evidências indicam segurança e eficácia, começamos pelo tratamento conservador. Quando a cirurgia é indicada, o motivo é explicado e discutido com você.",
  },
  {
    pergunta: "O que levar na primeira consulta?",
    resposta:
      "Documento com foto, carteirinha do convênio (se houver), exames de imagem anteriores e a lista dos medicamentos que você usa.",
  },
];

const ortopedistas = CORPO_CLINICO.filter((p) => p.ortopedia);

export default function OrtopediaPage() {
  return (
    <main className="min-h-[100dvh] w-full bg-zinc-50">
      {/* Hero: só texto; o vídeo logo abaixo faz o papel de visual principal */}
      <section className="max-w-7xl mx-auto px-6 pt-6 pb-4 lg:pb-6">
        <header className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-lg font-medium tracking-tight text-zinc-950 hover:text-cyan-700 transition-colors"
          >
            {CLINICA.nome}
          </Link>
          <a
            href={telefoneUrl}
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-cyan-700 transition-colors"
          >
            <Phone size={18} aria-hidden="true" />
            <span className="hidden sm:inline">Ligar para a clínica</span>
            <span className="sm:hidden">Ligar</span>
          </a>
        </header>

        <FadeIn className="mt-8 lg:mt-12">
          <nav aria-label="Trilha de navegação" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-zinc-500">
              <li>
                <Link href="/" className="hover:text-cyan-700 transition-colors">
                  Início
                </Link>
              </li>
              <li aria-hidden="true">
                <CaretRight size={12} />
              </li>
              <li>
                <Link href="/#especialidades" className="hover:text-cyan-700 transition-colors">
                  Especialidades
                </Link>
              </li>
              <li aria-hidden="true">
                <CaretRight size={12} />
              </li>
              <li aria-current="page" className="text-zinc-950 font-medium">
                Ortopedia
              </li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-zinc-950 leading-[1.02] text-balance max-w-[22ch]">
            Ortopedia para joelho, quadril, ombro e coluna.
          </h1>
          <div className="mt-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <p className="text-lg text-zinc-600 leading-relaxed max-w-[46ch]">
              Diagnóstico preciso, tratamento conservador sempre que possível e cirurgia quando ela realmente é indicada.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <BotaoAgendar />
              <a
                href="#areas"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-zinc-300 px-7 py-3.5 font-medium text-zinc-800 hover:border-zinc-400 hover:bg-zinc-100 transition-colors active:scale-[0.98]"
              >
                Ver áreas de atuação
                <ArrowDown size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Do movimento à articulação: vídeo controlado pelo scroll */}
      <RaioXScroll />

      {/* Áreas de atuação */}
      <section id="areas" className="bg-white py-20 lg:py-28 scroll-mt-4">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn inView className="mb-12 lg:mb-16 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-zinc-950 leading-[1.1] mb-4">
              Onde atuamos
            </h2>
            <p className="text-lg text-zinc-600 leading-relaxed max-w-[55ch]">
              Cada região do corpo é acompanhada por um subespecialista dedicado a ela.
            </p>
          </FadeIn>
          <FadeIn inView delay={0.1}>
            <AreasAtuacao />
          </FadeIn>
        </div>
      </section>

      {/* Abordagem: bento 1 grande + 2 menores */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn inView className="mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-zinc-950 leading-[1.1] max-w-[22ch]">
              Do diagnóstico à reabilitação, no mesmo lugar
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-2 gap-4">
            <FadeIn
              inView
              className="lg:col-span-7 lg:row-span-2 rounded-3xl bg-zinc-100 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[16/10] lg:aspect-auto lg:flex-1 lg:min-h-[320px]">
                <Image
                  src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1400&auto=format&fit=crop"
                  alt="Radiografia de uma mão exibida em um painel iluminado"
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover object-[50%_45%]"
                />
              </div>
              <div className="p-8 lg:p-10">
                <Scan size={28} className="text-cyan-700 mb-4" aria-hidden="true" />
                <h3 className="text-2xl font-medium tracking-tight text-zinc-950 mb-2">{ABORDAGEM.imagem.titulo}</h3>
                <p className="text-zinc-600 leading-relaxed max-w-[48ch]">{ABORDAGEM.imagem.texto}</p>
              </div>
            </FadeIn>

            <FadeIn
              inView
              delay={0.08}
              className="lg:col-span-5 rounded-3xl bg-cyan-700 text-white p-8 lg:p-10 flex flex-col justify-between gap-10"
            >
              <PersonSimpleWalk size={32} className="text-cyan-100" aria-hidden="true" />
              <div>
                <h3 className="text-2xl font-medium tracking-tight mb-2">{ABORDAGEM.fisioterapia.titulo}</h3>
                <p className="text-cyan-50 leading-relaxed">{ABORDAGEM.fisioterapia.texto}</p>
              </div>
            </FadeIn>

            <FadeIn
              inView
              delay={0.16}
              className="lg:col-span-5 rounded-3xl bg-white border border-zinc-200 p-8 lg:p-10 flex flex-col justify-between gap-10"
            >
              <HandHeart size={32} className="text-cyan-700" aria-hidden="true" />
              <div>
                <h3 className="text-2xl font-medium tracking-tight text-zinc-950 mb-2">
                  {ABORDAGEM.conservador.titulo}
                </h3>
                <p className="text-zinc-600 leading-relaxed">{ABORDAGEM.conservador.texto}</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Quem atende */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn inView>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-zinc-950 leading-[1.1] mb-12 lg:mb-16">
              Quem vai te atender
            </h2>
          </FadeIn>
          {/* TODO: incluir os retratos reais dos ortopedistas (e o CRM de cada um) quando estiverem disponíveis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
            {ortopedistas.map((p, i) => (
              <FadeIn key={p.name} inView delay={i * 0.1} className="border-t border-zinc-300 pt-6">
                <p className="text-sm font-medium text-cyan-700 mb-2">{p.role}</p>
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-zinc-950">{p.name}</h3>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Dúvidas frequentes */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <FadeIn inView className="lg:col-span-4">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-zinc-950 leading-[1.1] mb-4">
              Dúvidas frequentes
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Não encontrou a sua? A recepção responde por telefone.
            </p>
            <a
              href={telefoneUrl}
              className="mt-4 inline-flex items-center gap-2 font-medium text-cyan-700 hover:text-cyan-800 transition-colors"
            >
              <Phone size={18} aria-hidden="true" />
              Ligar para a clínica
            </a>
          </FadeIn>

          <FadeIn inView delay={0.1} className="lg:col-span-8 divide-y divide-zinc-200 border-y border-zinc-200">
            {PERGUNTAS.map((item) => (
              <details key={item.pergunta} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium text-zinc-950 hover:text-cyan-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 rounded-lg [&::-webkit-details-marker]:hidden">
                  {item.pergunta}
                  <CaretDown
                    size={20}
                    aria-hidden="true"
                    className="shrink-0 text-zinc-500 transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <p className="pb-6 -mt-1 text-zinc-600 leading-relaxed max-w-[65ch]">{item.resposta}</p>
              </details>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* Chamada final */}
      <section className="px-6 pb-20 lg:pb-28">
        <FadeIn
          inView
          className="max-w-7xl mx-auto rounded-3xl bg-cyan-800 overflow-hidden grid grid-cols-1 md:grid-cols-2"
        >
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-white leading-[1.1] mb-4 text-balance">
              Dor que não passa merece uma avaliação.
            </h2>
            <p className="text-cyan-100 text-lg leading-relaxed mb-8 max-w-[42ch]">
              Conte o que está sentindo pelo WhatsApp e marcamos o melhor horário com o especialista.
            </p>
            <div>
              <BotaoAgendar variante="claro" />
            </div>
          </div>
          <div className="relative min-h-[260px] md:min-h-[420px]">
            <Image
              src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=1200&auto=format&fit=crop"
              alt="Médica conversando com uma paciente durante a consulta"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </FadeIn>
      </section>

      <Footer />
    </main>
  );
}
