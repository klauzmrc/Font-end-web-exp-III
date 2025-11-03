const routes = {
    "#/": "home",
    "": "home",
    "#/projetos": "projects",
    "#/cadastro": "signup"
};

function getHash() {
   
    const raw = (window.location && typeof window.location.hash === "string")
        ? window.location.hash
        : "";
    return normalizeHash(raw);
}

function normalizeHash(input) {
    
    let h = typeof input === "string" ? input : "";
    if (!h.startsWith("#/")) {
        if (h.startsWith("#")) {
            h = "#/" + h.slice(1);
        } else {
            h = "#/" + h;
        }
    }
    return h;
}

function parseRoute(hash) {
    
    const safeHash = normalizeHash(hash);
    const parts = safeHash.split("?");
    const path = parts[0];
    return routes[path] || null;
}

export function navigateTo(hashUrl) {
    
    const normalized = normalizeHash(hashUrl);
    window.location.hash = normalized;
}

export function initRouter(onRouteChange) {
    function handle() {
        const current = getHash();
        const routeKey = parseRoute(current);
        onRouteChange(routeKey);
    }
    window.addEventListener("hashchange", handle);
    
    handle();
}