const products = [
    { id: 1, name: 'Nike Denim Turq Miler Dri-FIT UV Running T-Shirt', price: 62, image: 'clothes/p1.png' },
    { id: 2, name: 'Nike Sportswear Tech Fleece Windrunner Full-Zip Hoodie', price: 145, image: 'clothes/p2.png' },
    { id: 3, name: 'Nike Sportswear Tech Fleece Hoodie Men', price: 70, image: 'clothes/p3.png' },
    { id: 4, name: 'Nike Woven Harrington Jacket in Cotton-twill', price: 825, image: 'clothes/p4.png' },
    { id: 5, name: 'Nike Sportswear Tech Fleece Hoodie Men', price: 544, image: 'clothes/p5.png' },
    { id: 6, name: 'Nike Men\'s Sportswear Tribute Sweatpants', price: 350, image: 'clothes/p6.png' },
    { id: 7, name: 'Nike Men\'s Sportswear Club T-shirt In Pink', price: 100, image: 'clothes/p7.png' },
    { id: 8, name: 'Nike T-Shirt Nike Sportswear Premium Essentials - Orange', price: 46, image: 'clothes/p8.png' }
];

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productCard = `
            <div class="product-card" id="product-${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <p>${product.name}</p>
                    <p class="product-price">${product.price}$</p>
                    <div>
                        <button class="decrease-qty" data-id="${product.id}">-</button>
                        <span class="quantity" id="qty-${product.id}">1</span>
                        <button class="increase-qty" data-id="${product.id}">+</button>
                    </div>
                    <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}

function sortProducts(criteria) {
    let sortedProducts;
    switch (criteria) {
        case 'low-to-high':
            sortedProducts = [...products].sort((a, b) => a.price - b.price);
            break;
        case 'high-to-low':
            sortedProducts = [...products].sort((a, b) => b.price - a.price);
            break;
        case 'a-to-z':
            sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'z-to-a':
            sortedProducts = [...products].sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            sortedProducts = [...products];
    }
    displayProducts(sortedProducts);
}

document.getElementById('sort-products').addEventListener('change', (e) => {
    sortProducts(e.target.value);
});

let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.getElementById('product-list').addEventListener('click', (e) => {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);

    if (e.target.classList.contains('increase-qty')) {
        const quantityElement = document.getElementById(`qty-${productId}`);
        quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
    } else if (e.target.classList.contains('decrease-qty')) {
        const quantityElement = document.getElementById(`qty-${productId}`);
        const currentQuantity = parseInt(quantityElement.textContent);
        if (currentQuantity > 1) {
            quantityElement.textContent = currentQuantity - 1;
        }
    } else if (e.target.classList.contains('add-to-cart-btn')) {
        const quantity = parseInt(document.getElementById(`qty-${productId}`).textContent);
        const cartItem = { ...product, quantity };
        const existingItemIndex = cart.findIndex(item => item.id === productId);

        if (existingItemIndex >= 0) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
    }
});

displayProducts(products);
