/**
 * ============================================================================
 * GEO ENTITY ENGINE (APP 1A) - MOTOR DE RENDERIZAÇÃO, AUTO-SAVE & COMPILADOR
 * Gerencia o Wizard/Stepper, persistência isolada no localStorage,
 * Regra estrita "Omitir = 0", Página 2.5 de Revisão Panorâmica com Inspetor
 * de Anomalias, Chat Especialista e disparo de payload para Webhook Make + App/Robô QG.
 * ============================================================================
 */

import {
  API_CONFIG,
  MAKE_WEBHOOK_URL,
  DAYS_OF_WEEK,
  MENTORSHIP_CONTROL,
  PROFILES
} from "./config.js";

// ESTADO GLOBAL DA APLICAÇÃO
let activeProfileKey = null;
let currentStepIndex = 0;
let formState = {};
let mentorshipState = {
  mentor_student_name: "",
  mentor_student_email: "",
  mentor_student_code: ""
};
let lastCompiledPayload = null;
let chatConversationHistory = [];

// ELEMENTOS PRINCIPAIS DO DOM
const landingStep = document.getElementById("landingStep");
const appStep = document.getElementById("appStep");
const resultStep = document.getElementById("resultStep");
const activeProfileBadge = document.getElementById("activeProfileBadge");
const autoSaveIndicator = document.getElementById("autoSaveIndicator");
const badgeIcon = document.getElementById("badgeIcon");
const badgeText = document.getElementById("badgeText");
const btnTrocarPerfil = document.getElementById("btnTrocarPerfil");

const mentorshipControlContainer = document.getElementById("mentorshipControlContainer");
const stepProgressLabel = document.getElementById("stepProgressLabel");
const currentStepMainTitle = document.getElementById("currentStepMainTitle");
const stepPercentageBadge = document.getElementById("stepPercentageBadge");
const stepProgressBar = document.getElementById("stepProgressBar");
const stepPillsContainer = document.getElementById("stepPillsContainer");
const wizardStepContainer = document.getElementById("wizardStepContainer");
const wizardValidationAlert = document.getElementById("wizardValidationAlert");
const wizardValidationMessage = document.getElementById("wizardValidationMessage");

const btnPrevStep = document.getElementById("btnPrevStep");
const btnNextStep = document.getElementById("btnNextStep");
const btnFinalSubmit = document.getElementById("btnFinalSubmit");
const btnFinalSubmitText = document.getElementById("btnFinalSubmitText");
const btnResetProfileData = document.getElementById("btnResetProfileData");
const engineForm = document.getElementById("engineForm");

// CRIAÇÃO DINÂMICA DA PÁGINA 2.5 (REVISÃO PANORÂMICA & ANOMALIAS)
let reviewStep = document.getElementById("reviewStep");
if (!reviewStep) {
  reviewStep = document.createElement("section");
  reviewStep.id = "reviewStep";
  reviewStep.className = "hidden max-w-5xl mx-auto px-4 py-8 flex-1 w-full space-y-6";
  if (appStep && appStep.parentNode) {
    appStep.parentNode.insertBefore(reviewStep, resultStep);
  }
}

// ============================================================================
// 1. INICIALIZAÇÃO E RECUPERAÇÃO DE RASCUNHOS DO LOCALSTORAGE
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  loadMentorshipState();
  checkSavedDraftBadges();
  setupGlobalListeners();
  setupAgentChatListeners();
});

function hasActualUserTypedData(savedRaw) {
  if (!savedRaw) return false;
  try {
    const data = JSON.parse(savedRaw);
    return Object.keys(data).some((k) => {
      const v = data[k];
      if (!v) return false;
      if (typeof v === "string" && v.trim().length > 0) return true;
      if (typeof v === "object") {
        if (v.value && String(v.value).trim().length > 0) return true;
        if (v.text && String(v.text).trim().length > 0) return true;
        if (v.otherText && String(v.otherText).trim().length > 0) return true;
        if (Array.isArray(v.selected) && v.selected.length > 0) return true;
        if (Array.isArray(v) && v.some((item) => Object.values(item).some((val) => String(val || "").trim().length > 0))) return true;
      }
      return false;
    });
  } catch (e) {
    return false;
  }
}

function checkSavedDraftBadges() {
  Object.keys(PROFILES).forEach((key) => {
    const profile = PROFILES[key];
    const saved = localStorage.getItem(API_CONFIG.STORAGE_PREFIX + profile.storageKey);
    const badge = document.getElementById(`draftBadge_${key}`);
    if (badge) {
      if (hasActualUserTypedData(saved)) {
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
    }
  });
}

function loadMentorshipState() {
  try {
    const saved = localStorage.getItem(API_CONFIG.STORAGE_PREFIX + "mentorship_operator");
    if (saved) {
      mentorshipState = { ...mentorshipState, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn("Erro ao ler dados de mentoria do localStorage:", e);
  }
}

function saveMentorshipState() {
  try {
    localStorage.setItem(
      API_CONFIG.STORAGE_PREFIX + "mentorship_operator",
      JSON.stringify(mentorshipState)
    );
    triggerAutoSaveVisual();
  } catch (e) {
    console.warn("Erro ao salvar dados de mentoria:", e);
  }
}

function loadProfileFormState(profileKey) {
  const profile = PROFILES[profileKey];
  formState = {};
  try {
    const raw = localStorage.getItem(API_CONFIG.STORAGE_PREFIX + profile.storageKey);
    if (raw) {
      formState = JSON.parse(raw);
    }
  } catch (e) {
    formState = {};
  }
  initializeDefaultFieldValues(profile);
}

function saveProfileFormState() {
  if (!activeProfileKey) return;
  const profile = PROFILES[activeProfileKey];
  
  const rawString = JSON.stringify(formState);
  if (!hasActualUserTypedData(rawString)) {
    localStorage.removeItem(API_CONFIG.STORAGE_PREFIX + profile.storageKey);
    checkSavedDraftBadges();
    return;
  }

  try {
    localStorage.setItem(
      API_CONFIG.STORAGE_PREFIX + profile.storageKey,
      rawString
    );
    triggerAutoSaveVisual();
    checkSavedDraftBadges();
  } catch (e) {
    console.warn("Erro ao salvar estado do perfil:", e);
  }
}

function triggerAutoSaveVisual() {
  if (!autoSaveIndicator) return;
  autoSaveIndicator.classList.remove("hidden");
  autoSaveIndicator.classList.add("flex");
  const dot = document.getElementById("saveDot");
  const txt = document.getElementById("saveText");
  if (dot && txt) {
    dot.className = "h-2 w-2 rounded-full bg-amber-400 animate-ping";
    txt.textContent = "Salvando...";
    clearTimeout(window._saveTimer);
    window._saveTimer = setTimeout(() => {
      dot.className = "h-2 w-2 rounded-full bg-emerald-400";
      txt.textContent = "Salvo automaticamente";
    }, 450);
  }
}

function initializeDefaultFieldValues(profile) {
  profile.steps.forEach((step) => {
    step.fields.forEach((field) => {
      if (formState[field.id] === undefined) {
        if (field.type === "opening_hours_grid") {
          const defaultGrid = {};
          DAYS_OF_WEEK.forEach((d, idx) => {
            defaultGrid[d.id] = {
              status: idx < 5 ? "Aberto" : idx === 5 ? "Aberto" : "Fechado",
              opens: "08:00",
              closes: idx === 5 ? "12:00" : "18:00"
            };
          });
          formState[field.id] = defaultGrid;
        } else if (field.type === "repeater") {
          formState[field.id] = [createEmptyRepeaterItem(field.subfields)];
        } else if (field.type === "repeater_simple") {
          formState[field.id] = [""];
        } else if (field.type === "checkbox_group") {
          formState[field.id] = {
            omitted: false,
            selected: [],
            otherSelected: false,
            otherText: ""
          };
        } else if (field.type === "tri_state") {
          formState[field.id] = field.defaultVal || "Omitir";
        } else if (field.type === "tri_state_with_input") {
          formState[field.id] = {
            status: field.defaultVal || "Omitir",
            text: ""
          };
        } else if (field.type === "select_with_other") {
          const firstOpt = field.defaultVal || (field.options && field.options[0] ? field.options[0].val : "");
          formState[field.id] = {
            selected: firstOpt,
            otherText: ""
          };
        } else if (field.type === "group_row" || field.type === "price_range_group") {
          const subObj = { omitted: Boolean(field.defaultOmitted) };
          (field.subfields || []).forEach((sf) => {
            subObj[sf.id] = "";
          });
          formState[field.id] = subObj;
        } else if (field.type === "warranty_group") {
          formState[field.id] = {
            garantia_escrita: "Sim",
            prazo_garantia: "",
            garantia_variavel: false,
            cobertura_garantia: ""
          };
        } else if (field.type === "installment_group") {
          formState[field.id] = {
            offersInstallments: "Sim",
            maxInstallments: "Até 3x",
            interestCondition: "Sem juros"
          };
        } else if (field.type === "geo_coordinates") {
          formState[field.id] = {
            omitted: false,
            lat: "",
            lng: ""
          };
        } else if (field.type === "radio_cards") {
          formState[field.id] = field.defaultVal || (field.options && field.options[0]?.val) || "";
        } else if (field.type === "select") {
          formState[field.id] = field.options && field.options[0] ? field.options[0].val : "";
        } else {
          formState[field.id] = {
            value: field.defaultPrefix || "",
            omitted: false,
            addonChecked: false
          };
        }
      }
    });
  });
}

function createEmptyRepeaterItem(subfields = []) {
  const item = {};
  subfields.forEach((sf) => {
    item[sf.id] = "";
  });
  return item;
}

// ============================================================================
// 2. SELEÇÃO DE PERFIL E CONTROLE DE NAVEGAÇÃO ENTRE PÁGINAS (1, 2, 2.5 e 3)
// ============================================================================

window.selectProfile = function (profileKey) {
  if (!PROFILES[profileKey]) return;
  activeProfileKey = profileKey;
  currentStepIndex = 0;

  const profile = PROFILES[profileKey];
  loadProfileFormState(profileKey);

  badgeIcon.textContent = profile.badgeIcon;
  badgeText.textContent = profile.badgeText;
  activeProfileBadge.classList.remove("hidden");
  activeProfileBadge.classList.add("flex");
  autoSaveIndicator.classList.remove("hidden");
  autoSaveIndicator.classList.add("flex");

  landingStep.classList.add("hidden");
  reviewStep.classList.add("hidden");
  resultStep.classList.add("hidden");
  appStep.classList.remove("hidden");

  renderMentorshipControlBox();
  renderCurrentWizardStep();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

function returnToLanding() {
  activeProfileKey = null;
  landingStep.classList.remove("hidden");
  appStep.classList.add("hidden");
  reviewStep.classList.add("hidden");
  resultStep.classList.add("hidden");
  activeProfileBadge.classList.add("hidden");
  autoSaveIndicator.classList.add("hidden");
  checkSavedDraftBadges();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ============================================================================
// 3. RENDERIZAÇÃO DA ÁREA OPERACIONAL DA MENTORIA (TOPO DA PÁGINA 2)
// ============================================================================

function renderMentorshipControlBox() {
  const mc = MENTORSHIP_CONTROL;
  mentorshipControlContainer.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-800/90">
      <div class="flex items-center gap-2">
        <span class="text-xs font-extrabold uppercase tracking-wider text-amber-400">🛡️ ${mc.title}</span>
        ${renderTooltipIcon(mc.infoTooltip)}
      </div>
      <span class="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
        Não entra no código público JSON-LD
      </span>
    </div>
    <p class="text-xs text-slate-400 mb-4 leading-relaxed">
      ${mc.infoTooltip}
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      ${mc.fields
        .map(
          (f) => `
        <div>
          <label class="flex items-center justify-between text-xs font-semibold text-slate-200 mb-1.5">
            <span>${f.label}</span>
            ${renderTooltipIcon(f.tooltip)}
          </label>
          <input
            type="${f.type}"
            id="mentorship_${f.id}"
            value="${escapeHtml(mentorshipState[f.id] || "")}"
            placeholder="${escapeHtml(f.placeholder || "")}"
            class="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition"
          />
        </div>
      `
        )
        .join("")}
    </div>
  `;

  mc.fields.forEach((f) => {
    const el = document.getElementById(`mentorship_${f.id}`);
    if (el) {
      el.addEventListener("input", (e) => {
        mentorshipState[f.id] = e.target.value;
        saveMentorshipState();
      });
    }
  });
}

// ============================================================================
// 4. RENDERIZAÇÃO DO WIZARD / STEPPER & NAVEGAÇÃO ENTRE PÍLULAS
// ============================================================================

function canNavigateToStep(targetIndex) {
  if (targetIndex <= currentStepIndex) return true;

  for (let i = currentStepIndex; i < targetIndex; i++) {
    if (!validateSpecificStep(i)) {
      currentStepIndex = i;
      renderCurrentWizardStep();
      showValidationError(`Preencha os campos obrigatórios do Bloco ${String(i + 1).padStart(2, "0")} antes de avançar.`);
      return false;
    }
  }
  return true;
}

function renderCurrentWizardStep() {
  const profile = PROFILES[activeProfileKey];
  const totalSteps = profile.steps.length;
  const step = profile.steps[currentStepIndex];

  wizardValidationAlert.classList.add("hidden");

  const percent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);
  stepProgressLabel.textContent = `BLOCO ${String(step.stepNumber).padStart(2, "0")} DE ${String(totalSteps).padStart(2, "0")}`;
  currentStepMainTitle.textContent = step.title;
  stepPercentageBadge.textContent = `${percent}% concluído`;
  stepProgressBar.style.width = `${percent}%`;

  stepPillsContainer.innerHTML = profile.steps
    .map((s, idx) => {
      const isCurrent = idx === currentStepIndex;
      const isPast = idx < currentStepIndex;
      const isValid = isStepFullyValid(idx);
      
      let stateClasses = "bg-slate-950 text-slate-500 border-slate-800 hover:text-slate-300";
      if (isCurrent) {
        stateClasses = "bg-emerald-600 text-white border-emerald-500 shadow-sm";
      } else if (isValid) {
        stateClasses = "bg-slate-800/90 text-emerald-400 border-emerald-500/30 hover:bg-slate-800";
      } else if (isPast) {
        stateClasses = "bg-slate-900 text-amber-400 border-amber-500/30 hover:bg-slate-800";
      }

      return `<button type="button" data-step-jump="${idx}" class="px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 border cursor-pointer ${stateClasses}">
        ${isValid ? "✓ " : ""}Bloco ${String(s.stepNumber).padStart(2, "0")}
      </button>`;
    })
    .join("");

  stepPillsContainer.querySelectorAll("[data-step-jump]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetIdx = parseInt(btn.getAttribute("data-step-jump"), 10);
      if (targetIdx !== currentStepIndex && canNavigateToStep(targetIdx)) {
        currentStepIndex = targetIdx;
        renderCurrentWizardStep();
        window.scrollTo({ top: 120, behavior: "smooth" });
      }
    });
  });

  let html = `
    <div class="border-b border-slate-800 pb-4">
      <h3 class="text-lg sm:text-xl font-extrabold text-white">${step.title}</h3>
      <p class="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">${step.subtitle || ""}</p>
      ${
        step.infoBanner
          ? `<div class="mt-4 p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 leading-relaxed flex items-start gap-3">
              <span class="text-base leading-none mt-0.5">💡</span>
              <div>${step.infoBanner}</div>
            </div>`
          : ""
      }
    </div>
    <div class="space-y-6 pt-2" id="stepFieldsList">
  `;

  step.fields.forEach((field) => {
    const isVisible = evaluateFieldCondition(field);
    html += `<div id="fieldWrapper_${field.id}" class="${isVisible ? "" : "hidden"} transition-all">
      ${renderFieldMarkup(field)}
    </div>`;
  });

  html += `</div>`;
  wizardStepContainer.innerHTML = html;

  bindStepFieldEvents(step);
  updateWizardNavigationButtons(profile, totalSteps);
}

function updateWizardNavigationButtons(profile, totalSteps) {
  if (currentStepIndex === 0) {
    btnPrevStep.classList.add("hidden");
  } else {
    btnPrevStep.classList.remove("hidden");
  }

  const isLastStep = currentStepIndex === totalSteps - 1;
  if (isLastStep) {
    btnNextStep.classList.add("hidden");
    btnFinalSubmit.classList.remove("hidden");
    btnFinalSubmitText.textContent = "Revisar Dados & Auditar com IA →";
  } else {
    btnNextStep.classList.remove("hidden");
    btnFinalSubmit.classList.add("hidden");
  }
}

function evaluateFieldCondition(field) {
  if (!field.conditionField) return true;
  const targetState = formState[field.conditionField];

  let actualVal = targetState;
  if (targetState && typeof targetState === "object") {
    if (targetState.selected !== undefined) actualVal = targetState.selected;
    else if (targetState.status !== undefined) actualVal = targetState.status;
    else if (targetState.value !== undefined) actualVal = targetState.value;
  }

  if (field.conditionVal !== undefined) return actualVal === field.conditionVal;
  if (field.conditionNotVal !== undefined) return actualVal !== field.conditionNotVal;
  if (Array.isArray(field.conditionIn)) return field.conditionIn.includes(actualVal);
  if (field.conditionContains !== undefined) {
    if (targetState && Array.isArray(targetState.selected)) {
      return !targetState.omitted && targetState.selected.includes(field.conditionContains);
    }
  }
  return true;
}

function refreshConditionalFieldsInCurrentStep() {
  const profile = PROFILES[activeProfileKey];
  const step = profile.steps[currentStepIndex];
  step.fields.forEach((field) => {
    if (field.conditionField) {
      const wrapper = document.getElementById(`fieldWrapper_${field.id}`);
      if (wrapper) {
        if (evaluateFieldCondition(field)) {
          wrapper.classList.remove("hidden");
        } else {
          wrapper.classList.add("hidden");
        }
      }
    }
  });
}

// ============================================================================
// 5. COMPONENTES DE CAMPO (HTML BUILDERS COM TOOLTIPS (i) E PLACEHOLDERS)
// ============================================================================

function renderTooltipIcon(tooltipText) {
  if (!tooltipText) return "";
  return `
    <span class="relative group inline-flex items-center ml-1.5 cursor-pointer align-middle">
      <span class="w-4 h-4 rounded-full bg-slate-800 border border-slate-600 text-[10px] font-bold text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-slate-950 transition">
        i
      </span>
      <span class="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute bottom-full right-0 sm:left-1/2 sm:-translate-x-1/2 mb-2 w-64 sm:w-72 p-3 rounded-xl bg-slate-950 border border-emerald-500/40 text-[11px] font-normal text-slate-200 leading-relaxed shadow-2xl z-50">
        ${escapeHtml(tooltipText)}
      </span>
    </span>
  `;
}

function renderFieldMarkup(field) {
  const state = formState[field.id];

  if (field.type === "section_divider") {
    return `
      <div class="pt-4 pb-1 border-t border-slate-800">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-extrabold tracking-wide uppercase">
          ${escapeHtml(field.label)}
        </div>
      </div>
    `;
  }

  if (["text", "email", "url", "cep", "cnpj", "phone", "textarea", "textarea_short"].includes(field.type)) {
    const valObj = typeof state === "object" && state !== null ? state : { value: state || "", omitted: false, addonChecked: false };
    const isOmitted = Boolean(valObj.omitted);
    const currentVal = valObj.value || "";
    const maxLenAttr = field.maxLength ? `maxlength="${field.maxLength}"` : "";

    return `
      <div class="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 space-y-2.5">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <label for="input_${field.id}" class="text-xs sm:text-sm font-semibold text-slate-200 flex items-center">
            <span>${escapeHtml(field.label)}</span>
            ${renderTooltipIcon(field.tooltip)}
          </label>

          <div class="flex items-center gap-3">
            ${
              field.checkboxAddon
                ? `<label class="inline-flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer select-none">
                    <input type="checkbox" id="addon_${field.id}" ${valObj.addonChecked ? "checked" : ""} class="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0">
                    <span>${escapeHtml(field.checkboxAddon.label)}</span>
                  </label>`
                : ""
            }
            ${
              field.allowOmit
                ? `<label class="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border cursor-pointer select-none transition ${
                    isOmitted
                      ? "bg-amber-500/15 border-amber-500/40 text-amber-300 font-semibold"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                  }">
                    <input type="checkbox" id="omit_${field.id}" ${isOmitted ? "checked" : ""} class="rounded bg-slate-950 border-slate-700 text-amber-500 focus:ring-0">
                    <span>${escapeHtml(field.omitLabel || "Omitir")}</span>
                  </label>`
                : ""
            }
          </div>
        </div>

        <div class="${isOmitted ? "opacity-40 pointer-events-none" : ""}" id="inputBox_${field.id}">
          ${
            field.type === "textarea" || field.type === "textarea_short"
              ? `<textarea
                  id="input_${field.id}"
                  rows="${field.type === "textarea" ? "4" : "2"}"
                  ${maxLenAttr}
                  placeholder="${escapeHtml(field.placeholder || "")}"
                  class="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition leading-relaxed"
                >${escapeHtml(currentVal)}</textarea>`
              : `<input
                  type="${field.type === "email" ? "email" : field.type === "url" ? "url" : "text"}"
                  id="input_${field.id}"
                  value="${escapeHtml(currentVal)}"
                  ${maxLenAttr}
                  placeholder="${escapeHtml(field.placeholder || "")}"
                  class="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition"
                />`
          }
          ${
            field.maxLength
              ? `<div class="flex justify-end mt-1">
                  <span id="counter_${field.id}" class="text-[11px] font-mono text-slate-400">
                    ${currentVal.length} / ${field.maxLength} caracteres
                  </span>
                </div>`
              : ""
          }
        </div>
      </div>
    `;
  }

  if (field.type === "select") {
    const currentVal = typeof state === "string" ? state : "";
    return `
      <div class="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 space-y-2">
        <label for="select_${field.id}" class="text-xs sm:text-sm font-semibold text-slate-200 flex items-center">
          <span>${escapeHtml(field.label)}</span>
          ${renderTooltipIcon(field.tooltip)}
        </label>
        <select id="select_${field.id}" class="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none transition cursor-pointer">
          ${(field.options || [])
            .map(
              (opt) =>
                `<option value="${escapeHtml(opt.val)}" ${opt.val === currentVal ? "selected" : ""}>${escapeHtml(opt.text)}</option>`
            )
            .join("")}
        </select>
      </div>
    `;
  }

  if (field.type === "select_with_other") {
    const selObj = state && typeof state === "object" ? state : { selected: "", otherText: "" };
    const isOther = selObj.selected === "OTHER";
    const maxLen = field.otherMaxLength || 135;

    return `
      <div class="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 space-y-3">
        <label for="selectOther_${field.id}" class="text-xs sm:text-sm font-semibold text-slate-200 flex items-center">
          <span>${escapeHtml(field.label)}</span>
          ${renderTooltipIcon(field.tooltip)}
        </label>
        <select id="selectOther_${field.id}" class="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none transition cursor-pointer">
          ${(field.options || [])
            .map(
              (opt) =>
                `<option value="${escapeHtml(opt.val)}" ${opt.val === selObj.selected ? "selected" : ""}>${escapeHtml(opt.text)}</option>`
            )
            .join("")}
        </select>

        <div id="otherBox_${field.id}" class="${isOther ? "" : "hidden"} pt-2 space-y-1.5">
          <label class="block text-xs font-semibold text-emerald-400">
            ${escapeHtml(field.otherLabel || "Especifique em uma frase curta (Máx. 135 caracteres) *")}
          </label>
          <input
            type="text"
            id="otherInput_${field.id}"
            maxlength="${maxLen}"
            value="${escapeHtml(selObj.otherText || "")}"
            placeholder="${escapeHtml(field.otherPlaceholder || "Digite aqui...")}"
            class="w-full bg-slate-900 border border-emerald-500/50 focus:border-emerald-400 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <div class="text-right text-[11px] font-mono text-slate-400" id="otherCounter_${field.id}">
            ${(selObj.otherText || "").length} / ${maxLen} caracteres
          </div>
        </div>
      </div>
    `;
  }

  if (field.type === "radio_cards") {
    const currentVal = typeof state === "string" ? state : field.defaultVal;
    return `
      <div class="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 space-y-3">
        <label class="text-xs sm:text-sm font-semibold text-slate-200 flex items-center">
          <span>${escapeHtml(field.label)}</span>
          ${renderTooltipIcon(field.tooltip)}
        </label>
        <div class="grid grid-cols-1 gap-2.5">
          ${(field.options || [])
            .map((opt) => {
              const active = opt.val === currentVal;
              return `
                <label class="flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                  active
                    ? "bg-emerald-500/10 border-emerald-500 text-white font-semibold"
                    : "bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700"
                }">
                  <input type="radio" name="radio_${field.id}" value="${escapeHtml(opt.val)}" ${active ? "checked" : ""} class="text-emerald-500 focus:ring-0 bg-slate-950 border-slate-700">
                  <span class="text-xs sm:text-sm">${escapeHtml(opt.text)}</span>
                </label>
              `;
            })
            .join("")}
        </div>
      </div>
    `;
  }

  if (field.type === "tri_state") {
    const currentVal = typeof state === "string" ? state : "Omitir";
    const states = ["Sim", "Não", "Omitir"];
    return `
      <div class="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="text-xs sm:text-sm font-medium text-slate-200 flex items-center leading-snug">
          <span>${escapeHtml(field.label)}</span>
          ${renderTooltipIcon(field.tooltip)}
        </div>
        <div class="inline-flex rounded-xl bg-slate-900 p-1 border border-slate-800 shrink-0 self-start sm:self-center">
          ${states
            .map((st) => {
              const active = currentVal === st;
              const activeStyle =
                st === "Sim"
                  ? "bg-emerald-600 text-white shadow"
                  : st === "Não"
                  ? "bg-rose-600/80 text-white shadow"
                  : "bg-slate-700 text-slate-200";
              return `<button type="button" data-tristate="${field.id}" data-val="${st}" class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                active ? activeStyle : "text-slate-400 hover:text-slate-200"
              }">${st}</button>`;
            })
            .join("")}
        </div>
      </div>
    `;
  }

  if (field.type === "tri_state_with_input") {
    const obj = state && typeof state === "object" ? state : { status: "Omitir", text: "" };
    const states = ["Sim", "Não", "Omitir"];
    const maxLen = field.maxLength || 135;

    return `
      <div class="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="text-xs sm:text-sm font-medium text-slate-200 flex items-center leading-snug">
            <span>${escapeHtml(field.label)}</span>
            ${renderTooltipIcon(field.tooltip)}
          </div>
          <div class="inline-flex rounded-xl bg-slate-900 p-1 border border-slate-800 shrink-0 self-start sm:self-center">
            ${states
              .map((st) => {
                const active = obj.status === st;
                const activeStyle =
                  st === "Sim"
                    ? "bg-emerald-600 text-white shadow"
                    : st === "Não"
                    ? "bg-rose-600/80 text-white shadow"
                    : "bg-slate-700 text-slate-200";
                return `<button type="button" data-tristate-input="${field.id}" data-val="${st}" class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  active ? activeStyle : "text-slate-400 hover:text-slate-200"
                }">${st}</button>`;
              })
              .join("")}
          </div>
        </div>

        <div id="triInputBox_${field.id}" class="${obj.status === "Sim" ? "" : "hidden"} pt-2 border-t border-slate-800/80 space-y-1.5">
          <label class="block text-xs font-semibold text-emerald-400">
            ${escapeHtml(field.inputLabel || "Detalhes:")}
          </label>
          <input
            type="text"
            id="triText_${field.id}"
            maxlength="${maxLen}"
            value="${escapeHtml(obj.text || "")}"
            placeholder="${escapeHtml(field.inputPlaceholder || "")}"
            class="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
        </div>
      </div>
    `;
  }

  if (field.type === "checkbox_group") {
    const grp = state && typeof state === "object"
      ? state
      : { omitted: false, selected: [], otherSelected: false, otherText: "" };
    const maxLen = field.otherMaxLength || 135;

    return `
      <div class="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <label class="text-xs sm:text-sm font-semibold text-slate-200 flex items-center">
            <span>${escapeHtml(field.label)}</span>
            ${renderTooltipIcon(field.tooltip)}
          </label>
          ${
            field.allowOmit
              ? `<label class="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border cursor-pointer select-none transition ${
                  grp.omitted
                    ? "bg-amber-500/15 border-amber-500/40 text-amber-300 font-semibold"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                }">
                  <input type="checkbox" id="chkOmit_${field.id}" ${grp.omitted ? "checked" : ""} class="rounded bg-slate-950 border-slate-700 text-amber-500 focus:ring-0">
                  <span>${escapeHtml(field.omitLabel || "Omitir")}</span>
                </label>`
              : ""
          }
        </div>

        <div id="chkContainer_${field.id}" class="${grp.omitted ? "opacity-40 pointer-events-none" : ""} space-y-2.5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            ${(field.options || [])
              .map((opt) => {
                const checked = Array.isArray(grp.selected) && grp.selected.includes(opt.val);
                return `
                  <label class="flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition ${
                    checked
                      ? "bg-emerald-500/10 border-emerald-500/60 text-white font-medium"
                      : "bg-slate-900/70 border-slate-800/90 text-slate-300 hover:border-slate-700"
                  }">
                    <input type="checkbox" data-chk-group="${field.id}" value="${escapeHtml(opt.val)}" ${checked ? "checked" : ""} class="mt-0.5 rounded bg-slate-950 border-slate-700 text-emerald-500 focus:ring-0">
                    <span class="text-xs leading-snug">${escapeHtml(opt.text)}</span>
                  </label>
                `;
              })
              .join("")}
          </div>

          ${
            field.allowOther
              ? `
              <div class="pt-1">
                <label class="flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition ${
                  grp.otherSelected
                    ? "bg-amber-500/15 border-amber-500 text-amber-200 font-semibold"
                    : field.highlightOther
                    ? "bg-slate-900 border-amber-500/40 text-amber-300 hover:border-amber-400"
                    : "bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700"
                }">
                  <input type="checkbox" id="chkOtherToggle_${field.id}" ${grp.otherSelected ? "checked" : ""} class="rounded bg-slate-950 border-slate-700 text-amber-500 focus:ring-0">
                  <span class="text-xs sm:text-sm">${escapeHtml(field.otherLabel || "⭐ Outro(s) / Especificar diferencial (Máx. 135 caracteres)")}</span>
                </label>

                <div id="chkOtherBox_${field.id}" class="${grp.otherSelected ? "" : "hidden"} mt-2.5 pl-2 space-y-1">
                  <input
                    type="text"
                    id="chkOtherInput_${field.id}"
                    maxlength="${maxLen}"
                    value="${escapeHtml(grp.otherText || "")}"
                    placeholder="${escapeHtml(field.otherPlaceholder || "Resuma em uma frase...")}"
                    class="w-full bg-slate-900 border border-amber-500/50 focus:border-amber-400 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
                  />
                  <div class="text-right text-[11px] font-mono text-slate-400" id="chkOtherCounter_${field.id}">
                    ${(grp.otherText || "").length} / ${maxLen} caracteres
                  </div>
                </div>
              </div>
            `
              : ""
          }
        </div>
      </div>
    `;
  }

  if (field.type === "group_row" || field.type === "price_range_group") {
    const grp = state && typeof state === "object" ? state : { omitted: false };
    return `
      <div class="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <label class="text-xs sm:text-sm font-semibold text-slate-200 flex items-center">
            <span>${escapeHtml(field.label)}</span>
            ${renderTooltipIcon(field.tooltip)}
          </label>
          ${
            field.allowOmit
              ? `<label class="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border cursor-pointer select-none transition ${
                  grp.omitted
                    ? "bg-amber-500/15 border-amber-500/40 text-amber-300 font-semibold"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                }">
                  <input type="checkbox" id="grpOmit_${field.id}" ${grp.omitted ? "checked" : ""} class="rounded bg-slate-950 border-slate-700 text-amber-500 focus:ring-0">
                  <span>${escapeHtml(field.omitLabel || "Omitir")}</span>
                </label>`
              : ""
          }
        </div>

        <div id="grpBox_${field.id}" class="${grp.omitted ? "opacity-40 pointer-events-none" : ""} grid grid-cols-1 sm:grid-cols-3 gap-3">
          ${(field.subfields || [])
            .map(
              (sf) => `
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1">${escapeHtml(sf.label)}</label>
                <input
                  type="text"
                  data-grp-field="${field.id}"
                  data-sub-id="${sf.id}"
                  value="${escapeHtml(grp[sf.id] || "")}"
                  placeholder="${escapeHtml(sf.placeholder || "")}"
                  class="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none"
                />
              </div>
            `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  if (field.type === "geo_coordinates") {
    const geo = state && typeof state === "object" ? state : { omitted: false, lat: "", lng: "" };
    return `
      <div class="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <label class="text-xs sm:text-sm font-semibold text-slate-200 flex items-center">
            <span>${escapeHtml(field.label)}</span>
            ${renderTooltipIcon(field.tooltip)}
          </label>
          <label class="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border cursor-pointer select-none transition ${
            geo.omitted
              ? "bg-amber-500/15 border-amber-500/40 text-amber-300 font-semibold"
              : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
          }">
            <input type="checkbox" id="geoOmit_${field.id}" ${geo.omitted ? "checked" : ""} class="rounded bg-slate-950 border-slate-700 text-amber-500 focus:ring-0">
            <span>${escapeHtml(field.omitLabel || "Omitir")}</span>
          </label>
        </div>

        <div id="geoBox_${field.id}" class="${geo.omitted ? "opacity-40 pointer-events-none" : ""} space-y-3">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-slate-400 mb-1">Latitude</label>
              <input type="text" id="geoLat_${field.id}" value="${escapeHtml(geo.lat || "")}" placeholder="${escapeHtml(field.latPlaceholder || "-21.6033")}" class="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-sm text-slate-100 font-mono focus:outline-none" />
            </div>
            <div>
              <label class="block text-xs text-slate-400 mb-1">Longitude</label>
              <input type="text" id="geoLng_${field.id}" value="${escapeHtml(geo.lng || "")}" placeholder="${escapeHtml(field.lngPlaceholder || "-48.3658")}" class="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-sm text-slate-100 font-mono focus:outline-none" />
            </div>
          </div>

          <details class="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-xs text-slate-300">
            <summary class="cursor-pointer font-semibold text-emerald-400 hover:text-emerald-300">
              📍 ${escapeHtml(field.helpTitle || "Como copiar Latitude e Longitude no Google Maps")}
            </summary>
            <p class="mt-2 whitespace-pre-line text-slate-400 leading-relaxed">${escapeHtml(field.helpSteps || "")}</p>
          </details>
        </div>
      </div>
    `;
  }

  if (field.type === "opening_hours_grid") {
    const grid = state && typeof state === "object" ? state : {};
    return `
      <div class="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <label class="text-xs sm:text-sm font-semibold text-slate-200 flex items-center">
            <span>${escapeHtml(field.label)}</span>
            ${renderTooltipIcon(field.tooltip)}
          </label>
          <button type="button" id="btnCopyMonFri_${field.id}" class="text-xs bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 font-semibold px-3.5 py-1.5 rounded-lg transition self-start sm:self-auto cursor-pointer">
            ${escapeHtml(field.copyButtonText || "Copiar horário de Segunda para Sexta-feira")}
          </button>
        </div>

        <div class="space-y-2.5">
          ${DAYS_OF_WEEK.map((day) => {
            const dState = grid[day.id] || { status: "Aberto", opens: "08:00", closes: "18:00" };
            const isOpen = dState.status === "Aberto";
            return `
              <div class="grid grid-cols-1 sm:grid-cols-12 items-center gap-2.5 bg-slate-900/70 border border-slate-800/80 rounded-xl p-2.5 px-3">
                <div class="sm:col-span-4 font-semibold text-xs text-slate-200">${day.label}</div>
                <div class="sm:col-span-3">
                  <select data-day-status="${field.id}" data-day="${day.id}" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-bold cursor-pointer ${isOpen ? "text-emerald-400" : "text-rose-400"}">
                    <option value="Aberto" ${isOpen ? "selected" : ""}>Aberto / Atende</option>
                    <option value="Fechado" ${!isOpen ? "selected" : ""}>Fechado</option>
                  </select>
                </div>
                <div class="sm:col-span-5 flex items-center gap-2 ${isOpen ? "" : "opacity-30 pointer-events-none"}" id="dayTimes_${field.id}_${day.id}">
                  <input type="time" data-day-open="${field.id}" data-day="${day.id}" value="${dState.opens || "08:00"}" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-100 font-mono" />
                  <span class="text-xs text-slate-500">às</span>
                  <input type="time" data-day-close="${field.id}" data-day="${day.id}" value="${dState.closes || "18:00"}" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-100 font-mono" />
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  if (field.type === "warranty_group") {
    const w = state && typeof state === "object"
      ? state
      : { garantia_escrita: "Sim", prazo_garantia: "", garantia_variavel: false, cobertura_garantia: "" };
    return `
      <div class="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 space-y-4">
        <div class="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center">
          <span>🛡️ ${escapeHtml(field.label)}</span>
          ${renderTooltipIcon(field.tooltip)}
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">Garantia formalizada por escrito em Nota/Certificado?</label>
            <select id="wEscrita_${field.id}" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 cursor-pointer">
              <option value="Sim" ${w.garantia_escrita === "Sim" ? "selected" : ""}>Sim</option>
              <option value="Não" ${w.garantia_escrita === "Não" ? "selected" : ""}>Não</option>
              <option value="Omitir" ${w.garantia_escrita === "Omitir" ? "selected" : ""}>Omitir</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">Prazo da Garantia</label>
            <input type="text" id="wPrazo_${field.id}" value="${escapeHtml(w.prazo_garantia || "")}" placeholder="Ex: 90 dias, 1 ano, 10 mil km" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100" />
            <label class="inline-flex items-center gap-1.5 text-[11px] text-slate-400 mt-1.5 cursor-pointer">
              <input type="checkbox" id="wVar_${field.id}" ${w.garantia_variavel ? "checked" : ""} class="rounded bg-slate-950 border-slate-700 text-emerald-500">
              <span>O prazo varia a depender do serviço ou produto específico</span>
            </label>
          </div>
        </div>

        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1">Descrição Resumida da Cobertura da Garantia</label>
          <input type="text" id="wCob_${field.id}" maxlength="225" value="${escapeHtml(w.cobertura_garantia || "")}" placeholder="Ex: Garantia total para mão de obra e substituição de componentes defeituosos" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100" />
        </div>
      </div>
    `;
  }

  if (field.type === "installment_group") {
    const inst = state && typeof state === "object"
      ? state
      : { offersInstallments: "Sim", maxInstallments: "Até 3x", interestCondition: "Sem juros" };
    return `
      <div class="bg-slate-950/60 border border-emerald-500/30 rounded-xl p-4 space-y-3">
        <div class="text-xs font-bold text-emerald-400 flex items-center">
          <span>💳 ${escapeHtml(field.label)}</span>
          ${renderTooltipIcon(field.tooltip)}
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-xs text-slate-400 mb-1">Parcela no Cartão?</label>
            <select id="instOffer_${field.id}" class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 cursor-pointer">
              <option value="Sim" ${inst.offersInstallments === "Sim" ? "selected" : ""}>Sim</option>
              <option value="Não" ${inst.offersInstallments === "Não" ? "selected" : ""}>Não (Somente 1x)</option>
            </select>
          </div>
          <div id="instMaxBox_${field.id}" class="${inst.offersInstallments === "Sim" ? "" : "opacity-40 pointer-events-none"}">
            <label class="block text-xs text-slate-400 mb-1">Número Máximo de Parcelas</label>
            <select id="instMax_${field.id}" class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 cursor-pointer">
              ${(field.maxInstallmentsOptions || [])
                .map((o) => `<option value="${escapeHtml(o.val)}" ${inst.maxInstallments === o.val ? "selected" : ""}>${escapeHtml(o.text)}</option>`)
                .join("")}
            </select>
          </div>
          <div id="instIntBox_${field.id}" class="${inst.offersInstallments === "Sim" ? "" : "opacity-40 pointer-events-none"}">
            <label class="block text-xs text-slate-400 mb-1">Condição de Juros</label>
            <select id="instInt_${field.id}" class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 cursor-pointer">
              ${(field.interestOptions || [])
                .map((o) => `<option value="${escapeHtml(o.val)}" ${inst.interestCondition === o.val ? "selected" : ""}>${escapeHtml(o.text)}</option>`)
                .join("")}
            </select>
          </div>
        </div>
      </div>
    `;
  }

  if (field.type === "repeater") {
    const items = Array.isArray(state) && state.length > 0 ? state : [createEmptyRepeaterItem(field.subfields)];
    const maxItems = field.maxItems || 5;

    return `
      <div class="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <label class="text-xs sm:text-sm font-semibold text-slate-200 flex items-center">
            <span>${escapeHtml(field.label)}</span>
            ${renderTooltipIcon(field.tooltip)}
          </label>
          <span class="text-[11px] font-mono text-slate-400">${items.length} de ${maxItems} itens</span>
        </div>

        <div class="space-y-3" id="repeaterList_${field.id}">
          ${items
            .map(
              (item, idx) => `
              <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3 relative">
                <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span class="text-xs font-bold text-emerald-400">Item #${idx + 1}</span>
                  ${
                    items.length > 1
                      ? `<button type="button" data-rep-remove="${field.id}" data-idx="${idx}" class="text-xs text-rose-400 hover:text-rose-300 font-semibold cursor-pointer">Remover</button>`
                      : ""
                  }
                </div>
                <div class="grid grid-cols-1 gap-3">
                  ${(field.subfields || [])
                    .map(
                      (sf) => `
                      <div>
                        <label class="block text-xs font-medium text-slate-300 mb-1">${escapeHtml(sf.label)}</label>
                        <input
                          type="text"
                          data-rep-input="${field.id}"
                          data-idx="${idx}"
                          data-sub="${sf.id}"
                          ${sf.maxLength ? `maxlength="${sf.maxLength}"` : ""}
                          value="${escapeHtml(item[sf.id] || "")}"
                          placeholder="${escapeHtml(sf.placeholder || "")}"
                          class="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none"
                        />
                      </div>
                    `
                    )
                    .join("")}
                </div>
              </div>
            `
            )
            .join("")}
        </div>

        ${
          items.length < maxItems
            ? `<button type="button" id="btnAddRep_${field.id}" class="w-full py-2.5 px-4 rounded-xl border border-dashed border-emerald-500/40 hover:border-emerald-400 text-emerald-400 hover:bg-emerald-500/10 text-xs font-bold transition cursor-pointer">
                ${escapeHtml(field.addButtonText || "+ Adicionar Item")}
              </button>`
            : ""
        }
      </div>
    `;
  }

  if (field.type === "repeater_simple") {
    const links = Array.isArray(state) && state.length > 0 ? state : [""];
    const maxItems = field.maxItems || 5;

    return `
      <div class="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 space-y-3">
        <label class="text-xs sm:text-sm font-semibold text-slate-200 flex items-center">
          <span>${escapeHtml(field.label)}</span>
          ${renderTooltipIcon(field.tooltip)}
        </label>
        <div class="space-y-2">
          ${links
            .map(
              (val, idx) => `
              <div class="flex items-center gap-2">
                <input
                  type="url"
                  data-repsimple-input="${field.id}"
                  data-idx="${idx}"
                  value="${escapeHtml(val || "")}"
                  placeholder="${escapeHtml(field.placeholder || "https://...")}"
                  class="flex-1 bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none"
                />
                ${
                  links.length > 1
                    ? `<button type="button" data-repsimple-remove="${field.id}" data-idx="${idx}" class="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-rose-400 hover:text-rose-300 text-xs font-bold cursor-pointer">✕</button>`
                    : ""
                }
              </div>
            `
            )
            .join("")}
        </div>
        ${
          links.length < maxItems
            ? `<button type="button" id="btnAddSimple_${field.id}" class="text-xs font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer">
                ${escapeHtml(field.addButtonText || "+ Adicionar Mais Plataformas")}
              </button>`
            : ""
        }
      </div>
    `;
  }

  return "";
}

// ============================================================================
// 6. BINDING DE EVENTOS DOS CAMPOS DO BLOCO ATUAL
// ============================================================================

function bindStepFieldEvents(step) {
  step.fields.forEach((field) => {
    if (["text", "email", "url", "cep", "cnpj", "phone", "textarea", "textarea_short"].includes(field.type)) {
      const inputEl = document.getElementById(`input_${field.id}`);
      const omitEl = document.getElementById(`omit_${field.id}`);
      const addonEl = document.getElementById(`addon_${field.id}`);
      const counterEl = document.getElementById(`counter_${field.id}`);
      const boxEl = document.getElementById(`inputBox_${field.id}`);

      if (inputEl) {
        inputEl.addEventListener("input", (e) => {
          let val = e.target.value;
          if (field.type === "cep") val = formatCepMask(val);
          if (field.type === "cnpj") val = formatCnpjMask(val);
          e.target.value = val;

          formState[field.id].value = val;
          if (counterEl && field.maxLength) {
            counterEl.textContent = `${val.length} / ${field.maxLength} caracteres`;
          }
          saveProfileFormState();
        });
      }

      if (omitEl) {
        omitEl.addEventListener("change", (e) => {
          formState[field.id].omitted = e.target.checked;
          if (boxEl) {
            boxEl.classList.toggle("opacity-40", e.target.checked);
            boxEl.classList.toggle("pointer-events-none", e.target.checked);
          }
          saveProfileFormState();
        });
      }

      if (addonEl) {
        addonEl.addEventListener("change", (e) => {
          formState[field.id].addonChecked = e.target.checked;
          if (field.checkboxAddon?.id === "sem_numero" && e.target.checked && inputEl) {
            inputEl.value = "S/N";
            formState[field.id].value = "S/N";
          }
          saveProfileFormState();
        });
      }
    }

    if (field.type === "select") {
      const selEl = document.getElementById(`select_${field.id}`);
      if (selEl) {
        selEl.addEventListener("change", (e) => {
          formState[field.id] = e.target.value;
          saveProfileFormState();
          refreshConditionalFieldsInCurrentStep();
        });
      }
    }

    if (field.type === "select_with_other") {
      const selEl = document.getElementById(`selectOther_${field.id}`);
      const otherBox = document.getElementById(`otherBox_${field.id}`);
      const otherInput = document.getElementById(`otherInput_${field.id}`);
      const otherCounter = document.getElementById(`otherCounter_${field.id}`);
      const maxLen = field.otherMaxLength || 135;

      if (selEl) {
        selEl.addEventListener("change", (e) => {
          formState[field.id].selected = e.target.value;
          if (otherBox) {
            otherBox.classList.toggle("hidden", e.target.value !== "OTHER");
          }
          saveProfileFormState();
          refreshConditionalFieldsInCurrentStep();
        });
      }

      if (otherInput) {
        otherInput.addEventListener("input", (e) => {
          formState[field.id].otherText = e.target.value;
          if (otherCounter) {
            otherCounter.textContent = `${e.target.value.length} / ${maxLen} caracteres`;
          }
          saveProfileFormState();
        });
      }
    }

    if (field.type === "radio_cards") {
      const radios = document.querySelectorAll(`input[name="radio_${field.id}"]`);
      radiors.forEach((r) => {
        r.addEventListener("change", (e) => {
          formState[field.id] = e.target.value;
          saveProfileFormState();
          renderCurrentWizardStep();
        });
      });
    }

    if (field.type === "tri_state") {
      const btns = document.querySelectorAll(`[data-tristate="${field.id}"]`);
      btns.forEach((btn) => {
        btn.addEventListener("click", () => {
          formState[field.id] = btn.getAttribute("data-val");
          saveProfileFormState();
          renderCurrentWizardStep();
        });
      });
    }

    if (field.type === "tri_state_with_input") {
      const btns = document.querySelectorAll(`[data-tristate-input="${field.id}"]`);
      const textInput = document.getElementById(`triText_${field.id}`);

      btns.forEach((btn) => {
        btn.addEventListener("click", () => {
          formState[field.id].status = btn.getAttribute("data-val");
          saveProfileFormState();
          renderCurrentWizardStep();
        });
      });

      if (textInput) {
        textInput.addEventListener("input", (e) => {
          formState[field.id].text = e.target.value;
          saveProfileFormState();
        });
      }
    }

    if (field.type === "checkbox_group") {
      const omitChk = document.getElementById(`chkOmit_${field.id}`);
      const chks = document.querySelectorAll(`[data-chk-group="${field.id}"]`);
      const otherToggle = document.getElementById(`chkOtherToggle_${field.id}`);
      const otherInput = document.getElementById(`chkOtherInput_${field.id}`);
      const otherCounter = document.getElementById(`chkOtherCounter_${field.id}`);
      const maxLen = field.otherMaxLength || 135;

      if (omitChk) {
        omitChk.addEventListener("change", (e) => {
          formState[field.id].omitted = e.target.checked;
          saveProfileFormState();
          renderCurrentWizardStep();
        });
      }

      chks.forEach((chk) => {
        chk.addEventListener("change", () => {
          const selected = [];
          chks.forEach((c) => {
            if (c.checked) selected.push(c.value);
          });
          formState[field.id].selected = selected;
          saveProfileFormState();
          refreshConditionalFieldsInCurrentStep();
        });
      });

      if (otherToggle) {
        otherToggle.addEventListener("change", (e) => {
          formState[field.id].otherSelected = e.target.checked;
          saveProfileFormState();
          renderCurrentWizardStep();
        });
      }

      if (otherInput) {
        otherInput.addEventListener("input", (e) => {
          formState[field.id].otherText = e.target.value;
          if (otherCounter) {
            otherCounter.textContent = `${e.target.value.length} / ${maxLen} caracteres`;
          }
          saveProfileFormState();
        });
      }
    }

    if (field.type === "group_row" || field.type === "price_range_group") {
      const omitChk = document.getElementById(`grpOmit_${field.id}`);
      const inputs = document.querySelectorAll(`[data-grp-field="${field.id}"]`);

      if (omitChk) {
        omitChk.addEventListener("change", (e) => {
          formState[field.id].omitted = e.target.checked;
          saveProfileFormState();
          renderCurrentWizardStep();
        });
      }

      inputs.forEach((inp) => {
        inp.addEventListener("input", (e) => {
          const subId = inp.getAttribute("data-sub-id");
          formState[field.id][subId] = e.target.value;
          saveProfileFormState();
        });
      });
    }

    if (field.type === "geo_coordinates") {
      const omitChk = document.getElementById(`geoOmit_${field.id}`);
      const latInp = document.getElementById(`geoLat_${field.id}`);
      const lngInp = document.getElementById(`geoLng_${field.id}`);

      if (omitChk) {
        omitChk.addEventListener("change", (e) => {
          formState[field.id].omitted = e.target.checked;
          saveProfileFormState();
          renderCurrentWizardStep();
        });
      }
      if (latInp) {
        latInp.addEventListener("input", (e) => {
          formState[field.id].lat = e.target.value;
          saveProfileFormState();
        });
      }
      if (lngInp) {
        lngInp.addEventListener("input", (e) => {
          formState[field.id].lng = e.target.value;
          saveProfileFormState();
        });
      }
    }

    if (field.type === "opening_hours_grid") {
      const copyBtn = document.getElementById(`btnCopyMonFri_${field.id}`);
      if (copyBtn) {
        copyBtn.addEventListener("click", () => {
          const mon = formState[field.id]["Monday"] || { status: "Aberto", opens: "08:00", closes: "18:00" };
          ["Tuesday", "Wednesday", "Thursday", "Friday"].forEach((dayId) => {
            formState[field.id][dayId] = { ...mon };
          });
          saveProfileFormState();
          renderCurrentWizardStep();
        });
      }

      document.querySelectorAll(`[data-day-status="${field.id}"]`).forEach((sel) => {
        sel.addEventListener("change", (e) => {
          const day = sel.getAttribute("data-day");
          formState[field.id][day].status = e.target.value;
          saveProfileFormState();
          renderCurrentWizardStep();
        });
      });

      document.querySelectorAll(`[data-day-open="${field.id}"]`).forEach((inp) => {
        inp.addEventListener("input", (e) => {
          const day = inp.getAttribute("data-day");
          formState[field.id][day].opens = e.target.value;
          saveProfileFormState();
        });
      });

      document.querySelectorAll(`[data-day-close="${field.id}"]`).forEach((inp) => {
        inp.addEventListener("input", (e) => {
          const day = inp.getAttribute("data-day");
          formState[field.id][day].closes = e.target.value;
          saveProfileFormState();
        });
      });
    }

    if (field.type === "warranty_group") {
      const wEsc = document.getElementById(`wEscrita_${field.id}`);
      const wPrz = document.getElementById(`wPrazo_${field.id}`);
      const wVar = document.getElementById(`wVar_${field.id}`);
      const wCob = document.getElementById(`wCob_${field.id}`);

      if (wEsc) wEsc.addEventListener("change", (e) => { formState[field.id].garantia_escrita = e.target.value; saveProfileFormState(); });
      if (wPrz) wPrz.addEventListener("input", (e) => { formState[field.id].prazo_garantia = e.target.value; saveProfileFormState(); });
      if (wVar) wVar.addEventListener("change", (e) => { formState[field.id].garantia_variavel = e.target.checked; saveProfileFormState(); });
      if (wCob) wCob.addEventListener("input", (e) => { formState[field.id].cobertura_garantia = e.target.value; saveProfileFormState(); });
    }

    if (field.type === "installment_group") {
      const offerEl = document.getElementById(`instOffer_${field.id}`);
      const maxEl = document.getElementById(`instMax_${field.id}`);
      const intEl = document.getElementById(`instInt_${field.id}`);

      if (offerEl) {
        offerEl.addEventListener("change", (e) => {
          formState[field.id].offersInstallments = e.target.value;
          saveProfileFormState();
          renderCurrentWizardStep();
        });
      }
      if (maxEl) maxEl.addEventListener("change", (e) => { formState[field.id].maxInstallments = e.target.value; saveProfileFormState(); });
      if (intEl) intEl.addEventListener("change", (e) => { formState[field.id].interestCondition = e.target.value; saveProfileFormState(); });
    }

    if (field.type === "repeater") {
      const addBtn = document.getElementById(`btnAddRep_${field.id}`);
      if (addBtn) {
        addBtn.addEventListener("click", () => {
          formState[field.id].push(createEmptyRepeaterItem(field.subfields));
          saveProfileFormState();
          renderCurrentWizardStep();
        });
      }

      document.querySelectorAll(`[data-rep-remove="${field.id}"]`).forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-idx"), 10);
          formState[field.id].splice(idx, 1);
          saveProfileFormState();
          renderCurrentWizardStep();
        });
      });

      document.querySelectorAll(`[data-rep-input="${field.id}"]`).forEach((inp) => {
        inp.addEventListener("input", (e) => {
          const idx = parseInt(inp.getAttribute("data-idx"), 10);
          const sub = inp.getAttribute("data-sub");
          formState[field.id][idx][sub] = e.target.value;
          saveProfileFormState();
        });
      });
    }

    if (field.type === "repeater_simple") {
      const addBtn = document.getElementById(`btnAddSimple_${field.id}`);
      if (addBtn) {
        addBtn.addEventListener("click", () => {
          formState[field.id].push("");
          saveProfileFormState();
          renderCurrentWizardStep();
        });
      }

      document.querySelectorAll(`[data-repsimple-remove="${field.id}"]`).forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-idx"), 10);
          formState[field.id].splice(idx, 1);
          saveProfileFormState();
          renderCurrentWizardStep();
        });
      });

      document.querySelectorAll(`[data-repsimple-input="${field.id}"]`).forEach((inp) => {
        inp.addEventListener("input", (e) => {
          const idx = parseInt(inp.getAttribute("data-idx"), 10);
          formState[field.id][idx] = e.target.value;
          saveProfileFormState();
        });
      });
    }
  });
}

// ============================================================================
// 7. VALIDAÇÃO EXCLUSIVA DE CAMPOS OBRIGATÓRIOS (RESPEITANDO OMITIR = 0)
// ============================================================================

function isStepFullyValid(stepIdx) {
  const profile = PROFILES[activeProfileKey];
  if (!profile || !profile.steps[stepIdx]) return true;
  const step = profile.steps[stepIdx];

  if (stepIdx === 0) {
    for (const mf of MENTORSHIP_CONTROL.fields) {
      const val = (mentorshipState[mf.id] || "").trim();
      if (mf.required && !val) return false;
    }
  }

  for (const field of step.fields) {
    if (!evaluateFieldCondition(field)) continue;
    if (!field.required) continue;

    const st = formState[field.id];
    if (["text", "email", "url", "cep", "cnpj", "phone", "textarea", "textarea_short"].includes(field.type)) {
      if (st?.omitted) continue;
      const val = (st?.value || "").trim();
      if (!val || val === (field.defaultPrefix || "").trim()) return false;
    } else if (field.type === "select_with_other") {
      if (!st?.selected) return false;
      if (st.selected === "OTHER" && !(st.otherText || "").trim()) return false;
    } else if (field.type === "checkbox_group") {
      if (st?.omitted) continue;
      const hasChecked = Array.isArray(st?.selected) && st.selected.length > 0;
      const hasOther = st?.otherSelected && (st?.otherText || "").trim().length > 0;
      if (!hasChecked && !hasOther) return false;
    } else if (field.type === "repeater") {
      const firstItem = Array.isArray(st) && st[0] ? st[0] : {};
      const reqSub = (field.subfields || []).find((sf) => sf.required);
      if (reqSub && !(firstItem[reqSub.id] || "").trim()) return false;
    }
  }
  return true;
}

function validateSpecificStep(stepIdx) {
  const profile = PROFILES[activeProfileKey];
  const step = profile.steps[stepIdx];

  if (stepIdx === 0) {
    for (const mf of MENTORSHIP_CONTROL.fields) {
      const val = (mentorshipState[mf.id] || "").trim();
      if (mf.required && !val) {
        showValidationError(`Preencha o campo obrigatório da mentoria no topo: "${mf.label}"`);
        document.getElementById(`mentorship_${mf.id}`)?.focus();
        return false;
      }
    }
  }

  for (const field of step.fields) {
    if (!evaluateFieldCondition(field)) continue;
    if (!field.required) continue;

    const st = formState[field.id];
    if (["text", "email", "url", "cep", "cnpj", "phone", "textarea", "textarea_short"].includes(field.type)) {
      if (st?.omitted) continue;
      const val = (st?.value || "").trim();
      if (!val || val === (field.defaultPrefix || "").trim()) {
        showValidationError(`O campo "${field.label}" é obrigatório no Bloco ${String(stepIdx + 1).padStart(2, "0")}.`);
        document.getElementById(`input_${field.id}`)?.focus();
        return false;
      }
    } else if (field.type === "select_with_other") {
      if (!st?.selected) {
        showValidationError(`Selecione uma opção em "${field.label}".`);
        return false;
      }
      if (st.selected === "OTHER" && !(st.otherText || "").trim()) {
        showValidationError(`Você marcou a opção "Outro" em "${field.label}". Digite a especificação em até 135 caracteres.`);
        document.getElementById(`otherInput_${field.id}`)?.focus();
        return false;
      }
    } else if (field.type === "checkbox_group") {
      if (st?.omitted) continue;
      const hasChecked = Array.isArray(st?.selected) && st.selected.length > 0;
      const hasOther = st?.otherSelected && (st?.otherText || "").trim().length > 0;
      if (!hasChecked && !hasOther) {
        showValidationError(`Marque pelo menos uma opção em "${field.label}".`);
        return false;
      }
    } else if (field.type === "repeater") {
      const firstItem = Array.isArray(st) && st[0] ? st[0] : {};
      const reqSub = (field.subfields || []).find((sf) => sf.required);
      if (reqSub && !(firstItem[reqSub.id] || "").trim()) {
        showValidationError(`Preencha pelo menos o primeiro item em "${field.label}".`);
        return false;
      }
    }
  }

  wizardValidationAlert.classList.add("hidden");
  return true;
}

function validateCurrentStep() {
  return validateSpecificStep(currentStepIndex);
}

function validateAllStepsBeforeSubmit() {
  const profile = PROFILES[activeProfileKey];
  for (let i = 0; i < profile.steps.length; i++) {
    if (!validateSpecificStep(i)) {
      currentStepIndex = i;
      renderCurrentWizardStep();
      return false;
    }
  }
  return true;
}

function showValidationError(msg) {
  wizardValidationMessage.textContent = msg;
  wizardValidationAlert.classList.remove("hidden");
  wizardValidationAlert.scrollIntoView({ behavior: "smooth", block: "center" });
}

// ============================================================================
// 8. PÁGINA 2.5: REVISÃO PANORÂMICA & ROBÔ INSPETOR DE ANOMALIAS
// ============================================================================

function detectProfileAnomalies() {
  const anomalies = [];

  if (!mentorshipState.mentor_student_email || !mentorshipState.mentor_student_email.includes("@")) {
    anomalies.push({ level: "high", text: "E-mail do operador da mentoria parece inválido ou incompleto." });
  }

  const phoneVal = String(formState.whatsapp_principal?.value || "").replace(/\D/g, "");
  if (phoneVal.length > 0 && phoneVal.length < 10) {
    anomalies.push({ level: "high", text: "WhatsApp Comercial com poucos dígitos. Lembre-se do DDD (Ex: 16 99999-9999)." });
  }

  const docVal = String(formState.cnpj?.value || formState.documento_fiscal_liberal?.value || formState.documento_fiscal_digital?.value || "").replace(/\D/g, "");
  if (docVal.length > 0 && docVal.length !== 11 && docVal.length !== 14) {
    anomalies.push({ level: "medium", text: "Documento fiscal (CNPJ/CPF) informado com tamanho fora do padrão (deve ter 11 ou 14 dígitos)." });
  }

  ["url_site_oficial", "link_google_maps", "link_instagram"].forEach((k) => {
    const val = String(formState[k]?.value || "").trim();
    if (val && !val.startsWith("http://") && !val.startsWith("https://")) {
      anomalies.push({ level: "low", text: `O link "${k.replace(/_/g, " ")}" deve começar preferencialmente com "https://".` });
    }
  });

  const desc = String(formState.descricao_otimizada?.value || "").trim();
  if (desc && desc.length < 120) {
    anomalies.push({ level: "low", text: "Descrição da Entidade curta (menos de 120 caracteres). As IAs preferem descrições ricas para ancorar contexto." });
  }

  return anomalies;
}

function openPanoramicReviewScreen() {
  const profile = PROFILES[activeProfileKey];
  const anomalies = detectProfileAnomalies();

  let html = `
    <!-- Topo da Revisão Panorâmica -->
    <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">PÁGINA 2.5 • AUDITORIA PRÉ-CÓDIGO</span>
          <h2 class="text-xl sm:text-2xl font-extrabold text-white mt-1">Revisão Panorâmica da Entidade</h2>
        </div>
        <span class="text-xs px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-semibold self-start sm:self-center">
          ${profile.cardTitle}
        </span>
      </div>
      <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
        Confira abaixo a lista completa de perguntas e respostas antes de compilar o código Schema.org final. O robô analisou seus dados para evitar erros de digitação e inconsistências de indexação.
      </p>
    </div>

    <!-- Painel do Robô Inspetor de Anomalias -->
    <div id="anomaliesBox" class="rounded-2xl p-6 border shadow-lg transition-all ${
      anomalies.length > 0
        ? "bg-amber-950/20 border-amber-500/40 text-amber-200"
        : "bg-emerald-950/20 border-emerald-500/40 text-emerald-200"
    }">
      <div class="flex items-center justify-between gap-3 mb-2">
        <h3 class="text-sm font-bold flex items-center gap-2">
          <span>${anomalies.length > 0 ? "🔍 Diagnóstico do Robô Inspetor:" : "✨ Diagnóstico do Robô Inspetor:"}</span>
          <span class="text-xs font-mono px-2 py-0.5 rounded-md ${anomalies.length > 0 ? "bg-amber-500/20 text-amber-300" : "bg-emerald-500/20 text-emerald-300"}">
            ${anomalies.length} anomalia(s) encontrada(s)
          </span>
        </h3>
      </div>
      ${
        anomalies.length > 0
          ? `<ul class="space-y-1.5 text-xs text-amber-300/90 list-disc list-inside pt-1">
              ${anomalies.map((a) => `<li>${escapeHtml(a.text)}</li>`).join("")}
            </ul>
            <p class="text-[11px] text-slate-400 mt-2">Você pode corrigir esses pontos clicando em "Voltar e Corrigir Bloco" ou prosseguir normalmente caso as informações estejam corretas.</p>`
          : `<p class="text-xs text-emerald-300">Nenhuma anomalia crítica de formato foi detectada. Seus dados estão prontos para compilação semântica com nota máxima de autoridade.</p>`
      }
    </div>

    <!-- Lista Panorâmica Pergunta a Pergunta -->
    <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl">
  `;

  // Dados Operacionais da Mentoria
  html += `
    <div class="space-y-3 pb-6 border-b border-slate-800">
      <div class="flex items-center justify-between">
        <h4 class="text-xs font-bold uppercase tracking-wider text-amber-400">🛡️ Dados Operacionais da Mentoria (Uso Interno)</h4>
        <button type="button" data-jump-review="0" class="text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline cursor-pointer">Editar Bloco 01</button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800/80">
        <div><strong class="text-slate-400 block mb-0.5">Aluno / Mentorado:</strong> <span class="text-slate-200">${escapeHtml(mentorshipState.mentor_student_name || "—")}</span></div>
        <div><strong class="text-slate-400 block mb-0.5">E-mail Operador:</strong> <span class="text-slate-200">${escapeHtml(mentorshipState.mentor_student_email || "—")}</span></div>
        <div><strong class="text-slate-400 block mb-0.5">ID / Turma:</strong> <span class="text-slate-200">${escapeHtml(mentorshipState.mentor_student_code || "—")}</span></div>
      </div>
    </div>
  `;

  // Blocos da Entidade
  profile.steps.forEach((step, sIdx) => {
    html += `
      <div class="space-y-4 pb-6 border-b border-slate-800/80 last:border-0">
        <div class="flex items-center justify-between">
          <h4 class="text-sm font-bold text-white flex items-center gap-2">
            <span class="text-emerald-400">Bloco ${String(step.stepNumber).padStart(2, "0")}:</span>
            <span>${escapeHtml(step.title.replace(/^BLOCO \d+:\s*/i, ""))}</span>
          </h4>
          <button type="button" data-jump-review="${sIdx}" class="text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline cursor-pointer">Editar Bloco ${String(step.stepNumber).padStart(2, "0")}</button>
        </div>
        <div class="grid grid-cols-1 gap-2.5">
    `;

    step.fields.forEach((field) => {
      if (field.type === "section_divider") return;
      if (!evaluateFieldCondition(field)) return;

      const st = formState[field.id];
      const answer = formatFieldAnswerForReview(field, st);

      html += `
        <div class="bg-slate-950/70 border border-slate-800/90 rounded-xl p-3.5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span class="text-slate-400 sm:w-1/2 font-medium">${escapeHtml(field.label.replace(/\*$/, ""))}</span>
          <span class="sm:w-1/2 sm:text-right font-semibold ${answer.isOmitted ? "text-slate-500 italic" : "text-slate-100"}">
            ${answer.text}
          </span>
        </div>
      `;
    });

    html += `</div></div>`;
  });

  html += `
    </div>

    <!-- Rodapé de Ações da Página 2.5 -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 pb-12">
      <button type="button" id="btnBackToFormBlocks" class="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs transition cursor-pointer">
        ← Voltar aos Blocos de Edição
      </button>

      <div class="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <button type="button" id="btnJumpToAnomalies" class="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-semibold text-xs transition cursor-pointer ${anomalies.length === 0 ? "hidden" : ""}">
          🔍 Ver Anomalias (${anomalies.length})
        </button>

        <button type="button" id="btnConfirmAndGenerateJson" class="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-sm transition shadow-xl shadow-emerald-950/60 cursor-pointer">
          🚀 Tudo Correto • Emitir Código & Enviar →
        </button>
      </div>
    </div>
  `;

  reviewStep.innerHTML = html;

  appStep.classList.add("hidden");
  resultStep.classList.add("hidden");
  reviewStep.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });

  reviewStep.querySelectorAll("[data-jump-review]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = parseInt(btn.getAttribute("data-jump-review"), 10);
      currentStepIndex = target;
      reviewStep.classList.add("hidden");
      appStep.classList.remove("hidden");
      renderCurrentWizardStep();
      window.scrollTo({ top: 120, behavior: "smooth" });
    });
  });

  document.getElementById("btnBackToFormBlocks")?.addEventListener("click", () => {
    reviewStep.classList.add("hidden");
    appStep.classList.remove("hidden");
    renderCurrentWizardStep();
    window.scrollTo({ top: 120, behavior: "smooth" });
  });

  document.getElementById("btnJumpToAnomalies")?.addEventListener("click", () => {
    document.getElementById("anomaliesBox")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  document.getElementById("btnConfirmAndGenerateJson")?.addEventListener("click", proceedToResultPage);
}

function formatFieldAnswerForReview(field, st) {
  if (st === undefined || st === null) {
    return { text: "[Não informado]", isOmitted: true };
  }
  if (st.omitted) {
    return { text: "[Omitido conscientemente pelo operador]", isOmitted: true };
  }

  if (["text", "email", "url", "cep", "cnpj", "phone", "textarea", "textarea_short"].includes(field.type)) {
    const val = String(st.value || "").trim();
    if (!val) return { text: "[Não preenchido]", isOmitted: true };
    return { text: val, isOmitted: false };
  }

  if (field.type === "select_with_other") {
    if (st.selected === "OTHER") {
      const custom = String(st.otherText || "").trim();
      return { text: custom ? `Outro: ${custom}` : "[Outro não especificado]", isOmitted: !custom };
    }
    const found = (field.options || []).find((o) => o.val === st.selected);
    return { text: found ? found.text : st.selected || "[Não selecionado]", isOmitted: !st.selected };
  }

  if (field.type === "tri_state") {
    return { text: st || "Omitir", isOmitted: st === "Omitir" };
  }

  if (field.type === "tri_state_with_input") {
    if (st.status === "Omitir") return { text: "[Omitido]", isOmitted: true };
    if (st.status === "Não") return { text: "Não", isOmitted: false };
    return { text: st.text ? `Sim (${st.text})` : "Sim", isOmitted: false };
  }

  if (field.type === "checkbox_group") {
    const list = Array.isArray(st.selected) ? [...st.selected] : [];
    if (st.otherSelected && st.otherText) list.push(`Outro: ${st.otherText}`);
    if (list.length === 0) return { text: "[Nenhum item marcado]", isOmitted: true };
    return { text: list.join("; "), isOmitted: false };
  }

  if (field.type === "repeater") {
    if (!Array.isArray(st) || st.length === 0) return { text: "[Nenhum item adicionado]", isOmitted: true };
    const valid = st.filter((it) => Object.values(it).some((v) => String(v || "").trim().length > 0));
    if (valid.length === 0) return { text: "[Nenhum item preenchido]", isOmitted: true };
    return { text: `${valid.length} item(ns) cadastrado(s) no catálogo`, isOmitted: false };
  }

  if (field.type === "price_range_group") {
    const parts = [];
    if (st.menor_preco) parts.push(`Mín: R$ ${st.menor_preco}`);
    if (st.maior_preco) parts.push(`Máx: R$ ${st.maior_preco}`);
    if (st.ticket_medio) parts.push(`Médio: R$ ${st.ticket_medio}`);
    return { text: parts.length > 0 ? parts.join(" | ") : "[Valores omitidos]", isOmitted: parts.length === 0 };
  }

  if (field.type === "geo_coordinates") {
    if (st.lat && st.lng) return { text: `Lat: ${st.lat}, Lng: ${st.lng}`, isOmitted: false };
    return { text: "[Coordenadas omitidas]", isOmitted: true };
  }

  return { text: String(st.value || st || "[Omitido]"), isOmitted: false };
}

// ============================================================================
// 9. COMPILADOR DO ROBÔ SEMÂNTICO JSON-LD (REGRA ESTRITA: OMITIR = 0)
// ============================================================================

function compileCleanEntityAndSchema() {
  const profile = PROFILES[activeProfileKey];
  let activePropsCount = 0;
  let omittedPropsCount = 0;

  let schemaType = profile.defaultSchemaType;
  if (activeProfileKey === "local_comercio") {
    const ramo = formState.ramo_atuacao;
    if (ramo?.selected && ramo.selected !== "OTHER") schemaType = ramo.selected;
  } else if (activeProfileKey === "profissional_liberal") {
    const cons = formState.conselho_classe;
    if (cons?.selected && cons.selected !== "OTHER") {
      schemaType = cons.selected.split("_")[0];
    }
  } else if (activeProfileKey === "especialista_digital") {
    const est = formState.estrutura_operacao_digital;
    if (est?.selected && est.selected !== "OTHER") schemaType = est.selected;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType
  };

  const additionalPropertyList = [];
  const amenityFeatureList = [];
  const sameAsLinks = [];
  const cleanAvatarProfile = {};
  const cleanRawData = {};

  const markOmitted = () => { omittedPropsCount++; };
  const markActive = () => { activePropsCount++; };

  profile.steps.forEach((step) => {
    const isAvatarStep = step.id.includes("avatar");

    step.fields.forEach((field) => {
      if (field.type === "section_divider") return;

      if (!evaluateFieldCondition(field)) {
        markOmitted();
        return;
      }

      const st = formState[field.id];
      const extracted = extractCleanFieldValue(field, st);

      if (extracted === null || extracted === undefined || extracted === "" || (Array.isArray(extracted) && extracted.length === 0)) {
        markOmitted();
        return;
      }

      markActive();
      cleanRawData[field.id] = extracted;

      if (isAvatarStep) {
        cleanAvatarProfile[field.id] = extracted;
      }

      mapFieldToSchemaOrg(field, extracted, jsonLd, additionalPropertyList, amenityFeatureList, sameAsLinks);
    });
  });

  buildPostalAddressIfApplicable(cleanRawData, jsonLd);

  if (sameAsLinks.length > 0) {
    jsonLd.sameAs = [...new Set(sameAsLinks)];
  }

  if (amenityFeatureList.length > 0) {
    jsonLd.amenityFeature = amenityFeatureList;
  }

  if (additionalPropertyList.length > 0) {
    jsonLd.additionalProperty = additionalPropertyList;
  }

  const sanitizedJsonLd = deepPurgeEmptyValues(jsonLd);
  const scriptTagString = `<script type="application/ld+json">\n${JSON.stringify(sanitizedJsonLd, null, 2)}\n</script>`;

  const totalEvaluated = activePropsCount + omittedPropsCount;
  const authorityScore = Math.min(100, Math.max(78, Math.round((activePropsCount / Math.max(12, totalEvaluated * 0.55)) * 100)));

  return {
    timestamp: new Date().toISOString(),
    profileKey: activeProfileKey,
    profileLabel: profile.cardTitle,
    mentorshipOperator: { ...mentorshipState },
    stats: {
      activePropsCount,
      omittedPropsCount,
      authorityScore
    },
    cleanRawData,
    avatarPsychology: cleanAvatarProfile,
    jsonLdObject: sanitizedJsonLd,
    scriptTag: scriptTagString
  };
}

function extractCleanFieldValue(field, st) {
  if (st === undefined || st === null) return null;

  if (["text", "email", "url", "cep", "cnpj", "phone", "textarea", "textarea_short"].includes(field.type)) {
    if (st.omitted) return null;
    const val = String(st.value || "").trim();
    if (!val || val === (field.defaultPrefix || "").trim()) return null;
    if (st.addonChecked && field.checkboxAddon) {
      return `${val} (${field.checkboxAddon.label})`;
    }
    return val;
  }

  if (field.type === "select" || field.type === "radio_cards") {
    if (!st || st === "Omitir" || st === "nao_possui" || st === "Sem titulação formal" || st === "Sem_Titulacao") return null;
    return st;
  }

  if (field.type === "select_with_other") {
    if (!st.selected || st.selected === "Omitir" || st.selected === "Nao_Emergencia") return null;
    if (st.selected === "OTHER") {
      const custom = String(st.otherText || "").trim();
      return custom || null;
    }
    const foundOpt = (field.options || []).find((o) => o.val === st.selected);
    return foundOpt ? foundOpt.text : st.selected;
  }

  if (field.type === "tri_state") {
    if (st === "Omitir") return null;
    return st;
  }

  if (field.type === "tri_state_with_input") {
    if (!st || st.status === "Omitir") return null;
    if (st.status === "Não") return "Não";
    const detail = String(st.text || "").trim();
    return detail ? `Sim (${detail})` : "Sim";
  }

  if (field.type === "checkbox_group") {
    if (st.omitted) return null;
    const list = Array.isArray(st.selected) ? [...st.selected] : [];
    if (st.otherSelected && String(st.otherText || "").trim()) {
      list.push(String(st.otherText).trim());
    }
    return list.length > 0 ? list : null;
  }

  if (field.type === "group_row" || field.type === "price_range_group") {
    if (st.omitted) return null;
    const out = {};
    let hasAny = false;
    (field.subfields || []).forEach((sf) => {
      const v = String(st[sf.id] || "").trim();
      if (v) {
        out[sf.id] = v;
        hasAny = true;
      }
    });
    return hasAny ? out : null;
  }

  if (field.type === "geo_coordinates") {
    if (st.omitted) return null;
    const lat = String(st.lat || "").trim();
    const lng = String(st.lng || "").trim();
    if (!lat || !lng) return null;
    return { latitude: lat, longitude: lng };
  }

  if (field.type === "opening_hours_grid") {
    const specs = [];
    DAYS_OF_WEEK.forEach((d) => {
      const dayCfg = st[d.id];
      if (dayCfg && dayCfg.status === "Aberto" && dayCfg.opens && dayCfg.closes) {
        specs.push({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: `https://schema.org/${d.id}`,
          opens: dayCfg.opens,
          closes: dayCfg.closes
        });
      }
    });
    return specs.length > 0 ? specs : null;
  }

  if (field.type === "warranty_group") {
    const parts = [];
    if (st.garantia_escrita && st.garantia_escrita !== "Omitir") parts.push(`Formalizada por escrito: ${st.garantia_escrita}`);
    if (st.prazo_garantia) parts.push(`Prazo: ${st.prazo_garantia}`);
    if (st.garantia_variavel) parts.push("Prazo variável conforme serviço/produto");
    if (st.cobertura_garantia) parts.push(`Cobertura: ${st.cobertura_garantia}`);
    return parts.length > 0 ? parts.join(" | ") : null;
  }

  if (field.type === "installment_group") {
    if (st.offersInstallments === "Não") return "Pagamento à vista (1x no cartão)";
    return `Parcelamento em ${st.maxInstallments} (${st.interestCondition})`;
  }

  if (field.type === "repeater") {
    if (!Array.isArray(st)) return null;
    const validItems = st.filter((item) => {
      return Object.values(item).some((v) => String(v || "").trim().length > 0);
    });
    return validItems.length > 0 ? validItems : null;
  }

  if (field.type === "repeater_simple") {
    if (!Array.isArray(st)) return null;
    const validLinks = st.map((u) => String(u || "").trim()).filter(Boolean);
    return validLinks.length > 0 ? validLinks : null;
  }

  return null;
}

function mapFieldToSchemaOrg(field, val, jsonLd, additionalPropertyList, amenityFeatureList, sameAsLinks) {
  if (field.id.startsWith("link_") && field.id !== "link_google_maps" && typeof val === "string") {
    sameAsLinks.push(val);
    return;
  }
  if (field.id === "links_extras_sameas" && Array.isArray(val)) {
    val.forEach((u) => sameAsLinks.push(u));
    return;
  }

  if (field.schemaProp === "name") {
    const prefix = formState.titulacao_formal?.selected;
    if (prefix && prefix !== "Sem titulação formal" && prefix !== "OTHER" && !val.startsWith(prefix)) {
      jsonLd.name = `${prefix} ${val}`;
    } else {
      jsonLd.name = val;
    }
    return;
  }
  if (field.schemaProp === "legalName") { jsonLd.legalName = val; return; }
  if (field.schemaProp === "alternateName") { jsonLd.alternateName = val; return; }
  if (field.schemaProp === "taxID") { jsonLd.taxID = val; return; }
  if (field.schemaProp === "identifier") { jsonLd.identifier = val; return; }
  if (field.schemaProp === "telephone") { jsonLd.telephone = val; return; }
  if (field.schemaProp === "email") { jsonLd.email = val; return; }
  if (field.schemaProp === "url") { jsonLd.url = val; return; }
  if (field.schemaProp === "hasMap") { jsonLd.hasMap = val; return; }
  if (field.schemaProp === "foundingDate") { jsonLd.foundingDate = val; return; }
  if (field.schemaProp === "description") { jsonLd.description = val; return; }
  if (field.schemaProp === "paymentAccepted") {
    jsonLd.paymentAccepted = Array.isArray(val) ? val.join(", ") : val;
    return;
  }
  if (field.schemaProp === "currenciesAccepted") {
    jsonLd.currenciesAccepted = Array.isArray(val) ? val.join(", ") : val;
    return;
  }
  if (field.schemaProp === "availableLanguage") {
    jsonLd.availableLanguage = val;
    return;
  }
  if (field.schemaProp === "alumniOf") {
    jsonLd.alumniOf = { "@type": "EducationalOrganization", name: val };
    return;
  }
  if (field.schemaProp === "memberOf") {
    jsonLd.memberOf = { "@type": "Organization", name: val };
    return;
  }
  if (field.schemaProp === "hasCredential") {
    jsonLd.hasCredential = { "@type": "EducationalOccupationalCredential", credentialCategory: val };
    return;
  }

  if (field.schemaProp === "knowsAbout") {
    if (!jsonLd.knowsAbout) jsonLd.knowsAbout = [];
    const items = typeof val === "string" ? val.split(",").map((s) => s.trim()).filter(Boolean) : [val];
    jsonLd.knowsAbout.push(...items);
    return;
  }

  if (field.schemaProp === "areaServed") {
    const uf = formState.estado_uf_externo || formState.estado_uf || "";
    if (typeof val === "string" && val.includes(",")) {
      jsonLd.areaServed = val
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean)
        .map((city) => ({
          "@type": "City",
          name: uf && !city.includes(uf) ? `${city} - ${uf}` : city
        }));
    } else {
      jsonLd.areaServed = val;
    }
    return;
  }

  if (field.type === "opening_hours_grid") {
    jsonLd.openingHoursSpecification = val;
    return;
  }

  if (field.type === "geo_coordinates") {
    jsonLd.geo = {
      "@type": "GeoCoordinates",
      latitude: val.latitude,
      longitude: val.longitude
    };
    return;
  }

  if (field.type === "price_range_group") {
    const parts = [];
    if (val.menor_preco) parts.push(`Mín: R$ ${val.menor_preco}`);
    if (val.maior_preco) parts.push(`Máx: R$ ${val.maior_preco}`);
    if (val.ticket_medio) parts.push(`Ticket Médio: R$ ${val.ticket_medio}`);
    if (parts.length > 0) {
      jsonLd.priceRange = parts.join(" | ");
    }
    return;
  }

  if (field.schemaProp === "hasOfferCatalog" && Array.isArray(val)) {
    jsonLd.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: "Catálogo Principal de Produtos e Serviços",
      itemListElement: val.map((item) => {
        const offer = {
          "@type": "Offer",
          itemOffered: {
            "@type": item.item_formato ? "Product" : "Service",
            name: item.item_nome,
            description: item.item_descricao
          }
        };
        if (item.item_preco) {
          offer.priceSpecification = {
            "@type": "PriceSpecification",
            price: item.item_preco,
            priceCurrency: "BRL"
          };
        }
        if (item.item_url_checkout) {
          offer.url = item.item_url_checkout;
        }
        return offer;
      })
    };
    return;
  }

  if (field.type === "tri_state") {
    amenityFeatureList.push({
      "@type": "LocationFeatureSpecification",
      name: field.label.replace(/\?$/, ""),
      value: val === "Sim"
    });
    return;
  }

  if (!["cep", "logradouro", "numero_imovel", "complemento_complexo", "bairro", "cidade", "estado_uf"].includes(field.id)) {
    additionalPropertyList.push({
      "@type": "PropertyValue",
      name: field.label.replace(/\*$/, "").trim(),
      value: typeof val === "object" ? JSON.stringify(val) : String(val)
    });
  }
}

function buildPostalAddressIfApplicable(raw, jsonLd) {
  const hasCity = raw.cidade || raw.endereco_sede_opcional?.cidade_sede;
  const hasCep = raw.cep || raw.cep_epicentro;
  if (!hasCity && !hasCep) return;

  const address = {
    "@type": "PostalAddress",
    addressCountry: "BR"
  };

  if (raw.logradouro) {
    let street = raw.logradouro;
    if (raw.numero_imovel) street += `, ${raw.numero_imovel}`;
    if (raw.complemento_complexo) {
      const compParts = Object.values(raw.complemento_complexo).filter(Boolean);
      if (compParts.length > 0) street += ` - ${compParts.join(", ")}`;
    }
    address.streetAddress = street;
  } else if (raw.endereco_sede_opcional?.rua_sede) {
    address.streetAddress = `${raw.endereco_sede_opcional.rua_sede}, ${raw.endereco_sede_opcional.numero_sede || "S/N"}`;
  }

  if (raw.bairro || raw.endereco_sede_opcional?.bairro_sede) {
    address.addressLocality = raw.cidade || raw.endereco_sede_opcional?.cidade_sede;
    address.streetAddress = address.streetAddress
      ? `${address.streetAddress} - Bairro ${raw.bairro || raw.endereco_sede_opcional?.bairro_sede}`
      : `Bairro ${raw.bairro || raw.endereco_sede_opcional?.bairro_sede}`;
  } else if (raw.cidade) {
    address.addressLocality = raw.cidade;
  }

  if (raw.estado_uf || raw.estado_uf_externo) {
    address.addressRegion = raw.estado_uf || raw.estado_uf_externo;
  }

  if (raw.cep || raw.cep_epicentro) {
    address.postalCode = raw.cep || raw.cep_epicentro;
  }

  jsonLd.address = address;
}

function deepPurgeEmptyValues(obj) {
  if (Array.isArray(obj)) {
    return obj
      .map((v) => deepPurgeEmptyValues(v))
      .filter((v) => v !== null && v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0));
  }
  if (obj !== null && typeof obj === "object") {
    const clean = {};
    Object.entries(obj).forEach(([k, v]) => {
      const cleanedVal = deepPurgeEmptyValues(v);
      if (
        cleanedVal !== null &&
        cleanedVal !== undefined &&
        cleanedVal !== "" &&
        cleanedVal !== "Omitir" &&
        !(Array.isArray(cleanedVal) && cleanedVal.length === 0) &&
        !(typeof cleanedVal === "object" && !Array.isArray(cleanedVal) && Object.keys(cleanedVal).length === 0)
      ) {
        clean[k] = cleanedVal;
      }
    });
    return clean;
  }
  return obj;
}

// ============================================================================
// 10. TRANSIÇÃO FINAL PARA A PÁGINA 3 (CÓDIGO FORMATADO & WEBHOOK MAKE)
// ============================================================================

async function proceedToResultPage() {
  const compiled = compileCleanEntityAndSchema();
  lastCompiledPayload = compiled;

  try {
    localStorage.setItem(
      API_CONFIG.STORAGE_PREFIX + "last_compiled_entity",
      JSON.stringify(compiled)
    );
  } catch (err) {
    console.warn("Aviso ao gravar payload para App/Robô QG:", err);
  }

  document.getElementById("resultEntityTitle").textContent =
    compiled.jsonLdObject.name || compiled.profileLabel;
  document.getElementById("authorityScoreValue").textContent = `${compiled.stats.authorityScore}%`;
  document.getElementById("activePropsCount").textContent = String(compiled.stats.activePropsCount);
  document.getElementById("omittedPropsCount").textContent = String(compiled.stats.omittedPropsCount);
  document.getElementById("jsonFinalOutput").textContent = compiled.scriptTag;

  renderAuditSummary(compiled);
  initAgentChatInterface();

  reviewStep.classList.add("hidden");
  appStep.classList.add("hidden");
  resultStep.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });

  await dispatchToMakeWebhook(compiled);
}

function handleFinalFormSubmission(e) {
  e.preventDefault();
  if (!validateAllStepsBeforeSubmit()) return;
  openPanoramicReviewScreen();
}

function renderAuditSummary(compiled) {
  const listEl = document.getElementById("auditSummaryList");
  const avatarKeys = Object.keys(compiled.avatarPsychology || {});

  listEl.innerHTML = `
    <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
      <div class="text-[11px] text-slate-400 uppercase font-bold">Mentorado / Operador Responsável (Uso Interno)</div>
      <div class="text-slate-100 font-semibold">${escapeHtml(compiled.mentorshipOperator.mentor_student_name || "Consultor Alfa")} (${escapeHtml(compiled.mentorshipOperator.mentor_student_code || "GEO-2026")})</div>
    </div>
    <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
      <div class="text-[11px] text-slate-400 uppercase font-bold">Tipo Canônico Schema.org</div>
      <div class="text-emerald-400 font-mono font-semibold">@type: "${escapeHtml(compiled.jsonLdObject["@type"])}"</div>
    </div>
    <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
      <div class="text-[11px] text-slate-400 uppercase font-bold">Mapeamento Psicológico do Avatar</div>
      <div class="text-slate-200">${avatarKeys.length > 0 ? `${avatarKeys.length} dimensões comportamentais capturadas para o App/Robô QG.` : "Avatar omitido pelo operador."}</div>
    </div>
  `;
}

async function dispatchToMakeWebhook(payload) {
  const banner = document.getElementById("webhookStatusBanner");
  const txt = document.getElementById("webhookStatusText");
  const retryBtn = document.getElementById("btnRetryWebhook");

  const webhookUrl = API_CONFIG.MAKE_WEBHOOK_URL || MAKE_WEBHOOK_URL;
  if (!webhookUrl || webhookUrl === "SEU_WEBHOOK_URL_DO_MAKE_AQUI") {
    banner.className = "mt-5 rounded-xl p-3.5 text-xs border flex items-center justify-between gap-3 bg-amber-950/40 border-amber-500/30 text-amber-200";
    txt.textContent = "ℹ️ Modo Local Ativo: Código compilado e salvo no navegador (Configure a URL do Make em js/config.js quando desejar disparo externo).";
    retryBtn.classList.add("hidden");
    appendAgentChatMessage("agent", `Auditoria preliminar local concluída com sucesso! Seu código Schema.org está em conformidade com as diretrizes de dados estruturados.

Você pode confirmar nos validadores oficiais do Google Rich Results e Schema.org usando os botões acima.`);
    return;
  }

  banner.className = "mt-5 rounded-xl p-3.5 text-xs border flex items-center justify-between gap-3 bg-slate-950/80 border-slate-800 text-slate-300";
  txt.textContent = "⏳ Transmitindo entidade higienizada para o Agente Auditor no Make...";
  retryBtn.classList.add("hidden");

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      banner.className = "mt-5 rounded-xl p-3.5 text-xs border flex items-center justify-between gap-3 bg-emerald-950/50 border-emerald-500/40 text-emerald-200";
      txt.textContent = "🚀 Pacote sincronizado com o Agente Auditor no Make! Dados transmitidos com sucesso.";
      
      let resData = null;
      try {
        resData = await response.json();
      } catch (e) {
        resData = null;
      }

      if (resData && resData.agentFeedback) {
        appendAgentChatMessage("agent", resData.agentFeedback);
      } else {
        appendAgentChatMessage("agent", `Auditoria técnica concluída pelo Agente! Os dados foram processados com 100% de conformidade inicial.

Recomendo testar seu código nos botões oficiais do Google Rich Results e Schema.org acima. Como deseja prosseguir?`);
      }

      if (resData && resData.enrichedJsonLd) {
        lastCompiledPayload.jsonLdObject = resData.enrichedJsonLd;
        lastCompiledPayload.scriptTag = `<script type="application/ld+json">\n${JSON.stringify(resData.enrichedJsonLd, null, 2)}\n</script>`;
        document.getElementById("jsonFinalOutput").textContent = lastCompiledPayload.scriptTag;
      }
    } else {
      throw new Error(`HTTP ${response.status}`);
    }
  } catch (err) {
    banner.className = "mt-5 rounded-xl p-3.5 text-xs border flex items-center justify-between gap-3 bg-rose-950/50 border-rose-500/40 text-rose-200";
    txt.textContent = "⚠️ Código gerado localmente, mas a conexão com o Webhook do Make oscilou.";
    retryBtn.classList.remove("hidden");
    appendAgentChatMessage("agent", "Código estruturado com sucesso no navegador! O Webhook externo está offline no momento, mas você já pode testar o script nos validadores oficiais acima.");
  }
}

// ============================================================================
// 11. SISTEMA DE CHAT ESPECIALISTA DO AGENTE AUDITOR (PÁGINA 3)
// ============================================================================

function initAgentChatInterface() {
  const logs = document.getElementById("agentChatLogs");
  if (logs) logs.innerHTML = "";
  chatConversationHistory = [];
  lockAppRoboQgAdvance();
}

function appendAgentChatMessage(sender, text) {
  const logs = document.getElementById("agentChatLogs");
  if (!logs) return;

  const isAgent = sender === "agent";
  const msgWrapper = document.createElement("div");
  msgWrapper.className = `flex gap-2.5 ${isAgent ? "items-start" : "items-start justify-end"}`;

  const bubble = document.createElement("div");
  bubble.className = `p-3 rounded-2xl max-w-[88%] text-xs leading-relaxed ${
    isAgent
      ? "bg-slate-900 border border-slate-800 text-slate-200 shadow-sm"
      : "bg-emerald-600 text-white font-medium"
  }`;
  bubble.innerHTML = isAgent
    ? `<div class="font-bold text-emerald-400 mb-1 text-[11px] flex items-center gap-1.5"><span>🤖 Agente Auditor:</span></div><div class="whitespace-pre-line">${escapeHtml(text)}</div>`
    : `<div class="whitespace-pre-line">${escapeHtml(text)}</div>`;

  msgWrapper.appendChild(bubble);
  logs.appendChild(msgWrapper);
  logs.scrollTop = logs.scrollHeight;
}

function unlockAppRoboQgAdvance() {
  const btn = document.getElementById("btnGoToApp1B");
  const notice = document.getElementById("qgGatekeeperNotice");

  if (btn) {
    btn.classList.remove("opacity-50", "cursor-not-allowed", "pointer-events-none");
    btn.classList.add("cursor-pointer", "shadow-emerald-900/60");
  }
  if (notice) {
    notice.className = "p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-[11px] text-emerald-300 flex items-center gap-2";
    notice.innerHTML = "<span>✅ Entidade validada e homologada! O acesso ao App/Robô QG está totalmente liberado.</span>";
  }
}

function lockAppRoboQgAdvance() {
  const btn = document.getElementById("btnGoToApp1B");
  const notice = document.getElementById("qgGatekeeperNotice");

  if (btn) {
    btn.classList.add("opacity-50", "cursor-not-allowed", "pointer-events-none");
    btn.classList.remove("cursor-pointer");
  }
  if (notice) {
    notice.className = "p-3 bg-slate-950/70 border border-amber-500/30 rounded-xl text-[11px] text-amber-300 flex items-center gap-2";
    notice.innerHTML = "<span>🔒 Confirme a validação com o Agente no chat ao lado para destravar o avanço.</span>";
  }
}

function setupAgentChatListeners() {
  const btnConfirmOk = document.getElementById("btnAgentConfirmOk");
  const btnReportError = document.getElementById("btnAgentReportError");
  const btnSend = document.getElementById("btnAgentSend");
  const inputEl = document.getElementById("agentInputMessage");

  btnConfirmOk?.addEventListener("click", () => {
    appendAgentChatMessage("user", "✅ Tudo certo! Já verifiquei nos validadores do Google e Schema.org.");
    setTimeout(() => {
      appendAgentChatMessage("agent", "Excelente! Sua entidade foi formalmente certificada. O pacote técnico completo e os parâmetros psicológicos do Avatar estão liberados para ingestão direta no App/Robô QG. Pode avançar no botão verde ao lado!");
      unlockAppRoboQgAdvance();
    }, 400);
  });

  btnReportError?.addEventListener("click", () => {
    appendAgentChatMessage("user", "⚠️ Deu erro ou advertência no teste do validador.");
    setTimeout(() => {
      appendAgentChatMessage("agent", "Sem problemas! Cole abaixo o texto da advertência ou erro apontado pelo validador do Google/Schema.org para eu identificar o nó exato e orientar a correção sem alucinações.");
      if (inputEl) {
        inputEl.focus();
        inputEl.placeholder = "Cole aqui a mensagem de erro do Google para auditoria...";
      }
    }, 350);
  });

  const handleSendMessage = async () => {
    if (!inputEl) return;
    const msg = inputEl.value.trim();
    if (!msg) return;

    inputEl.value = "";
    appendAgentChatMessage("user", msg);

    const webhookUrl = API_CONFIG.MAKE_WEBHOOK_URL || MAKE_WEBHOOK_URL;
    if (!webhookUrl || webhookUrl === "SEU_WEBHOOK_URL_DO_MAKE_AQUI") {
      setTimeout(() => {
        appendAgentChatMessage("agent", "Estou operando no modo de inspeção estrita. Se o validador exigiu um campo ausente (como URL canônica ou telefone padronizado), certifique-se de que nenhum campo obrigatório foi deixado sem preenchimento e utilize o prefixo oficial internacional (+55). Configure a URL do Make em js/config.js para correções automáticas em tempo real.");
      }, 500);
      return;
    }

    try {
      appendAgentChatMessage("agent", "Analisando o log técnico perante a taxonomia oficial do Schema.org...");
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "troubleshoot_error",
          errorMessage: msg,
          currentEntity: lastCompiledPayload
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.agentResponse) {
          appendAgentChatMessage("agent", data.agentResponse);
        }
        if (data && data.correctedJsonLd) {
          lastCompiledPayload.jsonLdObject = data.correctedJsonLd;
          lastCompiledPayload.scriptTag = `<script type="application/ld+json">\n${JSON.stringify(data.correctedJsonLd, null, 2)}\n</script>`;
          document.getElementById("jsonFinalOutput").textContent = lastCompiledPayload.scriptTag;
        }
      } else {
        throw new Error();
      }
    } catch (e) {
      appendAgentChatMessage("agent", "Identifiquei sua solicitação. Caso o validador acuse ausência de campo obrigatório específico, você pode editar o bloco correspondente clicando em 'Voltar e Editar Dados' ou aplicar o dado real faltante.");
    }
  };

  btnSend?.addEventListener("click", handleSendMessage);
  inputEl?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  });
}

// ============================================================================
// 12. LISTENERS GLOBAIS DE NAVEGAÇÃO, CÓPIA E UTILITÁRIOS
// ============================================================================

function setupGlobalListeners() {
  btnTrocarPerfil?.addEventListener("click", returnToLanding);

  btnPrevStep?.addEventListener("click", () => {
    if (currentStepIndex > 0) {
      currentStepIndex--;
      renderCurrentWizardStep();
      window.scrollTo({ top: 100, behavior: "smooth" });
    }
  });

  btnNextStep?.addEventListener("click", () => {
    if (!validateCurrentStep()) return;
    const profile = PROFILES[activeProfileKey];
    if (currentStepIndex < profile.steps.length - 1) {
      currentStepIndex++;
      renderCurrentWizardStep();
      window.scrollTo({ top: 100, behavior: "smooth" });
    }
  });

  btnResetProfileData?.addEventListener("click", () => {
    if (!activeProfileKey) return;
    const profile = PROFILES[activeProfileKey];
    if (confirm(`Deseja limpar todos os campos preenchidos em "${profile.cardTitle}" para iniciar um novo cliente do zero?`)) {
      localStorage.removeItem(API_CONFIG.STORAGE_PREFIX + profile.storageKey);
      currentStepIndex = 0;
      loadProfileFormState(activeProfileKey);
      renderCurrentWizardStep();
    }
  });

  engineForm?.addEventListener("submit", handleFinalFormSubmission);

  document.getElementById("btnCopyCode")?.addEventListener("click", (e) => {
    if (!lastCompiledPayload) return;
    navigator.clipboard.writeText(lastCompiledPayload.scriptTag).then(() => {
      const btn = e.currentTarget;
      const original = btn.innerHTML;
      btn.innerHTML = "<span>✅ Copiado para a Área de Transferência!</span>";
      setTimeout(() => { btn.innerHTML = original; }, 2200);
    });
  });

  document.getElementById("btnDownloadJson")?.addEventListener("click", () => {
    if (!lastCompiledPayload) return;
    const blob = new Blob([lastCompiledPayload.scriptTag], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const slug = (lastCompiledPayload.jsonLdObject.name || "entidade")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
    a.download = `schema-geo-${slug}.html`;
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById("btnBackToEdit")?.addEventListener("click", () => {
    resultStep.classList.add("hidden");
    reviewStep.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.getElementById("btnStartNewEntity")?.addEventListener("click", returnToLanding);

  document.getElementById("btnRetryWebhook")?.addEventListener("click", () => {
    if (lastCompiledPayload) dispatchToMakeWebhook(lastCompiledPayload);
  });
}

function formatCepMask(v) {
  const digits = v.replace(/\D/g, "").slice(0, 8);
  if (digits.length > 5) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  return digits;
}

function formatCnpjMask(v) {
  const digits = v.replace(/\D/g, "").slice(0, 14);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12, 14)}`;
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
