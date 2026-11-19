// Cart Management
class CartManager {
  constructor() {
    this.cartId = this.getOrCreateCartId();
    this.loadCart();
  }

  getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      cartId = 'cart_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('cartId', cartId);
    }
    return cartId;
  }

  async loadCart() {
    try {
      const cart = await api.getCart(this.cartId);
      this.updateCartUI(cart);
    } catch (error) {
      console.log('Cart not found, will create on first add');
    }
  }

  async addItem(productId, variantId, quantity, price) {
    try {
      const cart = await api.addToCart(this.cartId, {
        product: productId,
        variantId,
        quantity,
        price,
      });
      this.updateCartUI(cart);
      this.showNotification('Added to cart!');
    } catch (error) {
      this.showNotification('Error adding to cart: ' + error.message, 'error');
    }
  }

  async removeItem(itemId) {
    try {
      const cart = await api.removeFromCart(this.cartId, itemId);
      this.updateCartUI(cart);
      this.showNotification('Removed from cart');
    } catch (error) {
      this.showNotification('Error removing from cart: ' + error.message, 'error');
    }
  }

  async updateQuantity(itemId, quantity) {
    try {
      const cart = await api.updateCartItem(this.cartId, itemId, quantity);
      this.updateCartUI(cart);
    } catch (error) {
      this.showNotification('Error updating quantity: ' + error.message, 'error');
    }
  }

  updateCartUI(cart) {
    const cartCount = cart.items.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach((el) => {
      el.textContent = cartCount;
    });
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  }

  showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }
}

// Initialize cart manager
const cartManager = new CartManager();

// Product Card Renderer
function renderProductCard(product) {
  return `
    <div class="product-card">
      <div class="product-image">
        <img src="${product.image?.url || '/placeholder.jpg'}" alt="${product.title}">
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-vendor">${product.vendor || ''}</p>
        <div class="product-price">
          ${product.compareAtPrice ? `<span class="original-price">$${product.compareAtPrice}</span>` : ''}
          <span class="price">$${product.price}</span>
        </div>
        <a href="/product.html?handle=${product.handle}" class="btn btn-secondary">View Details</a>
      </div>
    </div>
  `;
}

// Collection Card Renderer
function renderCollectionCard(collection) {
  return `
    <div class="collection-card">
      <div class="collection-image">
        <img src="${collection.image?.url || '/placeholder.jpg'}" alt="${collection.title}">
      </div>
      <h3 class="collection-title">${collection.title}</h3>
      <a href="/shop?collection=${collection.handle}" class="btn btn-secondary">View Collection</a>
    </div>
  `;
}

// Load Featured Products
async function loadFeaturedProducts() {
  try {
    const { products } = await api.getProducts({ limit: 4 });
    const container = document.getElementById('featured-products');
    if (container) {
      container.innerHTML = products.map(renderProductCard).join('');
    }
  } catch (error) {
    console.error('Error loading featured products:', error);
  }
}

// Load Collections
async function loadCollections() {
  try {
    const collections = await api.getCollections();
    const container = document.getElementById('collections');
    if (container) {
      container.innerHTML = collections.map(renderCollectionCard).join('');
    }
  } catch (error) {
    console.error('Error loading collections:', error);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadFeaturedProducts();
  loadCollections();
  cartManager.loadCart();
});
