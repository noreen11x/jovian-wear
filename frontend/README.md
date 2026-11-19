# Jovian Wear Frontend

Standalone frontend for the Jovian Wear e-commerce platform.

## Quick Start

### Option 1: Python HTTP Server
```bash
cd frontend
python3 -m http.server 3000
# Visit http://localhost:3000
```

### Option 2: Live Server (VS Code)
1. Install "Live Server" extension
2. Right-click index.html
3. Select "Open with Live Server"

### Option 3: Node.js Server
```bash
npx http-server frontend/public -p 3000
```

## Pages

- **index.html** - Home page with hero, featured products, collections
- **shop.html** - Product listing with filters and search
- **product.html** - Single product detail page
- **cart.html** - Shopping cart

## Assets

### CSS
- **style.css** - Global styles, layout, typography
- **components.css** - Component-specific styles

### JavaScript
- **api.js** - API client and requests
- **main.js** - Home page functionality
- **shop.js** - Shop page filtering and pagination
- **product.js** - Product detail and related products
- **cart.js** - Cart management

## Features

### Home Page
- Hero banner with CTA
- Featured products carousel
- Collections showcase
- FAQ section

### Shop Page
- Product grid with pagination
- Sidebar filters
- Search functionality
- Sorting options
- Collection filtering

### Product Detail
- Product images with zoom
- Variant selection
- Quantity selector
- Add to cart
- Related products

### Cart
- Cart items display
- Update quantities
- Remove items
- Order summary
- Checkout link

## Cart Management

Cart is stored in browser localStorage:
- Persists across page refreshes
- Auto-syncs with cart count in header
- Updates triggered by storage events

## API Integration

All API calls go through the `api.js` APIClient class:
```javascript
// Get products
const { products } = await api.getProducts({ limit: 12 });

// Add to cart
await api.addToCart(cartId, { product, quantity, price });

// Get collections
const collections = await api.getCollections();
```

## Customization

### Change API Base URL
Edit in `assets/js/api.js`:
```javascript
const API_BASE_URL = 'http://your-api-url.com/api';
```

### Change Colors
Edit CSS variables in `assets/css/style.css`:
```css
:root {
  --primary-color: #121212;
  --secondary-color: #ffffff;
  --accent-color: #d4af37;
}
```

### Add New Pages
1. Create HTML file
2. Import necessary JS: `api.js` and page-specific JS
3. Import CSS: `style.css` and `components.css`
4. Add navigation link

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Tips

- Images lazy-loaded
- CSS minification ready
- JavaScript bundling ready
- Responsive images for mobile

## Future Enhancements

- [ ] Convert to React
- [ ] Add TypeScript
- [ ] Implement service workers
- [ ] Add offline support
- [ ] Image optimization
- [ ] PWA features
