/* =====================================
   RAJ ARYAN NAIK — PORTFOLIO JS
===================================== */

// 1. Navbar changes when page is scrolled
const header = document.querySelector(".site-header");

function updateHeader() {
    if (header) {
        header.classList.toggle("scrolled", window.scrollY > 30);
    }
}

window.addEventListener("scroll", updateHeader, {
    passive: true
});
updateHeader();


// 2. Reveal cards and headings while scrolling
const revealElements = document.querySelectorAll(
    ".section-heading, .about-card, .info-card, " +
    ".skill-card, .project-card, .contact-panel"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}


// 3. Mouse-following glow in the anime scene
const animeScene = document.querySelector(".anime-scene");

if (animeScene) {
    animeScene.addEventListener("pointermove", (event) => {
        const rect = animeScene.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        animeScene.style.setProperty("--mouse-x", `${x}px`);
        animeScene.style.setProperty("--mouse-y", `${y}px`);
    });
}


// 4. Automatically update the footer year
const footerText = document.querySelector(".footer-content p");

if (footerText) {
    footerText.textContent =
        `Designed with curiosity by Raj Aryan Naik. © ${new Date().getFullYear()}`;
}


// 5. Highlight the navigation link for the current section
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                navLinks.forEach((link) => {
                    const active =
                        link.getAttribute("href") === `#${entry.target.id}`;

                    if (active) {
                        link.setAttribute("aria-current", "location");
                    } else {
                        link.removeAttribute("aria-current");
                    }
                });
            });
        }, {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}


// 6. Small press effect on project cards
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
    card.addEventListener("pointerdown", () => {
        card.classList.add("pressed");
    });

    const removePressed = () => {
        card.classList.remove("pressed");
    };

    card.addEventListener("pointerup", removePressed);
    card.addEventListener("pointerleave", removePressed);
    card.addEventListener("pointercancel", removePressed);
});

console.log("Portfolio loaded successfully!");
