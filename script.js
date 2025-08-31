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

// ===================== HERO SWIPER  =================== //
let heroSwiper;
if (document.querySelector(".heroSwiper") && window.Swiper) {
  heroSwiper = new Swiper(".heroSwiper", {
    loop: true,
    speed: 700,
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: ".heroPagination", clickable: true },
    navigation: { nextEl: ".heroNext", prevEl: ".heroPrev" },
    keyboard: { enabled: true },
    a11y: { enabled: true },
    on: {
      init(sw) {
        sw.el.querySelectorAll(".swiper-slide").forEach((s) => s.classList.add("h-full"));
      },
    },
  });

  const playPauseBtn = document.getElementById("heroPlayPause");
  const playIcon = document.getElementById("playIcon");
  const pauseIcon = document.getElementById("pauseIcon");
  if (playPauseBtn && playIcon && pauseIcon) {
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
  }
}

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
  speed: 260,
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

// ====================== HERO VIDEO CONTROLS ====================== //
const video = document.getElementById("shopEasyVideo");
const toggle = document.getElementById("shopEasyToggle");
const iconPlay = document.getElementById("iconPlay");
const iconPause = document.getElementById("iconPause");
const muteBtn = document.getElementById("shopEasyMute");
const iconMute = document.getElementById("iconMute");
const iconUnmute = document.getElementById("iconUnmute");

if (video) {
  video.muted = true;
  const updateMuteIcons = () => {
    if (!iconMute || !iconUnmute) return;
    if (video.muted) {
      iconMute.classList.remove("hidden");
      iconUnmute.classList.add("hidden");
    } else {
      iconMute.classList.add("hidden");
      iconUnmute.classList.remove("hidden");
    }
  };
  toggle && toggle.addEventListener("click", () => (video.paused ? video.play() : video.pause()));
  video.addEventListener("play", () => {
    iconPlay && iconPlay.classList.add("hidden");
    iconPause && iconPause.classList.remove("hidden");
  });
  video.addEventListener("pause", () => {
    iconPause && iconPause.classList.add("hidden");
    iconPlay && iconPlay.classList.remove("hidden");
  });
  muteBtn &&
    muteBtn.addEventListener("click", () => {
      video.muted = !video.muted;
      updateMuteIcons();
    });
  updateMuteIcons();
}

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

// ========================= ALERT MODAL (guarded) ========================= //
const alertModal = document.getElementById("alertModal");
const closeAlert = document.getElementById("closeAlert");
if (alertModal && closeAlert) {
  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      alertModal.classList.remove("hidden");
      alertModal.classList.add("flex");
    });
  });
  closeAlert.addEventListener("click", () => {
    alertModal.classList.add("hidden");
    alertModal.classList.remove("flex");
  });
}

// Close button
closeAlert.addEventListener("click", () => {
  alertModal.classList.add("hidden");
});

// ============================ FAKE LOGIN HANDLER ========================= //
// document.addEventListener("DOMContentLoaded", function () {
//   // --- LOGIN PAGE HANDLER ---
//   var loginForm = document.querySelector("form#loginForm");
//   if (loginForm) {
//     loginForm.addEventListener("submit", function (e) {
//       e.preventDefault();
//       var email = document.getElementById("email").value.trim();
//       var password = document.getElementById("password").value.trim();

//       if (email === "paulbryant@eta07.com" && password === "1234") {
//         localStorage.setItem("isLoggedIn", "true");
//         localStorage.setItem("username", "Paul Bryant");
//         window.location.href = "index.html";
//       } else {
//         alert("Invalid email or password.");
//       }
//     });
//   }

//   // Helper: attach logout to any "[data-logout]" button
//   function bindLogoutHandlers(scope) {
//     var buttons = (scope || document).querySelectorAll("[data-logout]");
//     buttons.forEach(function (btn) {
//       btn.addEventListener("click", function () {
//         localStorage.removeItem("isLoggedIn");
//         localStorage.removeItem("username");
//         window.location.href = "index.html";
//       });
//     });
//   }

//   // Render desktop auth (dropdown)
//   function renderDesktopAuth(username) {
//     var authSection = document.getElementById("authDesktop");
//     if (!authSection) return;

//     if (localStorage.getItem("isLoggedIn") === "true") {
//       authSection.innerHTML = `
//         <div id="userMenuWrap" class="relative inline-block">
//           <button id="userMenuBtn" type="button" aria-haspopup="true" aria-expanded="false"
//                   class="flex items-center gap-2 cursor-pointer select-none">
//             <span class="text-sm sm:text-base text-[#666666] font-bold">Hi! ${username}</span>
//             <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//               <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"/>
//             </svg>
//           </button>
//           <div id="userMenu"
//                class="absolute right-0 mt-2 w-35 bg-white border border-gray-200 rounded-lg shadow-lg p-1 hidden z-50">
//             <a href="profile-details.html"
//                class="block px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100">View Profile</a>
//             <button data-logout
//                class="w-full text-left block px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100">Logout</button>
//           </div>
//         </div>
//       `;

//       var wrap = document.getElementById("userMenuWrap");
//       var btn = document.getElementById("userMenuBtn");
//       var menu = document.getElementById("userMenu");

//       function hideMenu() {
//         if (!menu.classList.contains("hidden")) {
//           menu.classList.add("hidden");
//           btn.setAttribute("aria-expanded", "false");
//         }
//       }
//       function toggleMenu() {
//         var willShow = menu.classList.contains("hidden");
//         menu.classList.toggle("hidden");
//         btn.setAttribute("aria-expanded", String(willShow));
//       }

//       btn.addEventListener("click", function (e) {
//         e.stopPropagation();
//         toggleMenu();
//       });
//       document.addEventListener("click", function (e) {
//         if (!wrap.contains(e.target)) hideMenu();
//       });
//       document.addEventListener("keydown", function (e) {
//         if (e.key === "Escape") hideMenu();
//       });

//       bindLogoutHandlers(authSection);
//     } else {
//       // keep original Sign In / Sign Up
//       authSection.innerHTML = `
//         <a href="profile-details.html">
//           <img src="images/user.svg" alt="user" class="h-5 sm:h-6 w-5 sm:w-6" />
//         </a>
//         <div class="flex items-center space-x-1">
//           <a href="register.html" class="text-sm sm:text-base text-[#666666] font-bold hover:opacity-80 transition-opacity">Sign Up</a>
//           <span class="text-sm sm:text-base text-[#666666] font-bold">/</span>
//           <a href="login.html" class="text-sm sm:text-base text-[#666666] font-bold hover:opacity-80 transition-opacity">Sign In</a>
//         </div>
//       `;
//     }
//   }

//   // Render mobile auth (inline)
//   function renderMobileAuth(username) {
//     var mobile = document.getElementById("authMobile");
//     if (!mobile) return;

//     if (localStorage.getItem("isLoggedIn") === "true") {
//       mobile.innerHTML = `
//         <img src="images/user.svg" alt="user" class="h-6 w-6 mr-4" />
//         <div class="flex items-center gap-3">
//           <span class="text-sm font-semibold text-gray-800">Hi! ${username}</span>
//           <a href="profile-details.html" class="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Profile</a>
//           <button data-logout class="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Logout</button>
//         </div>
//       `;
//       bindLogoutHandlers(mobile);
//     } else {
//     }
//   }

//   // --- INDEX AUTH CHECK (both) ---
//   var username = localStorage.getItem("username") || "User";
//   renderDesktopAuth(username);
//   renderMobileAuth(username);
// });

// ============================  ACCORDION FOR SELLER ========================= //
document.querySelectorAll(".faq-item").forEach((item) => {
  const btn = item.querySelector(".faq-question");
  const ans = item.querySelector(".faq-answer");
  const icon = item.querySelector(".faq-icon");

  btn.addEventListener("click", () => {
    const isOpen = btn.getAttribute("aria-expanded") === "true";

    // toggle aria + visibility
    btn.setAttribute("aria-expanded", String(!isOpen));
    ans.classList.toggle("hidden", isOpen);

    // rotate the chevron
    icon.classList.toggle("-rotate-180", !isOpen);
  });
});

// ============================  PERFECT LISTING SECTION CAROUSEL ========================= //
const plSwiper = new Swiper(".pl-slider", {
  slidesPerView: 1.3,
  spaceBetween: 16,
  grabCursor: true,
  watchOverflow: true,
  centeredSlides: false,
  loop: false,

  navigation: { nextEl: ".pl-next", prevEl: ".pl-prev" },

  // Responsive breakpoints
  breakpoints: {
    640: { slidesPerView: 1.4, spaceBetween: 18 },
    768: { slidesPerView: 1.8, spaceBetween: 20 },
    1024: { slidesPerView: 2.2, spaceBetween: 22 },
    1280: { slidesPerView: 2.5, spaceBetween: 24 },
  },

  // Event handlers for peek overlay control (remove peek overlay when last slide is reached)
  on: {
    slideChange() {
      const overlays = document.querySelectorAll("#perfect-listing .peek-overlay");
      overlays.forEach((el) => {
        el.style.transition = "opacity 0.3s ease";
        el.style.opacity = this.isEnd ? "0" : "1";
      });
    },
    init() {
      const overlays = document.querySelectorAll("#perfect-listing .peek-overlay");
      overlays.forEach((el) => (el.style.transition = "opacity 0.3s ease"));
    },
  },
});

// Mobile search toggle functionality
const mobileSearchBtn = document.getElementById("mobile-search-btn");
const mobileSearchContainer = document.getElementById("mobile-search-container");
const closeMobileSearch = document.getElementById("close-mobile-search");
const mobileSearchInput = document.getElementById("mobile-search-input");

// Open mobile search
mobileSearchBtn.addEventListener("click", function () {
  mobileSearchContainer.classList.add("active");
  // Focus on input after animation
  setTimeout(() => {
    mobileSearchInput.focus();
  }, 100);
});

// Close mobile search
closeMobileSearch.addEventListener("click", function () {
  mobileSearchContainer.classList.remove("active");
  mobileSearchInput.value = "";
});

// Optional: Close on escape key
mobileSearchInput.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    mobileSearchContainer.classList.remove("active");
    mobileSearchInput.value = "";
  }
});
