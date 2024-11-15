document.addEventListener('DOMContentLoaded', () => {
    const pricePerItem = 20; // Price per item
    const taxRate = 0.05; // Tax rate (5%)
    const shippingCost = 10; // Fixed shipping cost

    const subtotalElement = document.getElementById('summary-subtotal');
    const totalElement = document.getElementById('summary-total');
    const checkoutButton = document.getElementById('checkout-btn');
    const deleteAllButton = document.getElementById('delete-all');

    // Load the cart from localStorage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to update subtotal and display the price
    function updateSubtotal() {
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
        });
        subtotalElement.textContent = `Subtotal: ${subtotal}$`;
        return subtotal;
    }

    // Function to update the summary with tax and shipping
    function updateSummary() {
        const subtotal = updateSubtotal();
        const tax = subtotal * taxRate;
        const total = subtotal + tax + shippingCost;
        totalElement.textContent = `Total: ${total}$`;
    }

    // Function to update the cart UI dynamically
    function updateCartUI() {
        const cartContainer = document.getElementById('cart-items');
        cartContainer.innerHTML = ''; // Clear previous items

        cart.forEach(item => {
            const itemCard = `
                <div class="cart-item" id="item-${item.id}">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <p>${item.name}</p>
                        <p>Price: ${item.price}$</p>
                        <select class="quantity-select" data-id="${item.id}">
                            <option value="1" ${item.quantity === 1 ? 'selected' : ''}>1</option>
                            <option value="2" ${item.quantity === 2 ? 'selected' : ''}>2</option>
                            <option value="3" ${item.quantity === 3 ? 'selected' : ''}>3</option>
                        </select>
                        <button class="remove-item" data-id="${item.id}">Remove</button>
                    </div>
                </div>
            `;
            cartContainer.innerHTML += itemCard;
        });

        updateSummary();  // Recalculate subtotal, tax, and total
        addCartItemEventListeners(); // Add event listeners for dynamically added items
    }

    // Function to add event listeners for remove buttons and quantity updates
    function addCartItemEventListeners() {
        document.getElementById('cart-items').addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item')) {
                const productId = parseInt(e.target.getAttribute('data-id'));
                cart = cart.filter(item => item.id !== productId);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartUI();
            }
        });

        // Event listener for quantity changes
        document.getElementById('cart-items').addEventListener('change', (e) => {
            if (e.target.classList.contains('quantity-select')) {
                const productId = parseInt(e.target.getAttribute('data-id'));
                const newQuantity = parseInt(e.target.value);
                const productIndex = cart.findIndex(item => item.id === productId);

                if (productIndex >= 0) {
                    cart[productIndex].quantity = newQuantity;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartUI();
                }
            }
        });
    }

    // Initial cart UI update
    updateCartUI();

    // Event listener for deleting all items
    deleteAllButton.addEventListener('click', () => {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    });

    // Event listener for checkout button
    checkoutButton.addEventListener('click', () => {
        const subtotal = updateSubtotal();
        const tax = subtotal * taxRate;
        const total = subtotal + tax + shippingCost;

        // Display acknowledgment
        alert(`Thank you for your purchase! Total cost: $${total}`);
        
        // Redirect to the evaluation page
        window.location.href = 'Prodecteval.html';
    });
});
