import '../css/index.css';

export function initProductPage() {
  // --- カテゴリリスト ---
  const categories = [
    "Fruits & Veges",
    "Breads & Sweets",
    "Wine Drinks",
    "Oil & Ghee",
    "Raw Meat",
    "Natural Herbs",
    "Seafood",
    "Non-Alcoholic Drinks",
    "Seasonings",
    "Snacks & Confectionery",
    "Dairy Products"
  ];

  // --- 全商品生成 ---
  const totalProducts = 22044;
  const productsPerCategory = Math.floor(totalProducts / categories.length);
  const products = [];
  let id = 1;
  for (let c = 0; c < categories.length; c++) {
    for (let i = 0; i < productsPerCategory; i++) {
      products.push({
        id: id++,
        name: `${categories[c]} Product ${i + 1}`,
        category: categories[c],
        image: `https://placehold.co/200x200?text=${encodeURIComponent(categories[c].split(' ')[0])}+${i + 1}`
      });
    }
  }

  // --- URLからカテゴリ取得 ---
  function getQueryParam(name) {
    return new URLSearchParams(location.search).get(name);
  }

  // --- ページネーション ---
  const pageSize = 20;
  let selectedCategory = getQueryParam('category') || categories[0];
  let currentPage = parseInt(getQueryParam('page') || '1', 10);

  function renderCategoryButtons() {
    const cont = document.getElementById('category-buttons');
    if (!cont) return;
    cont.innerHTML = categories.map(cat =>
      `<button onclick="selectCategory('${cat}')" class="px-3 py-1 rounded-md ${cat === selectedCategory ? 'bg-blue-400 text-white' : 'bg-gray-200'}">${cat}</button>`
    ).join('');
  }

  function renderProducts() {
    // 必要なDOM要素がなければ何もしない
    const titleElem = document.getElementById('category-title');
    const grid = document.getElementById('product-list');
    const pager = document.getElementById('pager');
    const countElem = document.getElementById('products-count');
    if (!titleElem || !grid || !pager || !countElem) return;

    titleElem.textContent = selectedCategory;
    const filtered = products.filter(p => p.category === selectedCategory);
    const totalPages = Math.ceil(filtered.length / pageSize);
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;
    const start = (currentPage - 1) * pageSize;
    const pageProducts = filtered.slice(start, start + pageSize);
    grid.innerHTML = '';
    pageProducts.forEach(p => {
      grid.innerHTML += `
        <div class="bg-white rounded shadow p-2 flex flex-col items-center">
          <img src="${p.image}" alt="${p.name}" class="mb-2">
          <div class="font-bold text-center">${p.name}</div>
          <div class="text-xs text-gray-500">${p.category}</div>
        </div>
      `;
    });
    // ページ送り
    pager.innerHTML = '';
    if (totalPages > 1) {
      if (currentPage > 1) {
        pager.innerHTML += `<button onclick="goPage(${currentPage - 1})" class="px-2 py-1 bg-gray-200 rounded">Prev</button>`;
      }
      let min = Math.max(1, currentPage - 2), max = Math.min(totalPages, currentPage + 2);
      for (let i = min; i <= max; i++) {
        pager.innerHTML += `<button onclick="goPage(${i})" class="px-2 py-1 ${i === currentPage ? "bg-blue-400 text-white" : "bg-gray-200"} rounded mx-1">${i}</button>`;
      }
      if (currentPage < totalPages) {
        pager.innerHTML += `<button onclick="goPage(${currentPage + 1})" class="px-2 py-1 bg-gray-200 rounded">Next</button>`;
      }
    }
    countElem.textContent = `(${filtered.length} items)`;
  }

  window.goPage = function(page) {
    const params = new URLSearchParams(location.search);
    params.set('category', selectedCategory);
    params.set('page', page);
    location.search = params.toString();
  };

  window.selectCategory = function(cat) {
    selectedCategory = cat;
    currentPage = 1;
    const params = new URLSearchParams(location.search);
    params.set('category', cat);
    params.set('page', 1);
    location.search = params.toString();
  };

  renderCategoryButtons();
  renderProducts();

  // --- 検索サジェスト機能 ---
  const searchProducts = [
    // ...（省略：あなたのまま）...
    // Fruits & Veges
    ...Array.from({length: 100}, (_, i) => ({ name: `Tomato ${i+1}`, category: "Fruits & Veges" })),
    ...Array.from({length: 100}, (_, i) => ({ name: `Cucumber ${i+1}`, category: "Fruits & Veges" })),
    ...Array.from({length: 100}, (_, i) => ({ name: `Lettuce ${i+1}`, category: "Fruits & Veges" })),
    ...Array.from({length: 100}, (_, i) => ({ name: `Carrot ${i+1}`, category: "Fruits & Veges" })),
    ...Array.from({length: 100}, (_, i) => ({ name: `Potato ${i+1}`, category: "Fruits & Veges" })),
    ...Array.from({length: 100}, (_, i) => ({ name: `Onion ${i+1}`, category: "Fruits & Veges" })),
    ...Array.from({length: 100}, (_, i) => ({ name: `Spinach ${i+1}`, category: "Fruits & Veges" })),
    ...Array.from({length: 100}, (_, i) => ({ name: `Broccoli ${i+1}`, category: "Fruits & Veges" })),
    ...Array.from({length: 100}, (_, i) => ({ name: `Pepper ${i+1}`, category: "Fruits & Veges" })),
    ...Array.from({length: 100}, (_, i) => ({ name: `Eggplant ${i+1}`, category: "Fruits & Veges" })),
    // ...（以下略）...
  ];

  // 検索欄・候補リスト取得
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  if (searchInput && searchResults) {
    searchInput.addEventListener('input', function() {
      const value = this.value.trim().toLowerCase();
      searchResults.innerHTML = '';
      if (!value) {
        searchResults.classList.add('hidden');
        return;
      }
      const matched = searchProducts.filter(p => p.name.toLowerCase().includes(value)).slice(0, 10);
      if (matched.length === 0) {
        searchResults.classList.add('hidden');
        return;
      }
      matched.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="product.html?search=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.category)}" class="block px-2 py-1 hover:bg-gray-100">${product.name} <span class="text-xs text-gray-400">(${product.category})</span></a>`;
        searchResults.appendChild(li);
      });
      searchResults.classList.remove('hidden');
    });

    // 入力欄や候補からフォーカスが外れたら候補を隠す
    searchInput.addEventListener('blur', () => {
      setTimeout(() => { searchResults.classList.add('hidden'); }, 100);
    });

    // クリックで標準のaタグ遷移を使う
    searchResults.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (a) {
        searchResults.classList.add('hidden');
      }
    });

    // エンターでproduct.htmlに遷移（サジェスト選択と同じ動作にする）
    const searchForm = searchInput.closest('form');
    if (searchForm) {
      searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const value = searchInput.value.trim();
        if (value) {
          const hit = searchProducts.find(p => p.name.toLowerCase().includes(value.toLowerCase()));
          if (hit) {
            window.location.href = `product.html?search=${encodeURIComponent(hit.name)}&category=${encodeURIComponent(hit.category)}`;
          } else {
            window.location.href = `product.html?search=${encodeURIComponent(value)}`;
          }
        }
      });
    }
  }

  // slider
  // スライダー機能：.slider-sectionごとに独立して動作
  // 全ての.slider-sectionに対応する汎用スライダースクリプト
  document.querySelectorAll('section').forEach(section => {
    // それぞれのセクション内で該当するslider-listと左右ボタンを取得
    const sliderList = section.querySelector('.slider-list');
    const leftBtn = section.querySelector('.slider-left');
    const rightBtn = section.querySelector('.slider-right');
    if (!sliderList || !leftBtn || !rightBtn) return;
  
    // li要素または.product-li/.category-liクラスを拾う
    // ulならli, divなら.product-li
    const cards = sliderList.querySelectorAll('li, .product-li, .category-li');
    const cardCount = cards.length;
    // data-visible属性があれば、それを表示個数として使う。なければ5（md:5枚表示の想定）
    const visibleCount = Number(sliderList.dataset.visible) || 5;
    let currentIndex = 0;
  
    // gap値計算（Tailwindのgap-*, space-x-*対応）
    function getGap() {
      // columnGapがあればそれを使う
      const style = getComputedStyle(sliderList);
      let gap = parseFloat(style.columnGap || 0);
      // フォールバック: gapなしの場合はmargin-right
      if (!gap && cards.length > 1) {
        const mr = parseFloat(getComputedStyle(cards[0]).marginRight || 0);
        gap = mr;
      }
      return gap;
    }
  
    function updateSlider() {
      if (!cards.length) return;
      const card = cards[0];
      const cardWidth = card.offsetWidth;
      const gap = getGap();
      // 右端まで行きすぎないよう制御
      if (currentIndex > cardCount - visibleCount) currentIndex = cardCount - visibleCount;
      if (currentIndex < 0) currentIndex = 0;
      const offset = -((cardWidth + gap) * currentIndex);
      sliderList.style.transform = `translateX(${offset}px)`;
    }
  
    rightBtn.addEventListener('click', () => {
      if (currentIndex < cardCount - visibleCount) {
        currentIndex++;
        updateSlider();
      }
    });
  
    leftBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });
  
    window.addEventListener('resize', updateSlider);
  
    updateSlider();
  });
    //Product Showcase 
    // Newly Arrived Brands Section
    // Trending Products Section
    // Top Offered Products
    // Registration Section
    // Best Selling Products Section
    // Just Landed Items Section
    // Latest Articles Section
    // Product Showcase slider
}