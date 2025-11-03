import { mountSignupValidation } from "./components/formValidator.js";
import { showToast } from "./components/ui.js";

function $(sel, ctx = document) {
    return ctx.querySelector(sel);
}

function getAppRoot() {
    const root = $("#app");
    if (!root) {
        throw new Error("Container #app não encontrado. Adicione <main id='app'></main> no HTML.");
    }
    return root;
}

function getHashQuery() {
    const hash = (window.location && typeof window.location.hash === "string")
        ? window.location.hash
        : "";
    const parts = hash.split("?");
    if (parts.length < 2) {
        return {};
    }
    const query = parts[1];
    const obj = {};
    query.split("&").forEach(function (kv) {
        if (!kv) return;
        const [k, v] = kv.split("=");
        if (k) {
            const key = decodeURIComponent(k);
            obj[key] = val;
        }
    });
    return obj;
}

function templateHome() {
    return `
        <div class="container section">
            <section aria-labelledby="titulo-hero">
                <div class="grid">
                    <div class="col-12">
                        <h1 id="titulo-hero">Nossa missão é gerar impacto social sustentável</h1>
                    </div>
                    <div class="col-12">
                        <figure style="aspect-ratio:16/9; overflow:hidden; border:1px solid var(--color-border); border-radius: var(--radius);">
                            <img src="assets/img/projeto00.png" alt="Equipe de voluntários em ação em comunidade" loading="eager" style="width:100%; height:100%; object-fit:cover; object-position:center;">
                            <figcaption class="muted" style="padding:0.5rem;">Atuação em comunidades com foco em educação e saúde.</figcaption>
                        </figure>
                    </div>
                    <div class="col-12">
                        <p>Somos uma organização sem fins lucrativos dedicada a promover educação, saúde e cidadania em comunidades vulneráveis.</p>
                        <p><a class="btn btn-primary" data-link href="#/projetos">Conhecer projetos</a></p>
                    </div>
                </div>
            </section>
        </div>

        <div class="container section">
            <section aria-labelledby="sobre">
                <h2 id="sobre" class="mt-0">Missão, visão e valores</h2>
                <div class="grid">
                    <article class="col-12 col-4 card">
                        <h3>Missão</h3>
                        <p>Promover transformação social por meio de projetos de alto impacto.</p>
                    </article>
                    <article class="col-12 col-4 card">
                        <h3>Visão</h3>
                        <p>Ser referência em transparência, gestão e resultados no terceiro setor.</p>
                    </article>
                    <article class="col-12 col-4 card">
                        <h3>Valores</h3>
                        <ul>
                            <li>Transparência</li>
                            <li>Empatia</li>
                            <li>Responsabilidade</li>
                            <li>Colaboração</li>
                        </ul>
                    </article>
                </div>
            </section>
        </div>

        <aside aria-labelledby="transparencia">
            <div class="container section">
                <div class="grid">
                    <div class="col-12 col-6">
                        <h2 id="transparencia" class="mt-0">Transparência</h2>
                        <p class="muted">Acesse nossos relatórios anuais e prestação de contas.</p>
                    </div>
                    <div class="col-12 col-6 card">
                        <ul>
                            <li><a href="#" rel="noopener">Relatório 2023 (PDF)</a></li>
                            <li><a href="#" rel="noopener">Prestação de contas (HTML)</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    `;
}

function templateProjects() {
    return `
        <div class="container section">
            <header class="mb-0">
                <h1>Projetos sociais em andamento</h1>
                <p>Conheça nossas iniciativas e como você pode participar.</p>
            </header>
        </div>

        <div class="container section" aria-labelledby="lista-projetos">
            <h2 id="lista-projetos" class="mt-0">Projetos</h2>

            <div class="grid">
                <article id="educacao" class="col-12 col-6 card" aria-labelledby="proj-educacao">
                    <header><h3 id="proj-educacao">Educação para o Futuro</h3></header>
                    <figure style="aspect-ratio:16/9; overflow:hidden; border:1px solid var(--color-border); border-radius: var(--radius);">
                        <img src="assets/img/projeto01.png" alt="Crianças em sala com materiais didáticos" loading="lazy" style="width:100%; height:100%; object-fit:cover;">
                        <figcaption class="muted" style="padding:0.5rem;">Aulas de reforço e tecnologia para jovens.</figcaption>
                    </figure>
                    <p>Oferece reforço escolar, oficinas de lógica e iniciação em programação.</p>
                    <ul>
                        <li><strong>Impacto:</strong> 150 alunos por semestre</li>
                        <li><strong>Local:</strong> Zona Leste</li>
                        <li><strong>Categoria:</strong> Educação</li>
                    </ul>
                    <div class="badges">
                        <span class="badge badge--edu">Educação</span>
                    </div>
                    <p><a class="btn btn-primary" data-link href="#/cadastro">Quero participar</a></p>
                </article>

                <article id="saude" class="col-12 col-6 card" aria-labelledby="proj-saude">
                    <header><h3 id="proj-saude">Saúde em Movimento</h3></header>
                    <figure style="aspect-ratio:16/9; overflow:hidden; border:1px solid var(--color-border); border-radius: var(--radius);">
                        <img src="assets/img/projeto02.png" alt="Equipe de saúde em comunidade" loading="lazy" style="width:100%; height:100%; object-fit:cover;">
                        <figcaption class="muted" style="padding:0.5rem;">Atendimentos básicos e campanhas de prevenção.</figcaption>
                    </figure>
                    <p>Realiza triagens, orientações e encaminhamentos em comunidades.</p>
                    <ul>
                        <li><strong>Impacto:</strong> 500 atendimentos/ano</li>
                        <li><strong>Local:</strong> Zona Norte</li>
                        <li><strong>Categoria:</strong> Saúde</li>
                    </ul>
                    <div class="badges">
                        <span class="badge badge--saude">Saúde</span>
                    </div>
                    <p><a class="btn btn-primary" data-link href="#/cadastro">Quero participar</a></p>
                </article>

                <article id="meio-ambiente" class="col-12 col-6 card" aria-labelledby="proj-meio">
                    <header><h3 id="proj-meio">Meio Ambiente Já</h3></header>
                    <figure style="aspect-ratio:16/9; overflow:hidden; border:1px solid var(--color-border); border-radius: var(--radius);">
                        <img src="assets/img/projeto03.png" alt="Mutirão de limpeza em área verde" loading="lazy" style="width:100%; height:100%; object-fit:cover;">
                        <figcaption class="muted" style="padding:0.5rem;">Ações de conservação e educação ambiental.</figcaption>
                    </figure>
                    <p>Mobilizações de limpeza, plantio e educação ambiental em escolas.</p>
                    <ul>
                        <li><strong>Impacto:</strong> 1.200 árvores plantadas</li>
                        <li><strong>Local:</strong> Diversas regiões</li>
                        <li><strong>Categoria:</strong> Meio ambiente</li>
                    </ul>
                    <div class="badges">
                        <span class="badge">Meio ambiente</span>
                    </div>
                    <p><a class="btn btn-primary" data-link href="#/cadastro">Quero participar</a></p>
                </article>
            </div>
        </div>

        <div class="container section info-block" aria-labelledby="voluntariado">
            <h2 id="voluntariado" class="mt-0">Voluntariado</h2>
            <p>Descubra oportunidades de voluntariado e candidate-se:</p>
            <ul>
                <li>Monitoria de reforço escolar</li>
                <li>Mentoria em tecnologia</li>
                <li>Apoio em triagens de saúde</li>
            </ul>
            <p>Para participar, acesse a página <a data-link href="#/cadastro">Cadastro</a> e preencha seus dados.</p>
        </div>

        <div class="container section info-block" aria-labelledby="doacoes">
            <h2 id="doacoes" class="mt-0">Como doar</h2>
            <p>Você pode apoiar nossos projetos com doações financeiras ou de materiais.</p>
            <p><strong>Opções:</strong> PIX, cartão, boleto ou doações recorrentes.</p>
            <p>Transparência total com relatórios periódicos publicados na página inicial.</p>
            <p><a class="btn btn-outline" data-link href="#/">Ver transparência</a></p>
        </div>
    `;
}

function templateSignup() {
    return `
        <div class="container section">
            <header class="mb-0">
                <h1>Cadastro</h1>
                <p>Preencha seus dados para se candidatar ao voluntariado ou receber novidades.</p>
            </header>
        </div>

        <div class="container section">
            <section aria-labelledby="form-cadastro">
                <h2 id="form-cadastro" class="mt-0">Dados pessoais</h2>
                <form class="form" id="cadastro-form" action="#" method="post" novalidate="false">
                    <fieldset>
                        <legend>Identificação</legend>
                        <div class="field">
                            <label for="nome">Nome completo</label>
                            <input id="nome" name="nome" type="text" placeholder="Seu nome completo" autocomplete="name" required>
                        </div>
                        <div class="field">
                            <label for="email">E-mail</label>
                            <input id="email" name="email" type="email" placeholder="seuemail@exemplo.com" autocomplete="email" required>
                        </div>
                        <div class="field">
                            <label for="cpf">CPF</label>
                            <input id="cpf" name="cpf" type="text" inputmode="numeric" placeholder="000.000.000-00" maxlength="14" aria-describedby="dica-cpf" required>
                            <small id="dica-cpf">Formato: 000.000.000-00</small>
                        </div>
                        <div class="field">
                            <label for="telefone">Telefone</label>
                            <input id="telefone" name="telefone" type="tel" inputmode="tel" placeholder="(00) 00000-0000" maxlength="15" aria-describedby="dica-fone" required>
                            <small id="dica-fone">Formato: (00) 00000-0000</small>
                        </div>
                        <div class="field">
                            <label for="nascimento">Data de nascimento</label>
                            <input id="nascimento" name="nascimento" type="date" max="2100-12-31" required>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Endereço</legend>
                        <div class="field">
                            <label for="endereco">Endereço</label>
                            <input id="endereco" name="endereco" type="text" placeholder="Rua, número e complemento" autocomplete="street-address" required>
                        </div>
                        <div class="field">
                            <label for="cep">CEP</label>
                            <input id="cep" name="cep" type="text" inputmode="numeric" placeholder="00000-000" maxlength="9" aria-describedby="dica-cep" required>
                            <small id="dica-cep">Formato: 00000-000</small>
                        </div>
                        <div class="field">
                            <label for="cidade">Cidade</label>
                            <input id="cidade" name="cidade" type="text" autocomplete="address-level2" required>
                        </div>
                        <div class="field">
                            <label for="estado">Estado (UF)</label>
                            <select id="estado" name="estado" autocomplete="address-level1" required>
                                <option value="" selected disabled>Selecione</option>
                                <option>AC</option><option>AL</option><option>AP</option><option>AM</option>
                                <option>BA</option><option>CE</option><option>DF</option><option>ES</option>
                                <option>GO</option><option>MA</option><option>MT</option><option>MS</option>
                                <option>MG</option><option>PA</option><option>PB</option><option>PR</option>
                                <option>PE</option><option>PI</option><option>RJ</option><option>RN</option>
                                <option>RS</option><option>RO</option><option>RR</option><option>SC</option>
                                <option>SP</option><option>SE</option><option>TO</option>
                            </select>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Interesse</legend>
                        <div class="field">
                            <label for="papel">Quero me cadastrar como</label>
                            <select id="papel" name="papel" required>
                                <option value="" selected disabled>Selecione</option>
                                <option value="voluntario">Voluntário</option>
                                <option value="doador">Doador/Apoiador</option>
                                <option value="ambos">Ambos</option>
                            </select>
                        </div>
                        <div class="field">
                            <label for="mensagem">Mensagem (opcional)</label>
                            <textarea id="mensagem" name="mensagem" rows="4" placeholder="Conte brevemente seu interesse..."></textarea>
                        </div>
                    </fieldset>

                    <div>
                        <button type="submit" class="btn btn-primary">Enviar cadastro</button>
                    </div>

                    <div aria-live="polite" id="status-form" class="muted"></div>
                </form>
            </section>
        </div>
    `;
}

// Registro de templates
const registry = {
    home: templateHome,
    projects: templateProjects,
    signup: templateSignup
};

// Renderização segura do template
export async function renderTemplate(routeKey = "home") {
    const root = getAppRoot();

    const templateFn = registry[routeKey];

    if (typeof templateFn !== "function") {
        console.warn(`[templates] Template não encontrado para a rota "${routeKey}". Usando "home".`);
        root.innerHTML = registry.home();
        return;
    }

    // Injeta HTML
    root.innerHTML = templateFn();

    // Pós-render: validação do formulário no cadastro
    if (routeKey === "signup") {
        mountSignupValidation("#cadastro-form");
    }

    // Pós-render: toast de categoria em projetos 
    if (routeKey === "projects") {
        const q = getHashQuery();
        if (q.categoria) {
            showToast(`Categoria: ${q.categoria}`, "info");
        }
    }
}