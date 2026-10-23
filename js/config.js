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
  MAKE_WEBHOOK_URL: "https://hook.us2.make.com/ycnown1x87rj8lsj3xpl0egavj76tzrb",
  APP_1B_REDIRECT_URL: "#app-robo-qg",
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
            options: [
              { val: "Manhã cedo", text: "Manhã cedo" },
              { val: "Horário de Almoço", text: "Horário de Almoço" },
              { val: "Fim de Tarde / Volta do Trabalho", text: "Fim de Tarde / Volta do Trabalho" },
              { val: "Noite e Fins de Semana", text: "Noite e Fins de Semana" }
            ],
            allowOther: true,
            otherLabel: "Outro horário (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Atendimento mediante plantão",
            otherMaxLength: 135,
            tooltip: "Horários de maior contato."
          },
          {
            id: "avatar_tom_voz",
            label: "4. Tratamento & Tom de Voz esperado:",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Acolhedor e Amigável", text: "Atendimento Íntimo, Acolhedor e Amigável" },
              { val: "Ágil e Direto", text: "Atendimento Ágil, Direto e Objetivo" },
              { val: "Polido e Formal", text: "Atendimento Polido, Formal e Sofisticado" }
            ],
            allowOther: true,
            otherLabel: "Outro estilo (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Consultivo com explicações didáticas",
            otherMaxLength: 135,
            tooltip: "Estilo de comunicação."
          },
          {
            id: "avatar_maior_dor",
            label: "5. A Maior Dor ou Medo que Afasta de Concorrentes:",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Demora no atendimento", text: "Demora no atendimento ou fila longa" },
              { val: "Produtos sem procedência", text: "Produtos sem procedência ou sem garantia" },
              { val: "Ambiente desorganizado", text: "Ambiente barulhento ou desorganizado" },
              { val: "Falta de clareza nos preços", text: "Falta de clareza nos preços ou cobranças inesperadas" }
            ],
            allowOther: true,
            otherLabel: "Outro medo (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Falta de peças originais à pronta-entrega",
            otherMaxLength: 135,
            tooltip: "Dores de concorrentes que seu negócio resolve."
          },
          {
            id: "avatar_raiox_livre",
            label: "6. Raio-X Livre do Avatar do Comércio (Campo Aberto Opcional)",
            type: "textarea",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir Raio-X Livre",
            maxLength: 450,
            placeholder: "Ex: Motoristas e famílias que buscam confiança e diagnósticos corretos, valorizando agilidade na entrega e peças com garantia de fábrica.",
            tooltip: "Resumo do perfil de cliente ideal."
          }
        ]
      }
    ]
  },

  prestador_servico: {
    id: "prestador_servico",
    storageKey: "geo_engine_service_provider",
    badgeIcon: "🛠️",
    badgeText: "Prestador & Autônomo",
    cardTitle: "Prestador de Serviço & Autônomo",
    cardDescription: "Eletricistas, encanadores, pintores, pedreiros, chaveiros e técnicos com atendimento regional.",
    defaultSchemaType: "HomeAndConstructionBusiness",
    submitButtonText: "Revisar Dados & Auditar com IA →",
    steps: [
      {
        stepNumber: 1,
        id: "bloco_01_identidade_prestador",
        title: "BLOCO 01: IDENTIDADE PROFISSIONAL & MARCA COMERCIAL",
        subtitle: "Foco no profissional autônomo ou empresa de serviços.",
        fields: [
          {
            id: "ramos_atuacao_multiplos",
            label: "1. Ramo(s) de Atuação Exercidos *",
            type: "checkbox_group",
            required: true,
            schemaProp: "additionalType",
            tooltip: "Áreas de atuação atendidas.",
            options: [
              { val: "Electrician", text: "Eletricista / Instalações Elétricas" },
              { val: "Plumber", text: "Encanador / Bombeiro Hidráulico" },
              { val: "GeneralContractor", text: "Pedreiro / Alvenaria / Reformas" },
              { val: "HousePainter", text: "Pintor Residencial / Comercial" },
              { val: "Marcenaria", text: "Marcenaria / Montador de Móveis" },
              { val: "Housekeeping", text: "Diarista / Faxina / Limpeza" },
              { val: "Landscaping", text: "Jardineiro / Paisagismo" },
              { val: "Locksmith", text: "Chaveiro Móvel 24h" },
              { val: "HVACBusiness", text: "Técnico de Ar-Condicionado / Refrigeração" },
              { val: "MovingCompany", text: "Fretes / Mudanças / Carretos" },
              { val: "Construction", text: "Construtora / Empreiteira" }
            ],
            allowOther: true,
            highlightOther: true,
            otherLabel: "⭐ Outra Especialidade de Serviço *",
            otherPlaceholder: "Ex: Instalador de Energia Solar Residencial",
            otherMaxLength: 135
          },
          { id: "razao_social", label: "2. Razão Social (ou Nome Civil se Autônomo) *", type: "text", required: true, schemaProp: "legalName", placeholder: "Ex: Silva Instalações e Reparos MEI", tooltip: "Razão social ou registro MEI." },
          { id: "nome_fantasia", label: "3. Nome Fantasia / Marca de Divulgação *", type: "text", required: true, schemaProp: "name", placeholder: "Ex: Silva Eletricista e Reparos Rápidos", tooltip: "Nome comercial do serviço." },
          { id: "cnpj", label: "4. CNPJ da Empresa ou MEI", type: "cnpj", required: false, allowOmit: true, omitLabel: "Omitir / Atua como Pessoa Física sem CNPJ", schemaProp: "taxID", placeholder: "00.000.000/0000-00", tooltip: "Comprovante fiscal de credibilidade." },
          { id: "whatsapp_principal", label: "5.1 WhatsApp Principal para Chamados e Orçamentos *", type: "phone", required: true, defaultPrefix: "+55 ", schemaProp: "telephone", placeholder: "+55 11 98888-0000", tooltip: "Canal de chamados direto." },
          { id: "telefone_fixo", label: "5.2 Telefone Fixo / Recados", type: "phone", required: false, allowOmit: true, omitLabel: "Omitir", placeholder: "+55 11 3000-0000", tooltip: "Linha fixa de recados." },
          { id: "telegram_comercial", label: "5.3 Telegram de Atendimento", type: "text", required: false, allowOmit: true, omitLabel: "Omitir", placeholder: "Ex: @atendimento_silva", tooltip: "Telegram comercial." },
          { id: "email_comercial", label: "5.4 E-mail Geral para Orçamentos e Recibos *", type: "email", required: true, schemaProp: "email", placeholder: "Ex: orcamentos@silvaservicos.com.br", tooltip: "E-mail de contato." },
          { id: "especialidade_carro_chefe", label: "6. Especialidade Principal (O Seu Maior Diferencial) *", type: "text", required: true, maxLength: 120, schemaProp: "knowsAbout", placeholder: "Ex: Manutenção Elétrica Preventiva e Quadros de Distribuição", tooltip: "Especialidade mais requisitada." },
          { id: "ano_fundacao", label: "7. Ano de Início da Atividade / Experiência *", type: "select", required: true, schemaProp: "foundingDate", options: generateYearsList(200, "Mais de 200 anos"), tooltip: "Tempo de mercado." },
          { id: "descricao_otimizada", label: "8. Apresentação Profissional para Motores de Busca *", type: "textarea", required: true, minLength: 150, maxLength: 525, schemaProp: "description", placeholder: "Ex: Eletricista com ampla experiência em instalações elétricas residenciais e comerciais. Realizamos montagem de padrão, manutenção de quadros de disjuntores, iluminação LED e laudos com pontualidade e emissão de nota fiscal.", tooltip: "Resumo da prestação de serviços." }
        ]
      },
      {
        stepNumber: 2,
        id: "bloco_02_cobertura_prestador",
        title: "BLOCO 02: COBERTURA REGIONAL, RAIO DE ATUAÇÃO & BASE OPERACIONAL",
        subtitle: "Área de atendimento móvel.",
        fields: [
          { id: "cep_epicentro", label: "1. CEP da Sua Base de Saída / Ponto Zero *", type: "cep", required: true, checkboxAddon: { id: "base_rural", label: "Base em Área Rural / Rodovia" }, schemaProp: "postalCode", placeholder: "00000-000", tooltip: "CEP base de partida." },
          { id: "estado_uf", label: "2. Estado Principal de Atuação (UF) *", type: "select", required: true, schemaProp: "addressRegion", options: BRAZIL_STATES, tooltip: "Estado da atuação." },
          {
            id: "raio_deslocamento",
            label: "3. Raio Máximo de Deslocamento a partir da Base *",
            type: "select_with_other",
            required: true,
            schemaProp: "geoRadius",
            tooltip: "Distância máxima para chamados.",
            options: [
              { val: "Até 15 km", text: "Até 15 km (Próprio município)" },
              { val: "Até 30 km", text: "Até 30 km (Microrregião)" },
              { val: "Até 60 km", text: "Até 60 km (Região metropolitana)" },
              { val: "Até 100 km", text: "Até 100 km (Regional amplo)" },
              { val: "Acima de 100 km / Todo o Estado", text: "Todo o Estado" },
              { val: "Cobertura em Todo o Território Nacional", text: "Todo o Brasil" },
              { val: "OTHER", text: "Outro raio de atendimento" }
            ],
            otherLabel: "Especifique o raio (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Até 50 km com taxa fixa de deslocamento",
            otherMaxLength: 135
          },
          { id: "cidades_atendidas", label: "4. Cidades e Regiões Atendidas (Lista por Nome) *", type: "textarea_short", required: true, schemaProp: "areaServed", placeholder: "Ex: São Paulo, Santo André, São Bernardo, Diadema e região metropolitana", tooltip: "Cidades onde aceita chamados." },
          {
            id: "possui_ponto_fisico",
            label: "5. Possui Ponto Físico / Oficina Aberta ao Público?",
            type: "radio_cards",
            defaultVal: "Nao",
            options: [
              { val: "Nao", text: "Não - Atendimento 100% no Endereço do Cliente" },
              { val: "Sim", text: "Sim - Possui Oficina Aberta para Visitas" }
            ],
            tooltip: "Se atende em sede aberta ao público."
          },
          {
            id: "endereco_sede_opcional",
            label: "Endereço da Oficina / Escritório Aberto",
            type: "group_row",
            conditionField: "possui_ponto_fisico",
            conditionVal: "Sim",
            tooltip: "Endereço físico.",
            subfields: [
              { id: "rua_sede", label: "Rua", placeholder: "Ex: Rua Principal" },
              { id: "numero_sede", label: "Número", placeholder: "Ex: 200" },
              { id: "bairro_sede", label: "Bairro", placeholder: "Ex: Bairro Central" },
              { id: "cidade_sede", label: "Cidade", placeholder: "Ex: São Paulo" }
            ]
          }
        ]
      },
      {
        stepNumber: 3,
        id: "bloco_03_licencas_prestador",
        title: "BLOCO 03: LICENÇAS, LAUDOS & CONFORMIDADE REGULATÓRIA",
        subtitle: "Documentos e registros de prestador.",
        fields: [
          { id: "alvara_municipal", label: "1. Alvará de Funcionamento / Inscrição Municipal:", type: "tri_state_with_input", defaultVal: "Omitir", inputLabel: "Número do Alvará (Opcional)", inputPlaceholder: "Ex: 12345/2026", tooltip: "Inscrição municipal." },
          { id: "licenca_ambiental_sanitaria", label: "2. Licença Ambiental / Laudo Técnico (se aplicável):", type: "tri_state_with_input", defaultVal: "Omitir", inputLabel: "Órgão e Número (Opcional)", inputPlaceholder: "Ex: Licença Sanitária 9876", tooltip: "Licença sanitária ou técnica." },
          { id: "outra_licenca_prestador", label: "Outro Registro Regulatório", type: "tri_state_with_input", defaultVal: "Omitir", inputLabel: "Descreva em uma frase (Máx. 135 caracteres)", inputPlaceholder: "Ex: Registro ANTT para transporte de cargas", maxLength: 135, tooltip: "Outro registro técnico." }
        ]
      },
      {
        stepNumber: 4,
        id: "bloco_04_horarios_sos",
        title: "BLOCO 04: HORÁRIOS DE ATENDIMENTO & REGIME DE URGÊNCIA (S.O.S)",
        subtitle: "Disponibilidade operacional.",
        fields: [
          {
            id: "regime_urgencia_sos",
            label: "1. Atendimento de Urgência / Socorro Emergencial *",
            type: "select_with_other",
            required: true,
            defaultVal: "Nao_Emergencia",
            tooltip: "Disponibilidade de plantão.",
            options: [
              { val: "24_Horas", text: "Atendimento Emergencial 24 Horas" },
              { val: "Plantao_Estendido", text: "Plantão Estendido / Noturno" },
              { val: "Fins_Semana_Feriados", text: "Urgências aos Fins de Semana e Feriados" },
              { val: "Nao_Emergencia", text: "Apenas horário comercial regular" },
              { val: "OTHER", text: "Outro regime de plantão" }
            ],
            otherLabel: "Descreva seu regime de urgência (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Plantão das 06h às 22h para chamados residenciais",
            otherMaxLength: 135
          },
          { id: "detalhe_plantao_estendido", label: "Informe a faixa do plantão estendido:", type: "text", conditionField: "regime_urgencia_sos", conditionVal: "Plantao_Estendido", maxLength: 135, placeholder: "Ex: Atendimento das 06h às 22h", tooltip: "Faixa de horário de plantão." },
          { id: "grade_horarios", label: "2. Horários Regulares de Atendimento *", type: "opening_hours_grid", allowCopyMondayToFriday: true, copyButtonText: "Copiar horário de Segunda para Sexta-feira", tooltip: "Grade semanal de horários." },
          {
            id: "operacao_feriados",
            label: "3. Atendimento em Feriados:",
            type: "select_with_other",
            defaultVal: "Omitir",
            tooltip: "Atendimento nos feriados.",
            options: [
              { val: "Omitir", text: "Omitir" }, { val: "Atende em todos os feriados", text: "Atende em todos os feriados" },
              { val: "Não atende em feriados", text: "Não atende em feriados" }, { val: "Atende em feriados específicos", text: "Atende em feriados específicos" },
              { val: "OTHER", text: "Outra condição" }
            ],
            otherLabel: "Descreva como funciona nos feriados (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Atende apenas emergências hidráulicas",
            otherMaxLength: 135
          },
          {
            id: "feriados_especificos",
            label: "Feriados com atendimento:",
            type: "checkbox_group",
            conditionField: "operacao_feriados",
            conditionVal: "Atende em feriados específicos",
            options: [
              { val: "Carnaval", text: "Carnaval" }, { val: "Páscoa", text: "Páscoa" },
              { val: "Feriados Nacionais", text: "Feriados Nacionais" }, { val: "Aniversário da Cidade", text: "Aniversário da Cidade" },
              { val: "Natal e Ano Novo", text: "Natal e Ano Novo" }
            ],
            tooltip: "Feriados atendidos."
          }
        ]
      },
      {
        stepNumber: 5,
        id: "bloco_05_orcamentos_garantias_prestador",
        title: "BLOCO 05: ORÇAMENTOS, PAGAMENTO, GARANTIAS & PROTEÇÃO JURÍDICA",
        subtitle: "Condições orçamentárias e contratuais.",
        fields: [
          {
            id: "orcamento_gratuito_local",
            label: "1.1 Faz Orçamentos Presenciais Gratuitamente no Local?",
            type: "select_with_other",
            defaultVal: "Omitir",
            tooltip: "Regra para visitas de orçamento.",
            options: [
              { val: "Omitir", text: "Omitir" }, { val: "Sim", text: "Sim" },
              { val: "Não (Cobra taxa de visita técnica)", text: "Não (Cobra taxa de visita técnica)" },
              { val: "OTHER", text: "Outra condição" }
            ],
            otherLabel: "Explique a regra de visita (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Gratuito no raio de 10 km",
            otherMaxLength: 135
          },
          { id: "pre_orcamento_whatsapp", label: "1.2 Faz Avaliação Prévia por Fotos/Vídeos no WhatsApp?", type: "tri_state", defaultVal: "Sim", tooltip: "Avaliação inicial remota." },
          { id: "exclusivo_agendamento", label: "1.3 Trabalha Exclusivamente com Agendamento Prévio?", type: "tri_state", defaultVal: "Omitir", tooltip: "Atendimento somente agendado." },
          { id: "cursos_qualificacao", label: "2.1 Possui Certificações Técnicas (Ex: SENAI, NR-10, NR-35)?", type: "tri_state_with_input", defaultVal: "Omitir", inputLabel: "Cursos e Certificações (Máx. 135 caracteres)", inputPlaceholder: "Ex: Certificação NR-10 e Eletrotécnica SENAI", maxLength: 135, schemaProp: "hasCredential", tooltip: "Habilitação técnica." },
          { id: "instalador_credenciado_marcas", label: "2.2 É Instalador Autorizado por Marcas?", type: "tri_state_with_input", defaultVal: "Omitir", inputLabel: "Marcas Homologadas (Máx. 135 caracteres)", inputPlaceholder: "Ex: Tigre, Deca, WEG, Lorenzetti", maxLength: 135, tooltip: "Marcas que homologam o profissional." },
          { id: "possui_garantia", label: "3. Oferece Garantia Formal dos Serviços Realizados?", type: "tri_state", defaultVal: "Omitir", tooltip: "Garantia de mão de obra." },
          {
            id: "detalhes_garantia",
            label: "Detalhamento da Garantia",
            type: "warranty_group",
            conditionField: "possui_garantia",
            conditionVal: "Sim",
            tooltip: "Prazos e coberturas da garantia.",
            subfields: [
              { id: "garantia_escrita", label: "Garantia por escrito em Recibo ou Contrato?", type: "tri_state", defaultVal: "Sim" },
              { id: "prazo_garantia", label: "Prazo da Garantia", type: "text", checkboxAddon: { id: "garantia_variavel", label: "Variável por serviço" }, placeholder: "Ex: 90 dias ou 1 ano", maxLength: 135 },
              { id: "cobertura_garantia", label: "Cobertura da Garantia", type: "text", placeholder: "Ex: Retorno imediato sem custo em caso de falha de instalação", maxLength: 225 }
            ]
          },
          { id: "seguro_responsabilidade_civil", label: "4.1 Possui Seguro contra Danos a Bens do Cliente?", type: "tri_state", defaultVal: "Omitir", tooltip: "Seguro de responsabilidade civil." },
          { id: "contrato_formal_servico", label: "4.2 Trabalha com Contrato Formal de Prestação de Serviços?", type: "tri_state", defaultVal: "Omitir", tooltip: "Contrato formal de serviço." },
          { id: "equipe_propria_regularizada", label: "4.3 Equipe Própria Regularizada (Encargos sob responsabilidade do Prestador)?", type: "tri_state", defaultVal: "Omitir", tooltip: "Regularidade de pessoal." },
          {
            id: "faixa_precos_reais",
            label: "5. Valores Reais & Faixa de Preço de Serviços (R$)",
            type: "price_range_group",
            allowOmit: true,
            omitLabel: "Omitir valores",
            tooltip: "Valores médios cobrados.",
            subfields: [
              { id: "menor_preco", label: "Serviço Simples / Chamado Inicial (R$)", placeholder: "Ex: 80,00" },
              { id: "maior_preco", label: "Serviço Complexo / Obras (R$)", placeholder: "Ex: 3.500,00" },
              { id: "ticket_medio", label: "Valor Médio por Chamado (R$)", placeholder: "Ex: 180,00" }
            ]
          },
          {
            id: "formas_pagamento",
            label: "6. Formas de Pagamento Aceitas",
            type: "checkbox_group",
            schemaProp: "paymentAccepted",
            options: [
              { val: "Pix", text: "Pix" }, { val: "Dinheiro em Espécie", text: "Dinheiro em Espécie" },
              { val: "Cartão de Débito", text: "Cartão de Débito" }, { val: "Boleto Bancário", text: "Boleto Bancário" },
              { val: "Cartão de Crédito", text: "Cartão de Crédito" }
            ],
            allowOther: true,
            otherLabel: "Outra forma de pagamento (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Transferência TED",
            otherMaxLength: 135,
            tooltip: "Meios de cobrança."
          },
          {
            id: "parcelamento_cartao",
            label: "7. Condições de Parcelamento no Cartão de Crédito",
            type: "installment_group",
            conditionField: "formas_pagamento",
            conditionContains: "Cartão de Crédito",
            tooltip: "Parcelas no cartão.",
            maxInstallmentsOptions: [
              { val: "Até 3x", text: "Até 3x" }, { val: "Até 6x", text: "Até 6x" },
              { val: "Até 10x", text: "Até 10x" }, { val: "Até 12x", text: "Até 12x" }
            ],
            interestOptions: [
              { val: "Sem acréscimo / Sem juros", text: "Sem acréscimo / Sem juros" },
              { val: "Com taxa da maquininha", text: "Com taxa da maquininha" },
              { val: "Parcialmente sem juros", text: "Parcialmente sem juros" }
            ]
          },
          {
            id: "parcelamento_proprio",
            label: "8. Opções Próprias de Faturamento de Obras",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Boleto Faturado para Empresas (PJ)", text: "Boleto Faturado para Empresas (PJ - 15/30/45 dias)" },
              { val: "Pagamento por Etapas de Conclusão", text: "Pagamento Parcelado por Etapas de Conclusão da Obra" },
              { val: "Financiamento em Loja Conveniada", text: "Financiamento em Loja Conveniada Parceira" }
            ],
            allowOther: true,
            otherLabel: "Outra facilidade (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Sinal na contratação e saldo na entrega",
            otherMaxLength: 135,
            tooltip: "Condições especiais de pagamento."
          }
        ]
      },
      {
        stepNumber: 6,
        id: "bloco_06_excelencia_prestador",
        title: "BLOCO 06: EXCELÊNCIA NA EXECUÇÃO, CONDUTA NO LAR & FERRAMENTAL",
        subtitle: "Padrões de trabalho e cuidado.",
        fields: [
          { id: "uso_epis", label: "EPIs: Trabalha com Equipamentos de Proteção Individual completos?", type: "tri_state", defaultVal: "Omitir", tooltip: "Uso de EPIs adequados." },
          { id: "trabalha_uniformizado", label: "Apresentação: Profissionais trabalham uniformizados?", type: "tri_state", defaultVal: "Omitir", tooltip: "Uniformização da equipe." },
          { id: "cracha_identificacao", label: "Identificação: Equipe com crachá com foto?", type: "tri_state", defaultVal: "Omitir", tooltip: "Crachá visível." },
          { id: "limpeza_pos_servico", label: "Limpeza: Deixa o local limpo e recolhe entulhos?", type: "tri_state", defaultVal: "Omitir", tooltip: "Limpeza pós-serviço." },
          { id: "aviso_antecipado_atraso", label: "Pontualidade: Possui política de aviso prévio em imprevistos?", type: "tri_state", defaultVal: "Omitir", tooltip: "Aviso em caso de atraso." },
          { id: "sinalizacao_preventiva", label: "Segurança: Utiliza fitas ou cones para isolar a área de trabalho?", type: "tri_state", defaultVal: "Omitir", tooltip: "Isolamento preventivo da área." },
          { id: "atende_condominios_predios", label: "Condomínios: Atende com frequência em edifícios respeitando normas?", type: "tri_state", defaultVal: "Omitir", tooltip: "Experiência com regras condominiais." },
          { id: "ferramental_proprio", label: "Ferramental: Possui ferramentas e aparelhos de medição próprios?", type: "tri_state", defaultVal: "Omitir", tooltip: "Autonomia de ferramentas." },
          { id: "gestao_equipamentos_pesados", label: "Equipamentos Pesados: Gerencia a locação de andaimes ou betoneiras?", type: "tri_state", defaultVal: "Omitir", tooltip: "Locação de maquinário pesado." },
          { id: "pede_sinal_agenda", label: "Sinal: Solicita adiantamento de valor para reserva de data?", type: "tri_state", defaultVal: "Omitir", tooltip: "Sinal para confirmação de agenda." },
          { id: "outro_excelencia_prestador", label: "Outro diferencial de conduta (Especificar)", type: "tri_state_with_input", defaultVal: "Omitir", inputLabel: "Descreva em uma frase (Máx. 135 caracteres)", inputPlaceholder: "Ex: Proteção de pisos e móveis com lona antes de iniciar", maxLength: 135, tooltip: "Outro padrão de execução." }
        ]
      },
      {
        stepNumber: 7,
        id: "bloco_07_acolhimento_prestador",
        title: "BLOCO 07: ACOLHIMENTO ESPECIALIZADO, CUIDADO COM O LAR & COMUNICAÇÃO",
        subtitle: "Atenção às famílias e acessibilidade.",
        fields: [
          { id: "controle_ruido_vulneraveis", label: "Vulneráveis: Preparado para pausas de ruído para idosos, bebês ou pessoas com TEA?", type: "tri_state", defaultVal: "Omitir", tooltip: "Cuidado com famílias atípicas ou acamados." },
          { id: "cuidado_animais_estimacao", label: "Pets: Cuidadoso com cães e gatos, mantendo acessos fechados?", type: "tri_state", defaultVal: "Omitir", tooltip: "Prevenção de fuga de pets." },
          { id: "atendimento_libras", label: "LIBRAS: Profissional ou equipe comunica-se em LIBRAS?", type: "tri_state", defaultVal: "Omitir", tooltip: "Acessibilidade para surdos." },
          { id: "outros_idiomas_prestador", label: "Outros Idiomas: Atendimento em Inglês ou Espanhol para estrangeiros?", type: "tri_state", defaultVal: "Omitir", tooltip: "Atendimento em outro idioma." },
          { id: "outro_acolhimento_prestador", label: "Outro cuidado especial no lar (Especificar)", type: "tri_state_with_input", defaultVal: "Omitir", inputLabel: "Descreva em uma frase (Máx. 135 caracteres)", inputPlaceholder: "Ex: Uso de sapatilhas descartáveis para não sujar o piso", maxLength: 135, tooltip: "Cuidado adicional no domicílio." }
        ]
      },
      {
        stepNumber: 8,
        id: "bloco_08_parcerias_prestador",
        title: "BLOCO 08: PARCERIAS, CONVÊNIOS & DESCONTOS EM MATERIAIS",
        subtitle: "Benefícios em lojas parceiras.",
        fields: [
          { id: "parceria_lojas_materiais", label: "1. Parcerias com Lojas de Materiais para repassar descontos aos clientes?", type: "tri_state_with_input", defaultVal: "Omitir", inputLabel: "Lojas e Depósitos Parceiros (Máx. 135 caracteres)", inputPlaceholder: "Ex: Casa de Tintas Central e Depósito Alvorada", maxLength: 135, tooltip: "Desconto em materiais para o contratante." },
          { id: "possui_convenios", label: "2. Tabela diferenciada para condomínios, sindicatos ou imobiliárias?", type: "tri_state", defaultVal: "Omitir", tooltip: "Parcerias institucionais." },
          {
            id: "lista_convenios",
            label: "Lista de Convênios Ativos (Limite de 5)",
            type: "repeater",
            conditionField: "possui_convenios",
            conditionVal: "Sim",
            maxItems: 5,
            addButtonText: "+ Adicionar Convênio",
            tooltip: "Cadastre condomínios ou entidades parceiras.",
            subfields: [
              { id: "nome_conveniada", label: "Nome da Associação / Condomínio", placeholder: "Ex: Condomínio Residencial Parque das Flores" },
              { id: "beneficio_convenio", label: "Benefício (Máx. 135 caracteres)", placeholder: "Ex: 15% de desconto na mão de obra para moradores", maxLength: 135 }
            ]
          }
        ]
      },
      {
        stepNumber: 9,
        id: "bloco_09_catalogo_prestador",
        title: "BLOCO 09: PRINCIPAIS SERVIÇOS EM DESTAQUE (1 A 5 CARROS-CHEFES)",
        subtitle: "Serviços mais executados.",
        fields: [
          {
            id: "catalogo_destaque",
            label: "Catálogo de Serviços (Limite de 5) *",
            type: "repeater",
            minItems: 1,
            maxItems: 5,
            addButtonText: "+ Adicionar Serviço",
            schemaProp: "hasOfferCatalog",
            tooltip: "Serviços principais.",
            subfields: [
              { id: "item_nome", label: "Nome do Serviço *", placeholder: "Ex: Instalação e Troca de Fiação para Ar-Condicionado 220V", required: true },
              { id: "item_descricao", label: "Breve Descrição do Serviço *", placeholder: "Ex: Instalação com disjuntor individual, fiação anti-chamas e acabamento seguro", maxLength: 210, required: true },
              { id: "item_preco", label: "Ponto de Partida em R$ (Opcional)", placeholder: "Ex: A partir de R$ 180,00" }
            ]
          }
        ]
      },
      {
        stepNumber: 10,
        id: "bloco_10_ecossistema_prestador",
        title: "BLOCO 10: CANAIS DIGITAIS & PROVA SOCIAL",
        subtitle: "Canais de fotos e recomendações.",
        fields: [
          {
            id: "status_site_oficial",
            label: "1. Site ou Cartão Virtual do Profissional *",
            type: "radio_cards",
            defaultVal: "nao_possui",
            options: [
              { val: "possui_ativo", text: "Já possuo Site Oficial ativo" },
              { val: "em_ativacao", text: "Domínio em ativação (App 1B)" },
              { val: "nao_possui", text: "Não possuo presença web própria (Omitir)" }
            ],
            tooltip: "Website profissional."
          },
          { id: "url_site_oficial", label: "Link do Site Oficial", type: "url", conditionField: "status_site_oficial", conditionNotVal: "nao_possui", schemaProp: "url", placeholder: "https://www.silvaservicos.com.br", tooltip: "Endereço web oficial." },
          { id: "link_google_maps", label: "Perfil no Google Maps / Avaliações de Clientes", type: "url", allowOmit: true, omitLabel: "Omitir", schemaProp: "hasMap", placeholder: "https://maps.google.com/...", tooltip: "Ficha de avaliações no Google." },
          { id: "link_instagram", label: "Instagram com Fotos de Obras e Serviços", type: "url", allowOmit: true, omitLabel: "Omitir", placeholder: "https://instagram.com/silva_reparos", tooltip: "Portfólio visual no Instagram." },
          { id: "link_facebook", label: "Página Comercial no Facebook", type: "url", allowOmit: true, omitLabel: "Omitir", placeholder: "https://facebook.com/silva_reparos", tooltip: "Página no Facebook." },
          { id: "link_youtube", label: "Canal do YouTube com Demonstrações", type: "url", allowOmit: true, omitLabel: "Omitir", placeholder: "https://youtube.com/@silva_eletrica", tooltip: "Vídeos no YouTube." },
          { id: "link_linkedin", label: "Perfil Profissional no LinkedIn", type: "url", allowOmit: true, omitLabel: "Omitir", placeholder: "https://linkedin.com/in/perfil_profissional", tooltip: "Perfil no LinkedIn." },
          { id: "link_apps_servicos", label: "Perfil em Apps de Serviços (GetNinjas, Habitissimo, OLX)", type: "url", allowOmit: true, omitLabel: "Omitir", placeholder: "https://plataforma.com/...", tooltip: "Perfil em apps de contratação." },
          { id: "links_extras_sameas", label: "Outros Canais Digitais", type: "repeater_simple", maxItems: 5, addButtonText: "+ Adicionar Mais Plataformas", placeholder: "https://...", tooltip: "Outros links públicos." }
        ]
      },
      {
        stepNumber: 11,
        id: "bloco_11_avatar_prestador",
        title: "BLOCO 11: MÓDULO AVATAR - O PERFIL DO CONTRATANTE",
        subtitle: "Psicologia do tomador de serviços.",
        infoBanner: "Psicologia do Contratante de Serviços: Quem contrata um prestador busca solução rápida, confiabilidade e segurança.",
        fields: [
          {
            id: "avatar_perfil_contratante",
            label: "1. Quem é o Tomador de Decisão do Serviço?",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Donos de Imóveis Próprios", text: "Donos de Casas / Apartamentos Próprios (Exigem acabamento)" },
              { val: "Inquilinos / Locatários", text: "Inquilinos / Locatários (Reparos rápidos de entrega)" },
              { val: "Síndicos e Condomínios", text: "Síndicos e Condomínios (Exigem nota fiscal e contrato)" },
              { val: "Empresas e Escritórios", text: "Gerentes de Empresas e Lojas (Serviços pós-expediente)" }
            ],
            allowOther: true,
            otherLabel: "Outro perfil contratante (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Produtores rurais e administradores de galpões",
            otherMaxLength: 135,
            tooltip: "Perfil do contratante."
          },
          {
            id: "avatar_padrao_compra",
            label: "2. Comportamento em Relação a Preços:",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Busca Alta Confiança", text: "Busca Confiança: Paga mais por quem resolve de primeira" },
              { val: "Busca Economia", text: "Busca Economia: Prioriza o menor orçamento" },
              { val: "Focado em Emergência", text: "Emergência: Quer quem atende mais rápido" }
            ],
            allowOther: true,
            otherLabel: "Outro padrão de compra (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Pagamento faturado por medições",
            otherMaxLength: 135,
            tooltip: "Sensibilidade a preço."
          },
          {
            id: "avatar_maior_medo",
            label: "3. Maior Medo com Outros Prestadores:",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Profissional que atrasa ou some", text: "Profissional que atrasa ou some no meio do serviço" },
              { val: "Sujeira e desperdício de material", text: "Sujeira e desperdício de material" },
              { val: "Cobranças extras no final", text: "Falta de clareza com cobranças surpresa no final" },
              { val: "Medo de pessoas desconhecidas no lar", text: "Insegurança ao colocar pessoas desconhecidas no lar" }
            ],
            allowOther: true,
            otherLabel: "Outro receio (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Trabalho mal feito que gera retrabalho",
            otherMaxLength: 135,
            tooltip: "Principais receios do cliente."
          },
          {
            id: "avatar_canal_comunicacao",
            label: "4. Canal Preferido de Comunicação:",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "WhatsApp com fotos e vídeos", text: "WhatsApp com fotos e áudios claros" },
              { val: "Visita presencial olho no olho", text: "Visita presencial para conversar no local" },
              { val: "Proposta técnica em PDF", text: "Proposta técnica formal em PDF" }
            ],
            allowOther: true,
            otherLabel: "Outro canal (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Ligação telefônica direta",
            otherMaxLength: 135,
            tooltip: "Formato de alinhamento."
          },
          {
            id: "avatar_raiox_livre",
            label: "5. Raio-X Livre do Contratante Ideal (Campo Aberto Opcional)",
            type: "textarea",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir Raio-X Livre",
            maxLength: 450,
            placeholder: "Ex: Famílias e administradores que buscam prestadores uniformizados, pontuais e com ferramentas próprias para resolver reparos com limpeza e segurança comprovada.",
            tooltip: "Resumo do contratante ideal."
          }
        ]
      }
    ]
  },

  profissional_liberal: {
    id: "profissional_liberal",
    storageKey: "geo_engine_liberal_professional",
    badgeIcon: "⚖️",
    badgeText: "Profissional Liberal",
    cardTitle: "Profissional Liberal Regulamentado",
    cardDescription: "Médicos, advogados, dentistas, psicólogos, engenheiros e contadores com Conselho de Classe.",
    defaultSchemaType: "ProfessionalService",
    submitButtonText: "Revisar Dados & Auditar com IA →",
    steps: [
      {
        stepNumber: 1,
        id: "bloco_01_identidade_liberal",
        title: "BLOCO 01: IDENTIDADE PROFISSIONAL & MARCA PESSOAL",
        subtitle: "Dados da autoridade e do consultório/escritório.",
        fields: [
          {
            id: "titulacao_formal",
            label: "1. Titulação Formal e Pronome *",
            type: "select_with_other",
            required: true,
            schemaProp: "honorificPrefix",
            tooltip: "Pronome profissional formal.",
            options: [
              { val: "Dr.", text: "Dr." }, { val: "Dra.", text: "Dra." },
              { val: "Prof. Me.", text: "Prof. Me." }, { val: "Prof. Dr.", text: "Prof. Dr." },
              { val: "Esp.", text: "Esp. (Especialista)" },
              { val: "Sem titulação formal", text: "Sem titulação formal (Apenas Nome)" },
              { val: "OTHER", text: "Outra titulação" }
            ],
            otherLabel: "Digite a titulação (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Eng., Arq., Perito",
            otherMaxLength: 135
          },
          { id: "nome_profissional", label: "2. Nome Completo do Profissional *", type: "text", required: true, schemaProp: "name", placeholder: "Ex: Dra. Helena Souza ou Lucas Fernandes", tooltip: "Nome civil registrado no conselho." },
          { id: "nome_clinica_escritorio", label: "3. Nome da Clínica / Consultório / Escritório", type: "text", required: false, allowOmit: true, omitLabel: "Omitir / Atua com Nome Próprio", schemaProp: "alternateName", placeholder: "Ex: Consultório de Fisioterapia e Saúde Integrada", tooltip: "Nome fantasia do espaço." },
          { id: "documento_fiscal_liberal", label: "4. CNPJ da Empresa ou CPF / Carnê-Leão", type: "text", required: false, allowOmit: true, omitLabel: "Omitir dado fiscal do código público", schemaProp: "taxID", placeholder: "00.000.000/0000-00", tooltip: "Dado fiscal invisível no texto aberto para comprovar existência legal." },
          { id: "whatsapp_principal", label: "5.1 WhatsApp Comercial para Agendamentos *", type: "phone", required: true, defaultPrefix: "+55 ", schemaProp: "telephone", placeholder: "+55 11 97777-0000", tooltip: "WhatsApp da recepção ou agendamentos." },
          { id: "telefone_fixo", label: "5.2 Telefone Fixo / Recepção", type: "phone", required: false, allowOmit: true, omitLabel: "Omitir", placeholder: "+55 11 3000-0000", tooltip: "Linha fixa da recepção." },
          { id: "telegram_comercial", label: "5.3 Telegram de Atendimento", type: "text", required: false, allowOmit: true, omitLabel: "Omitir", placeholder: "Ex: @consultorio_helena", tooltip: "Telegram institucional." },
          { id: "email_comercial", label: "5.4 E-mail Institucional Oficial *", type: "email", required: true, schemaProp: "email", placeholder: "Ex: contato@consultorioexemplo.com.br", tooltip: "E-mail para comunicações formais." },
          { id: "ano_fundacao", label: "6. Anos de Atuação / Formação Prática *", type: "select", required: true, schemaProp: "foundingDate", options: generateYearsList(100, "Mais de 100 anos"), tooltip: "Tempo de exercício profissional." },
          { id: "descricao_otimizada", label: "7. Apresentação Técnica para Motores de IA *", type: "textarea", required: true, minLength: 150, maxLength: 525, schemaProp: "description", placeholder: "Ex: Fisioterapeuta clínica especializada em reabilitação traumato-ortopédica e dores crônicas articulares. Atendimento com método individualizado, infraestrutura acessível e emissão de recibo detalhado para pedido de reembolso.", tooltip: "Resumo da prática e diferenciais." }
        ]
      },
      {
        stepNumber: 2,
        id: "bloco_02_conselho_formacao",
        title: "BLOCO 02: REGULAMENTAÇÃO, CONSELHO & FORMAÇÃO",
        subtitle: "Habilitação legal perante as IAs.",
        fields: [
          {
            id: "conselho_classe",
            label: "1. Conselho de Classe Profissional *",
            type: "select_with_other",
            required: true,
            schemaProp: "@type",
            tooltip: "Entidade regulamentadora.",
            options: [
              { val: "Physician", text: "CRM (Medicina)" }, { val: "Dentist", text: "CRO (Odontologia)" },
              { val: "LegalService", text: "OAB (Advocacia)" }, { val: "ProfessionalService_CREA", text: "CREA / CAU (Engenharia / Arquitetura)" },
              { val: "MedicalBusiness_CRP", text: "CRP (Psicologia)" }, { val: "HealthAndBeautyBusiness_CREF", text: "CREF (Educação Física)" },
              { val: "MedicalBusiness_CREFITO", text: "CREFITO (Fisioterapia & T.O.)" }, { val: "MedicalBusiness_CRN", text: "CRN (Nutrição)" },
              { val: "AccountingService", text: "CRC (Contabilidade)" }, { val: "MedicalBusiness_CRFa", text: "CRFa (Fonoaudiologia)" },
              { val: "MedicalBusiness_COREN", text: "COREN (Enfermagem)" }, { val: "VeterinaryCare", text: "CRMV (Veterinária)" },
              { val: "OTHER", text: "Outro Conselho Regulamentado" }
            ],
            otherLabel: "Especifique o conselho *",
            otherPlaceholder: "Ex: CRF (Farmácia)",
            otherMaxLength: 135
          },
          { id: "numero_registro_conselho", label: "2. Número de Inscrição + UF no Conselho *", type: "text", required: true, schemaProp: "identifier", placeholder: "Ex: CREFITO-3/123456-F", tooltip: "Registro oficial no conselho." },
          { id: "possui_rqe_especialidade", label: "3. Título de Especialista / RQE / Pós Registrada", type: "tri_state_with_input", defaultVal: "Omitir", inputLabel: "Título da Especialidade (Máx. 135 caracteres)", inputPlaceholder: "Ex: Fisioterapia Neurofuncional", maxLength: 135, schemaProp: "knowsAbout", tooltip: "Especialização formal registrada." },
          { id: "graduacao_academica", label: "4.1 Universidade de Graduação *", type: "text", required: true, schemaProp: "alumniOf", placeholder: "Ex: Universidade Federal de São Paulo (UNIFESP)", tooltip: "Faculdade de graduação." },
          { id: "pos_graduacao_mestrado", label: "4.2 Pós-Graduação / Mestrado / Residência", type: "text", required: false, allowOmit: true, omitLabel: "Omitir", maxLength: 180, placeholder: "Ex: Pós-Graduação em Reabilitação Osteoarticular", tooltip: "Titulação acadêmica." },
          { id: "atuacao_institucional_relevante", label: "4.3 Experiência Institucional Relevante (Máx. 180 caracteres)", type: "text", required: false, allowOmit: true, omitLabel: "Omitir", maxLength: 180, placeholder: "Ex: Preceptora de estágio clínico e membro de comitê de ética", tooltip: "Vínculos de autoridade institucional." }
        ]
      },
      {
        stepNumber: 3,
        id: "bloco_03_modalidade_localizacao_liberal",
        title: "BLOCO 03: MODALIDADE DE ATENDIMENTO & LOCALIZAÇÃO",
        subtitle: "Consultório físico, domiciliar/remoto ou rotina híbrida.",
        fields: [
          {
            id: "modalidade_principal_liberal",
            label: "Forma Principal de Atendimento *",
            type: "radio_cards",
            required: true,
            defaultVal: "Fisico",
            tooltip: "Modelo de atendimento.",
            options: [
              { val: "Fisico", text: "Opção A: Em Espaço Físico Próprio / Consultório / Escritório" },
              { val: "Remoto_Domiciliar", text: "Opção B: Domiciliar / Home Care / Remoto / No Cliente" },
              { val: "Hibrido", text: "Opção C: Modelo Híbrido (Consultório Próprio + Domicílio / Online)" }
            ]
          },
          { id: "painel_sede_fisica_header", label: "🏛️ PARTE A: O SEU ESPAÇO FÍSICO / SEDE COMERCIAL", type: "section_divider", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"] },
          { id: "cep", label: "CEP da Sede *", type: "cep", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], checkboxAddon: { id: "endereco_rural", label: "Endereço Rural / Rodovia" }, schemaProp: "postalCode", placeholder: "00000-000", tooltip: "CEP do consultório." },
          { id: "logradouro", label: "Logradouro (Rua / Avenida) *", type: "text", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], schemaProp: "streetAddress", placeholder: "Ex: Avenida Paulista", tooltip: "Rua do consultório." },
          { id: "numero_imovel", label: "Número Oficial *", type: "text", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], checkboxAddon: { id: "sem_numero", label: "S/N" }, placeholder: "Ex: 500", tooltip: "Número do imóvel." },
          {
            id: "complemento_complexo",
            label: "Detalhamento Comercial (Edifício, Torre, Sala)",
            type: "group_row",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Fisico", "Hibrido"],
            allowOmit: true,
            omitLabel: "Omitir",
            tooltip: "Sala e andar.",
            subfields: [
              { id: "edificio_galeria", label: "Edifício / Centro Médico", placeholder: "Ex: Medical Plaza" },
              { id: "bloco_torre", label: "Torre / Bloco", placeholder: "Ex: Torre A" },
              { id: "sala_loja", label: "Sala / Andar", placeholder: "Ex: Sala 302 - 3º Andar" }
            ]
          },
          { id: "ponto_referencia", label: "Ponto de Referência", type: "text", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], allowOmit: true, omitLabel: "Omitir", maxLength: 225, placeholder: "Ex: Em frente ao metrô", tooltip: "Referência visual." },
          { id: "bairro", label: "Bairro *", type: "text", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], schemaProp: "addressNeighborhood", placeholder: "Ex: Bela Vista", tooltip: "Bairro da sede." },
          {
            id: "macro_regiao",
            label: "Macro-Região / Zona (Opcional)",
            type: "select_with_other",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Fisico", "Hibrido"],
            allowOmit: true,
            omitLabel: "Omitir",
            tooltip: "Região urbana.",
            options: [
              { val: "Centro", text: "Centro" }, { val: "Zona Sul", text: "Zona Sul" },
              { val: "Zona Norte", text: "Zona Norte" }, { val: "Região Leste", text: "Região Leste" },
              { val: "Região Oeste", text: "Região Oeste" }, { val: "OTHER", text: "Outra Região" }
            ],
            otherLabel: "Especifique a região (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Polo Hospitalar Central",
            otherMaxLength: 135
          },
          { id: "cidade", label: "Cidade *", type: "text", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], schemaProp: "addressLocality", placeholder: "Ex: São Paulo", tooltip: "Município da sede." },
          { id: "estado_uf", label: "Estado (UF) *", type: "select", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], schemaProp: "addressRegion", options: BRAZIL_STATES, tooltip: "Unidade Federativa." },
          { id: "geolocalizacao", label: "Geolocalização (Latitude e Longitude)", type: "geo_coordinates", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], allowOmit: true, omitLabel: "Omitir", latPlaceholder: "-23.5505", lngPlaceholder: "-46.6333", helpTitle: "Como copiar Latitude e Longitude", helpSteps: "Copie as coordenadas numéricas no Google Maps.", tooltip: "Pino de GPS da clínica." },
          { id: "alvara_municipal", label: "Alvará Municipal da Sede", type: "tri_state_with_input", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], defaultVal: "Omitir", inputLabel: "Número do Alvará (Opcional)", inputPlaceholder: "Ex: 12345/2026", tooltip: "Alvará da sede." },
          { id: "licenca_sanitaria", label: "Licença Sanitária (CNES/VISA)", type: "tri_state_with_input", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], defaultVal: "Omitir", inputLabel: "Número da Licença (Opcional)", inputPlaceholder: "Ex: CNES 987654", tooltip: "Licença sanitária." },
          { id: "avcb_bombeiros", label: "Auto de Vistoria do Bombeiro (AVCB)", type: "tri_state", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], defaultVal: "Omitir", tooltip: "AVCB da clínica." },

          { id: "painel_operacao_remota_header", label: "🚗 PARTE B: OPERAÇÃO EXTERNA / DOMICILIAR / REMOTA", type: "section_divider", conditionField: "modalidade_principal_liberal", conditionIn: ["Remoto_Domiciliar", "Hibrido"] },
          { id: "cep_epicentro", label: "CEP da Base de Saída Operacional *", type: "cep", conditionField: "modalidade_principal_liberal", conditionIn: ["Remoto_Domiciliar", "Hibrido"], placeholder: "00000-000", tooltip: "CEP ponto zero de deslocamento." },
          { id: "estado_uf_externo", label: "Estado Principal de Atuação (UF) *", type: "select", conditionField: "modalidade_principal_liberal", conditionIn: ["Remoto_Domiciliar", "Hibrido"], options: BRAZIL_STATES, tooltip: "UF externa." },
          {
            id: "raio_deslocamento",
            label: "Raio Máximo para Atendimentos Presenciais *",
            type: "select_with_other",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Remoto_Domiciliar", "Hibrido"],
            schemaProp: "geoRadius",
            tooltip: "Distância máxima para visitas presenciais.",
            options: [
              { val: "Até 15 km", text: "Até 15 km" }, { val: "Até 30 km", text: "Até 30 km" },
              { val: "Até 60 km", text: "Até 60 km" }, { val: "Até 100 km", text: "Até 100 km" },
              { val: "Acima de 100 km / Todo o Estado", text: "Todo o Estado" },
              { val: "Cobertura Nacional / Online", text: "Nacional / Online" },
              { val: "OTHER", text: "Outra condição" }
            ],
            otherLabel: "Descreva a condição de deslocamento (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Atendimento domiciliar na capital e online nacional",
            otherMaxLength: 135
          },
          { id: "cidades_atendidas", label: "Cidades e Regiões Atendidas *", type: "textarea_short", conditionField: "modalidade_principal_liberal", conditionIn: ["Remoto_Domiciliar", "Hibrido"], schemaProp: "areaServed", placeholder: "Ex: São Paulo, Campinas e região metropolitana", tooltip: "Cidades atendidas." },
          {
            id: "realiza_teleatendimento_online",
            label: "Realiza Consultas / Sessões Online Regulamentadas:",
            type: "select_with_other",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Remoto_Domiciliar", "Hibrido"],
            defaultVal: "Sim",
            tooltip: "Teleatendimento por vídeo.",
            options: [
              { val: "Sim", text: "Sim - Realiza Consultas Online em Plataforma Segura" },
              { val: "Não", text: "Não - Apenas Atendimento Presencial" },
              { val: "Omitir", text: "Omitir" },
              { val: "OTHER", text: "Outro formato" }
            ],
            otherLabel: "Especifique em uma frase (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Sessões online e acompanhamento de treinos via aplicativo",
            otherMaxLength: 135
          }
        ]
      },
      {
        stepNumber: 4,
        id: "bloco_04_horarios_urgencia_liberal",
        title: "BLOCO 04: HORÁRIOS, FORMATO DE ATENDIMENTO & REGIME DE URGÊNCIA",
        subtitle: "Formato de sessão e sobreaviso.",
        fields: [
          {
            id: "formato_predominante_sessao",
            label: "1. Formato Predominante de Atendimento *",
            type: "checkbox_group",
            required: true,
            options: [
              { val: "Consultas Individuais com Hora Marcada", text: "Consultas / Sessões Individuais com Hora Marcada" },
              { val: "Atendimento em Grupo / Treinos", text: "Atendimento em Grupo / Treinos Coletivos" },
              { val: "Ordem de Chegada", text: "Atendimento por Ordem de Chegada" },
              { val: "Espaços de Terceiros", text: "Atendimento em Espaços de Terceiros (Hospitais, Academias)" },
              { val: "Atuação Externa Institucional", text: "Atuação Externa (Audiências, Cartórios, Perícias)" }
            ],
            allowOther: true,
            otherLabel: "Outro formato (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Avaliações ergonômicas presenciais em empresas",
            otherMaxLength: 135,
            tooltip: "Estilo das consultas ou sessões."
          },
          { id: "grade_horarios", label: "2. Horários Semanais de Agenda *", type: "opening_hours_grid", allowCopyMondayToFriday: true, copyButtonText: "Copiar horário de Segunda para Sexta-feira", tooltip: "Grade semanal de atendimento." },
          { id: "atende_urgencia_liberal", label: "3. Atendimento de Urgência / Sobreaviso Técnico:", type: "tri_state", defaultVal: "Omitir", tooltip: "Disponibilidade emergencial." },
          {
            id: "publico_urgencia_liberal",
            label: "3.1 Para quem a urgência é disponibilizada?",
            type: "select_with_other",
            conditionField: "atende_urgencia_liberal",
            conditionVal: "Sim",
            tooltip: "Público atendido em urgências.",
            options: [
              { val: "Exclusivo Carteira Ativa", text: "Exclusivo para pacientes/clientes já em acompanhamento ativo" },
              { val: "Disponível para Novos Clientes", text: "Disponível para novos chamados de urgência imediata" },
              { val: "Disponível para Ambos os Públicos", text: "Disponível para ambos os públicos" },
              { val: "OTHER", text: "Outra condição de urgência" }
            ],
            otherLabel: "Especifique em uma frase (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Plantão em finais de semana para atletas em competição",
            otherMaxLength: 135
          },
          { id: "acionamento_urgencia_liberal", label: "3.2 Como funciona o acionamento de urgência?", type: "text", conditionField: "atende_urgencia_liberal", conditionVal: "Sim", maxLength: 180, placeholder: "Ex: Linha direta de WhatsApp para intercorrências agudas de pacientes", tooltip: "Como acionar o sobreaviso." },
          {
            id: "operacao_feriados",
            label: "4. Atendimento em Feriados:",
            type: "select_with_other",
            defaultVal: "Omitir",
            tooltip: "Regime em feriados.",
            options: [
              { val: "Omitir", text: "Omitir" }, { val: "Atende em todos os feriados", text: "Atende em todos os feriados" },
              { val: "Fechado em todos os feriados", text: "Fechado em todos os feriados" },
              { val: "Atendimento especial em feriados selecionados", text: "Atendimento especial em feriados selecionados" },
              { val: "OTHER", text: "Outra condição" }
            ],
            otherLabel: "Descreva em uma frase (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Plantão telefônico para esclarecimento de dúvidas",
            otherMaxLength: 135
          },
          {
            id: "feriados_especificos",
            label: "Feriados com atendimento:",
            type: "checkbox_group",
            conditionField: "operacao_feriados",
            conditionVal: "Atendimento especial em feriados selecionados",
            options: [
              { val: "Carnaval", text: "Carnaval" }, { val: "Páscoa", text: "Páscoa" },
              { val: "Feriados Nacionais", text: "Feriados Nacionais" }, { val: "Aniversário da Cidade", text: "Aniversário da Cidade" },
              { val: "Natal e Ano Novo", text: "Natal e Ano Novo" }
            ],
            tooltip: "Feriados com atendimento especial."
          }
        ]
      },
      {
        stepNumber: 5,
        id: "bloco_05_convenios_honorarios_liberal",
        title: "BLOCO 05: CONVÊNIOS, HONORÁRIOS & REEMBOLSO",
        subtitle: "Planos e ética de honorários.",
        fields: [
          { id: "atende_planos_convenios", label: "1. Atende por Planos de Saúde ou Convênios?", type: "tri_state_with_input", defaultVal: "Omitir", inputLabel: "Principais Convênios (Máx. 180 caracteres)", inputPlaceholder: "Ex: Bradesco Saúde, Amil, SulAmérica", maxLength: 180, tooltip: "Convênios aceitos." },
          { id: "emite_recibo_reembolso", label: "2. Fornece Recibo/Nota para Reembolso do Plano?", type: "tri_state", defaultVal: "Sim", tooltip: "Recibo discriminado para reembolso." },
          { id: "retorno_incluso", label: "3. Consulta Inicial inclui Retorno sem custo?", type: "tri_state", defaultVal: "Omitir", tooltip: "Direito a consulta de retorno." },
          {
            id: "faixa_precos_reais",
            label: "4. Honorários Médios de Referência (R$)",
            type: "price_range_group",
            allowOmit: true,
            omitLabel: "Omitir valores (Conformidade Ética do Conselho)",
            tooltip: "Valores éticos.",
            subfields: [
              { id: "menor_preco", label: "Consulta Inicial / Avaliação (R$)", placeholder: "Ex: 250,00" },
              { id: "maior_preco", label: "Tratamento / Pacote (R$)", placeholder: "Ex: 2.500,00" },
              { id: "ticket_medio", label: "Honorário Médio Habitual (R$)", placeholder: "Ex: 350,00" }
            ]
          },
          {
            id: "formas_pagamento",
            label: "5.1 Meios de Pagamento Aceitos",
            type: "checkbox_group",
            schemaProp: "paymentAccepted",
            options: [
              { val: "Pix", text: "Pix" }, { val: "Dinheiro em Espécie", text: "Dinheiro em Espécie" },
              { val: "Cartão de Débito", text: "Cartão de Débito" }, { val: "Boleto Bancário", text: "Boleto Bancário" },
              { val: "Cartão de Crédito", text: "Cartão de Crédito" }
            ],
            allowOther: true,
            otherLabel: "Outro meio (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Transferência TED",
            otherMaxLength: 135,
            tooltip: "Meios de cobrança."
          },
          {
            id: "parcelamento_cartao",
            label: "5.2 Parcelamento no Cartão de Crédito",
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
            label: "5.3 Outras Facilidades Próprias",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Assinatura Mensal", text: "Planos por Assinatura Mensal / Pacotes" },
              { val: "Honorários no Êxito", text: "Honorários Vinculados ao Êxito da Causa" },
              { val: "Medições por Etapa", text: "Pagamento Parcelado por Medições de Projeto" }
            ],
            allowOther: true,
            otherLabel: "Outra facilidade (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Pacotes semestrais com acompanhamento contínuo",
            otherMaxLength: 135,
            tooltip: "Facilidades de pagamento."
          }
        ]
      },
      {
        stepNumber: 6,
        id: "bloco_06_excelencia_liberal",
        title: "BLOCO 06: EXCELÊNCIA OPERACIONAL, BIOSSEGURANÇA & COMODIDADES",
        subtitle: "Conforto no espaço físico e padrão em domicílio.",
        fields: [
          { id: "sub_header_fisico_b6", label: "🏛️ PARTE 1: COMODIDADES DO ESPAÇO FÍSICO", type: "section_divider", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"] },
          { id: "ar_condicionado", label: "Climatização: Salas com Ar-Condicionado?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], tooltip: "Ar-condicionado nas salas." },
          { id: "wifi_gratis", label: "Conectividade: Wi-Fi Gratuito para Clientes?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], tooltip: "Wi-Fi na recepção." },
          { id: "estacionamento_proprio", label: "Estacionamento: Possui Estacionamento no local?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], tooltip: "Estacionamento." },
          { id: "servico_manobrista", label: "Manobrista: Serviço de Valet no local?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], tooltip: "Manobrista." },
          { id: "embarque_desembarque_pne", label: "Acessibilidade: Área coberta de embarque para gestantes e PNE?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], tooltip: "Embarque assistido." },
          { id: "isolamento_acustico_sigilo", label: "Privacidade: Salas com isolamento acústico para sigilo?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], tooltip: "Sigilo acústico." },
          { id: "biosseguranca_autoclave", label: "Biossegurança: Esterilização em Autoclave?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], tooltip: "Autoclave." },
          { id: "vestiarios_duchas", label: "Vestiários: Possui vestiários privativos completos?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], tooltip: "Vestiários." },
          { id: "familia_lactantes", label: "Lactantes: Espaço reservado para amamentação e trocador?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], tooltip: "Espaço para bebês." },
          { id: "seguranca_recepcao", label: "Segurança: Monitorado por câmeras na recepção e portaria?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], tooltip: "Segurança na recepção." },

          { id: "sub_header_remoto_b6", label: "🚗 PARTE 2: ATENDIMENTO EXTERNO / DOMICILIAR / REMOTO", type: "section_divider", conditionField: "modalidade_principal_liberal", conditionIn: ["Remoto_Domiciliar", "Hibrido"] },
          {
            id: "politica_primeira_visita_liberal",
            label: "Política da Primeira Visita Domiciliar:",
            type: "select_with_other",
            defaultVal: "Omitir",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Remoto_Domiciliar", "Hibrido"],
            tooltip: "Regra para avaliação domiciliar.",
            options: [
              { val: "Omitir", text: "Omitir" }, { val: "Visita / Avaliação Inicial Gratuita", text: "Visita / Avaliação Inicial Gratuita" },
              { val: "Cobra Taxa de Visita Técnica", text: "Cobra Taxa de Visita / Deslocamento" },
              { val: "Valor abatido se fechar tratamento", text: "Valor abatido caso feche o plano completo" },
              { val: "OTHER", text: "Outra condição" }
            ],
            otherLabel: "Descreva em uma frase (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Isento na primeira consulta para planos trimestrais",
            otherMaxLength: 135
          },
          { id: "custos_logisticos_viagem", label: "Logística: Custos de combustível e pedágio descritos na proposta?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Remoto_Domiciliar", "Hibrido"], tooltip: "Custos de deslocamento." },
          { id: "identificacao_domiciliar_conselho", label: "Identificação: Atua com carteira do conselho disponível?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Remoto_Domiciliar", "Hibrido"], tooltip: "Identificação funcional." },
          { id: "maleta_equipamentos_moveis", label: "Equipamentos: Dispõe de maleta técnica e aparelhos portáteis próprios?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Remoto_Domiciliar", "Hibrido"], tooltip: "Equipamento móvel." },
          { id: "contrato_digital_previo", label: "Contrato: Formaliza o atendimento mediante termo assinado digitalmente?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Remoto_Domiciliar", "Hibrido"], tooltip: "Contrato digital." },
          { id: "plataforma_online_criptografada", label: "Online Seguro: Utiliza plataforma criptografada para teleconsultas?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Remoto_Domiciliar", "Hibrido"], tooltip: "Teleconsulta segura." }
        ]
      },
      {
        stepNumber: 7,
        id: "bloco_07_acolhimento_liberal",
        title: "BLOCO 07: ACOLHIMENTO ESPECIALIZADO, ACESSIBILIDADE & DIVERSIDADE",
        subtitle: "Acessibilidade integral e humanização.",
        fields: [
          { id: "pne_rampa_rua", label: "Acessibilidade (PNE): Entrada sem degraus ou com rampa suave?", type: "tri_state", defaultVal: "Omitir", tooltip: "Rampa na entrada." },
          { id: "pne_elevador_maca", label: "Acessibilidade (PNE): Elevador adaptado e portas largas para cadeiras e macas?", type: "tri_state", defaultVal: "Omitir", tooltip: "Portas largas e elevador." },
          { id: "pne_banheiro_barras", label: "Acessibilidade (PNE): Banheiro adaptado com barras de apoio?", type: "tri_state", defaultVal: "Omitir", tooltip: "Sanitário acessível." },
          { id: "obesos_poltronas", label: "Pessoas Obesas: Poltronas especiais reforçadas?", type: "tri_state", defaultVal: "Omitir", tooltip: "Mobiliário reforçado." },
          { id: "mobilidade_cadeira_rodas_interna", label: "Mobilidade: Possui cadeira de rodas no local para suporte interno?", type: "tri_state", defaultVal: "Omitir", tooltip: "Cadeira de rodas para transporte interno." },
          { id: "acolhimento_autismo_tea", label: "Neurodiversidade (TEA): Ambiente preparado com menor poluição sonora/luminosa?", type: "tri_state", defaultVal: "Omitir", tooltip: "Manejo para TEA." },
          { id: "acolhimento_pediatrico", label: "Pediátrico: Atendimento adaptado para bebês e crianças?", type: "tri_state", defaultVal: "Omitir", tooltip: "Atendimento infantil." },
          { id: "acolhimento_geriatrico", label: "Geriátrico: Atendimento especializado para idosos e acamados?", type: "tri_state", defaultVal: "Omitir", tooltip: "Atendimento a idosos." },
          { id: "comunicacao_libras", label: "LIBRAS: Profissional ou equipe capacitada em LIBRAS?", type: "tri_state", defaultVal: "Omitir", tooltip: "Comunicação em LIBRAS." },
          { id: "comunicacao_idiomas", label: "Idiomas: Consulta ou laudo em Inglês ou Espanhol?", type: "tri_state", defaultVal: "Omitir", tooltip: "Atendimento em outros idiomas." },
          { id: "outro_acolhimento_liberal", label: "Outro diferencial de acolhimento (Especificar)", type: "tri_state_with_input", defaultVal: "Omitir", inputLabel: "Descreva em uma frase (Máx. 135 caracteres)", inputPlaceholder: "Ex: Atendimento com hora marcada e sem fila de espera", maxLength: 135, tooltip: "Outro acolhimento." }
        ]
      },
      {
        stepNumber: 8,
        id: "bloco_08_reconhecimento_liberal",
        title: "BLOCO 08: RECONHECIMENTO TÉCNICO, ASSOCIAÇÕES & DOCÊNCIA",
        subtitle: "Autoridade curricular.",
        fields: [
          { id: "membro_sociedades_cientificas", label: "1. Membro Ativo de Sociedades Científicas da sua Área?", type: "tri_state_with_input", defaultVal: "Omitir", inputLabel: "Entidades (Máx. 225 caracteres)", inputPlaceholder: "Ex: Membro da Sociedade Brasileira de Cardiologia", maxLength: 225, schemaProp: "memberOf", tooltip: "Sociedades científicas." },
          { id: "atuacao_docencia_pesquisa", label: "2. Atuação Acadêmica: Atua ou atuou como Professor Universitário ou Pesquisador?", type: "tri_state_with_input", defaultVal: "Omitir", inputLabel: "Instituição e Cargo (Máx. 225 caracteres)", inputPlaceholder: "Ex: Professor de Pós-Graduação em Reabilitação", maxLength: 225, tooltip: "Experiência docente." }
        ]
      },
      {
        stepNumber: 9,
        id: "bloco_09_procedimentos_liberal",
        title: "BLOCO 09: PROCEDIMENTOS PRINCIPAIS & ATUAÇÕES EXCLUSIVAS",
        subtitle: "Procedimentos realizados.",
        fields: [
          {
            id: "catalogo_destaque",
            label: "1. Procedimentos / Serviços Principais (Limite de 5) *",
            type: "repeater",
            minItems: 1,
            maxItems: 5,
            addButtonText: "+ Adicionar Procedimento",
            schemaProp: "hasOfferCatalog",
            tooltip: "Procedimentos do consultório.",
            subfields: [
              { id: "item_nome", label: "Nome do Procedimento *", placeholder: "Ex: Reabilitação Osteoarticular e Fortalecimento Articular", required: true },
              { id: "item_descricao", label: "Breve Descrição Técnica *", placeholder: "Ex: Tratamento com exercícios de estabilização postural e liberação miofascial", maxLength: 210, required: true },
              { id: "item_preco", label: "Honorário de Referência (R$) (Opcional)", placeholder: "Ex: 280,00" }
            ]
          },
          { id: "possui_procedimento_exclusivo", label: "2. Realiza técnica ou exame raro/exclusivo na microrregião?", type: "tri_state_with_input", defaultVal: "Omitir", inputLabel: "Procedimento Exclusivo (Máx. 225 caracteres)", inputPlaceholder: "Ex: Avaliação Baropodométrica Digital e Confecção de Palmilhas sob Medida", maxLength: 225, tooltip: "Procedimento exclusivo na região." }
        ]
      },
      {
        stepNumber: 10,
        id: "bloco_10_ecossistema_liberal",
        title: "BLOCO 10: ECOSSISTEMA DIGITAL, ARTIGOS & PROVA SOCIAL",
        subtitle: "Canais digitais e currículo.",
        fields: [
          {
            id: "status_site_oficial",
            label: "1. Site Oficial / Consultório Virtual *",
            type: "radio_cards",
            defaultVal: "nao_possui",
            options: [
              { val: "possui_ativo", text: "Já possuo Site Oficial ativo" },
              { val: "em_ativacao", text: "Domínio em ativação (App 1B)" },
              { val: "nao_possui", text: "Não possuo presença web própria (Omitir)" }
            ],
            tooltip: "Website do consultório."
          },
          { id: "url_site_oficial", label: "Link do Site Oficial", type: "url", conditionField: "status_site_oficial", conditionNotVal: "nao_possui", schemaProp: "url", placeholder: "https://www.consultorioexemplo.com.br", tooltip: "URL principal." },
          { id: "link_google_maps", label: "Perfil no Google Maps / Avaliações de Pacientes", type: "url", allowOmit: true, omitLabel: "Omitir", schemaProp: "hasMap", placeholder: "https://maps.google.com/...", tooltip: "Google Maps." },
          { id: "link_plataforma_classe", label: "Diretórios de Especialistas (Doctoralia, Jusbrasil, etc.)", type: "url", allowOmit: true, omitLabel: "Omitir", placeholder: "https://plataforma.com/especialista/...", tooltip: "Diretórios médicos ou jurídicos." },
          { id: "link_curriculo_lattes", label: "Currículo Lattes / Publicações Científicas", type: "url", allowOmit: true, omitLabel: "Omitir", placeholder: "http://lattes.cnpq.br/...", tooltip: "Currículo Lattes ou acadêmico." },
          { id: "link_instagram", label: "Instagram Profissional", type: "url", allowOmit: true, omitLabel: "Omitir", placeholder: "https://instagram.com/perfil_profissional", tooltip: "Instagram profissional." },
          { id: "link_linkedin", label: "LinkedIn Profissional", type: "url", allowOmit: true, omitLabel: "Omitir", placeholder: "https://linkedin.com/in/perfil_profissional", tooltip: "LinkedIn." },
          { id: "link_youtube", label: "Canal do YouTube / Podcast", type: "url", allowOmit: true, omitLabel: "Omitir", placeholder: "https://youtube.com/@canal_saude", tooltip: "Canal no YouTube." },
          { id: "links_extras_sameas", label: "Outros Links / Artigos", type: "repeater_simple", maxItems: 5, addButtonText: "+ Adicionar Mais Plataformas", placeholder: "https://...", tooltip: "Links adicionais." }
        ]
      },
      {
        stepNumber: 11,
        id: "bloco_11_avatar_liberal",
        title: "BLOCO 11: MÓDULO AVATAR - O PERFIL DO PACIENTE / CLIENTE",
        subtitle: "Psicologia do paciente ou assistido.",
        infoBanner: "Psicologia do Paciente / Cliente: Este bloco ensina à IA para qual estado emocional e nível de exigência o seu método foi desenhado.",
        fields: [
          {
            id: "avatar_motivacao_central",
            label: "1. Motivação Central da Busca:",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Alívio de Dor ou Crise", text: "Alívio de Dor ou Crise Aguda (Urgência de saúde ou física)" },
              { val: "Prevenção e Longevidade", text: "Prevenção, Longevidade e Manutenção da Saúde" },
              { val: "Alta Performance", text: "Alta Performance e Estética" },
              { val: "Segunda Opinião", text: "Resolução de Incerteza / Diagnóstico Preciso / Segunda Opinião" }
            ],
            allowOther: true,
            otherLabel: "Outra motivação (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Retorno seguro às atividades físicas após cirurgia",
            otherMaxLength: 135,
            tooltip: "Motivação do paciente."
          },
          {
            id: "avatar_percepcao_valor",
            label: "2. Perfil Socioeconômico & Honorários:",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Alto Padrão", text: "Cliente de Alto Padrão (Exclusividade, pontualidade e sigilo)" },
              { val: "Classe Média Consciente", text: "Classe Média Consciente (Valoriza formação e facilidade de pagamento)" },
              { val: "Focado em Reembolso", text: "Focado em Reembolso / Convênio (Exige documentação para reembolso)" }
            ],
            allowOther: true,
            otherLabel: "Outro comportamento financeiro (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Atendimento empresarial corporativo",
            otherMaxLength: 135,
            tooltip: "Perfil financeiro."
          },
          {
            id: "avatar_postura_desejada",
            label: "3. Postura Profissional Esperada:",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Humanizado e Empático", text: "Acolhimento Humanizado, Empático e Atento" },
              { val: "Firme e Científico", text: "Postura Firme, Técnica, Científica e Assertiva" },
              { val: "Acompanhamento Próximo", text: "Acompanhamento Próximo e Didático" }
            ],
            allowOther: true,
            otherLabel: "Outra postura (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Didática simples sem jargões técnicos",
            otherMaxLength: 135,
            tooltip: "Estilo de acolhimento."
          },
          {
            id: "avatar_exigencia_inegociavel",
            label: "4. Exigência Inegociável do Paciente/Cliente:",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Pontualidade", text: "Pontualidade absoluta no horário agendado" },
              { val: "Privacidade", text: "Privacidade, sigilo profissional e discrição" },
              { val: "Clareza", text: "Clareza nas etapas do tratamento ou projeto" },
              { val: "Acessibilidade", text: "Facilidade de acesso, estacionamento e acessibilidade" }
            ],
            allowOther: true,
            otherLabel: "Outra exigência (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Atendimento exclusivo sem sala de espera cheia",
            otherMaxLength: 135,
            tooltip: "Fator inegociável."
          },
          {
            id: "avatar_raiox_livre",
            label: "5. Raio-X Livre do Paciente/Cliente Ideal (Campo Aberto Opcional)",
            type: "textarea",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir Raio-X Livre",
            maxLength: 450,
            placeholder: "Ex: Pacientes e profissionais que valorizam atendimentos com hora marcada, buscam alívio duradouro de dores crônicas com embasamento técnico e exigem recibo formal para restituição de convênio.",
            tooltip: "Resumo do paciente ideal."
          }
        ]
      }
    ]
  },

  especialista_digital: {
    id: "especialista_digital",
    storageKey: "geo_engine_digital_specialist",
    badgeIcon: "💡",
    badgeText: "Especialista Digital",
    cardTitle: "Especialista Digital & Negócio Online",
    cardDescription: "Infoprodutores, mentores, consultores online, criadores de conteúdo e plataformas SaaS sem fronteiras.",
    defaultSchemaType: "Person",
    submitButtonText: "Revisar Dados & Auditar com IA →",
    steps: [
      {
        stepNumber: 1,
        id: "bloco_01_identidade_digital",
        title: "BLOCO 01: IDENTIDADE DA MARCA PESSOAL OU EMPRESA DIGITAL",
        subtitle: "Configuração da autoridade digital.",
        fields: [
          {
            id: "estrutura_operacao_digital",
            label: "1. Estrutura Principal da Operação Digital *",
            type: "select_with_other",
            required: true,
            schemaProp: "@type",
            tooltip: "Tipo de autoridade digital.",
            options: [
              { val: "Person", text: "Especialista / Mentor / Autor (Marca Pessoal Individual)" },
              { val: "OnlineBusiness", text: "Empresa / Produtora Digital / Agência / Startup (Marca Institucional)" },
              { val: "OTHER", text: "Outra estrutura digital" }
            ],
            otherLabel: "Especifique a operação (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Hub Educacional de IA e Automação",
            otherMaxLength: 135
          },
          { id: "nome_especialista_marca", label: "2. Nome do Especialista ou Nome Fantasia da Operação *", type: "text", required: true, schemaProp: "name", placeholder: "Ex: Consultor Alfa ou Agência Escala Digital", tooltip: "Nome principal pelo qual é pesquisado." },
          { id: "razao_social", label: "3. Razão Social da Empresa Operadora", type: "text", required: false, allowOmit: true, omitLabel: "Omitir / Opera como Pessoa Física", schemaProp: "legalName", placeholder: "Ex: Alfa Cursos e Soluções Digitais Ltda", tooltip: "Razão social da empresa digital." },
          { id: "documento_fiscal_digital", label: "4. CNPJ da Empresa ou CPF Operacional", type: "text", required: false, allowOmit: true, omitLabel: "Omitir dado fiscal do código público", schemaProp: "taxID", placeholder: "00.000.000/0000-00", tooltip: "Dado fiscal invisível no código interno para comprovação de idoneidade." },
          { id: "whatsapp_principal", label: "5.1 WhatsApp Comercial / Link de Suporte *", type: "phone", required: true, defaultPrefix: "+55 ", schemaProp: "telephone", placeholder: "+55 11 96666-0000", tooltip: "WhatsApp oficial de suporte e vendas." },
          { id: "email_comercial", label: "5.2 E-mail Oficial de Atendimento e Suporte *", type: "email", required: true, schemaProp: "email", placeholder: "Ex: suporte@alfaead.com.br", tooltip: "E-mail de suporte ao aluno." },
          { id: "telegram_comercial", label: "5.3 Canal ou Grupo Oficial no Telegram", type: "text", required: false, allowOmit: true, omitLabel: "Omitir", placeholder: "https://t.me/comunidade_alfa", tooltip: "Canal do Telegram." },
          { id: "ano_fundacao", label: "6. Anos de Atuação no Mercado Digital *", type: "select", required: true, schemaProp: "foundingDate", options: generateYearsList(30, "Mais de 30 anos"), tooltip: "Tempo de mercado digital." },
          { id: "descricao_otimizada", label: "7. Apresentação do Especialista / Negócio para a IA *", type: "textarea", required: true, minLength: 150, maxLength: 525, schemaProp: "description", placeholder: "Ex: Especialista em estratégias de visibilidade semântica e Generative Engine Optimization (GEO) para negócios. Criador de metodologias práticas de mini-aplicações que posicionam marcas no topo das recomendações de inteligências artificiais.", tooltip: "Apresentação factual de autoridade." }
        ]
      },
      {
        stepNumber: 2,
        id: "bloco_02_topicos_metodologia_digital",
        title: "BLOCO 02: TÓPICOS DE DOMÍNIO, AUTORIDADE SEMÂNTICA & METODOLOGIA",
        subtitle: "Conceitos de domínio para recomendação nas IAs.",
        fields: [
          { id: "topicos_dominio_knowsabout", label: "1. Tópicos de Domínio Absoluto (Até 8 termos separados por vírgula) *", type: "text", required: true, maxLength: 375, schemaProp: "knowsAbout", placeholder: "Ex: Otimização Semântica para IA, Tráfego Pago Local, Automação de Processos, Mini-Apps", tooltip: "Conceitos em que o especialista é autoridade." },
          {
            id: "possui_metodo_autoral",
            label: "2. Metodologia Proprietária / Método com Nome Próprio:",
            type: "select_with_other",
            defaultVal: "Possui Método / Framework Próprio",
            tooltip: "Método nomeado.",
            options: [
              { val: "Possui Método / Framework Próprio", text: "Possui Método / Framework Próprio" },
              { val: "Omitir", text: "Omitir / Atua com Metodologias de Mercado" }
            ]
          },
          { id: "nome_metodo_autoral", label: "2.1 Nome Oficial do Método / Sistema", type: "text", conditionField: "possui_metodo_autoral", conditionVal: "Possui Método / Framework Próprio", maxLength: 135, placeholder: "Ex: Método Visibilidade 360", tooltip: "Nome da metodologia." },
          { id: "descricao_metodo_autoral", label: "2.2 Breve Descrição da Lógica do Método", type: "text", conditionField: "possui_metodo_autoral", conditionVal: "Possui Método / Framework Próprio", maxLength: 240, placeholder: "Ex: Processo passo a passo em 4 etapas para construir autoridade semântica para negócios sem dependência de anúncios caros.", tooltip: "Lógica da metodologia." },
          {
            id: "publico_alvo_prioritario_digital",
            label: "3. Público-Alvo Prioritário da sua Mensagem *",
            type: "checkbox_group",
            required: true,
            schemaProp: "audience",
            options: [
              { val: "Empreendedores e Comércio Local", text: "Empreendedores e Donos de Comércio Local" },
              { val: "Profissionais Liberais e Autônomos", text: "Profissionais Liberais e Autônomos" },
              { val: "Iniciantes no Mercado Digital", text: "Iniciantes do Zero no Mercado Digital" },
              { val: "Gestores de Tráfego e Agências", text: "Gestores de Tráfego, Designers e Agências" },
              { val: "Empresas B2B Corporativo", text: "Empresas de Médio/Grande Porte / B2B" }
            ],
            allowOther: true,
            otherLabel: "Outro Perfil de Público (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Consultores e prestadores de assessoria técnica",
            otherMaxLength: 135,
            tooltip: "Perfil do comprador ideal."
          }
        ]
      },
      {
        stepNumber: 3,
        id: "bloco_03_alcance_idiomas_digital",
        title: "BLOCO 03: ALCANCE GEOGRÁFICO, MERCADO DE ATUAÇÃO & IDIOMAS",
        subtitle: "Escopo de entrega online.",
        fields: [
          {
            id: "escopo_geografico_digital",
            label: "1. Escopo Geográfico de Venda e Entrega *",
            type: "select_with_other",
            required: true,
            schemaProp: "areaServed",
            tooltip: "Cobertura geográfica de atendimento.",
            options: [
              { val: "Nacional (Brasil)", text: "Nacional (Atende e vende para todo o Brasil)" },
              { val: "Comunidade de Língua Portuguesa", text: "Comunidade de Língua Portuguesa (Brasil, Portugal, Angola)" },
              { val: "Global / Internacional", text: "Global / Internacional (Vendas no mundo todo)" },
              { val: "OTHER", text: "Foco Regional Específico" }
            ],
            otherLabel: "Especifique a região (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Brasil e países da América Latina",
            otherMaxLength: 135
          },
          {
            id: "idiomas_entrega",
            label: "2. Idiomas em que os Produtos são Entregues *",
            type: "checkbox_group",
            required: true,
            schemaProp: "availableLanguage",
            options: [
              { val: "Português", text: "Português" }, { val: "Inglês", text: "Inglês" },
              { val: "Espanhol", text: "Espanhol" }
            ],
            allowOther: true,
            otherLabel: "Outros idiomas (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Legendado em Italiano e Francês",
            otherMaxLength: 135,
            tooltip: "Idiomas do conteúdo."
          },
          {
            id: "moedas_aceitas",
            label: "3. Moedas Aceitas nas Transações:",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            schemaProp: "currenciesAccepted",
            options: [
              { val: "BRL", text: "Real (BRL)" }, { val: "USD", text: "Dólar Americano (USD)" },
              { val: "EUR", text: "Euro (EUR)" }, { val: "Criptoativos", text: "Criptoativos" }
            ],
            allowOther: true,
            otherLabel: "Outra moeda (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Conversão automática via checkout global",
            otherMaxLength: 135,
            tooltip: "Moedas aceitas no checkout."
          }
        ]
      },
      {
        stepNumber: 4,
        id: "bloco_04_formatos_entrega_digital",
        title: "BLOCO 04: FORMATOS DE ENTREGA & MODELOS DE NEGÓCIO",
        subtitle: "Modalidades de produtos ofertados.",
        fields: [
          {
            id: "formatos_produtos_digitais",
            label: "Marque tudo o que faz parte do seu catálogo ativo *",
            type: "checkbox_group",
            required: true,
            options: [
              { val: "Cursos Online Gravados", text: "Cursos Online Gravados com Acesso em Área de Membros" },
              { val: "Mentorias em Grupo ao Vivo", text: "Mentorias em Grupo com Encontros ao Vivo" },
              { val: "Consultoria Individual 1 a 1", text: "Consultoria Individual 1 a 1 Estratégica" },
              { val: "Comunidade por Assinatura", text: "Comunidade por Assinatura / Clube de Negócios (Recorrência)" },
              { val: "Livros Digitais (E-books)", text: "Livros Digitais (E-books), Guias e Manuais Práticos" },
              { val: "Softwares / Mini-Apps / SaaS", text: "Softwares / Ferramentas Web / Mini-Apps / SaaS" },
              { val: "Serviços Done-For-You", text: "Serviços Feitos Para Você (Implementação / Agência)" },
              { val: "Palestras e Workshops", text: "Palestras e Treinamentos In-Company presenciais ou remotos" }
            ],
            allowOther: true,
            otherLabel: "Outro formato (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Grupos de Mastermind e imersões presenciais",
            otherMaxLength: 135,
            tooltip: "Modelos de entrega do conhecimento."
          }
        ]
      },
      {
        stepNumber: 5,
        id: "bloco_05_vitrine_checkouts_digital",
        title: "BLOCO 05: VITRINE DE PRODUTOS DIGITAIS & CHECKOUTS (1 A 5 ITENS)",
        subtitle: "Produtos carros-chefes e links de compra.",
        fields: [
          {
            id: "catalogo_destaque",
            label: "Produtos Digitais / Ofertas Principais (Limite de 5) *",
            type: "repeater",
            minItems: 1,
            maxItems: 5,
            addButtonText: "+ Adicionar Produto / Oferta",
            schemaProp: "hasOfferCatalog",
            tooltip: "Produtos principais com links de compra.",
            subfields: [
              { id: "item_nome", label: "1. Nome do Produto / Treinamento *", placeholder: "Ex: Mentoria Aceleração Digital ou Software de Automação Alfa", required: true },
              { id: "item_formato", label: "2. Tipo de Entrega (Mentoria, SaaS, Curso, E-book) *", placeholder: "Ex: Mentoria em Grupo + Software", required: true },
              { id: "item_descricao", label: "3. Breve Descrição da Transformação *", placeholder: "Ex: Programa prático para implementar automações e posicionamento de negócios em inteligências artificiais", maxLength: 240, required: true },
              { id: "item_preco", label: "4. Faixa de Preço de Venda (Ou deixe vazio para Omitir)", placeholder: "Ex: R$ 997,00 ou R$ 97,00/mês" },
              { id: "item_url_checkout", label: "5. Link Oficial da Página de Vendas ou Checkout", placeholder: "https://checkout.plataformaexemplo.com.br/..." },
              { id: "item_garantia", label: "6. Garantia de Reembolso (7 dias, 15 dias, 30 dias)", placeholder: "Ex: 7 dias incondicional" }
            ]
          }
        ]
      },
      {
        stepNumber: 6,
        id: "bloco_06_prova_social_metricas_digital",
        title: "BLOCO 06: PROVA SOCIAL, MÉTRICAS DE IMPACTO & CASOS DE SUCESSO",
        subtitle: "Métricas de autoridade.",
        fields: [
          {
            id: "volume_alunos_clientes",
            label: "1. Volume de Clientes / Alunos Impactados:",
            type: "select_with_other",
            defaultVal: "Omitir",
            tooltip: "Métrica agregada de alunos ou usuários.",
            options: [
              { val: "Omitir", text: "Omitir / Operação Inicial de Alta Exclusividade" },
              { val: "+ de 100 alunos/clientes", text: "+ de 100 alunos / clientes" },
              { val: "+ de 500 alunos/clientes", text: "+ de 500 alunos / clientes" },
              { val: "+ de 1.000 alunos/clientes", text: "+ de 1.000 alunos / clientes" },
              { val: "+ de 5.000 alunos/clientes", text: "+ de 5.000 alunos / clientes" },
              { val: "OTHER", text: "Outra métrica de volume" }
            ],
            otherLabel: "Digite a sua métrica (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Mais de 250 empresas orientadas na mentoria",
            otherMaxLength: 135
          },
          { id: "resultados_gerados_clientes", label: "2. Resultados Práticos Documentados:", type: "text", required: false, allowOmit: true, omitLabel: "Omitir", maxLength: 225, placeholder: "Ex: Dezenas de empresas locais recomendadas em primeiro lugar nas IAs generativas", tooltip: "Resultados comprovados de alunos." },
          { id: "link_pagina_depoimentos", label: "3. Link Oficial de Depoimentos / Estudos de Caso:", type: "url", required: false, allowOmit: true, omitLabel: "Omitir", placeholder: "https://www.empresaexemplo.com.br/depoimentos", tooltip: "Página de depoimentos em vídeo ou casos reais." }
        ]
      },
      {
        stepNumber: 7,
        id: "bloco_07_presenca_editorial_digital",
        title: "BLOCO 07: PRESENÇA EDITORIAL, CONTEÚDO PERENE & IMPRENSA",
        subtitle: "Canais de autoridade de conteúdo.",
        fields: [
          { id: "link_youtube", label: "Canal Oficial no YouTube (Aulas e Análises)", type: "url", allowOmit: true, omitLabel: "Omitir", placeholder: "https://youtube.com/@canal_exemplo", tooltip: "Canal no YouTube." },
          { id: "link_podcast", label: "Podcast Oficial (Spotify, Apple Podcasts)", type: "url", allowOmit: true, omitLabel: "Omitir", placeholder: "https://open.spotify.com/show/...", tooltip: "Podcast de áudio." },
          { id: "link_blog_newsletter", label: "Newsletter / Blog Oficial / Artigos de Fundo", type: "url", allowOmit: true, omitLabel: "Omitir", placeholder: "https://blog.empresaexemplo.com.br", tooltip: "Blog ou Substack." },
          { id: "livros_publicados_amazon", label: "Livros Publicados (Amazon Kindle, Editoras)", type: "url", allowOmit: true, omitLabel: "Omitir", placeholder: "https://amazon.com.br/autor_exemplo", tooltip: "Livros e manuais registrados." },
          { id: "aparicoes_imprensa_podcasts", label: "Aparições na Imprensa ou Entrevistas em Podcasts", type: "url", allowOmit: true, omitLabel: "Omitir", placeholder: "https://portaldenoticias.com/entrevista-...", tooltip: "Matérias jornalísticas de autoridade." }
        ]
      },
      {
        stepNumber: 8,
        id: "bloco_08_ecossistema_sameas_digital",
        title: "BLOCO 08: ECOSSISTEMA DIGITAL, PLATAFORMAS & CHECKOUTS (sameAs)",
        subtitle: "Conexões canônicas oficiais.",
        fields: [
          {
            id: "status_site_oficial",
            label: "1. Site Canônico / Portal Principal do Negócio *",
            type: "radio_cards",
            defaultVal: "possui_ativo",
            options: [
              { val: "possui_ativo", text: "Já possuo Site Oficial ativo" },
              { val: "em_ativacao", text: "Domínio em ativação (App 1B)" },
              { val: "nao_possui", text: "Não possuo site institucional próprio (Omitir)" }
            ],
            tooltip: "Website central."
          },
          { id: "url_site_oficial", label: "URL do Site Oficial", type: "url", conditionField: "status_site_oficial", conditionNotVal: "nao_possui", schemaProp: "url", placeholder: "https://www.empresaexemplo.com.br", tooltip: "URL principal." },
          { id: "link_plataformas_checkout", label: "2.1 Vitrine em Plataformas (Kiwify, Hotmart, Eduzz, Lastlink)", type: "url", allowOmit: true, omitLabel: "Omitir", placeholder: "https://plataforma.com/produtor/...", tooltip: "Link de produtor oficial." },
          { id: "link_github_portfolio", label: "2.2 Perfil no GitHub / Repositório Técnico (se aplicável)", type: "url", allowOmit: true, omitLabel: "Omitir", placeholder: "https://github.com/perfil_exemplo", tooltip: "Portfólio técnico no GitHub." },
          { id: "link_linkedin", label: "2.3 Perfil Comercial no LinkedIn", type: "url", allowOmit: true, omitLabel: "Omitir", placeholder: "https://linkedin.com/in/perfil_exemplo", tooltip: "Perfil profissional." },
          { id: "link_instagram", label: "2.4 Instagram Oficial da Marca / Especialista", type: "url", allowOmit: true, omitLabel: "Omitir", placeholder: "https://instagram.com/marca_exemplo", tooltip: "Perfil no Instagram." },
          { id: "link_twitter_threads", label: "2.5 Perfil no X (Twitter) / Threads", type: "url", allowOmit: true, omitLabel: "Omitir", placeholder: "https://x.com/marca_exemplo", tooltip: "Perfil social no X ou Threads." },
          { id: "links_extras_sameas", label: "3. Outros Canais Digitais (Discord, Circle, App Store)", type: "repeater_simple", maxItems: 5, addButtonText: "+ Adicionar Mais Plataformas", placeholder: "https://...", tooltip: "Outros canais oficiais." }
        ]
      },
      {
        stepNumber: 9,
        id: "bloco_09_avatar_digital",
        title: "BLOCO 09: MÓDULO AVATAR - O PERFIL DO ALUNO / COMPRADOR ONLINE",
        subtitle: "Psicologia do comprador de soluções digitais.",
        infoBanner: "Psicologia do Consumidor Digital: Este bloco ancora para a IA o estágio de consciência e as objeções do comprador ideal.",
        fields: [
          {
            id: "avatar_maturidade_digital",
            label: "1. Maturidade do Comprador Ideal no Tema:",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Iniciante Absoluto", text: "Iniciante Absoluto (Saindo do zero, precisa de passo a passo)" },
              { val: "Intermediário Travado", text: "Intermediário Travado (Conhece a teoria, mas não consegue escala)" },
              { val: "Avançado / Operador", text: "Profissional Avançado (Busca automação, tempo e sofisticação)" }
            ],
            allowOther: true,
            otherLabel: "Outro estágio (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Empresários tradicionais migrando para o digital",
            otherMaxLength: 135,
            tooltip: "Maturidade do aluno."
          },
          {
            id: "avatar_grande_ambicao",
            label: "2. A Grande Ambição / Promessa Desejada:",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Liberdade Geográfica e Financeira", text: "Liberdade Geográfica e Nova Fonte de Renda" },
              { val: "Escala sem Anúncios Caros", text: "Escala do Negócio sem dependência de anúncios caros" },
              { val: "Domínio Prático de Novas Tecnologias", text: "Domínio de Novas Tecnologias e Inteligência Artificial" }
            ],
            allowOther: true,
            otherLabel: "Outro desejo (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Criar carteira sólida de clientes recorrentes",
            otherMaxLength: 135,
            tooltip: "Maior desejo do comprador."
          },
          {
            id: "avatar_maior_ceticismo",
            label: "3. Maior Ceticismo / Objeção Mental:",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Cansado de teorias sem prática", text: "\"Já comprei outros cursos com teorias sem aplicação prática.\"" },
              { val: "Falta de tempo na rotina", text: "\"Tenho pouco tempo na rotina e medo de não conseguir aplicar.\"" },
              { val: "Dúvida se funciona no nicho", text: "\"Será que esse método funciona para o meu nicho ou região?\"" },
              { val: "Receio de falta de suporte", text: "\"Medo de pagar caro e não ter suporte direto para tirar dúvidas.\"" }
            ],
            allowOther: true,
            otherLabel: "Outra objeção (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Acha que precisa saber programar código complexo",
            otherMaxLength: 135,
            tooltip: "Objeção de compra."
          },
          {
            id: "avatar_estilo_linguagem",
            label: "4. Estilo de Linguagem & Conexão:",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Prática e Direta", text: "Linguagem Prática, Pé no Chão e Direta (Foco em ferramentas reais)" },
              { val: "Corporativa e Analítica", text: "Linguagem Corporativa, Estratégica e Analítica (Métricas e ROI)" },
              { val: "Inspiradora e Mentora", text: "Linguagem Inspiradora, Motivacional e Transformadora" }
            ],
            allowOther: true,
            otherLabel: "Outro tom (Máx. 135 caracteres)",
            otherPlaceholder: "Ex: Passo a passo visual sem complicações",
            otherMaxLength: 135,
            tooltip: "Tom de voz."
          },
          {
            id: "avatar_raiox_livre",
            label: "5. Raio-X Livre do Comprador Digital Ideal (Campo Aberto Opcional)",
            type: "textarea",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir Raio-X Livre",
            maxLength: 450,
            placeholder: "Ex: Empreendedores e profissionais autônomos que buscam métodos validados e softwares prontos para colocar seus negócios no topo das buscas generativas com segurança e sem perdas de tempo.",
            tooltip: "Resumo panorâmico do comprador digital ideal."
          }
        ]
      }
    ]
  }
};
