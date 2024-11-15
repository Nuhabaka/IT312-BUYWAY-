// Set Cookie Function (Ensure the path is set correctly)
function setCookie(name, value) {
    const expires = "expires=Fri, 31 Dec 9999 23:59:59 GMT"; // Keeps the cookie indefinitely
    document.cookie = `${name}=${value}; ${expires}; path=/`; // Path is set to the root
}

// Get Cookie Function
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to apply the theme on page load (using cookies)
window.onload = function () {
    const theme = getCookie('theme'); // Get the saved theme from cookies
    const logo = document.getElementById('logo');
    const nameImage = document.getElementById('name-img');
    const cartImage = document.getElementById('cart-img');
    const body = document.body;

    // Apply theme based on the saved cookie
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        logo.src = "darkLogo.png";  // Dark theme logo
        if (nameImage) {
            nameImage.src = "darkName.png";  // Dark theme name image (only on homepage)
        }
        if (cartImage) {
            cartImage.src = "darkCart.png";  // Dark theme cart image
        }
    } else {
        body.classList.remove('dark-theme');
        logo.src = "webLogo.png";  // Light theme logo
        if (nameImage) {
            nameImage.src = "name.png";  // Light theme name image
        }
        if (cartImage) {
            cartImage.src = "cart.png";  // Light theme cart image
        }
    }

    // Optional: Display the current date in the desired format
    document.getElementById('current-date').textContent = getFormattedDate();
};

// Function to toggle theme (using cookies)
function toggleTheme() {
    const body = document.body;
    const logo = document.getElementById('logo'); // Get the logo image by ID
    const nameImage = document.getElementById('name-img'); // Get the name image by ID
    const cartImage = document.getElementById('cart-img'); // Get the cart image by ID

    // Toggle the 'dark-theme' class on the body
    body.classList.toggle('dark-theme');

    // Update the logo and name image based on the theme
    if (body.classList.contains('dark-theme')) {
        logo.src = "darkLogo.png";  // Dark theme logo
        if (nameImage) {
            nameImage.src = "darkName.png";  // Dark theme name image (only on homepage)
        }
        if (cartImage) {
            cartImage.src = "darkCart.png";  // Dark theme cart image
        }
        // Save theme to cookies
        setCookie('theme', 'dark');
    } else {
        logo.src = "webLogo.png";  // Light theme logo
        if (nameImage) {
            nameImage.src = "name.png";  // Light theme name image
        }
        if (cartImage) {
            cartImage.src = "cart.png";  // Light theme cart image
        }
        // Save theme to cookies
        setCookie('theme', 'light');
    }
}

// Function to get the formatted date (Day, Date Month, Year)
function getFormattedDate() {
    const currentDate = new Date(); // Get today's date
    const options = { 
        weekday: 'long',   // Full weekday (e.g., "Monday")
        day: 'numeric',    // Day of the month (e.g., "11")
        month: 'long',     // Full month (e.g., "November")
        year: 'numeric'    // Full year (e.g., "2024")
    };
    return currentDate.toLocaleDateString('en-US', options);
}

// Function to toggle the visibility of the extra offers section
function toggleOffers() {
    const extraOffers = document.querySelectorAll('.offer.extra-offer');
    const link = document.getElementById('more-offers');
    
    // Toggle visibility of the extra offers
    extraOffers.forEach(function(offer) {
        offer.style.display = offer.style.display === 'block' ? 'none' : 'block';
    });

    // Change the text of the 'More Offers' link depending on the visibility
    if (link.textContent === "More Offers") {
        link.textContent = "Hide Offers";
    } else {
        link.textContent = "More Offers";
    }
}

// Function to add review details dynamically on hover
function addReviewHoverEffect() {
    const reviews = document.querySelectorAll(".review");
    const reviewData = {
        1: {
            customer: "Sarah Doe",
            product: "UltraSip Stainless Tumbler",
            feedback: "Love my new UltraSip Stainless Tumbler! Keeps drinks cold for hours, and the flip-top lid is so convenient. Highly recommend!",
            rating: "★★★★",
            image: "Review1.png"
        },
        2: {
            customer: "John Smith",
            product: "EchoWave Phantom",
            feedback: "Superb noise cancellation, and comfy for long hours, broke with me early though.",
            rating: "★★✩✩",
            image: "Review2.png"
        },
        3: {
            customer: "Nuha Baka",
            product: "Midnight Valor",
            feedback: "This fragrance is simply enchanting. A perfect blend of floral and musk, it's both elegant and alluring. It's a shame it doesn't stay for too long.",
            rating: "★★★✩",
            image: "Review3.png"
        }
    };

    reviews.forEach(review => {
        const detailsDiv = review.querySelector('.details'); // Ensure there's a .details element inside each review

        if (!detailsDiv) {
            console.error('Missing .details div in review element');
            return; // If the .details div doesn't exist, skip this review
        }

        // Add mouseenter listener
        review.addEventListener("mouseenter", () => {
            const reviewId = review.getAttribute('data-id'); // Assume each review has a data-id attribute
            const data = reviewData[reviewId]; // Get the corresponding data from the reviewData object

            if (data) {
                // Add the details to the .details div
                detailsDiv.innerHTML = `
                    <p><strong>Customer:</strong> ${data.customer}</p>
                    <p><strong>Product:</strong> ${data.product}</p>
                    <p><strong>Rating:</strong> ${data.rating}</p>
                    <p><strong>Feedback:</strong> ${data.feedback}</p>
                    <a href="${data.image}" target="_blank">
                        <img src="${data.image}" alt="${data.product}" class="review-pic">
                    </a>
                `;
            }
        });

        // Add mouseleave listener
        review.addEventListener("mouseleave", () => {
            detailsDiv.innerHTML = '';  // Clear the details when mouse leaves
        });
    });
}

// Ensure the DOM is loaded before applying hover effect
document.addEventListener("DOMContentLoaded", addReviewHoverEffect);


function func() {
    var notice = "";
    var missing = false;

    // Get form values
    var productName = document.getElementById('product-name').value;
    var price = document.getElementById('price').value;
    var quantity = document.getElementById('quantity').value;
    var category = document.getElementById('category').value;
    var description = document.getElementById('description').value;
    var photoInput = document.getElementById('photo1');

    // Validate form inputs
    if (productName == "" || price == "" || quantity == "" || description == "") {
        notice += "All fields must be filled out.\n";
        missing = true;
    }
    if (/^\d/.test(productName)) {
        notice += "Product name cannot start with a number.\n";
        missing = true;
    }
    if (isNaN(price) || price <= 0) {
        notice += "Price must be a valid number and greater than 0.\n";
        missing = true;
    }
    if (isNaN(quantity) || quantity <= 0) {
        notice += "Quantity must be a valid number greater than 0.\n";
        missing = true;
    }
    if (missing) {
        alert(notice);
        return;
    }

    // Convert the image file to Base64 and then save the product
    if (photoInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const photoDataUrl = event.target.result;

            const newProduct = {
                name: productName,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                category: category,
                description: description,
                photo: photoDataUrl
            };

            const products = JSON.parse(localStorage.getItem('products')) || [];
            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));

            alert(`The product "${productName}" has been added successfully!`);

            // Clear the form inputs
            document.querySelector('.product-form form').reset();
            photoInput.value = ""; // Clear the file input
        };
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        alert("Please upload a product photo.");
    }
}

