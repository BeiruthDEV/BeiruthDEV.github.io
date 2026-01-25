const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

const scrollHeader = () => {
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('scroll-header')
        : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,

})

sr.reveal(`.home__data, .footer__container`)

sr.reveal(`.home__img-wrapper`, { origin: 'bottom', delay: 600 })

sr.reveal(`.about__data`, { origin: 'left' })

sr.reveal(`.education`, { origin: 'bottom', interval: 100 })

sr.reveal(`.tech__box, .project__card`, { interval: 100 })

sr.reveal(`.contact__container`, { origin: 'right' })

const contactForm = document.getElementById('contact-form')
const contactButton = contactForm.querySelector('button')

contactForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const originalContent = contactButton.innerHTML
    contactButton.innerHTML = 'Enviando... <i class="ri-loader-4-line ri-spin"></i>'

    const formData = new FormData(contactForm)

    fetch("https://formsubmit.co/ajax/matheusbeiruth10@gmail.com", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            contactButton.innerHTML = 'Mensagem Enviada ✅'
            contactButton.style.backgroundColor = '#00e676'
            contactButton.style.color = '#000'
            contactForm.reset()

            setTimeout(() => {
                contactButton.innerHTML = originalContent
                contactButton.style.backgroundColor = ''
                contactButton.style.color = ''
            }, 5000)
        })
        .catch(error => {
            contactButton.innerHTML = 'Erro ao enviar ❌'
            console.error('Erro:', error)

            setTimeout(() => {
                contactButton.innerHTML = originalContent
            }, 3000)
        })
})


const textElement = document.querySelector('.typewriter-text');
const phrases = ['a Backend Engineer', 'a Java Specialist', 'a Python Expert', 'solving problems'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

document.addEventListener('DOMContentLoaded', typeWriter);

const yearSpan = document.querySelector('.footer__copy');
if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.innerHTML = `&copy; ${currentYear} Matheus Beiruth. Engenheiro de Software.`;
}