// Small interactions: mobile menu, rotating hero words, reveal-on-scroll, current year.
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

const words = ["AI", "ideas", "software", "the future"];
const typedWord = document.querySelector("#typed-word");
let wordIndex = 0;
if (typedWord) {
  window.setInterval(() => {
    wordIndex = (wordIndex + 1) % words.length;
    typedWord.animate(
      [{ opacity: 0, transform: "translateY(7px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 350, easing: "ease-out" }
    );
    typedWord.textContent = words[wordIndex];
  }, 1900);
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const year = document.querySelector("#year");
if (year) year.textContent = `© ${new Date().getFullYear()}`;
