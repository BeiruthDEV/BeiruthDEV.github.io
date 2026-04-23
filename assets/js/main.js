const header = document.getElementById("header");
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navLinks = Array.from(document.querySelectorAll(".nav__link"));
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const hero = document.getElementById("home");
const heroShell = hero?.querySelector(".hero__shell");
const heroVisual = document.getElementById("hero-visual");

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

const setHeroState = () => {
  if (!hero || !heroShell) {
    return;
  }

  const fadeDistance = hero.offsetHeight * 0.72;
  const progress = Math.min(window.scrollY / fadeDistance, 1);
  const opacity = 1 - progress;
  const translateY = progress * 48;
  const scale = 1 - progress * 0.04;

  heroShell.style.opacity = opacity.toFixed(3);
  heroShell.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale.toFixed(3)})`;
};

const closeMenu = () => {
  navMenu.classList.remove("is-open");
};

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("is-open");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener(
  "scroll",
  () => {
    setHeaderState();
    setHeroState();
  },
  { passive: true }
);
window.addEventListener("resize", () => {
  if (window.innerWidth > 820) {
    closeMenu();
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const activeLink = document.querySelector(`.nav__link[href="#${id}"]`);

      if (!activeLink) {
        return;
      }

      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("is-active"));
        activeLink.classList.add("is-active");
      }
    });
  },
  {
    threshold: 0.45,
    rootMargin: "-20% 0px -35% 0px",
  }
);

sections.forEach((section) => sectionObserver.observe(section));

if (heroVisual) {
  const halos = heroVisual.querySelectorAll(".hero__halo");
  const media = heroVisual.querySelector(".hero__portrait");

  heroVisual.addEventListener("pointermove", (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const relativeX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const relativeY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    halos.forEach((halo, index) => {
      const depth = (index + 1) * 10;
      halo.style.setProperty("--tx", `${relativeX * depth}px`);
      halo.style.setProperty("--ty", `${relativeY * depth}px`);
    });

    media.style.transform = `translate3d(${relativeX * 10}px, ${relativeY * 12}px, 0)`;
  });

  heroVisual.addEventListener("pointerleave", () => {
    halos.forEach((halo) => {
      halo.style.setProperty("--tx", "0px");
      halo.style.setProperty("--ty", "0px");
    });

    media.style.transform = "translate3d(0, 0, 0)";
  });
}

setHeaderState();
setHeroState();
