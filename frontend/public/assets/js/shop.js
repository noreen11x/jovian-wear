// Shop Page Script
let currentFilters = {
  page: 1,
  limit: 12,
};

// Load products with filters
async function loadProducts() {
  try {
    const { products, pagination } = await api.getProducts(currentFilters);
    renderProducts(products);
    renderPagination(pagination);
  } catch (error) {
    console.error('Error loading products:', error);
    document.getElementById('products').innerHTML = '<p>Error loading products</p>';
  }
}

// Render products grid
function renderProducts(products) {
  const container = document.getElementById('products');
  if (products.length === 0) {
    container.innerHTML = '<p>No products found</p>';
    return;
  }
  container.innerHTML = products.map(renderProductCard).join('');
}

// Render pagination
function renderPagination(pagination) {
  const container = document.getElementById('pagination');
  if (pagination.pages <= 1) {
    container.innerHTML = '';
    return;
  }

  let html = '<div class="page-links">';
  if (pagination.page > 1) {
    html += `<a href="#" data-page="${pagination.page - 1}" class="page-link">← Previous</a>`;
  }

  for (let i = 1; i <= pagination.pages; i++) {
    html += `<a href="#" data-page="${i}" class="page-link ${i === pagination.page ? 'active' : ''}">${i}</a>`;
  }

  if (pagination.page < pagination.pages) {
    html += `<a href="#" data-page="${pagination.page + 1}" class="page-link">Next →</a>`;
  }
  html += '</div>';

  container.innerHTML = html;

  // Add click handlers
  container.querySelectorAll('.page-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      currentFilters.page = parseInt(link.dataset.page);
      loadProducts();
      window.scrollTo(0, 0);
    });
  });
}

// Load collections for filter
async function loadCollectionsFilter() {
  try {
    const collections = await api.getCollections();
    const container = document.getElementById('collections-filter');
    container.innerHTML = collections
      .map(
        (collection) => `
      <label>
        <input type="checkbox" value="${collection._id}" class="collection-filter">
        ${collection.title}
      </label>
    `
      )
      .join('');

    container.querySelectorAll('.collection-filter').forEach((checkbox) => {
      checkbox.addEventListener('change', (e) => {
        currentFilters.page = 1;
        if (e.target.checked) {
          currentFilters.collection = e.target.value;
        } else {
          delete currentFilters.collection;
        }
        loadProducts();
      });
    });
  } catch (error) {
    console.error('Error loading collections:', error);
  }
}

// Setup filters
document.addEventListener('DOMContentLoaded', () => {
  // Search
  document.getElementById('search').addEventListener('input', (e) => {
    currentFilters.page = 1;
    if (e.target.value) {
      currentFilters.search = e.target.value;
    } else {
      delete currentFilters.search;
    }
    loadProducts();
  });

  // Sort
  document.getElementById('sort').addEventListener('change', (e) => {
    currentFilters.sort = e.target.value;
    loadProducts();
  });

  // Load initial data
  loadCollectionsFilter();
  loadProducts();
});
