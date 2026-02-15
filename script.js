// ==========================================
// PRODUCT DATA (WITH IMAGE PATHS)
// ==========================================
const products = [
    { id: 1, name: 'Wireless Headphones', price: 1200, category: 'Electronics', image: 'images/wireless.png.jpeg' },
    { id: 2, name: 'USB-C Cable', price: 350, category: 'Electronics', image: 'images/usbcable.png.jpeg' },
    { id: 3, name: 'Notebook Set', price: 450, category: 'School Supplies', image: 'images/notebook.png.jpeg' },
    { id: 4, name: 'Ballpoint Pens (12pc)', price: 280, category: 'School Supplies', image: 'images/ballpens.png.jpeg' },
    { id: 5, name: 'Desk Lamp', price: 890, category: 'Home & Garden', image: 'images/desklapm.png.jpeg' },
    { id: 6, name: 'Plant Pot', price: 320, category: 'Home & Garden', image: 'images/plangpot.png.jpeg' },
    { id: 7, name: 'Sports Water Bottle', price: 420, category: 'Sports', image: 'images/sportsbottle.png.jpeg' },
    { id: 8, name: 'Yoga Mat', price: 750, category: 'Sports', image: 'images/yogamat.png.jpeg' },
];

let cart = [];

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
    updateCartDisplay();
});

// ==========================================
// PRODUCT RENDERING (UPDATED FOR IMAGES)
// ==========================================
function renderProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-6 col-lg-6 mb-4';

        productCard.innerHTML = `
            <div class="card product-card h-100 shadow-sm">

                <!-- Fixed Image Frame -->
                <div style="
                    height:180px;
                    width:100%;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    background:#f8f9fa;
                    border-bottom:1px solid #eee;
                    overflow:hidden;
                ">
                    <img src="${product.image}" 
                         alt="${product.name}" 
                         style="
                            max-height:150px;
                            max-width:150px;
                            object-fit:contain;
                         ">
                </div>

                <div class="card-body d-flex flex-column">
                    <h5 class="product-name">${product.name}</h5>
                    <p class="product-category text-muted">${product.category}</p>
                    <p class="product-price fw-bold mt-auto">₱${product.price.toFixed(2)}</p>
                    <button class="btn btn-dark w-100 mt-2" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>

            </div>
        `;

        productList.appendChild(productCard);
    });
}


// ==========================================
// CART OPERATIONS
// ==========================================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            qty: 1
        });
    }

    updateCartDisplay();
    showAddedNotification(product.name);
}

function updateQty(productId, newQty) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQty <= 0) {
            removeItem(productId);
        } else {
            item.qty = newQty;
            updateCartDisplay();
        }
    }
}

function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function clearCart() {
    if (cart.length === 0) {
        alert('Your cart is already empty!');
        return;
    }
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        updateCartDisplay();
        document.getElementById('checkoutForm').reset();
    }
}

// ==========================================
// CART DISPLAY & TOTALS
// ==========================================
function updateCartDisplay() {
    renderCartTable();
    computeTotals();
    updateCartBadge();
}

function renderCartTable() {
    const cartTableBody = document.getElementById('cartTableBody');
    const emptyCartMessage = document.getElementById('emptyCartMessage');

    if (cart.length === 0) {
        cartTableBody.innerHTML = '';
        emptyCartMessage.style.display = 'block';
        return;
    }

    emptyCartMessage.style.display = 'none';
    cartTableBody.innerHTML = '';

    cart.forEach(item => {
        const row = document.createElement('tr');
        const lineTotal = item.price * item.qty;
        row.innerHTML = `
            <td>${item.name}</td>
            <td>₱${item.price.toFixed(2)}</td>
            <td>
                <div class="qty-controls">
                    <button class="qty-btn" onclick="updateQty(${item.id}, ${item.qty - 1})">−</button>
                    <input type="number" class="qty-input" value="${item.qty}" min="1" onchange="updateQty(${item.id}, parseInt(this.value))">
                    <button class="qty-btn" onclick="updateQty(${item.id}, ${item.qty + 1})">+</button>
                </div>
            </td>
            <td>₱${lineTotal.toFixed(2)}</td>
            <td>
                <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
            </td>
        `;
        cartTableBody.appendChild(row);
    });
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.textContent = totalItems;
}

// ==========================================
// TOTALS COMPUTATION
// ==========================================
function computeTotals() {
    // Calculate subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Calculate discount
    let discount = 0;
    // Discount Rule: 10% discount if Subtotal >= 1000
    if (subtotal >= 1000) {
        discount = subtotal * 0.10;
    }

    // Calculate tax (12% of subtotal - discount)
    const taxableAmount = subtotal - discount;
    const tax = taxableAmount * 0.12;

    // Calculate shipping
    let shipping = 0;
    if (subtotal < 500) {
        shipping = 80;
    }
    // Free shipping if subtotal >= 500

    // Calculate grand total
    const grandTotal = taxableAmount + tax + shipping;

    // Update UI
    document.getElementById('subtotal').textContent = `₱${subtotal.toFixed(2)}`;
    document.getElementById('discount').textContent = `-₱${discount.toFixed(2)}`;
    document.getElementById('tax').textContent = `₱${tax.toFixed(2)}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : `₱${shipping.toFixed(2)}`;
    document.getElementById('grandTotal').textContent = `₱${grandTotal.toFixed(2)}`;

    return { subtotal, discount, tax, shipping, grandTotal };
}

// ==========================================
// EVENT LISTENERS
// ==========================================
function setupEventListeners() {
    // Clear Cart Button
    document.getElementById('clearCartBtn').addEventListener('click', clearCart);

    // Delivery Option Change (show/hide address field)
    document.querySelectorAll('input[name="deliveryOption"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const addressContainer = document.getElementById('addressContainer');
            const addressInput = document.getElementById('address');
            if (e.target.value === 'Delivery') {
                addressContainer.style.display = 'block';
                addressInput.required = true;
            } else {
                addressContainer.style.display = 'none';
                addressInput.required = false;
                addressInput.value = '';
            }
        });
    });

    // Checkout Form Submission
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);

    // Print Receipt Button
    document.getElementById('printReceiptBtn').addEventListener('click', printReceipt);
}

// ==========================================
// FORM VALIDATION & CHECKOUT
// ==========================================
function handleCheckout(e) {
    e.preventDefault();

    // Check if cart is empty
    if (cart.length === 0) {
        alert('Your cart is empty! Please add items before checkout.');
        return;
    }

    const form = document.getElementById('checkoutForm');

    // Validate form
    if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        return;
    }

    // Additional validation for address if delivery is selected
    const deliveryOption = document.querySelector('input[name="deliveryOption"]:checked').value;
    const address = document.getElementById('address').value.trim();

    if (deliveryOption === 'Delivery' && !address) {
        document.getElementById('address').classList.add('is-invalid');
        return;
    }

    // If all validations pass, generate receipt
    generateReceipt();
}

function generateReceipt() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const deliveryOption = document.querySelector('input[name="deliveryOption"]:checked').value;
    const address = document.getElementById('address').value || 'Store Pickup';

    const totals = computeTotals();
    const orderNumber = 'ORD-' + Date.now();
    const orderDate = new Date().toLocaleString();

    let itemsHTML = '';
    cart.forEach(item => {
        const lineTotal = item.price * item.qty;
        itemsHTML += `
            <tr>
                <td>${item.name}</td>
                <td class="text-center">${item.qty}</td>
                <td class="text-end">₱${item.price.toFixed(2)}</td>
                <td class="text-end">₱${lineTotal.toFixed(2)}</td>
            </tr>
        `;
    });

    const receiptHTML = `
        <div class="p-3">
            <h4 class="text-center mb-3">ORDER CONFIRMATION</h4>

            <div class="mb-3">
                <strong>Order #:</strong> ${orderNumber}<br>
                <strong>Date:</strong> ${orderDate}<br>
                <strong>Name:</strong> ${fullName}<br>
                <strong>Email:</strong> ${email}
            </div>

            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th class="text-center">Qty</th>
                        <th class="text-end">Price</th>
                        <th class="text-end">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHTML}
                </tbody>
            </table>

            <div class="text-end">
                <p>Subtotal: ₱${totals.subtotal.toFixed(2)}</p>
                <p>Discount: -₱${totals.discount.toFixed(2)}</p>
                <p>Tax: ₱${totals.tax.toFixed(2)}</p>
                <p>Shipping: ${totals.shipping === 0 ? 'FREE' : '₱' + totals.shipping.toFixed(2)}</p>
                <h5 class="fw-bold">Grand Total: ₱${totals.grandTotal.toFixed(2)}</h5>
            </div>

            <hr>

            <div>
                <strong>Delivery Method:</strong> ${deliveryOption}<br>
                <strong>Address:</strong> ${address}<br>
                <strong>Payment:</strong> ${paymentMethod}
            </div>

            <div class="text-center mt-3">
                <small>Thank you for shopping with us!</small>
            </div>
        </div>
    `;

    document.getElementById('receiptContent').innerHTML = receiptHTML;
    const modal = new bootstrap.Modal(document.getElementById('receiptModal'));
    modal.show();

    document.getElementById('checkoutForm').reset();
    cart = [];
    updateCartDisplay();
}


// ==========================================
// PRINT RECEIPT
// ==========================================
function printReceipt() {
    const printContent = document.getElementById('receiptContent').innerHTML;
    const printWindow = window.open('', '', 'width=800,height=600');
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Order Receipt</title>
            <style>
                body { font-family: monospace; margin: 0; padding: 1rem; }
                table { width: 100%; border-collapse: collapse; }
                th, td { padding: 0.5rem; text-align: left; border-bottom: 1px solid #ddd; }
                .section { margin-bottom: 1.5rem; page-break-inside: avoid; }
            </style>
        </head>
        <body>
            ${printContent}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

// ==========================================
// NOTIFICATION
// ==========================================
function showAddedNotification(productName) {
    // Simple alert (you can replace with toast notification)
    console.log(`${productName} added to cart!`);
}
