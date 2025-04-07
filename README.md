# 毛咪寵物王國 - 寵物銷售網站

這是一個專為寵物愛好者打造的寵物用品銷售網站前端專案，提供多種寵物用品的瀏覽與購買功能。

## 專案概述

毛咪寵物王國是一個互動式的寵物用品電商網站，具有以下功能：

- 商品瀏覽與搜尋
- 商品分類與過濾
- 購物車功能
- 聯絡表單
- 響應式設計，支援各種裝置

## 技術架構

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- JSON檔案儲存產品資料

## 專案結構

```
pets-sales-project/
│
├── dir/                    # 功能目錄
│   ├── index_js.js         # 主頁面JavaScript功能
│   ├── products.json       # 產品資料
│   ├── check.html          # 結帳頁面
│   ├── check_js.js         # 結帳頁面JavaScript功能
│   ├── check_style.css     # 結帳頁面樣式
│   └── index_style.css     # 主頁面樣式
│
├── img/                    # 圖片資源目錄
│
└── index.html              # 主頁面
```

## 安裝與使用

### 前置需求

- 安裝 [Visual Studio Code](https://code.visualstudio.com/)
- 安裝 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 擴充功能

### 安裝步驟

1. 複製專案到本地：
   ```
   git clone https://github.com/GodYanGX724/pets-sales-project.git
   ```

2. 使用 VS Code 開啟專案資料夾：
   ```
   code pets-sales-project
   ```

### 啟動專案

**重要：** 本專案需使用 VS Code 的 Live Server 擴充功能來啟動，以避免跨域(CORS)問題。

使用方法：
1. 在 VS Code 中，右鍵點擊 `index.html` 檔案
2. 選擇「Open with Live Server」（使用 Live Server 開啟）
3. 專案將自動在瀏覽器中開啟，通常位址為：`http://127.0.0.1:5500/index.html`

## 注意事項

- 請勿直接在檔案總管中雙擊開啟 HTML 檔案，這會導致跨域資源存取(CORS)錯誤，無法正確載入產品資料
- 必須使用 Live Server 或其他本地伺服器來啟動專案
- 專案使用 JSON 檔案儲存產品資料，需要正確的伺服器環境才能讀取

## 功能說明

- **首頁**：展示輪播廣告
- **商品頁**：瀏覽所有寵物用品，可按類別過濾
- **購物車**：查看已選商品並進行結帳

## 聯絡資訊

如有任何問題或建議，歡迎透過網站的聯絡表單與我們聯繫。