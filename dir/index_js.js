// 回頂部
document.getElementById('logo').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 平滑滾動
    });
});

function setActiveSortButton(button) {
    document.querySelectorAll('.sort button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

// 在排序按鈕中調用：
document.querySelectorAll('.sort button').forEach(button => {
    
    button.addEventListener('click', () => setActiveSortButton(button));
});

function removelight() {
    const light = document.querySelectorAll('.sort button');
    light.forEach(button => {
        button.classList.remove('active'); // 對每個按鈕移除 active 類別
    });
}
let products = []; // 用來儲存所有商品資料
let currentRenderedProducts = []; // 用來儲存選擇的商品
let cartItems = []; // 用來儲存購物車商品
let sortedProducts = []; // 存儲排序後的商品

// 從 JSON 文件讀取商品資料
fetch('https://raw.githubusercontent.com/GodYanGX724/pets-sales-project/main/dir/products.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('無法載入 JSON 文件');
        }
        return response.json();
    })
    .then(data => {
        products = data; // 儲存資料
        sortCurrentRenderedProducts('new', 'desc'); // 預設以新品排序
        initPagination(); // 初始化分頁
    })
    .catch(error => {
        console.error(error);
    });

// 渲染商品
function renderProducts(productList) {

    const grid = document.getElementById("product-grid");
    grid.innerHTML = ""; // 清空現有商品
    const fragment = document.createDocumentFragment(); // 建立 DocumentFragment
    // 優化前
    //     productList.forEach((product, index) => {
    //         const productCard = `
    //     <div class="product-card">
    //         <div class="product-image">
    //             <img src="${product.image}" alt="${product.name}">
    //         </div>
    //         <div class="product-info">
    //             <h3>${product.name}</h3>
    //             <p>NT$${product.price}</p>
    //             <p>評價：${product.rating}</p>
    //             <button class="add-to-cart" data-index="${index}">加入購物車</button>
    //         </div>
    //     </div>
    // `;
    //         grid.innerHTML += productCard;
    //     });
    // 優化後
    productList.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>NT$${product.price}</p>
            <p>評價：${product.rating}</p>
            <button class="add-to-cart" data-index="${productList.indexOf(product)}">加入購物車</button>
        </div>
    `;
        fragment.appendChild(div); // 將元素加到 Fragment
    });

    grid.appendChild(fragment); // 一次性插入 DOM

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index'); // 取得按鈕對應的商品索引
            addToCart(productList[index]); // 加入購物車
        });
    });
}

// 商品排序
function sortProducts(key, order) {
    // currentRenderedProducts = products;
    const sortedProducts = [...products].sort((a, b) => {
        if (order === 'asc') {
            return a[key] - b[key];
        } else {
            return b[key] - a[key];
        }
    });
    removelight();
    currentRenderedProducts = sortedProducts;
    renderPaginatedProducts(sortedProducts); // 渲染排序後的商品
}
// 排序商品並渲染
function sortCurrentRenderedProducts(key, order) {
    if (currentRenderedProducts.length === 0) {
        // 如果目前沒有篩選商品，使用完整商品清單
        currentRenderedProducts = [...products];
    }

    // 對目前的商品清單進行排序
    currentRenderedProducts = [...currentRenderedProducts].sort((a, b) => {
        if (order === 'asc') {
            return a[key] - b[key];
        } else {
            return b[key] - a[key];
        }
    });

    // 清空排序結果，避免影響後續操作
    sortedProducts = [];

    // 重新渲染分頁商品
    resetPagination();
}

// 篩選商品
function filterProducts(category) {
    removelight();
    const filteredProducts = products.filter(product => product.category === category);
    currentRenderedProducts = filteredProducts; // 更新目前渲染的商品清單
    sortedProducts = []; // 清空排序結果
    currentPage = 1; // 重置到第一頁
    renderPaginatedProducts(currentRenderedProducts); // 渲染篩選後的分頁
}

// 聯絡表單顯示
function toggleContactForm() {
    const contactForm = document.getElementById("contact-form");
    if (contactForm.style.display === "none" || contactForm.style.display === "") {
        contactForm.style.display = "block"; // 顯示表單
        cart.style.display = "none";
    } else {
        contactForm.style.display = "none"; // 隱藏表單
    }
}

// 表單
const contact = document.getElementById('contact-form');

// 會員登錄顯示
const modal = document.getElementById('id01');
const loginButton = document.getElementById('login-btn');
const closeButton = document.querySelector('.closebtn');
const cancelButton = document.querySelector('.cancelbtn');

// 顯示模態框
loginButton.addEventListener('click', () => {
    modal.style.display = 'block';
    contact.style.display = "none"; // 隱藏表單
    cart.style.display = "none"; //隱藏購物車
});

// 隱藏模態框（點擊關閉按鈕）
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// 隱藏模態框（點擊取消按鈕）
cancelButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// 點擊模態框外部隱藏模態框
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// 加入購物車
function addToCart(product) {
    const existingProduct = cartItems.find(item => item.name === product.name); // 查找購物車中是否已存在該商品

    if (existingProduct) {
        existingProduct.quantity += 1; // 如果已存在，數量加1
    } else {
        cartItems.push({ ...product, quantity: 1 }); // 如果不存在，新增商品並設置數量為1
    }
    renderCart(); // 更新購物車內容
}

// 從 localStorage 載入購物車內容
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
        cartItems = JSON.parse(storedCart);
    } else {
        cartItems = [];
    }
}

// 在頁面載入時從 localStorage 載入購物車
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();
    renderCart(); // 使用載入的資料渲染購物車
});

// 渲染購物車內容
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    cartItemsContainer.innerHTML = ""; // 清空購物車內容

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>目前購物車為空</p>';
        cartTotalElement.textContent = "總價格：NT$0"; // 清空總價格
        return;
    }

    let cartHTML = "";
    let totalPrice = 0; // 初始化總價格

    cartItems.forEach((item, index) => {
        cartHTML += `
            <div class="cart-item">
                <img class="cart-itemphoto" src="${item.image}" alt="${item.name}">
                <span>${item.name} - NT$${item.price}  
                <span class="cartnumbercontrol"> x
                <button class="decrease-quantity" data-index="${index}">-</button>
                ${item.quantity}
                <button class="increase-quantity" data-index="${index}">+</button>
                </span>
                </span>
                <button class="remove-item" data-index="${index}">移除</button>  
            </div>
            <br>
        `;
        // 計算總價格
        totalPrice += item.price * item.quantity;
    });

    // 將內容一次性插入 DOM
    cartItemsContainer.innerHTML = cartHTML;


    // 更新總價格
    cartTotalElement.textContent = `總價格：NT$${totalPrice}`;

    bindCartButtons();//按鈕綁定
    saveCartToLocalStorage(); // 儲存更新後的購物車內容到 localStorage

}


// 按鈕綁定
function bindCartButtons() {
    // 綁定移除按鈕
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            cartItems.splice(index, 1);
            saveCartToLocalStorage(); // 儲存更新後的購物車
            renderCart();// 更新購物車內容
        });
    });
    // 綁定增加按鈕
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            cartItems[index].quantity += 1;
            saveCartToLocalStorage(); // 儲存更新後的購物車
            renderCart(); // 更新購物車內容
        });
    });
    // 綁定減少按鈕
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity -= 1; // 減少數量
            } else {
                cartItems.splice(index, 1); // 如果數量為1，移除商品
            }
            saveCartToLocalStorage(); // 儲存更新後的購物車
            renderCart(); // 更新購物車內容
        });
    });
}


// 清空購物車
document.getElementById('clear-cart').addEventListener('click', () => {
    cartItems = [];
    saveCartToLocalStorage(); // 儲存更新後的購物車
    renderCart();
});

// 購物車顯示/隱藏
const cart = document.getElementById('cart'); // 購物車詳細內容區域
const cartButton = document.querySelector('.cart-icon'); // 購物車按鈕

cartButton.addEventListener('click', () => {
    // 切換購物車區域顯示/隱藏
    cart.style.display = cart.style.display === 'block' ? 'none' : 'block';
    contact.style.display = "none";
});



// 登陸表單提交
document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("表單提交");

    alert('已登錄！');
    modal.style.display = 'none';
});

// 聯絡表單提交
document.getElementById('contact-form').addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("表單提交");

    alert('已送出！');
    contact.style.display = 'none';
});

// 商品分頁
let currentPage = 1; // 當前頁面
const itemsPerPage = 5 * 4; // 每頁5行，每行4個商品（根據你的畫面設計調整）

// 渲染分頁商品
function renderPaginatedProducts(productList) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = productList.slice(startIndex, endIndex);

    renderProducts(paginatedProducts); // 渲染商品
    renderPaginationControls(productList.length); // 更新分頁按鈕
}

// 渲染分頁按鈕
function renderPaginationControls(totalItems) {
    const paginationContainer = document.getElementById('pagination-controls');
    paginationContainer.innerHTML = ""; // 清空按鈕

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    let paginationHTML = ""; // 儲存分頁按鈕 HTML

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <button class="pagination-button ${i === currentPage ? 'active' : ''}" data-page="${i}">
                ${i}
            </button>
        `;
    }
    paginationContainer.innerHTML = paginationHTML; // 一次性插入
    bindPaginationEvents(); // 綁定分頁按鈕事件
}

// 分頁按鈕事件
function bindPaginationEvents() {
    document.querySelectorAll('.pagination-button').forEach(button => {
        button.addEventListener('click', (event) => {
            currentPage = parseInt(event.target.getAttribute('data-page'));
            renderPaginatedProducts(currentRenderedProducts);
        });
    });
}

// 回頂部
document.getElementById('To-Top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 平滑滾動
    });
});


// 初始化分頁
function initPagination() {
    currentPage = 1; // 預設顯示第一頁
    renderPaginatedProducts(currentRenderedProducts);
}

// 重置分頁
function resetPagination() {
    currentPage = 1; // 重置到第一頁
    renderPaginatedProducts(currentRenderedProducts); // 渲染排序後的商品
}


// 預設加載分頁
initPagination();

// 將購物車內容儲存到 localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}


// 搜尋
document.getElementById('search-icon').addEventListener('click', () => {
    const searchQuery = document.getElementById('forsearch').value.trim().toLowerCase(); // 取得搜尋關鍵字並轉為小寫
    if (!searchQuery) {
        alert('請輸入搜尋內容');
        return;
    }

    executeSearch(searchQuery); // 執行搜尋功能
});

// 選取所有快速關鍵字
const quickLinks = document.querySelectorAll('.quick-links .keywords');

// 為每個關鍵字綁定點擊事件
quickLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // 阻止默認的跳轉行為
        const keyword = event.target.textContent.trim(); // 獲取關鍵字的文字
        document.getElementById('forsearch').value = keyword; // 將文字填入搜尋框
        executeSearch(keyword); // 執行搜尋功能
    });
});

// 搜尋功能
function executeSearch(searchQuery) {
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredProducts.length > 0) {
        currentRenderedProducts = filteredProducts; // 更新目前渲染的商品
        renderPaginatedProducts(currentRenderedProducts); // 渲染符合條件的商品
    } else {
        alert('未找到相關商品');
    }
}

// 1200px-768px
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const closeMenu = document.getElementById('close-menu');

    // 打開摺疊菜單
    menuToggle.addEventListener('click', () => {
        sidebarMenu.classList.add('open');
    });

    // 關閉摺疊菜單
    closeMenu.addEventListener('click', () => {
        sidebarMenu.classList.remove('open');
    });

    // 點擊菜單外部關閉菜單
    document.addEventListener('click', (event) => {
        // 如果點擊的目標不是摺疊菜單，也不是三條線按鈕，則關閉
        if (!sidebarMenu.contains(event.target) && !menuToggle.contains(event.target) && !cart.contains(event.target) && !contact.contains(event.target) && !modal.contains(event.target)) {
            sidebarMenu.classList.remove('open');
        }
    });

    // 阻止點擊摺疊菜單內部的事件冒泡到 document
    sidebarMenu.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // 綁定購物車按鈕
    const cartButton = document.getElementById('cart-button');
    const closecartButton = document.getElementById('close-cart');
    const cart = document.getElementById('cart'); // 原有購物車內容

    cartButton.addEventListener('click', () => {
        cart.style.display = cart.style.display === 'block' ? 'none' : 'block'; // 顯示或隱藏購物車
        contactForm.style.display = "none";
        sidebarMenu.classList.remove('open');
    });
    closecartButton.addEventListener('click', () => {
        cart.style.display = "none";
    })
    
    // 綁定聯絡我們按鈕
    const contactButton = document.getElementById('contact-button');
    const contactForm = document.getElementById('contact-form'); // 原有聯絡我們表單
    
    contactButton.addEventListener('click', () => {
        contactForm.style.display = contactForm.style.display === 'block' ? 'none' : 'block'; // 顯示或隱藏聯絡表單
        cart.style.display = "none";
        sidebarMenu.classList.remove('open');
    });
    
    // 綁定會員按鈕
    const memberButton = document.getElementById('member-button');
    const modal = document.getElementById('id01'); // 原有會員模態框
    
    memberButton.addEventListener('click', () => {
        modal.style.display = modal.style.display === 'block' ? 'none' : 'block'; // 顯示會員模態框
        cart.style.display = "none";
        contactForm.style.display = "none";
        sidebarMenu.classList.remove('open');
    });
    

    // 展開摺疊菜單
    const submenutoggle1 = document.getElementById("submenu-toggle1");
    const submenu1 = document.getElementById("submenu1");
    
    submenutoggle1.addEventListener('click', () =>{        
        submenu1.classList.toggle('open');
        submenutoggle1.textContent = submenutoggle1.textContent === '活動導覽 ▶︎' ? '活動導覽 ▼' : '活動導覽 ▶︎';
    })
    
    const submenutoggle2 = document.getElementById("submenu-toggle2");
    const submenu2 = document.getElementById("submenu2");
    
    submenutoggle2.addEventListener('click', () =>{        
        submenu2.classList.toggle('open1');
        submenutoggle2.textContent = submenutoggle2.textContent === '商品分類 ▶︎' ? '商品分類 ▼' : '商品分類 ▶︎';
    })
    
});

const searchbutton = document.getElementById("search-button");
const closesearch = document.getElementById("close-search");
const searchall = document.getElementById("search-all");
const forsearch = document.getElementById("forsearch");
const logo = document.getElementById("logo");

searchbutton.addEventListener('click', () => {
    searchall.style.display = "block";
    if (window.innerWidth <= 768) {
        searchall.style.left = "50px";
    } else {
        searchall.style.left = "119px";
    }
    logo.style.display =  "none";
    closesearch.style.display = "block";
    searchbutton.style.display = "none";
})

closesearch.addEventListener('click', () => {
    searchall.style.display = "none";
    searchbutton.style.display = "block";
    logo.style.display =  "block";
    closesearch.style.display = "none";
})

