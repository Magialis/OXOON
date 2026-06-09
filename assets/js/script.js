// Relógio UTC
function tick() {
    const n = new Date();
    const pad = x => String(x).padStart(2, '0');
    document.getElementById('clock').textContent =
        pad(n.getUTCHours()) + ':' + pad(n.getUTCMinutes()) + ':' + pad(n.getUTCSeconds());
}
tick();
setInterval(tick, 1000);

// Sinalização do item ativo no menu e troca de seções
const navItems = document.querySelectorAll('.nav__item');
const pages = document.querySelectorAll('.page');

navItems.forEach(item => {
    item.addEventListener('click', (event) => {
        event.preventDefault();
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        const targetId = item
            .querySelector('a')
            .getAttribute('href')
            .replace('#', '');

        pages.forEach(page => {
            page.classList.remove('active');
        });
        document
            .getElementById(targetId)
            .classList.add('active');
    });
});

const userMenu = document.querySelector('.user-menu')
const userTrigger = document.querySelector('.user-menu__trigger')

userTrigger.addEventListener('click', () => {
    userMenu.classList.toggle('active')
})

document.addEventListener('click', event => {

    const clickedInsideMenu =
        userMenu.contains(event.target)

    if (!clickedInsideMenu) {
        userMenu.classList.remove('active')
    }

})

/* MODAL */

const reportModal =
    document.querySelector('.report-modal')

const openModalBtn =
    document.querySelector('.new-report-btn')

const closeModalBtn =
    document.querySelector('.report-modal__close')

const cancelBtn =
    document.querySelector('.cancel-btn')

/* FORM */

const reportForm =
    document.querySelector('.report-form')

const reportsGrid =
    document.querySelector('.reports-grid')

/* OPEN */

openModalBtn.addEventListener('click', () => {
    reportModal.classList.add('active')
})

/* CLOSE */

function closeModal() {
    reportModal.classList.remove('active')
}

closeModalBtn.addEventListener('click', closeModal)

cancelBtn.addEventListener('click', closeModal)

document
    .querySelector('.report-modal__overlay')
    .addEventListener('click', closeModal)

/* MJD */

function generateMJD() {

    const now = new Date()

    const unixTime =
        now.getTime()

    const mjd =
        unixTime / 86400000 + 40587

    return `MJD ${mjd.toFixed(3)}`
}

/* TAG LABELS */

function getCategoryLabel(category) {

    if (category === 'energia')
        return 'Energia'

    return 'Oxigênio'
}

function getSubcategoryLabel(subcategory) {

    const labels = {
        consumo: 'Consumo',
        producao: 'Produção',
        manutencao: 'Manutenção',
        emergencia: 'Emergência'
    }

    return labels[subcategory]
}

/* TAG CLASSES */

function getSubcategoryClass(subcategory) {

    const classes = {
        consumo: 'tag--consumption',
        producao: 'tag--production',
        manutencao: 'tag--maintenance',
        emergencia: 'tag--danger'
    }

    return classes[subcategory]
}

/* CREATE REPORT */

reportForm.addEventListener('submit', event => {

    event.preventDefault()

    const title =
        document.querySelector('#reportTitle').value

    const description =
        document.querySelector('#reportDescription').value

    const category =
        document.querySelector('#reportCategory').value

    const subcategory =
        document.querySelector('#reportSubcategory').value

    const card = `
        <article
            class="report-card"
            data-category="${category}"
            data-subcategory="${subcategory}">

            <div class="report-card__tags">

                <span class="tag ${category === 'energia'
            ? 'tag--energy'
            : 'tag--oxygen'
        }">

                    ${getCategoryLabel(category)}

                </span>

                <span class="tag ${getSubcategoryClass(subcategory)
        }">

                    ${getSubcategoryLabel(subcategory)}

                </span>

            </div>

            <h3 class="report-card__title">
                ${title}
            </h3>

            <p class="report-card__text">
                ${description}
            </p>

            <span class="report-card__date">
                ${generateMJD()}
            </span>

        </article>
    `

    reportsGrid.insertAdjacentHTML(
        'afterbegin',
        card
    )

    reportForm.reset()

    closeModal()
})

// JS DA VISÃO GERAL

// -----------------



// JS DO SISTEMA DE ENERGIA

// -----------------



// JS DO SISTEMA DE OXIGÊNIO

// -----------------



// JS DOS SETORES DE CONSUMO
(function () {
    const hotspots = document.querySelectorAll('.mapa-hotspot');
    
    // Fechar todos ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mapa-hotspot')) {
            hotspots.forEach(h => h.classList.remove('mapa-hotspot--active'));
        }
    });
    
    // Toggle ao clicar no módulo (opcional — mantém tooltip aberto no mobile)
    hotspots.forEach((hotspot) => {
        hotspot.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = hotspot.classList.contains('mapa-hotspot--active');
            hotspots.forEach(h => h.classList.remove('mapa-hotspot--active'));
            if (!isActive) hotspot.classList.add('mapa-hotspot--active');
        });
    });

    // --- Fullscreen do mapa --------------------------------
    const mapaWrapper = document.getElementById('mapaWrapper');
    const mapaInner = document.getElementById('mapaInner');
    const mapaBtn = document.getElementById('mapaFullscreenBtn');
    const mapaIcon = document.getElementById('mapaFullscreenIcon');

    const MAPA_RATIO = 740 / 480; // aspect-ratio da imagem

    function isFullscreen() {
        return !!(document.fullscreenElement || document.webkitFullscreenElement);
    }

    // Recalcula o tamanho do mapa-inner para preencher a tela
    // mantendo o aspect-ratio, para que os hotspots em % continuem corretos
    function fitMapaInner() {
        if (!mapaInner) return;
        if (!isFullscreen()) {
            // Modo normal: inner preenche o wrapper inteiramente
            mapaInner.style.width = '';
            mapaInner.style.height = '';
            return;
        }
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        if (vw / vh > MAPA_RATIO) {
            // Tela mais larga que a imagem: limitar pela altura
            mapaInner.style.height = vh + 'px';
            mapaInner.style.width = (vh * MAPA_RATIO) + 'px';
        } else {
            // Tela mais alta que a imagem: limitar pela largura
            mapaInner.style.width = vw + 'px';
            mapaInner.style.height = (vw / MAPA_RATIO) + 'px';
        }
    }

    function updateIcon() {
        mapaIcon.className = isFullscreen() ? 'ph ph-arrows-in' : 'ph ph-arrows-out';
        mapaBtn.title = isFullscreen() ? 'Sair da tela cheia' : 'Expandir mapa';
        fitMapaInner();
    }

    if (mapaBtn && mapaWrapper) {
        mapaBtn.addEventListener('click', () => {
            if (!isFullscreen()) {
                (mapaWrapper.requestFullscreen || mapaWrapper.webkitRequestFullscreen)
                    .call(mapaWrapper);
            } else {
                (document.exitFullscreen || document.webkitExitFullscreen)
                    .call(document);
            }
        });

        document.addEventListener('fullscreenchange', updateIcon);
        document.addEventListener('webkitfullscreenchange', updateIcon);

        // Reajusta se o usuário redimensionar a janela estando em fullscreen
        window.addEventListener('resize', () => { if (isFullscreen()) fitMapaInner(); });
    }
})();
// -----------------



// JS DA TRIPULAÇÃO ATIVA

document.addEventListener('DOMContentLoaded', () => {
    const metricsConfig = {
        saude: { selector: '.metric:nth-child(1)', current: 92, min: 88, max: 96, step: 0.3, unit: '%', isPct: true },
        temp:  { selector: '.metric:nth-child(2)', current: 36.4, min: 37.0, max: 38.2, step: 0.05, unit: '°C', isPct: false, mapMin: 35, mapMax: 42 },
        bpm:   { selector: '.metric:nth-child(3)', current: 72, min: 65, max: 140, step: 1.5, unit: ' BPM', isPct: false, mapMin: 50, mapMax: 150 },
        o2:    { selector: '.metric:nth-child(4)', current: 98, min: 96, max: 100, step: 0.2, unit: '%', isPct: true }
    };

    function updateDOM(config) {
        const metricElement = document.querySelector(config.selector);
        if (!metricElement) return;

        const valueText = metricElement.querySelector('.metric__value');
        const progressBar = metricElement.querySelector('.metric__bar');
        const metricFill = metricElement.querySelector('.metric__fill');

        if (config.unit === '°C') {
            valueText.textContent = `${config.current.toFixed(1)}${config.unit}`;
        } else {
            valueText.textContent = `${Math.round(config.current)}${config.unit}`;
        }

        let percentage = 0;
        if (config.isPct) {
            percentage = config.current;
        } else {
            percentage = ((config.current - config.mapMin) / (config.mapMax - config.mapMin)) * 100;
        }

        percentage = Math.max(0, Math.min(100, percentage));

        metricFill.style.width = `${percentage}%`;
        progressBar.setAttribute('aria-valuenow', Math.round(percentage));
    }

    function smoothUpdate() {
        Object.keys(metricsConfig).forEach(key => {
            const config = metricsConfig[key];

            const change = (Math.random() * 2 - 1) * config.step;
            
            config.current += change;

            if (config.current > config.max) config.current = config.max;
            if (config.current < config.min) config.current = config.min;

            updateDOM(config);
        });
    }

    Object.keys(metricsConfig).forEach(key => updateDOM(metricsConfig[key]));

    setInterval(smoothUpdate, 400);
});

// -----------------



// JS DOS ALERTAS

// -----------------



// JS DOS RELATÓRIOS
const filterButtons = document.querySelectorAll('[data-filter]')
const subfilterButtons = document.querySelectorAll('[data-subfilter]')
const reportCards = document.querySelectorAll('.report-card')

let currentFilter = 'all'
let currentSubfilter = 'all'

function filterReports() {
    reportCards.forEach(card => {
        const category = card.dataset.category
        const subcategory = card.dataset.subcategory

        const matchCategory =
            currentFilter === 'all' ||
            category === currentFilter

        const matchSubcategory =
            currentSubfilter === 'all' ||
            subcategory === currentSubfilter

        if (matchCategory && matchSubcategory) {
            card.style.display = 'flex'
        } else {
            card.style.display = 'none'
        }
    })
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn =>
            btn.classList.remove('active')
        )

        button.classList.add('active')

        currentFilter = button.dataset.filter

        filterReports()
    })
})

subfilterButtons.forEach(button => {
    button.addEventListener('click', () => {
        subfilterButtons.forEach(btn =>
            btn.classList.remove('active')
        )

        button.classList.add('active')

        currentSubfilter = button.dataset.subfilter

        filterReports()
    })
})
// -----------------



// JS DAS CONFIGURAÇÕES

// -----------------