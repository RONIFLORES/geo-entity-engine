// URL do Webhook do Make criado para a Missão 2
export const MAKE_WEBHOOK_URL = "SEU_WEBHOOK_URL_DO_MAKE_AQUI";

// Dicionário de Perfis e Regras Semânticas
export const PROFILES = {
  local_comercio: {
    badgeIcon: "🏪",
    badgeText: "Comércio Local",
    labelName: "Razão Social / Nome Fantasia *",
    labelEspecialidade: "Especialidade Principal (ex: Peças Ford, Rodízio)",
    showCouncil: false,
    showFounding: true,
    showPhysicalAddress: true,
    showServiceArea: false,
    showGoogle: true,
    showIfood: true,
    subtypes: [
      { val: "AutoRepair", text: "AutoRepair (Oficina Mecânica / Auto Center)" },
      { val: "Restaurant", text: "Restaurant (Restaurante)" },
      { val: "Bakery", text: "Bakery (Padaria / Confeitaria)" },
      { val: "FoodEstablishment", text: "FoodEstablishment (Alimentação Geral)" },
      { val: "Store", text: "Store (Loja / Varejo Físico)" },
      { val: "LocalBusiness", text: "LocalBusiness (Geral)" }
    ]
  },
  prestador_servico: {
    badgeIcon: "🛠️",
    badgeText: "Prestador / Autônomo",
    labelName: "Nome do Profissional / Empresa *",
    labelEspecialidade: "Tipos de Reparo / Serviços Realizados *",
    showCouncil: false,
    showFounding: false,
    showPhysicalAddress: false,
    showServiceArea: true,
    showGoogle: true,
    showIfood: false,
    subtypes: [
      { val: "HomeAndConstructionBusiness", text: "Construção / Reparos Residenciais" },
      { val: "HousePainter", text: "HousePainter (Pintor Profissional)" },
      { val: "Electrician", text: "Electrician (Eletricista)" },
      { val: "Plumber", text: "Plumber (Encanador)" },
      { val: "ProfessionalService", text: "Prestador Geral de Serviços" }
    ]
  },
  profissional_liberal: {
    badgeIcon: "⚖️",
    badgeText: "Profissional Liberal",
    labelName: "Nome do Especialista / Consultório *",
    labelEspecialidade: "Especialidade Médica/Jurídica/Técnica *",
    showCouncil: true,
    showFounding: false,
    showPhysicalAddress: true,
    showServiceArea: false,
    showGoogle: true,
    showIfood: false,
    subtypes: [
      { val: "LegalService", text: "LegalService (Advocacia)" },
      { val: "Physician", text: "Physician (Médico / Clínica)" },
      { val: "Dentist", text: "Dentist (Odontologia)" },
      { val: "AccountingService", text: "AccountingService (Contabilidade)" },
      { val: "ProfessionalService", text: "Serviço Liberal Especializado" }
    ]
  },
  especialista_digital: {
    badgeIcon: "💡",
    badgeText: "Especialista Digital",
    labelName: "Nome da Marca / Especialista *",
    labelEspecialidade: "Tópicos de Domínio / Nicho (knowsAbout) *",
    showCouncil: false,
    showFounding: false,
    showPhysicalAddress: false,
    showServiceArea: true,
    showGoogle: false,
    showIfood: false,
    subtypes: [
      { val: "Person", text: "Person (Consultor, Mentor, Estrategista)" },
      { val: "EducationalOrganization", text: "Mentoria / Treinamentos Online" },
      { val: "OnlineStore", text: "Loja Virtual / E-commerce" },
      { val: "Organization", text: "Organização / Agência Digital" }
    ]
  }
};
