/* =============================================================
   PRAXIS TUITION — Page-level JavaScript
   components.js handles: navbar, mobile menu, consultation form,
   fade-in observer, scroll-to-top.

   This file handles: FAQ accordions on any page that has them.
   ============================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------------
     FAQ ACCORDION
     Works on any page that has .faq-item elements.
  --------------------------------------------------------------- */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer   = item.querySelector(".faq-answer");
    const icon     = item.querySelector(".faq-icon");

    question?.addEventListener("click", () => {
      const isOpen = !answer.classList.contains("hidden");

      // Close all
      faqItems.forEach((other) => {
        other.querySelector(".faq-answer")?.classList.add("hidden");
        other.querySelector(".faq-icon")?.classList.remove("open");
      });

      // Open this one if it was closed
      if (!isOpen) {
        answer.classList.remove("hidden");
        icon?.classList.add("open");
      }
    });
  });

  /* ---------------------------------------------------------------
     FADE-IN — applied to any .fade-in element on the page
     (components.js runs its own observer, but this catches any
     elements that are added by the page HTML directly)
  --------------------------------------------------------------- */
  const fadeEls = document.querySelectorAll(".fade-in");
  if (fadeEls.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    fadeEls.forEach((el) => observer.observe(el));
  }

});
