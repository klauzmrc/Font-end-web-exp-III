// js/app.js
import { initRouter, navigateTo } from "./router.js";
import { renderTemplate } from "./templates.js";
import { initNav } from "./components/nav.js";
import { showToast } from "./components/ui.js";

(function bootstrap() {
    document.addEventListener("DOMContentLoaded", function () {
        initNav();


        document.body.addEventListener("click", function (e) {

            const a = e.target instanceof Element ? e.target.closest("a") : null;
            if (!a) {
                return;
            }






            e.preventDefault();
            navigateTo(a.getAttribute("href"));
        });


        initRouter(async function onRouteChange(routeKey) {
            try {
                await renderTemplate(routeKey);
            } catch (err) {
                console.error(err);
                showToast("Não foi possível carregar esta seção agora. Tente novamente.", "warning");
            }
        });


    });
})();