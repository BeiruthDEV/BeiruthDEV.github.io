const root = document.documentElement;
const header = document.getElementById("header");
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navLinks = [...document.querySelectorAll(".nav__link")];
const sections = [...document.querySelectorAll("main section[id]")];
const faqButtons = [...document.querySelectorAll(".faq-card__question")];
const processGrid = document.querySelector(".process-grid");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const mobileMenu = window.matchMedia("(max-width: 920px)");

root.classList.add("js");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
};

const isMenuOpen = () => navMenu?.classList.contains("is-open");

const closeMenu = (restoreFocus = false) => {
  if (!navMenu || !navToggle || !isMenuOpen()) {
    return;
  }

  navMenu.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Abrir menu");
  document.body.classList.remove("menu-open");

  if (restoreFocus) {
    navToggle.focus();
  }
};

const openMenu = () => {
  if (!navMenu || !navToggle) {
    return;
  }

  navMenu.classList.add("is-open");
  navToggle.setAttribute("aria-expanded", "true");
  navToggle.setAttribute("aria-label", "Fechar menu");
  document.body.classList.add("menu-open");
  navMenu.querySelector("a")?.focus();
};

navToggle?.addEventListener("click", () => {
  if (isMenuOpen()) {
    closeMenu(true);
  } else {
    openMenu();
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => closeMenu());
});

document.addEventListener("keydown", (event) => {
  if (!isMenuOpen()) {
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();
    closeMenu(true);
    return;
  }

  if (event.key !== "Tab" || !navMenu || !navToggle) {
    return;
  }

  const focusable = [...navMenu.querySelectorAll("a[href]")];
  const first = focusable[0];
  const last = focusable.at(-1);

  if (!first || !last) {
    return;
  }

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    navToggle.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    navToggle.focus();
  } else if (!event.shiftKey && document.activeElement === navToggle) {
    event.preventDefault();
    first.focus();
  }
});

document.addEventListener("pointerdown", (event) => {
  if (!isMenuOpen() || !navMenu || !navToggle) {
    return;
  }

  if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
    closeMenu();
  }
});

mobileMenu.addEventListener("change", (event) => {
  if (!event.matches) {
    closeMenu();
  }
});

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".faq-card");
    if (!card || card.classList.contains("is-open")) {
      return;
    }

    faqButtons.forEach((item) => {
      item.closest(".faq-card")?.classList.remove("is-open");
      item.setAttribute("aria-expanded", "false");
    });

    card.classList.add("is-open");
    button.setAttribute("aria-expanded", "true");
  });
});

const setupScrollReveal = () => {
  if (reducedMotion.matches || typeof window.ScrollReveal !== "function") {
    return;
  }

  root.classList.add("has-scrollreveal");

  const reveal = window.ScrollReveal({
    distance: "22px",
    duration: 640,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    opacity: 0,
    scale: 0.985,
    reset: false,
    mobile: true,
    viewFactor: 0.14,
  });

  reveal.reveal(".hero__copy", { origin: "left", delay: 80, distance: "24px" });
  reveal.reveal(".hero__visual", { origin: "right", delay: 145, distance: "24px", scale: 0.96 });
  reveal.reveal(".technology-strip", { origin: "bottom", delay: 80, distance: "18px", duration: 520 });
  reveal.reveal(".section-heading", { origin: "bottom", distance: "18px", duration: 540 });
  reveal.reveal(".project-card", { origin: "bottom", interval: 75, delay: 70 });
  reveal.reveal(".service-card", { origin: "bottom", interval: 80, delay: 70 });
  reveal.reveal(".metrics", { origin: "bottom", distance: "18px", duration: 540 });
  reveal.reveal(".process-card", { origin: "bottom", interval: 85, delay: 70 });
  reveal.reveal(".process-cta", { origin: "bottom", delay: 90, distance: "18px" });
  reveal.reveal(".about-profile", { origin: "left", delay: 80, distance: "14px" });
  reveal.reveal(".about-intro, .stack-card, .experience-card", { origin: "right", interval: 75, delay: 110, distance: "14px" });
  reveal.reveal(".certificate", { origin: "bottom", interval: 90, delay: 70 });
  reveal.reveal(".faq-card", { origin: "bottom", interval: 65, delay: 60, distance: "18px" });
  reveal.reveal(".final-cta__panel", { origin: "bottom", delay: 80, distance: "22px" });
};

setupScrollReveal();

if (processGrid) {
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    processGrid.classList.add("is-connected");
  } else {
    const processObserver = new IntersectionObserver(
      ([entry], observer) => {
        if (entry.isIntersecting) {
          processGrid.classList.add("is-connected");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.28 }
    );

    processObserver.observe(processGrid);
  }
}

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const activeLink = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
        if (!activeLink) {
          return;
        }

        navLinks.forEach((link) => link.classList.remove("is-active"));
        activeLink.classList.add("is-active");
      });
    },
    { threshold: 0.3, rootMargin: "-25% 0px -55% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

document.getElementById("current-year").textContent = new Date().getFullYear();

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();
