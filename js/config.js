/**
 * ============================================================================
 * GEO ENTITY ENGINE (APP 1A) - DICIONÁRIO CENTRAL & MATRIZ SEMÂNTICA
 * Versão Auditada 100% Fiel à Especificação Oficial dos 4 Perfis (Bloco a Bloco)
 * Regra de Ouro: Omitir = 0 (Campos vazios ou omitidos são purgados pelo robô no JSON-LD)
 * ============================================================================
 */

// 1. CONFIGURAÇÕES DE INTEGRAÇÃO, WEBHOOK MAKE & IA (TRADUÇÃO GEO)
export const API_CONFIG = {
  ENABLE_AI_TRANSLATION: false, // Mude para true quando quiser ativar enriquecimento em inglês via API
  AI_PROVIDER: "gemini",        // Opções suportadas pelo motor: "gemini" ou "openai"
  GEMINI_API_KEY: "",           // Gaveta pronta: Cole sua chave da API do Google Gemini aqui
  OPENAI_API_KEY: "",           // Gaveta pronta: Cole sua chave da API da OpenAI aqui (opcional)
  MAKE_WEBHOOK_URL: "SEU_WEBHOOK_URL_DO_MAKE_AQUI", // URL central do seu cenário no Make
  APP_1B_REDIRECT_URL: "#construtor-de-site",       // Link de transição direta para o App 1B
  STORAGE_PREFIX: "geo_entity_engine_v2_"           // Prefixo de isolamento no localStorage
};

// Exportação direta mantida para retrocompatibilidade
export const MAKE_WEBHOOK_URL = API_CONFIG.MAKE_WEBHOOK_URL;

// 2. LISTAS AUXILIARES PADRONIZADAS (27 UFs E GERADOR DE ANOS)
export const BRAZIL_STATES = [
  { val: "AC", text: "Acre (AC)" },
  { val: "AL", text: "Alagoas (AL)" },
  { val: "AP", text: "Amapá (AP)" },
  { val: "AM", text: "Amazonas (AM)" },
  { val: "BA", text: "Bahia (BA)" },
  { val: "CE", text: "Ceará (CE)" },
  { val: "DF", text: "Distrito Federal (DF)" },
  { val: "ES", text: "Espírito Santo (ES)" },
  { val: "GO", text: "Goiás (GO)" },
  { val: "MA", text: "Maranhão (MA)" },
  { val: "MT", text: "Mato Grosso (MT)" },
  { val: "MS", text: "Mato Grosso do Sul (MS)" },
  { val: "MG", text: "Minas Gerais (MG)" },
  { val: "PA", text: "Pará (PA)" },
  { val: "PB", text: "Paraíba (PB)" },
  { val: "PR", text: "Paraná (PR)" },
  { val: "PE", text: "Pernambuco (PE)" },
  { val: "PI", text: "Piauí (PI)" },
  { val: "RJ", text: "Rio de Janeiro (RJ)" },
  { val: "RN", text: "Rio Grande do Norte (RN)" },
  { val: "RS", text: "Rio Grande do Sul (RS)" },
  { val: "RO", text: "Rondônia (RO)" },
  { val: "RR", text: "Roraima (RR)" },
  { val: "SC", text: "Santa Catarina (SC)" },
  { val: "SP", text: "São Paulo (SP)" },
  { val: "SE", text: "Sergipe (SE)" },
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

// 3. ÁREA DE CONTROLE OPERACIONAL DA MENTORIA (TOPO DA PÁGINA - USO INTERNO)
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
      placeholder: "Ex: Roni Flores ou José Geraldo",
      tooltip: "Nome completo do aluno ou operador responsável pelo projeto."
    },
    {
      id: "mentor_student_email",
      label: "E-mail do Aluno / Mentorado *",
      type: "email",
      required: true,
      placeholder: "Ex: aluno@email.com",
      tooltip: "E-mail com validação de formato para registro operacional da mentoria."
    },
    {
      id: "mentor_student_code",
      label: "Código do Aluno / ID da Mentoria *",
      type: "text",
      required: true,
      placeholder: "Ex: GEO-2026-SP49",
      tooltip: "Código alfanumérico obrigatório de identificação do mentorado."
    }
  ]
};

// ============================================================================
// 4. MATRIZ OFICIAL DOS 4 PERFIS (ESTRUTURA FIEL DE BLOCOS)
// ============================================================================

export const PROFILES = {

  // ==========================================================================
  // PERFIL 01: COMÉRCIO & NEGÓCIO LOCAL FÍSICO (11 BLOCOS)
  // ==========================================================================
  local_comercio: {
    id: "local_comercio",
    storageKey: "geo_engine_local_business",
    badgeIcon: "🏪",
    badgeText: "Comércio & Negócio Local",
    cardTitle: "Comércio & Negócio Local Físico",
    cardDescription: "Oficinas mecânicas, restaurantes, padarias, lojas de varejo, supermercados, pet shops, farmácias, salões, depósitos e academias.",
    defaultSchemaType: "LocalBusiness",
    submitButtonText: "Gerar & Validar Entidade para IA →",

    steps: [
      // BLOCO 01
      {
        stepNumber: 1,
        id: "bloco_01_identidade",
        title: "BLOCO 01: IDENTIDADE DA ENTIDADE INSTITUCIONAL",
        subtitle: "Foco 100% na Pessoa Jurídica / Marca comercial, sem atrelar a nomes transitórios de gerência.",
        fields: [
          {
            id: "ramo_atuacao",
            label: "1. Ramo de Atuação do Negócio *",
            type: "select_with_other",
            required: true,
            schemaProp: "@type",
            tooltip: "Informa aos motores de IA a categoria exata de operação da empresa para ranqueamento semântico.",
            options: [
              { val: "AutoRepair", text: "Oficina Mecânica / Auto Center" },
              { val: "Restaurant", text: "Restaurante / Lanchonete / Bar / Gastronomia" },
              { val: "Bakery", text: "Padaria / Confeitaria" },
              { val: "Store", text: "Loja de Roupas / Calçados / Artigos Gerais (Varejo)" },
              { val: "GroceryStore", text: "Supermercado / Mercearia / Hortifrúti" },
              { val: "PetStore", text: "Pet Shop / Clínica Veterinária" },
              { val: "Pharmacy", text: "Farmácia / Drogaria" },
              { val: "BeautySalon", text: "Salão de Beleza / Barbearia / Estética" },
              { val: "HardwareStore", text: "Materiais de Construção / Elétrica / Hidráulica" },
              { val: "ExerciseGym", text: "Academia / Centro Esportivo / Crossfit" },
              { val: "LocalBusiness", text: "Assistência Técnica / Manutenção de Equipamentos" },
              { val: "OTHER", text: "Outro Comércio Físico" }
            ],
            otherLabel: "Especifique com precisão o ramo físico da sua empresa *",
            otherPlaceholder: "Ex: Loja de Produtos Agropecuários e Insumos Veterinários",
            otherMaxLength: 90
          },
          {
            id: "razao_social",
            label: "2. Razão Social *",
            type: "text",
            required: true,
            schemaProp: "legalName",
            placeholder: "Ex: Auto Mecânica Irmãos Silva Ltda",
            tooltip: "Nome registrado no contrato social ou cartão CNPJ."
          },
          {
            id: "nome_fantasia",
            label: "3. Nome Fantasia (Marca Comercial) *",
            type: "text",
            required: true,
            schemaProp: "name",
            placeholder: "Ex: Oficina Mecânica Silva ou Cantina Escolar Chlorita",
            tooltip: "Nome de fachada pelo qual o público pesquisa a loja no dia a dia."
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
            tooltip: "Segurança e Privacidade: Este dado fiscal não fica visível em texto aberto para quem lê a página. Ele é injetado exclusivamente no código interno para validar a existência legal da empresa perante as IAs."
          },
          {
            id: "whatsapp_principal",
            label: "5.1 WhatsApp Comercial Principal *",
            type: "phone",
            required: true,
            defaultPrefix: "+55 ",
            schemaProp: "telephone",
            placeholder: "+55 16 99999-9999",
            tooltip: "Campo com prefixo internacional padrão +55 editável, sem travas de máscara para aceitar telefones de fronteira, DDDs variados e celulares."
          },
          {
            id: "telefone_fixo",
            label: "5.2 Telefone Fixo / PABX da Loja",
            type: "phone",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir",
            schemaProp: "faxNumber",
            placeholder: "+55 16 3382-0000",
            tooltip: "Campo para linha fixa comercial da loja."
          },
          {
            id: "telegram_comercial",
            label: "5.3 Telegram Comercial / Atendimento",
            type: "text",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: @atendimento_empresa",
            tooltip: "Link ou usuário de atendimento no Telegram."
          },
          {
            id: "email_comercial",
            label: "5.4 E-mail Geral de Contato / Atendimento Comercial *",
            type: "email",
            required: true,
            schemaProp: "email",
            placeholder: "Ex: contato@suaempresa.com.br",
            tooltip: "Campo obrigatório para comunicação formal e envio de notas/orçamentos."
          },
          {
            id: "especialidade_carro_chefe",
            label: "6. Especialidade Principal (Carro-Chefe / Diferencial de Mercado) *",
            type: "text",
            required: true,
            maxLength: 90,
            schemaProp: "knowsAbout",
            placeholder: "Ex: Motores a Diesel Pesados, Pizza Napolitana com Fermentação Natural, Pneus Agrícolas Radiais",
            tooltip: "Qual é o serviço, produto ou tipo de preparo pelo qual sua loja é famosa na cidade? (Ex: Motores a Diesel Pesados, Pizza Napolitana com Fermentação Natural, Pneus Agrícolas Radiais)"
          },
          {
            id: "ano_fundacao",
            label: "7. Ano de Fundação / Em Atividade Desde *",
            type: "select",
            required: true,
            schemaProp: "foundingDate",
            options: generateYearsList(200, "Mais de 200 anos (Tradição secular)"),
            tooltip: "Informa aos motores de IA o tempo de tradição e existência do negócio."
          },
          {
            id: "descricao_otimizada",
            label: "8. Descrição da Entidade Otimizada para GEO *",
            type: "textarea",
            required: true,
            minLength: 150,
            maxLength: 350,
            schemaProp: "description",
            placeholder: "Ex: Oficina mecânica especializada em manutenção preventiva, câmbio automático e arrefecimento em Matão. Atendemos veículos nacionais e importados com peças genuínas, diagnóstico computadorizado e garantia formal no Centro.",
            tooltip: "Descreva em poucas linhas quais produtos vende, as marcas que trabalha, o público que atende e a região ou bairros de foco (Recomendação de 150 a 350 caracteres)."
          }
        ]
      },

      // BLOCO 02
      {
        stepNumber: 2,
        id: "bloco_02_endereco",
        title: "BLOCO 02: ENDEREÇO FÍSICO & LOCALIZAÇÃO COMPLETA",
        subtitle: "Todos os campos obrigatórios ou com opção expressa de Omitir / Não se aplica.",
        fields: [
          {
            id: "cep",
            label: "CEP *",
            type: "cep",
            required: true,
            checkboxAddon: { id: "endereco_rural", label: "Endereço Rural / Caixa Postal Rodoviária" },
            schemaProp: "postalCode",
            placeholder: "00000-000",
            tooltip: "Código de Endereçamento Postal do estabelecimento."
          },
          {
            id: "logradouro",
            label: "Logradouro (Nome da Rua / Avenida / Rodovia / Estrada) *",
            type: "text",
            required: true,
            schemaProp: "streetAddress",
            placeholder: "Ex: Avenida Sete de Setembro",
            tooltip: "Nome oficial da rua, avenida, rodovia ou estrada."
          },
          {
            id: "numero_imovel",
            label: "Número Oficial *",
            type: "text",
            required: true,
            checkboxAddon: { id: "sem_numero", label: "S/N (Sem número)" },
            placeholder: "Ex: 1250",
            tooltip: "Campo exclusivo para dígitos numéricos da fachada ou marcação S/N."
          },
          {
            id: "complemento_complexo",
            label: "Detalhamento do Imóvel (Apartamentos / Galerias / Centros Comerciais)",
            type: "group_row",
            allowOmit: true,
            omitLabel: "Omitir / Não se aplica",
            tooltip: "Detalhamento de bloco, sala, loja e pavimento caso fique em centro comercial ou prédio.",
            subfields: [
              { id: "bloco_torre", label: "Bloco / Torre / Quarteirão", placeholder: "Ex: Torre A, Quarteirão 12" },
              { id: "sala_loja", label: "Sala / Loja / Apartamento", placeholder: "Ex: Loja 04, Sala 201" },
              { id: "andar_pavimento", label: "Andar / Pavimento", placeholder: "Ex: Térreo, 2º Andar" }
            ]
          },
          {
            id: "ponto_referencia",
            label: "Ponto de Referência / Sentido da Pista",
            type: "text",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir / Não se aplica",
            maxLength: 150,
            placeholder: "Ex: Ao lado da Caixa Econômica, em frente à praça da matriz, Sentido Interior-Capital no km 45",
            tooltip: "Referência visual clara para guiar clientes e respostas de localização das IAs."
          },
          {
            id: "bairro",
            label: "Bairro *",
            type: "text",
            required: true,
            schemaProp: "addressNeighborhood",
            placeholder: "Ex: Centro",
            tooltip: "Nome oficial do bairro."
          },
          {
            id: "macro_regiao",
            label: "Macro-Região / Zona (Opcional)",
            type: "select_with_other",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir / Não se aplica",
            tooltip: "Região ou zona geográfica do município.",
            options: [
              { val: "Centro", text: "Centro / Região Central" },
              { val: "Zona Norte", text: "Zona Norte" },
              { val: "Zona Sul", text: "Zona Sul" },
              { val: "Região Leste", text: "Região Leste / Zona Leste" },
              { val: "Região Oeste", text: "Região Oeste / Zona Oeste" },
              { val: "OTHER", text: "Outra Macro-Região (Especificar)" }
            ],
            otherLabel: "Digite a Macro-Região (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Distrito Industrial ou Zona Rural Norte",
            otherMaxLength: 90
          },
          {
            id: "cidade",
            label: "Cidade *",
            type: "text",
            required: true,
            schemaProp: "addressLocality",
            placeholder: "Ex: Matão",
            tooltip: "Nome oficial da cidade."
          },
          {
            id: "estado_uf",
            label: "Estado (UF) *",
            type: "select",
            required: true,
            schemaProp: "addressRegion",
            options: BRAZIL_STATES,
            tooltip: "Dropdown travado com as 27 Unidades Federativas do Brasil."
          },
          {
            id: "geolocalizacao",
            label: "Geolocalização (Latitude e Longitude)",
            type: "geo_coordinates",
            allowOmit: true,
            omitLabel: "Omitir / Não se aplica",
            latPlaceholder: "Ex: -21.6033",
            lngPlaceholder: "Ex: -48.3658",
            helpTitle: "Tutorial rápido: Como copiar a Latitude e Longitude no Google Maps em 10 segundos",
            helpSteps: "1. Abra o Google Maps e localize o pino exato da sua empresa.\n2. Clique com o botão direito do mouse (ou mantenha pressionado no celular) sobre o local.\n3. Clique nos números de coordenadas que aparecem no topo do menu para copiá-los automaticamente e cole nos campos acima.",
            tooltip: "Coordenadas exatas de GPS para ancoragem geográfica perfeita."
          }
        ]
      },

      // BLOCO 03
      {
        stepNumber: 3,
        id: "bloco_03_licencas",
        title: "BLOCO 03: LICENÇAS, REGISTROS & CONFORMIDADE LEGAL",
        subtitle: "Comprovações de regularidade municipal e sanitária (preenchimento do número é opcional).",
        fields: [
          {
            id: "alvara_municipal",
            label: "Alvará de Funcionamento Municipal",
            type: "tri_state_with_input",
            defaultVal: "Omitir",
            inputLabel: "Número do Alvará / Inscrição Municipal (Opcional para colocar)",
            inputPlaceholder: "Ex: 12345/2026 (Opcional - se deixar vazio, o sistema grava apenas que possui)",
            tooltip: "Informa se o estabelecimento possui alvará ativo junto à prefeitura."
          },
          {
            id: "licenca_sanitaria",
            label: "Licença da Vigilância Sanitária",
            type: "tri_state_with_input",
            defaultVal: "Omitir",
            inputLabel: "Número do Laudo / Licença Sanitária (Opcional para colocar)",
            inputPlaceholder: "Ex: Licença VISA nº 98765 (Opcional)",
            tooltip: "Indispensável para negócios de alimentação, saúde, estética e comércio de produtos controlados."
          },
          {
            id: "outra_licenca_comercio",
            label: "Outra Licença ou Registro Regulatório (Ex: Bombeiros AVCB, CETESB, MAPA)",
            type: "tri_state_with_input",
            defaultVal: "Omitir",
            inputLabel: "Especifique a licença em uma frase (Máx. 90 caracteres)",
            inputPlaceholder: "Ex: Auto de Vistoria do Corpo de Bombeiros (AVCB) vigente",
            maxLength: 90,
            tooltip: "Permite adicionar qualquer outra conformidade legal do seu ramo."
          }
        ]
      },

      // BLOCO 04
      {
        stepNumber: 4,
        id: "bloco_04_horarios",
        title: "BLOCO 04: OPERAÇÃO COMERCIAL, HORÁRIOS & FERIADOS",
        subtitle: "Grade completa de funcionamento semanal e operação em feriados.",
        fields: [
          {
            id: "grade_horarios",
            label: "Horários Semanais (Segunda a Domingo) *",
            type: "opening_hours_grid",
            allowCopyMondayToFriday: true,
            copyButtonText: "Copiar horário de Segunda para Sexta-feira",
            tooltip: "Cada dia da semana com seleção [ Aberto ] ou [ Fechado ] e seletores de abertura e fechamento."
          },
          {
            id: "operacao_feriados",
            label: "Operação em Feriados",
            type: "select_with_other",
            defaultVal: "Omitir",
            tooltip: "Define como a sua loja funciona nos dias de feriado.",
            options: [
              { val: "Omitir", text: "Omitir" },
              { val: "Aberto em todos os feriados", text: "Aberto em todos os feriados" },
              { val: "Fechado em todos os feriados", text: "Fechado em todos os feriados" },
              { val: "Atendimento em feriados selecionados", text: "Atendimento em feriados selecionados" },
              { val: "OTHER", text: "Outro regime de feriados (Especificar)" }
            ],
            otherLabel: "Descreva em uma frase o regime de feriados (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Aberto em feriados apenas em meio período das 08h às 13h",
            otherMaxLength: 90
          },
          {
            id: "feriados_especificos",
            label: "Selecione os feriados com atendimento ativo:",
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
            otherLabel: "Outro feriado específico (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Feriado de Corpus Christi e Dia do Padroeiro",
            otherMaxLength: 90,
            tooltip: "Caixas de seleção dos feriados atendidos."
          }
        ]
      },

      // BLOCO 05
      {
        stepNumber: 5,
        id: "bloco_05_valores_logistica",
        title: "BLOCO 05: VALORES, LOGÍSTICA, PAGAMENTO, PARCELAMENTO & GARANTIAS",
        subtitle: "Políticas comerciais, marcas homologadas, garantias e valores reais sem cifrão genérico.",
        fields: [
          {
            id: "faz_entregas_delivery",
            label: "Logística: Faz Entregas / Delivery?",
            type: "tri_state",
            defaultVal: "Omitir",
            tooltip: "Informa se o estabelecimento realiza entregas no endereço do cliente."
          },
          {
            id: "reservas_pagamento_antecipado",
            label: "Logística: Faz Reservas mediante pagamento antecipado?",
            type: "tri_state",
            defaultVal: "Omitir",
            tooltip: "Informa se trabalha com reservas de produtos, mesas ou horários mediante sinal."
          },
          {
            id: "politica_troca_devolucao",
            label: "Logística: Possui Política de Troca ou Devolução Clara?",
            type: "tri_state",
            defaultVal: "Omitir",
            tooltip: "Transmite segurança jurídica e comercial para quem compra."
          },
          {
            id: "assistencia_autorizada_fabrica",
            label: "Assistência Técnica / Oficina ou Revenda Autorizada de Fábrica:",
            type: "tri_state_with_input",
            defaultVal: "Omitir",
            inputLabel: "Marcas ou Fabricantes Oficiais homologados (Máx. 90 caracteres)",
            inputPlaceholder: "Ex: Bosch, Apple, Brastemp",
            maxLength: 90,
            tooltip: "Destaca sua empresa nas buscas por assistência ou revenda oficial de marcas específicas."
          },
          {
            id: "possui_garantia",
            label: "Política de Garantia Comercial: Possui Política de Garantia Formal para Serviços ou Produtos?",
            type: "tri_state",
            defaultVal: "Omitir",
            tooltip: "Ativa o detalhamento da garantia oferecida pela loja."
          },
          {
            id: "detalhes_garantia",
            label: "Detalhamento da Garantia Comercial",
            type: "warranty_group",
            conditionField: "possui_garantia",
            conditionVal: "Sim",
            tooltip: "Especifique a formalização, o prazo e a cobertura da garantia.",
            subfields: [
              {
                id: "garantia_escrita",
                label: "Garantia Prescrita / Formalizada por Escrito em Nota/Certificado?",
                type: "tri_state",
                defaultVal: "Sim"
              },
              {
                id: "prazo_garantia",
                label: "Prazo da Garantia",
                type: "text",
                checkboxAddon: { id: "garantia_variavel", label: "A depender do serviço ou produto específico" },
                placeholder: "Ex: 90 dias, 1 ano, 10 mil km",
                maxLength: 90
              },
              {
                id: "cobertura_garantia",
                label: "Descrição Resumida da Cobertura da Garantia",
                type: "text",
                placeholder: "Ex: Garantia total para mão de obra e substituição de componentes defeituosos",
                maxLength: 150
              }
            ]
          },
          {
            id: "faixa_precos_reais",
            label: "Valores Reais & Ticket Médio (Sem $ Genérico)",
            type: "price_range_group",
            allowOmit: true,
            omitLabel: "Omitir valores",
            tooltip: "Valores em Reais (R$) para orientar a faixa de preço real da loja.",
            subfields: [
              { id: "menor_preco", label: "Menor Preço Unitário Comercializado (R$)", placeholder: "Ex: 15,00" },
              { id: "maior_preco", label: "Maior Preço Unitário Comercializado (R$)", placeholder: "Ex: 280,00" },
              { id: "ticket_medio", label: "Ticket Médio Estimado por Cliente (R$)", placeholder: "Ex: 65,00" }
            ]
          },
          {
            id: "formas_pagamento",
            label: "Formas de Pagamento Aceitas",
            type: "checkbox_group",
            schemaProp: "paymentAccepted",
            options: [
              { val: "Pix", text: "Pix" },
              { val: "Dinheiro em Espécie", text: "Dinheiro em Espécie" },
              { val: "Cartão de Débito", text: "Cartão de Débito" },
              { val: "Boleto Bancário", text: "Boleto Bancário" },
              { val: "Ticket / Vale Refeição", text: "Ticket / Vale Refeição" },
              { val: "Cartão de Crédito", text: "Cartão de Crédito" }
            ],
            allowOther: true,
            otherLabel: "Outra forma de pagamento (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Vale-Alimentação, PicPay ou Transferência Bancária",
            otherMaxLength: 90,
            tooltip: "Selecione todas as formas de pagamento aceitas."
          },
          {
            id: "parcelamento_cartao",
            label: "Condições de Parcelamento no Cartão de Crédito (ativa se marcar Cartão)",
            type: "installment_group",
            conditionField: "formas_pagamento",
            conditionContains: "Cartão de Crédito",
            tooltip: "Configuração de parcelamento no cartão de crédito.",
            maxInstallmentsOptions: [
              { val: "Até 3x", text: "Até 3x" },
              { val: "Até 6x", text: "Até 6x" },
              { val: "Até 10x", text: "Até 10x" },
              { val: "Até 12x", text: "Até 12x" },
              { val: "Até 18x ou mais", text: "Até 18x ou mais" }
            ],
            interestOptions: [
              { val: "Sem juros", text: "Sem juros" },
              { val: "Com juros da operadora", text: "Com juros da operadora" },
              { val: "Parcialmente sem juros (ex: até 3x)", text: "Parcialmente sem juros (ex: até 3x)" }
            ]
          },
          {
            id: "parcelamento_proprio",
            label: "Outras Formas de Parcelamento Próprio",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir / Não oferece parcelamento próprio",
            options: [
              { val: "Crediário Próprio / Carnê da Loja", text: "Crediário Próprio / Carnê da Loja" },
              { val: "Boleto Faturado para Empresas (PJ)", text: "Boleto Faturado para Empresas (PJ)" },
              { val: "Financiamento Bancário / Consórcio Conveniado", text: "Financiamento Bancário / Consórcio Conveniado" }
            ],
            allowOther: true,
            otherLabel: "Outra modalidade própria (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Cheque pré-datado sob consulta ou convênio sindical",
            otherMaxLength: 90,
            tooltip: "Opções de crédito próprio oferecidas pela loja."
          }
        ]
      },

      // BLOCO 06
      {
        stepNumber: 6,
        id: "bloco_06_comodidades",
        title: "BLOCO 06: COMODIDADES, INFRAESTRUTURA FÍSICA & SEGURANÇA",
        subtitle: "Cada item 100% individualizado com botões [ Sim ], [ Não ], [ Omitir ].",
        fields: [
          { id: "ar_condicionado", label: "Climatização: Ambiente com Ar Condicionado?", type: "tri_state", defaultVal: "Omitir", tooltip: "Informa se o local é climatizado." },
          { id: "wifi_gratis", label: "Conectividade: Wi-Fi Gratuito para Clientes?", type: "tri_state", defaultVal: "Omitir", tooltip: "Informa disponibilidade de rede Wi-Fi para clientes." },
          { id: "estacionamento_proprio", label: "Estacionamento: Possui Estacionamento no local ou conveniado gratuito?", type: "tri_state", defaultVal: "Omitir", tooltip: "Facilidade de estacionamento para clientes." },
          { id: "pet_friendly", label: "Pets: Aceita Animais de Estimação (Pet Friendly)?", type: "tri_state", defaultVal: "Omitir", tooltip: "Indica se animais de estimação são bem-vindos." },
          { id: "espaco_kids", label: "Família: Possui Espaço Kids / Playground para crianças?", type: "tri_state", defaultVal: "Omitir", tooltip: "Área de recreação infantil no local." },
          { id: "recarga_eletrica", label: "Mobilidade Elétrica: Possui Ponto de Recarga para Carros Elétricos?", type: "tri_state", defaultVal: "Omitir", tooltip: "Eletroposto ou carregador veicular disponível." },
          { id: "cameras_seguranca", label: "Monitoramento: Ambiente monitorado por Câmeras de Segurança?", type: "tri_state", defaultVal: "Omitir", tooltip: "Circuito interno de monitoramento por vídeo." },
          { id: "seguranca_privada", label: "Segurança Física: Possui Vigilância / Segurança Privada no local?", type: "tri_state", defaultVal: "Omitir", tooltip: "Presença de equipe de segurança presencial." },
          {
            id: "outra_comodidade_comercio",
            label: "Outra comodidade de infraestrutura física (Especificar)",
            type: "tri_state_with_input",
            defaultVal: "Omitir",
            inputLabel: "Descreva em até uma frase (Máx. 90 caracteres)",
            inputPlaceholder: "Ex: Área externa aberta para fumantes e bicicletário coberto",
            maxLength: 90,
            tooltip: "Campo aberto para outra comodidade relevante da loja."
          }
        ]
      },

      // BLOCO 07
      {
        stepNumber: 7,
        id: "bloco_07_inclusao",
        title: "BLOCO 07: INCLUSÃO, ACOLHIMENTO ESPECIALIZADO & PREFERÊNCIAS",
        subtitle: "Cada item com botões [ Sim ], [ Não ], [ Omitir ] para alimentar atributos de inclusão no Schema.",
        fields: [
          { id: "pne_rampa_acesso", label: "Acessibilidade Motora (PNE): Entrada sem degraus ou com rampa de acesso adequada?", type: "tri_state", defaultVal: "Omitir", tooltip: "Acesso físico livre de barreiras na entrada." },
          { id: "pne_banheiro_adaptado", label: "Acessibilidade Motora (PNE): Banheiro adaptado com barras de apoio e espaço de manobra para cadeira de rodas?", type: "tri_state", defaultVal: "Omitir", tooltip: "Sanitário acessível conforme normas técnicas." },
          { id: "idoso_assentos_corredores", label: "Público Idoso & Mobilidade Reduzida: Assentos preferenciais confortáveis e corredores amplos?", type: "tri_state", defaultVal: "Omitir", tooltip: "Conforto de circulação e descanso para idosos." },
          { id: "idoso_caixa_preferencial", label: "Público Idoso & Mobilidade Reduzida: Caixa ou Guichê com Atendimento Preferencial prioritário ativo?", type: "tri_state", defaultVal: "Omitir", tooltip: "Atendimento prioritário sinalizado." },
          { id: "pessoas_obesas_assentos", label: "Pessoas Obesas: O estabelecimento dispõe de assentos reforçados / poltronas especiais dimensionadas para pessoas obesas?", type: "tri_state", defaultVal: "Omitir", tooltip: "Mobiliário reforçado e confortável para pessoas obesas." },
          { id: "acolhimento_autismo_tea", label: "Neurodiversidade & Espectro Autista (TEA): Estabelecimento preparado para acolhimento de pessoas autistas (espaço com menor poluição sonora, possibilidade de ajuste de luminosidade ou atendimento humanizado prioritário)?", type: "tri_state", defaultVal: "Omitir", tooltip: "Preparo sensorial e humano para receber clientes autistas e suas famílias." },
          { id: "bebes_trocador_fraldas", label: "Bebês & Primeira Infância: Possui Banheiro com Trocador de Fraldas para Bebês?", type: "tri_state", defaultVal: "Omitir", tooltip: "Estrutura de fraldário para famílias com bebês." },
          { id: "bebes_cadeirao_alimentacao", label: "Bebês & Primeira Infância: Possui Cadeirão de Alimentação infantil?", type: "tri_state", defaultVal: "Omitir", tooltip: "Disponibilidade de cadeiras altas para refeição de bebês." },
          { id: "diversidade_lgbtq", label: "Diversidade & Espaço Inclusivo: Ambiente acolhedor e declarado seguro para a comunidade LGBTQ+?", type: "tri_state", defaultVal: "Omitir", tooltip: "Sinaliza espaço respeitoso e livre de discriminação (LGBTQ+ Friendly)." },
          { id: "diversidade_banheiro_unissex", label: "Diversidade & Espaço Inclusivo: Banheiro Unissex / Sem distinção de gênero disponível?", type: "tri_state", defaultVal: "Omitir", tooltip: "Informa disponibilidade de sanitário individual unissex." },
          {
            id: "outro_acolhimento_comercio",
            label: "Outro diferencial de inclusão ou acolhimento (Especificar)",
            type: "tri_state_with_input",
            defaultVal: "Omitir",
            inputLabel: "Descreva em uma frase (Máx. 90 caracteres)",
            inputPlaceholder: "Ex: Atendimento em LIBRAS e cardápio traduzido em Braille",
            maxLength: 90,
            tooltip: "Qualquer outro atributo de acessibilidade ou acolhimento."
          }
        ]
      },

      // BLOCO 08
      {
        stepNumber: 8,
        id: "bloco_08_parcerias",
        title: "BLOCO 08: PARCERIAS & CONVÊNIOS COMERCIAIS",
        subtitle: "Descontos corporativos para empresas, associações ou sindicatos parceiros.",
        fields: [
          {
            id: "possui_convenios",
            label: "Possui Convênios ou Descontos Corporativos?",
            type: "tri_state",
            defaultVal: "Omitir",
            tooltip: "Ativa a lista de até 5 empresas ou associações conveniadas."
          },
          {
            id: "lista_convenios",
            label: "Empresas ou Associações Conveniadas (Limite de 5)",
            type: "repeater",
            conditionField: "possui_convenios",
            conditionVal: "Sim",
            maxItems: 5,
            addButtonText: "+ Adicionar Convênio",
            tooltip: "Cadastre os convênios ativos da loja.",
            subfields: [
              { id: "nome_conveniada", label: "Nome Fantasia da Empresa ou Associação Conveniada", placeholder: "Ex: Associação Comercial de Matão ou Sindicato Rural" },
              { id: "cnpj_conveniada", label: "Razão Social / CNPJ da Conveniada (Opcional)", placeholder: "Ex: 00.000.000/0000-00 (Opcional)" },
              { id: "beneficio_convenio", label: "Benefício Ofertado (Máx. 90 caracteres)", placeholder: "Ex: 10% de desconto para colaboradores / associados", maxLength: 90 }
            ]
          }
        ]
      },

      // BLOCO 09
      {
        stepNumber: 9,
        id: "bloco_09_catalogo",
        title: "BLOCO 09: CATÁLOGO DE DESTAQUE / CARRO-CHEFE (1 A 5 PRODUTOS/SERVIÇOS)",
        subtitle: "Os principais itens ou serviços que puxam as vendas do estabelecimento.",
        fields: [
          {
            id: "catalogo_destaque",
            label: "Itens do Catálogo de Destaque (Limite de 5) *",
            type: "repeater",
            minItems: 1,
            maxItems: 5,
            addButtonText: "+ Adicionar Item ao Catálogo",
            schemaProp: "hasOfferCatalog",
            tooltip: "Formulário modular dinâmico com os produtos ou serviços carros-chefes.",
            subfields: [
              { id: "item_nome", label: "Nome do Produto ou Serviço Principal *", placeholder: "Ex: Troca de Óleo de Câmbio Automático ou Pizza Detroit Artesanal", required: true },
              { id: "item_descricao", label: "Breve Descrição do Item (diferencial, ingredientes ou benefícios) *", placeholder: "Ex: Procedimento completo com máquina de diálise e fluido sintético homologado", maxLength: 140, required: true },
              { id: "item_preco", label: "Preço de Venda em Reais (R$) (opcional)", placeholder: "Ex: 149,90 (Opcional)" }
            ]
          }
        ]
      },

      // BLOCO 10
      {
        stepNumber: 10,
        id: "bloco_10_ecossistema_digital",
        title: "BLOCO 10: ECOSSISTEMA DIGITAL & REDES (sameAs & PRESENÇA WEB)",
        subtitle: "Deixado estrategicamente para o final para não quebrar a linha de raciocínio documental do usuário.",
        fields: [
          {
            id: "status_site_oficial",
            label: "Site Oficial do Negócio *",
            type: "radio_cards",
            defaultVal: "nao_possui",
            options: [
              { val: "possui_ativo", text: "Já possuo Site Oficial no ar (abre campo para a URL)" },
              { val: "em_ativacao", text: "Domínio em processo de ativação (será gerado na próxima etapa)" },
              { val: "nao_possui", text: "Não possuo presença web própria (Omitir)" }
            ],
            tooltip: "Situação atual do domínio web da empresa."
          },
          {
            id: "url_site_oficial",
            label: "URL do Site Oficial ou Nome do Domínio Pretendido",
            type: "url",
            conditionField: "status_site_oficial",
            conditionNotVal: "nao_possui",
            schemaProp: "url",
            placeholder: "Ex: https://www.nomedaempresa.com.br",
            tooltip: "Cole a URL ativa ou digite o domínio que será ativado na próxima etapa."
          },
          {
            id: "link_google_maps",
            label: "Link do Google Maps / Google Perfil de Empresas (Alta autoridade para IA)",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            schemaProp: "hasMap",
            placeholder: "Ex: https://maps.google.com/?cid=...",
            tooltip: "Crucial: conecta as avaliações e localização oficial do Google à entidade."
          },
          {
            id: "link_delivery_cardapio",
            label: "Link de Delivery / iFood / Cardápio Digital",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: https://www.ifood.com.br/delivery/...",
            tooltip: "Link direto da loja no iFood ou cardápio/catálogo digital."
          },
          {
            id: "link_instagram",
            label: "Instagram Oficial",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: https://instagram.com/suaempresa",
            tooltip: "Perfil oficial no Instagram."
          },
          {
            id: "link_facebook",
            label: "Facebook Oficial",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: https://facebook.com/suaempresa",
            tooltip: "Página oficial no Facebook."
          },
          {
            id: "link_youtube",
            label: "Canal do YouTube",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: https://youtube.com/@suaempresa",
            tooltip: "Canal oficial no YouTube."
          },
          {
            id: "link_linkedin",
            label: "LinkedIn Oficial da Empresa",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: https://linkedin.com/company/suaempresa",
            tooltip: "Perfil corporativo no LinkedIn."
          },
          {
            id: "links_extras_sameas",
            label: "Repositório Aberto (TikTok, TripAdvisor, Reclame Aqui, Waze, Foursquare, catálogo externo)",
            type: "repeater_simple",
            maxItems: 5,
            addButtonText: "+ Adicionar Mais Plataformas",
            placeholder: "Ex: https://www.reclameaqui.com.br/empresa/...",
            tooltip: "Adicione livremente outras plataformas onde a loja está cadastrada."
          }
        ]
      },

      // BLOCO 11 (MÓDULO AVATAR)
      {
        stepNumber: 11,
        id: "bloco_11_avatar_comercio",
        title: "BLOCO 11: MÓDULO AVATAR - O CLIENTE IDEAL DO BALCÃO & CONSUMO LOCAL",
        subtitle: "Mapeamento psicológico e comportamental do consumidor (alimenta a IA e os Apps 1B, 2 e 3).",
        infoBanner: "Psicologia de Consumo Local: Este bloco ensina às IAs o perfil exato da pessoa que mais compra ou frequenta o seu espaço. A IA usa esses dados para sugerir sua empresa quando alguém pedir recomendações compatíveis com a rotina e o estilo desse cliente.",
        fields: [
          {
            id: "avatar_faixa_etaria",
            label: "1.1 Faixa Etária Principal",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "18 a 25 anos (Jovens/Estudantes)", text: "18 a 25 anos (Jovens/Estudantes)" },
              { val: "26 a 40 anos (Adultos/Profissionais/Famílias novas)", text: "26 a 40 anos (Adultos/Profissionais/Famílias novas)" },
              { val: "41 a 60 anos (Famílias maduras/Consolidados)", text: "41 a 60 anos (Famílias maduras/Consolidados)" },
              { val: "Mais de 60 anos (Melhor idade/Aposentados)", text: "Mais de 60 anos (Melhor idade/Aposentados)" },
              { val: "Livre / Todas as idades", text: "Livre / Todas as idades" }
            ],
            allowOther: true,
            otherLabel: "Outro perfil etário (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Crianças acompanhadas de pais e avós aos fins de semana",
            otherMaxLength: 90,
            tooltip: "Faixa etária predominante dos clientes da loja."
          },
          {
            id: "avatar_decisor_compra",
            label: "1.2 Quem Costuma Decidir a Compra / Visita?",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Decisão predominantemente Feminina", text: "Decisão predominantemente Feminina" },
              { val: "Decisão predominantemente Masculina", text: "Decisão predominantemente Masculina" },
              { val: "Decisão Conjunta / Familiar", text: "Decisão Conjunta / Familiar" }
            ],
            allowOther: true,
            otherLabel: "Outro formato de decisão (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Decisão corporativa de compras ou compras coletivas de funcionários",
            otherMaxLength: 90,
            tooltip: "Define quem toma a decisão final de compra."
          },
          {
            id: "avatar_habito_consumo",
            label: "2. Ocasião Principal & Hábito de Consumo: O que o seu cliente mais valoriza ao comprar de você?",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Rapidez, Praticidade e Agilidade", text: "Rapidez, Praticidade e Agilidade (Quer comprar e sair rápido sem perder tempo)" },
              { val: "Conforto, Convivência e Experiência", text: "Conforto, Convivência e Experiência (Quer sentar, passear, conversar e relaxar)" },
              { val: "Confiança Técnica e Qualidade Superior", text: "Confiança Técnica e Qualidade Superior (Não se importa em pagar mais, quer certeza de que é o melhor)" },
              { val: "Custo-Benefício e Economia", text: "Custo-Benefício e Economia (Compara preços, busca descontos e promoções)" }
            ],
            allowOther: true,
            otherLabel: "Outro valor principal (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Exclusividade de produtos importados artesanais difíceis de achar",
            otherMaxLength: 90,
            tooltip: "Principal motivador de valor percebido pelo cliente."
          },
          {
            id: "avatar_horario_pico",
            label: "3. Momento Crítico / Horário de Pico de Procura: Em qual janela do dia esse público mais precisa do seu negócio?",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Manhã cedo", text: "Manhã cedo (Café, conveniência, emergência de saída de casa)" },
              { val: "Horário de Almoço", text: "Horário de Almoço (Executivos, trabalhadores, pausa rápida)" },
              { val: "Fim de Tarde / Volta do Trabalho", text: "Fim de Tarde / Volta do Trabalho (Compras para o lar, happy hour)" },
              { val: "Noite e Fins de Semana", text: "Noite e Fins de Semana (Lazer em família, pedidos por delivery, encontros)" }
            ],
            allowOther: true,
            otherLabel: "Outro momento de consumo (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Atendimento sob demanda em plantões noturnos e madrugadas",
            otherMaxLength: 90,
            tooltip: "Janela horária de maior intenção de compra."
          },
          {
            id: "avatar_tom_voz",
            label: "4. Tratamento & Tom de Voz que o Cliente Espera: Como esse cliente gosta de ser atendido pela sua equipe?",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Atendimento Íntimo, Acolhedor e Amigável", text: "Atendimento Íntimo, Acolhedor e Amigável (Gosta de ser chamado pelo nome, conversar e se sentir em casa)" },
              { val: "Atendimento Ágil, Direto e Objetivo", text: "Atendimento Ágil, Direto e Objetivo (Zero enrolação, direto ao ponto no WhatsApp e no caixa)" },
              { val: "Atendimento Polido, Formal e Sofisticado", text: "Atendimento Polido, Formal e Sofisticado (Exige discrição, formalidade e alto padrão de cortesia)" }
            ],
            allowOther: true,
            otherLabel: "Outro estilo de atendimento (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Atendimento técnico consultivo onde tiramos todas as dúvidas antes",
            otherMaxLength: 90,
            tooltip: "Estilo de comunicação preferido pelo seu consumidor."
          },
          {
            id: "avatar_maior_dor",
            label: "5. A Maior Dor ou Medo que Afasta Esse Cliente de Concorrentes: O que mais irrita o seu cliente em lojas concorrentes da cidade?",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Demora no atendimento ou fila longa", text: "Demora no atendimento ou fila longa" },
              { val: "Produtos sem procedência, de baixa durabilidade ou sem garantia", text: "Produtos sem procedência, de baixa durabilidade ou sem garantia" },
              { val: "Ambiente barulhento, sujo ou desorganizado", text: "Ambiente barulhento, sujo ou desorganizado" },
              { val: "Falta de clareza nos preços ou cobranças inesperadas", text: "Falta de clareza nos preços ou cobranças inesperadas" }
            ],
            allowOther: true,
            otherLabel: "Outro medo ou irritação (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Falta de peças de reposição e demora na entrega de encomendas",
            otherMaxLength: 90,
            tooltip: "Ponto de frustração que faz o cliente abandonar a concorrência e procurar você."
          },
          {
            id: "avatar_raiox_livre",
            label: "6. Raio-X Livre do Avatar do Comércio (Campo Aberto Opcional)",
            type: "textarea",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir Raio-X Livre",
            maxLength: 300,
            placeholder: "Ex: Mães entre 30 e 45 anos que buscam opções saudáveis para os filhos à tarde e valorizam ambientes limpos e com facilidade para estacionar.",
            tooltip: "Descrição livre em até 300 caracteres do seu cliente ideal."
          }
        ]
      }
    ]
  },

  // ==========================================================================
  // PERFIL 02: PRESTADOR DE SERVIÇO & AUTÔNOMO (11 BLOCOS)
  // ==========================================================================
  prestador_servico: {
    id: "prestador_servico",
    storageKey: "geo_engine_service_provider",
    badgeIcon: "🛠️",
    badgeText: "Prestador & Autônomo",
    cardTitle: "Prestador de Serviço & Autônomo",
    cardDescription: "Eletricistas, encanadores, pedreiros, pintores, marceneiros, diaristas, jardineiros, chaveiros, técnicos de refrigeração, fretes e construtoras.",
    defaultSchemaType: "HomeAndConstructionBusiness",
    submitButtonText: "Gerar & Validar Perfil de Prestador para IA →",

    steps: [
      // BLOCO 01
      {
        stepNumber: 1,
        id: "bloco_01_identidade_prestador",
        title: "BLOCO 01: IDENTIDADE PROFISSIONAL & MARCA COMERCIAL",
        subtitle: "Foco na reputação da marca ou do autônomo, sem vínculos com funcionários passageiros.",
        fields: [
          {
            id: "ramos_atuacao_multiplos",
            label: "1. Ramo(s) de Atuação / Atividades Exercidas *",
            type: "checkbox_group",
            required: true,
            schemaProp: "additionalType",
            tooltip: "Marque todas as áreas em que você trabalha. A IA utilizará essas escolhas para recomendar o seu contato quando o cliente fizer buscas combinadas (ex: 'pedreiro que também faz parte elétrica').",
            options: [
              { val: "Electrician", text: "Eletricista / Instalações Elétricas" },
              { val: "Plumber", text: "Encanador / Bombeiro Hidráulico" },
              { val: "GeneralContractor", text: "Pedreiro / Alvenaria / Reformas" },
              { val: "HousePainter", text: "Pintor Residencial / Comercial / Industrial" },
              { val: "Marcenaria", text: "Marcenaria / Montador de Móveis" },
              { val: "Housekeeping", text: "Diarista / Faxina / Limpeza Pós-Obra" },
              { val: "Landscaping", text: "Jardineiro / Manutenção de Áreas Verdes / Paisagismo" },
              { val: "Locksmith", text: "Chaveiro Residencial / Automotivo Móvel" },
              { val: "HVACBusiness", text: "Técnico de Ar-Condicionado / Refrigeração" },
              { val: "MovingCompany", text: "Entregador / Fretes / Mudanças / Carreto" },
              { val: "Driver", text: "Motorista Profissional / Transporte Executivo / Táxi" },
              { val: "Construction", text: "Construtora / Empreiteira de Obras" }
            ],
            allowOther: true,
            highlightOther: true,
            otherLabel: "⭐ Outra Especialidade de Serviço (Digite com precisão o serviço executado pelo profissional *)",
            otherPlaceholder: "Ex: Instalador de Energia Solar Fotovoltaica",
            otherMaxLength: 90
          },
          {
            id: "razao_social",
            label: "2. Razão Social do Negócio *",
            type: "text",
            required: true,
            schemaProp: "legalName",
            placeholder: "Ex: João da Silva Serviços Elétricos MEI ou Construtora Silva Ltda",
            tooltip: "Nome oficial que consta no seu cartão CNPJ ou no seu registro formal de empresa."
          },
          {
            id: "nome_fantasia",
            label: "3. Nome Fantasia (Marca de Divulgação) *",
            type: "text",
            required: true,
            schemaProp: "name",
            placeholder: "Ex: Encanador João 24h ou Top Mais Jardinagem & Paisagismo",
            tooltip: "O nome popular pelo qual os seus clientes conhecem, procuram e salvam o seu contato no celular."
          },
          {
            id: "cnpj",
            label: "4. CNPJ da Empresa ou MEI",
            type: "cnpj",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir / Atua como Pessoa Física sem CNPJ",
            schemaProp: "taxID",
            placeholder: "Ex: 12.345.678/0001-90",
            tooltip: "Ter CNPJ aumenta consideravelmente a nota de confiança da empresa perante as IAs (ficando invisível ao público no código), mas pode ser omitido caso você atue como pessoa física autônoma."
          },
          {
            id: "whatsapp_principal",
            label: "5.1 WhatsApp Principal para Chamados e Orçamentos *",
            type: "phone",
            required: true,
            defaultPrefix: "+55 ",
            schemaProp: "telephone",
            placeholder: "Ex: +55 16 99999-8888",
            tooltip: "Número principal para onde o cliente será direcionado para pedir o serviço."
          },
          {
            id: "telefone_fixo",
            label: "5.2 Telefone Fixo / Linha Secundária",
            type: "phone",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: +55 16 3382-0000",
            tooltip: "Linha fixa ou secundária de atendimento."
          },
          {
            id: "telegram_comercial",
            label: "5.3 Telegram de Atendimento",
            type: "text",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: @atendimento_silva",
            tooltip: "Link ou usuário do Telegram."
          },
          {
            id: "email_comercial",
            label: "5.4 E-mail Geral para Orçamentos e Recibos *",
            type: "email",
            required: true,
            schemaProp: "email",
            placeholder: "Ex: contato@joaoeletricista.com.br",
            tooltip: "Utilizado pelas IAs e clientes corporativos para envio de pedidos formais de proposta."
          },
          {
            id: "especialidade_carro_chefe",
            label: "6. Especialidade Principal (O Seu Maior Diferencial) *",
            type: "text",
            required: true,
            maxLength: 80,
            schemaProp: "knowsAbout",
            placeholder: "Ex: Pintura decorativa com cimento queimado e efeitos modernos",
            tooltip: "Qual é o serviço exato pelo qual você é mais elogiado ou que mais dá lucro? Seja específico e direto em até 80 caracteres."
          },
          {
            id: "ano_fundacao",
            label: "7. Ano de Início da Atividade / Tempo de Experiência Prática *",
            type: "select",
            required: true,
            schemaProp: "foundingDate",
            options: generateYearsList(200, "Mais de 200 anos (Tradição familiar/secular)"),
            tooltip: "Mostra para a inteligência artificial a sua bagagem prática de mercado, transmitindo segurança para quem vai contratar."
          },
          {
            id: "descricao_otimizada",
            label: "8. Apresentação Profissional para os Motores de Busca *",
            type: "textarea",
            required: true,
            minLength: 150,
            maxLength: 350,
            schemaProp: "description",
            placeholder: "Profissional autônomo com 12 anos de experiência em reformas elétricas residenciais e comerciais em Matão e região. Realizamos instalação de padrão de energia, troca de fiação, iluminação LED e quadros de disjuntores. Atendimento com ferramentas próprias, pontualidade e emissão de nota fiscal.",
            tooltip: "Texto corrido que resume suas principais soluções, bairros atendidos e diferenciais. As IAs utilizam esse parágrafo como base para responder perguntas sobre o que você faz."
          }
        ]
      },

      // BLOCO 02
      {
        stepNumber: 2,
        id: "bloco_02_cobertura_prestador",
        title: "BLOCO 02: COBERTURA REGIONAL, RAIO DE ATUAÇÃO & BASE OPERACIONAL",
        subtitle: "Focado na mobilidade geográfica do profissional.",
        fields: [
          {
            id: "cep_epicentro",
            label: "1. CEP da Sua Base de Saída / Epicentro Operacional *",
            type: "cep",
            required: true,
            checkboxAddon: { id: "base_rural", label: "Base em Área Rural / Rodovia" },
            schemaProp: "postalCode",
            placeholder: "Ex: 15990-000",
            tooltip: "O CEP de onde você parte para os atendimentos. Ele funciona como o 'quilômetro zero' para a IA calcular a distância até o endereço do cliente."
          },
          {
            id: "estado_uf",
            label: "2. Estado Principal de Atuação (UF) *",
            type: "select",
            required: true,
            schemaProp: "addressRegion",
            options: BRAZIL_STATES,
            tooltip: "Garante que as cidades informadas abaixo sejam associadas ao estado correto, evitando confusão com cidades homônimas em outros estados."
          },
          {
            id: "raio_deslocamento",
            label: "3. Raio Máximo de Deslocamento a partir da sua Base (CEP) *",
            type: "select_with_other",
            required: true,
            schemaProp: "geoRadius",
            tooltip: "Indica até qual distância você aceita se deslocar para realizar serviços sem recusar chamados.",
            options: [
              { val: "Até 15 km", text: "Até 15 km (Apenas o próprio município e bairros vizinhos)" },
              { val: "Até 30 km", text: "Até 30 km (Microrregião / Cidades vizinhas próximas)" },
              { val: "Até 60 km", text: "Até 60 km (Região metropolitana completa)" },
              { val: "Até 100 km", text: "Até 100 km (Atendimento regional amplo)" },
              { val: "Acima de 100 km / Todo o Estado", text: "Acima de 100 km / Todo o Estado" },
              { val: "Cobertura em Todo o Território Nacional", text: "Cobertura em Todo o Território Nacional (Grandes obras e contratos)" },
              { val: "OTHER", text: "Outro raio de cobertura (Especificar)" }
            ],
            otherLabel: "Especifique o seu raio de deslocamento (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Até 150 km para obras acima de 3 dias de duração",
            otherMaxLength: 90
          },
          {
            id: "cidades_atendidas",
            label: "4. Cidades e Bairros Atendidos (Lista por Nome) *",
            type: "textarea_short",
            required: true,
            schemaProp: "areaServed",
            placeholder: "Ex: Matão, Araraquara, São Carlos, Taquaritinga, Dobrada e bairros rurais vizinhos",
            tooltip: "Digite os nomes de todas as cidades e regiões onde você atende. Quando um morador perguntar 'eletricista em [cidade]', a IA usará essa lista para te recomendar."
          },
          {
            id: "possui_ponto_fisico",
            label: "5. Possui Ponto Físico / Oficina Aberta ao Público?",
            type: "radio_cards",
            defaultVal: "Nao",
            options: [
              { val: "Nao", text: "Não - Atendimento 100% no Endereço do Cliente" },
              { val: "Sim", text: "Sim - Possui Balcão / Oficina Aberta para Visitas" }
            ],
            tooltip: "Se você não atende clientes na sua casa, deixe marcado 'Não'. Isso protege o seu endereço pessoal e foca na sua área de atendimento."
          },
          {
            id: "endereco_sede_opcional",
            label: "Endereço da Sede Física / Oficina Aberta",
            type: "group_row",
            conditionField: "possui_ponto_fisico",
            conditionVal: "Sim",
            tooltip: "Campos simplificados da sede aberta ao público.",
            subfields: [
              { id: "rua_sede", label: "Rua / Logradouro", placeholder: "Ex: Rua Sete de Setembro" },
              { id: "numero_sede", label: "Número", placeholder: "Ex: 450" },
              { id: "bairro_sede", label: "Bairro", placeholder: "Ex: Centro" },
              { id: "cidade_sede", label: "Cidade", placeholder: "Ex: Matão" }
            ]
          }
        ]
      },

      // BLOCO 03
      {
        stepNumber: 3,
        id: "bloco_03_licencas_prestador",
        title: "BLOCO 03: LICENÇAS, LAUDOS & CONFORMIDADE REGULATÓRIA",
        subtitle: "Opcional para segmentos que necessitam de comprovação de regularidade.",
        fields: [
          {
            id: "alvara_municipal",
            label: "1. Alvará de Funcionamento / Inscrição Municipal:",
            type: "tri_state_with_input",
            defaultVal: "Omitir",
            inputLabel: "Número do Alvará / Inscrição Municipal (Opcional)",
            inputPlaceholder: "Ex: 12345/2024",
            tooltip: "Comprova a regularidade do seu negócio junto à prefeitura local."
          },
          {
            id: "licenca_ambiental_sanitaria",
            label: "2. Licença Ambiental / Sanitária / Laudo Técnico (Dedetização, Limpeza de Fossa, Descarte de Entulho):",
            type: "tri_state_with_input",
            defaultVal: "Omitir",
            inputLabel: "Número da Licença / Laudo e Órgão Emissor (Opcional)",
            inputPlaceholder: "Ex: Licença CETESB nº 98765",
            tooltip: "Indispensável para profissionais que lidam com resíduos controlados, dedetização ou licenças especiais."
          },
          {
            id: "outra_licenca_prestador",
            label: "Outra Licença ou Registro Oficial (Especificar)",
            type: "tri_state_with_input",
            defaultVal: "Omitir",
            inputLabel: "Descreva em uma frase (Máx. 90 caracteres)",
            inputPlaceholder: "Ex: Cadastro ativo de empreiteiro na prefeitura e registro ANTT",
            maxLength: 90,
            tooltip: "Qualquer outra licença específica do seu ramo."
          }
        ]
      },

      // BLOCO 04
      {
        stepNumber: 4,
        id: "bloco_04_horarios_sos",
        title: "BLOCO 04: HORÁRIOS DE ATENDIMENTO & REGIME DE URGÊNCIA (S.O.S)",
        subtitle: "Disponibilidade para socorro emergencial, horários regulares e feriados.",
        fields: [
          {
            id: "regime_urgencia_sos",
            label: "1. Atendimento de Urgência / Socorro Emergencial *",
            type: "select_with_other",
            required: true,
            defaultVal: "Nao_Emergencia",
            tooltip: "As IAs priorizam prestadores 24h ou com plantão para buscas imediatas como 'encanador urgente agora'.",
            options: [
              { val: "24_Horas", text: "Atendimento Emergencial 24 Horas / Todos os Dias" },
              { val: "Plantao_Estendido", text: "Plantão Noturno Estendido / Início Antecipado" },
              { val: "Fins_Semana_Feriados", text: "Atendimento de Urgência aos Fins de Semana e Feriados" },
              { val: "Nao_Emergencia", text: "Não realiza atendimentos de emergência (Apenas horário comercial regular)" },
              { val: "OTHER", text: "Outro formato de plantão de urgência (Especificar)" }
            ],
            otherLabel: "Informe a regra do seu atendimento de urgência (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Socorro emergencial exclusivo para condomínios sob contrato",
            otherMaxLength: 90
          },
          {
            id: "detalhe_plantao_estendido",
            label: "Informe a faixa de horário do plantão estendido:",
            type: "text",
            conditionField: "regime_urgencia_sos",
            conditionVal: "Plantao_Estendido",
            maxLength: 90,
            placeholder: "Ex: Atendimento das 06h às 22h",
            tooltip: "Especifique o horário antecipado ou noturno em que você atende."
          },
          {
            id: "grade_horarios",
            label: "2. Horários Semanais Regulares de Atendimento (Segunda a Domingo) *",
            type: "opening_hours_grid",
            allowCopyMondayToFriday: true,
            copyButtonText: "Copiar horário de Segunda para Sexta-feira",
            tooltip: "Os horários normais em que você está com a agenda aberta para prestar serviços."
          },
          {
            id: "operacao_feriados",
            label: "3. Atendimento em Feriados:",
            type: "select_with_other",
            defaultVal: "Omitir",
            tooltip: "Informa aos motores de busca se você é uma opção ativa durante os dias de feriado.",
            options: [
              { val: "Omitir", text: "Omitir" },
              { val: "Atende em todos os feriados", text: "Atende em todos os feriados" },
              { val: "Não atende em feriados", text: "Não atende em feriados" },
              { val: "Atende em feriados específicos", text: "Atende em feriados específicos" },
              { val: "OTHER", text: "Outra condição em feriados (Especificar)" }
            ],
            otherLabel: "Descreva como funciona nos feriados (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Atende nos feriados apenas chamados emergenciais S.O.S",
            otherMaxLength: 90
          },
          {
            id: "feriados_especificos",
            label: "Selecione os feriados atendidos:",
            type: "checkbox_group",
            conditionField: "operacao_feriados",
            conditionVal: "Atende em feriados específicos",
            options: [
              { val: "Carnaval", text: "Carnaval" },
              { val: "Páscoa", text: "Páscoa" },
              { val: "Feriados Nacionais", text: "Feriados Nacionais (Tiradentes, Independência, etc.)" },
              { val: "Aniversário da Cidade", text: "Aniversário da Cidade" },
              { val: "Natal e Ano Novo", text: "Natal e Ano Novo" }
            ],
            tooltip: "Opções rápidas de feriados atendidos."
          }
        ]
      },

      // BLOCO 05
      {
        stepNumber: 5,
        id: "bloco_05_orcamentos_garantias_prestador",
        title: "BLOCO 05: ORÇAMENTOS, FORMAS DE PAGAMENTO, GARANTIAS & PROTEÇÃO JURÍDICA",
        subtitle: "Transparência de orçamento, qualificações, garantias, seguro e meios de pagamento.",
        fields: [
          {
            id: "orcamento_gratuito_local",
            label: "1.1 Faz Orçamentos Presenciais Gratuitamente no Local?",
            type: "select_with_other",
            defaultVal: "Omitir",
            tooltip: "Critérios práticos que o cliente quer saber antes de chamar o profissional.",
            options: [
              { val: "Omitir", text: "Omitir" },
              { val: "Sim", text: "Sim" },
              { val: "Não (Cobra taxa de visita técnica)", text: "Não (Cobra taxa de visita técnica)" },
              { val: "OTHER", text: "Outra condição de visita (Especificar)" }
            ],
            otherLabel: "Explique sua regra de visita (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Cobra taxa de visita que é descontada caso o cliente feche o serviço",
            otherMaxLength: 90
          },
          {
            id: "pre_orcamento_whatsapp",
            label: "1.2 Faz Avaliação Prévia por Fotos/Vídeos no WhatsApp?",
            type: "tri_state",
            defaultVal: "Sim",
            tooltip: "Informa se o cliente pode mandar foto/vídeo do defeito para pré-orçamento."
          },
          {
            id: "exclusivo_agendamento",
            label: "1.3 Trabalha Exclusivamente com Agendamento Prévio?",
            type: "tri_state",
            defaultVal: "Omitir",
            tooltip: "Define se atende apenas com hora marcada."
          },
          {
            id: "cursos_qualificacao",
            label: "2.1 Possui Cursos Técnicos ou Certificações Profissionais (Ex: SENAI, NR-10, NR-35, Eletrotécnica)?",
            type: "tri_state_with_input",
            defaultVal: "Omitir",
            inputLabel: "Nome dos Cursos ou Certificações (Máx. 90 caracteres)",
            inputPlaceholder: "Ex: Eletricista Instalador SENAI, NR-10 Segurança em Eletricidade",
            maxLength: 90,
            schemaProp: "hasCredential",
            tooltip: "Qualificação técnica formal para execução segura do trabalho."
          },
          {
            id: "instalador_credenciado_marcas",
            label: "2.2 É Instalador Credenciado / Autorizado por Fabricantes ou Marcas Oficiais?",
            type: "tri_state_with_input",
            defaultVal: "Omitir",
            inputLabel: "Marcas Homologadas (Máx. 90 caracteres)",
            inputPlaceholder: "Ex: Tigre, Deca, Intelbras, Amanco, Lorenzetti",
            maxLength: 90,
            tooltip: "Ser autorizado por marcas eleva a autoridade da empresa, fazendo as IAs recomendarem o seu serviço em buscas especializadas de marcas."
          },
          {
            id: "possui_garantia",
            label: "3. Oferece Garantia Formal dos Serviços Realizados?",
            type: "tri_state",
            defaultVal: "Omitir",
            tooltip: "A garantia documentada transmite extrema credibilidade para clientes que buscam profissionais de confiança."
          },
          {
            id: "detalhes_garantia",
            label: "Detalhamento da Garantia de Mão de Obra e Peças",
            type: "warranty_group",
            conditionField: "possui_garantia",
            conditionVal: "Sim",
            tooltip: "Detalhes sobre a garantia oferecida.",
            subfields: [
              {
                id: "garantia_escrita",
                label: "Garantia Formalizada por Escrito (em Contrato, Recibo ou Nota Fiscal)?",
                type: "tri_state",
                defaultVal: "Sim"
              },
              {
                id: "prazo_garantia",
                label: "Prazo da Garantia de Mão de Obra",
                type: "text",
                checkboxAddon: { id: "garantia_variavel", label: "O prazo varia conforme o tipo de serviço executado" },
                placeholder: "Ex: 90 dias, 1 ano",
                maxLength: 90
              },
              {
                id: "cobertura_garantia",
                label: "Cobertura Resumida da Garantia",
                type: "text",
                placeholder: "Ex: Retorno imediato e sem custos em caso de falha de instalação ou vazamentos decorrentes do serviço",
                maxLength: 150
              }
            ]
          },
          {
            id: "seguro_responsabilidade_civil",
            label: "4.1 Possui Seguro de Responsabilidade Civil (Cobre danos acidentais a bens do cliente)?",
            type: "tri_state",
            defaultVal: "Omitir",
            tooltip: "Se um cano estourar ou um objeto caro for danificado na obra, a apólice ressarce o cliente."
          },
          {
            id: "contrato_formal_servico",
            label: "4.2 Trabalha com Contrato Formal de Prestação de Serviços (Segurança Jurídica para o Contratante)?",
            type: "tri_state",
            defaultVal: "Omitir",
            tooltip: "Formalização contratual do serviço."
          },
          {
            id: "equipe_propria_regularizada",
            label: "4.3 Equipe Própria Regularizada (Alimentação, Transporte e Encargos sob responsabilidade do Prestador)?",
            type: "tri_state",
            defaultVal: "Omitir",
            tooltip: "Tranquiliza condomínios e donos de imóveis quanto a riscos trabalhistas de terceiros."
          },
          {
            id: "faixa_precos_reais",
            label: "5. Valores Reais & Faixa de Preço de Serviços (R$)",
            type: "price_range_group",
            allowOmit: true,
            omitLabel: "Omitir valores",
            tooltip: "Permite à IA entender para qual perfil de bolso e complexidade de trabalho você é mais indicado.",
            subfields: [
              { id: "menor_preco", label: "Preço de Serviços Simples / Chamado Inicial (R$)", placeholder: "Ex: 80,00" },
              { id: "maior_preco", label: "Preço de Serviços Complexos / Obras Maiores (R$)", placeholder: "Ex: 4.500,00" },
              { id: "ticket_medio", label: "Valor Médio mais Cobrado por Chamado (R$)", placeholder: "Ex: 180,00" }
            ]
          },
          {
            id: "formas_pagamento",
            label: "6. Formas de Pagamento Aceitas",
            type: "checkbox_group",
            schemaProp: "paymentAccepted",
            options: [
              { val: "Pix", text: "Pix" },
              { val: "Dinheiro em Espécie", text: "Dinheiro em Espécie" },
              { val: "Cartão de Débito", text: "Cartão de Débito" },
              { val: "Boleto Bancário", text: "Boleto Bancário" },
              { val: "Cartão de Crédito", text: "Cartão de Crédito" }
            ],
            allowOther: true,
            otherLabel: "Outra forma de pagamento (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Transferência bancária ou PIX parcelado",
            otherMaxLength: 90,
            tooltip: "Formas de pagamento aceitas."
          },
          {
            id: "parcelamento_cartao",
            label: "7. Condições de Parcelamento no Cartão de Crédito",
            type: "installment_group",
            conditionField: "formas_pagamento",
            conditionContains: "Cartão de Crédito",
            tooltip: "Parcelamento no cartão.",
            maxInstallmentsOptions: [
              { val: "Até 3x", text: "Até 3x" },
              { val: "Até 6x", text: "Até 6x" },
              { val: "Até 10x", text: "Até 10x" },
              { val: "Até 12x", text: "Até 12x" },
              { val: "Até 18x ou mais", text: "Até 18x ou mais" }
            ],
            interestOptions: [
              { val: "Sem acréscimo / Sem juros", text: "Sem acréscimo / Sem juros" },
              { val: "Com taxa da maquininha", text: "Com taxa da maquininha" },
              { val: "Parcialmente sem juros (ex: até 3x sem juros)", text: "Parcialmente sem juros (ex: até 3x sem juros)" }
            ]
          },
          {
            id: "parcelamento_proprio",
            label: "8. Opções Próprias de Parcelamento / Faturamento",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir / Não oferece parcelamento próprio",
            options: [
              { val: "Boleto Faturado para Empresas ou Condomínios (PJ - 15/30/45 dias)", text: "Boleto Faturado para Empresas ou Condomínios (PJ - 15/30/45 dias)" },
              { val: "Pagamento Parcelado por Etapas de Conclusão da Obra (Entrada + Medições)", text: "Pagamento Parcelado por Etapas de Conclusão da Obra (Entrada + Medições)" },
              { val: "Financiamento de Materiais em Loja Conveniada Parceira", text: "Financiamento de Materiais em Loja Conveniada Parceira" }
            ],
            allowOther: true,
            otherLabel: "Outra opção de faturamento (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Entrada para materiais e saldo em 30 dias após entrega",
            otherMaxLength: 90,
            tooltip: "Facilidades próprias de pagamento."
          }
        ]
      },

      // BLOCO 06
      {
        stepNumber: 6,
        id: "bloco_06_excelencia_prestador",
        title: "BLOCO 06: EXCELÊNCIA NA EXECUÇÃO, CONDUTA NO LAR & FERRAMENTAL",
        subtitle: "Critérios que diferenciam o profissional comum do profissional 5 estrelas.",
        fields: [
          { id: "uso_epis", label: "Uso Obrigatório de EPIs: Trabalha com Equipamentos de Proteção Individual completos (botinas com bico de aço, óculos, luvas de isolamento, cinto trava-quedas)?", type: "tri_state", defaultVal: "Omitir", tooltip: "Segurança do trabalho durante o serviço." },
          { id: "trabalha_uniformizado", label: "Apresentação Profissional: Profissionais trabalham devidamente uniformizados?", type: "tri_state", defaultVal: "Omitir", tooltip: "Apresentação visual padronizada." },
          { id: "cracha_identificacao", label: "Identificação & Confiança: Equipe com crachá de identificação com foto para acesso seguro a residências e portarias?", type: "tri_state", defaultVal: "Omitir", tooltip: "Tranquilidade para o cliente saber quem está entrando no lar." },
          { id: "limpeza_pos_servico", label: "Compromisso de Limpeza: Deixa o local do serviço completamente limpo e recolhe os entulhos/sobras de materiais ao término da obra?", type: "tri_state", defaultVal: "Omitir", tooltip: "Organização e limpeza pós-obra." },
          { id: "aviso_antecipado_atraso", label: "Pontualidade & Comunicação: Possui política de aviso prévio com antecedência caso ocorra atraso ou imprevisto de agenda?", type: "tri_state", defaultVal: "Omitir", tooltip: "Comunicação transparente de horários." },
          { id: "sinalizacao_preventiva", label: "Sinalização Preventiva: Utiliza cones, fitas de isolamento ou placas de aviso para evitar acidentes com moradores e crianças na área de trabalho?", type: "tri_state", defaultVal: "Omitir", tooltip: "Prevenção de acidentes domésticos ou em condomínios." },
          { id: "atende_condominios_predios", label: "Atendimento em Condomínios e Edifícios: Atende com frequência em prédios e condomínios fechados (respeitando normas de ruído, horários de portaria e uso de escadas/elevadores de serviço)?", type: "tri_state", defaultVal: "Omitir", tooltip: "Aptidão para regras condominiais rígidas." },
          { id: "ferramental_proprio", label: "Ferramental Próprio Profissional: Possui conjunto completo de ferramentas elétricas, manuais e aparelhos de medição próprios?", type: "tri_state", defaultVal: "Omitir", tooltip: "Autonomia completa de ferramentas." },
          { id: "gestao_equipamentos_pesados", label: "Gestão de Equipamentos Pesados: Caso a obra precise de andaimes, betoneira ou compressores pesados, o prestador se encarrega da locação e logística de entrega?", type: "tri_state", defaultVal: "Omitir", tooltip: "Gestão de maquinário complementar." },
          { id: "pede_sinal_agenda", label: "Sinal de Agendamento: Solicita valor de adiantamento (sinal) para reserva de data na agenda de serviços?", type: "tri_state", defaultVal: "Omitir", tooltip: "Política de sinal para reserva de agenda." },
          {
            id: "outro_excelencia_prestador",
            label: "Outro critério de excelência operacional (Especificar)",
            type: "tri_state_with_input",
            defaultVal: "Omitir",
            inputLabel: "Descreva em uma frase (Máx. 90 caracteres)",
            inputPlaceholder: "Ex: Envelopamento de móveis e pisos antes de iniciar o serviço",
            maxLength: 90,
            tooltip: "Qualquer outro diferencial 5 estrelas da sua prestação de serviço."
          }
        ]
      },

      // BLOCO 07
      {
        stepNumber: 7,
        id: "bloco_07_acolhimento_prestador",
        title: "BLOCO 07: ACOLHIMENTO ESPECIALIZADO, CUIDADO COM O LAR & COMUNICAÇÃO",
        subtitle: "Cuidado com famílias atípicas, idosos, pets e comunicação inclusiva.",
        fields: [
          { id: "controle_ruido_vulneraveis", label: "Atenção a Pessoas Vulneráveis (TEA, Idosos, Acamados, Bebês): Preparado para atuar com cuidado especial em lares com pessoas no espectro autista, idosos acamados ou bebês (possibilidade de combinar pausas para reduzir barulho de ferramentas ruidosas e controle rígido de poeira)?", type: "tri_state", defaultVal: "Omitir", tooltip: "Empatia e adaptação de rotina em residências sensíveis." },
          { id: "cuidado_animais_estimacao", label: "Convivência com Animais de Estimação: Preparado e acostumado a trabalhar em ambientes com animais de estimação (cães e gatos), mantendo portões e acessos sempre fechados?", type: "tri_state", defaultVal: "Omitir", tooltip: "Cuidado para evitar fuga de pets." },
          { id: "atendimento_libras", label: "Comunicação em Língua Brasileira de Sinais (LIBRAS): O profissional ou membro da equipe comunica-se em LIBRAS para atendimento acessível a clientes surdos?", type: "tri_state", defaultVal: "Omitir", tooltip: "Inclusão comunicacional em LIBRAS." },
          { id: "outros_idiomas_prestador", label: "Comunicação em Outros Idiomas (Inglês, Espanhol): Capaz de conversar e explicar o orçamento em outro idioma para estrangeiros e imigrantes?", type: "tri_state", defaultVal: "Omitir", tooltip: "Atendimento bilíngue." },
          {
            id: "outro_acolhimento_prestador",
            label: "Outro cuidado especial no lar do cliente (Especificar)",
            type: "tri_state_with_input",
            defaultVal: "Omitir",
            inputLabel: "Descreva em uma frase (Máx. 90 caracteres)",
            inputPlaceholder: "Ex: Uso de aspirador industrial acoplado na lixadeira para zero poeira",
            maxLength: 90,
            tooltip: "Outro cuidado relevante durante o trabalho no lar."
          }
        ]
      },

      // BLOCO 08
      {
        stepNumber: 8,
        id: "bloco_08_parcerias_prestador",
        title: "BLOCO 08: PARCERIAS, CONVÊNIOS & DESCONTOS EM MATERIAIS",
        subtitle: "Parcerias comerciais com depósitos/lojas e convênios com associações ou condomínios.",
        fields: [
          {
            id: "parceria_lojas_materiais",
            label: "1. Parcerias com Lojas de Materiais e Autopeças: Possui parceria formal com lojas de materiais de construção, depósitos ou autopeças para repassar descontos na compra dos materiais ao cliente?",
            type: "tri_state_with_input",
            defaultVal: "Omitir",
            inputLabel: "Nome das Lojas ou Depósitos Parceiros (Máx. 90 caracteres)",
            inputPlaceholder: "Ex: Depósito São José e Casa das Cores Tintas",
            maxLength: 90,
            tooltip: "Benefício direto no bolso do cliente na compra dos insumos."
          },
          {
            id: "possui_convenios",
            label: "2. Convênios e Descontos Corporativos: Oferece tabela com descontos especiais para condomínios conveniados, sindicatos, associações ou seguradoras?",
            type: "tri_state",
            defaultVal: "Omitir",
            tooltip: "Habilita o cadastro de até 5 convênios."
          },
          {
            id: "lista_convenios",
            label: "Lista de Convênios Ativos (Limite de 5)",
            type: "repeater",
            conditionField: "possui_convenios",
            conditionVal: "Sim",
            maxItems: 5,
            addButtonText: "+ Adicionar Convênio",
            tooltip: "Cadastre condomínios, sindicatos ou associações parceiras.",
            subfields: [
              { id: "nome_conveniada", label: "Nome da Associação / Sindicato / Administradora Parceira", placeholder: "Ex: Sindicato dos Aposentados ou Condomínio Jardins" },
              { id: "beneficio_convenio", label: "Benefício Ofertado (Máx. 90 caracteres)", placeholder: "Ex: 15% de desconto na mão de obra para condôminos / associados", maxLength: 90 }
            ]
          }
        ]
      },

      // BLOCO 09
      {
        stepNumber: 9,
        id: "bloco_09_catalogo_prestador",
        title: "BLOCO 09: PRINCIPAIS SERVIÇOS EM DESTAQUE (1 A 5 CARROS-CHEFES)",
        subtitle: "Os 5 serviços mais executados pela sua empresa.",
        fields: [
          {
            id: "catalogo_destaque",
            label: "Catálogo de Serviços Principais (Limite de 5) *",
            type: "repeater",
            minItems: 1,
            maxItems: 5,
            addButtonText: "+ Adicionar Serviço ao Catálogo",
            schemaProp: "hasOfferCatalog",
            tooltip: "Cadastre os 5 serviços que você mais realiza. A IA usa esses nomes exatos para sugerir você quando o cliente perguntar o preço médio ou quem faz esse serviço.",
            subfields: [
              { id: "item_nome", label: "Nome do Serviço Principal *", placeholder: "Ex: Instalação de Chuveiro Elétrico e Troca de Fiação 220V ou Pintura Completa de Apartamento com Tinta Lavável", required: true },
              { id: "item_descricao", label: "Breve Descrição do Serviço (O que está incluso, cuidados e tempo médio) *", placeholder: "Ex: Serviço completo com conectores de porcelana, teste de carga e limpeza do local", maxLength: 140, required: true },
              { id: "item_preco", label: "Preço de Venda / Ponto de Partida em Reais (R$) (Opcional)", placeholder: "Ex: A partir de R$ 120,00" }
            ]
          }
        ]
      },

      // BLOCO 10
      {
        stepNumber: 10,
        id: "bloco_10_ecossistema_prestador",
        title: "BLOCO 10: CANAIS DIGITAIS & PROVA SOCIAL",
        subtitle: "A etapa final onde o usuário busca os links na internet, sem quebrar o fluxo anterior.",
        fields: [
          {
            id: "status_site_oficial",
            label: "1. Site ou Cartão Virtual do Profissional *",
            type: "radio_cards",
            defaultVal: "nao_possui",
            options: [
              { val: "possui_ativo", text: "Já possuo Site Oficial / Cartão Digital ativo (abre campo para colar o link)" },
              { val: "em_ativacao", text: "Domínio em processo de ativação (será publicado na etapa seguinte do app)" },
              { val: "nao_possui", text: "Não possuo presença web própria (Omitir)" }
            ],
            tooltip: "Presença web própria do prestador."
          },
          {
            id: "url_site_oficial",
            label: "Link do Site Oficial ou Nome Pretendido",
            type: "url",
            conditionField: "status_site_oficial",
            conditionNotVal: "nao_possui",
            schemaProp: "url",
            placeholder: "Ex: https://www.joaoeletricista.com.br",
            tooltip: "URL principal do profissional."
          },
          {
            id: "link_google_maps",
            label: "Perfil do Negócio no Google Maps / Avaliações (Crucial para rankeamento nas IAs)",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            schemaProp: "hasMap",
            placeholder: "Ex: https://maps.google.com/...",
            tooltip: "Link das avaliações reais no Google."
          },
          {
            id: "link_instagram",
            label: "Instagram Profissional com Fotos de Obras e Serviços",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: https://instagram.com/joao.eletricista",
            tooltip: "Portfólio de fotos e vídeos no Instagram."
          },
          {
            id: "link_facebook",
            label: "Página Comercial no Facebook",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: https://facebook.com/joaosilvaobras",
            tooltip: "Página oficial no Facebook."
          },
          {
            id: "link_youtube",
            label: "Canal do YouTube com Vídeos de Demonstração e Dicas",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: https://youtube.com/@joaoeletrica",
            tooltip: "Canal de vídeos no YouTube."
          },
          {
            id: "link_linkedin",
            label: "Perfil Profissional no LinkedIn",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: https://linkedin.com/in/joaosilva",
            tooltip: "Perfil no LinkedIn."
          },
          {
            id: "link_apps_servicos",
            label: "Perfil em Aplicativos de Serviços (GetNinjas, Habitissimo, Triider, OLX)",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: https://getninjas.com.br/...",
            tooltip: "Link de perfil em plataformas de serviços."
          },
          {
            id: "links_extras_sameas",
            label: "3. Adicionar Outros Canais Digitais (TikTok profissional, matérias de jornal, página de sindicato, etc.)",
            type: "repeater_simple",
            maxItems: 5,
            addButtonText: "+ Adicionar Mais Plataformas",
            placeholder: "Ex: https://tiktok.com/@...",
            tooltip: "Botão dinâmico para colar outros links de autoridade."
          }
        ]
      },

      // BLOCO 11 (MÓDULO AVATAR)
      {
        stepNumber: 11,
        id: "bloco_11_avatar_prestador",
        title: "BLOCO 11: MÓDULO AVATAR - O PERFIL DO CONTRATANTE & TOMADOR DE SERVIÇOS",
        subtitle: "Psicologia do contratante para calibrar a IA, o Construtor de Site (App 1B) e os Anúncios (App 3).",
        infoBanner: "Psicologia do Contratante de Serviços: Quem contrata um prestador geralmente está com um problema urgente, dor de cabeça ou medo de ser enganado. Definir seu cliente ideal ajuda a IA a conectar você a contratantes alinhados com o seu padrão de qualidade e preço.",
        fields: [
          {
            id: "avatar_perfil_contratante",
            label: "1. Quem é o Tomador de Decisão do Serviço? (Perfil Principal do Contratante)",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Donos de Casas / Apartamentos Próprios", text: "Donos de Casas / Apartamentos Próprios (Exigem cuidado com acabamento e bens da residência)" },
              { val: "Inquilinos / Locatários", text: "Inquilinos / Locatários (Buscam reparos rápidos e econômicos para entrega de imóvel)" },
              { val: "Síndicos e Zeladores de Condomínio", text: "Síndicos e Zeladores de Condomínio (Exigem nota fiscal, contratos e cumprimento de normas)" },
              { val: "Gerentes de Lojas, Empresas e Escritórios", text: "Gerentes de Lojas, Empresas e Escritórios (Precisam de serviços fora do horário comercial)" }
            ],
            allowOther: true,
            otherLabel: "Outro perfil contratante (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Produtores rurais e gestores de fazendas e maquinários pesados",
            otherMaxLength: 90,
            tooltip: "Perfil de quem solicita e paga pelo serviço."
          },
          {
            id: "avatar_padrao_compra",
            label: "2. Nível de Consciência & Padrão de Compra: Qual é o comportamento desse cliente em relação a preços?",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Busca Alta Confiança", text: "Busca Alta Confiança: Prefere pagar mais por um profissional que não dê dor de cabeça e resolva de primeira." },
              { val: "Busca Economia", text: "Busca Economia: Pesquisa múltiplos orçamentos e prioriza o menor preço por hora/diária." },
              { val: "Focado em Emergência", text: "Focado em Emergência: Precisa de solução imediata, priorizando quem atende mais rápido independente do valor." }
            ],
            allowOther: true,
            otherLabel: "Outro padrão de compra (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Contrata por medição técnica e pagamento faturado por etapas de obra",
            otherMaxLength: 90,
            tooltip: "Comportamento financeiro do contratante."
          },
          {
            id: "avatar_maior_medo",
            label: "3. O Maior Medo ou Trauma do Cliente com Outros Prestadores: O que mais traumatiza o seu cliente quando ele contrata terceiros?",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Profissional que não cumpre prazos, some no meio da obra ou vive atrasado", text: "Profissional que não cumpre prazos, some no meio da obra ou vive atrasado" },
              { val: "Sujeira excessiva, desperdício de materiais e falta de cuidado com a casa", text: "Sujeira excessiva, desperdício de materiais e falta de cuidado com a casa" },
              { val: "Falta de transparência no orçamento", text: "Falta de transparência no orçamento (cobrar valores extras no final do serviço)" },
              { val: "Medo de colocar pessoas desconhecidas e sem identificação dentro do lar", text: "Medo de colocar pessoas desconhecidas e sem identificação dentro do lar da família" }
            ],
            allowOther: true,
            otherLabel: "Outro trauma frequente (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Serviço mal feito que quebra peças caras e gera retrabalho",
            otherMaxLength: 90,
            tooltip: "Medos que o seu profissionalismo neutraliza."
          },
          {
            id: "avatar_canal_comunicacao",
            label: "4. Canal e Estilo de Comunicação Preferido do Cliente: Como esse cliente gosta de receber orçamentos e atualizações?",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "WhatsApp com fotos, vídeos explicativos e áudios claros", text: "WhatsApp com fotos, vídeos explicativos e áudios claros" },
              { val: "Visita presencial para conversar olhando no olho", text: "Visita presencial para conversar olhando no olho e tirar dúvidas no local" },
              { val: "Proposta técnica formal em PDF", text: "Proposta técnica formal em PDF com discriminação clara de materiais e etapas" }
            ],
            allowOther: true,
            otherLabel: "Outro canal de comunicação (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Contato direto por telefone fixo com a secretária da empresa",
            otherMaxLength: 90,
            tooltip: "Forma preferida de alinhamento comercial."
          },
          {
            id: "avatar_raiox_livre",
            label: "5. Raio-X Livre do Contratante Ideal (Campo Aberto Opcional)",
            type: "textarea",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir Raio-X Livre",
            maxLength: 300,
            placeholder: "Ex: Famílias de classe média que reformam suas casas e buscam um profissional que trabalhe limpo, uniformizado e passe a tranquilidade de entrar na casa sem preocupações.",
            tooltip: "Visão aberta em até 300 caracteres sobre o contratante ideal."
          }
        ]
      }
    ]
  },

  // ==========================================================================
  // PERFIL 03: PROFISSIONAL LIBERAL REGULAMENTADO (11 BLOCOS)
  // ==========================================================================
  profissional_liberal: {
    id: "profissional_liberal",
    storageKey: "geo_engine_liberal_professional",
    badgeIcon: "⚖️",
    badgeText: "Profissional Liberal",
    cardTitle: "Profissional Liberal Regulamentado",
    cardDescription: "Saúde, Direito, Engenharia, Arquitetura, Gestão, Contabilidade, Educação Física, Psicologia, Fisioterapia e áreas regulamentadas por Conselho.",
    defaultSchemaType: "ProfessionalService",
    submitButtonText: "Gerar & Validar Perfil Liberal para IA →",

    steps: [
      // BLOCO 01
      {
        stepNumber: 1,
        id: "bloco_01_identidade_liberal",
        title: "BLOCO 01: IDENTIDADE PROFISSIONAL & MARCA PESSOAL",
        subtitle: "Apresentação formal da autoridade física e jurídica vinculada, sem atrelar a gerências passageiras.",
        fields: [
          {
            id: "titulacao_formal",
            label: "1. Titulação Formal e Pronome de Tratamento *",
            type: "select_with_other",
            required: true,
            schemaProp: "honorificPrefix",
            tooltip: "Como o profissional é formalmente anunciado, registrado e procurado em buscas de autoridade.",
            options: [
              { val: "Dr.", text: "Dr." },
              { val: "Dra.", text: "Dra." },
              { val: "Prof. Me.", text: "Prof. Me." },
              { val: "Prof. Dr.", text: "Prof. Dr." },
              { val: "Esp.", text: "Esp. (Especialista)" },
              { val: "Sem titulação formal", text: "Sem titulação formal (Apenas Nome)" },
              { val: "OTHER", text: "Outra titulação formal (Especificar)" }
            ],
            otherLabel: "Digite a titulação (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Eng., Arq., Perito Judicial",
            otherMaxLength: 90
          },
          {
            id: "nome_profissional",
            label: "2. Nome Completo do Profissional *",
            type: "text",
            required: true,
            schemaProp: "name",
            placeholder: "Ex: Dr. Carlos Eduardo Mendonça ou Juliana Martins - Personal Trainer",
            tooltip: "O nome civil da pessoa física que detém a responsabilidade técnica e o registro perante o conselho de classe."
          },
          {
            id: "nome_clinica_escritorio",
            label: "3. Nome da Empresa / Clínica / Consultório / Escritório / Studio",
            type: "text",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir / Atua exclusivamente com o Nome Próprio",
            schemaProp: "alternateName",
            placeholder: "Ex: Clínica Mendonça Odontologia, Studio Fit Saúde & Performance, Advocacia Tributária Martins",
            tooltip: "Nome fantasia do espaço físico, academia, laboratório ou razão social da PJ onde os atendimentos ocorrem."
          },
          {
            id: "documento_fiscal_liberal",
            label: "4. CNPJ da Empresa ou CPF / Carnê-Leão",
            type: "text",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir dado fiscal do código público",
            schemaProp: "taxID",
            placeholder: "00.000.000/0000-00 ou 000.000.000-00",
            tooltip: "Segurança e Privacidade: Este dado fiscal (CNPJ ou CPF) não fica visível em texto aberto para quem lê a página. Ele é injetado exclusivamente no código semântico interno da página (JSON-LD), servindo apenas para que os robôs e as inteligências artificiais validem a existência legal do seu registro profissional."
          },
          {
            id: "whatsapp_principal",
            label: "5.1 WhatsApp Comercial Principal para Agendamentos *",
            type: "phone",
            required: true,
            defaultPrefix: "+55 ",
            schemaProp: "telephone",
            placeholder: "Ex: +55 16 99999-7777",
            tooltip: "Canal prioritário para contato direto de pacientes, clientes ou escritórios parceiros."
          },
          {
            id: "telefone_fixo",
            label: "5.2 Telefone Fixo / Recepção",
            type: "phone",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: +55 16 3382-1234",
            tooltip: "Telefone fixo opcional da recepção ou secretaria."
          },
          {
            id: "telegram_comercial",
            label: "5.3 Telegram de Atendimento",
            type: "text",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: @atendimento_doutor",
            tooltip: "Usuário ou link direto no Telegram."
          },
          {
            id: "email_comercial",
            label: "5.4 E-mail Institucional Oficial *",
            type: "email",
            required: true,
            schemaProp: "email",
            placeholder: "Ex: contato@drmendonca.com.br",
            tooltip: "Campo obrigatório para envio de laudos, propostas e notificações."
          },
          {
            id: "ano_fundacao",
            label: "6. Tempo de Atuação Profissional / Anos de Experiência Prática *",
            type: "select",
            required: true,
            schemaProp: "foundingDate",
            options: generateYearsList(100, "Mais de 100 anos (Tradição/Escritório Familiar secular)"),
            tooltip: "Demonstra para a inteligência artificial a sua bagagem consolidada no mercado, transmitindo segurança para quem vai contratar."
          },
          {
            id: "descricao_otimizada",
            label: "7. Apresentação Técnica Descritiva para os Motores de IA *",
            type: "textarea",
            required: true,
            minLength: 150,
            maxLength: 350,
            schemaProp: "description",
            placeholder: "Psicóloga clínica (CRP/SP) especialista em Terapia Cognitivo-Comportamental (TCC) e Avaliação Neuropsicológica para crianças e adolescentes com TDAH. Atendimento com metodologia individualizada, acolhimento humanizado e emissão de recibo para reembolso.",
            tooltip: "Texto corrido que resume suas principais soluções, metodologia, público-alvo e credenciais. As IAs utilizam esse parágrafo como base para responder perguntas sobre a sua especialidade."
          }
        ]
      },

      // BLOCO 02
      {
        stepNumber: 2,
        id: "bloco_02_conselho_formacao",
        title: "BLOCO 02: REGULAMENTAÇÃO, CONSELHO DE CLASSE & FORMAÇÃO TÉCNICA/ACADÊMICA",
        subtitle: "A barreira de segurança que comprova a habilitação legal do profissional para os motores de resposta.",
        fields: [
          {
            id: "conselho_classe",
            label: "1. Conselho de Classe Profissional *",
            type: "select_with_other",
            required: true,
            schemaProp: "@type",
            tooltip: "Identifica o órgão de classe oficial regulador da profissão.",
            options: [
              { val: "Physician", text: "CRM (Medicina)" },
              { val: "Dentist", text: "CRO (Odontologia)" },
              { val: "LegalService", text: "OAB (Advocacia)" },
              { val: "ProfessionalService_CREA_CAU", text: "CREA / CAU (Engenharia / Agronomia / Arquitetura)" },
              { val: "MedicalBusiness_CRP", text: "CRP (Psicologia)" },
              { val: "HealthAndBeautyBusiness_CREF", text: "CREF (Educação Física)" },
              { val: "MedicalBusiness_CREFITO", text: "CREFITO (Fisioterapia & Terapia Ocupacional)" },
              { val: "MedicalBusiness_CRN", text: "CRN (Nutrição)" },
              { val: "AccountingService", text: "CRC (Contabilidade)" },
              { val: "MedicalBusiness_CRFa", text: "CRFa (Fonoaudiologia)" },
              { val: "MedicalBusiness_COREN", text: "COREN (Enfermagem)" },
              { val: "VeterinaryCare", text: "CRMV (Medicina Veterinária)" },
              { val: "OTHER", text: "Outro Conselho Profissional Regulamentado" }
            ],
            otherLabel: "Especifique a sigla e nome do conselho regulamentador *",
            otherPlaceholder: "Ex: CRF (Conselho Regional de Farmácia)",
            otherMaxLength: 90
          },
          {
            id: "numero_registro_conselho",
            label: "2. Número de Inscrição no Registro + UF do Conselho *",
            type: "text",
            required: true,
            schemaProp: "identifier",
            placeholder: "Ex: CRM/SP 123456, OAB/MG 98765, CREF 012345-G/SP, CREA/SP 5061234567",
            tooltip: "O número público da sua carteira profissional que valida a legalidade e regularidade do exercício da sua função."
          },
          {
            id: "possui_rqe_especialidade",
            label: "3. Especialização Titulada / RQE / Título de Especialista Formal",
            type: "tri_state_with_input",
            defaultVal: "Omitir",
            inputLabel: "Título Formal da Especialidade (Máx. 90 caracteres)",
            inputPlaceholder: "Ex: Cardiologia Clínica (RQE 45892), Direito Tributário e Sucessório, Fisioterapia Traumato-Ortopédica Domiciliar",
            maxLength: 90,
            schemaProp: "knowsAbout",
            tooltip: "RQE (Registro de Qualificação de Especialista), especializações registradas em conselho ou títulos de sociedade comprovam que você não é apenas um generalista, elevando a relevância nas buscas especializadas da IA."
          },
          {
            id: "graduacao_academica",
            label: "4.1 Faculdade / Escola Técnica / Universidade de Graduação *",
            type: "text",
            required: true,
            schemaProp: "alumniOf",
            placeholder: "Ex: Universidade de São Paulo (USP) - Conclusão em 2012",
            tooltip: "Formação acadêmica principal."
          },
          {
            id: "pos_graduacao_mestrado",
            label: "4.2 Pós-Graduação / Mestrado / Doutorado / Residência",
            type: "text",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir",
            maxLength: 120,
            placeholder: "Ex: Mestrado em Ciências da Saúde pela UNICAMP - Conclusão em 2018",
            tooltip: "Titulações de pós-graduação stricto ou lato sensu."
          },
          {
            id: "atuacao_institucional_relevante",
            label: "4.3 Experiência Institucional Relevante / Atuação Atual (Máx. 120 caracteres)",
            type: "text",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir",
            maxLength: 120,
            placeholder: "Ex: Médico Socorrista no SAMU 192, Perito Judicial do Tribunal de Justiça, Ex-estagiário do Tribunal Regional Eleitoral",
            tooltip: "Citações institucionais de peso funcionam como ganchos de autoridade suprema quando a IA avalia a confiabilidade da sua carreira."
          }
        ]
      },

      // BLOCO 03
      {
        stepNumber: 3,
        id: "bloco_03_modalidade_localizacao_liberal",
        title: "BLOCO 03: MODALIDADE DE ATENDIMENTO & LOCALIZAÇÃO GEOGRÁFICA",
        subtitle: "Resolução semântica para conciliar consultórios físicos, atendimento domiciliar/remoto e rotinas híbridas.",
        fields: [
          {
            id: "modalidade_principal_liberal",
            label: "Forma Principal de Atendimento *",
            type: "radio_cards",
            required: true,
            defaultVal: "Fisico",
            tooltip: "Condiciona a exibição do Painel da Sede Física, do Painel de Cobertura Externa ou de ambos (separados em Parte A e Parte B).",
            options: [
              { val: "Fisico", text: "Opção A: Predominantemente Atendimento em Espaço Físico Próprio / Consultório / Escritório" },
              { val: "Remoto_Domiciliar", text: "Opção B: Predominantemente Remoto / Domiciliar / Home Office / No Endereço do Cliente" },
              { val: "Hibrido", text: "Opção C: Modelo Híbrido (Consultório Próprio + Atendimento Domiciliar / Remoto)" }
            ]
          },

          // PARTE A: PAINEL DE LOCALIZAÇÃO DA SEDE FÍSICA
          {
            id: "painel_sede_fisica_header",
            label: "🏛️ PARTE A: O SEU ESPAÇO FÍSICO / SEDE COMERCIAL",
            type: "section_divider",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Fisico", "Hibrido"]
          },
          {
            id: "cep",
            label: "CEP da Sede *",
            type: "cep",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Fisico", "Hibrido"],
            checkboxAddon: { id: "endereco_rural", label: "Endereço Rural / Caixa Postal Rodoviária" },
            schemaProp: "postalCode",
            placeholder: "00000-000",
            tooltip: "CEP do consultório ou escritório físico."
          },
          {
            id: "logradouro",
            label: "Logradouro (Nome da Rua / Avenida / Rodovia) *",
            type: "text",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Fisico", "Hibrido"],
            schemaProp: "streetAddress",
            placeholder: "Ex: Avenida Sete de Setembro",
            tooltip: "Logradouro da sede física."
          },
          {
            id: "numero_imovel",
            label: "Número Oficial *",
            type: "text",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Fisico", "Hibrido"],
            checkboxAddon: { id: "sem_numero", label: "S/N (Sem número)" },
            placeholder: "Ex: 890",
            tooltip: "Número do imóvel ou edifício."
          },
          {
            id: "complemento_complexo",
            label: "Detalhamento do Imóvel (Edifício, Torre e Sala)",
            type: "group_row",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Fisico", "Hibrido"],
            allowOmit: true,
            omitLabel: "Omitir",
            tooltip: "Identificação de edifício comercial ou clínico.",
            subfields: [
              { id: "edificio_galeria", label: "Edifício / Centro Médico / Galeria", placeholder: "Ex: Edifício Prime Offices" },
              { id: "bloco_torre", label: "Bloco / Torre / Quarteirão", placeholder: "Ex: Torre Sul" },
              { id: "sala_loja", label: "Número da Sala / Andar", placeholder: "Ex: Sala 402 - 4º Andar" }
            ]
          },
          {
            id: "ponto_referencia",
            label: "Ponto de Referência / Sentido da Pista",
            type: "text",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Fisico", "Hibrido"],
            allowOmit: true,
            omitLabel: "Omitir",
            maxLength: 150,
            placeholder: "Ex: Em frente ao Fórum Central, ao lado do Hospital Regional",
            tooltip: "Referência de localização da sede."
          },
          {
            id: "bairro",
            label: "Bairro *",
            type: "text",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Fisico", "Hibrido"],
            schemaProp: "addressNeighborhood",
            placeholder: "Ex: Centro",
            tooltip: "Bairro da sede."
          },
          {
            id: "macro_regiao",
            label: "Macro-Região / Zona (Opcional)",
            type: "select_with_other",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Fisico", "Hibrido"],
            allowOmit: true,
            omitLabel: "Omitir",
            tooltip: "Zona geográfica da sede.",
            options: [
              { val: "Centro", text: "Centro" },
              { val: "Zona Sul", text: "Zona Sul" },
              { val: "Zona Norte", text: "Zona Norte" },
              { val: "Região Leste", text: "Região Leste" },
              { val: "Região Oeste", text: "Região Oeste" },
              { val: "OTHER", text: "Outra Região (Especificar)" }
            ],
            otherLabel: "Especifique a região (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Polo Médico Hospitalar",
            otherMaxLength: 90
          },
          {
            id: "cidade",
            label: "Cidade *",
            type: "text",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Fisico", "Hibrido"],
            schemaProp: "addressLocality",
            placeholder: "Ex: Matão",
            tooltip: "Cidade da sede física."
          },
          {
            id: "estado_uf",
            label: "Estado (UF) *",
            type: "select",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Fisico", "Hibrido"],
            schemaProp: "addressRegion",
            options: BRAZIL_STATES,
            tooltip: "Dropdown travado com as 27 UFs."
          },
          {
            id: "geolocalizacao",
            label: "Geolocalização (Latitude e Longitude)",
            type: "geo_coordinates",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Fisico", "Hibrido"],
            allowOmit: true,
            omitLabel: "Omitir",
            latPlaceholder: "Ex: -21.6033",
            lngPlaceholder: "Ex: -48.3658",
            helpTitle: "Tutorial rápido: Como copiar a Latitude e Longitude no Google Maps em 10 segundos",
            helpSteps: "Clique com o botão direito sobre o pino do seu consultório/escritório no Google Maps, copie as coordenadas numéricas exibidas no topo e cole nos campos acima.",
            tooltip: "Coordenadas exatas da sede física."
          },
          {
            id: "alvara_municipal",
            label: "Licenças da Sede: Alvará de Funcionamento Municipal",
            type: "tri_state_with_input",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Fisico", "Hibrido"],
            defaultVal: "Omitir",
            inputLabel: "Número do Alvará (Opcional)",
            inputPlaceholder: "Opcional",
            tooltip: "Regularidade municipal da sede."
          },
          {
            id: "licenca_sanitaria",
            label: "Licenças da Sede: Licença Sanitária da Vigilância",
            type: "tri_state_with_input",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Fisico", "Hibrido"],
            defaultVal: "Omitir",
            inputLabel: "Número da Licença Sanitária (Opcional)",
            inputPlaceholder: "Opcional",
            tooltip: "Licença sanitária do consultório ou clínica."
          },
          {
            id: "avcb_bombeiros",
            label: "Licenças da Sede: Auto de Vistoria do Corpo de Bombeiros (AVCB)",
            type: "tri_state",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Fisico", "Hibrido"],
            defaultVal: "Omitir",
            tooltip: "Conformidade do edifício/clínica com o Corpo de Bombeiros."
          },

          // PARTE B: PAINEL DE COBERTURA EXTERNA & DESLOCAMENTO
          {
            id: "painel_operacao_remota_header",
            label: "🚗 PARTE B: SUA OPERAÇÃO EXTERNA / DOMICILIAR / REMOTA",
            type: "section_divider",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Remoto_Domiciliar", "Hibrido"]
          },
          {
            id: "cep_epicentro",
            label: "CEP da Sua Base de Saída / Epicentro Operacional *",
            type: "cep",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Remoto_Domiciliar", "Hibrido"],
            placeholder: "Ex: 15990-000",
            tooltip: "Protege a residência do profissional, servindo apenas de ponto de partida para o cálculo da IA."
          },
          {
            id: "estado_uf_externo",
            label: "Estado Principal de Atuação Externa (UF) *",
            type: "select",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Remoto_Domiciliar", "Hibrido"],
            options: BRAZIL_STATES,
            tooltip: "Dropdown travado com as 27 UFs."
          },
          {
            id: "raio_deslocamento",
            label: "Raio Máximo de Deslocamento a partir da Base (CEP) *",
            type: "select_with_other",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Remoto_Domiciliar", "Hibrido"],
            schemaProp: "geoRadius",
            tooltip: "Alcance geográfico de deslocamento.",
            options: [
              { val: "Até 15 km", text: "Até 15 km (Apenas o próprio município e bairros vizinhos)" },
              { val: "Até 30 km", text: "Até 30 km (Microrregião / Cidades vizinhas próximas)" },
              { val: "Até 60 km", text: "Até 60 km (Região metropolitana completa)" },
              { val: "Até 100 km", text: "Até 100 km (Atendimento regional amplo)" },
              { val: "Acima de 100 km / Todo o Estado", text: "Acima de 100 km / Todo o Estado" },
              { val: "Cobertura em Todo o Território Nacional", text: "Cobertura em Todo o Território Nacional (Perícias, grandes obras ou auditorias)" },
              { val: "OTHER", text: "Outra condição de deslocamento (Especificar)" }
            ],
            otherLabel: "Descreva a condição de deslocamento (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Atendimento domiciliar em Matão e online para todo o país",
            otherMaxLength: 90
          },
          {
            id: "cidades_atendidas",
            label: "Cidades e Bairros Atendidos (Lista por Nome) *",
            type: "textarea_short",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Remoto_Domiciliar", "Hibrido"],
            schemaProp: "areaServed",
            placeholder: "Ex: Matão, Araraquara, São Carlos, Taquaritinga e Ribeirão Preto",
            tooltip: "Lista nominal de municípios atendidos."
          },
          {
            id: "realiza_teleatendimento_online",
            label: "Atendimento Online / Telemedicina / Sessões Remotas Regulamentadas:",
            type: "select_with_other",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Remoto_Domiciliar", "Hibrido"],
            defaultVal: "Sim",
            tooltip: "Informa se realiza consultas ou sessões online.",
            options: [
              { val: "Sim", text: "Sim - Realiza Consultas / Sessões Online via Plataforma Segura" },
              { val: "Não", text: "Não - Atendimentos exclusivamente presenciais" },
              { val: "Omitir", text: "Omitir" },
              { val: "OTHER", text: "Outra modalidade online (Especificar)" }
            ],
            otherLabel: "Especifique em uma frase (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Acompanhamento híbrido por aplicativo próprio de treinos e vídeo",
            otherMaxLength: 90
          }
        ]
      },

      // BLOCO 04
      {
        stepNumber: 4,
        id: "bloco_04_horarios_urgencia_liberal",
        title: "BLOCO 04: HORÁRIOS, FORMATO DE ATENDIMENTO & REGIME DE URGÊNCIA",
        subtitle: "Estilo de sessão, grade de horários semanal e sobreaviso técnico nivelado.",
        fields: [
          {
            id: "formato_predominante_sessao",
            label: "1. Estilo / Formato Predominante do Atendimento *",
            type: "checkbox_group",
            required: true,
            options: [
              { val: "Consultas / Sessões Individuais com Hora Marcada", text: "Consultas / Sessões Individuais com Hora Marcada" },
              { val: "Atendimento em Grupo / Workshops / Treinamentos Coletivos", text: "Atendimento em Grupo / Workshops / Treinamentos Coletivos" },
              { val: "Atendimento por Ordem de Chegada (Sem hora marcada)", text: "Atendimento por Ordem de Chegada (Sem hora marcada)" },
              { val: "Atendimento em Espaços de Terceiros", text: "Atendimento em Espaços de Terceiros (Academias, Hospitais, Parques, Canteiros de Obra)" },
              { val: "Atuação Externa Institucional", text: "Atuação Externa Institucional (Audiências Judiciais, Delegacias, Cartórios, Repartições)" }
            ],
            allowOther: true,
            otherLabel: "Outro formato de atendimento (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Consultoria mensal in-company nas sedes das empresas clientes",
            otherMaxLength: 90,
            tooltip: "Caixas de seleção rápida para contemplar todas as categorias profissionais."
          },
          {
            id: "grade_horarios",
            label: "2. Horários Semanais Regulares de Agenda (Segunda a Domingo) *",
            type: "opening_hours_grid",
            allowCopyMondayToFriday: true,
            copyButtonText: "Copiar horário de Segunda para Sexta-feira",
            tooltip: "Seleção dia a dia de horários de atendimento."
          },
          {
            id: "atende_urgencia_liberal",
            label: "3. Atendimento em Situações de Urgência / Sobreaviso Técnico:",
            type: "tri_state",
            defaultVal: "Omitir",
            tooltip: "Se marcado Sim, abre as opções de público e forma de acionamento de urgência."
          },
          {
            id: "publico_urgencia_liberal",
            label: "3.1 Para quem o atendimento de urgência é disponibilizado?",
            type: "select_with_other",
            conditionField: "atende_urgencia_liberal",
            conditionVal: "Sim",
            tooltip: "Distingue entre urgências da carteira ativa e novos chamados emergenciais.",
            options: [
              { val: "Exclusivo Carteira Ativa", text: "Exclusivo para clientes/pacientes já em acompanhamento ativo (Ex: pós-operatório, suporte em processos judiciais em andamento com prazo fatal, projetos de obra em execução)" },
              { val: "Disponível para Novos Clientes", text: "Disponível para novos clientes (Atendimento imediato para novos casos de urgência, plantão judicial de custódia, perícias emergenciais, enfermagem domiciliar rápida)" },
              { val: "Disponível para Ambos os Públicos", text: "Disponível para ambos os públicos (Carteira ativa e novos chamados)" },
              { val: "OTHER", text: "Outra regra de público de urgência (Especificar)" }
            ],
            otherLabel: "Especifique em uma frase (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Sobreaviso exclusivo para hospitais e clínicas conveniadas",
            otherMaxLength: 90
          },
          {
            id: "acionamento_urgencia_liberal",
            label: "3.2 Como funciona o acionamento de urgência?",
            type: "text",
            conditionField: "atende_urgencia_liberal",
            conditionVal: "Sim",
            maxLength: 120,
            placeholder: "Ex: Plantão via WhatsApp de urgência para suporte a prazos fatais ou intercorrências técnicas de pacientes em tratamento.",
            tooltip: "Explicação clara de como acionar o sobreaviso."
          },
          {
            id: "operacao_feriados",
            label: "4. Atendimento em Feriados:",
            type: "select_with_other",
            defaultVal: "Omitir",
            tooltip: "Regime de funcionamento em feriados.",
            options: [
              { val: "Omitir", text: "Omitir" },
              { val: "Atende em todos os feriados", text: "Atende em todos os feriados" },
              { val: "Fechado em todos os feriados", text: "Fechado em todos os feriados" },
              { val: "Atendimento especial em feriados selecionados", text: "Atendimento especial em feriados selecionados" },
              { val: "OTHER", text: "Outra condição em feriados (Especificar)" }
            ],
            otherLabel: "Descreva em uma frase (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Plantão de sobreaviso para intercorrências",
            otherMaxLength: 90
          },
          {
            id: "feriados_especificos",
            label: "Selecione os feriados com atendimento especial:",
            type: "checkbox_group",
            conditionField: "operacao_feriados",
            conditionVal: "Atendimento especial em feriados selecionados",
            options: [
              { val: "Carnaval", text: "Carnaval" },
              { val: "Páscoa", text: "Páscoa" },
              { val: "Feriados Cívicos / Nacionais", text: "Feriados Cívicos / Nacionais" },
              { val: "Aniversário da Cidade", text: "Aniversário da Cidade" },
              { val: "Natal e Ano Novo", text: "Natal e Ano Novo" }
            ],
            tooltip: "Feriados selecionados."
          }
        ]
      },

      // BLOCO 05
      {
        stepNumber: 5,
        id: "bloco_05_convenios_honorarios_liberal",
        title: "BLOCO 05: CONVÊNIOS, HONORÁRIOS, AGENDAMENTOS & REEMBOLSO",
        subtitle: "Planos aceitos, recibo para reembolso e ética de honorários.",
        fields: [
          {
            id: "atende_planos_convenios",
            label: "1. Atende por Planos de Saúde, Seguradoras ou Convênios Corporativos?",
            type: "tri_state_with_input",
            defaultVal: "Omitir",
            inputLabel: "Cite os nomes dos principais convênios aceitos (Máx. 120 caracteres)",
            inputPlaceholder: "Ex: Unimed, Bradesco Saúde, Amil, SulAmérica, OAB Saúde, Sindicatos Conveniados",
            maxLength: 120,
            tooltip: "Informe os convênios ou marque Não caso atenda exclusivamente particular."
          },
          {
            id: "emite_recibo_reembolso",
            label: "2. Fornece Recibo / Nota Fiscal detalhada com código de procedimento para o cliente pedir Reembolso ao Plano ou Seguro?",
            type: "tri_state",
            defaultVal: "Sim",
            tooltip: "Fator de extrema busca na IA por clientes particulares: 'psicólogo/fisioterapeuta que fornece recibo detalhado para reembolso'."
          },
          {
            id: "retorno_incluso",
            label: "3. A Primeira Avaliação / Consulta inclui direito a Retorno sem custo adicional?",
            type: "tri_state",
            defaultVal: "Omitir",
            tooltip: "Política de retorno da consulta ou avaliação inicial."
          },
          {
            id: "faixa_precos_reais",
            label: "4. Honorários Médios / Valores de Referência (R$)",
            type: "price_range_group",
            allowOmit: true,
            omitLabel: "Omitir valores (Conformidade Ética do Conselho)",
            tooltip: "Conformidade Ética: Determinados conselhos de classe (como OAB, CRM, CRO) impõem restrições rígidas quanto à divulgação pública de preços e honorários. Caso o código de ética da sua profissão não permita divulgar valores ou seus serviços dependam de avaliação prévia personalizada, clique em [Omitir]. O robô removerá essa chave sem penalizar sua autoridade.",
            subfields: [
              { id: "menor_preco", label: "Valor de Consulta Inicial / Sessão de Avaliação (R$)", placeholder: "Ex: 250,00" },
              { id: "maior_preco", label: "Valor de Tratamentos / Projetos Complexos (R$)", placeholder: "Ex: 3.500,00" },
              { id: "ticket_medio", label: "Ticket Médio Habitual por Procedimento (R$)", placeholder: "Ex: 450,00" }
            ]
          },
          {
            id: "formas_pagamento",
            label: "5.1 Meios de Pagamento Aceitos",
            type: "checkbox_group",
            schemaProp: "paymentAccepted",
            options: [
              { val: "Pix", text: "Pix" },
              { val: "Dinheiro em Espécie", text: "Dinheiro em Espécie" },
              { val: "Cartão de Débito", text: "Cartão de Débito" },
              { val: "Boleto Bancário", text: "Boleto Bancário" },
              { val: "Cartão de Crédito", text: "Cartão de Crédito" }
            ],
            allowOther: true,
            otherLabel: "Outro meio de pagamento (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Transferência TED ou Faturamento PJ",
            otherMaxLength: 90,
            tooltip: "Meios de pagamento disponíveis."
          },
          {
            id: "parcelamento_cartao",
            label: "5.2 Parcelamento no Cartão de Crédito",
            type: "installment_group",
            conditionField: "formas_pagamento",
            conditionContains: "Cartão de Crédito",
            tooltip: "Opções de parcelamento no cartão.",
            maxInstallmentsOptions: [
              { val: "Até 3x", text: "Até 3x" },
              { val: "Até 6x", text: "Até 6x" },
              { val: "Até 10x", text: "Até 10x" },
              { val: "Até 12x", text: "Até 12x" }
            ],
            interestOptions: [
              { val: "Sem juros", text: "Sem juros" },
              { val: "Com juros da operadora", text: "Com juros da operadora" },
              { val: "Parcialmente sem juros", text: "Parcialmente sem juros" }
            ]
          },
          {
            id: "parcelamento_proprio",
            label: "5.3 Outras Facilidades Próprias de Contratação",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Planos por Assinatura Mensal", text: "Planos por Assinatura Mensal (Personal Trainer, Acompanhamento Terapêutico, Contabilidade)" },
              { val: "Honorários Vinculados ao Êxito da Causa", text: "Honorários Vinculados ao Êxito da Causa (Advocacia)" },
              { val: "Pagamento Parcelado por Medições / Etapas de Projeto", text: "Pagamento Parcelado por Medições / Etapas de Projeto (Engenharia e Arquitetura)" }
            ],
            allowOther: true,
            otherLabel: "Outra facilidade contratual (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Pacotes trimestrais e semestrais com desconto progressivo",
            otherMaxLength: 90,
            tooltip: "Modelos recorrentes ou por etapas."
          }
        ]
      },

      // BLOCO 06
      {
        stepNumber: 6,
        id: "bloco_06_excelencia_liberal",
        title: "BLOCO 06: EXCELÊNCIA OPERACIONAL, BIOSSEGURANÇA & COMODIDADES",
        subtitle: "Parte 1 (Espaço Físico) e Parte 2 (Conduta para Atendimento Externo / Domiciliar / Remoto).",
        fields: [
          // PARTE 1: ESPAÇO FÍSICO
          {
            id: "sub_header_fisico_b6",
            label: "🏛️ PARTE 1: COMODIDADES DO ESPAÇO FÍSICO (Consultório / Escritório)",
            type: "section_divider",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Fisico", "Hibrido"]
          },
          { id: "ar_condicionado", label: "Climatização: Ambiente com Ar-Condicionado individual nas salas?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], tooltip: "Salas climatizadas." },
          { id: "wifi_gratis", label: "Conectividade: Wi-Fi Gratuito para Clientes?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], tooltip: "Wi-Fi disponível." },
          { id: "estacionamento_proprio", label: "Estacionamento no Local: Possui Estacionamento próprio ou conveniado gratuito?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], tooltip: "Estacionamento para clientes/pacientes." },
          { id: "servico_manobrista", label: "Serviço de Manobrista: Possui serviço de Manobrista (Valet) no local?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], tooltip: "Serviço de manobrista." },
          { id: "embarque_desembarque_pne", label: "Embarque e Desembarque Assistido: Área com vaga exclusiva e coberta para embarque/desembarque rápido de idosos, gestantes e PNE?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], tooltip: "Acesso seguro para embarque e desembarque." },
          { id: "isolamento_acustico_sigilo", label: "Privacidade & Isolamento Acústico: Consultórios / Salas com isolamento acústico adequado para garantir sigilo total e privacidade das conversas?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], tooltip: "Sigilo acústico das sessões/consultas." },
          { id: "biosseguranca_autoclave", label: "Biossegurança & Esterilização (Saúde/Odonto/Estética): Equipamentos esterilizados em Autoclave e em conformidade estrita com normas da ANVISA?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], tooltip: "Rigor de esterilização e biossegurança." },
          { id: "vestiarios_duchas", label: "Vestiários e Duchas (Academias/Clínicas de Reabilitação): Possui vestiários privativos completos com duchas e armários?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], tooltip: "Estrutura de vestiário." },
          { id: "familia_lactantes", label: "Família & Lactantes: Espaço reservado para amamentação e trocador de fraldas higienizado?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], tooltip: "Espaço para mães e bebês." },
          { id: "seguranca_recepcao", label: "Segurança Física: Ambiente monitorado por câmeras na recepção e presença de vigilância privada / portaria presencial?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Fisico", "Hibrido"], tooltip: "Segurança patrimonial e controle de acesso." },

          // PARTE 2: ATENDIMENTO EXTERNO / DOMICILIAR / REMOTO
          {
            id: "sub_header_remoto_b6",
            label: "🚗 PARTE 2: PADRÃO DE CONDUTA PARA ATENDIMENTO EXTERNO / DOMICILIAR / REMOTO",
            type: "section_divider",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Remoto_Domiciliar", "Hibrido"]
          },
          {
            id: "politica_primeira_visita_liberal",
            label: "Política de Cobrança da Primeira Visita Técnica / Avaliação Domiciliar:",
            type: "select_with_other",
            defaultVal: "Omitir",
            conditionField: "modalidade_principal_liberal",
            conditionIn: ["Remoto_Domiciliar", "Hibrido"],
            tooltip: "Como é tratada a primeira visita técnica ou avaliação no local do cliente.",
            options: [
              { val: "Omitir", text: "Omitir" },
              { val: "Visita / Avaliação Inicial Gratuita", text: "Visita / Avaliação Inicial Gratuita" },
              { val: "Cobra Taxa de Visita Técnica / Deslocamento", text: "Cobra Taxa de Visita Técnica / Deslocamento" },
              { val: "Valor da visita é abatido caso o contrato/tratamento seja fechado", text: "Valor da visita é abatido caso o contrato/tratamento seja fechado" },
              { val: "OTHER", text: "Outra política de visita (Especificar)" }
            ],
            otherLabel: "Descreva em uma frase (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Isento de taxa num raio de 10 km do centro",
            otherMaxLength: 90
          },
          { id: "custos_logisticos_viagem", label: "Custos Logísticos de Longa Distância: Para vistorias, perícias ou atendimentos em outros municípios, os custos com combustível, pedágio, hospedagem e alimentação são orçados formalmente e descritos na proposta?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Remoto_Domiciliar", "Hibrido"], tooltip: "Clareza sobre despesas de viagem." },
          { id: "identificacao_domiciliar_conselho", label: "Identificação e Segurança no Domicílio do Cliente: Profissional atua devidamente identificado (crachá funcional com foto, uniforme técnico/jaleco e carteira do conselho de classe disponível para conferência)?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Remoto_Domiciliar", "Hibrido"], tooltip: "Segurança na entrada em domicílios e condomínios." },
          { id: "maleta_equipamentos_moveis", label: "Equipamentos e Insumos Móveis Próprios: Dispõe de maleta técnica e equipamentos portáteis próprios homologados para atendimento de campo (maca portátil, aparelhos calibrados, instrumentos de medição)?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Remoto_Domiciliar", "Hibrido"], tooltip: "Instrumental completo de atendimento móvel." },
          { id: "contrato_digital_previo", label: "Formalização de Contratos Prévios: O atendimento domiciliar, consultoria técnica ou acompanhamento remoto é formalizado mediante contrato prévio ou termo de consentimento assinado digitalmente antes do início do serviço?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Remoto_Domiciliar", "Hibrido"], tooltip: "Respaldo contratual prévio." },
          { id: "plataforma_online_criptografada", label: "Plataforma Regulamentada para Atendimentos Online: Para consultas ou sessões à distância (telemedicina, terapia online, assessoria remota), utiliza plataforma criptografada que assegura o sigilo profissional exigido pelo conselho?", type: "tri_state", defaultVal: "Omitir", conditionField: "modalidade_principal_liberal", conditionIn: ["Remoto_Domiciliar", "Hibrido"], tooltip: "Proteção de dados e sigilo em sessões remotas." }
        ]
      },

      // BLOCO 07
      {
        stepNumber: 7,
        id: "bloco_07_acolhimento_liberal",
        title: "BLOCO 07: ACOLHIMENTO ESPECIALIZADO, ACESSIBILIDADE & DIVERSIDADE",
        subtitle: "Cada item com botões [ Sim ], [ Não ], [ Omitir ].",
        fields: [
          { id: "pne_rampa_rua", label: "Acessibilidade Motora (PNE): Entrada acessível no nível da rua ou com rampa suave?", type: "tri_state", defaultVal: "Omitir", tooltip: "Acesso externo sem degraus." },
          { id: "pne_elevador_maca", label: "Acessibilidade Motora (PNE): Elevador adaptado e portas largas compatíveis com cadeiras de rodas e macas?", type: "tri_state", defaultVal: "Omitir", tooltip: "Acesso vertical e portas largas." },
          { id: "pne_banheiro_barras", label: "Acessibilidade Motora (PNE): Banheiro adaptado com barras de apoio articuladas e espaço de manobra para cadeirantes?", type: "tri_state", defaultVal: "Omitir", tooltip: "Sanitário adaptado PNE." },
          { id: "obesos_poltronas", label: "Público com Obesidade & Mobilidade Reduzida: O espaço dispõe de poltronas reforçadas dimensionadas para pessoas obesas?", type: "tri_state", defaultVal: "Omitir", tooltip: "Assentos especiais dimensionados." },
          { id: "mobilidade_cadeira_rodas_interna", label: "Público com Obesidade & Mobilidade Reduzida: Possui cadeira de rodas própria no local para transporte interno de pacientes com dificuldade de locomoção?", type: "tri_state", defaultVal: "Omitir", tooltip: "Cadeira de rodas de apoio interno." },
          { id: "acolhimento_autismo_tea", label: "Cuidado com Neurodiversidade & Espectro Autista (TEA): Ambiente e atendimento preparados para acolher pessoas autistas e com sensibilidade sensorial (controle de iluminação, diminuição de ruídos e respeito ao tempo individual de resposta)?", type: "tri_state", defaultVal: "Omitir", tooltip: "Manejo especializado para pacientes TEA." },
          { id: "acolhimento_pediatrico", label: "Acolhimento Pediátrico: Atendimento especializado e adaptado para bebês e crianças (Pediatria, Odontopediatria, Psicopedagogia)?", type: "tri_state", defaultVal: "Omitir", tooltip: "Preparo técnico para atendimento infantil." },
          { id: "acolhimento_geriatrico", label: "Acolhimento Geriátrico: Atendimento especializado para o público idoso e pacientes acamados?", type: "tri_state", defaultVal: "Omitir", tooltip: "Atenção dedicada à terceira idade." },
          { id: "comunicacao_libras", label: "Comunicação Acessível: Profissional ou membro da equipe capacitado em Língua Brasileira de Sinais (LIBRAS)?", type: "tri_state", defaultVal: "Omitir", tooltip: "Atendimento em LIBRAS." },
          { id: "comunicacao_idiomas", label: "Comunicação Acessível: Capacidade de prestar consulta, atendimento ou emissão de laudos em idioma estrangeiro (Inglês, Espanhol)?", type: "tri_state", defaultVal: "Omitir", tooltip: "Atendimento em outros idiomas." },
          {
            id: "outro_acolhimento_liberal",
            label: "Outra prática de acolhimento especializado (Especificar)",
            type: "tri_state_with_input",
            defaultVal: "Omitir",
            inputLabel: "Descreva em uma frase (Máx. 90 caracteres)",
            inputPlaceholder: "Ex: Atendimento prioritário silencioso sem espera na recepção",
            maxLength: 90,
            tooltip: "Outro cuidado de inclusão."
          }
        ]
      },

      // BLOCO 08
      {
        stepNumber: 8,
        id: "bloco_08_reconhecimento_liberal",
        title: "BLOCO 08: RECONHECIMENTO TÉCNICO, ASSOCIAÇÕES & DOCÊNCIA",
        subtitle: "Para profissionais de todas as áreas agregarem peso curricular direto nas respostas da IA.",
        fields: [
          {
            id: "membro_sociedades_cientificas",
            label: "1. Filiação a Sociedades Científicas, Conselhos e Entidades de Classe: É Membro Ativo de Sociedades Científicas, Associações ou Institutos Oficiais da sua Área?",
            type: "tri_state_with_input",
            defaultVal: "Omitir",
            inputLabel: "Cite as Entidades / Associações (Máx. 150 caracteres)",
            inputPlaceholder: "Ex: Membro da Sociedade Brasileira de Cardiologia (SBC), Associado ao Instituto dos Advogados do Brasil (IAB), Membro do IBAPE",
            maxLength: 150,
            schemaProp: "memberOf",
            tooltip: "Comprova reconhecimento pelos pares da profissão."
          },
          {
            id: "atuacao_docencia_pesquisa",
            label: "2. Atuação Acadêmica / Docência: Atua ou atuou como Professor Universitário, Preceptor de Residência ou Pesquisador?",
            type: "tri_state_with_input",
            defaultVal: "Omitir",
            inputLabel: "Instituição e Disciplina/Cargo (Máx. 150 caracteres)",
            inputPlaceholder: "Ex: Professor Titular de Direito Penal na Faculdade X, Preceptor de Residência Médica em Ortopedia, Docente do curso de Fisioterapia",
            maxLength: 150,
            tooltip: "Autoridade docente e acadêmica."
          }
        ]
      },

      // BLOCO 09
      {
        stepNumber: 9,
        id: "bloco_09_procedimentos_liberal",
        title: "BLOCO 09: PROCEDIMENTOS PRINCIPAIS & ATUAÇÕES EXCLUSIVAS",
        subtitle: "Alimentação do catálogo que responde a dúvidas como: 'Quem faz [Procedimento X] na cidade?'",
        fields: [
          {
            id: "catalogo_destaque",
            label: "1. Procedimentos / Serviços Principais Realizados (De 1 a 5 Carros-Chefes) *",
            type: "repeater",
            minItems: 1,
            maxItems: 5,
            addButtonText: "+ Adicionar Procedimento",
            schemaProp: "hasOfferCatalog",
            tooltip: "Cadastre de 1 a 5 procedimentos principais realizados.",
            subfields: [
              { id: "item_nome", label: "Nome do Procedimento *", placeholder: "Ex: Implante Dentário com Carga Imediata, Consultoria Tributária Preventiva para PMEs, Reabilitação Vestibular", required: true },
              { id: "item_descricao", label: "Breve Descrição Técnica (Diferenciais do método, aparelhos e indicação) *", placeholder: "Ex: Treinamento físico individualizado com foco em fortalecimento articular e prevenção de quedas", maxLength: 140, required: true },
              { id: "item_preco", label: "Valor de Referência em Reais (R$) (Deixe vazio para Omitir)", placeholder: "Ex: 350,00 ou deixe vazio para Omitir" }
            ]
          },
          {
            id: "possui_procedimento_exclusivo",
            label: "2. Diferencial de Exclusividade Regional (Procedimentos Especiais): Realiza algum procedimento, cirurgia, perícia ou aplicação de técnica que é exclusiva ou rara na sua microrregião?",
            type: "tri_state_with_input",
            defaultVal: "Omitir",
            inputLabel: "Descreva o procedimento exclusivo e para qual condição ele é indicado (Máx. 150 caracteres)",
            inputPlaceholder: "Ex: Único profissional credenciado na região na técnica de alinhadores invisíveis marca X ou Perícia grafotécnica e documental para processos bancários",
            maxLength: 150,
            tooltip: "Quando alguém busca por tratamentos ou serviços raros na cidade, a IA utiliza esse destaque para te colocar como a primeira e única referência local."
          }
        ]
      },

      // BLOCO 10
      {
        stepNumber: 10,
        id: "bloco_10_ecossistema_liberal",
        title: "BLOCO 10: ECOSSISTEMA DIGITAL, ARTIGOS & PROVA SOCIAL",
        subtitle: "A etapa final onde o usuário insere seus canais oficiais e vínculos de autoridade pública.",
        fields: [
          {
            id: "status_site_oficial",
            label: "1. Site Oficial / Consultório Virtual *",
            type: "radio_cards",
            defaultVal: "nao_possui",
            options: [
              { val: "possui_ativo", text: "Já possuo Site Oficial ativo (abre campo para o link)" },
              { val: "em_ativacao", text: "Domínio em ativação (será publicado na etapa seguinte do app)" },
              { val: "nao_possui", text: "Não possuo presença web própria (Omitir)" }
            ],
            tooltip: "Situação do site profissional."
          },
          {
            id: "url_site_oficial",
            label: "Link do Site Oficial ou Domínio Pretendido",
            type: "url",
            conditionField: "status_site_oficial",
            conditionNotVal: "nao_possui",
            schemaProp: "url",
            placeholder: "Ex: https://www.drmendonca.com.br",
            tooltip: "URL principal do profissional ou clínica."
          },
          {
            id: "link_google_maps",
            label: "Perfil no Google Maps / Google Perfil de Empresas (Avaliações públicas)",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            schemaProp: "hasMap",
            placeholder: "Ex: https://maps.google.com/...",
            tooltip: "Ficha de avaliações no Google."
          },
          {
            id: "link_plataforma_classe",
            label: "Plataformas Específicas de Agendamento ou Notoriedade (Doctoralia, Jusbrasil, Escavador, Conselho Federal)",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: https://doctoralia.com.br/medico/...",
            tooltip: "Perfil em diretórios especializados de alta autoridade."
          },
          {
            id: "link_curriculo_lattes",
            label: "Currículo Lattes / Publicações Científicas (CNPq)",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: http://lattes.cnpq.br/...",
            tooltip: "Link do Currículo Lattes ou portal de artigos científicos."
          },
          {
            id: "link_instagram",
            label: "Instagram Profissional",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: https://instagram.com/seuusuario",
            tooltip: "Perfil profissional no Instagram."
          },
          {
            id: "link_linkedin",
            label: "LinkedIn Profissional",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: https://linkedin.com/in/seuusuario",
            tooltip: "Perfil no LinkedIn."
          },
          {
            id: "link_youtube",
            label: "Canal do YouTube ou Podcast de Educação e Conteúdo",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: https://youtube.com/@seucanal",
            tooltip: "Canal educativo no YouTube ou Spotify."
          },
          {
            id: "links_extras_sameas",
            label: "3. Adicionar Outras Plataformas (Artigos de jornal, participações em podcasts ou eventos do setor)",
            type: "repeater_simple",
            maxItems: 5,
            addButtonText: "+ Adicionar Mais Plataformas",
            placeholder: "Ex: https://...",
            tooltip: "Links complementares de prova social e imprensa."
          }
        ]
      },

      // BLOCO 11 (MÓDULO AVATAR)
      {
        stepNumber: 11,
        id: "bloco_11_avatar_liberal",
        title: "BLOCO 11: MÓDULO AVATAR - O PERFIL DO PACIENTE, CLIENTE OU ASSISTIDO",
        subtitle: "Psicologia do paciente/cliente para orientar a IA, o Site (App 1B) e os Anúncios (App 3).",
        infoBanner: "Psicologia do Paciente / Cliente de Autoridade: A contratação de um médico, advogado, engenheiro, psicólogo ou personal envolve vulnerabilidade, saúde, patrimônio ou metas de vida. Esse bloco ensina à IA para qual estado emocional e nível de exigência o seu método foi desenhado.",
        fields: [
          {
            id: "avatar_motivacao_central",
            label: "1. Estado Emocional & Motivação Central da Busca: O que faz esse cliente procurar você hoje?",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Alívio de Dor ou Crise Aguda", text: "Alívio de Dor ou Crise Aguda (Problema urgente de saúde, litígio judicial ou emergência física)" },
              { val: "Prevenção, Longevidade e Manutenção", text: "Prevenção, Longevidade e Manutenção (Quer cuidar da saúde, organizar o patrimônio ou treinar com segurança)" },
              { val: "Alta Performance e Estética", text: "Alta Performance e Estética (Busca excelência, transformação visual, status e resultados acima da média)" },
              { val: "Resolução de Incerteza / Diagnóstico Preciso", text: "Resolução de Incerteza / Diagnóstico Preciso (Já passou por outros profissionais e não teve resposta clara)" }
            ],
            allowOther: true,
            otherLabel: "Outra motivação principal (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Cumprimento de exigências legais, perícias técnicas ou auditorias",
            otherMaxLength: 90,
            tooltip: "Motivação emocional ou técnica que leva o cliente até você."
          },
          {
            id: "avatar_percepcao_valor",
            label: "2. Perfil Socioeconômico & Percepção de Valor: Como o seu cliente ideal encara os seus honorários?",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Cliente de Alto Padrão", text: "Cliente de Alto Padrão (Exclusividade, pontualidade britânica, sigilo total e atendimento personalizado)" },
              { val: "Cliente Consciente de Classe Média", text: "Cliente Consciente de Classe Média (Valoriza a formação técnica sólida, busca clareza de custos e facilidade de pagamento)" },
              { val: "Cliente Focado em Reembolso / Convênio", text: "Cliente Focado em Reembolso / Convênio (Exige documentação completa para restituição imediata)" }
            ],
            allowOther: true,
            otherLabel: "Outro comportamento financeiro (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Honorários vinculados ao sucesso da causa ou contratos anuais fixos",
            otherMaxLength: 90,
            tooltip: "Relação do paciente/cliente com o investimento financeiro."
          },
          {
            id: "avatar_postura_desejada",
            label: "3. Tom de Acolhimento & Postura Desejada: Qual o perfil de relação terapêutica ou profissional que ele espera?",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Acolhimento Humanizado, Empático e Protetor", text: "Acolhimento Humanizado, Empático e Protetor (Precisa ser ouvido com calma, sem pressa no relógio)" },
              { val: "Postura Firme, Técnica e Assertiva", text: "Postura Firme, Técnica e Assertiva (Quer clareza técnica, dados concretos, laudos precisos e autoridade científica)" },
              { val: "Acompanhamento Próximo e Didático", text: "Acompanhamento Próximo e Didático (Precisa de explicações simples, suporte no WhatsApp e acompanhamento de rotina)" }
            ],
            allowOther: true,
            otherLabel: "Outra postura profissional (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Relação corporativa focada em governança, discrição e relatórios periódicos",
            otherMaxLength: 90,
            tooltip: "Postura esperada pelo cliente durante o atendimento."
          },
          {
            id: "avatar_exigencia_inegociavel",
            label: "4. Nível de Exigência em Relação ao Espaço ou Atendimento: O que é inegociável para esse perfil?",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Pontualidade absoluta no horário agendado", text: "Pontualidade absoluta no horário agendado" },
              { val: "Privacidade, sigilo profissional e discrição visual/acústica", text: "Privacidade, sigilo profissional e discrição visual/acústica" },
              { val: "Clareza nas etapas do tratamento ou projeto, sem termos técnicos indecifráveis", text: "Clareza nas etapas do tratamento ou projeto, sem termos técnicos indecifráveis" },
              { val: "Facilidade de acesso, estacionamento e acessibilidade para idosos/crianças", text: "Facilidade de acesso, estacionamento e acessibilidade para idosos/crianças" }
            ],
            allowOther: true,
            otherLabel: "Outra exigência inegociável (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Disponibilidade para atendimentos remotos e emergências fora de hora",
            otherMaxLength: 90,
            tooltip: "Critérios inegociáveis para a satisfação do cliente."
          },
          {
            id: "avatar_raiox_livre",
            label: "5. Raio-X Livre do Paciente/Cliente Ideal (Campo Aberto Opcional)",
            type: "textarea",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir Raio-X Livre",
            maxLength: 300,
            placeholder: "Ex: Mulheres e mães entre 35 e 55 anos que sofrem com dores crônicas ou sobrecarga emocional, buscando um ambiente seguro, silencioso e sem julgamentos para recuperar sua qualidade de vida.",
            tooltip: "Resumo aberto em até 300 caracteres sobre o paciente ou cliente ideal."
          }
        ]
      }
    ]
  },

  // ==========================================================================
  // PERFIL 04: ESPECIALISTA DIGITAL & NEGÓCIO ONLINE (9 BLOCOS)
  // ==========================================================================
  especialista_digital: {
    id: "especialista_digital",
    storageKey: "geo_engine_digital_specialist",
    badgeIcon: "💡",
    badgeText: "Especialista Digital",
    cardTitle: "Especialista Digital & Negócio Online",
    cardDescription: "Infoprodutores, Mentores, Consultores Online, Criadores de Conteúdo, SaaS, Agências e Afiliados Profissionais.",
    defaultSchemaType: "Person",
    submitButtonText: "Gerar & Validar Perfil Digital para IA →",

    steps: [
      // BLOCO 01
      {
        stepNumber: 1,
        id: "bloco_01_identidade_digital",
        title: "BLOCO 01: IDENTIDADE DA MARCA PESSOAL OU EMPRESA DIGITAL",
        subtitle: "Identificação da figura de autoridade ou da organização digital responsável pela operação.",
        fields: [
          {
            id: "estrutura_operacao_digital",
            label: "1. Estrutura Principal da Operação Digital *",
            type: "select_with_other",
            required: true,
            schemaProp: "@type",
            tooltip: "Informa à IA se a autoridade é ancorada na pessoa física do criador ou em uma marca/empresa coletiva.",
            options: [
              { val: "Person", text: "Especialista / Mentor / Autor (Marca Pessoal Individual)" },
              { val: "OnlineBusiness", text: "Empresa / Produtora Digital / Agência / Startup (Marca Institucional)" },
              { val: "OTHER", text: "Outra estrutura digital (Especificar)" }
            ],
            otherLabel: "Especifique a estrutura da operação (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Plataforma SaaS Educacional e Ecossistema de Inteligência Artificial",
            otherMaxLength: 90
          },
          {
            id: "nome_especialista_marca",
            label: "2. Nome do Especialista ou Nome Fantasia da Operação Digital *",
            type: "text",
            required: true,
            schemaProp: "name",
            placeholder: "Ex: Maria Luiza ou Agência Escala Digital",
            tooltip: "O nome principal pelo qual o público, seguidores e alunos buscam você na internet."
          },
          {
            id: "razao_social",
            label: "3. Razão Social da Empresa Operadora",
            type: "text",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir / Opera como Pessoa Física",
            schemaProp: "legalName",
            placeholder: "Ex: Hercules Treinamentos & Soluções Digitais Ltda",
            tooltip: "Nome registrado no contrato social ou MEI que formaliza a operação."
          },
          {
            id: "documento_fiscal_digital",
            label: "4. CNPJ da Empresa ou CPF Operacional",
            type: "text",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir dado fiscal do código público",
            schemaProp: "taxID",
            placeholder: "00.000.000/0000-00 ou 000.000.000-00",
            tooltip: "Segurança e Privacidade: Este dado não fica visível em texto aberto para quem lê a página. Ele é inserido de forma invisível no código interno para que os motores de IA comprovem que a empresa é legalmente constituída e idônea."
          },
          {
            id: "whatsapp_principal",
            label: "5.1 WhatsApp Comercial / Link Direto de Suporte *",
            type: "phone",
            required: true,
            defaultPrefix: "+55 ",
            schemaProp: "telephone",
            placeholder: "Ex: +55 16 99999-6666",
            tooltip: "Prefixo padrão +55 editável, sem travas."
          },
          {
            id: "email_comercial",
            label: "5.2 E-mail Oficial de Atendimento e Suporte *",
            type: "email",
            required: true,
            schemaProp: "email",
            placeholder: "contato@roniflores.com.br ou suporte@plataforma.com",
            tooltip: "Campo obrigatório para atendimento e suporte oficial."
          },
          {
            id: "telegram_comercial",
            label: "5.3 Canal ou Grupo Oficial no Telegram",
            type: "text",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "https://t.me/comunidade_oficial",
            tooltip: "Link do canal ou grupo oficial no Telegram."
          },
          {
            id: "ano_fundacao",
            label: "6. Tempo de Atuação no Mercado Digital / Ano de Lançamento *",
            type: "select",
            required: true,
            schemaProp: "foundingDate",
            options: generateYearsList(30, "Mais de 30 anos (Pioneiro digital/corporativo)"),
            tooltip: "Demonstra para a inteligência artificial o tempo de consistência e experiência da sua operação online."
          },
          {
            id: "descricao_otimizada",
            label: "7. Apresentação Otimizada do Especialista / Empresa para a IA *",
            type: "textarea",
            required: true,
            minLength: 150,
            maxLength: 350,
            schemaProp: "description",
            placeholder: "Mentor de negócios e especialista em GEO (Generative Engine Optimization) e Inteligência Artificial para PMEs. Criador da metodologia de Mini-Apps de Conversão, capacitando empreendedores a conquistarem as primeiras posições em recomendações no ChatGPT, Gemini e Perplexity.",
            tooltip: "Resumo direto em linguagem factual que as IAs devoram: quem você é + o método que ensina + a transformação gerada + para quem se destina."
          }
        ]
      },

      // BLOCO 02
      {
        stepNumber: 2,
        id: "bloco_02_topicos_metodologia_digital",
        title: "BLOCO 02: TÓPICOS DE DOMÍNIO, AUTORIDADE SEMÂNTICA & METODOLOGIA",
        subtitle: "O coração do perfil digital: ensina às IAs sobre quais temas você é a autoridade máxima de mercado.",
        fields: [
          {
            id: "topicos_dominio_knowsabout",
            label: "1. Tópicos e Conceitos de Domínio Absoluto (Áreas de Notoriedade - Até 8 termos separados por vírgula) *",
            type: "text",
            required: true,
            maxLength: 250,
            schemaProp: "knowsAbout",
            placeholder: "Ex: Tráfego Pago Local, Inteligência Artificial para Vendas, Copywriting Direto, Automação de Processos, Dropshipping Nacional",
            tooltip: "Essas palavras-chave definem a sua entidade semântica. Quando alguém pedir à IA: 'indique os maiores especialistas em [Tópico]', é aqui que ela busca."
          },
          {
            id: "possui_metodo_autoral",
            label: "2. Metodologia Proprietária / Método Autoral com Nome Próprio:",
            type: "select_with_other",
            defaultVal: "Possui Método / Framework Próprio",
            tooltip: "Ter um método nomeado diferencia você de amadores nas respostas comparativas da inteligência artificial.",
            options: [
              { val: "Possui Método / Framework Próprio", text: "Possui Método / Framework Próprio" },
              { val: "Omitir", text: "Omitir / Atua com Metodologias de Mercado" }
            ]
          },
          {
            id: "nome_metodo_autoral",
            label: "2.1 Nome Oficial do seu Método / Sistema",
            type: "text",
            conditionField: "possui_metodo_autoral",
            conditionVal: "Possui Método / Framework Próprio",
            maxLength: 90,
            placeholder: "Ex: Método GEO Local 360, Framework Lucro Invisível",
            tooltip: "Nome comercial ou autoral da sua metodologia."
          },
          {
            id: "descricao_metodo_autoral",
            label: "2.2 Breve Descrição da Lógica do Método",
            type: "text",
            conditionField: "possui_metodo_autoral",
            conditionVal: "Possui Método / Framework Próprio",
            maxLength: 160,
            placeholder: "Ex: Processo passo a passo em 4 etapas para transformar empresas físicas em entidades recomendadas por IAs sem gastar com anúncios.",
            tooltip: "Explicação direta de como o método gera transformação."
          },
          {
            id: "publico_alvo_prioritario_digital",
            label: "3. Público-Alvo Prioritário da sua Mensagem *",
            type: "checkbox_group",
            required: true,
            schemaProp: "audience",
            options: [
              { val: "Empreendedores e Donos de Comércio Local", text: "Empreendedores e Donos de Comércio Local" },
              { val: "Profissionais Liberais e Autônomos (Médicos, Advogados, etc.)", text: "Profissionais Liberais e Autônomos (Médicos, Advogados, etc.)" },
              { val: "Iniciantes do Zero no Mercado Digital", text: "Iniciantes do Zero no Mercado Digital" },
              { val: "Gestores de Tráfego, Designers e Agências", text: "Gestores de Tráfego, Designers e Agências" },
              { val: "Empresas de Grande Porte / B2B Corporativo", text: "Empresas de Grande Porte / B2B Corporativo" }
            ],
            allowOther: true,
            otherLabel: "Outro Perfil de Público (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Pais interessados em desenvolvimento cognitivo infantil",
            otherMaxLength: 90,
            tooltip: "Auxilia os robôs a filtrarem sua indicação para o tipo exato de pessoa que busca ajuda."
          }
        ]
      },

      // BLOCO 03
      {
        stepNumber: 3,
        id: "bloco_03_alcance_idiomas_digital",
        title: "BLOCO 03: ALCANCE GEOGRÁFICO, MERCADO DE ATUAÇÃO & IDIOMAS",
        subtitle: "Substitui a limitação municipal de CEP por cobertura nacional ou global.",
        fields: [
          {
            id: "escopo_geografico_digital",
            label: "1. Escopo Geográfico de Venda e Entrega *",
            type: "select_with_other",
            required: true,
            schemaProp: "areaServed",
            tooltip: "Mostra para a IA que seu produto não possui barreiras físicas de entrega.",
            options: [
              { val: "Nacional (Brasil)", text: "Nacional (Atende e vende para todo o Brasil)" },
              { val: "Comunidade de Língua Portuguesa", text: "Comunidade de Língua Portuguesa (Brasil, Portugal, Angola, Moçambique)" },
              { val: "Global / Internacional", text: "Global / Internacional (Vendas e consultorias no mundo todo)" },
              { val: "OTHER", text: "Foco Regional Específico (Ex: Mentor de empresários do Estado de SP)" }
            ],
            otherLabel: "Especifique a região de foco (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Mentor de empresários do Interior do Estado de São Paulo",
            otherMaxLength: 90
          },
          {
            id: "idiomas_entrega",
            label: "2. Idiomas em que os Produtos / Serviços / Suportes são Entregues *",
            type: "checkbox_group",
            required: true,
            schemaProp: "availableLanguage",
            options: [
              { val: "Português", text: "Português" },
              { val: "Inglês", text: "Inglês" },
              { val: "Espanhol", text: "Espanhol" }
            ],
            allowOther: true,
            otherLabel: "Outros idiomas (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Francês e Italiano",
            otherMaxLength: 90,
            tooltip: "Permite a recomendação em buscas feitas em outros idiomas."
          },
          {
            id: "moedas_aceitas",
            label: "3. Moedas Aceitas nas Transações:",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            schemaProp: "currenciesAccepted",
            options: [
              { val: "BRL", text: "Real (BRL)" },
              { val: "USD", text: "Dólar Americano (USD)" },
              { val: "EUR", text: "Euro (EUR)" },
              { val: "Criptoativos", text: "Criptoativos" }
            ],
            allowOther: true,
            otherLabel: "Outra moeda (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Libra Esterlina (GBP) via checkout global",
            otherMaxLength: 90,
            tooltip: "Informa a flexibilidade financeira do seu ecossistema de checkout."
          }
        ]
      },

      // BLOCO 04
      {
        stepNumber: 4,
        id: "bloco_04_formatos_entrega_digital",
        title: "BLOCO 04: FORMATOS DE ENTREGA & MODELOS DE NEGÓCIO",
        subtitle: "Quais são as modalidades práticas em que você entrega o seu conhecimento ou tecnologia.",
        fields: [
          {
            id: "formatos_produtos_digitais",
            label: "Marque tudo o que faz parte do seu catálogo ativo *",
            type: "checkbox_group",
            required: true,
            options: [
              { val: "Cursos Online Gravados com Acesso por Área de Membros", text: "Cursos Online Gravados com Acesso por Área de Membros" },
              { val: "Mentorias em Grupo com Encontros ao Vivo", text: "Mentorias em Grupo com Encontros ao Vivo" },
              { val: "Consultoria Individual 1 a 1 Estratégica (Online)", text: "Consultoria Individual 1 a 1 Estratégica (Online)" },
              { val: "Comunidade por Assinatura / Clube de Negócios (Recorrência)", text: "Comunidade por Assinatura / Clube de Negócios (Recorrência)" },
              { val: "Livros Digitais (E-books), Guias e Manuais Práticos", text: "Livros Digitais (E-books), Guias e Manuais Práticos" },
              { val: "Softwares / Ferramentas Web / Mini-Apps / SaaS", text: "Softwares / Ferramentas Web / Mini-Apps / SaaS" },
              { val: "Serviços Feitos Para Você (Done-For-You / Assessoria / Agência)", text: "Serviços Feitos Para Você (Done-For-You / Assessoria / Agência)" },
              { val: "Palestras e Treinamentos In-Company presenciais ou remotos", text: "Palestras e Treinamentos In-Company presenciais ou remotos" }
            ],
            allowOther: true,
            otherLabel: "Outro formato de entrega (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Imersões presenciais de fim de semana e grupos de Mastermind",
            otherMaxLength: 90,
            tooltip: "Cada formato marcado alimenta a oferta de serviços da sua entidade nos motores de resposta."
          }
        ]
      },

      // BLOCO 05
      {
        stepNumber: 5,
        id: "bloco_05_vitrine_checkouts_digital",
        title: "BLOCO 05: VITRINE DE PRODUTOS DIGITAIS & CHECKOUTS (1 A 5 CARROS-CHEFES)",
        subtitle: "Mapeamento direto dos produtos que você mais vende, com links oficiais de compra.",
        fields: [
          {
            id: "catalogo_destaque",
            label: "Produtos Digitais / Ofertas Principais (Limite de 5) *",
            type: "repeater",
            minItems: 1,
            maxItems: 5,
            addButtonText: "+ Adicionar Produto / Oferta",
            schemaProp: "hasOfferCatalog",
            tooltip: "Quando um usuário perguntar à IA 'quanto custa o curso de Fulano?' ou 'onde comprar a mentoria X?', a IA utiliza esses dados precisos para responder.",
            subfields: [
              { id: "item_nome", label: "1. Nome do Produto ou Treinamento *", placeholder: "Ex: Mentoria GEO de Choque, Mini-App Entity Engine Anual, E-book Guia do Comércio Visível", required: true },
              { id: "item_formato", label: "2. Tipo de Entrega (Curso, Mentoria, Software, E-book, Consultoria, Comunidade) *", placeholder: "Ex: Mentoria ou Software", required: true },
              { id: "item_descricao", label: "3. Breve Descrição da Solução (O que resolve e o que entrega) *", placeholder: "Ex: Ecossistema completo com software e tutoriais práticos para colocar empresas nas primeiras respostas das IAs.", maxLength: 160, required: true },
              { id: "item_preco", label: "4. Faixa de Preço de Venda (Ou deixe vazio para Omitir Preço)", placeholder: "Ex: R$ 497,00 ou R$ 97,00/mês" },
              { id: "item_url_checkout", label: "5. Link Oficial da Página de Vendas ou Checkout Direto", placeholder: "https://pay.kiwify.com.br/... ou https://hotmart.com/..." },
              { id: "item_garantia", label: "6. Garantia Incondicional de Reembolso (7 dias, 15 dias, 30 dias ou Condicional)", placeholder: "Ex: 7 dias, 15 dias, 30 dias ou Garantia Condicional por Contrato" }
            ]
          }
        ]
      },

      // BLOCO 06
      {
        stepNumber: 6,
        id: "bloco_06_prova_social_metricas_digital",
        title: "BLOCO 06: PROVA SOCIAL, MÉTRICAS DE IMPACTO & CASOS DE SUCESSO",
        subtitle: "Os números que comprovam para a IA que a sua autoridade é real e chancelada por pessoas de verdade.",
        fields: [
          {
            id: "volume_alunos_clientes",
            label: "1. Volume de Clientes / Alunos Impactados:",
            type: "select_with_other",
            defaultVal: "Omitir",
            tooltip: "Números agregados fornecem aos motores de busca evidência estatística de autoridade (E-E-A-T). Se estiver no início, use a opção Omitir.",
            options: [
              { val: "Omitir", text: "Omitir / Operação Inicial de Alta Exclusividade" },
              { val: "+ de 100 alunos/clientes", text: "+ de 100 alunos/clientes" },
              { val: "+ de 500 alunos/clientes", text: "+ de 500 alunos/clientes" },
              { val: "+ de 1.000 alunos/clientes", text: "+ de 1.000 alunos/clientes" },
              { val: "+ de 5.000 alunos/clientes", text: "+ de 5.000 alunos/clientes" },
              { val: "+ de 10.000 alunos/clientes", text: "+ de 10.000 alunos/clientes" },
              { val: "OTHER", text: "Outra métrica de volume (Especificar)" }
            ],
            otherLabel: "Digite sua métrica de alunos/usuários (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Mais de 300 mentorados acompanhados individualmente",
            otherMaxLength: 90
          },
          {
            id: "resultados_gerados_clientes",
            label: "2. Resultados Financeiros ou Métricas Operacionais Geradas para Clientes:",
            type: "text",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir",
            maxLength: 150,
            placeholder: "Ex: Mais de R$ 2 milhões em faturamento gerados para negócios locais mentorados ou mais de 300 empresas posicionadas nas IAs",
            tooltip: "Impacto prático gerado para seus clientes."
          },
          {
            id: "link_pagina_depoimentos",
            label: "3. Página ou Link Oficial de Depoimentos e Casos Reais:",
            type: "url",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "https://seusite.com.br/depoimentos ou link de playlist no YouTube",
            tooltip: "Links de depoimentos em vídeo aumentam a taxa de confiança semântica."
          }
        ]
      },

      // BLOCO 07
      {
        stepNumber: 7,
        id: "bloco_07_presenca_editorial_digital",
        title: "BLOCO 07: PRESENÇA EDITORIAL, CONTEÚDO PERENE & IMPRENSA",
        subtitle: "Onde a IA aprende sobre você através de conteúdos públicos indexados na web.",
        fields: [
          {
            id: "link_youtube",
            label: "Canal Oficial no YouTube (Link do canal onde publica vídeos e aulas)",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "https://youtube.com/@seucanal",
            tooltip: "As IAs cruzam esses links editoriais para criar o seu 'Gráfico de Conhecimento' (Knowledge Graph)."
          },
          {
            id: "link_podcast",
            label: "Podcast Oficial (Spotify, Apple ou Deezer)",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "https://open.spotify.com/show/...",
            tooltip: "Link do programa de áudio."
          },
          {
            id: "link_blog_newsletter",
            label: "Newsletter / Blog / Artigos de Fundo (Substack, Medium, Portal Próprio)",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "https://seublog.com.br",
            tooltip: "Link onde publica análises de mercado."
          },
          {
            id: "livros_publicados_amazon",
            label: "Livros Publicados (Amazon Kindle, Editoras Físicas)",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "https://amazon.com.br/...",
            tooltip: "Link do livro ou perfil de autor na Amazon."
          },
          {
            id: "aparicoes_imprensa_podcasts",
            label: "Aparições na Mídia, Imprensa ou Entrevistas (G1, Exame, Terra, podcasts de terceiros)",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "https://...",
            tooltip: "Link de matéria ou entrevista comprovando relevância pública."
          }
        ]
      },

      // BLOCO 08
      {
        stepNumber: 8,
        id: "bloco_08_ecossistema_sameas_digital",
        title: "BLOCO 08: ECOSSISTEMA DIGITAL, PLATAFORMAS & CHECKOUTS (sameAs)",
        subtitle: "Vínculos públicos de identidade digital para evitar confusão com homônimos e unificar a marca.",
        fields: [
          {
            id: "status_site_oficial",
            label: "1. Site Canônico / Portal Principal do Negócio *",
            type: "radio_cards",
            defaultVal: "possui_ativo",
            options: [
              { val: "possui_ativo", text: "Já possuo Site Oficial / Domínio Próprio ativo (abre campo para a URL)" },
              { val: "em_ativacao", text: "Domínio em processo de ativação (será gerado na próxima etapa do app)" },
              { val: "nao_possui", text: "Não possuo site institucional próprio (Uso apenas páginas de vendas)" }
            ],
            tooltip: "Portal principal do especialista."
          },
          {
            id: "url_site_oficial",
            label: "URL do Site Oficial ou Nome Pretendido",
            type: "url",
            conditionField: "status_site_oficial",
            conditionNotVal: "nao_possui",
            schemaProp: "url",
            placeholder: "Ex: https://www.roniflores.com.br",
            tooltip: "Domínio oficial."
          },
          {
            id: "link_plataformas_checkout",
            label: "2.1 Perfil / Loja na Kiwify / Hotmart / Eduzz / Monetizze / Lastlink",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: https://kiwify.com.br/... ou https://lastlink.com/...",
            tooltip: "Link público de produtor ou vitrine digital."
          },
          {
            id: "link_github_portfolio",
            label: "2.2 Perfil no GitHub (se for desenvolvedor de software / criador de ferramentas)",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: https://github.com/RONIFLORES",
            tooltip: "Link do repositório/perfil público no GitHub."
          },
          {
            id: "link_linkedin",
            label: "2.3 Perfil Comercial no LinkedIn",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: https://linkedin.com/in/seuusuario",
            tooltip: "Link de autoridade corporativa."
          },
          {
            id: "link_instagram",
            label: "2.4 Instagram Oficial da Marca / Especialista",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: https://instagram.com/seuusuario",
            tooltip: "Link com o usuário oficial no Instagram."
          },
          {
            id: "link_twitter_threads",
            label: "2.5 Perfil no X (Twitter) / Threads",
            type: "url",
            allowOmit: true,
            omitLabel: "Omitir",
            placeholder: "Ex: https://x.com/seuusuario ou https://threads.net/@seuusuario",
            tooltip: "Link do perfil no X ou Threads."
          },
          {
            id: "links_extras_sameas",
            label: "3. Adicionar Outros Canais Digitais (TikTok, Discord, Circle, App Store ou links adicionais)",
            type: "repeater_simple",
            maxItems: 5,
            addButtonText: "+ Adicionar Mais Plataformas",
            placeholder: "Ex: https://tiktok.com/@...",
            tooltip: "Botão dinâmico para colar links adicionais."
          }
        ]
      },

      // BLOCO 09 (MÓDULO AVATAR DIGITAL)
      {
        stepNumber: 9,
        id: "bloco_09_avatar_digital",
        title: "BLOCO 09: MÓDULO AVATAR - O PERFIL DO ALUNO, MENTORADO OU COMPRADOR ONLINE",
        subtitle: "Psicologia do comprador digital para alimentar a IA, o Construtor de Site (App 1B) e os Anúncios (App 3).",
        infoBanner: "Psicologia do Consumidor Digital: Na internet, o comprador é bombardeado por ofertas genéricas a cada segundo. Este bloco ancora para a IA o estágio de consciência, o nível de sofisticação e os obstáculos mentais de quem compra o seu produto ou mentoria.",
        fields: [
          {
            id: "avatar_maturidade_digital",
            label: "1. Momento de Vida e Maturidade no Tema: Qual o nível de bagagem do seu comprador ideal?",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Iniciante Absoluto", text: "Iniciante Absoluto (Está saindo do zero, tem medo da tecnologia e precisa de um passo a passo guiado)" },
              { val: "Nível Intermediário Travado", text: "Nível Intermediário Travado (Já tentou cursos teóricos, tem conhecimento básico, mas não consegue ter lucro ou escala)" },
              { val: "Profissional Avançado / Operador de Mercado", text: "Profissional Avançado / Operador de Mercado (Busca otimização de tempo, automações avançadas, sofisticação e networking de alto nível)" }
            ],
            allowOther: true,
            otherLabel: "Outro estágio de maturidade (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Donos de negócios tradicionais migrando para o ecossistema digital",
            otherMaxLength: 90,
            tooltip: "Nível de consciência e bagagem técnica do aluno."
          },
          {
            id: "avatar_grande_ambicao",
            label: "2. A Grande Ambição / Promessa Desejada: Qual o maior desejo que move o clique de compra dele?",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Liberdade Geográfica e Financeira", text: "Liberdade Geográfica e Financeira (Trabalhar de onde quiser prestando serviços ou vendendo infoprodutos)" },
              { val: "Salvação ou Escala do Negócio Próprio", text: "Salvação ou Escala do Negócio Próprio (Conquistar clientes sem ficar escravo de anúncios caros ou de dancinhas no Instagram)" },
              { val: "Domínio de Novas Tecnologias", text: "Domínio de Novas Tecnologias (Aprender a usar IAs e automações para não ficar obsoleto no mercado)" }
            ],
            allowOther: true,
            otherLabel: "Outro desejo central (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Criar uma renda passiva sólida vendendo mini-ferramentas recorrentes",
            otherMaxLength: 90,
            tooltip: "Desejo central do comprador."
          },
          {
            id: "avatar_maior_ceticismo",
            label: "3. O Maior Ceticismo / Objeção Mental: Por que esse cliente hesita antes de passar o cartão?",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Já comprei outros cursos e eram só teorias sem nada prático", text: "\"Já comprei outros cursos e eram só teorias sem nada prático que funcionasse.\"" },
              { val: "Tenho pouco tempo no meu dia a dia e medo de não conseguir aplicar", text: "\"Tenho pouco tempo no meu dia a dia e medo de não conseguir aplicar o conteúdo.\"" },
              { val: "Será que esse método funciona para o meu nicho ou cidade específica?", text: "\"Será que esse método funciona para o meu nicho ou cidade específica?\"" },
              { val: "Medo de pagar caro e não ter suporte direto", text: "\"Medo de pagar caro e não ter suporte direto para tirar dúvidas.\"" }
            ],
            allowOther: true,
            otherLabel: "Outra objeção comum (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Acha que precisa saber programar código complexo para ter resultados",
            otherMaxLength: 90,
            tooltip: "Objeções mentais que o seu método supera."
          },
          {
            id: "avatar_estilo_linguagem",
            label: "4. Estilo de Linguagem & Conexão: Como a sua cópia e comunicação conversam com ele?",
            type: "checkbox_group",
            allowOmit: true,
            omitLabel: "Omitir",
            options: [
              { val: "Linguagem Prática, Pé no Chão e Direta", text: "Linguagem Prática, Pé no Chão e Direta (Foco em ferramentas práticas, sem enrolação, atalhos milagrosos ou ostentação)" },
              { val: "Linguagem Corporativa, Estratégica e Analítica", text: "Linguagem Corporativa, Estratégica e Analítica (Foco em métricas, ROI, processos e governança)" },
              { val: "Linguagem Inspiradora, Motivacional e Transformadora", text: "Linguagem Inspiradora, Motivacional e Transformadora (Foco em superação pessoal, disciplina e liderança)" }
            ],
            allowOther: true,
            otherLabel: "Outro tom de voz (Máx. 90 caracteres)",
            otherPlaceholder: "Ex: Linguagem técnica para desenvolvedores e arquitetos de soluções",
            otherMaxLength: 90,
            tooltip: "Tom de comunicação ideal."
          },
          {
            id: "avatar_raiox_livre",
            label: "5. Raio-X Livre do Comprador Digital Ideal (Campo Aberto Opcional)",
            type: "textarea",
            required: false,
            allowOmit: true,
            omitLabel: "Omitir Raio-X Livre",
            maxLength: 300,
            placeholder: "Ex: Empreendedores locais e mentores entre 28 e 50 anos que estão cansados de cursos teóricos e querem softwares e processos prontos para gerar autoridade no Google e nas IAs rapidamente.",
            tooltip: "Síntese aberta em até 300 caracteres sobre o comprador digital ideal."
          }
        ]
      }
    ]
  }
};
