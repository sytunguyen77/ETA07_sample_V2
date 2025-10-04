// Dynamic Deals Data - Using shared product database
const dealsData = [
  {
    productId: "deal1",
    flashDealHours: 5,
    badge: "New",
  },
  {
    productId: "deal2",
    flashDealHours: 1,
    badge: "New",
  },
  {
    productId: "deal3",
    flashDealHours: 8,
    badge: "New",
  },
  {
    productId: "deal4",
    flashDealHours: 1,
    badge: "New",
  },
].map((deal) => {
  const product = allProductsData[deal.productId];
  return {
    id: deal.productId,
    name: product.name,
    image: product.images[0],
    currentPrice: product.currentPrice,
    originalPrice: product.originalPrice,
    discount: product.discount,
    rating: product.rating,
    reviews: product.reviews,
    flashDealHours: deal.flashDealHours,
    badge: deal.badge,
    link: `product-details.html?id=${deal.productId}`,
  };
});

// Function to calculate flash deal progress
function calculateFlashDealProgress(hoursLeft) {
  const maxHours = 24;
  const percentage = ((maxHours - hoursLeft) / maxHours) * 100;
  return Math.min(Math.max(percentage, 10), 100);
}

// Function to get flash deal color based on hours left
function getFlashDealColor(hoursLeft) {
  if (hoursLeft <= 2) return { text: "text-red-500", bg: "bg-red-500", bgLight: "bg-red-100" };
  if (hoursLeft <= 5) return { text: "text-orange-500", bg: "bg-orange-500", bgLight: "bg-orange-100" };
  return { text: "text-blue-500", bg: "bg-blue-500", bgLight: "bg-blue-100" };
}

// Function to render star rating
function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const stars = [];

  for (let i = 0; i < 5; i++) {
    const fillColor = i < fullStars ? "text-yellow-400" : "text-gray-300";
    stars.push(`
      <svg class="w-3 h-3 sm:w-4 sm:h-4 ${fillColor} fill-current" viewBox="0 0 20 20">
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    `);
  }

  return stars.join("");
}

// Function to render a single deal card
function renderDealCard(deal) {
  const colors = getFlashDealColor(deal.flashDealHours);
  const progress = calculateFlashDealProgress(deal.flashDealHours);

  return `
    <div>
      <!-- White container covering only the image section -->
      <div class="bg-gray-50 rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-sm transition-shadow group">
        <div class="p-1 sm:p-1.5">
          <div class="relative">
            <!-- Gray Rounded Container -->
            <a
              href="${deal.link}"
              class="bg-gray-200 rounded-2xl sm:rounded-3xl flex items-center justify-center h-[160px] sm:h-[200px] md:h-[320px]"
            >
              <!-- Product Image -->
              <img
                src="${deal.image}"
                alt="${deal.name}"
                class="max-h-full max-w-full object-contain transform transition-transform duration-300 group-hover:scale-110"
              />
            </a>

            <!-- New Badge (top left) -->
            ${
              deal.badge
                ? `
            <div class="absolute top-0 left-0">
              <div class="bg-[#E6B847] text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-tl-2xl rounded-br-2xl font-semibold text-xs sm:text-sm">
                ${deal.badge}
              </div>
            </div>
            `
                : ""
            }

            <!-- Wishlist Icon (top right) -->
            <div class="absolute top-2 right-2 sm:top-3 sm:right-3">
              <button
                class="bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 md:p-2.5 rounded-full transition-all hover:scale-110 group cursor-pointer wishlist-btn"
                data-product-id="${deal.id}"
              >
                <!-- Heart Icon (outline) -->
                <svg
                  class="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 transition-colors heart-outline"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
                <!-- Heart Icon (filled) - hidden by default -->
                <svg
                  class="w-3 h-3 sm:w-4 sm:h-4 text-red-500 hidden heart-filled"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Flash Deal Timer -->
      <div class="px-3 sm:px-4 mt-2">
        <div class="flex items-center gap-2 text-xs sm:text-sm">
          <span class="${colors.text}" data-flash-timer="${deal.id}">Flash Deal Ends in ${deal.flashDealHours} Hours</span>
          <span class="hidden sm:block ${colors.text}">!</span>
        </div>
        <!-- Progress bar -->
        <div class="mt-2 h-2 w-full rounded-full ${colors.bgLight} overflow-hidden">
          <div class="h-full rounded-full ${colors.bg}" style="width: ${progress}%"></div>
        </div>
      </div>

      <!-- Product Info -->
      <div class="p-3 sm:p-4">
        <div class="h-12 sm:h-14 md:h-15 lg:h-16">
          <h3 class="text-sm sm:text-base md:text-lg font-bold text-[#292C2D] line-clamp-2">
            ${deal.name}
          </h3>
        </div>

        <!-- Rating Section -->
        <div class="flex items-center gap-1 mb-2">
          <!-- Stars -->
          <div class="flex items-center">
            ${renderStars(deal.rating)}
          </div>
          <!-- Rating Number -->
          <span class="text-[10px] sm:text-xs text-gray-600 font-medium">${deal.rating.toFixed(1)}</span>
          <!-- Review Count -->
          <span class="hidden sm:block text-[10px] sm:text-xs text-gray-500">(${deal.reviews} reviews)</span>
        </div>

        <!-- Price Section -->
        <div class="mb-3">
          <!-- Current price -->
          <div class="flex items-center gap-2">
            <span class="text-md sm:text-xl md:text-2xl font-bold text-[#292C2D]">$${deal.currentPrice.toFixed(2)}</span>
          </div>
          <!-- Original price and discount percentage  -->
          <div class="flex items-center gap-2">
            <span class="text-xs sm:text-sm text-gray-500 line-through">$${deal.originalPrice.toFixed(2)}</span>
            <span class="text-xs sm:text-sm font-semibold text-[#292C2D] bg-[#E8C14A] px-2 py-0.5 rounded"> ${
              deal.discount
            }% OFF </span>
          </div>
        </div>

        <!-- Buy Now Button -->
        <a
          href="${deal.link}"
          class="w-full bg-[#292C2D] text-white py-2 px-1 rounded-lg font-semibold text-sm sm:text-base md:text-lg hover:bg-[#1a1d1e] transition-colors flex items-center justify-center gap-0.5 sm:gap-1 cursor-pointer"
        >
          <div class="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8">
            <!-- Thunder on top -->
            <img src="images/svg/thunder.svg" alt="thunder" class="w-full h-full relative z-10" />

            <!-- Circle in center -->
            <img
              src="images/svg/circle.svg"
              alt="circle"
              class="absolute top-1/2 left-1/2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 -translate-x-1/2 -translate-y-1/2 z-0"
            />
          </div>

          <span class="flex items-center gap-1 text-xs sm:text-base md:text-base"> BUY NOW </span>
        </a>
      </div>
    </div>
  `;
}

// Function to render all deals
function renderDeals() {
  const dealsContainer = document.getElementById("deals-grid");
  if (!dealsContainer) return;

  const html = dealsData.map((deal) => renderDealCard(deal)).join("");
  dealsContainer.innerHTML = html;

  // Initialize wishlist functionality
  initializeWishlist();
  // Start flash deal timers
  startFlashDealTimers();
}

// Initialize wishlist functionality
function initializeWishlist() {
  document.querySelectorAll(".wishlist-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const heartOutline = this.querySelector(".heart-outline");
      const heartFilled = this.querySelector(".heart-filled");

      heartOutline.classList.toggle("hidden");
      heartFilled.classList.toggle("hidden");
    });
  });
}

// Start flash deal countdown timers
function startFlashDealTimers() {
  dealsData.forEach((deal) => {
    const timerElement = document.querySelector(`[data-flash-timer="${deal.id}"]`);
    const timerContainer = timerElement?.closest(".px-3");
    if (!timerElement || !timerContainer) return;

    const exclamationMark = timerContainer.querySelector(".hidden.sm\\:block");
    const progressBar = timerContainer.querySelector(".h-full.rounded-full");
    const progressBarBg = timerContainer.querySelector(".h-2.w-full.rounded-full");

    let remainingHours = deal.flashDealHours;
    let remainingMinutes = 0;
    let remainingSeconds = 0;

    const updateTimer = () => {
      if (remainingSeconds > 0) {
        remainingSeconds--;
      } else if (remainingMinutes > 0) {
        remainingMinutes--;
        remainingSeconds = 59;
      } else if (remainingHours > 0) {
        remainingHours--;
        remainingMinutes = 59;
        remainingSeconds = 59;
      } else {
        timerElement.textContent = "Deal Ended";
        return;
      }

      // Calculate current hours (including fractional hours from minutes)
      const currentHours = remainingHours + remainingMinutes / 60;
      const colors = getFlashDealColor(currentHours);
      const progress = calculateFlashDealProgress(currentHours);

      // Update text color classes
      timerElement.className = `${colors.text}`;
      if (exclamationMark) {
        exclamationMark.className = `hidden sm:block ${colors.text}`;
      }

      // Update progress bar colors
      if (progressBar) {
        progressBar.className = `h-full rounded-full ${colors.bg}`;
        progressBar.style.width = `${progress}%`;
      }
      if (progressBarBg) {
        progressBarBg.className = `mt-2 h-2 w-full rounded-full ${colors.bgLight} overflow-hidden`;
      }

      // Update text
      const hoursText = remainingHours === 1 ? "Hour" : "Hours";
      const minutesText = remainingMinutes === 1 ? "Minute" : "Minutes";

      if (remainingHours > 0) {
        timerElement.textContent = `Flash Deal Ends in ${remainingHours} ${hoursText}`;
      } else if (remainingMinutes > 0) {
        timerElement.textContent = `Flash Deal Ends in ${remainingMinutes} ${minutesText}`;
      } else {
        timerElement.textContent = `Flash Deal Ends in ${remainingSeconds} Seconds`;
      }
    };

    setInterval(updateTimer, 1000);
  });
}

// Initialize deals when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderDeals);
} else {
  renderDeals();
}
