/* =============================================================
   PRAXIS TUITION — Shared Components
   Injected into every page: header and footer.
   All pages now live at the root level — no path detection needed.
   ============================================================= */


/* ---------------------------------------------------------------
   HEADER HTML
--------------------------------------------------------------- */
const headerHTML = `
<header id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
  <nav class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

    <!-- Logo — always links back to the home page -->
    <a href="index.html" class="flex items-center gap-2 group">
      <span class="font-serif text-2xl text-white tracking-tight group-hover:text-brand-200 transition-colors">
        PRAXIS
      </span>
    </a>

    <!-- Desktop nav links -->
    <ul class="hidden md:flex items-center gap-8 text-xl font-medium text-white tracking-tight">
      <li><a href="index.html" class="nav-link hover:text-brand-200 transition-colors" data-page="index">Home</a></li>
      <li><a href="about.html" class="nav-link hover:text-brand-200 transition-colors" data-page="about">About</a></li>
      <li><a href="testimonials.html" class="nav-link hover:text-brand-200 transition-colors" data-page="testimonials">Testimonials</a></li>
      <li><a href="resources.html" class="nav-link hover:text-brand-200 transition-colors" data-page="resources">Resources</a></li>
      <li><a href="careers.html" class="nav-link hover:text-brand-200 transition-colors" data-page="careers">Careers</a></li>
      <li><a href="contact.html" class="nav-link hover:text-brand-200 transition-colors" data-page="contact">Contact Us</a></li>
    </ul>

    <!-- Mobile hamburger (morphs to × via CSS) -->
    <button id="menu-btn" class="md:hidden text-white focus:outline-none" aria-label="Toggle menu">
      <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line class="hamburger-line hamburger-top" x1="4" y1="6"  x2="20" y2="6"/>
        <line class="hamburger-line hamburger-mid" x1="4" y1="12" x2="20" y2="12"/>
        <line class="hamburger-line hamburger-bot" x1="4" y1="18" x2="20" y2="18"/>
      </svg>
    </button>
  </nav>

  <!-- Mobile dropdown -->
  <div id="mobile-menu" class="md:hidden bg-brand-500 text-white text-lg font-medium tracking-tight">
    <ul class="flex flex-col gap-3 px-6 pt-4 pb-4 border-t border-white/10">
      <li><a href="index.html" class="mobile-nav-link block hover:text-brand-200 transition-colors" data-page="index"><span class="mobile-nav-text">Home</span></a></li>
      <li><a href="about.html" class="mobile-nav-link block hover:text-brand-200 transition-colors" data-page="about"><span class="mobile-nav-text">About</span></a></li>
      <li><a href="testimonials.html" class="mobile-nav-link block hover:text-brand-200 transition-colors" data-page="testimonials"><span class="mobile-nav-text">Testimonials</span></a></li>
      <li><a href="resources.html" class="mobile-nav-link block hover:text-brand-200 transition-colors" data-page="resources"><span class="mobile-nav-text">Resources</span></a></li>
      <li><a href="careers.html" class="mobile-nav-link block hover:text-brand-200 transition-colors" data-page="careers"><span class="mobile-nav-text">Careers</span></a></li>
      <li><a href="contact.html" class="mobile-nav-link block hover:text-brand-200 transition-colors" data-page="contact"><span class="mobile-nav-text">Contact Us</span></a></li>
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
          <span class="font-medium font-serif text-lg text-white tracking-tighter">PRAXIS Education</span>
        </div>
        <p class="text-sm tracking-tight leading-relaxed">
          An education centre designed by IB students, for IB students.
        </p>
      </div>

      <!-- Navigation -->
      <div>
        <h4 class="text-white font-medium text-lg mb-4 uppercase">Pages</h4>
        <ul class="space-y-2 text-sm tracking-tight">
          <li><a href="index.html" class="hover:text-white transition-colors">Home</a></li>
          <li><a href="about.html" class="hover:text-white transition-colors">About</a></li>
          <li><a href="testimonials.html" class="hover:text-white transition-colors">Testimonials</a></li>
          <li><a href="resources.html" class="hover:text-white transition-colors">Resources</a></li>
          <li><a href="careers.html" class="hover:text-white transition-colors">Careers</a></li>
          <li><a href="contact.html" class="hover:text-white transition-colors">Contact Us</a></li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h4 class="text-white font-medium text-lg mb-4 uppercase">Get In Touch</h4>
        <ul class="space-y-2 text-sm tracking-tight">
          <li>
            <a href="mailto:hello@praxistuition.com" class="hover:text-white transition-colors">
              hello@praxistuition.com
            </a>
          </li>
        </ul>
      </div>

    </div>

    <div class="border-t border-white/10 pt-6 text-xs">
      <p>PRAXIS Education. All rights reserved.</p>
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
  const currentPage = window.location.pathname.split("/").pop().replace(".html", "");
  document.querySelectorAll("[data-page]").forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add("nav-active");
    }
  });

  // ---- Navbar: transparent → solid on scroll ----
  const navbar = document.getElementById("navbar");
  // Inner pages always show the solid navbar; home page only after scrolling 80px
  // Solid navbar on all pages except the home hero — detect home page by path
  const handleScroll = () => navbar?.classList.toggle("scrolled", window.scrollY > 80);
  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // ---- Mobile menu toggle ----
  const menuBtn    = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  menuBtn?.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("menu-open");
    mobileMenu.classList.toggle("menu-open", !isOpen);
    navbar?.classList.toggle("menu-open", !isOpen);
  });

  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu?.classList.remove("menu-open");
      navbar?.classList.remove("menu-open");
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
