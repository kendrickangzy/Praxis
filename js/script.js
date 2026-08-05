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

    const TYPING_SPEED  = 25;   // ms per character — how fast it types
    const ERASING_SPEED = 20;   // ms per character — how fast it erases
    const PAUSE_AFTER   = 3000; // ms to hold the completed phrase before erasing
    const PAUSE_BEFORE  = 250;  // ms to wait before typing the next phrase

    let phraseIndex = 0;
    let charIndex   = 0;
    let isErasing   = false;

    function renderTyped(pi, ci) {
      const text = phrases[pi].slice(0, ci);
      // Phrase 2: italicise "Feel" once fully typed
      if (pi === 2 && ci > 4) return `<em>Feel</em>${text.slice(4)}`;
      return text;
    }

    function tick() {
      const current = phrases[phraseIndex];

      if (!isErasing) {
        // --- TYPING ---
        charIndex++;
        typewriterEl.innerHTML = renderTyped(phraseIndex, charIndex);
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
        typewriterEl.innerHTML = renderTyped(phraseIndex, charIndex);
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

    // Phrase 1 is already shown at t=0 (no typing animation); hand off
    // to the normal erase/type cycle after the usual post-type pause.
    charIndex = phrases[0].length;
    isErasing = true;
    typewriterEl.innerHTML = renderTyped(phraseIndex, charIndex);
    setTimeout(tick, PAUSE_AFTER);
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
        // Stagger only the elements that enter the viewport together in
        // this batch — a lone element scrolled into view gets no delay.
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, i) => {
            setTimeout(() => entry.target.classList.add("visible"), i * 90);
            observer.unobserve(entry.target);
          });
      },
      { threshold: 0.09 }
    );
    fadeEls.forEach((el) => observer.observe(el));
  }

  const slashEls = document.querySelectorAll(".slash-overlay");
  if (slashEls.length > 0) {
    const slashParents = new Set([...slashEls].map((el) => el.parentElement));
    const slashObserver = new IntersectionObserver(
      (entries) => {
        entries.filter((e) => e.isIntersecting).forEach((e) => {
          e.target.querySelectorAll(".slash-overlay")
            .forEach((el) => el.classList.add("visible"));
          slashObserver.unobserve(e.target);
        });
      },
      { threshold: 0.15 }
    );
    slashParents.forEach((el) => slashObserver.observe(el));
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


  /* ---------------------------------------------------------------
     RESOURCE IMAGE CAROUSEL (resources.html)
     Inline carousel with side peek previews, caption and link.
  --------------------------------------------------------------- */
  const rcCarousel = document.getElementById("resource-carousel");

  if (rcCarousel) {
    const RC_GALLERY = [...document.querySelectorAll("#rc-gallery-data > [data-src]")].map(el => ({
      src:      el.dataset.src,
      title:    el.dataset.title   || "",
      caption:  el.dataset.caption || "",
      href:     el.dataset.href    || "#",
      showLink: el.classList.contains("rc-show-link"),
    }));
    if (!RC_GALLERY.length) return;

    const rcMainCell = document.getElementById("rc-main-cell");
    const rcMainImg  = document.getElementById("rc-main-img");
    const rcPrevImg  = document.getElementById("rc-prev-img");
    const rcNextImg  = document.getElementById("rc-next-img");
    const rcPeekPrev = document.getElementById("rc-peek-prev");
    const rcPeekNext = document.getElementById("rc-peek-next");
    const rcPrevBtn  = document.getElementById("rc-prev-btn");
    const rcNextBtn  = document.getElementById("rc-next-btn");
    const rcTitle    = document.getElementById("rc-caption-title");
    const rcText     = document.getElementById("rc-caption-text");
    const rcLink     = document.getElementById("rc-read-link");
    const rcDotsEl   = document.getElementById("rc-dots");

    RC_GALLERY.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "rc-dot";
      dot.addEventListener("click", () => rcUpdate(i, true));
      rcDotsEl.appendChild(dot);
    });

    let rcIndex     = 0;
    let rcAnimating = false;

    function rcUpdate(newIndex, animate) {
      if (animate && rcAnimating) return;
      const item = RC_GALLERY[newIndex];
      const prev = RC_GALLERY[(newIndex - 1 + RC_GALLERY.length) % RC_GALLERY.length];
      const next = RC_GALLERY[(newIndex + 1) % RC_GALLERY.length];

      // Compute direction before rcIndex is mutated — needed to identify the source peek
      const wrapFwd  = rcIndex === RC_GALLERY.length - 1 && newIndex === 0;
      const wrapBwd  = rcIndex === 0 && newIndex === RC_GALLERY.length - 1;
      const earlyDir = wrapFwd ? 1 : wrapBwd ? -1 : newIndex > rcIndex ? 1 : -1;

      // Capture incoming image's natural dimensions BEFORE src updates
      const srcPeekEl    = earlyDir > 0 ? rcNextImg : rcPrevImg;
      const incNatW      = srcPeekEl.naturalWidth;
      const incNatH      = srcPeekEl.naturalHeight;

      rcPrevImg.src = prev.src;
      rcNextImg.src = next.src;
      rcPeekPrev.classList.remove("rc-hidden");
      rcPeekNext.classList.remove("rc-hidden");
      rcPrevBtn.disabled  = false;
      rcNextBtn.disabled  = false;
      rcTitle.textContent = item.title;
      rcText.textContent  = item.caption;
      rcLink.href         = item.href;
      rcLink.style.display = item.showLink ? "" : "none";
      rcDotsEl.querySelectorAll(".rc-dot").forEach((d, i) => {
        d.classList.toggle("rc-dot-active", i === newIndex);
      });

      if (animate && !rcAnimating) {
        const dir   = earlyDir;
        rcIndex     = newIndex;
        rcAnimating = true;

        const DURATION = 480;
        const EASE     = "cubic-bezier(0.4,0,0.2,1)";

        const stageEl   = rcMainCell.parentElement;
        const stageRect = stageEl.getBoundingClientRect();
        const mainRect  = rcMainImg.getBoundingClientRect();

        // Compute where the incoming image will actually render in the main cell,
        // so incEl has the right aspect ratio and position — no letterboxing, no jerk.
        const cellRect = rcMainCell.getBoundingClientRect();
        const cellCS   = getComputedStyle(rcMainCell);
        const ipadL    = parseFloat(cellCS.paddingLeft);
        const ipadT    = parseFloat(cellCS.paddingTop);
        const innerW   = cellRect.width  - ipadL - parseFloat(cellCS.paddingRight);
        const innerH   = cellRect.height - ipadT - parseFloat(cellCS.paddingBottom);

        let incW = mainRect.width, incH = mainRect.height; // fallback if image not loaded
        if (incNatW > 0 && incNatH > 0) {
          const ar = incNatW / incNatH;
          incW = Math.min(innerW, incNatW);
          incH = incW / ar;
          if (incH > innerH) { incH = innerH; incW = incH * ar; }
        }
        const incLeft = cellRect.left - stageRect.left + ipadL + (innerW - incW) / 2;
        const incTop  = cellRect.top  - stageRect.top  + ipadT + (innerH - incH) / 2;

        // Outgoing: sized/positioned to exactly match current rcMainImg
        const outEl = document.createElement("img");
        outEl.src   = rcMainImg.src;
        outEl.style.cssText = [
          "position:absolute",
          `left:${mainRect.left - stageRect.left}px`,
          `top:${mainRect.top  - stageRect.top}px`,
          `width:${mainRect.width}px`,
          `height:${mainRect.height}px`,
          "object-fit:contain",
          "border-radius:0.75rem",
          "z-index:4",
        ].join(";");

        // Incoming: sized/positioned to where it will actually render — no letterboxing.
        // Starts one full width off to the side (direction of travel), same size
        // throughout — a clean slide, no scale change.
        const incEl = document.createElement("img");
        incEl.src   = item.src;
        incEl.style.cssText = [
          "position:absolute",
          `left:${incLeft}px`,
          `top:${incTop}px`,
          `width:${incW}px`,
          `height:${incH}px`,
          "object-fit:contain",
          "border-radius:0.75rem",
          "z-index:5",
          "opacity:0",
          `transform:translateX(${dir * 100}%)`,
        ].join(";");

        rcMainImg.style.visibility = "hidden";
        rcMainImg.style.transition = "none";
        rcMainImg.style.boxShadow  = "none";
        stageEl.appendChild(outEl);
        stageEl.appendChild(incEl);

        stageEl.getBoundingClientRect(); // force reflow before transitions

        const FADE = Math.round(DURATION * 0.35);
        const DEL  = Math.round(DURATION * 0.5);

        outEl.style.transition = `transform ${DURATION}ms ${EASE}, opacity ${FADE}ms ${EASE} ${DEL}ms`;
        outEl.style.transform  = `translateX(${-dir * 100}%)`;
        outEl.style.opacity    = "0";

        incEl.style.transition = `transform ${DURATION}ms ${EASE}, opacity ${FADE}ms ${EASE}`;
        incEl.style.opacity    = "1";
        incEl.style.transform  = "translateX(0)";

        setTimeout(() => {
          rcMainImg.src              = item.src;
          rcMainImg.style.visibility = "";
          rcMainImg.getBoundingClientRect(); // force reflow: commit "no shadow" before transitioning
          rcMainImg.style.transition = "box-shadow 0.3s ease";
          rcMainImg.style.boxShadow  = ""; // clear override — reappears via the transition above
          outEl.remove();
          incEl.remove();
          rcAnimating = false;
        }, DURATION);

      } else {
        rcMainImg.src = item.src;
        rcIndex = newIndex;
      }
    }

    rcUpdate(0, false);

    const rcPrev = () => rcUpdate((rcIndex - 1 + RC_GALLERY.length) % RC_GALLERY.length, true);
    const rcNext = () => rcUpdate((rcIndex + 1) % RC_GALLERY.length, true);

    rcPeekPrev.addEventListener("click", rcPrev);
    rcPeekNext.addEventListener("click", rcNext);
    rcPrevBtn.addEventListener("click", rcPrev);
    rcNextBtn.addEventListener("click", rcNext);

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft")  rcPrev();
      if (e.key === "ArrowRight") rcNext();
    });

    /* PDF viewer modal */
    const pdfModal = document.createElement("div");
    pdfModal.id = "pdf-modal";
    pdfModal.innerHTML = `
      <div id="pdf-modal-inner">
        <button id="pdf-modal-close" aria-label="Close">×</button>
        <iframe id="pdf-frame" src="" allow="autoplay"></iframe>
      </div>`;
    document.body.appendChild(pdfModal);

    const pdfFrame = document.getElementById("pdf-frame");

    function toEmbedUrl(href) {
      if (href.includes("docs.google.com/document"))
        return href.replace(/\/edit.*$/, "/preview");
      if (href.includes("docs.google.com/spreadsheets") || href.includes("docs.google.com/presentation"))
        return href.replace(/\/edit.*$/, "/preview");
      return href;
    }

    function openPdf(href) {
      pdfFrame.src = toEmbedUrl(href);
      pdfModal.classList.add("show");
    }

    function closePdf() {
      pdfModal.classList.remove("show");
      setTimeout(() => { pdfFrame.src = ""; }, 200);
    }

    rcLink.addEventListener("click", (e) => {
      e.preventDefault();
      openPdf(rcLink.href);
    });

    document.getElementById("pdf-modal-close").addEventListener("click", closePdf);
    pdfModal.addEventListener("click", (e) => { if (e.target === pdfModal) closePdf(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePdf(); });
  }

});
