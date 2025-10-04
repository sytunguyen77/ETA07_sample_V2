// Dynamic Products Data - Using shared product database
const productsData = ["product1", "product2", "product3", "product4", "product5", "product6", "product7"].map((productId) => {
  const product = allProductsData[productId];
  return {
    id: productId,
    name: product.name,
    image: product.images[0],
    video: product.video,
    price: product.currentPrice,
    rating: product.rating,
    reviews: product.reviews,
    link: `product-details.html?id=${productId}`,
  };
});

// Function to render star rating
function renderProductStars(rating) {
  const fullStars = Math.floor(rating);
  const stars = [];

  for (let i = 0; i < 5; i++) {
    const fillColor = i < fullStars ? "text-yellow-400" : "text-gray-300";
    stars.push(`
      <svg class="w-4 h-4 ${fillColor} fill-current" viewBox="0 0 20 20">
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    `);
  }

  return stars.join("");
}

// Function to render a video product card
function renderVideoProductCard(product) {
  return `
    <div class="swiper-slide">
      <div
        class="group relative block bg-gray-50 rounded-xl border border-[#E4E7E9] overflow-hidden cursor-pointer hover:border-gray-400 transition-colors duration-200 p-1 sm:p-1.5"
      >
        <!-- Wishlist -->
        <button
          class="absolute right-2 sm:right-3 md:right-3 top-2 sm:top-3 md:top-3 z-10 bg-white rounded-full p-1.5 sm:p-2 md:p-2.5 shadow-md cursor-pointer transition-colors duration-200 group hover:bg-red-50 hover:ring-1 hover:ring-red-200 product-wishlist-btn"
          aria-label="Add to wishlist"
          data-product-id="${product.id}"
        >
          <svg class="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 product-heart-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <svg class="w-3 h-3 sm:w-4 sm:h-4 text-red-500 hidden product-heart-filled" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        <!-- Link wrapper -->
        <a href="${product.link}" class="relative block rounded-xl">
          <div class="relative rounded-xl h-40 sm:h-70 md:h-80 flex items-center justify-center overflow-hidden">
            <!-- Video -->
            <video
              class="h-full w-full object-cover rounded-xl"
              src="${product.video}"
              autoplay
              muted
              loop
              playsinline
            ></video>

            <!-- Play / Pause button -->
            <button
              type="button"
              class="video-toggle absolute right-1.5 bottom-0 mb-1.5 z-10 bg-black/60 rounded-full p-1.5 sm:p-2 md:p-2.5 shadow-md cursor-pointer transition-colors duration-200 hover:bg-black/75 hover:ring-1 hover:ring-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FDB913]"
              aria-label="Play/Pause"
            >
              <!-- Pause icon (default when autoplay is on) -->
              <svg class="w-3 h-3 sm:w-4 sm:h-4 text-white video-pause-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
              </svg>
              <!-- Play icon (hidden initially) -->
              <svg class="w-3 h-3 sm:w-4 sm:h-4 text-white hidden video-play-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </a>
      </div>

      <!-- Content -->
      <div class="pb-4 mt-3">
        <h3 class="text-sm md:text-base font-medium text-[#292C2D] line-clamp-2">
          ${product.name}
        </h3>
        <div class="flex items-center gap-1 mt-1">
          <div class="flex">
            ${renderProductStars(product.rating)}
          </div>
          <span class="text-xs text-gray-500">(${product.reviews})</span>
        </div>
        <div class="mt-2 text-[#292C2D] font-semibold">$${product.price.toLocaleString()}</div>
      </div>
    </div>
  `;
}

// Function to render a regular product card
function renderProductCard(product) {
  return `
    <div class="swiper-slide">
      <div
        class="group relative block bg-gray-50 rounded-xl border border-[#E4E7E9] cursor-pointer hover:border-gray-400 transition-colors duration-200 p-1 sm:p-1.5"
      >
        <!-- Wishlist -->
        <button
          class="absolute right-2 sm:right-3 md:right-3 top-2 sm:top-3 md:top-3 z-10 bg-white rounded-full p-1.5 sm:p-2 md:p-2.5 shadow-md cursor-pointer transition-colors duration-200 group hover:bg-red-50 hover:ring-1 hover:ring-red-200 product-wishlist-btn"
          aria-label="Add to wishlist"
          data-product-id="${product.id}"
        >
          <svg class="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 product-heart-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <svg class="w-3 h-3 sm:w-4 sm:h-4 text-red-500 hidden product-heart-filled" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
        <!-- Image -->
        <a href="${product.link}" class="relative block bg-[#f4f4f4] rounded-xl">
          <div class="rounded-xl h-40 sm:h-70 md:h-80 flex items-center justify-center overflow-hidden">
            <img src="${product.image}" alt="${product.name}" class="h-full w-full object-full" />
          </div>
        </a>
      </div>
      <!-- Content -->
      <div class="pb-4 mt-3">
        <h3 class="text-sm md:text-base font-medium text-[#292C2D] line-clamp-2">
          ${product.name}
        </h3>
        <div class="flex items-center gap-1 mt-1">
          <div class="flex">
            ${renderProductStars(product.rating)}
          </div>
          <span class="text-xs text-gray-500">(${product.reviews})</span>
        </div>
        <div class="mt-2 text-[#292C2D] font-semibold">$${product.price.toLocaleString()}</div>
      </div>
    </div>
  `;
}

// Function to render all products
function renderProducts() {
  const productsContainer = document.querySelector(".productsSwiper .swiper-wrapper");
  if (!productsContainer) return;

  const html = productsData
    .map((product) => {
      if (product.video) {
        return renderVideoProductCard(product);
      }
      return renderProductCard(product);
    })
    .join("");

  productsContainer.innerHTML = html;

  // Initialize wishlist functionality
  initializeProductWishlist();
  // Initialize video controls
  initializeVideoControls();
}

// Initialize wishlist functionality for products
function initializeProductWishlist() {
  document.querySelectorAll(".product-wishlist-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const heartOutline = this.querySelector(".product-heart-outline");
      const heartFilled = this.querySelector(".product-heart-filled");

      heartOutline.classList.toggle("hidden");
      heartFilled.classList.toggle("hidden");
    });
  });
}

// Initialize video controls
function initializeVideoControls() {
  document.querySelectorAll(".video-toggle").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const videoContainer = this.closest(".relative");
      const video = videoContainer.querySelector("video");
      const pauseIcon = this.querySelector(".video-pause-icon");
      const playIcon = this.querySelector(".video-play-icon");

      if (video.paused) {
        video.play();
        playIcon.classList.add("hidden");
        pauseIcon.classList.remove("hidden");
        this.setAttribute("aria-pressed", "true");
      } else {
        video.pause();
        pauseIcon.classList.add("hidden");
        playIcon.classList.remove("hidden");
        this.setAttribute("aria-pressed", "false");
      }
    });
  });
}

// Initialize products when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderProducts);
} else {
  renderProducts();
}
