# API Quick Reference

## Base URL
```
http://localhost:5000/api
```

## Headers
```
Content-Type: application/json
Authorization: Bearer <jwt_token> (if needed)
```

## Products

### List Products
```bash
GET /products?page=1&limit=12&search=sweater&sort=-createdAt
```

**Response:**
```json
{
  "products": [...],
  "pagination": {
    "total": 10,
    "page": 1,
    "limit": 12,
    "pages": 1
  }
}
```

### Get Single Product
```bash
GET /products/premium-knit-sweater
```

### Create Product (Admin)
```bash
POST /products
Content-Type: application/json

{
  "title": "New Product",
  "price": 99.99,
  "handle": "new-product",
  "description": "Product description"
}
```

---

## Collections

### List Collections
```bash
GET /collections
```

### Get Collection
```bash
GET /collections/knit-tops
```

### Create Collection
```bash
POST /collections

{
  "title": "My Collection",
  "handle": "my-collection",
  "description": "Description"
}
```

---

## Cart

### Create Cart
```bash
POST /cart
```

### Get Cart
```bash
GET /cart/cart_1234567890
```

### Add to Cart
```bash
POST /cart/cart_1234567890/items

{
  "product": "507f1f77bcf86cd799439011",
  "variantId": "var-001",
  "quantity": 1,
  "price": 89.99
}
```

### Update Item Quantity
```bash
PUT /cart/cart_1234567890/items/507f191e810c19729de860ea

{
  "quantity": 2
}
```

### Remove from Cart
```bash
DELETE /cart/cart_1234567890/items/507f191e810c19729de860ea
```

---

## Users

### Register
```bash
POST /users/register

{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### Login
```bash
POST /users/login

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Get User Profile
```bash
GET /users/507f1f77bcf86cd799439011
Authorization: Bearer <token>
```

### Update User
```bash
PUT /users/507f1f77bcf86cd799439011
Authorization: Bearer <token>

{
  "firstName": "Jane",
  "phone": "+1234567890"
}
```

---

## Orders

### Create Order
```bash
POST /orders

{
  "user": "507f1f77bcf86cd799439011",
  "items": [
    {
      "product": "507f1f77bcf86cd799439011",
      "quantity": 2,
      "price": 89.99
    }
  ],
  "subtotal": 179.98,
  "tax": 18.00,
  "shipping": 10.00,
  "total": 207.98,
  "billingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "address1": "123 Main St",
    "city": "Springfield",
    "country": "USA",
    "zip": "12345"
  }
}
```

### Get Order
```bash
GET /orders/507f1f77bcf86cd799439011
```

### Get User Orders
```bash
GET /orders/user/507f1f77bcf86cd799439011
```

### Update Order Status
```bash
PUT /orders/507f1f77bcf86cd799439011/status

{
  "status": "shipped"
}
```

**Status values:** pending, processing, shipped, delivered, cancelled, refunded

---

## Blog

### List Blogs
```bash
GET /blog
```

### Get Blog
```bash
GET /blog/news
```

### List Articles
```bash
GET /blog/articles?page=1&limit=10
```

### Get Article
```bash
GET /blog/articles/first-article
```

---

## Payments

### Create Payment Intent
```bash
POST /payments/create-intent

{
  "amount": 99.99,
  "currency": "USD",
  "metadata": {
    "orderId": "ORD-123456"
  }
}
```

**Response:**
```json
{
  "clientSecret": "pi_1234_secret_5678",
  "paymentIntentId": "pi_1234567890"
}
```

### Confirm Payment
```bash
POST /payments/confirm-payment

{
  "paymentIntentId": "pi_1234567890"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request data"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid email or password"
}
```

### 404 Not Found
```json
{
  "error": "Product not found"
}
```

### 500 Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Testing with cURL

### Get all products
```bash
curl http://localhost:5000/api/products
```

### Create a product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Product",
    "price": 49.99,
    "handle": "test-product",
    "description": "A test product"
  }'
```

### Get single product
```bash
curl http://localhost:5000/api/products/test-product
```

### Register user
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "firstName": "Test",
    "lastName": "User",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

---

## Tips

1. Save JWT token from login/register response for authenticated requests
2. Include token in Authorization header: `Authorization: Bearer <token>`
3. Use `page` and `limit` for pagination
4. Use `sort` with field name (prefix with `-` for descending)
5. Handles should be lowercase and URL-friendly
6. All IDs are MongoDB ObjectIds (24-character hex strings)

---

## Common Issues

**CORS Error?**
- Ensure frontend API_BASE_URL matches backend URL
- Check backend CORS is enabled

**404 Not Found?**
- Verify endpoint spelling
- Check HTTP method (GET, POST, PUT, DELETE)
- Confirm resource exists in database

**Authentication Failed?**
- Verify JWT token is in Authorization header
- Check token hasn't expired (30 days)
- Ensure token format: "Bearer <token>"

**Validation Error?**
- Check required fields are provided
- Verify data types match schema
- Check field formats (email, phone, etc)
