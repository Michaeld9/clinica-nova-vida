import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Pill, Bone, PersonSimpleRun, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { HeroSection } from "@/components/HeroSection";
import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";
import { CORPO_CLINICO, telefoneUrl, whatsappUrl } from "@/lib/clinica";

function ServicesBento() {
  return (
    <section id="especialidades" className="py-24 bg-zinc-50 scroll-mt-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-zinc-950 mb-4">
            Nossas Especialidades
          </h2>
          <p className="text-zinc-600 max-w-2xl text-lg">
            Estrutura completa e profissionais qualificados para cuidar de todas as etapas do seu tratamento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
          {/* Asymmetric tiles */}

          <div className="col-span-1 md:col-span-2 lg:col-span-7 bg-white rounded-3xl p-8 lg:p-12 border border-zinc-100 shadow-sm flex flex-col justify-between overflow-hidden relative">
            <div className="relative z-10 max-w-md">
              <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center mb-6">
                <Bone size={24} className="text-cyan-700" weight="fill" />
              </div>
              <h3 className="text-2xl font-medium text-zinc-950 mb-3">Ortopedia Especializada</h3>
              <p className="text-zinc-600 mb-8">
                Diagnóstico preciso e tratamento cirúrgico ou conservador para lesões ósseas, articulares e musculares.
              </p>
              <Link href="/especialidades/ortopedia" className="inline-flex items-center gap-2 text-cyan-700 font-medium hover:text-cyan-800 transition-colors">
                Saiba mais <ArrowRight size={16} />
              </Link>
            </div>
            <div className="absolute right-0 bottom-0 w-1/2 h-full hidden lg:block opacity-40 mix-blend-multiply">
              <Image
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop"
                alt="Médico analisando raio-x"
                fill
                sizes="(min-width: 1024px) 30vw, 0px"
                className="object-cover object-right"
              />
            </div>
          </div>

          <div className="col-span-1 lg:col-span-5 bg-cyan-700 text-white rounded-3xl p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-cyan-600 flex items-center justify-center mb-6">
                <PersonSimpleRun size={24} className="text-white" weight="fill" />
              </div>
              <h3 className="text-2xl font-medium mb-3">Reabilitação Esportiva</h3>
              <p className="text-cyan-50 mb-8">
                Programas específicos para atletas profissionais e amadores retornarem ao esporte com segurança e alto rendimento.
              </p>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-5 bg-zinc-100 rounded-3xl p-8 lg:p-12">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm">
              <Pill size={24} className="text-cyan-700" weight="fill" />
            </div>
            <h3 className="text-xl font-medium text-zinc-950 mb-3">Clínica de Dor</h3>
            <p className="text-zinc-600">
              Tratamento multidisciplinar focado em controle de dores crônicas, bloqueios articulares e melhoria da qualidade de vida.
            </p>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-7 bg-zinc-950 text-white rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            <div className="relative z-10 max-w-lg">
              <h3 className="text-2xl font-medium mb-3">Prevenção e Avaliação Biomecânica</h3>
              <p className="text-zinc-400 mb-8">
                Utilizamos tecnologia de ponta para analisar seus movimentos e prevenir futuras lesões, corrigindo desequilíbrios articulares.
              </p>
              <a
                href={whatsappUrl("Olá! Gostaria de agendar uma avaliação biomecânica.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-medium hover:text-cyan-400 transition-colors"
              >
                Agendar avaliação <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DoctorsSection() {
  return (
    <section id="corpo-clinico" className="py-24 bg-white scroll-mt-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-xl mb-16">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-zinc-950 mb-4">
            Profissionais de Referência
          </h2>
          <p className="text-zinc-600 text-lg">
            Nossa equipe é formada por especialistas renomados, em constante atualização técnica para oferecer os melhores protocolos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORPO_CLINICO.map((doc, idx) => (
            <FadeIn key={doc.name} inView y={24} delay={idx * 0.1} className="group">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-zinc-100">
                <Image
                  src={doc.image}
                  alt={`Retrato de ${doc.name}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500 ease-out"
                />
              </div>
              <h3 className="text-lg font-medium text-zinc-950">{doc.name}</h3>
              <p className="text-sm text-zinc-500">{doc.role}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="contato" className="py-24 bg-cyan-800 text-white border-b border-cyan-900 scroll-mt-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">
            Pronto para iniciar sua recuperação?
          </h2>
          <p className="text-cyan-100 text-lg max-w-md mb-8">
            Nossa equipe está pronta para avaliar seu caso e propor o melhor plano de tratamento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-cyan-900 px-6 py-3 rounded-full hover:bg-zinc-100 transition-colors active:scale-[0.98] font-medium"
            >
              <WhatsappLogo size={20} weight="fill" className="text-green-600" />
              Falar no WhatsApp
            </a>
            <a
              href={telefoneUrl}
              className="flex items-center justify-center gap-2 border border-cyan-600 text-white px-6 py-3 rounded-full hover:bg-cyan-700 transition-colors active:scale-[0.98]"
            >
              Ligar para a clínica
            </a>
          </div>
        </div>

        <div className="flex justify-start md:justify-end">
          <div className="bg-cyan-900 p-8 rounded-3xl max-w-sm w-full">
            <h3 className="text-xl font-medium mb-4">Horário de Atendimento</h3>
            <ul className="space-y-3 text-cyan-100">
              <li className="flex justify-between border-b border-cyan-800 pb-2">
                <span>Segunda a Sexta</span>
                <span>07:00 às 20:00</span>
              </li>
              <li className="flex justify-between border-b border-cyan-800 pb-2">
                <span>Sábados</span>
                <span>08:00 às 12:00</span>
              </li>
              <li className="flex justify-between pt-1">
                <span>Domingos e Feriados</span>
                <span className="text-cyan-400/80">Fechado</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 w-full">
      <HeroSection />
      <ServicesBento />
      <DoctorsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
