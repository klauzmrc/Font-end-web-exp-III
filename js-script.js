// Atualiza ano no rodapé
document.addEventListener("DOMContentLoaded", function () {
    const anoSpan = document.getElementById("ano");
    if (anoSpan) {
        const agora = new Date();
        anoSpan.textContent = String(agora.getFullYear());
    }
});

// Máscara CPF: 000.000.000-00
function maskCPF(value) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    const part1 = digits.slice(0, 3);
    const part2 = digits.slice(3, 6);
    const part3 = digits.slice(6, 9);
    const part4 = digits.slice(9, 11);
    let out = "";
    if (part1) out = part1;
    if (part2) out += "." + part2;
    if (part3) out += "." + part3;
    if (part4) out += "-" + part4;
    return out;
}

// Máscara telefone BR: (00) 00000-0000
function maskPhone(value) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    const ddd = digits.slice(0, 2);
    const part1 = digits.length > 10 ? digits.slice(2, 7) : digits.slice(2, 6);
    const part2 = digits.length > 10 ? digits.slice(7, 11) : digits.slice(6, 10);
    let out = "";
    if (ddd) out = "(" + ddd + ")";
    if (part1) out += " " + part1;
    if (part2) out += "-" + part2;
    return out;
}

// Máscara CEP: 00000-000
function maskCEP(value) {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    const part1 = digits.slice(0, 5);
    const part2 = digits.slice(5, 8);
    let out = "";
    if (part1) out = part1;
    if (part2) out += "-" + part2;
    return out;
}

document.addEventListener("input", function (e) {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) {
        return;
    }
    if (target.id === "cpf") {
        target.value = maskCPF(target.value);
    }
    if (target.id === "telefone") {
        target.value = maskPhone(target.value);
    }
    if (target.id === "cep") {
        target.value = maskCEP(target.value);
    }
});

// Feedback simples no submit usando validação nativa
document.addEventListener("submit", function (e) {
    const form = e.target;
    if (!(form instanceof HTMLFormElement)) {
        return;
    }
    const status = document.getElementById("status-form");
    if (!form.checkValidity()) {
        e.preventDefault();
        if (status) {
            status.textContent = "Por favor, corrija os campos destacados antes de enviar.";
        }
        return;
    }
    if (status) {
        status.textContent = "Cadastro enviado com sucesso! (simulação)";
    }
});