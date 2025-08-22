// =================== FOR MOBILE MENU ================= //
const btn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

btn.addEventListener("click", navToggle);

function navToggle() {
  btn.classList.toggle("open");
  menu.classList.toggle("flex");
  menu.classList.toggle("hidden");

  // Prevent page scroll when menu is open
  if (menu.classList.contains("flex")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

// Close menu on resize to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024) {
    // Tailwind's lg breakpoint
    menu.classList.add("hidden");
    menu.classList.remove("flex");
    btn.classList.remove("open");
    document.body.style.overflow = ""; // unlock scroll
  }
});

// ================================= AUTOCOMPLETE SEARCH DROP DOWN  ==================== //
// Keywords
const keywords = [
  // Building & Construction
  "LEGO Sets",
  "Lego Star Wars",
  "Lego Technic",
  "Mega Bloks",
  "Building Blocks",

  // Dolls & Figures
  "Barbie Dolls",
  "Disney Princess Dolls",
  "Baby Dolls",
  "American Girl Dolls",
  "Marvel Superhero Figures",
  "DC Superhero Figures",
  "Transformers",
  "Action Figures",
  "Funko Pop Figures",
  "Toy Story Figures",
  "Doll Houses",
  "Stuffed Animals",
  "Plush Toys",

  // Vehicles & RC
  "Hot Wheels Cars",
  "Matchbox Cars",
  "Monster Trucks",
  "Remote Control Cars",
  "RC Boats",
  "RC Helicopters",
  "Drones",
  "Toy Trains",
  "Race Tracks",
  "Scooters",
  "Ride-On Cars",

  // Games & Puzzles
  "Board Games",
  "Monopoly",
  "Uno Cards",
  "Jenga",
  "Connect 4",
  "Chess Sets",
  "Checkers",
  "Puzzle Sets",
  "Rubik's Cube",
  "Beyblade Burst",
  "Pokemon Cards",
  "Trading Card Games",

  // Creative & Learning
  "Play-Doh",
  "Kinetic Sand",
  "Arts and Crafts Kits",
  "STEM Toys",
  "Science Kits",
  "Microscopes for Kids",
  "Magic Kits",
  "Musical Instruments for Kids",

  // Outdoor & Sports
  "NERF Guns",
  "Water Guns",
  "Bubble Machines",
  "Sports Balls",
  "Frisbees",
  "Trampolines",
  "Swing Sets",
  "Slides",
  "Bicycles for Kids",
  "Scooters",

  // Popular Brands
  "L.O.L. Surprise Dolls",
  "Hatchimals",
  "Paw Patrol Toys",
  "Peppa Pig Toys",
  "Cocomelon Toys",
  "Bluey Toys",
  "Frozen Dolls",
  "Jurassic World Dinosaurs",
  "Minecraft Toys",
  "Roblox Figures",
  "Sonic the Hedgehog Toys",
  "Mario Toys",
  "Pokemon Plush",
  "Zhu Zhu Pets",
  "Tamagotchi",
];

// Default suggestions (top toys)
const defaults = [
  "Drones",
  "LEGO Sets",
  "Barbie Dolls",
  "Hot Wheels Cars",
  "NERF Guns",
  "Play-Doh",
  "Funko Pop Figures",
  "Pokemon Cards",
  "L.O.L. Surprise Dolls",
  "Paw Patrol Toys",
];

const input = document.getElementById("search-input");
const box = document.getElementById("search-autocomplete");
const list = document.getElementById("search-listbox");

// show list
function show(items) {
  if (!items.length) {
    box.classList.add("hidden");
    return;
  }
  list.innerHTML = items
    .map(
      (text) => `
      <li onclick="pick('${text}')"
          class="flex items-center gap-2 px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer">
        <img src="images/search.svg" class="h-4 w-4 text-gray-500" alt="search"/>
        <span>${text}</span>
      </li>`
    )
    .join("");
  box.classList.remove("hidden");
}

// pick item
function pick(val) {
  input.value = val;
  box.classList.add("hidden");
}

// typing
input.addEventListener("input", () => {
  let q = input.value.toLowerCase().trim();
  let res = q ? keywords.filter((k) => k.toLowerCase().includes(q)).slice(0, 10) : defaults;
  show(res);
});

// focus (show defaults)
input.addEventListener("focus", () => {
  if (!input.value.trim()) show(defaults);
});

// esc / outside click
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") box.classList.add("hidden");
});
document.addEventListener("click", (e) => {
  if (!box.contains(e.target) && e.target !== input) {
    box.classList.add("hidden");
  }
});

// ============================ ALERT MODAL FOR EMPTY LINKS ========================= //
const alertModal = document.getElementById("alertModal");
const closeAlert = document.getElementById("closeAlert");

// Placeholder links
document.querySelectorAll('a[href="#"]').forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    showAlert();
  });
});

// Placeholder buttons
document.querySelectorAll("[data-alert]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    showAlert();
  });
});

function showAlert() {
  alertModal.classList.remove("hidden");
  alertModal.classList.add("flex");
}

closeAlert.addEventListener("click", () => {
  alertModal.classList.add("hidden");
});

// ===================== HERO SWIPER  =================== //
const heroSwiper = new Swiper(".heroSwiper", {
  loop: true,
  speed: 700,
  autoplay: { delay: 5000, disableOnInteraction: false },
  pagination: { el: ".heroPagination", clickable: true },
  navigation: { nextEl: ".heroNext", prevEl: ".heroPrev" },
  keyboard: { enabled: true },
  a11y: { enabled: true },
  // keep slide height consistent across breakpoints
  on: {
    init(sw) {
      // ensure slides stretch to container height
      sw.el.querySelectorAll(".swiper-slide").forEach((s) => s.classList.add("h-full"));
    },
  },
});

// ============================ PLAY / PAUSE BUTTON FOR HERO SLIDER =================== //
const playPauseBtn = document.getElementById("heroPlayPause");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");

let isPlaying = true;

playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    heroSwiper.autoplay.stop();
    playIcon.classList.remove("hidden");
    pauseIcon.classList.add("hidden");
  } else {
    heroSwiper.autoplay.start();
    playIcon.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
  }
  isPlaying = !isPlaying;
});

// ================================ BRAND SWIPER ============================== //
const brandSwiper = new Swiper(".brandSwiper", {
  loop: true,
  slidesPerView: 2,
  spaceBetween: 12,
  autoplay: { delay: 3000, disableOnInteraction: false },
  pagination: { el: ".brandPagination", clickable: true },
  keyboard: { enabled: true },
  a11y: { enabled: true },
  breakpoints: {
    640: { slidesPerView: 2, spaceBetween: 16 },
    1024: { slidesPerView: 3, spaceBetween: 24 },
  },
});

// ============================= PRODUCT SWIPER (peek carousel) ===================== //
const productsSwiper = new Swiper(".productsSwiper", {
  slidesPerView: 1.15, // default (mobile-first)
  spaceBetween: 12,
  centeredSlides: false,
  slidesOffsetBefore: 0,
  slidesOffsetAfter: 0,
  breakpoints: {
    0: { slidesPerView: 2.3, spaceBetween: 12 }, // mobile
    480: { slidesPerView: 2.5, spaceBetween: 14 }, // small mobile / portrait
    640: { slidesPerView: 2.5, spaceBetween: 20 }, // tablet
    1024: { slidesPerView: 3.5, spaceBetween: 24 }, // desktop
    1280: { slidesPerView: 4.5, spaceBetween: 28 }, // large desktop
  },
  navigation: { nextEl: ".productsNext", prevEl: ".productsPrev" },
  pagination: { el: ".productsPagination", clickable: true },
});

// ============================ PLAY / PAUSE ================== //
const video = document.getElementById("shopEasyVideo");
const toggle = document.getElementById("shopEasyToggle");
const iconPlay = document.getElementById("iconPlay");
const iconPause = document.getElementById("iconPause");

video.addEventListener("play", () => {
  iconPlay.classList.add("hidden");
  iconPause.classList.remove("hidden");
});
video.addEventListener("pause", () => {
  iconPause.classList.add("hidden");
  iconPlay.classList.remove("hidden");
});

toggle.addEventListener("click", () => {
  video.paused ? video.play() : video.pause();
});

// ============================ MUTE / UNMUTE ================== //
const muteBtn = document.getElementById("shopEasyMute");
const iconMute = document.getElementById("iconMute");
const iconUnmute = document.getElementById("iconUnmute");

video.muted = true; // start muted

muteBtn.addEventListener("click", () => {
  video.muted = !video.muted;
  if (video.muted) {
    iconMute.classList.remove("hidden");
    iconUnmute.classList.add("hidden");
  } else {
    iconMute.classList.add("hidden");
    iconUnmute.classList.remove("hidden");
  }
});

// ================================  COUNTDOWN TIMER =========================== //
document.querySelectorAll("[data-countdown]").forEach((el) => {
  const end = Date.now() + el.dataset.hours * 3600 * 1000;

  setInterval(() => {
    let diff = Math.max(0, end - Date.now());

    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000) % 24;
    const m = Math.floor(diff / 60000) % 60;
    const s = Math.floor(diff / 1000) % 60;

    el.querySelector(".cd-days").textContent = d + "d";
    el.querySelector(".cd-hours").textContent = h.toString().padStart(2, "0") + "h";
    el.querySelector(".cd-mins").textContent = m.toString().padStart(2, "0") + "m";
    el.querySelector(".cd-secs").textContent = s.toString().padStart(2, "0") + "s";
  }, 1000);
});
