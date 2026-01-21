const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

const scrollHeader = () =>{
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('scroll-header') 
                       : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
  	const scrollY = window.pageYOffset

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
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

sr.reveal(`.home__data, .projects__container, .footer__container`)
sr.reveal(`.home__img-wrapper`, {origin: 'bottom'})
sr.reveal(`.about__data, .skills__content`, {origin: 'left'})
sr.reveal(`.contact__container`, {origin: 'right'})
sr.reveal(`.services__card, .tech__box`, {interval: 100})

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