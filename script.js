/* =============================================================
   PRAXIS TUITION — Main JavaScript
   Three features:
     1. Navbar — turns solid on scroll
     2. Mobile menu — open/close toggle
     3. FAQ accordion — expand/collapse answers
     4. Scroll-triggered fade-in animations
     5. Contact form — basic client-side submission feedback
     6. Scroll-to-top button
   ============================================================= */


/* ---------------------------------------------------------------
   1. NAVBAR — becomes solid (#1e1f5e) after scrolling 80px
--------------------------------------------------------------- */
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


/* ---------------------------------------------------------------
   2. MOBILE MENU — hamburger toggle
--------------------------------------------------------------- */
const menuBtn    = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const iconOpen   = document.getElementById("icon-open");
const iconClose  = document.getElementById("icon-close");

menuBtn.addEventListener("click", () => {
  const isOpen = !mobileMenu.classList.contains("hidden");

  if (isOpen) {
    mobileMenu.classList.add("hidden");
    iconOpen.classList.remove("hidden");
    iconClose.classList.add("hidden");
  } else {
    mobileMenu.classList.remove("hidden");
    iconOpen.classList.add("hidden");
    iconClose.classList.remove("hidden");
  }
});

// Close the mobile menu when any nav link is clicked
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    iconOpen.classList.remove("hidden");
    iconClose.classList.add("hidden");
  });
});


/* ---------------------------------------------------------------
   3. FAQ ACCORDION
--------------------------------------------------------------- */
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer   = item.querySelector(".faq-answer");
  const icon     = item.querySelector(".faq-icon");

  question.addEventListener("click", () => {
    const isOpen = !answer.classList.contains("hidden");

    // Close all items first
    faqItems.forEach((otherItem) => {
      otherItem.querySelector(".faq-answer").classList.add("hidden");
      otherItem.querySelector(".faq-icon").classList.remove("open");
    });

    // If it was closed, open this one
    if (!isOpen) {
      answer.classList.remove("hidden");
      icon.classList.add("open");
    }
  });
});


/* ---------------------------------------------------------------
   4. SCROLL-TRIGGERED FADE-IN
   Adds the "fade-in" class to every section, then uses
   IntersectionObserver to add "visible" when in viewport.
--------------------------------------------------------------- */
const animateSections = document.querySelectorAll("section");

animateSections.forEach((section) => {
  section.classList.add("fade-in");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Stop observing once visible — no need to re-trigger
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }   // trigger when 10% of the section is visible
);

animateSections.forEach((section) => observer.observe(section));


/* ---------------------------------------------------------------
   5. CONTACT FORM — client-side feedback
   Replace the contents of this handler with a real form
   service (e.g. Formspree, EmailJS, Netlify Forms) when ready.
--------------------------------------------------------------- */
const contactForm   = document.getElementById("contact-form");
const formSuccess   = document.getElementById("form-success");
const submitButton  = contactForm.querySelector("button[type='submit']");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default page refresh

  // --- Swap this block for your real submission logic ---
  // Example with Formspree:
  //   fetch("https://formspree.io/f/YOUR_ID", {
  //     method: "POST",
  //     body: new FormData(contactForm),
  //     headers: { Accept: "application/json" },
  //   }).then(() => showSuccess()).catch(() => alert("Something went wrong."));

  // For now: simulate a short delay then show success
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  setTimeout(() => {
    contactForm.reset();
    submitButton.textContent = "Send Message →";
    submitButton.disabled = false;
    formSuccess.classList.remove("hidden");

    // Hide success message after 5 seconds
    setTimeout(() => formSuccess.classList.add("hidden"), 5000);
  }, 1200);
});


/* ---------------------------------------------------------------
   6. SCROLL-TO-TOP BUTTON
   Inject a floating button and show it after 400px scroll
--------------------------------------------------------------- */
const scrollTopBtn = document.createElement("button");
scrollTopBtn.id = "scroll-top";
scrollTopBtn.setAttribute("aria-label", "Scroll to top");
scrollTopBtn.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
  </svg>`;
scrollTopBtn.className =
  "fixed bottom-6 right-6 z-50 w-11 h-11 bg-brand-500 hover:bg-brand-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all";
document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
