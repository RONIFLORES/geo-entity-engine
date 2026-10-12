import { MAKE_WEBHOOK_URL, PROFILES } from "./config.js";

let selectedProfileKey = "local_comercio";

const landingStep = document.getElementById("landingStep");
const appStep = document.getElementById("appStep");
const activeProfileBadge = document.getElementById("activeProfileBadge");
const badgeIcon = document.getElementById("badgeIcon");
const badgeText = document.getElementById("badgeText");
const btnTrocarPerfil = document.getElementById("btnTrocarPerfil");

const schemaTypeSelect = document.getElementById("schemaType");
const labelName = document.getElementById("labelName");
const labelEspecialidade = document.getElementById("labelEspecialidade");
const fieldCouncilContainer = document.getElementById("fieldCouncilContainer");
const fieldFoundingContainer = document.getElementById("fieldFoundingContainer");
const physicalAddressFields = document.getElementById("physicalAddressFields");
const serviceAreaField = document.getElementById("serviceAreaField");
const locationTitle = document.getElementById("locationTitle");
const fieldGoogleContainer = document.getElementById("fieldGoogleContainer");
const fieldFoodDeliveryContainer = document.getElementById("fieldFoodDeliveryContainer");

const form = document.getElementById("engineForm");
const jsonPreview = document.getElementById("jsonPreview");
const btnPreview = document.getElementById("btnPreview");
const btnCopy = document.getElementById("btnCopy");
const btnSubmit = document.getElementById("btnSubmit");
const statusBox = document.getElementById("statusBox");

export function selectProfile(profileKey) {
  selectedProfileKey = profileKey;
  const config = PROFILES[profileKey];

  landingStep.classList.add("hidden");
  appStep.classList.remove("hidden");
  activeProfileBadge.classList.remove("hidden");

  badgeIcon.textContent = config.badgeIcon;
  badgeText.textContent = config.badgeText;

  labelName.textContent = config.labelName;
  labelEspecialidade.textContent = config.labelEspecialidade;

  fieldCouncilContainer.className = config.showCouncil ? "block" : "hidden";
  fieldFoundingContainer.className = config.showFounding ? "block" : "hidden";
  physicalAddressFields.className = config.showPhysicalAddress ? "space-y-4" : "hidden";
  serviceAreaField.className = config.showServiceArea ? "block" : "hidden";
  locationTitle.textContent = config.showPhysicalAddress ? "02. Endereço Físico & Localização" : "02. Área de Atuação e Cobertura";

  fieldGoogleContainer.className = config.showGoogle ? "block" : "hidden";
  fieldFoodDeliveryContainer.className = config.showIfood ? "block" : "hidden";

  schemaTypeSelect.innerHTML = "";
  config.subtypes.forEach(item => {
    const opt = document.createElement("option");
    opt.value = item.val;
    opt.textContent = item.text;
    schemaTypeSelect.appendChild(opt);
  });

  updatePreview();
}

window.selectProfile = selectProfile;

btnTrocarPerfil.addEventListener("click", () => {
  appStep.classList.add("hidden");
  activeProfileBadge.classList.add("hidden");
  landingStep.classList.remove("hidden");
});

function buildSchemaObject() {
  const config = PROFILES[selectedProfileKey];
  const type = schemaTypeSelect.value;
  const name = document.getElementById("name").value.trim() || "Nome da Entidade";
  const phone = document.getElementById("telephone").value.trim();
  const url = document.getElementById("url").value.trim();
  const specialty = document.getElementById("specialty").value.trim();
  const desc = document.getElementById("description").value.trim();

  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    "name": name
  };

  if (phone) schema["telephone"] = phone;
  if (url) schema["url"] = url;
  if (desc) schema["description"] = desc;

  if (specialty) {
    if (selectedProfileKey === "especialista_digital") {
      schema["knowsAbout"] = specialty;
    } else {
      schema["knowsLanguage"] = "pt-BR";
      schema["hasOfferCatalog"] = {
        "@type": "OfferCatalog",
        "name": "Especialidades",
        "itemListElement": [{
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": specialty
          }
        }]
      };
    }
  }

  if (config.showCouncil) {
    const council = document.getElementById("councilReg").value.trim();
    if (council) schema["hasCredential"] = council;
  }

  if (config.showFounding) {
    const fDate = document.getElementById("foundingDate").value.trim();
    if (fDate) schema["foundingDate"] = fDate;
  }

  if (config.showPhysicalAddress) {
    const city = document.getElementById("addressCity").value.trim();
    const uf = document.getElementById("addressRegion").value.trim().toUpperCase();
    const street = document.getElementById("streetAddress").value.trim();
    const district = document.getElementById("addressLocality").value.trim();
    const cep = document.getElementById("postalCode").value.trim();

    if (city || uf) {
      schema["address"] = {
        "@type": "PostalAddress",
        "streetAddress": street,
        "addressLocality": district,
        "addressRegion": uf,
        "postalCode": cep,
        "addressCountry": "BR"
      };
    }
  }

  if (config.showServiceArea) {
    const area = document.getElementById("areaServed").value.trim();
    if (area) schema["areaServed"] = area;
  }

  const sameAs = [];
  document.querySelectorAll(".sameas-input").forEach(el => {
    if (el.value.trim() && el.offsetParent !== null) {
      sameAs.push(el.value.trim());
    }
  });
  if (sameAs.length > 0) schema["sameAs"] = sameAs;

  return schema;
}

function updatePreview() {
  const schema = buildSchemaObject();
  const scriptTag = `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n<\/script>`;
  jsonPreview.textContent = scriptTag;
  return { schema, scriptTag };
}

btnPreview.addEventListener("click", updatePreview);
form.addEventListener("input", updatePreview);

btnCopy.addEventListener("click", async () => {
  const { scriptTag } = updatePreview();
  try {
    await navigator.clipboard.writeText(scriptTag);
    const originalText = btnCopy.textContent;
    btnCopy.textContent = "Copiado!";
    setTimeout(() => btnCopy.textContent = originalText, 2000);
  } catch (err) {
    alert("Erro ao copiar.");
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const mentorRef = document.getElementById("mentorRef").value.trim();
  if (!mentorRef) {
    alert("Informe o Mentor / Lead Ref.");
    return;
  }

  const { schema, scriptTag } = updatePreview();

  btnSubmit.disabled = true;
  btnSubmit.innerHTML = `<span>Enviando para Automação...</span>`;

  const payload = {
    tipoEvento: "schema_gerado",
    dataHora: new Date().toISOString(),
    perfilSegmentado: selectedProfileKey,
    mentorRef: mentorRef,
    nomeEntidade: schema.name,
    telefone: schema.telephone || "",
    schemaJsonLd: schema,
    scriptTag: scriptTag
  };

  try {
    if (MAKE_WEBHOOK_URL.includes("SEU_WEBHOOK")) {
      throw new Error("Configure a URL do Webhook no arquivo js/config.js.");
    }

    const res = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    statusBox.className = "text-xs rounded-lg p-3 border bg-emerald-500/10 border-emerald-500/20 text-emerald-300 block";
    statusBox.textContent = "Sucesso: Dados da entidade e script gerados e sincronizados com a automação!";
  } catch (err) {
    statusBox.className = "text-xs rounded-lg p-3 border bg-amber-500/10 border-amber-500/20 text-amber-300 block";
    statusBox.textContent = `Aviso: ${err.message}. Seu código JSON-LD continua disponível para cópia manual acima.`;
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.innerHTML = `<span>Gerar & Enviar para Automação</span>`;
  }
});
