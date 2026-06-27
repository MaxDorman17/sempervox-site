document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  var burger = document.querySelector(".nav-burger");
  var mobileNav = document.getElementById("mobile-nav");
  if (burger && mobileNav) {
    burger.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(isOpen));
      mobileNav.setAttribute("aria-hidden", String(!isOpen));
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        mobileNav.setAttribute("aria-hidden", "true");
      });
    });
    document.addEventListener("click", function (e) {
      if (!burger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        mobileNav.setAttribute("aria-hidden", "true");
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      const id = this.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Testimonial carousel
  var track = document.getElementById("testimonialTrack");
  if (track) {
    var slides = track.children;
    var dots = document.querySelectorAll(".testimonial-dot");
    var prevBtn = document.getElementById("testimonialPrev");
    var nextBtn = document.getElementById("testimonialNext");
    var current = 0;
    var total = slides.length;
    var autoplay;

    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = "translateX(-" + (current * track.parentElement.offsetWidth) + "px)";
      dots.forEach(function (d, i) {
        d.classList.toggle("is-active", i === current);
      });
    }

    window.addEventListener("resize", function () {
      track.style.transition = "none";
      track.style.transform = "translateX(-" + (current * track.parentElement.offsetWidth) + "px)";
      setTimeout(function () { track.style.transition = ""; }, 50);
    });

    function startAutoplay() {
      autoplay = setInterval(function () { goTo(current + 1); }, 6000);
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { clearInterval(autoplay); goTo(current - 1); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { clearInterval(autoplay); goTo(current + 1); startAutoplay(); });
    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        clearInterval(autoplay);
        goTo(parseInt(this.getAttribute("data-index")));
        startAutoplay();
      });
    });

    startAutoplay();
  }

  // Contact form submit simulation
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (status) status.textContent = "Sending…";
      setTimeout(function () {
        if (status) status.textContent = "Thanks for getting in touch — we will get back to you shortly.";
        form.reset();
      }, 900);
    });
  }
});
