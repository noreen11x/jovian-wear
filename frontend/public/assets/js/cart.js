// Cart Page Script

// Load cart items
async function loadCart() {
  try {
    const cart = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');
    renderCartItems(cart);
    updateCartSummary(cart);
  } catch (error) {
    console.error('Error loading cart:', error);
  }
}

// Render cart items
function renderCartItems(cart) {
  const container = document.getElementById('cart-items-container');

  if (!cart.items || cart.items.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <p>Your cart is empty</p>
        <a href="/shop" class="btn btn-primary">Continue Shopping</a>
      </div>
    `;
    return;
  }

  const html = `
    <table class="cart-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${cart.items
          .map(
            (item) => `
          <tr class="cart-item" data-item-id="${item._id}">
            <td class="product-cell">
              <div class="cart-product-info">
                ${item.product?.image?.url ? `<img src="${item.product.image.url}" alt="${item.product.title}">` : ''}
                <div>
                  <h4>${item.product?.title || 'Unknown Product'}</h4>
                  <p>${item.variantId || ''}</p>
                </div>
              </div>
            </td>
            <td class="price-cell">$${item.price}</td>
            <td class="quantity-cell">
              <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-item-id="${item._id}">
            </td>
            <td class="total-cell">$${(item.price * item.quantity).toFixed(2)}</td>
            <td class="remove-cell">
              <button class="btn-remove" data-item-id="${item._id}">✕</button>
            </td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>
  `;

  container.innerHTML = html;

  // Add event listeners
  container.querySelectorAll('.quantity-input').forEach((input) => {
    input.addEventListener('change', (e) => {
      const itemId = e.target.dataset.itemId;
      const quantity = parseInt(e.target.value);
      cartManager.updateQuantity(itemId, quantity);
    });
  });

  container.querySelectorAll('.btn-remove').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const itemId = e.target.dataset.itemId;
      cartManager.removeItem(itemId);
    });
  });
}

// Update cart summary
function updateCartSummary(cart) {
  let subtotal = 0;
  if (cart.items) {
    subtotal = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
  document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Initialize
document.addEventListener('DOMContentLoaded', loadCart);

// Listen for cart updates
window.addEventListener('storage', (e) => {
  if (e.key === 'cart') {
    loadCart();
  }
});
