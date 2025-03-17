# React E-Commerce Web Application

A modern, responsive e-commerce web application built with React, featuring dark mode UI, product listings, and comprehensive shopping cart functionality.

## Features

- **Modern Dark Mode UI** - Sleek design with dark theme throughout the application
- **Product Listings** - Grid-based product display with filtering and search capabilities
- **Product Details** - Detailed view of each product with complete information
- **Shopping Cart System** - Fully functional cart with quantity control and persistence
- **Wishlist Functionality** - Save favorite products for later
- **Local Storage Persistence** - Cart and wishlist data persist between sessions
- **Responsive Design** - Works on mobile, tablet, and desktop devices

## Tech Stack

- React.js
- React Router for navigation
- Context API for state management
- Tailwind CSS for styling
- Local Storage for data persistence
- Fetch API for data retrieval

## Running the Application

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Project Structure

```
src/
├── components/         # UI components
│   ├── CartPage.jsx    # Shopping cart page
│   ├── Footer.jsx      # Footer component
│   ├── Navbar.jsx      # Navigation bar
│   ├── NotFound.jsx    # 404 page
│   ├── ProductDetails.jsx  # Product detail view
│   ├── ProductList.jsx     # Product listing page
│   └── WishlistPage.jsx    # Wishlist page
├── context/            # React Context providers
│   ├── CartContext.jsx  # Cart and wishlist state management
│   └── ProductContext.jsx  # Product data management
├── App.jsx             # Main application component
└── main.jsx            # Application entry point
```

## Features in Detail

### Product Management

- Display of products in a grid with image, title, price, and category
- Filter products by category
- Search products by keyword
- Detailed product view with description and specifications

### Cart System

- Add products to cart
- Remove products from cart
- Update quantity of products in cart
- Calculate total price with tax
- Checkout process simulation

### Wishlist System

- Add products to wishlist
- Remove products from wishlist
- Move products from wishlist to cart
- Persistent storage of wishlist items

### UI/UX Features

- Dark mode interface throughout
- Responsive design for all screen sizes
- Dynamic cart and wishlist count indicators
- Loading states for data fetching
- Image optimization with gradient backgrounds

## License

MIT

## Acknowledgements

- Data provided by [Fake Store API](https://fakestoreapi.com/)
- Icons from [Heroicons](https://heroicons.com/)
