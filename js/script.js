/* =============================================================
   PRAXIS TUITION — Page-level JavaScript
   components.js handles all shared behaviour (navbar, mobile
   menu, consultation form, scroll-to-top).

   This file handles anything specific to individual pages,
   currently: the FAQ accordion (used on index, resources, and
   any other page that contains .faq-item elements).
   ============================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------------
     FAQ ACCORDION
     Works automatically on any page containing .faq-item elements.
     Only one answer is open at a time.
  --------------------------------------------------------------- */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer   = item.querySelector(".faq-answer");
    const icon     = item.querySelector(".faq-icon");

    question?.addEventListener("click", () => {
      const isOpen = !answer.classList.contains("hidden");

      // Close every item
      faqItems.forEach((other) => {
        other.querySelector(".faq-answer")?.classList.add("hidden");
        other.querySelector(".faq-icon")?.classList.remove("open");
      });

      // If this one was closed, open it
      if (!isOpen) {
        answer.classList.remove("hidden");
        icon?.classList.add("open");
      }
    });
  });

  /* ---------------------------------------------------------------
     FADE-IN SCROLL ANIMATION
     Observes every element with the .fade-in class and adds
     .visible when it enters the viewport.
  --------------------------------------------------------------- */
  const fadeEls = document.querySelectorAll(".fade-in");

  if (fadeEls.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // stop watching once visible
          }
        });
      },
      { threshold: 0.08 }
    );
    fadeEls.forEach((el) => observer.observe(el));
  }

});
