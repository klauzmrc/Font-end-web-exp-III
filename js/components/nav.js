// js/components/nav.js
export function initNav() {
    const header = document.querySelector(".site-header");
    const toggle = document.querySelector(".nav-toggle");
    const dropdownParents = document.querySelectorAll(".has-dropdown > .nav-link");

    if (toggle && header) {
        toggle.addEventListener("click", function () {
            const opened = header.classList.toggle("nav-open");
            toggle.setAttribute("aria-expanded", opened ? "true" : "false");
        });
    }

    dropdownParents.forEach(function (parentLink) {
        parentLink.addEventListener("click", function (e) {
            if (window.matchMedia("(max-width: 767px)").matches) {
                e.preventDefault();
                const li = parentLink.parentElement;
                const expanded = li.classList.toggle("show-dropdown");
                parentLink.setAttribute("aria-expanded", expanded ? "true" : "false");
            }
        });
    });

    document.addEventListener("keyup", function (e) {
        if (e.key === "Escape") {
            document.querySelectorAll(".show-dropdown").forEach(function (el) {
                el.classList.remove("show-dropdown");
            });
            if (header && header.classList.contains("nav-open")) {
                header.classList.remove("nav-open");
                if (toggle) toggle.setAttribute("aria-expanded", "false");
            }
        }
    });
}