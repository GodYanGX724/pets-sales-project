// 讀取localstorage
document.addEventListener('DOMContentLoaded', () => {
    loadCheckoutItems();
    console.log("load");

});

// 聯絡表單顯示
function toggleContactForm() {
    const contactForm = document.getElementById("contact-form");
    if (contactForm.style.display === "none" || contactForm.style.display === "") {
        contactForm.style.display = "block"; // 顯示表單
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
// 購物車顯示/隱藏
const cart = document.getElementById('cart'); // 購物車詳細內容區域
const cartButton = document.querySelector('.cart-icon'); // 購物車按鈕

cartButton.addEventListener('click', () => {
    // 切換購物車區域顯示/隱藏
    cart.style.display = cart.style.display === 'block' ? 'none' : 'block';
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

let shoppingcart = 0;
// 加载購物清單
function loadCheckoutItems() {
    const checkoutContainer = document.getElementById('checkout-items');
    const totalContainer = document.getElementById('checkout-total');
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];

    let totalPrice = 0;
    checkoutContainer.innerHTML = '';

    if (storedCart.length === 0) {
        checkoutContainer.innerHTML = '<p class="text-center">購物車是空的。</p>';
        totalContainer.textContent = '總金額：NT$0';
        shoppingcart = 1;
        return;
    }
    //一段margin:175.333px 行高50px 字高:68.23
    storedCart.forEach(item => {
        const itemHTML = `
            <div class="checkout-item">
               <span class="checkout-total"><img src="../${item.image}" alt="${item.name}">
                <strong>${item.name}</strong></span>
                <span class="checkout-quantity"> ${item.quantity}</span>
                <span class="checkout-price">NT$${item.price * item.quantity}</span>
            </div>
            <hr>
        `;
        totalPrice += item.price * item.quantity;
        checkoutContainer.innerHTML += itemHTML;
    });

    totalContainer.textContent = `總金額：NT$${totalPrice}`;
}


// // 運送資訊

// const trans1 = document.getElementById("trans1");//宅配圓圈      
// const checktrans1 = document.getElementById("check-trans1");//宅配勾勾
// const trans2 = document.getElementById("trans2");//超商圓圈
// const checktrans2 = document.getElementById("check-trans2");//超商勾勾
// const home = document.getElementById("home");
// const store = document.getElementById("7-11");
// let homestatus = 0;//宅配到府狀態
// let storetatus = 0;//超商取貨狀態
// const pickstore = document.getElementById("store");
// const pay = document.getElementById("select-payment");//付款方式
// const pay1 = document.getElementById("pay1")//貨到付款
// const checkpay1 = document.getElementById("check-pay1")
// const pay2 = document.getElementById("pay2")//超商貨到付款
// const checkpay2 = document.getElementById("check-pay2")
// const pay3 = document.getElementById("pay3")//線上刷卡
// const checkpay3 = document.getElementById("check-pay3")
// const homepay = document.getElementById("homepay");
// const storepay = document.getElementById("storepay");
// const creditpay = document.getElementById("creditpay");
// let homepaystatus = 0;//取貨付款狀態
// let storepaystatus = 0;//超商取貨付款狀態
// let creditpaystatus = 0;//線上刷卡狀態
// const creditpayment = document.getElementById("payment-info");//刷卡資訊
// const address = document.getElementById("add");//宅配地址
// // 取貨方式
// home.addEventListener('click', () => {
//     if (homestatus == 0 || storetatus == 1) {
//         trans1.style.display = "none";
//         checktrans1.style.display = "inline";
//         trans2.style.display = "inline";
//         checktrans2.style.display = "none";
//         homestatus = 1;
//         storetatus = 0;
//         pay.style.display = "block";
//         storepay.style.display = "none";
//         homepay.style.display = "inline";
//         home.style.color = "red"
//         store.style.color = "black"
//         address.style.display = "block";
//     }
//     // trans1.style.display = trans1.style.display === "none" ? "inline" : "none";
// })

// store.addEventListener('click', () => {
//     if (homestatus == 1 || storetatus == 0) {
//         trans2.style.display = "none";
//         checktrans2.style.display = "inline";
//         trans1.style.display = "inline-block";
//         checktrans1.style.display = "none";
//         homestatus = 0;
//         storetatus = 1;
//         pay.style.display = "block";
//         storepay.style.display = "inline";
//         homepay.style.display = "none";
//         home.style.color = "black"
//         store.style.color = "red"
//         pickstore.style.display = "block";
//         address.style.display = "none";
//     }
// })

// // 付款方式
// homepay.addEventListener('click', () => {
//     if (homepaystatus == 0 || creditpaystatus == 1) {
//         pay1.style.display = "none";
//         checkpay1.style.display = "inline";
//         pay3.style.display = "inline";
//         checkpay3.style.display = "none";
//         homepaystatus = 1;
//         creditpaystatus = 0;
//         homepay.style.color = "red"
//         creditpay.style.color = "black"
//         creditpayment.style.display = "none";
//     }
// })
// storepay.addEventListener('click', () => {
//     if (storepaystatus == 0 || creditpaystatus == 1) {
//         pay2.style.display = "none";
//         checkpay2.style.display = "inline";
//         pay3.style.display = "inline";
//         checkpay3.style.display = "none";
//         homepaystatus = 0;
//         storepaystatus = 1;
//         creditpaystatus = 0;
//         storepay.style.color = "red"
//         creditpay.style.color = "black"
//         creditpayment.style.display = "none";
//     }
// })
// creditpay.addEventListener('click', () => {
//     if (homepaystatus == 1 || storepaystatus == 1 || creditpaystatus == 0) {
//         pay3.style.display = "none";
//         checkpay3.style.display = "inline";
//         pay1.style.display = "inline";
//         checkpay1.style.display = "none";
//         pay2.style.display = "inline";
//         checkpay2.style.display = "none";
//         homepaystatus = 0;
//         storepaystatus = 0;
//         creditpaystatus = 1;
//         homepay.style.color = "black"
//         storepay.style.color = "black"
//         creditpay.style.color = "red";
//         creditpayment.style.display = "block";


//     }
// })



const expiryDateInput = document.getElementById('expiry-date');

expiryDateInput.addEventListener('input', () => {
    let value = expiryDateInput.value;

    // 檢查是否已經有 '/'，避免重複插入
    if (value.length > 2 && !value.includes('/')) {
        value = value.slice(0, 2) + '/';
        // 在第二個字符後插入 '/'
    }
    expiryDateInput.value = value;
});

// // 發票
// const company1 = document.getElementById("recipe1");
// const checkcompany1 = document.getElementById("check-recipe1");
// const personal1 = document.getElementById("recipe2");
// const checkpersonal1 = document.getElementById("check-recipe2");
// const donate1 = document.getElementById("recipe3");
// const checkdonate1 = document.getElementById("check-recipe3");
// const company = document.getElementById("company");
// const personal = document.getElementById("personal");
// const donate = document.getElementById("donate");
// let companystatus = 0;
// let personalstatus = 0;
// let donatestatus = 0;
// const companydetail = document.getElementById("company-detail");
// const personaldetail = document.getElementById("personal-detail");
// const donatedetail = document.getElementById("donate-detail");

// company.addEventListener('click', () => {
//     if (companystatus == 0 || personalstatus == 1 || donatestatus == 1) {
//         company1.style.display = "none";
//         checkcompany1.style.display = "inline";
//         personal1.style.display = "inline";
//         checkpersonal1.style.display = "none";
//         donate1.style.display = "inline";
//         checkdonate1.style.display = "none";
//         companystatus = 1;
//         personalstatus = 0;
//         donatestatus = 0;
//         companydetail.style.display = "block";
//         personaldetail.style.display = "none";
//         donatedetail.style.display = "none";
//     }
// })
// personal.addEventListener('click', () => {
//     if (companystatus == 1 || personalstatus == 0 || donatestatus == 1) {
//         company1.style.display = "inline";
//         checkcompany1.style.display = "none";
//         personal1.style.display = "none";
//         checkpersonal1.style.display = "inline";
//         donate1.style.display = "inline";
//         checkdonate1.style.display = "none";
//         companystatus = 0;
//         personalstatus = 1;
//         donatestatus = 0;
//         companydetail.style.display = "none";
//         donatedetail.style.display = "none";
//         personaldetail.style.display = "block";
//     }
// })
// donate.addEventListener('click', () => {
//     if (companystatus == 1 || personalstatus == 1 || donatestatus == 0) {
//         company1.style.display = "inline";
//         checkcompany1.style.display = "none";
//         personal1.style.display = "inline";
//         checkpersonal1.style.display = "none";
//         donate1.style.display = "none";
//         checkdonate1.style.display = "inline";
//         companystatus = 0;
//         personalstatus = 0;
//         donatestatus = 1;
//         companydetail.style.display = "none";
//         personaldetail.style.display = "none";
//         donatedetail.style.display = "block";
//     }
// })

// 統一狀態管理
const state = {
    shipping: null, // 'home' or '7-11'
    payment: null,  // 'homepay', 'storepay', or 'creditpay'
    recipe: null,  // 'company', 'personal', or 'donate'
};

// 更新狀態的通用函數
function updateState(type, value) {
    state[type] = value;
    console.log(`Updated ${type}: ${value}`);
}

// 使用通用函數更新 運送方式UI
function handleShippingClick(type) {
    updateState('shipping', type);
    document.getElementById('home').style.color = type === 'home' ? 'red' : 'black';
    document.getElementById('7-11').style.color = type === 'store' ? 'red' : 'black';
    document.getElementById('add').style.display = type === 'home' ? 'block' : 'none';
    document.getElementById('store').style.display = type === 'store' ? 'block' : 'none';
    document.getElementById('trans1').style.display = type === 'home' ? 'none' : 'inline';
    document.getElementById('check-trans1').style.display = type === 'home' ? 'inline' : 'none';
    document.getElementById('trans2').style.display = type === 'store' ? 'none' : 'inline';
    document.getElementById('check-trans2').style.display = type === 'store' ? 'inline' : 'none';
    document.getElementById('select-payment').style.display = "block";
    document.getElementById('storepay').style.display = type === 'store' ? 'inline' : 'none';
    document.getElementById('homepay').style.display = type === 'home' ? 'inline' : 'none';
}

// 運送方式觸發函式
document.getElementById('home').addEventListener('click', () => handleShippingClick('home'));
document.getElementById('7-11').addEventListener('click', () => handleShippingClick('store'));

// 簡化付款方式處理
function handlePaymentClick(type) {
    updateState('payment', type);
    const types = ['homepay', 'storepay', 'creditpay'];
    types.forEach(id => {
        document.getElementById(id).style.color = id === type ? 'red' : 'black';
    });
    document.getElementById('pay1').style.display = type === 'homepay' ? 'none' : 'inline';
    document.getElementById('check-pay1').style.display = type === 'homepay' ? 'inline' : 'none';
    document.getElementById('pay2').style.display = type === 'storepay' ? 'none' : 'inline';
    document.getElementById('check-pay2').style.display = type === 'storepay' ? 'inline' : 'none';
    document.getElementById('pay3').style.display = type === 'creditpay' ? 'none' : 'inline';
    document.getElementById('check-pay3').style.display = type === 'creditpay' ? 'inline' : 'none';
    document.getElementById('payment-info').style.display = type === 'creditpay' ? 'block' : 'none';
}

// 付款方式觸發函式
document.getElementById('homepay').addEventListener('click', () => handlePaymentClick('homepay'));
document.getElementById('storepay').addEventListener('click', () => handlePaymentClick('storepay'));
document.getElementById('creditpay').addEventListener('click', () => handlePaymentClick('creditpay'));

// 簡化發票處理
function handleRecipeClick(type) {
    updateState('recipe', type);
    const types = ['company', 'personal', 'donate'];
    types.forEach(id => {
        document.getElementById(id).style.color = id === type ? 'red' : 'black';
    });
    document.getElementById('recipe1').style.display = type === 'company' ? 'none' : 'inline';
    document.getElementById('check-recipe1').style.display = type === 'company' ? 'inline' : 'none';
    document.getElementById('recipe2').style.display = type === 'personal' ? 'none' : 'inline';
    document.getElementById('check-recipe2').style.display = type === 'personal' ? 'inline' : 'none';
    document.getElementById('recipe3').style.display = type === 'donate' ? 'none' : 'inline';
    document.getElementById('check-recipe3').style.display = type === 'donate' ? 'inline' : 'none';
    document.getElementById('company-detail').style.display = type === 'company' ? 'block' : 'none';
    document.getElementById('personal-detail').style.display = type === 'personal' ? 'block' : 'none';
    document.getElementById('donate-detail').style.display = type === 'donate' ? 'block' : 'none';
}

// 發票觸發函式
document.getElementById('company').addEventListener('click', () => handleRecipeClick('company'));
document.getElementById('personal').addEventListener('click', () => handleRecipeClick('personal'));
document.getElementById('donate').addEventListener('click', () => handleRecipeClick('donate'));



// 載具自動切換大寫
const upper = document.getElementById("personal-recipe");

upper.addEventListener("input", (event) => {
    event.target.value = event.target.value.toUpperCase();
})


// // 假提交提示
const checkout = document.getElementById("final-checkout-button");
const buyername = document.getElementById("buyer-name");
const buyertel = document.getElementById("buyer-tel");
const telError = document.getElementById('tel-error');
const buyermail = document.getElementById("buyer-mail");
const emailError = document.getElementById("email-error")
const pickername = document.getElementById("picker-name");
const pickertel = document.getElementById("picker-tel");
const telError1 = document.getElementById('tel-error1');
const pickermail = document.getElementById("picker-mail");
const country = document.getElementById("country");
const place = document.getElementById("place");
const addres = document.getElementById("address");
const cardname = document.getElementById("cardholder-name");
const cardnumber = document.getElementById("card-number");
const carderror = document.getElementById("card-error");
const expirydate = document.getElementById("expiry-date");
const dateerror = document.getElementById("date-error");
const cvv = document.getElementById("cvv");
const cvverror = document.getElementById("cvv-error");
const companynumber = document.getElementById("company-number");
const companyname = document.getElementById("company-name");
const personalrecipe = document.getElementById("personal-recipe");
const donatenumber = document.getElementById("donate-number");

//  function nono() {
//     alert("請填寫所有必填項目")
// }

// function check() {
//     if ((homestatus == 0 && storetatus == 0) || (homepaystatus == 0 && storepaystatus == 0 && creditpaystatus == 0) || (companystatus == 0 && personalstatus == 0 && donatestatus == 0)) {
//         return 0
//     }
//     if (homestatus == 1) {
//         if (country.value.trim() === "" || place.value.trim() === "" || addres.value.trim() === "") {
//             return 0;
//         }
//     }
//     if (creditpaystatus == 1) {
//         if (cardname.value.trim() === "" || cardnumber.value.trim() === "" || expirydate.value.trim() === "" || cvv.value.trim() === "") {
//             return 0;
//         }
//     }
//     if (companystatus == 1) {
//         if (companynumber.value.trim() === "" || companyname.value.trim() === "") {
//             return 0;
//         }
//     }
//     if (personalstatus == 1) {
//         if (personalrecipe.value.trim() === "") {
//             return 0;
//         }
//     }
//     if (donatestatus == 1) {
//         if (donatenumber.value.trim() === "") {
//             return 0;
//         }
//     }
// }
let correct = 0;
cardnumber.addEventListener('input', () =>{
    const value = cardnumber.value;

    if (!/^\d{16}$/.test(value)) {
        // 當格式不正確時，顯示錯誤訊息
        carderror.style.display = 'inline';
        cardnumber.style.border = '1px solid red';
        correct = 1;
    }   else {
        carderror.style.display = 'none';
        cardnumber.style.border = 'none';
        correct = 0;
    }
})

expirydate.addEventListener('input', () =>{
    const value = expirydate.value;
    
    if (!/^\d{2}\/\d{2}$/.test(value)) {
        // 當格式不正確時，顯示錯誤訊息
        dateerror.style.display = 'inline';
        expirydate.style.border = '1px solid red';
        correct = 1;
    }   else {
        dateerror.style.display = 'none';
        expirydate.style.border = 'none';
        correct = 0;
    }
})

cvv.addEventListener('input', () =>{
    const value = cvv.value;
    
    if (!/^\d{3}$/.test(value)) {
        // 當格式不正確時，顯示錯誤訊息
        cvverror.style.display = 'inline';
        cvv.style.border = '1px solid red';
        correct = 1;
    }   else {
        cvverror.style.display = 'none';
        cvv.style.border = 'none';
        correct = 0;
    }
})

buyertel.addEventListener('input', () =>{
    const value = buyertel.value;
    
    if (!/^\d{10}$/.test(value)) {
        // 當格式不正確時，顯示錯誤訊息
        telError.style.display = 'inline';
        buyertel.style.border = '1px solid red';
        correct = 1;
    }   else {
        telError.style.display = 'none';
        buyertel.style.border = 'none';
        correct = 0;
    }
})

pickertel.addEventListener('input', () =>{
    const value = pickertel.value;
    
    if (!/^\d{10}$/.test(value)) {
        // 當格式不正確時，顯示錯誤訊息
        telError1.style.display = 'inline';
        pickertel.style.border = '1px solid red';
        correct = 1;
    }   else {
        telError1.style.display = 'none';
        pickertel.style.border = 'none';
        correct = 0;
    }
})

buyermail.addEventListener('input', () => {
    const value = buyermail.value;
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        emailError.style.display = 'inline';
        buyermail.style.border = '1px solid red'
        correct = 1;
    } else {
        emailError.style.display = 'none';
        buyermail.style.border = 'none';
        correct = 0;
    }
});


function validateForm() {
    // 檢測是否選擇運送方式
    if (!state.shipping) {
        alert("請選擇運送方式");
        return false;
    }
    
    // 檢測是否選擇付款方式
    if (!state.payment) {
        alert("請選擇付款方式");
        return false;
    }
    // 檢測購買人與收件人基本信息
    const requiredFields = [
        buyername, buyertel, buyermail,
        pickername, pickertel
    ];
    
    // 如果是宅配，地址必填
    if (state.shipping === 'home') {
        requiredFields.push(country, place, addres);
    }

    // 如果是信用卡付款，檢測信用卡資料
    if (state.payment === 'creditpay') {
        requiredFields.push(cardname, cardnumber, expirydate, cvv);
    }

    // 如果選擇公司發票，檢測公司資訊
    if (state.recipe === 'company') {
        requiredFields.push(companynumber, companyname);
    }

    // 如果選擇個人載具，檢測載具條碼
    if (state.recipe === 'personal') {
        requiredFields.push(personalrecipe);
    }

    // 如果選擇捐贈發票，檢測捐贈碼
    if (state.recipe === 'donate') {
        requiredFields.push(donatenumber);
    }

    // 檢測每個必填欄位是否填寫
    for (const field of requiredFields) {
        if (!field.value.trim()) {
            alert(`請填寫 ${field.placeholder || field.id}`);
            field.focus();
            return false;
        }

        if (field.style.border === '1px solid red') {
            alert("請檢查輸入資料格式是否正確");
            field.focus();
            return false;
        }
        
    }


    // 檢測是否選擇發票方式
    if (!state.recipe) {
        alert("請選擇發票方式");
        return false;
    }

    return true; // 檢測通過
}

function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

checkout.addEventListener("click", () => {
    // const result = check();
    // if( buyername.value.trim() === "" || buyertel.value.trim() === "" || buyermail.value.trim() === ""){
    //     nono();
    //     return    
    // }
    // if(result == 0){
    //     nono();
    //     return
    // }
    // if (shoppingcart == 1) {
    //     alert("尚未購買商品");
    //     return
    // }
    
    if (shoppingcart === 1) {
        alert("尚未購買商品");
        return;
    }
    if (validateForm()) {
        alert("訂單已送出");
        cartItems = [];
        saveCartToLocalStorage(); // 儲存清空後的購物車
        window.location.href = '../index.html'; // 回到首頁
    }
})

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
    
})

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