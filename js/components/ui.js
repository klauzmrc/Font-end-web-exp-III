// js/components/ui.js
function ensureToastContainer() {
    let el = document.getElementById("toast-container");
    if (!el) {
        el = document.createElement("div");
        el.id = "toast-container";
        el.style.position = "fixed";
        el.style.right = "1rem";
        el.style.bottom = "1rem";
        el.style.display = "flex";
        el.style.flexDirection = "column";
        el.style.gap = "0.5rem";
        el.style.zIndex = "9999";
        document.body.appendChild(el);
    }
    return el;
}

export function showToast(message, type = "info", timeoutMs = 3000) {
    const container = ensureToastContainer();
    const toast = document.createElement("div");
    toast.className = `toast alert alert-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(function () {
        toast.remove();
    }, timeoutMs);
}