import Link from "next/link";
import { CLINICA } from "@/lib/clinica";

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-white text-lg font-medium mb-4">{CLINICA.nome}</h2>
          <p className="text-sm">Excelência em Ortopedia e Fisioterapia Integrada.</p>
        </div>
        <div>
          <h3 className="text-white mb-4 font-medium">Especialidades</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/especialidades/ortopedia" className="hover:text-white transition-colors">Ortopedia Especializada</Link></li>
            <li><Link href="/#especialidades" className="hover:text-white transition-colors">Reabilitação Esportiva</Link></li>
            <li><Link href="/#especialidades" className="hover:text-white transition-colors">Clínica de Dor</Link></li>
            <li><Link href="/#especialidades" className="hover:text-white transition-colors">Avaliação Biomecânica</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white mb-4 font-medium">Clínica</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/#corpo-clinico" className="hover:text-white transition-colors">Corpo Clínico</Link></li>
            <li><Link href="/#contato" className="hover:text-white transition-colors">Horários e Contato</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white mb-4 font-medium">Endereço</h3>
          <address className="not-italic">
            <p className="text-sm mb-2">{CLINICA.endereco.linha1}</p>
            <p className="text-sm mb-4">{CLINICA.endereco.linha2}</p>
          </address>
          <p className="text-sm">RT: {CLINICA.responsavelTecnico.nome}</p>
          <p className="text-sm">{CLINICA.responsavelTecnico.crm}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-zinc-900 text-xs flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} {CLINICA.nome}. Todos os direitos reservados.</p>
        {/* TODO: adicionar links para Política de Privacidade e Termos de Uso quando as páginas existirem */}
      </div>
    </footer>
  );
}
