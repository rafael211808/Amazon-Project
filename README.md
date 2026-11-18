# 🛒 Amazon Project (JavaScript Clone)

This project is a recreation/clone of the **Amazon** e-commerce interface and functionality, developed using **Vanilla JavaScript (ES6 Modules)**, HTML5, and CSS3.

The original code was built as part of hands-on learning based on the JavaScript course from the channel:
[SuperSimpleDev] (https://www.youtube.com/@supersimpledev)**.

---

## 🚀 Features

- **Product Catalog:** Dynamic rendering of the product grid based on local data (`products.js`).
- **Search Filter:** Search for products by name or keywords via the navigation bar.
- **Cart Management:**
- Adding products with quantity selection. 
- Automatic updates to the total item count in the header. 
- Removing items and adjusting quantities during checkout. 
- Data persistence using the `localStorage` API.
- **Delivery Options:** Dynamic calculation of shipping costs with real-time updates to the order summary.
- **Order Simulation & Tracking:**
- Local order generation upon clicking "Place your order." 
- Order history page (`orders.html`). 
- Tracking screen (`tracking.html`) with delivery progress calculation using `Day.js`.
- **Product Class Support:** Object-oriented classes (`Product`, `Clothing`, `Appliance`) with custom behaviors and links.

---

## 🛠️ Technologies Used

- **HTML5 & CSS3** (Responsive design and modular layout)
- **JavaScript ES6+** (Modules (`import`/`export`), Async/Await, Promises, OOP with Classes)
- **LocalStorage API** (Storage for cart data and orders)
- **Day.js** (Date manipulation and delivery date calculations)
- **Jasmine** (Automated unit and integration testing suite)

---

## 📁 Folder Structure

```text
javascript-amazon-project/
├── data/                      # Application data (Products, Cart, Orders, Shipping)
│   ├── cart.js
│   ├── deliveryOptions.js
│   ├── orders.js
│   └── products.js
├── images/                    # Product images, icons, and ratings
├── scripts/                   # JavaScript logic for pages and utilities
│   ├── checkout/              # Checkout-specific modules (order summary, payments, etc.)
│   ├── utils/                 # Utility functions (currency formatting, etc.)
│   ├── amazon.js              # Main page script
│   ├── checkout.js            # Checkout page script
│   ├── orders.js              # Order history page script
│   └── tracking.js            # Tracking page script
├── tests/                     # Automated tests using Jasmine
│   ├── data/
│   ├── utils/
│   └── checkout/
├── amazon.html                # Main page (Catalog)
├── checkout.html              # Cart and checkout page
├── orders.html                # Past orders page
└── tracking.html              # Delivery tracking page
