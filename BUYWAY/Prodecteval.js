document.addEventListener('DOMContentLoaded', () => {
    // Get dropdown element to ensure an order is selected
    const previousOrdersSelect = document.getElementById('previous-orders');
    // Get all submit buttons for the products
    const submitButtons = document.querySelectorAll('.product-details #button button');

    // Add click event for each "Submit" button
    submitButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Prevent default form submission
            event.preventDefault();

            // Check if an order is selected from the dropdown
            const selectedOrder = previousOrdersSelect.value;
            if (!selectedOrder) {
                alert("Please select an order from the dropdown.");
                return;
            }

            // Check if a rating is selected
            const ratingInput = event.target.closest('.product-details').querySelector('#rating-range');
            const ratingValue = ratingInput.value;
            if (!ratingValue) {
                alert("Please select a rating.");
                return;
            }

            // Get the product name to display in the message
            const productName = event.target.closest('.product-details').querySelector('#order-titlebox span').textContent;

            // Display the thank-you message
            alert(`Thank you for your feedback!\nYour rating for the product "${productName}" is ${ratingValue}`);

            // Redirect the user to the homepage
            window.location.href = 'homepage.html';
        });
    });
});
