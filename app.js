// app.js
import { products } from './data.js';

const app = {
    init() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
        this.addEventListeners();
        this.loadPage();
    },

    addEventListeners() {
        document.getElementById('home-link').addEventListener('click', (e) => {
            e.preventDefault();
            this.loadProductList();
        });

        document.getElementById('cart-link').addEventListener('click', (e) => {
            e.preventDefault();
            this.loadCart();
        });

        window.addEventListener('hashchange', () => this.loadPage());
    },

    loadPage() {
        const hash = window.location.hash;
        if (hash.startsWith('#product-')) {
            const productId = parseInt(hash.replace('#product-', ''));
            this.loadProductDetails(productId);
        } else if (hash === '#cart') {
            this.loadCart();
        } else {
            this.loadProductList();
        }
    },

    loadProductList() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <h2>商品一覧</h2>
            <div class="product-list">
                ${products.map(product => `
                    <div class="product-item">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>¥${product.price.toLocaleString()}</p>
                        <a href="#product-${product.id}" class="btn">詳細を見る</a>
                    </div>
                `).join('')}
            </div>
        `;
    },

    loadProductDetails(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) {
            this.loadProductList();
            return;
        }

        const app = document.getElementById('app');
        app.innerHTML = `
            <h2>${product.name}</h2>
            <div class="product-details">
                <img src="${product.image}" alt="${product.name}">
                <p>${product.description}</p>
                <p>価格: ¥${product.price.toLocaleString()}</p>
                <button class="btn" id="add-to-cart">カートに追加</button>
            </div>
        `;

        document.getElementById('add-to-cart').addEventListener('click', () => {
            this.addToCart(product);
        });
    },

    loadCart() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <h2>ショッピングカート</h2>
            ${this.cart.length === 0 ? '<p>カートは空です。</p>' : `
                <ul class="cart-items">
                    ${this.cart.map(item => `
                        <li>
                            ${item.name} - ¥${item.price.toLocaleString()} x ${item.quantity}
                            <button class="btn remove-item" data-id="${item.id}">削除</button>
                        </li>
                    `).join('')}
                </ul>
                <p>合計: ¥${this.getCartTotal().toLocaleString()}</p>
                <button class="btn" id="checkout">チェックアウト</button>
            `}
        `;

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                this.removeFromCart(id);
            });
        });

        document.getElementById('checkout')?.addEventListener('click', () => {
            this.checkout();
        });
    },

    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        this.updateCartCount();
        this.saveCart();
        alert('商品をカートに追加しました。');
    },

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCartCount();
        this.saveCart();
        this.loadCart();
    },

    updateCartCount() {
        const cartCount = this.cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cart-count').textContent = cartCount;
    },

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    },

    checkout() {
        alert('チェックアウトは完了していません。これはデモです。');
        this.cart = [];
        this.updateCartCount();
        this.saveCart();
        this.loadProductList();
    }
};

app.init();
