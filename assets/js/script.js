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

// JS DA VISÃO GERAL

// -----------------



// JS DO SISTEMA DE ENERGIA

// -----------------



// JS DO SISTEMA DE OXIGÊNIO

// -----------------



// JS DOS SETORES DE CONSUMO

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

// -----------------