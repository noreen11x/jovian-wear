// Product Detail Page Script

// Get product handle from URL
const urlParams = new URLSearchParams(window.location.search);
const productHandle = urlParams.get('handle');

// Load product details
async function loadProduct() {
  if (!productHandle) {
    document.getElementById('product-detail').innerHTML = '<p>Product not found</p>';
    return;
  }

  try {
    const product = await api.getProduct(productHandle);
    renderProductDetail(product);
    loadRelatedProducts(product._id);
  } catch (error) {
    console.error('Error loading product:', error);
    document.getElementById('product-detail').innerHTML = '<p>Error loading product</p>';
  }
}

// Render product detail
function renderProductDetail(product) {
  const container = document.getElementById('product-detail');
  const images = product.images || (product.image ? [product.image] : []);

  let variantHTML = '';
  if (product.variants && product.variants.length > 0) {
    variantHTML = `
      <div class="variant-selector">
        <h4>Select Size</h4>
        <div class="variants-grid">
          ${product.variants
            .map(
              (v) => `
            <button class="variant-btn" data-variant="${v.id}" data-price="${v.price || product.price}">
              ${v.option1 || 'Variant'}
            </button>
          `
            )
            .join('')}
        </div>
      </div>
    `;
  }

  const html = `
    <div class="product-detail">
      <div class="product-gallery">
        <div class="main-image">
          <img id="main-image" src="${images[0]?.url || '/placeholder.jpg'}" alt="${product.title}">
        </div>
        <div class="thumbnails">
          ${images.map((img) => `<img src="${img.url}" alt="${img.alt}" class="thumbnail">`).join('')}
        </div>
      </div>

      <div class="product-content">
        <p class="product-vendor">${product.vendor || ''}</p>
        <h1>${product.title}</h1>
        
        <div class="product-rating">
          <span class="stars">★★★★★</span>
          <span class="rating-count">(${product.rating?.count || 0} reviews)</span>
        </div>

        <div class="product-prices">
          ${product.compareAtPrice ? `<span class="original-price">$${product.compareAtPrice}</span>` : ''}
          <span class="price" id="product-price">$${product.price}</span>
        </div>

        <div class="product-description">
          ${product.description || ''}
        </div>

        ${variantHTML}

        <div class="quantity-selector">
          <label for="quantity">Quantity:</label>
          <input type="number" id="quantity" min="1" value="1">
        </div>

        <button class="btn btn-primary btn-add-to-cart" data-product-id="${product._id}">
          Add to Cart
        </button>

        <div class="product-meta">
          <p><strong>SKU:</strong> ${product.sku || 'N/A'}</p>
          <p><strong>Category:</strong> ${product.category || 'Uncategorized'}</p>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // Add event listeners
  let selectedVariant = product.variants?.[0];
  let selectedPrice = product.price;

  document.querySelectorAll('.variant-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.variant-btn').forEach((b) => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedVariant = product.variants.find((v) => v.id === btn.dataset.variant);
      selectedPrice = parseFloat(btn.dataset.price);
      document.getElementById('product-price').textContent = `$${selectedPrice}`;
    });
  });

  document.querySelector('.btn-add-to-cart').addEventListener('click', (e) => {
    e.preventDefault();
    const quantity = parseInt(document.getElementById('quantity').value);
    const variantId = selectedVariant?.id || 'default';
    cartManager.addItem(product._id, variantId, quantity, selectedPrice);
  });

  // Image thumbnails
  document.querySelectorAll('.thumbnail').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      document.getElementById('main-image').src = thumb.src;
    });
  });
}

// Load related products
async function loadRelatedProducts(productId) {
  try {
    const { products } = await api.getProducts({ limit: 4 });
    const relatedProducts = products.filter((p) => p._id !== productId).slice(0, 4);
    const container = document.getElementById('related-products');
    if (container) {
      container.innerHTML = relatedProducts.map(renderProductCard).join('');
    }
  } catch (error) {
    console.error('Error loading related products:', error);
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', loadProduct);
