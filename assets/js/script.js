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

// -----------------



// JS DA TRIPULAÇÃO ATIVA

// -----------------



// JS DOS ALERTAS

// -----------------



// JS DOS RELATÓRIOS

// -----------------



// JS DAS CONFIGURAÇÕES

// -----------------