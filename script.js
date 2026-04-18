// HERO SLIDER
const heroSlides = document.querySelectorAll(".slide");
const heroDots   = document.querySelectorAll(".dot");
let heroIndex    = 0;

function showHeroSlide(index) {
  // Hide all slides
  heroSlides.forEach(slide => slide.classList.add("hidden"));
  // Dim all dots
  heroDots.forEach(dot => {
    dot.classList.remove("opacity-100", "bg-green-500");
    dot.classList.add("opacity-50");
  });

  // Show current slide
  heroSlides[index].classList.remove("hidden");
  // Highlight active dot
  heroDots[index].classList.remove("opacity-50");
  heroDots[index].classList.add("opacity-100", "bg-green-500");
}

// Make dots clickable
heroDots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    heroIndex = i;
    showHeroSlide(heroIndex);
  });
});

// Show first slide immediately on load
showHeroSlide(heroIndex);

// Auto advance every 4 seconds
setInterval(() => {
  heroIndex = (heroIndex + 1) % heroSlides.length;
  showHeroSlide(heroIndex);
}, 4000);



/* --------------------------- */
/* OUR WORK SLIDER */
/* --------------------------- */

const workSlider = document.getElementById("workSlider");

if(workSlider){

const workSlides = document.querySelectorAll("#workSlider > div");
let workIndex = 0;

function updateWorkSlider(){
  workSlider.style.transform = `translateX(-${workIndex * 100}%)`;
}

setInterval(()=>{

workIndex++;

if(workIndex >= workSlides.length){
workIndex = 0;
}

updateWorkSlider();

},5000);

}

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      counter.innerText = "0";

      const updateCounter = () => {
        const target = +counter.getAttribute("data-target");
        const current = +counter.innerText;
        const increment = target / 100;

        if (current < target) {
          counter.innerText = `${Math.ceil(current + increment)}`;
          setTimeout(updateCounter, 20);
        } else {
          counter.innerText = target;
        }
      };

      updateCounter();
      observer.unobserve(counter); // stop observing once counted
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));

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


function toggleMenu() {
  const ul = document.querySelector('#navbar ul');
  ul.classList.toggle('show-menu');
}
