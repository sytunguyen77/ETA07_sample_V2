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
        <img src="images/svg/search.svg" class="h-4 w-4 text-gray-500" alt="search"/>
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
