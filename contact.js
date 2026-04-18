/* ── Navbar hide on scroll down, show on scroll up ── */
let lastScroll = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > 80) {
    navbar.style.transform = "translateY(-100%)";
  } else {
    navbar.style.transform = "translateY(0)";
  }
  lastScroll = currentScroll;
});

/* ── Contact Form Submit Handler ── */
const contactForm = document.getElementById("contactForm");
const successMsg  = document.getElementById("successMsg");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const btn = contactForm.querySelector("button[type='submit']");
  const originalHTML = btn.innerHTML;

  // Show loading spinner on button
  btn.innerHTML = `
    <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
    </svg>
    Sending...
  `;
  btn.disabled = true;

  // Simulate sending delay (replace with EmailJS or backend later)
  setTimeout(() => {

    // Show success message
    successMsg.style.display = "flex";
    successMsg.scrollIntoView({ behavior: "smooth", block: "center" });

    // Reset form fields
    contactForm.reset();

    // Restore button
    btn.innerHTML = originalHTML;
    btn.disabled = false;

    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      successMsg.style.display = "none";
    }, 5000);

  }, 1500);
});

/* ── AOS & Lucide Init ── */
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 600,
    once: true,
    easing: "ease-out"
  });
  lucide.createIcons();
});

function toggleMenu() {
  const ul = document.querySelector('#navbar ul');
  ul.classList.toggle('show-menu');
}