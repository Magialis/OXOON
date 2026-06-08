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

// -----------------



// JS DOS ALERTAS

// -----------------



// JS DOS RELATÓRIOS

// -----------------