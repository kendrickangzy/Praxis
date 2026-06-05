/* =============================================================
   PRAXIS TUITION — Shared Components
   This file injects the header, consultation form, and footer
   into every page. Edit here once → updates everywhere.
   ============================================================= */

/* ---------------------------------------------------------------
   HEADER HTML
--------------------------------------------------------------- */
const headerHTML = `
<header id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
  <nav class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

    <!-- Logo -->
    <a href="index.html" class="flex items-center gap-2 group">
      <div class="w-9 h-9 bg-brand-500 rounded-lg flex items-center justify-center shadow">
        <span class="text-white font-bold text-sm">P</span>
      </div>
      <span class="font-bold text-xl text-white group-hover:text-brand-200 transition-colors">
        Praxis Tuition
      </span>
    </a>

    <!-- Desktop nav links -->
    <ul class="hidden md:flex items-center gap-8 text-sm font-medium text-white">
      <li><a href="about.html"       class="nav-link hover:text-brand-200 transition-colors" data-page="about">About Us</a></li>
      <li><a href="credentials.html" class="nav-link hover:text-brand-200 transition-colors" data-page="credentials">Credentials</a></li>
      <li><a href="resources.html"   class="nav-link hover:text-brand-200 transition-colors" data-page="resources">Resources</a></li>
      <li><a href="contact.html"     class="nav-link hover:text-brand-200 transition-colors" data-page="contact">Contact Us</a></li>
      <li>
        <a href="#consultation"
          class="bg-accent hover:bg-yellow-500 text-white px-5 py-2 rounded-lg font-semibold transition-all hover:shadow-lg">
          Book Free Consultation
        </a>
      </li>
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
      <li><a href="about.html"       class="mobile-nav-link block hover:text-brand-200 transition-colors" data-page="about">About Us</a></li>
      <li><a href="credentials.html" class="mobile-nav-link block hover:text-brand-200 transition-colors" data-page="credentials">Credentials</a></li>
      <li><a href="resources.html"   class="mobile-nav-link block hover:text-brand-200 transition-colors" data-page="resources">Resources</a></li>
      <li><a href="contact.html"     class="mobile-nav-link block hover:text-brand-200 transition-colors" data-page="contact">Contact Us</a></li>
      <li>
        <a href="#consultation"
          class="block bg-accent text-white px-4 py-2 rounded-lg text-center font-semibold hover:bg-yellow-500 transition-colors">
          Book Free Consultation
        </a>
      </li>
    </ul>
  </div>
</header>
`;


/* ---------------------------------------------------------------
   CONSULTATION FORM HTML
   Appears at the bottom of every page before the footer.
--------------------------------------------------------------- */
const consultationHTML = `
<section id="consultation" class="py-24 px-6 bg-brand-900 text-white">
  <div class="max-w-4xl mx-auto">

    <div class="text-center mb-12">
      <p class="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Free Consultation</p>
      <h2 class="text-4xl font-bold mb-4">Let's talk about your goals</h2>
      <p class="text-white/70 max-w-lg mx-auto leading-relaxed">
        Book a free 20-minute consultation. No commitment — we just want to understand
        where you are in the course and how we can help.
      </p>
    </div>

    <form id="consultation-form" class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-10 space-y-6 max-w-2xl mx-auto" novalidate>

      <div class="grid sm:grid-cols-2 gap-6">
        <div>
          <label for="c-name" class="block text-sm font-medium text-white/80 mb-2">Your name *</label>
          <input id="c-name" name="name" type="text" required placeholder="Jane Smith"
            class="form-input w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent transition" />
          <p class="form-error hidden text-red-400 text-xs mt-1">Please enter your name.</p>
        </div>
        <div>
          <label for="c-email" class="block text-sm font-medium text-white/80 mb-2">Email address *</label>
          <input id="c-email" name="email" type="email" required placeholder="jane@example.com"
            class="form-input w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent transition" />
          <p class="form-error hidden text-red-400 text-xs mt-1">Please enter a valid email.</p>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 gap-6">
        <div>
          <label for="c-role" class="block text-sm font-medium text-white/80 mb-2">I am a...</label>
          <select id="c-role" name="role"
            class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent transition appearance-none cursor-pointer">
            <option value="student" class="text-gray-800">Student</option>
            <option value="parent"  class="text-gray-800">Parent / Guardian</option>
            <option value="other"   class="text-gray-800">Other</option>
          </select>
        </div>
        <div>
          <label for="c-year" class="block text-sm font-medium text-white/80 mb-2">IB Year</label>
          <select id="c-year" name="year"
            class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent transition appearance-none cursor-pointer">
            <option value="year1"     class="text-gray-800">Year 1 (DP1)</option>
            <option value="year2"     class="text-gray-800">Year 2 (DP2)</option>
            <option value="unsure"    class="text-gray-800">Not sure yet</option>
          </select>
        </div>
      </div>

      <div>
        <label for="c-message" class="block text-sm font-medium text-white/80 mb-2">What are you hoping to improve?</label>
        <textarea id="c-message" name="message" rows="4"
          placeholder="e.g. Struggling with Paper 1 commentaries, preparing for the IO, need help with essay structure..."
          class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent transition resize-none"></textarea>
      </div>

      <button type="submit" id="consult-submit"
        class="w-full bg-accent hover:bg-yellow-500 text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] shadow-lg text-base">
        Book My Free Consultation &rarr;
      </button>

      <!-- Success message -->
      <div id="consult-success" class="hidden text-center py-4 bg-green-500/20 border border-green-400/30 rounded-xl">
        <p class="text-green-300 font-semibold">&#10003; We've received your message!</p>
        <p class="text-green-300/80 text-sm mt-1">We'll be in touch within 24 hours to confirm your consultation.</p>
      </div>

    </form>
  </div>
</section>
`;


/* ---------------------------------------------------------------
   FOOTER HTML
--------------------------------------------------------------- */
const footerHTML = `
<footer class="bg-gray-950 text-gray-400 py-12 px-6">
  <div class="max-w-6xl mx-auto">

    <div class="grid md:grid-cols-3 gap-10 mb-10">

      <!-- Brand column -->
      <div>
        <div class="flex items-center gap-2 mb-4">
          <div class="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">P</span>
          </div>
          <span class="font-bold text-lg text-white">Praxis Tuition</span>
        </div>
        <p class="text-sm leading-relaxed">
          Specialist IB Language &amp; Literature tutoring for SL students worldwide.
          Results-focused, student-centred, exam-ready.
        </p>
      </div>

      <!-- Navigation column -->
      <div>
        <h4 class="text-white font-semibold text-sm mb-4 uppercase tracking-widest">Pages</h4>
        <ul class="space-y-2 text-sm">
          <li><a href="index.html"       class="hover:text-white transition-colors">Home</a></li>
          <li><a href="about.html"       class="hover:text-white transition-colors">About Us</a></li>
          <li><a href="credentials.html" class="hover:text-white transition-colors">Credentials</a></li>
          <li><a href="resources.html"   class="hover:text-white transition-colors">Resources</a></li>
          <li><a href="contact.html"     class="hover:text-white transition-colors">Contact Us</a></li>
        </ul>
      </div>

      <!-- Contact column -->
      <div>
        <h4 class="text-white font-semibold text-sm mb-4 uppercase tracking-widest">Get In Touch</h4>
        <ul class="space-y-2 text-sm">
          <li>
            <a href="mailto:hello@praxistuition.com" class="hover:text-white transition-colors">
              hello@praxistuition.com
            </a>
          </li>
          <li>
            <a href="#consultation" class="text-accent hover:text-yellow-400 font-medium transition-colors">
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

  // Inject header
  const headerRoot = document.getElementById("header-root");
  if (headerRoot) headerRoot.innerHTML = headerHTML;

  // Inject consultation section
  const consultRoot = document.getElementById("consultation-root");
  if (consultRoot) consultRoot.innerHTML = consultationHTML;

  // Inject footer
  const footerRoot = document.getElementById("footer-root");
  if (footerRoot) footerRoot.innerHTML = footerHTML;

  // ---- Highlight the active nav link based on current page ----
  const currentPage = window.location.pathname.split("/").pop().replace(".html", "") || "index";
  document.querySelectorAll("[data-page]").forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add("nav-active");
    }
  });

  // ---- Navbar scroll behaviour ----
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    navbar?.classList.toggle("scrolled", window.scrollY > 80);
  };
  window.addEventListener("scroll", onScroll);
  onScroll(); // run once on load (for pages that don't start at top)

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

  // ---- Consultation form submission ----
  const consultForm    = document.getElementById("consultation-form");
  const consultSuccess = document.getElementById("consult-success");
  const consultSubmit  = document.getElementById("consult-submit");

  consultForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    // Basic validation
    let valid = true;
    consultForm.querySelectorAll(".form-input[required]").forEach((input) => {
      const error = input.nextElementSibling;
      if (!input.value.trim() || (input.type === "email" && !/\S+@\S+\.\S+/.test(input.value))) {
        error?.classList.remove("hidden");
        input.classList.add("border-red-400");
        valid = false;
      } else {
        error?.classList.add("hidden");
        input.classList.remove("border-red-400");
      }
    });

    if (!valid) return;

    // ----------------------------------------------------------------
    // TO CONNECT A REAL FORM SERVICE: replace this block with a fetch()
    // Example (Formspree):
    //   fetch("https://formspree.io/f/YOUR_FORM_ID", {
    //     method: "POST",
    //     body: new FormData(consultForm),
    //     headers: { Accept: "application/json" },
    //   }).then(() => showSuccess());
    // ----------------------------------------------------------------

    consultSubmit.textContent = "Sending...";
    consultSubmit.disabled = true;

    setTimeout(() => {
      consultForm.reset();
      consultSubmit.textContent = "Book My Free Consultation →";
      consultSubmit.disabled = false;
      consultSuccess?.classList.remove("hidden");
      setTimeout(() => consultSuccess?.classList.add("hidden"), 6000);
    }, 1200);
  });

  // ---- Scroll-triggered fade-in (for page-specific sections) ----
  const fadeEls = document.querySelectorAll(".fade-in");
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  fadeEls.forEach((el) => fadeObserver.observe(el));

  // ---- Scroll-to-top button ----
  const scrollBtn = document.createElement("button");
  scrollBtn.id = "scroll-top";
  scrollBtn.setAttribute("aria-label", "Scroll to top");
  scrollBtn.className =
    "fixed bottom-6 right-6 z-50 w-11 h-11 bg-brand-500 hover:bg-brand-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all opacity-0 pointer-events-none";
  scrollBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>`;
  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", () => {
    const show = window.scrollY > 400;
    scrollBtn.style.opacity = show ? "1" : "0";
    scrollBtn.style.pointerEvents = show ? "auto" : "none";
  });
  scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

});
