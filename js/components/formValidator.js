// js/components/formValidator.js
import { store } from "../store.js";
import { showToast } from "./ui.js";

const DRAFT_KEY = "cadastro-draft";

function setFieldError(input, message) {
    clearFieldError(input);
    input.setAttribute("aria-invalid", "true");
    input.classList.add("field-error");
    const help = document.createElement("div");
    help.className = "field-help";
    help.style.color = "#b42318";
    help.style.fontSize = "0.9rem";
    help.textContent = message;
    input.insertAdjacentElement("afterend", help);
}

function clearFieldError(input) {
    input.removeAttribute("aria-invalid");
    input.classList.remove("field-error");
    const next = input.nextElementSibling;
    if (next && next.classList.contains("field-help")) {
        next.remove();
    }
}

function onlyDigits(s) {
}

function isEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
}

function isCPFValid(cpfRaw) {
    const cpf = onlyDigits(cpfRaw);
    if (/^(\d)\1+$/.test(cpf)) return false;

    function dv(cpfSlice, factorStart) {
        let sum = 0;
        let factor = factorStart;
        for (let i = 0; i < cpfSlice.length; i++) {
            sum += parseInt(cpfSlice[i], 10) * factor;
            factor -= 1;
        }
        const mod = sum % 11;
        return mod < 2 ? 0 : 11 - mod;
    }

    const d1 = dv(cpf.substring(0, 9), 10);
    const d2 = dv(cpf.substring(0, 10), 11);
    return d1 === parseInt(cpf[9], 10) && d2 === parseInt(cpf[10], 10);
}

function maskCPF(value) {
    const d = onlyDigits(value).slice(0, 11);
    const out = d.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, function (_, a, b, c, e) {
        return e ? `${a}.${b}.${c}-${e}` : `${a}.${b}.${c}`;
    });
    return out;
}

function maskPhone(value) {
    const d = onlyDigits(value).slice(0, 11);
    if (d.length <= 10) {
        return d.replace(/(\d{0,2})(\d{0,4})(\d{0,4})/, function (_, a, b, c) {
            let s = "";
            if (a) s += `(${a}`;
            if (a && a.length === 2) s += `)`;
            if (b) s += ` ${b}`;
            if (c) s += `-${c}`;
            return s;
        });
    }
    return d.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, function (_, a, b, c) {
        let s = "";
        if (a) s += `(${a}`;
        if (a && a.length === 2) s += `)`;
        if (b) s += ` ${b}`;
        if (c) s += `-${c}`;
        return s;
    });
}

function maskCEP(value) {
    const d = onlyDigits(value).slice(0, 8);
    return d.replace(/(\d{5})(\d{0,3})/, function (_, a, b) {
        return b ? `${a}-${b}` : a;
    });
}

function isAdult(dateStr, minAge = 16) {
    if (!dateStr) return false;
    const dob = new Date(dateStr);
    if (Number.isNaN(dob.getTime())) return false;
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age >= minAge;
}

function validateForm(form) {
    let ok = true;
    const errors = [];

    const nome = form.querySelector("#nome");
    const email = form.querySelector("#email");
    const cpf = form.querySelector("#cpf");
    const telefone = form.querySelector("#telefone");
    const nascimento = form.querySelector("#nascimento");
    const endereco = form.querySelector("#endereco");
    const cep = form.querySelector("#cep");
    const cidade = form.querySelector("#cidade");
    const estado = form.querySelector("#estado");
    const papel = form.querySelector("#papel");

    [nome, email, cpf, telefone, nascimento, endereco, cep, cidade, estado, papel].forEach(function (el) {
        if (!el) return;
        clearFieldError(el);
    });

    if (!nome.value.trim()) {
        ok = false;
        setFieldError(nome, "Informe seu nome completo.");
        errors.push("Nome");
    }
    if (!isEmail(email.value)) {
        ok = false;
        setFieldError(email, "E-mail inválido.");
        errors.push("E-mail");
    }
    if (!isCPFValid(cpf.value)) {
        ok = false;
        setFieldError(cpf, "CPF inválido.");
        errors.push("CPF");
    }
    const telOk = /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(telefone.value.trim());
    if (!telOk) {
        ok = false;
        setFieldError(telefone, "Telefone inválido. Ex.: (11) 98765-4321");
        errors.push("Telefone");
    }
    if (!isAdult(nascimento.value, 16)) {
        ok = false;
        setFieldError(nascimento, "Você precisa ter pelo menos 16 anos.");
        errors.push("Idade");
    }
    const cepOk = /^\d{5}-\d{3}$/.test(cep.value.trim());
    if (!cepOk) {
        ok = false;
        setFieldError(cep, "CEP inválido. Ex.: 12345-678");
        errors.push("CEP");
    }
    if (!cidade.value.trim()) {
        ok = false;
        setFieldError(cidade, "Informe a cidade.");
        errors.push("Cidade");
    }
    if (!estado.value) {
        ok = false;
        setFieldError(estado, "Selecione o estado (UF).");
        errors.push("UF");
    }
    if (!papel.value) {
        ok = false;
        setFieldError(papel, "Selecione uma opção.");
        errors.push("Perfil");
    }

    return { ok, errors };
}

function restoreDraft(form) {
    const draft = store.get(DRAFT_KEY, null);
    if (!draft) return;
    Object.keys(draft).forEach(function (id) {
        const el = form.querySelector(`#${id}`);
        if (el && typeof draft[id] === "string") {
            el.value = draft[id];
        }
    });
}

function saveDraft(form) {
    const fields = form.querySelectorAll("input, select, textarea");
    const data = {};
    fields.forEach(function (el) {
    });
    store.set(DRAFT_KEY, data);
}

export function mountSignupValidation(formSelector) {
    const form = document.querySelector(formSelector);
    if (!form) {
        return;
    }

    restoreDraft(form);

    form.addEventListener("input", function (e) {
        const t = e.target;
        if (t instanceof HTMLInputElement) {
            if (t.id === "cpf") t.value = maskCPF(t.value);
            if (t.id === "telefone") t.value = maskPhone(t.value);
            if (t.id === "cep") t.value = maskCEP(t.value);
            if (t.value.trim().length > 0) {
                clearFieldError(t);
            }
        }
        saveDraft(form);
    });

    form.addEventListener("submit", function (e) {
        const status = document.getElementById("status-form");
        if (status) {
            status.textContent = "";
        }
        const { ok, errors } = validateForm(form);
        if (!ok) {
            e.preventDefault();
            if (status) {
                status.textContent = "Por favor, corrija os campos destacados antes de enviar.";
            }
            showToast(`Verifique: ${errors.join(", ")}`, "warning", 5000);
            return;
        }
        e.preventDefault();
        store.remove(DRAFT_KEY);
        if (status) {
            status.textContent = "Cadastro enviado com sucesso! (simulação)";
        }
        showToast("Cadastro enviado com sucesso!", "success", 3000);
        form.reset();
    });
}