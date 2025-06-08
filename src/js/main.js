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
  // --- 全商品生成（合計22,044個） ---
  const totalProducts = 22044;
  const productsPerCategory = Math.floor(totalProducts / categories.length); // 2004
  const products = [];
  let id = 1;
  for (let c = 0; c < categories.length; c++) {
    for (let i = 0; i < productsPerCategory; i++) {
      products.push({
        id: id,
        name: `${categories[c]} Product ${i + 1}`,
        category: categories[c],
        image: `https://placehold.co/200x200?text=${encodeURIComponent(categories[c].split(' ')[0])}+${i+1}`
      });
      id++;
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
    document.getElementById('category-title').textContent = selectedCategory;
    const filtered = products.filter(p => p.category === selectedCategory);
    const totalPages = Math.ceil(filtered.length / pageSize);
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;
    const start = (currentPage - 1) * pageSize;
    const pageProducts = filtered.slice(start, start + pageSize);
    const grid = document.getElementById('product-list');
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
    const pager = document.getElementById('pager');
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
    document.getElementById('products-count').textContent = `(${filtered.length} items)`;
  }

  window.goPage = function(page) {
    const params = new URLSearchParams(location.search);
    params.set('category', selectedCategory);
    params.set('page', page);
    location.search = params.toString();
  }

  window.selectCategory = function(cat) {
    selectedCategory = cat;
    currentPage = 1;
    const params = new URLSearchParams(location.search);
    params.set('category', cat);
    params.set('page', 1);
    location.search = params.toString();
  }

  renderCategoryButtons();
  renderProducts();
      // --- 検索サジェスト機能 ---
    // 商品リスト（カテゴリ情報もセットで持つ）
    const searchProducts = [
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
    
      // Breads & Sweets
      ...Array.from({length: 100}, (_, i) => ({ name: `White Bread ${i+1}`, category: "Breads & Sweets" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Croissant ${i+1}`, category: "Breads & Sweets" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Baguette ${i+1}`, category: "Breads & Sweets" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Donut ${i+1}`, category: "Breads & Sweets" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Muffin ${i+1}`, category: "Breads & Sweets" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Danish ${i+1}`, category: "Breads & Sweets" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Brioche ${i+1}`, category: "Breads & Sweets" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Roll Cake ${i+1}`, category: "Breads & Sweets" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Pound Cake ${i+1}`, category: "Breads & Sweets" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Scone ${i+1}`, category: "Breads & Sweets" })),
    
      // Wine Drinks
      ...Array.from({length: 100}, (_, i) => ({ name: `Red Wine ${i+1}`, category: "Wine Drinks" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `White Wine ${i+1}`, category: "Wine Drinks" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Rose Wine ${i+1}`, category: "Wine Drinks" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Sparkling Wine ${i+1}`, category: "Wine Drinks" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Port Wine ${i+1}`, category: "Wine Drinks" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Sherry ${i+1}`, category: "Wine Drinks" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Vermouth ${i+1}`, category: "Wine Drinks" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Sangria ${i+1}`, category: "Wine Drinks" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Mead ${i+1}`, category: "Wine Drinks" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Mulled Wine ${i+1}`, category: "Wine Drinks" })),
    
      // Oil & Ghee
      ...Array.from({length: 100}, (_, i) => ({ name: `Olive Oil ${i+1}`, category: "Oil & Ghee" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Sunflower Oil ${i+1}`, category: "Oil & Ghee" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Coconut Oil ${i+1}`, category: "Oil & Ghee" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Sesame Oil ${i+1}`, category: "Oil & Ghee" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Avocado Oil ${i+1}`, category: "Oil & Ghee" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Grapeseed Oil ${i+1}`, category: "Oil & Ghee" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Peanut Oil ${i+1}`, category: "Oil & Ghee" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Canola Oil ${i+1}`, category: "Oil & Ghee" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Butter Ghee ${i+1}`, category: "Oil & Ghee" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Clarified Butter ${i+1}`, category: "Oil & Ghee" })),
    
      // Raw Meat
      ...Array.from({length: 100}, (_, i) => ({ name: `Beef Steak ${i+1}`, category: "Raw Meat" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Chicken Breast ${i+1}`, category: "Raw Meat" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Pork Chop ${i+1}`, category: "Raw Meat" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Lamb Leg ${i+1}`, category: "Raw Meat" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Duck Breast ${i+1}`, category: "Raw Meat" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Turkey Thigh ${i+1}`, category: "Raw Meat" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Veal Cutlet ${i+1}`, category: "Raw Meat" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Goose Liver ${i+1}`, category: "Raw Meat" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Rabbit Meat ${i+1}`, category: "Raw Meat" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Venison ${i+1}`, category: "Raw Meat" })),
    
      // Natural Herbs
      ...Array.from({length: 100}, (_, i) => ({ name: `Basil ${i+1}`, category: "Natural Herbs" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Mint ${i+1}`, category: "Natural Herbs" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Rosemary ${i+1}`, category: "Natural Herbs" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Thyme ${i+1}`, category: "Natural Herbs" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Oregano ${i+1}`, category: "Natural Herbs" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Sage ${i+1}`, category: "Natural Herbs" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Dill ${i+1}`, category: "Natural Herbs" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Coriander ${i+1}`, category: "Natural Herbs" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Parsley ${i+1}`, category: "Natural Herbs" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Tarragon ${i+1}`, category: "Natural Herbs" })),
    
      // Seafood
      ...Array.from({length: 100}, (_, i) => ({ name: `Salmon ${i+1}`, category: "Seafood" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Tuna ${i+1}`, category: "Seafood" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Shrimp ${i+1}`, category: "Seafood" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Crab ${i+1}`, category: "Seafood" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Lobster ${i+1}`, category: "Seafood" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Scallop ${i+1}`, category: "Seafood" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Oyster ${i+1}`, category: "Seafood" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Mussel ${i+1}`, category: "Seafood" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Cod ${i+1}`, category: "Seafood" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Squid ${i+1}`, category: "Seafood" })),
    
      // Non-Alcoholic Drinks
      ...Array.from({length: 100}, (_, i) => ({ name: `Orange Juice ${i+1}`, category: "Non-Alcoholic Drinks" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Apple Juice ${i+1}`, category: "Non-Alcoholic Drinks" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Grape Juice ${i+1}`, category: "Non-Alcoholic Drinks" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Lemonade ${i+1}`, category: "Non-Alcoholic Drinks" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Iced Tea ${i+1}`, category: "Non-Alcoholic Drinks" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Cola ${i+1}`, category: "Non-Alcoholic Drinks" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Ginger Ale ${i+1}`, category: "Non-Alcoholic Drinks" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Mineral Water ${i+1}`, category: "Non-Alcoholic Drinks" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Tomato Juice ${i+1}`, category: "Non-Alcoholic Drinks" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Vegetable Juice ${i+1}`, category: "Non-Alcoholic Drinks" })),
    
      // Seasonings
      ...Array.from({length: 100}, (_, i) => ({ name: `Salt ${i+1}`, category: "Seasonings" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Pepper ${i+1}`, category: "Seasonings" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Soy Sauce ${i+1}`, category: "Seasonings" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Vinegar ${i+1}`, category: "Seasonings" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Mustard ${i+1}`, category: "Seasonings" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Ketchup ${i+1}`, category: "Seasonings" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Mayonnaise ${i+1}`, category: "Seasonings" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Chili Powder ${i+1}`, category: "Seasonings" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Curry Powder ${i+1}`, category: "Seasonings" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Garlic Powder ${i+1}`, category: "Seasonings" })),
    
      // Snacks & Confectionery
      ...Array.from({length: 100}, (_, i) => ({ name: `Potato Chips ${i+1}`, category: "Snacks & Confectionery" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Popcorn ${i+1}`, category: "Snacks & Confectionery" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Pretzel ${i+1}`, category: "Snacks & Confectionery" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Chocolate Bar ${i+1}`, category: "Snacks & Confectionery" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Gummy Candy ${i+1}`, category: "Snacks & Confectionery" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Marshmallow ${i+1}`, category: "Snacks & Confectionery" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Cookie ${i+1}`, category: "Snacks & Confectionery" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Biscuit ${i+1}`, category: "Snacks & Confectionery" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Rice Cracker ${i+1}`, category: "Snacks & Confectionery" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Fruit Snack ${i+1}`, category: "Snacks & Confectionery" })),
    
      // Dairy Products
      ...Array.from({length: 100}, (_, i) => ({ name: `Milk ${i+1}`, category: "Dairy Products" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Yogurt ${i+1}`, category: "Dairy Products" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Butter ${i+1}`, category: "Dairy Products" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Cheese ${i+1}`, category: "Dairy Products" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Cream ${i+1}`, category: "Dairy Products" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Sour Cream ${i+1}`, category: "Dairy Products" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Cottage Cheese ${i+1}`, category: "Dairy Products" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Ice Cream ${i+1}`, category: "Dairy Products" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Evaporated Milk ${i+1}`, category: "Dairy Products" })),
      ...Array.from({length: 100}, (_, i) => ({ name: `Condensed Milk ${i+1}`, category: "Dairy Products" })),
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
        setTimeout(()=>{ searchResults.classList.add('hidden'); }, 100);
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
            // 最初にヒットする商品のカテゴリを取得
            const hit = searchProducts.find(p => p.name.toLowerCase().includes(value.toLowerCase()));
            if (hit) {
              window.location.href = `product.html?search=${encodeURIComponent(hit.name)}&category=${encodeURIComponent(hit.category)}`;
            } else {
              // 該当しない場合はとりあえず全件検索に飛ばす等、お好みで
              window.location.href = `product.html?search=${encodeURIComponent(value)}`;
            }
          }
        });
      }
    }
    // slider
    const slider = document.getElementById('slider');
      console.log('slider:', slider); // これでnullならHTML構造やタイミングがおかしい
    const indicators = document.querySelectorAll('#indicators span');
    const slideCount = 3;
    let current = 0;
  
    function goToSlide(idx) {
      slider.style.transform = `translateX(-${idx * 100}%)`;
      indicators.forEach((el, i) => {
        el.classList.toggle('bg-yellow-400', i === idx);
        el.classList.toggle('bg-white', i !== idx);
        el.classList.toggle('opacity-50', i !== idx);
      });
    }
  
    setInterval(() => {
      current = (current + 1) % slideCount;
      goToSlide(current);
    }, 3000);
  
    // 初期表示
    goToSlide(current);
}