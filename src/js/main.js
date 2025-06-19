import '../css/index.css';
// common slider
  // Slider initialisation function
  export function initAllSliders() {
    document.querySelectorAll('.slider-list').forEach(sliderList => {
      function findSliderButtons(sliderList) {
        const section = sliderList.closest('section.slider-section');
        if (!section) {
          console.warn("Could not find common parent section for slider buttons. Slider initialization skipped for this list.");
          return { leftBtn: null, rightBtn: null };
        }
        const leftBtn = section.querySelector('.slider-left');
        const rightBtn = section.querySelector('.slider-right');
        return { leftBtn, rightBtn };
      }
  
      const { leftBtn, rightBtn } = findSliderButtons(sliderList);
      if (!leftBtn || !rightBtn) {
        console.warn("Slider buttons not found for a slider list. Skipping initialization.");
        return;
      }
  
      let currentIndex = 0;
  
      function getCards() {
        return Array.from(sliderList.querySelectorAll(':scope > li, :scope > a.category-l, :scope > .category-li, :scope > .product-li'));
      }
  
      function getGap(cards) {
    if (cards.length < 2) return 0;
    const firstRight = cards[0].getBoundingClientRect().right;
    const secondLeft = cards[1].getBoundingClientRect().left;
    return Math.round(secondLeft - firstRight);
  }
  
      function getParentWidth() {
        let parent = sliderList.parentElement;
        while (parent) {
          const overflowX = getComputedStyle(parent).overflowX;
          if (overflowX === 'hidden' || overflowX === 'clip') {
            return parent.offsetWidth;
          }
          parent = parent.parentElement;
        }
        return sliderList.parentElement.offsetWidth;
      }
  
      function getSliderListPadding(sliderList) {
        const style = getComputedStyle(sliderList);
        return parseFloat(style.paddingLeft || 0);
      }
  
      function getOffset(cards, gap, index, maxScroll) {
        let offset = 0;
        for (let i = 0; i < index; i++) {
          if (cards[i]) {
            offset += cards[i].getBoundingClientRect().width + gap;
          } else {
            break;
          }
        }
        if (offset > maxScroll) offset = maxScroll;
        return offset;
      }
  
      function getMaxScroll(cards, gap, parentWidth) {
        let totalWidth = 0;
        for (let i = 0; i < cards.length; i++) {
          totalWidth += Math.round(cards[i].getBoundingClientRect().width);
          if (i < cards.length - 1) totalWidth += gap;
        }
        let maxScroll = totalWidth - parentWidth + getSliderListPadding(sliderList);
        return maxScroll > 0 ? maxScroll : 0;
      }
  
      function getMaxIndex(cards, gap, maxScroll) {
        let offset = 0;
        for (let i = 0; i < cards.length; i++) {
          if (i > 0) offset += cards[i - 1].getBoundingClientRect().width + gap;
          if (offset >= maxScroll) return i; 
        }
        return cards.length > 0 ? cards.length - 1 : 0;
      }
  
      function updateSlider() {
        const cards = getCards();
        if (cards.length === 0) {
          leftBtn.disabled = true;
          rightBtn.disabled = true;
          return;
        }
  
        const gap = getGap(cards);
        const parentWidth = getParentWidth();
        const maxScroll = getMaxScroll(cards, gap, parentWidth);
        const maxIndex = getMaxIndex(cards, gap, maxScroll);
  
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;
  
        const ulPadding = getSliderListPadding(sliderList);
        const offset = getOffset(cards, gap, currentIndex, maxScroll);
  
        sliderList.style.transform = `translateX(-${offset}px)`;
        sliderList.style.transition = 'transform 0.3s ease';
  
        leftBtn.disabled = (currentIndex === 0);
        rightBtn.disabled = (currentIndex >= maxIndex);
      }
  
      rightBtn.addEventListener('click', () => {
        currentIndex++;
        updateSlider();
      });
  
      leftBtn.addEventListener('click', () => {
        currentIndex--;
        updateSlider();
      });
  
      window.addEventListener('resize', () => {
        currentIndex = 0;
        updateSlider();
      });
  
      updateSlider();
    });
  }

// header
  // --- favorite button ---
  export function initFavoriteButtons() {
    const heartButtons = document.querySelectorAll('.favorite-btn');
    const favoritesCountElem = document.getElementById('favorites-count');
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  
    heartButtons.forEach((btn, idx) => {
      const li = btn.closest('li');
      const prodKey = li?.querySelector('.text-orange-400')?.textContent || idx;
      const svg = btn.querySelector('svg');
  
      // Do nothing if SVG cannot be retrieved
      if (!svg) return;
  
      // Reset to initial state every time
      if (favorites.includes(prodKey)) {
        svg.classList.remove('text-gray-400');
        svg.classList.add('text-red-500');
      } else {
        svg.classList.remove('text-red-500');
        svg.classList.add('text-gray-400');
      }
  
      // Remove existing event and reassign
      btn.onclick = function () {
        const isFav = favorites.includes(prodKey);
        if (isFav) {
          favorites = favorites.filter(f => f !== prodKey);
          svg.classList.remove('text-red-500');
          svg.classList.add('text-gray-400');
        } else {
          favorites.push(prodKey);
          svg.classList.remove('text-gray-400');
          svg.classList.add('text-red-500');
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        if (favoritesCountElem) {
          favoritesCountElem.textContent = favorites.length;
        }
      }
    });
  
    //  Reflect the number of favourites in the header when the page loads
    if (favoritesCountElem) {
      favoritesCountElem.textContent = favorites.length;
    }
  }
    const heartButtons = document.querySelectorAll('.favorite-btn');
    const favoritesCountElem = document.getElementById('favorites-count');
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  
    heartButtons.forEach((btn, idx) => {
      const li = btn.closest('li');
      const prodKey = li?.querySelector('.text-orange-400')?.textContent || idx;
      const svg = btn.querySelector('svg');
  
      // itiial state
      if (favorites.includes(prodKey)) {
        svg.classList.remove('text-gray-400');
        svg.classList.add('text-red-500');
      } else {
        svg.classList.remove('text-red-500');
        svg.classList.add('text-gray-400');
      }
  
      btn.addEventListener('click', function () {
        const isFav = favorites.includes(prodKey);
        if (isFav) {
          favorites = favorites.filter(f => f !== prodKey);
          svg.classList.remove('text-red-500');
          svg.classList.add('text-gray-400');
        } else {
          favorites.push(prodKey);
          svg.classList.remove('text-gray-400');
          svg.classList.add('text-red-500');
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        const countElem = document.getElementById('favorites-count');
        if (countElem) {
          countElem.textContent = favorites.length;
        }
      });
    });
  // Reflect the number of favourites in the header when the page loads
  if (favoritesCountElem) {
    favoritesCountElem.textContent = favorites.length;
  }
  // Cart Button
  export function initCartButtons() {
    const cartButtons = document.querySelectorAll('.addToCartBtn');
    const cartCountElem = document.getElementById('cart-count');
    const cartTotalElem = document.getElementById('cart-total');
  
    //  Initialise cart array
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!Array.isArray(cart)) cart = [];
  
    // Update total price & quantity display and update button colour, text, and image
    function updateCartDisplay() {
      if (cartCountElem) cartCountElem.textContent = cart.length;
      if (cartTotalElem) {
        const total = cart.reduce((sum, item) => {
          const price = typeof item.price === "number" ? item.price : parseFloat(item.price);
          return sum + (isNaN(price) ? 0 : price);
        }, 0);
        cartTotalElem.textContent = `$${total.toFixed(2)}`;
      }
  
      cartButtons.forEach((btn, idx) => {
        const productElem = btn.closest('[data-category]');
        if (!productElem) return;
        const nameElem = productElem.querySelector('.text-orange-400');
        const prodKey = nameElem?.textContent?.trim() || `product${idx}`;
        const text = btn.querySelector('.addToCartText');
        const img = btn.querySelector('img');
  
        if (cart.some(item => item.key === prodKey)) {
          btn.classList.add('in-cart');
          text.textContent = 'Remove from Cart';
          text.classList.remove('text-gray-500');
          text.classList.add('text-yellow-500', 'font-bold');
          img.style.filter = 'brightness(0) saturate(100%) invert(72%) sepia(83%) saturate(1500%) hue-rotate(6deg) brightness(100%) contrast(100%)';
        } else {
          btn.classList.remove('in-cart');
          text.textContent = 'Add To Cart';
          text.classList.remove('text-yellow-500', 'font-bold');
          text.classList.add('text-gray-500');
          img.style.filter = '';
        }
      });
    }
  
    updateCartDisplay();
  
    cartButtons.forEach((btn, idx) => {
      btn.onclick = function () {
        const productElem = btn.closest('[data-category]');
        if (!productElem) return;
  
        const nameElem = productElem.querySelector('.text-orange-400');
        const priceElem = productElem.querySelector('[data-price]');
        const prodKey = nameElem?.textContent?.trim() || `product${idx}`;
        const price = priceElem?.dataset.price ? parseFloat(priceElem.dataset.price) : 0;
  
        const cartIndex = cart.findIndex(item => item.key === prodKey);
        if (cartIndex === -1) {
          cart.push({ key: prodKey, price });
        } else {
          cart.splice(cartIndex, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
      };
    });
  }

  //Quantity Controller
  export function initQuantityButtons() {
  console.log("initQuantityButtons called")
    document.querySelectorAll('.increment, .decrement').forEach(btn => {
      btn.addEventListener('click', function() {
        const parent = btn.parentElement;
        const quantityElem = parent.querySelector('.quantity');
        console.log('btn:', btn, 'parent:', parent, 'quantityElem:', quantityElem);
  
        if (!quantityElem) {
          alert('数量表示が見つかりません');
          return;
        }
        let quantity = parseInt(quantityElem.textContent, 10);
  
        if (btn.classList.contains('increment')) {
          quantity++;
        } else if (btn.classList.contains('decrement')) {
          quantity = Math.max(0, quantity - 1);
        }
        quantityElem.textContent = quantity;
      });
    });
  }
// Product Showcase
  // slider
  const slider = document.getElementById('slider');
  const slides = slider.children;
  const indicators = document.querySelectorAll('#indicators span');
  const slideCount = slides.length;
  const slideWidth = 100 / slideCount;
  let current = 0;
  
  // Adjust width of the entire slider
  slider.style.width = `${slideCount * 100}%`;
  
  // Adjust width of the entire slider
  for (let i = 0; i < slideCount; i++) {
    slides[i].style.width = `${slideWidth}%`;
  }
  
  // Show slide
  function showSlide(n) {
    current = n;
    slider.style.transition = 'transform 0.7s cubic-bezier(0.4,0,0.2,1)';
    slider.style.transform = `translateX(-${n * slideWidth}%)`;
  
    // Update indicators
    indicators.forEach((el, i) => {
      if (i === n) {
        el.classList.remove('bg-white', 'opacity-50');
        el.classList.add('bg-yellow-400');
      } else {
        el.classList.remove('bg-yellow-400');
        el.classList.add('bg-white', 'opacity-50');
      }
    });
  }
  
  // Indicator click event
  indicators.forEach((el, i) => {
    el.addEventListener('click', () => showSlide(i));
  });
  
  // Auto slide
  setInterval(() => {
    current = (current + 1) % slideCount;
    showSlide(current);
  }, 3000);
  
  // Initial display
  showSlide(0);
// Category Section
// Newly Arrived Brands Section
// Trending Products Section
    // 下線
    document.querySelectorAll('.filter li').forEach(li => {
    li.addEventListener('click', function() {
      document.querySelectorAll('.filter li').forEach(e => {
        e.classList.remove('border-yellow-400', 'text-black', 'font-bold');
        e.classList.add('border-transparent', 'text-gray-400');
      });
      this.classList.add('border-yellow-400', 'text-black', 'font-bold');
      this.classList.remove('border-transparent', 'text-gray-400');
    });
    });
    // // Retrieve each filter tab (li) and the parent containers of the product cards
    const filterTabs = document.querySelectorAll('.filter li');
    const productCards = document.querySelectorAll('#Trending-Products-list > div');
    
    filterTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // タブの見た目切り替え
        filterTabs.forEach(t => {
          t.classList.remove('border-yellow-400', 'text-black', 'font-bold');
          t.classList.add('border-transparent', 'text-gray-400');
        });
        this.classList.add('border-yellow-400', 'text-black', 'font-bold');
        this.classList.remove('border-transparent', 'text-gray-400');
    
        // フィルター処理
        const filter = this.getAttribute('data-filter');
        productCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
// Top Offered Products
    // timer until midnight
    export function startMidnightCountdown() {
      const timeElem = document.getElementById('time');
      if (!timeElem) return;
    
      function updateTimer() {
        const now = new Date();
        const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
        const diffMs = midnight - now;
    
        if (diffMs > 0) {
          const totalSeconds = Math.floor(diffMs / 1000);
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;
    
          timeElem.textContent = `Expires In: ${hours.toString().padStart(2, '0')}hr : ${minutes.toString().padStart(2, '0')}min : ${seconds.toString().padStart(2, '0')}s`;
        } else {
          timeElem.textContent = `Expires In: 00hr : 00min : 00s`;
        }
      }
    
      updateTimer();
      setInterval(updateTimer, 1000);
    }
// Registration Section
    // Complete registration button
    document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default submission
  
    const email = this.elements['email'].value.trim();
    const pass = this.elements['password'].value.trim();
    const rep = this.elements['repeat'].value.trim();
  
    if(email && pass && rep) {
      // If all fields are filled in, redirect to success page
      window.location.href = '../../register-success.html';
    } else {
      alert('Please fill in all fields.');
    }
    });
// Best Selling Products Section
// Just Landed Items Section
// Latest Articles Section