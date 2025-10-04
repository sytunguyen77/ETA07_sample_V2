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
    1024: { slidesPerView: 3, spaceBetween: 15 },
  },
});

// ============================= PRODUCT SWIPER (peek carousel) (FREQUENLY BOUGHT TOGETHER) ===================== //
const productsSwiper = new Swiper(".productsSwiper", {
  slidesPerView: 3, //
  spaceBetween: 12,
  speed: 260,
  centeredSlides: false,
  slidesOffsetBefore: 0,
  slidesOffsetAfter: 0,
  breakpoints: {
    0: { slidesPerView: 2.3, spaceBetween: 12 },
    480: { slidesPerView: 2.5, spaceBetween: 14 },
    640: { slidesPerView: 2.5, spaceBetween: 20 },
    1024: { slidesPerView: 3.5, spaceBetween: 24 },
    1280: { slidesPerView: 4.5, spaceBetween: 15 },
  },
  navigation: { nextEl: ".productsNext", prevEl: ".productsPrev" },
  pagination: { el: ".productsPagination", clickable: true },
});

// ============================= THINGS SWIPER (THINGS YOU MAY LIKE) ===================== //
const thingsSwiper = new Swiper(".thingsSwiper", {
  slidesPerView: 3,
  spaceBetween: 12,
  speed: 260,
  centeredSlides: false,
  slidesOffsetBefore: 0,
  slidesOffsetAfter: 0,
  breakpoints: {
    0: { slidesPerView: 2.3, spaceBetween: 12 },
    480: { slidesPerView: 2.5, spaceBetween: 14 },
    640: { slidesPerView: 2.5, spaceBetween: 20 },
    1024: { slidesPerView: 3.5, spaceBetween: 24 },
    1280: { slidesPerView: 4.5, spaceBetween: 15 },
  },
  navigation: { nextEl: ".thingsNext", prevEl: ".thingsPrev" },
  pagination: { el: ".thingsPagination", clickable: true },
});

// ============================= SIMILAR PRODUCTS SWIPER ===================== //
const similarSwiper = new Swiper(".similarSwiper", {
  slidesPerView: 3,
  spaceBetween: 12,
  speed: 260,
  centeredSlides: false,
  slidesOffsetBefore: 0,
  slidesOffsetAfter: 0,
  breakpoints: {
    0: { slidesPerView: 2.3, spaceBetween: 12 },
    480: { slidesPerView: 2.5, spaceBetween: 14 },
    640: { slidesPerView: 2.5, spaceBetween: 20 },
    1024: { slidesPerView: 3.5, spaceBetween: 24 },
    1280: { slidesPerView: 4.5, spaceBetween: 15 },
  },
  navigation: { nextEl: ".similarNext", prevEl: ".similarPrev" },
  pagination: { el: ".similarPagination", clickable: true },
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
