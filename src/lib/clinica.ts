// Dados institucionais centralizados.
// TODO: substituir pelos dados reais antes de publicar (exigência do CFM:
// nome e CRM do responsável técnico devem ser verdadeiros).
export const CLINICA = {
  nome: "Clínica Nova Vida",
  whatsapp: "5511999999999", // DDI + DDD + número, só dígitos
  telefone: "+551130000000",
  endereco: {
    linha1: "Av. Paulista, 1000, Cj. 45",
    linha2: "Bela Vista, São Paulo, SP",
  },
  responsavelTecnico: {
    nome: "Dr. Carlos Eduardo",
    crm: "CRM-SP 123456",
  },
} as const;

// TODO: substituir pelos profissionais e fotos reais (as imagens atuais são placeholders do picsum).
export const CORPO_CLINICO = [
  {
    name: "Dr. Carlos Eduardo",
    role: "Ortopedista Cirurgião do Joelho",
    image: "https://picsum.photos/seed/doctor-carlos-modern/400/500",
    ortopedia: true,
  },
  {
    name: "Dra. Mariana Alves",
    role: "Fisioterapeuta Chefe",
    image: "https://picsum.photos/seed/physiotherapist-mariana/400/500",
    ortopedia: false,
  },
  {
    name: "Dr. Roberto Silva",
    role: "Especialista em Coluna",
    image: "https://picsum.photos/seed/doctor-roberto-spine/400/500",
    ortopedia: true,
  },
  {
    name: "Dra. Camila Costa",
    role: "Especialista em Dor",
    image: "https://picsum.photos/seed/doctor-camila-pain/400/500",
    ortopedia: false,
  },
] as const;

export function whatsappUrl(mensagem = "Olá! Gostaria de agendar uma consulta.") {
  return `https://wa.me/${CLINICA.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export const telefoneUrl = `tel:${CLINICA.telefone}`;

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
