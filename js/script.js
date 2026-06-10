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
     TYPEWRITER — Hero rotating catchphrases
     Only runs if #typewriter-text exists (i.e. on the home page).
  --------------------------------------------------------------- */
  const typewriterEl = document.getElementById("typewriter-text");
  const cursorEl     = document.querySelector(".typewriter-cursor");

  if (typewriterEl) {
    const phrases = [
      "Singapore's Leading IB Humanities Education Centre.",
      "Creating the educational experience you deserve.",
      "Feel the PRAXIS difference.",
    ];

    const TYPING_SPEED  = 40;   // ms per character — how fast it types
    const ERASING_SPEED = 20;   // ms per character — how fast it erases
    const PAUSE_AFTER   = 3000; // ms to hold the completed phrase before erasing
    const PAUSE_BEFORE  = 250;  // ms to wait before typing the next phrase

    let phraseIndex = 0;
    let charIndex   = 0;
    let isErasing   = false;

    function tick() {
      const current = phrases[phraseIndex];

      if (!isErasing) {
        // --- TYPING ---
        charIndex++;
        typewriterEl.textContent = current.slice(0, charIndex);
        cursorEl?.classList.add("typing");       // solid cursor while typing

        if (charIndex === current.length) {
          // Finished typing — pause, then start erasing
          isErasing = true;
          cursorEl?.classList.remove("typing");  // resume blinking during pause
          setTimeout(tick, PAUSE_AFTER);
          return;
        }
        setTimeout(tick, TYPING_SPEED);

      } else {
        // --- ERASING ---
        charIndex--;
        typewriterEl.textContent = current.slice(0, charIndex);
        cursorEl?.classList.add("typing");       // solid cursor while erasing

        if (charIndex === 0) {
          // Finished erasing — move to next phrase
          isErasing   = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          cursorEl?.classList.remove("typing");
          setTimeout(tick, PAUSE_BEFORE);
          return;
        }
        setTimeout(tick, ERASING_SPEED);
      }
    }

    // Small initial delay so the hero has rendered before typing starts
    setTimeout(tick, 900);
  }


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
      answer.classList.toggle("hidden");
      icon?.classList.toggle("open");
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
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    fadeEls.forEach((el) => observer.observe(el));
  }


  /* ---------------------------------------------------------------
     TUTOR CARD MODAL (about.html)
     Clicking a .tutor-card-stack opens a floating info panel.
  --------------------------------------------------------------- */
  const tutorModal    = document.getElementById("tutor-modal");
  const tutorModalBody = document.getElementById("tutor-modal-body");
  const tutorClose    = document.getElementById("tutor-modal-close");

  if (tutorModal) {
    const tutorModalInner = document.getElementById("tutor-modal-inner");

    document.querySelectorAll(".tutor-card-stack").forEach((card) => {
      card.addEventListener("click", () => {
        // Anchor the grow animation to the bottom-centre of the clicked card
        const rect = card.getBoundingClientRect();
        const dx = (rect.left + rect.width / 2) - window.innerWidth  / 2;
        const dy = rect.bottom                  - window.innerHeight / 2;
        tutorModalInner.style.transformOrigin = `calc(50% + ${dx}px) calc(50% + ${dy}px)`;

        tutorModalBody.innerHTML = card.querySelector(".tutor-info-wrap").innerHTML;
        tutorModal.classList.add("show");
      });
    });

    function closeTutorModal() { tutorModal.classList.remove("show"); }

    tutorClose.addEventListener("click", closeTutorModal);
    tutorModal.addEventListener("click", (e) => { if (e.target === tutorModal) closeTutorModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeTutorModal(); });
  }

});
