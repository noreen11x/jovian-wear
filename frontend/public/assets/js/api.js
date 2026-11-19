// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// API Class
class APIClient {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'API Error');
    }

    return response.json();
  }

  // Products
  async getProducts(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/products?${params}`);
  }

  async getProduct(handle) {
    return this.request(`/products/${handle}`);
  }

  // Collections
  async getCollections() {
    return this.request('/collections');
  }

  async getCollection(handle) {
    return this.request(`/collections/${handle}`);
  }

  // Cart
  async getCart(cartId) {
    return this.request(`/cart/${cartId}`);
  }

  async createCart() {
    return this.request('/cart', {
      method: 'POST',
      body: JSON.stringify({}),
    });
  }

  async addToCart(cartId, item) {
    return this.request(`/cart/${cartId}/items`, {
      method: 'POST',
      body: JSON.stringify(item),
    });
  }

  async updateCartItem(cartId, itemId, quantity) {
    return this.request(`/cart/${cartId}/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  }

  async removeFromCart(cartId, itemId) {
    return this.request(`/cart/${cartId}/items/${itemId}`, {
      method: 'DELETE',
    });
  }

  // Users
  async register(userData) {
    return this.request('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(email, password) {
    return this.request('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getUser(userId) {
    return this.request(`/users/${userId}`);
  }

  async updateUser(userId, userData) {
    return this.request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Orders
  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrders(userId) {
    return this.request(`/orders/user/${userId}`);
  }

  async getOrder(orderId) {
    return this.request(`/orders/${orderId}`);
  }

  // Blog
  async getBlogs() {
    return this.request('/blog');
  }

  async getBlog(handle) {
    return this.request(`/blog/${handle}`);
  }

  async getArticles(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/blog/articles?${params}`);
  }

  // Payments
  async createPaymentIntent(amount, currency, metadata) {
    return this.request('/payments/create-intent', {
      method: 'POST',
      body: JSON.stringify({ amount, currency, metadata }),
    });
  }

  async confirmPayment(paymentIntentId) {
    return this.request('/payments/confirm-payment', {
      method: 'POST',
      body: JSON.stringify({ paymentIntentId }),
    });
  }
}

// Export API Client
const api = new APIClient();
