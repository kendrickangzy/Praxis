/* ===========================================================
   PRAXIS — Central testimonials data
     name           — display name
     logo           — path to school logo image, e.g. "assets/logos/uwcsea.png"
     role           — attribution line
     part1          — teaser shown in the marquee preview
     part2          — continuation shown on testimonials.html
                      (use "" for testimonials-page-only entries)
     showInMarquee  — true to include in the home-page marquee
   =========================================================== */

let _activeTgcFront = null;

const TESTIMONIALS = [

  {
    name:          "Anonymous",
    logo:          "../assets/ACSI.png",
    role:          "Class of '25 - IB SL LL",
    part1:         "Being Jaden's student has been a truly enriching experience. Although I only attended his lessons for around four months, his guidance and advice equipped me with the skills and confidence needed to approach IB LangLit effectively.",
    part2:         "<br/><br/>His breakdown of question types for Paper 1 helped me stay calm when tackling unfamiliar texts, allowing me to quickly and accurately identify key messages.<br/><br/>For Paper 2, I found it especially helpful that Jaden provided us with clear themes for each text, which served as reliable reference points during revision and exams. Overall, his strong command of language and literature inspired me to delve deeper into LangLit and strive toward that same level of mastery.",
    showInMarquee: true,
  },
  {
    name:          "Anonymous",
    logo:          "../assets/ACSI.png",
    role:          "Class of '25 - IB SL LL",
    part1:         "I joined Praxis midway through Y6 when I realised how challenging writing a comparative essay for P2 was. The lessons were instrumental in deepening my understanding of the texts, strengthening my writing skills, and ultimately helping me perform well for langlit.",
    part2:         "<br/><br/>Despite joining only in July, the crash course on the P2 texts was highly effective in narrowing down the most relevant themes and quotes for the comparison. In the few months leading up to IB, Praxis covered a wide range of question types, building a strong foundation that allowed me to approach most questions with confidence.<br/><br/>Jaden’s tailored feedback was especially valuable, helping me refine my ideas and structure my essays with greater clarity, which elevated my writing to a higher level.",
    showInMarquee: true,
  },
  {
    name:          "Anonymous",
    logo:          "../assets/ACSI.png",
    role:          "Class of '25 - IB English EE",
    part1:         "Jonathan and Jaden gave me much assistance in restructuring and editing my EE. Even though the timeline was extremely short, they gave me precise feedback on areas of improvement for my draft.",
    part2:         "<br/><br/>They also gave advice on how I could tweak my research question and structure, such that my EE would be as thorough and cohesive as possible. I’m extremely grateful for their help!",
    showInMarquee: true,
  },
  {
    name:          "Bianca Wee",
    logo:          "../assets/ACSI.png",
    role:          "Class of '24 - Top in Level for IB SL LL",
    part1:         "Leanne's steadfast support provided the security I needed in Y6, and her rich ideas and eloquent approach to Langlit reshaped my approach to the subject.",
    part2:         "<br/><br/>For P1, Leanne’s lessons encompassed a lot of exposure to so many question types! Leanne offered insights into my P2 texts and scoped down the most relevant quotes and analysis, giving me a lot more structure and confidence in writing the P2.<br/><br/>I particularly liked how Leanne would often thoroughly review our practises, CTs, prelims and provide targeted feedback.",
    showInMarquee: true,
  },

];


/* ---  Marquee card renderer (index.html)
        Shows school logo if set, otherwise falls back to initial circle.
        SET2 cards get aria-hidden + tabindex=-1 for the seamless loop.       */
function _buildMarqueeCard(t, ariaHidden) {
  const a = document.createElement("a");
  a.href = "testimonials.html";
  a.className = "testimonial-card";
  if (ariaHidden) {
    a.setAttribute("aria-hidden", "true");
    a.setAttribute("tabindex", "-1");
  }
  const avatarHtml = t.logo
    ? `<img src="${t.logo}" alt="${t.name}" class="w-10 h-10 rounded-full object-contain p-0.5 flex-shrink-0">`
    : "";
  a.innerHTML = `
    <div class="text-brand-500 text-lg mb-4">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
    <div class="testimonial-quote-wrap">
      <p class="text-gray-700 leading-relaxed italic text-sm">"${t.part1}"</p>
    </div>
    <p class="testimonial-read-more">Read more →</p>
    <div class="flex items-center gap-3">
      ${avatarHtml}
      <div>
        <p class="font-semibold text-sm">${t.name}</p>
        <p class="text-gray-400 text-xs">${t.role}</p>
      </div>
    </div>
  `;
  return a;
}


/* ---  Unified card renderer (testimonials.html)
        All cards share one visual style (.tgc-front).
        Cards with part2 are expandable; cards without are static.          */
function _buildGridCard(t) {
  const wrapper = document.createElement("div");
  wrapper.className = "fade-in";

  const logoHtml = t.logo
    ? `<img src="${t.logo}" alt="${t.name}" class="h-8 w-auto max-w-[3rem] object-contain flex-shrink-0">`
    : "";

  const authorHtml = `
    <div class="${t.logo ? "flex items-center gap-3" : ""}">
      ${logoHtml}
      <div>
        <p class="font-semibold text-sm text-gray-800">${t.name}</p>
        <p class="text-xs text-gray-500 mt-1">${t.role}</p>
      </div>
    </div>`;

  wrapper.innerHTML = `
    <div class="tgc-front${t.part2 ? "" : " tgc-static"}">
      <p class="font-serif text-brand-300 text-5xl leading-none mb-3">"</p>
      <p class="text-gray-700 text-sm leading-relaxed ${t.part2 ? "mb-4" : "mb-6"}">${t.part1}</p>
      ${t.part2 ? '<p class="tgc-read-hint text-right">Read more →</p>' : ""}
      ${authorHtml}
    </div>
  `;

  if (t.part2) {
    const front = wrapper.querySelector(".tgc-front");

    const modalAuthorHtml = `
      <div class="flex items-center ${t.logo ? "gap-3" : ""} mb-6">
        ${logoHtml}
        <div>
          <p class="font-semibold text-lg text-gray-800">${t.name}</p>
          <p class="text-sm text-gray-500 mt-0.5">${t.role}</p>
        </div>
      </div>`;

    front.addEventListener("click", () => {
      const modal      = document.getElementById("tgc-modal");
      const modalInner = document.getElementById("tgc-modal-inner");
      const modalBody  = document.getElementById("tgc-modal-body");

      const rect = front.getBoundingClientRect();
      const dx = (rect.left + rect.width  / 2) - window.innerWidth  / 2;
      const dy = rect.bottom                   - window.innerHeight / 2;
      modalInner.style.transformOrigin = `calc(50% + ${dx}px) calc(50% + ${dy}px)`;

      modalBody.innerHTML = `
        ${modalAuthorHtml}
        <p class="text-gray-700 text-base leading-relaxed">${t.part1}${t.part2}</p>
      `;

      _activeTgcFront = front;
      front.classList.add("tgc-shrunk");
      modal.classList.add("show");
    });
  }

  return wrapper;
}


/* ---  Auto-render on DOMContentLoaded                                       */
document.addEventListener("DOMContentLoaded", () => {

  /* index.html marquee — SET1 then SET2 for the seamless CSS loop */
  const track = document.getElementById("testimonial-track");
  if (track) {
    const marqueeItems = TESTIMONIALS;
    marqueeItems.forEach(t => track.appendChild(_buildMarqueeCard(t, false)));
    marqueeItems.forEach(t => track.appendChild(_buildMarqueeCard(t, true)));
  }

  /* testimonials.html grid */
  const grid = document.getElementById("testimonials-grid");
  if (grid) {
    TESTIMONIALS.forEach(t => grid.appendChild(_buildGridCard(t)));

    /* Shared expand modal — mirrors the tutor card modal pattern */
    const tgcModal = document.createElement("div");
    tgcModal.id = "tgc-modal";
    tgcModal.innerHTML = `
      <div id="tgc-modal-inner">
        <button id="tgc-modal-close" aria-label="Close">×</button>
        <div id="tgc-modal-body"></div>
      </div>
    `;
    document.body.appendChild(tgcModal);

    function closeTgcModal() {
      tgcModal.classList.remove("show");
      setTimeout(() => {
        _activeTgcFront?.classList.remove("tgc-shrunk");
        _activeTgcFront = null;
      }, 0);
    }
    tgcModal.querySelector("#tgc-modal-close").addEventListener("click", closeTgcModal);
    tgcModal.addEventListener("click", (e) => { if (e.target === tgcModal) closeTgcModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeTgcModal(); });
  }

});
