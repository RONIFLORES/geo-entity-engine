/**
 * ============================================================================
 * GEO ENTITY ENGINE (APP 1A) - DICIONÁRIO CENTRAL & MATRIZ SEMÂNTICA
 * Mockers e Placeholders 100% Fictícios e Isolados (Regra Omitir = 0)
 * Calibragem de Caracteres Expandida em +50% para Máxima Densidade Semântica
 * ============================================================================
 */

export const API_CONFIG = {
  ENABLE_AI_TRANSLATION: false,
  AI_PROVIDER: "gemini",
  GEMINI_API_KEY: "",
  OPENAI_API_KEY: "",
  MAKE_WEBHOOK_URL: "SEU_WEBHOOK_URL_DO_MAKE_AQUI",
  APP_1B_REDIRECT_URL: "#construtor-de-site",
  STORAGE_PREFIX: "geo_entity_engine_v2_"
};

export const MAKE_WEBHOOK_URL = API_CONFIG.MAKE_WEBHOOK_URL;

export const BRAZIL_STATES = [
  { val: "AC", text: "Acre (AC)" }, { val: "AL", text: "Alagoas (AL)" },
  { val: "AP", text: "Amapá (AP)" }, { val: "AM", text: "Amazonas (AM)" },
  { val: "BA", text: "Bahia (BA)" }, { val: "CE", text: "Ceará (CE)" },
  { val: "DF", text: "Distrito Federal (DF)" }, { val: "ES", text: "Espírito Santo (ES)" },
  { val: "GO", text: "Goiás (GO)" }, { val: "MA", text: "Maranhão (MA)" },
  { val: "MT", text: "Mato Grosso (MT)" }, { val: "MS", text: "Mato Grosso do Sul (MS)" },
  { val: "MG", text: "Minas Gerais (MG)" }, { val: "PA", text: "Pará (PA)" },
  { val: "PB", text: "Paraíba (PB)" }, { val: "PR", text: "Paraná (PR)" },
  { val: "PE", text: "Pernambuco (PE)" }, { val: "PI", text: "Piauí (PI)" },
  { val: "RJ", text: "Rio de Janeiro (RJ)" }, { val: "RN", text: "Rio Grande do Norte (RN)" },
  { val: "RS", text: "Rio Grande do Sul (RS)" }, { val: "RO", text: "Rondônia (RO)" },
  { val: "RR", text: "Roraima (RR)" }, { val: "SC", text: "Santa Catarina (SC)" },
  { val: "SP", text: "São Paulo (SP)" }, { val: "SE", text: "Sergipe (SE)" },
  { val: "TO", text: "Tocantins (TO)" }
];

export const DAYS_OF_WEEK = [
  { id: "Monday", label: "Segunda-feira", short: "Seg" },
  { id: "Tuesday", label: "Terça-feira", short: "Ter" },
  { id: "Wednesday", label: "Quarta-feira", short: "Qua" },
  { id: "Thursday", label: "Quinta-feira", short: "Qui" },
  { id: "Friday", label: "Sexta-feira", short: "Sex" },
  { id: "Saturday", label: "Sábado", short: "Sáb" },
  { id: "Sunday", label: "Domingo", short: "Dom" }
];

export function generateYearsList(maxYearsBack = 200, finalLabel = "Mais de 200 anos (Tradição secular)") {
  const currentYear = 2026;
  const years = [];
  for (let i = 0; i <= maxYearsBack; i++) {
    const year = currentYear - i;
    years.push({
      val: String(year),
      text: `${year} (${i === 0 ? "Início neste ano" : i + (i === 1 ? " ano de atividade" : " anos de atividade")})`
    });
  }
  years.push({ val: finalLabel, text: finalLabel });
  return years;
}

export const MENTORSHIP_CONTROL = {
  id: "mentorship_control",
  title: "Identificação do Aluno / Operador da Mentoria *",
  badge: "Uso Operacional Interno",
  infoTooltip: "Estes dados são de uso estritamente operacional da mentoria e gestão do aplicativo. Eles não entram na compilação do código Schema.org / JSON-LD público e não afetam a indexação do seu cliente.",
  fields: [
    {
      id: "mentor_student_name",
      label: "Nome Completo do Aluno / Mentorado *",
      type: "text",
      required: true,
      placeholder: "Ex: Aluno Teste - Turma Alfa",
      tooltip: "Nome do operador responsável pelo preenchimento."
    },
    {
      id: "mentor_student_email",
      label: "E-mail do Aluno / Mentorado *",
      type: "email",
      required: true,
      placeholder: "Ex: operador@exemplo.com.br",
      tooltip: "E-mail para envio do pacote técnico."
    },
    {
      id: "mentor_student_code",
      label: "Código do Aluno / ID da Mentoria *",
      type: "text",
      required: true,
      placeholder: "Ex: GEO-2026-TURMA01",
      tooltip: "Identificador único da mentoria."
    }
  ]
};

export const PROFILES = {
  local_comercio: {
    id: "local_comercio",
    storageKey: "geo_engine_local_business",
    badgeIcon: "🏪",
    badgeText: "Comércio Local",
    cardTitle: "Comércio & Negócio Local Físico",
    cardDescription: "Oficinas, restaurantes, padarias, lojas, farmácias e academias com atendimento presencial.",
    defaultSchemaType: "LocalBusiness",
    submitButtonText: "Revisar Dados & Auditar com IA →",
    steps: [
      {
        stepNumber: 1,
        id: "bloco_01_identidade",
        title: "BLOCO 01: IDENTIDADE DA ENTIDADE INSTITUCIONAL",
        subtitle: "Foco na Pessoa Jurídica / Marca comercial.",
        fields: [
          {
            id: "ramo_atuacao",
            label: "1. Ramo de Atuação do Negócio *",
            type: "select_with_other",
            required: true,
            schemaProp: "@type",
            tooltip: "Categoria de operação da empresa para ranqueamento semântico.",
            options: [
              { val: "AutoRepair", text: "Oficina Mecânica / Auto Center" },
              { val: "Restaurant", text: "Restaurante / Lanchonete / Gastronomia" },
              { val: "Bakery", text: "Padaria / Confeitaria" },
              { val: "Store", text: "Loja / Comércio Varejista" },
              { val: "GroceryStore", text: "Supermercado / Mercearia" },
              { val: "PetStore", text: "Pet Shop / Veterinária" },
              { val: "Pharmacy", text: "Farmácia / Drogaria" },
              { val: "BeautySalon", text: "Salão de Beleza / Estética" },
              { val: "HardwareStore", text: "Materiais de Construção" },
              { val: "ExerciseGym", text: "Academia / Centro Esportivo" },
              { val: "LocalBusiness", text: "Assistência Técnica / Serviços Locais" },
              { val: "OTHER", text: "Outro Comércio Físico" }
            ],
            otherLabel: "Especifique o ramo físico *",
            otherPlaceholder: "Ex: Loja de Peças Agrícolas e Ferramentas",
            otherMaxLength: 135
          },
          {
            id: "razao_social",
            label: "2. Razão Social *",
            type: "text",
            required: true,
            schemaProp: "legalName",
            placeholder: "Ex: Alfa Auto Center Ltda",
            tooltip: "Razão social registrada."
          },
          {
            id: "nome_fantasia",
            label: "3. Nome Fantasia (Marca Comercial) *",
            type: "text",
            required: true,
            schemaProp: "name",
            placeholder: "Ex: Centro Automotivo Fênix",
            tooltip: "Nome de fachada da loja."
          },
          {
            id: "cnpj",
            label: "4. CNPJ da Empresa",
            type: "cnpj",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir / Não se aplica no momento",
            schemaProp: "taxID",
            placeholder: "00.000.000/0000-00",
            tooltip: "Dado fiscal invisível no texto aberto; entra no código interno para comprovar idoneidade."
          },
          {
            id: "whatsapp_principal",
            label: "5.1 WhatsApp Comercial Principal *",
            type: "phone",
            required: true,
            defaultPrefix: "+55 ",
            schemaProp: "telephone",
            placeholder: "+55 11 99999-0000",
            tooltip: "Canal principal de atendimento."
          },
          {
            id: "telefone_fixo",
            label: "5.2 Telefone Fixo / PABX da Loja",
            type: "phone",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir",
            schemaProp: "faxNumber",
            placeholder: "+55 11 3000-0000",
            tooltip: "Linha telefônica fixa."
          },
          {
            id: "telegram_comercial",
            label: "5.3 Telegram Comercial / Atendimento",
            type: "text",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: @atendimento_empresa",
            tooltip: "Usuário ou canal de Telegram."
          },
          {
            id: "email_comercial",
            label: "5.4 E-mail Geral de Contato / Atendimento Comercial *",
            type: "email",
            required: true,
            schemaProp: "email",
            placeholder: "Ex: contato@empresaexemplo.com.br",
            tooltip: "E-mail oficial para contato."
          },
          {
            id: "especialidade_carro_chefe",
            label: "6. Especialidade Principal (Carro-Chefe / Diferencial de Mercado) *",
            type: "text",
            required: true,
            maxLength: 135,
            schemaProp: "knowsAbout",
            placeholder: "Ex: Manutenção Preventiva e Injeção Eletrônica Avançada",
            tooltip: "Serviço ou produto pelo qual o negócio é mais reconhecido."
          },
          {
            id: "ano_fundacao",
            label: "7. Ano de Fundação / Em Atividade Desde *",
            type: "select",
            required: true,
            schemaProp: "foundingDate",
            options: generateYearsList(200, "Mais de 200 anos (Tradição secular)"),
            tooltip: "Ano de abertura do estabelecimento."
          },
          {
            id: "descricao_otimizada",
            label: "8. Descrição da Entidade Otimizada para GEO *",
            type: "textarea",
            required: true,
            minLength: 150,
            maxLength: 525,
            schemaProp: "description",
            placeholder: "Ex: Centro automotivo especializado em revisão preventiva, suspensão e freios para veículos leves e utilitários. Equipe técnica capacitada com diagnósticos computadorizados e atendimento com peças homologadas.",
            tooltip: "Apresentação em linguagem factual (150 a 525 caracteres)."
          }
        ]
      },
      {
        stepNumber: 2,
        id: "bloco_02_endereco",
        title: "BLOCO 02: ENDEREÇO FÍSICO & LOCALIZAÇÃO COMPLETA",
        subtitle: "Localização do estabelecimento físico.",
        fields: [
          {
            id: "cep",
            label: "CEP *",
            type: "cep",
            required: true,
            checkboxAddon: { id: "endereco_rural", label: "Endereço Rural / Caixa Postal" },
            schemaProp: "postalCode",
            placeholder: "00000-000",
            tooltip: "Código de Endereçamento Postal."
          },
          {
            id: "logradouro",
            label: "Logradouro (Rua / Avenida / Rodovia) *",
            type: "text",
            required: true,
            schemaProp: "streetAddress",
            placeholder: "Ex: Avenida Central",
            tooltip: "Via pública de acesso."
          },
          {
            id: "numero_imovel",
            label: "Número Oficial *",
            type: "text",
            required: true,
            checkboxAddon: { id: "sem_numero", label: "S/N (Sem número)" },
            placeholder: "Ex: 100",
            tooltip: "Número de fachada."
          },
          {
            id: "complemento_complexo",
            label: "Detalhamento do Imóvel (Bloco, Loja, Pavimento)",
            type: "group_row",
            allowOmit: true,
            omitLabel: "Omitir / Não se aplica",
            tooltip: "Dados adicionais do imóvel.",
            subfields: [
              { id: "bloco_torre", label: "Bloco / Torre", placeholder: "Ex: Bloco B" },
              { id: "sala_loja", label: "Loja / Box", placeholder: "Ex: Loja 02" },
              { id: "andar_pavimento", label: "Andar", placeholder: "Ex: Térreo" }
            ]
          },
          {
            id: "ponto_referencia",
            label: "Ponto de Referência / Sentido da Pista",
            type: "text",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir / Não se aplica",
            maxLength: 225,
            placeholder: "Ex: Próximo à praça central, em frente ao banco",
            tooltip: "Referência visual para localização."
          },
          {
            id: "bairro",
            label: "Bairro *",
            type: "text",
            required: true,
            schemaProp: "addressNeighborhood",
            placeholder: "Ex: Centro",
            tooltip: "Bairro do estabelecimento."
          },
          {
            id: "macro_regiao",
            label: "Macro-Região / Zona (Opcional)",
            type: "select_with_other",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir / Não se aplica",
            tooltip: "Região do município.",
            options: [
              { val: "Centro", text: "Centro / Região Central" },
              { val: "Zona Norte", text: "Zona Norte" },
              { val: "Zona Sul", text: "Zona Sul" },
              { val: "Região Leste", text: "Região Leste" },
              { val: "Região Oeste", text: "Região Oeste" },
              { val: "OTHER", text: "Outra Região" }
            ],
            otherLabel: "Especifique a região (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Setor Industrial",
            otherMaxLength: 135
          },
          {
            id: "cidade",
            label: "Cidade *",
            type: "text",
            required: true,
            schemaProp: "addressLocality",
            placeholder: "Ex: São Paulo",
            tooltip: "Município da sede."
          },
          {
            id: "estado_uf",
            label: "Estado (UF) *",
            type: "select",
            required: true,
            schemaProp: "addressRegion",
            options: BRAZIL_STATES,
            tooltip: "Unidade Federativa."
          },
          {
            id: "geolocalizacao",
            label: "Geolocalização (Latitude e Longitude)",
            type: "geo_coordinates",
            allowOmit: true,
            omitLabel: "Omitir / Não se aplica",
            latPlaceholder: "-23.5505",
            lngPlaceholder: "-46.6333",
            helpTitle: "Como copiar Latitude e Longitude no Google Maps",
            helpSteps: "1. Abra o Google Maps.\n2. Clique com botão direito no pino do seu comércio.\n3. Clique nos números do topo para copiar.",
            tooltip: "Coordenadas geográficas de precisão."
          }
        ]
      },
      {
        stepNumber: 3,
        id: "bloco_03_licencas",
        title: "BLOCO 03: LICENÇAS, REGISTROS & CONFORMIDADE LEGAL",
        subtitle: "Documentos de regularidade municipal e sanitária.",
        fields: [
          {
            id: "alvara_municipal",
            label: "Alvará de Funcionamento Municipal",
            type: "tri_state_with_input",
            defaultVal: "Omitir",
            inputLabel: "Número do Alvará (Opcional)",
            inputPlaceholder: "Ex: 12345/2026",
            tooltip: "Inscrição ou alvará municipal."
          },
          {
            id: "licenca_sanitaria",
            label: "Licença da Vigilância Sanitária",
            type: "tri_state_with_input",
            defaultVal: "Omitir",
            inputLabel: "Número da Licença (Opcional)",
            inputPlaceholder: "Ex: VISA-9876",
            tooltip: "Licença da autoridade sanitária."
          },
          {
            id: "outra_licenca_comercio",
            label: "Outra Licença (AVCB, Ambiental, etc.)",
            type: "tri_state_with_input",
            defaultVal: "Omitir",
            inputLabel: "Especifique a licença (Máx. 135 caracteres)",
            inputPlaceholder: "Ex: Laudo AVCB do Corpo de Bombeiros em dia",
            maxLength: 135,
            tooltip: "Outro registro legal."
          }
        ]
      },
      {
        stepNumber: 4,
        id: "bloco_04_horarios",
        title: "BLOCO 04: OPERAÇÃO COMERCIAL, HORÁRIOS & FERIADOS",
        subtitle: "Horários regulares e em dias de feriado.",
        fields: [
          {
            id: "grade_horarios",
            label: "Horários Semanais (Segunda a Domingo) *",
            type: "opening_hours_grid",
            allowCopyMondayToFriday: true,
            copyButtonText: "Copiar horário de Segunda para Sexta-feira",
            tooltip: "Defina dias abertos e fechados com horário de início e fim."
          },
          {
            id: "operacao_feriados",
            label: "Operação em Feriados",
            type: "select_with_other",
            defaultVal: "Omitir",
            tooltip: "Regime de atendimento em feriados.",
            options: [
              { val: "Omitir", text: "Omitir" },
              { val: "Aberto em todos os feriados", text: "Aberto em todos os feriados" },
              { val: "Fechado em todos os feriados", text: "Fechado em todos os feriados" },
              { val: "Atendimento em feriados selecionados", text: "Atendimento em feriados selecionados" },
              { val: "OTHER", text: "Outro regime" }
            ],
            otherLabel: "Descreva a regra em feriados (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Aberto apenas até as 13h",
            otherMaxLength: 135
          },
          {
            id: "feriados_especificos",
            label: "Selecione os feriados atendidos:",
            type: "checkbox_group",
            conditionField: "operacao_feriados",
            conditionVal: "Atendimento em feriados selecionados",
            options: [
              { val: "Carnaval", text: "Carnaval" },
              { val: "Páscoa", text: "Páscoa" },
              { val: "Feriados Cívicos / Nacionais", text: "Feriados Cívicos / Nacionais" },
              { val: "Aniversário Oficial do Município", text: "Aniversário Oficial do Município" },
              { val: "Natal e Ano Novo", text: "Natal e Ano Novo" }
            ],
            allowOther: true,
            otherLabel: "Outro feriado (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Feriado municipal padroeiro",
            otherMaxLength: 135,
            tooltip: "Marque os feriados aplicáveis."
          }
        ]
      },
      {
        stepNumber: 5,
        id: "bloco_05_valores_logistica",
        title: "BLOCO 05: VALORES, LOGÍSTICA, PAGAMENTO, PARCELAMENTO & GARANTIAS",
        subtitle: "Políticas comerciais e garantias.",
        fields: [
          { id: "faz_entregas_delivery", label: "Logística: Faz Entregas / Delivery?", type: "tri_state", defaultVal: "Omitir", tooltip: "Serviço de entrega próprio ou conveniado." },
          { id: "reservas_pagamento_antecipado", label: "Logística: Faz Reservas mediante pagamento antecipado?", type: "tri_state", defaultVal: "Omitir", tooltip: "Reserva de itens ou vagas." },
          { id: "politica_troca_devolucao", label: "Logística: Possui Política de Troca ou Devolução Clara?", type: "tri_state", defaultVal: "Omitir", tooltip: "Procedimento documentado de trocas." },
          {
            id: "assistencia_autorizada_fabrica",
            label: "Assistência / Revenda Autorizada de Fábrica:",
            type: "tri_state_with_input",
            defaultVal: "Omitir",
            inputLabel: "Marcas homologadas (Máx. 135 caracteres)",
            inputPlaceholder: "Ex: Bosch, Moura, Cofap",
            maxLength: 135,
            tooltip: "Marcas homologadas."
          },
          { id: "possui_garantia", label: "Política de Garantia: Possui Garantia Formal?", type: "tri_state", defaultVal: "Omitir", tooltip: "Termo de garantia aos clientes." },
          {
            id: "detalhes_garantia",
            label: "Detalhamento da Garantia",
            type: "warranty_group",
            conditionField: "possui_garantia",
            conditionVal: "Sim",
            tooltip: "Prazo e cobertura.",
            subfields: [
              { id: "garantia_escrita", label: "Garantia formalizada por escrito?", type: "tri_state", defaultVal: "Sim" },
              { id: "prazo_garantia", label: "Prazo da Garantia", type: "text", checkboxAddon: { id: "garantia_variavel", label: "Variável conforme o item" }, placeholder: "Ex: 90 dias ou 1 ano", maxLength: 135 },
              { id: "cobertura_garantia", label: "Descrição da Cobertura", type: "text", placeholder: "Ex: Peças com defeito de fabricação e mão de obra", maxLength: 225 }
            ]
          },
          {
            id: "faixa_precos_reais",
            label: "Valores Reais & Ticket Médio (Sem $ Genérico)",
            type: "price_range_group",
            allowOmit: true,
            omitLabel: "Omitir valores",
            tooltip: "Faixas reais em R$.",
            subfields: [
              { id: "menor_preco", label: "Menor Preço Unitário (R$)", placeholder: "Ex: 20,00" },
              { id: "maior_preco", label: "Maior Preço Unitário (R$)", placeholder: "Ex: 500,00" },
              { id: "ticket_medio", label: "Ticket Médio por Cliente (R$)", placeholder: "Ex: 120,00" }
            ]
          },
          {
            id: "formas_pagamento",
            label: "Formas de Pagamento Aceitas",
            type: "checkbox_group",
            schemaProp: "paymentAccepted",
            options: [
              { val: "Pix", text: "Pix" }, { val: "Dinheiro em Espécie", text: "Dinheiro em Espécie" },
              { val: "Cartão de Débito", text: "Cartão de Débito" }, { val: "Boleto Bancário", text: "Boleto Bancário" },
              { val: "Ticket / Vale Refeição", text: "Ticket / Vale Refeição" }, { val: "Cartão de Crédito", text: "Cartão de Crédito" }
            ],
            allowOther: true,
            otherLabel: "Outra forma de pagamento (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Transferência TED",
            otherMaxLength: 135,
            tooltip: "Meios de pagamento aceitos."
          },
          {
            id: "parcelamento_cartao",
            label: "Condições de Parcelamento no Cartão de Crédito",
            type: "installment_group",
            conditionField: "formas_pagamento",
            conditionContains: "Cartão de Crédito",
            tooltip: "Parcelas no cartão.",
            maxInstallmentsOptions: [
              { val: "Até 3x", text: "Até 3x" }, { val: "Até 6x", text: "Até 6x" },
              { val: "Até 10x", text: "Até 10x" }, { val: "Até 12x", text: "Até 12x" }
            ],
            interestOptions: [
              { val: "Sem juros", text: "Sem juros" }, { val: "Com juros da operadora", text: "Com juros da operadora" },
              { val: "Parcialmente sem juros", text: "Parcialmente sem juros" }
            ]
          },
          {
            id: "parcelamento_proprio",
            label: "Outras Formas de Parcelamento Próprio",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir / Não oferece",
            options: [
              { val: "Crediário Próprio", text: "Crediário Próprio" },
              { val: "Boleto Faturado para Empresas (PJ)", text: "Boleto Faturado para Empresas (PJ)" },
              { val: "Financiamento Bancário Conveniado", text: "Financiamento Bancário Conveniado" }
            ],
            allowOther: true,
            otherLabel: "Outra modalidade (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Faturamento quinzenal para frotas",
            otherMaxLength: 135,
            tooltip: "Crédito próprio da loja."
          }
        ]
      },
      {
        stepNumber: 6,
        id: "bloco_06_comodidades",
        title: "BLOCO 06: COMODIDADES, INFRAESTRUTURA FÍSICA & SEGURANÇA",
        subtitle: "Estrutura do estabelecimento.",
        fields: [
          { id: "ar_condicionado", label: "Climatização: Ambiente com Ar Condicionado?", type: "tri_state", defaultVal: "Omitir", tooltip: "Ar condicionado no local." },
          { id: "wifi_gratis", label: "Conectividade: Wi-Fi Gratuito para Clientes?", type: "tri_state", defaultVal: "Omitir", tooltip: "Wi-Fi para clientes." },
          { id: "estacionamento_proprio", label: "Estacionamento: Possui Estacionamento gratuito?", type: "tri_state", defaultVal: "Omitir", tooltip: "Estacionamento no local." },
          { id: "pet_friendly", label: "Pets: Aceita Animais (Pet Friendly)?", type: "tri_state", defaultVal: "Omitir", tooltip: "Permite animais." },
          { id: "espaco_kids", label: "Família: Possui Espaço Kids?", type: "tri_state", defaultVal: "Omitir", tooltip: "Brinquedoteca ou recreação." },
          { id: "recarga_eletrica", label: "Mobilidade: Possui Recarga de Carro Elétrico?", type: "tri_state", defaultVal: "Omitir", tooltip: "Ponto de recarga." },
          { id: "cameras_seguranca", label: "Monitoramento: Monitorado por Câmeras?", type: "tri_state", defaultVal: "Omitir", tooltip: "Câmeras de segurança." },
          { id: "seguranca_privada", label: "Segurança Física: Possui Segurança no local?", type: "tri_state", defaultVal: "Omitir", tooltip: "Vigilância presencial." },
          { id: "outra_comodidade_comercio", label: "Outra Comodidade (Especificar)", type: "tri_state_with_input", defaultVal: "Omitir", inputLabel: "Descreva em até uma frase (Máx. 135 caracteres)", inputPlaceholder: "Ex: Sala de espera com café e tomadas USB", maxLength: 135, tooltip: "Outra comodidade física." }
        ]
      },
      {
        stepNumber: 7,
        id: "bloco_07_inclusao",
        title: "BLOCO 07: INCLUSÃO, ACOLHIMENTO ESPECIALIZADO & PREFERÊNCIAS",
        subtitle: "Acessibilidade motora, sensorial e humanizada.",
        fields: [
          { id: "pne_rampa_acesso", label: "Acessibilidade (PNE): Entrada sem degraus ou com rampa?", type: "tri_state", defaultVal: "Omitir", tooltip: "Rampa de acesso." },
          { id: "pne_banheiro_adaptado", label: "Acessibilidade (PNE): Banheiro adaptado com barras de apoio?", type: "tri_state", defaultVal: "Omitir", tooltip: "Banheiro acessível." },
          { id: "idoso_assentos_corredores", label: "Idosos: Assentos preferenciais e corredores amplos?", type: "tri_state", defaultVal: "Omitir", tooltip: "Conforto para idosos." },
          { id: "idoso_caixa_preferencial", label: "Idosos: Caixa ou Guichê com Atendimento Preferencial?", type: "tri_state", defaultVal: "Omitir", tooltip: "Atendimento prioritário." },
          { id: "pessoas_obesas_assentos", label: "Pessoas Obesas: Poltronas especiais reforçadas?", type: "tri_state", defaultVal: "Omitir", tooltip: "Assentos especiais." },
          { id: "acolhimento_autismo_tea", label: "TEA / Neurodiversidade: Espaço preparado com redução de ruídos e luzes?", type: "tri_state", defaultVal: "Omitir", tooltip: "Acolhimento para pessoas com TEA." },
          { id: "bebes_trocador_fraldas", label: "Primeira Infância: Banheiro com Trocador de Fraldas?", type: "tri_state", defaultVal: "Omitir", tooltip: "Fraldário." },
          { id: "bebes_cadeirao_alimentacao", label: "Primeira Infância: Cadeirão de Alimentação infantil?", type: "tri_state", defaultVal: "Omitir", tooltip: "Cadeirão infantil." },
          { id: "diversidade_lgbtq", label: "Diversidade: Ambiente acolhedor para a comunidade LGBTQ+?", type: "tri_state", defaultVal: "Omitir", tooltip: "Espaço inclusivo." },
          { id: "diversidade_banheiro_unissex", label: "Diversidade: Banheiro Unissex disponível?", type: "tri_state", defaultVal: "Omitir", tooltip: "Sanitário individual unissex." },
          { id: "outro_acolhimento_comercio", label: "Outro diferencial inclusivo (Especificar)", type: "tri_state_with_input", defaultVal: "Omitir", inputLabel: "Descreva em uma frase (Máx. 135 caracteres)", inputPlaceholder: "Ex: Atendimento capacitado em LIBRAS", maxLength: 135, tooltip: "Outro acolhimento." }
        ]
      },
      {
        stepNumber: 8,
        id: "bloco_08_parcerias",
        title: "BLOCO 08: PARCERIAS & CONVÊNIOS COMERCIAIS",
        subtitle: "Descontos corporativos ativos.",
        fields: [
          { id: "possui_convenios", label: "Possui Convênios ou Descontos Corporativos?", type: "tri_state", defaultVal: "Omitir", tooltip: "Convênios com empresas ou entidades." },
          {
            id: "lista_convenios",
            label: "Lista de Convênios Ativos (Limite de 5)",
            type: "repeater",
            conditionField: "possui_convenios",
            conditionVal: "Sim",
            maxItems: 5,
            addButtonText: "+ Adicionar Convênio",
            tooltip: "Cadastre as parcerias.",
            subfields: [
              { id: "nome_conveniada", label: "Nome da Entidade / Associação", placeholder: "Ex: Associação Comercial Alfa" },
              { id: "cnpj_conveniada", label: "CNPJ da Conveniada (Opcional)", placeholder: "00.000.000/0000-00" },
              { id: "beneficio_convenio", label: "Benefício (Máx. 135 caracteres)", placeholder: "Ex: 10% de desconto para associados", maxLength: 135 }
            ]
          }
        ]
      },
      {
        stepNumber: 9,
        id: "bloco_09_catalogo",
        title: "BLOCO 09: CATÁLOGO DE DESTAQUE / CARRO-CHEFE (1 A 5 ITENS)",
        subtitle: "Principais produtos e serviços ofertados.",
        fields: [
          {
            id: "catalogo_destaque",
            label: "Itens do Catálogo (Limite de 5) *",
            type: "repeater",
            minItems: 1,
            maxItems: 5,
            addButtonText: "+ Adicionar Item ao Catálogo",
            schemaProp: "hasOfferCatalog",
            tooltip: "Produtos ou serviços mais vendidos.",
            subfields: [
              { id: "item_nome", label: "Nome do Produto ou Serviço *", placeholder: "Ex: Revisão Completa com Diagnóstico Computadorizado", required: true },
              { id: "item_descricao", label: "Breve Descrição do Item *", placeholder: "Ex: Checagem em mais de 40 itens de segurança com relatório técnico impresso", maxLength: 210, required: true },
              { id: "item_preco", label: "Preço em Reais (R$) (Opcional)", placeholder: "Ex: 150,00" }
            ]
          }
        ]
      },
      {
        stepNumber: 10,
        id: "bloco_10_ecossistema_digital",
        title: "BLOCO 10: ECOSSISTEMA DIGITAL & REDES (sameAs)",
        subtitle: "Presença oficial na internet.",
        fields: [
          {
            id: "status_site_oficial",
            label: "Site Oficial do Negócio *",
            type: "radio_cards",
            defaultVal: "nao_possui",
            options: [
              { val: "possui_ativo", text: "Já possuo Site Oficial ativo" },
              { val: "em_ativacao", text: "Domínio em processo de ativação (App 1B)" },
              { val: "nao_possui", text: "Não possuo presença web própria (Omitir)" }
            ],
            tooltip: "Situação do website."
          },
          { id: "url_site_oficial", label: "URL do Site Oficial", type: "url", conditionField: "status_site_oficial", conditionNotVal: "nao_possui", schemaProp: "url", placeholder: "https://www.empresaexemplo.com.br", tooltip: "Endereço web oficial." },
          { id: "link_google_maps", label: "Link do Google Maps / Perfil de Empresa", type: "url", allowOmit: true, omitLabel: "Omitir", schemaProp: "hasMap", placeholder: "https://maps.google.com/...", tooltip: "Ficha oficial no Google Maps." },
          { id: "link_delivery_cardapio", label: "Link de Delivery / Cardápio Digital", type: "url", allowOmit: true, omitLabel: "Omitir", placeholder: "https://delivery.exemplo.com.br", tooltip: "Canal de vendas direto." },
          { id: "link_instagram", label: "Instagram Oficial", type: "url", allowOmit: true, omitLabel: "Omitir", placeholder: "https://instagram.com/empresa_exemplo", tooltip: "Perfil no Instagram." },
          { id: "link_facebook", label: "Facebook Oficial", type: "url", allowOmit: true, omitLabel: "Omitir", placeholder: "https://facebook.com/empresa_exemplo", tooltip: "Página no Facebook." },
          { id: "link_youtube", label: "Canal do YouTube", type: "url", allowOmit: true, omitLabel: "Omitir", placeholder: "https://youtube.com/@empresa_exemplo", tooltip: "Canal de vídeos." },
          { id: "link_linkedin", label: "LinkedIn Oficial", type: "url", allowOmit: true, omitLabel: "Omitir", placeholder: "https://linkedin.com/company/empresa_exemplo", tooltip: "Página no LinkedIn." },
          { id: "links_extras_sameas", label: "Outras Plataformas (TripAdvisor, Reclame Aqui, Waze)", type: "repeater_simple", maxItems: 5, addButtonText: "+ Adicionar Mais Plataformas", placeholder: "https://...", tooltip: "Outros canais de autoridade." }
        ]
      },
      {
        stepNumber: 11,
        id: "bloco_11_avatar_comercio",
        title: "BLOCO 11: MÓDULO AVATAR - O CLIENTE IDEAL DO BALCÃO",
        subtitle: "Psicologia de consumo do comprador local.",
        infoBanner: "Psicologia de Consumo Local: Este bloco ensina às IAs o perfil da pessoa que mais compra ou frequenta o seu espaço.",
        fields: [
          {
            id: "avatar_faixa_etaria",
            label: "1.1 Faixa Etária Principal",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "18 a 25 anos (Jovens)", text: "18 a 25 anos (Jovens/Estudantes)" },
              { val: "26 a 40 anos (Adultos)", text: "26 a 40 anos (Adultos/Profissionais/Famílias)" },
              { val: "41 a 60 anos (Famílias maduras)", text: "41 a 60 anos (Famílias maduras)" },
              { val: "Mais de 60 anos (Melhor idade)", text: "Mais de 60 anos (Melhor idade)" },
              { val: "Livre / Todas as idades", text: "Livre / Todas as idades" }
            ],
            allowOther: true,
            otherLabel: "Outro perfil etário (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Famílias aos fins de semana",
            otherMaxLength: 135,
            tooltip: "Faixa etária dos compradores."
          },
          {
            id: "avatar_decisor_compra",
            label: "1.2 Quem Costuma Decidir a Compra / Visita?",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Decisão Feminina", text: "Decisão predominantemente Feminina" },
              { val: "Decisão Masculina", text: "Decisão編Masculina" },
              { val: "Decisão Conjunta / Familiar", text: "Decisão Conjunta / Familiar" }
            ],
            allowOther: true,
            otherLabel: "Outro formato de decisão (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Compras corporativas de empresas parceiras",
            otherMaxLength: 135,
            tooltip: "Tomador de decisão da compra."
          },
          {
            id: "avatar_habito_consumo",
            label: "2. O que o seu cliente mais valoriza ao comprar de você?",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Rapidez e Agilidade", text: "Rapidez, Praticidade e Agilidade (Sem perder tempo)" },
              { val: "Conforto e Experiência", text: "Conforto, Convivência e Experiência (Quer relaxar)" },
              { val: "Confiança Técnica e Qualidade", text: "Confiança Técnica e Qualidade Superior (Valoriza o melhor)" },
              { val: "Custo-Benefício e Economia", text: "Custo-Benefício e Economia (Compara preços)" }
            ],
            allowOther: true,
            otherLabel: "Outro valor principal (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Transparência no diagnóstico e sem surpresas",
            otherMaxLength: 135,
            tooltip: "Gatilho de compra prioritário."
          },
          {
            id: "avatar_horario_pico",
            label: "3. Janela do dia de maior procura:",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
