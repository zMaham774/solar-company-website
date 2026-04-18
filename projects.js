const SLIDE_INTERVAL = 4000; // 4 seconds per slide

const pauseIcon = `<path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>`;
const playIcon  = `<path d="M5 3.5a.5.5 0 0 1 .5 0l9 5a.5.5 0 0 1 0 .866l-9 5A.5.5 0 0 1 4 14V4a.5.5 0 0 1 .5-.5z"/>`;

// Slider state for each category
const sliders = {
  commercial:  { current: 0, total: 3, paused: false, timer: null },
  residential: { current: 0, total: 3, paused: false, timer: null },
  industrial:  { current: 0, total: 3, paused: false, timer: null },
};

/* ── Get slides for a given category ── */
function getSlides(name) {
  return document.querySelectorAll(`#slider-${name} .slide`);
}

/* ── Get dots for a given category ── */
function getDots(name) {
  return document.querySelectorAll(`#dots-${name} .dot`);
}

/* ── Go to a specific slide ── */
function goToSlide(name, index) {
  const state  = sliders[name];
  const slides = getSlides(name);
  const dots   = getDots(name);

  // Remove active from current
  slides[state.current].classList.remove("active");
  dots[state.current].classList.remove("active");

  // Set new current
  state.current = index;

  // Add active to new
  slides[state.current].classList.add("active");
  dots[state.current].classList.add("active");

  // Restart progress bar
  restartProgress(name);
}

/* ── Go to next slide ── */
function nextSlide(name) {
  const state = sliders[name];
  const next  = (state.current + 1) % state.total;
  goToSlide(name, next);
}

/* ── Start auto-play timer ── */
function startTimer(name) {
  const state = sliders[name];
  clearInterval(state.timer);
  state.timer = setInterval(() => {
    if (!state.paused) nextSlide(name);
  }, SLIDE_INTERVAL);
}

/* ── Restart progress bar animation ── */
function restartProgress(name) {
  const bar = document.getElementById(`progress-${name}`);
  if (!bar) return;

  bar.style.transition = "none";
  bar.style.width = "0%";

  // Force browser reflow before restarting animation
  bar.offsetWidth;

  bar.style.transition = `width ${SLIDE_INTERVAL}ms linear`;
  bar.style.width = "100%";
}

/* ── Toggle pause / play ── */
function togglePause(name) {
  const state = sliders[name];
  const icon  = document.getElementById(`icon-${name}`);

  state.paused = !state.paused;

  // Swap icon
  if (icon) {
    icon.innerHTML = state.paused ? playIcon : pauseIcon;
  }

  // Stop or restart progress bar
  const bar = document.getElementById(`progress-${name}`);
  if (bar) {
    if (state.paused) {
      bar.style.transition = "none";
    } else {
      restartProgress(name);
    }
  }
}

/* ── Initialize all sliders ── */
function initSliders() {
  Object.keys(sliders).forEach(name => {
    const wrapper = document.getElementById(`slider-${name}`);
    if (!wrapper) return;

    // Pause on mouse hover
    wrapper.addEventListener("mouseenter", () => {
      sliders[name].paused = true;
      const bar = document.getElementById(`progress-${name}`);
      if (bar) bar.style.transition = "none";
    });

    // Resume on mouse leave
    wrapper.addEventListener("mouseleave", () => {
      sliders[name].paused = false;

      // Reset pause icon back
      const icon = document.getElementById(`icon-${name}`);
      if (icon) icon.innerHTML = pauseIcon;

      restartProgress(name);
    });

    // Start timer and progress bar
    startTimer(name);
    restartProgress(name);
  });
}

/* ── Navbar hide on scroll down, show on scroll up ── */
let lastScroll = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 80) {
    // Scrolling DOWN — hide navbar
    navbar.style.transform = "translateY(-100%)";
  } else {
    // Scrolling UP — show navbar
    navbar.style.transform = "translateY(0)";
  }

  lastScroll = currentScroll;
});

/* ── Run on page load ── */
document.addEventListener("DOMContentLoaded", () => {
  initSliders();
  lucide.createIcons();
  AOS.init({
    duration: 600,
    once: true,
    offset: 50,
    easing: "ease-out"
  });
});