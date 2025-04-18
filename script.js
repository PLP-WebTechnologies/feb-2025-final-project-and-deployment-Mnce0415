// Initialize the cart from localStorage, or create an empty array if it's not set
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add a book to the cart
function addToCart(bookName, bookPrice) {
    // Create a book object
    const book = {
        name: bookName,
        price: bookPrice
    };

    // Push the book into the cart
    cart.push(book);

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart count in the header
    updateCartCount();

    // Show a confirmation message (Optional)
    alert(`${bookName} added to cart!`);
}

// Function to update the cart count in the navigation
function updateCartCount() {
    // Get the cart count element (assuming you have a span with id 'cart-count' in the navigation)
    const cartCountElement = document.getElementById('cart-count');

    // Set the cart count text to reflect the number of items in the cart
    cartCountElement.textContent = `Cart (${cart.length})`;
}

// Function to display cart items on the cart page
function displayCart() {
    // Get the cart from localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Get the cart container element and total price element
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');

    // Check if the cart is empty
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalElement.innerHTML = "Total: $0.00";
    } else {
        let totalPrice = 0;
        // Loop through the cart and display each item
        cartContainer.innerHTML = '';  // Clear the cart container before adding new content
        cart.forEach((item, index) => {
            cartContainer.innerHTML += `
                <p>${item.name} - $${item.price} 
                <button onclick="removeFromCart(${index})">Remove</button></p>
            `;
            totalPrice += item.price;
        });

        // Display the total price
        totalElement.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
    }
}

// Function to remove a book from the cart
function removeFromCart(index) {
    // Remove the item from the cart array
    cart.splice(index, 1);

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart display and cart count
    displayCart();
    updateCartCount();
}

// Call displayCart function when the cart page is loaded
if (window.location.pathname.includes('cart.html')) {
    displayCart();
}

// Update the cart count on page load, in case the cart is already populated
if (window.location.pathname.includes('index.html')) {
    updateCartCount();
}

