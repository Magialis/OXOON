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