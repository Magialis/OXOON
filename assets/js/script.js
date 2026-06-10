/* =========================================================
   DOM
========================================================= */

const DOM = {
    clock: document.querySelector('#clock'),

    navItems: document.querySelectorAll('.nav__item'),
    pages: document.querySelectorAll('.page'),

    userMenu: document.querySelector('.user-menu'),
    userTrigger: document.querySelector('.user-menu__trigger'),

    reportModal: document.querySelector('.report-modal'),
    modalOverlay: document.querySelector('.report-modal__overlay'),
    modalOpenButton: document.querySelector('.new-report-btn'),
    modalCloseButton: document.querySelector('.report-modal__close'),
    modalCancelButton: document.querySelector('.cancel-btn'),

    reportForm: document.querySelector('.report-form'),
    reportsGrid: document.querySelector('.reports-grid'),

    filterButtons: document.querySelectorAll('[data-filter]'),
    subfilterButtons: document.querySelectorAll('[data-subfilter]'),

    hotspots: document.querySelectorAll('.mapa-hotspot'),

    mapaWrapper: document.querySelector('#mapaWrapper'),
    mapaInner: document.querySelector('#mapaInner'),
    fullscreenButton: document.querySelector('#mapaFullscreenBtn'),
    fullscreenIcon: document.querySelector('#mapaFullscreenIcon')
}


/* =========================================================
   HELPERS
========================================================= */

function padNumber(value) {
    return String(value).padStart(2, '0')
}

function removeActiveClass(elements) {
    elements.forEach(element => {
        element.classList.remove('active')
    })
}


/* =========================================================
   CLOCK
========================================================= */

function updateClock() {
    if (!DOM.clock) return

    const now = new Date()

    const hours = padNumber(now.getUTCHours())
    const minutes = padNumber(now.getUTCMinutes())
    const seconds = padNumber(now.getUTCSeconds())

    DOM.clock.textContent = `${hours}:${minutes}:${seconds}`
}

function initializeClock() {
    updateClock()
    setInterval(updateClock, 1000)
}


/* =========================================================
   NAVIGATION
========================================================= */

function showPage(pageId) {
    DOM.pages.forEach(page => {
        page.classList.remove('active')
    })

    document
        .getElementById(pageId)
        ?.classList.add('active')
}

function handleNavigation(event) {
    event.preventDefault()

    const navItem = event.currentTarget

    removeActiveClass(DOM.navItems)

    navItem.classList.add('active')

    const targetId = navItem
        .querySelector('a')
        .getAttribute('href')
        .replace('#', '')

    showPage(targetId)
}

function initializeNavigation() {
    DOM.navItems.forEach(item => {
        item.addEventListener('click', handleNavigation)
    })
}


/* =========================================================
   USER MENU
========================================================= */

function toggleUserMenu() {
    DOM.userMenu.classList.toggle('active')
}

function closeUserMenu(event) {
    const clickedInsideMenu = DOM.userMenu.contains(event.target)

    if (!clickedInsideMenu) {
        DOM.userMenu.classList.remove('active')
    }
}

function initializeUserMenu() {
    if (!DOM.userMenu || !DOM.userTrigger) return

    DOM.userTrigger.addEventListener('click', toggleUserMenu)

    document.addEventListener('click', closeUserMenu)
}


/* =========================================================
   REPORT MODAL
========================================================= */

function openModal() {
    DOM.reportModal.classList.add('active')
}

function closeModal() {
    DOM.reportModal.classList.remove('active')
}

function initializeModal() {
    if (!DOM.reportModal) return

    DOM.modalOpenButton?.addEventListener('click', openModal)

    DOM.modalCloseButton?.addEventListener('click', closeModal)

    DOM.modalCancelButton?.addEventListener('click', closeModal)

    DOM.modalOverlay?.addEventListener('click', closeModal)
}


/* =========================================================
   REPORTS
========================================================= */

const REPORT_CATEGORIES = {
    energia: {
        label: 'Energia',
        className: 'tag--energy'
    },

    oxigenio: {
        label: 'Oxigênio',
        className: 'tag--oxygen'
    }
}

const REPORT_SUBCATEGORIES = {
    consumo: {
        label: 'Consumo',
        className: 'tag--consumption'
    },

    producao: {
        label: 'Produção',
        className: 'tag--production'
    },

    manutencao: {
        label: 'Manutenção',
        className: 'tag--maintenance'
    },

    emergencia: {
        label: 'Emergência',
        className: 'tag--danger'
    }
}

function generateMJD() {
    const now = new Date()

    const unixTime = now.getTime()

    const mjd = unixTime / 86400000 + 40587

    return `MJD ${mjd.toFixed(3)}`
}

function createReportCard({
    title,
    description,
    category,
    subcategory
}) {

    const categoryData = REPORT_CATEGORIES[category]

    const subcategoryData = REPORT_SUBCATEGORIES[subcategory]

    return `
        <article
            class="report-card"
            data-category="${category}"
            data-subcategory="${subcategory}">

            <div class="report-card__tags">

                <span class="tag ${categoryData.className}">
                    ${categoryData.label}
                </span>

                <span class="tag ${subcategoryData.className}">
                    ${subcategoryData.label}
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
}

function handleReportSubmit(event) {
    event.preventDefault()

    const title = document.querySelector('#reportTitle').value

    const description = document.querySelector('#reportDescription').value

    const category = document.querySelector('#reportCategory').value

    const subcategory = document.querySelector('#reportSubcategory').value

    const card = createReportCard({
        title,
        description,
        category,
        subcategory
    })

    DOM.reportsGrid.insertAdjacentHTML('afterbegin', card)

    filterReports()

    DOM.reportForm.reset()

    closeModal()
}

function initializeReports() {
    if (!DOM.reportForm) return

    DOM.reportForm.addEventListener('submit', handleReportSubmit)
}


/* =========================================================
   REPORT FILTERS
========================================================= */

let currentFilter = 'all'
let currentSubfilter = 'all'

function filterReports() {
    const reportCards = document.querySelectorAll('.report-card')

    reportCards.forEach(card => {

        const category = card.dataset.category

        const subcategory = card.dataset.subcategory

        const matchesCategory =
            currentFilter === 'all' ||
            category === currentFilter

        const matchesSubcategory =
            currentSubfilter === 'all' ||
            subcategory === currentSubfilter

        card.classList.toggle(
            'hidden',
            !(matchesCategory && matchesSubcategory)
        )
    })
}

function handleFilterClick(buttons, activeButton, filterType) {

    removeActiveClass(buttons)

    activeButton.classList.add('active')

    if (filterType === 'category') {
        currentFilter = activeButton.dataset.filter
    }

    if (filterType === 'subcategory') {
        currentSubfilter = activeButton.dataset.subfilter
    }

    filterReports()
}

function initializeFilters() {

    DOM.filterButtons.forEach(button => {

        button.addEventListener('click', () => {

            handleFilterClick(
                DOM.filterButtons,
                button,
                'category'
            )

        })

    })

    DOM.subfilterButtons.forEach(button => {

        button.addEventListener('click', () => {

            handleFilterClick(
                DOM.subfilterButtons,
                button,
                'subcategory'
            )

        })

    })

}


/* =========================================================
   HOTSPOTS
========================================================= */

function closeHotspots() {
    DOM.hotspots.forEach(hotspot => {
        hotspot.classList.remove('mapa-hotspot--active')
    })
}

function handleHotspotClick(event, hotspot) {
    event.stopPropagation()

    const isActive = hotspot.classList.contains('mapa-hotspot--active')

    closeHotspots()

    if (!isActive) {
        hotspot.classList.add('mapa-hotspot--active')
    }
}

function initializeHotspots() {

    if (!DOM.hotspots.length) return

    document.addEventListener('click', event => {

        if (!event.target.closest('.mapa-hotspot')) {
            closeHotspots()
        }

    })

    DOM.hotspots.forEach(hotspot => {

        hotspot.addEventListener('click', event => {
            handleHotspotClick(event, hotspot)
        })

    })

}


/* =========================================================
   FULLSCREEN MAP
========================================================= */

const MAP_RATIO = 740 / 480

function isFullscreen() {
    return !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement
    )
}

function fitMapToScreen() {

    if (!DOM.mapaInner) return

    if (!isFullscreen()) {

        DOM.mapaInner.style.width = ''

        DOM.mapaInner.style.height = ''

        return
    }

    const viewportWidth = window.innerWidth

    const viewportHeight = window.innerHeight

    if (viewportWidth / viewportHeight > MAP_RATIO) {

        DOM.mapaInner.style.height = `${viewportHeight}px`

        DOM.mapaInner.style.width =
            `${viewportHeight * MAP_RATIO}px`

    } else {

        DOM.mapaInner.style.width = `${viewportWidth}px`

        DOM.mapaInner.style.height =
            `${viewportWidth / MAP_RATIO}px`
    }
}

function updateFullscreenUI() {

    if (!DOM.fullscreenIcon || !DOM.fullscreenButton) return

    DOM.fullscreenIcon.className = isFullscreen()
        ? 'ph ph-arrows-in'
        : 'ph ph-arrows-out'

    DOM.fullscreenButton.title = isFullscreen()
        ? 'Sair da tela cheia'
        : 'Expandir mapa'

    fitMapToScreen()
}

function toggleFullscreen() {

    if (!DOM.mapaWrapper) return

    if (!isFullscreen()) {

        (
            DOM.mapaWrapper.requestFullscreen ||
            DOM.mapaWrapper.webkitRequestFullscreen
        ).call(DOM.mapaWrapper)

    } else {

        (
            document.exitFullscreen ||
            document.webkitExitFullscreen
        ).call(document)

    }
}

function initializeFullscreenMap() {

    if (!DOM.fullscreenButton) return

    DOM.fullscreenButton.addEventListener(
        'click',
        toggleFullscreen
    )

    document.addEventListener(
        'fullscreenchange',
        updateFullscreenUI
    )

    document.addEventListener(
        'webkitfullscreenchange',
        updateFullscreenUI
    )

    window.addEventListener('resize', () => {

        if (isFullscreen()) {
            fitMapToScreen()
        }

    })
}


/* =========================================================
   INIT
========================================================= */

function initializeApp() {

    initializeClock()

    initializeNavigation()

    initializeUserMenu()

    initializeModal()

    initializeReports()

    initializeFilters()

    initializeHotspots()

    initializeFullscreenMap()
}

initializeApp()