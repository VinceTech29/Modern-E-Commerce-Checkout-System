# Modern E-Commerce Checkout System

A responsive web-based checkout system built using HTML, CSS, Bootstrap 5, and Vanilla JavaScript.  
The system allows users to browse products, manage a shopping cart, compute totals with discount, tax, and shipping logic, and generate a printable receipt.



## Features

- Landing page
- Product listing with uniform image frames
- Add to cart functionality
- Quantity adjustment and item removal
- Automatic subtotal, discount, tax (12%), and shipping calculation
- Free shipping for orders ≥ ₱500
- 10% discount for orders ≥ ₱1000
- Dynamic cart badge counter
- Checkout form with validation
- Delivery and pickup option handling
- Receipt generation inside Bootstrap modal
- Printable receipt view



## Technologies Used

- HTML5
- CSS3
- Bootstrap 5
- Vanilla JavaScript


## Project Structure

```
project-folder/
│
├── landing.html
├── landing.css
├── index.html
├── script.js
├── style.css
└── images/
    ├── wireless.png.jpeg
    ├── usbcable.png.jpeg
    ├── notebook.png.jpeg
    ├── ballpens.png.jpeg
    ├── desklapm.png.jpeg
    ├── plangpot.png.jpeg
    ├── sportsbottle.png.jpeg
    └── yogamat.png.jpeg
```


## Business Logic

- Discount: 10% if subtotal ≥ ₱1000
- Tax: 12% of (subtotal − discount)
- Shipping: ₱80 if subtotal < ₱500
- Free Shipping: if subtotal ≥ ₱500



## How to Run

1. Clone the repository.
2. Make sure the `images` folder contains all product images.
3. Open `landing.html` to start the application.



## License

This project is for academic and educational purposes.



