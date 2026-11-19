# Jovian Wear Backend API

REST API for the Jovian Wear standalone e-commerce platform.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Server runs on http://localhost:5000
```

## API Documentation

See root README.md for complete API documentation.

## Models

### Product Model
- Full product information with variants
- Search-friendly indexing
- Inventory management
- SEO metadata

### User Model
- Secure password hashing with bcrypt
- Multiple addresses support
- Authentication ready

### Order Model
- Complete order lifecycle tracking
- Payment integration ready
- Shipping information

### Cart Model
- Session-based or user-based
- Automatic expiration (30 days)
- Item management

### Collection Model
- Organize products
- SEO optimization

### Article & Blog Models
- Blog post management
- Content organization

## Database Setup

### Local MongoDB
```bash
# Install MongoDB Community Edition
# macOS:
brew install mongodb-community

# Start service
brew services start mongodb-community

# MongoDB will run on localhost:27017
```

### MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Add to .env as MONGODB_URI

## Middleware

Currently configured:
- CORS for cross-origin requests
- JSON parser for request bodies
- URL-encoded parser for form data

## Authentication

JWT tokens are used for user authentication:
- Token generated on login/register
- Expires in 30 days
- Include in headers: `Authorization: Bearer <token>`

## Payment Integration

Stripe integration ready:
- Create payment intents
- Confirm payments
- Handle payment status

## Error Handling

API returns standardized error format:
```json
{
  "error": "Error message here"
}
```

HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error
