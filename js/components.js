/* =============================================================
   PRAXIS TUITION — Shared Components
   Injected into every page: header and footer.

   PATH DETECTION
   index.html lives at the root. All other pages live in /pages/.
   This file auto-detects which level it's being called from so
   that every link resolves correctly from either location.
   ============================================================= */

// Is the current page inside the /pages/ subfolder?
const isSubpage = window.location.pathname.includes('/pages/');

// PATH HELPERS
// BASE_ROOT  → path back to the project root  ('' from root, '../' from pages/)
// BASE_PAGES → path to a file inside /pages/  ('pages/' from root, '' from pages/)
const BASE_ROOT  = isSubpage ? '../'   : '';
const BASE_PAGES = isSubpage ? ''      : 'pages/';


/* ---------------------------------------------------------------
   HEADER HTML
--------------------------------------------------------------- */
const headerHTML = `
<header id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
  <nav class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

    <!-- Logo — always links back to the home page -->
    <a href="${BASE_ROOT}index.html" class="flex items-center gap-2 group">
      <span class="font-serif text-2xl text-white tracking-tight group-hover:text-brand-200 transition-colors">
        PRAXIS
      </span>
    </a>

    <!-- Desktop nav links -->
    <ul class="hidden md:flex items-center gap-8 text-xl font-medium text-white tracking-tight">
      <li><a href="${BASE_PAGES}about.html"       class="nav-link hover:text-brand-200 transition-colors" data-page="about">About Us</a></li>
      <li><a href="${BASE_PAGES}credentials.html" class="nav-link hover:text-brand-200 transition-colors" data-page="credentials">Credentials</a></li>
      <li><a href="${BASE_PAGES}resources.html"   class="nav-link hover:text-brand-200 transition-colors" data-page="resources">Resources</a></li>
      <li><a href="${BASE_PAGES}contact.html"     class="nav-link hover:text-brand-200 transition-colors" data-page="contact">Contact Us</a></li>
    </ul>

    <!-- Mobile hamburger -->
    <button id="menu-btn" class="md:hidden text-white focus:outline-none" aria-label="Toggle menu">
      <svg id="icon-open" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
      <svg id="icon-close" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </nav>

  <!-- Mobile dropdown -->
  <div id="mobile-menu" class="hidden md:hidden bg-brand-900 px-6 pb-5 text-white text-sm font-medium border-t border-white/10">
    <ul class="flex flex-col gap-4 pt-4">
      <li><a href="${BASE_PAGES}about.html"       class="mobile-nav-link block hover:text-brand-200 transition-colors" data-page="about">About Us</a></li>
      <li><a href="${BASE_PAGES}credentials.html" class="mobile-nav-link block hover:text-brand-200 transition-colors" data-page="credentials">Credentials</a></li>
      <li><a href="${BASE_PAGES}resources.html"   class="mobile-nav-link block hover:text-brand-200 transition-colors" data-page="resources">Resources</a></li>
      <li><a href="${BASE_PAGES}contact.html"     class="mobile-nav-link block hover:text-brand-200 transition-colors" data-page="contact">Contact Us</a></li>
      <li>
        <a href="${BASE_PAGES}contact.html"
          class="block bg-cream-200 text-ink px-4 py-2 rounded-full text-center font-semibold font-serif hover:bg-cream-300 transition-colors">
          Book Free Consultation
        </a>
      </li>
    </ul>
  </div>
</header>
`;


/* ---------------------------------------------------------------
   FOOTER HTML
--------------------------------------------------------------- */
const footerHTML = `
<footer class="bg-gray-950 text-gray-400 py-12 px-6">
  <div class="max-w-6xl mx-auto">

    <div class="grid md:grid-cols-3 gap-10 mb-10">

      <!-- Brand -->
      <div>
        <div class="flex items-center gap-2 mb-4">
          <span class="font-bold text-lg text-white">Praxis Tuition</span>
        </div>
        <p class="text-sm leading-relaxed">
          Specialist IB Language &amp; Literature tutoring for SL students worldwide.
          Results-focused, student-centred, exam-ready.
        </p>
      </div>

      <!-- Navigation -->
      <div>
        <h4 class="text-white font-semibold text-sm mb-4 uppercase tracking-widest">Pages</h4>
        <ul class="space-y-2 text-sm">
          <li><a href="${BASE_ROOT}index.html"       class="hover:text-white transition-colors">Home</a></li>
          <li><a href="${BASE_PAGES}about.html"       class="hover:text-white transition-colors">About Us</a></li>
          <li><a href="${BASE_PAGES}credentials.html" class="hover:text-white transition-colors">Credentials</a></li>
          <li><a href="${BASE_PAGES}resources.html"   class="hover:text-white transition-colors">Resources</a></li>
          <li><a href="${BASE_PAGES}contact.html"     class="hover:text-white transition-colors">Contact Us</a></li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h4 class="text-white font-semibold text-sm mb-4 uppercase tracking-widest">Get In Touch</h4>
        <ul class="space-y-2 text-sm">
          <li>
            <a href="mailto:hello@praxistuition.com" class="hover:text-white transition-colors">
              hello@praxistuition.com
            </a>
          </li>
          <li>
            <a href="${BASE_PAGES}contact.html" class="text-cream-200 hover:text-cream-100 font-medium transition-colors">
              Book a free consultation &rarr;
            </a>
          </li>
        </ul>
      </div>

    </div>

    <div class="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs">
      <p>&copy; 2026 Praxis Tuition. All rights reserved.</p>
      <p>Built with HTML, Tailwind CSS &amp; JavaScript.</p>
    </div>

  </div>
</footer>
`;


/* ---------------------------------------------------------------
   INJECT COMPONENTS INTO THE PAGE
--------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {

  // Inject header and footer
  const headerRoot = document.getElementById("header-root");
  const footerRoot = document.getElementById("footer-root");

  if (headerRoot) headerRoot.innerHTML = headerHTML;
  if (footerRoot) footerRoot.innerHTML = footerHTML;

  // ---- Active nav link — underline the current page ----
  const currentPage = window.location.pathname.split("/").pop().replace(".html", "") || "index";
  document.querySelectorAll("[data-page]").forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add("nav-active");
    }
  });

  // ---- Navbar: transparent → solid on scroll ----
  const navbar = document.getElementById("navbar");
  const handleScroll = () => navbar?.classList.toggle("scrolled", window.scrollY > 80);
  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // ---- Mobile menu toggle ----
  const menuBtn    = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const iconOpen   = document.getElementById("icon-open");
  const iconClose  = document.getElementById("icon-close");

  menuBtn?.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden", isOpen);
    iconOpen.classList.toggle("hidden", !isOpen);
    iconClose.classList.toggle("hidden", isOpen);
  });

  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu?.classList.add("hidden");
      iconOpen?.classList.remove("hidden");
      iconClose?.classList.add("hidden");
    });
  });

  // ---- Scroll-to-top button ----
  const scrollBtn = document.createElement("button");
  scrollBtn.setAttribute("aria-label", "Scroll to top");
  scrollBtn.className =
    "fixed bottom-6 right-6 z-50 w-11 h-11 bg-brand-500 hover:bg-brand-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300";
  scrollBtn.style.cssText = "opacity:0; pointer-events:none;";
  scrollBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>`;
  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", () => {
    const show = window.scrollY > 400;
    scrollBtn.style.opacity       = show ? "1" : "0";
    scrollBtn.style.pointerEvents = show ? "auto" : "none";
  });
  scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

});
