# Backend API Documentation

This application is configured to work with an external backend API. All database operations, authentication, and business logic are handled by your backend.

## Environment Variables

Set the following environment variable in the **Vars section** of the v0 sidebar:

\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:8000/api
\`\`\`

Replace with your actual backend API URL.

## Required API Endpoints

Your backend must implement the following endpoints:

### Products (Vouchers)

#### GET /api/products
Get list of products with optional filters.

**Query Parameters:**
- `category` (optional): Filter by category (e.g., "game", "business_app")
- `is_active` (optional): Filter by active status (true/false)

**Response:**
\`\`\`json
[
  {
    "id": "uuid",
    "name": "Product Name",
    "description": "Product description",
    "category": "game",
    "price": 29.99,
    "image_url": "https://...",
    "is_active": true,
    "created_at": "2024-01-01T00:00:00Z"
  }
]
\`\`\`

#### GET /api/products/:id
Get single product by ID.

#### POST /api/products
Create new product (admin only).

**Request Body:**
\`\`\`json
{
  "name": "Product Name",
  "description": "Description",
  "category": "game",
  "price": 29.99,
  "image_url": "https://..."
}
\`\`\`

#### PUT /api/products/:id
Update product (admin only).

#### DELETE /api/products/:id
Delete product (admin only).

### eSIMs

#### GET /api/esims
Get list of eSIM plans with optional filters.

**Query Parameters:**
- `country` (required): Country name to filter eSIM plans (e.g., "Turkey", "USA", "Thailand")

**Example Request:**
\`\`\`
GET /api/esims?country=Turkey
\`\`\`

**Response Format:**
\`\`\`json
{
  "best-prices": [
    {
      "name": "Turkey_5GB_30days",
      "country": "Turkey",
      "country_ru": "Турция",
      "amount_gb": 5,
      "day": 30,
      "price": 1999,
      "old_price": 2499,
      "img": "https://flagcdn.com/w320/tr.png"
    }
  ],
  "prices": [],
  "img": "https://flagcdn.com/w320/tr.png",
  "country": "Turkey",
  "country_ru": "Турция"
}
\`\`\`

**Note:** 
- Prices are in kopecks (divide by 100 for rubles/dollars)
- The frontend uses the URL: `https://keys.foreignpay.ru/webhook/api/esims?country={countryName}`
- The frontend will automatically transform the response to match the internal structure

#### GET /api/esims/:id
Get single eSIM by ID.

#### POST /api/esims
Create new eSIM plan (admin only).

**Request Body:**
\`\`\`json
{
  "country_name": "United States",
  "country_flag_logo": "https://...",
  "amount_gb": 5,
  "amount_days": 30,
  "price": 19.99
}
\`\`\`

#### PUT /api/esims/:id
Update eSIM plan (admin only).

#### DELETE /api/esims/:id
Delete eSIM plan (admin only).

### Orders

#### POST /api/orders
Create new order and assign voucher codes or eSIM codes.

**Request Body:**
\`\`\`json
{
  "email": "customer@example.com",
  "fullName": "John Doe",
  "items": [
    {
      "productId": "uuid",
      "type": "voucher",
      "quantity": 1,
      "unitPrice": 29.99
    },
    {
      "productId": "uuid",
      "type": "esim",
      "quantity": 1,
      "unitPrice": 19.99
    }
  ],
  "totalAmount": 49.98
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": "uuid",
  "email": "customer@example.com",
  "total_amount": 49.98,
  "status": "completed",
  "voucher_codes": [
    {
      "code": "XXXX-XXXX-XXXX",
      "product": {
        "name": "Product Name"
      }
    }
  ],
  "esim_codes": [
    {
      "code": "eSIM-XXXX-XXXX",
      "activation_url": "https://...",
      "qr_code_url": "https://...",
      "country_name": "United States"
    }
  ]
}
\`\`\`

#### GET /api/orders
Get list of orders (admin only).

**Query Parameters:**
- `limit` (optional): Limit number of results

#### GET /api/orders/:id
Get single order by ID.

### Voucher Codes

#### GET /api/voucher-codes
Get list of voucher codes (admin only).

**Query Parameters:**
- `product_id` (optional): Filter by product
- `is_used` (optional): Filter by used status

**Response:**
\`\`\`json
[
  {
    "id": "uuid",
    "code": "XXXX-XXXX-XXXX",
    "product_id": "uuid",
    "is_used": false,
    "used_at": null,
    "order_id": null,
    "created_at": "2024-01-01T00:00:00Z"
  }
]
\`\`\`

#### POST /api/voucher-codes
Create new voucher code (admin only).

**Request Body:**
\`\`\`json
{
  "productId": "uuid",
  "code": "XXXX-XXXX-XXXX"
}
\`\`\`

#### DELETE /api/voucher-codes/:id
Delete voucher code (admin only).

### Authentication

#### POST /api/auth/login
User login.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "password"
}
\`\`\`

**Response:**
\`\`\`json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "is_admin": false
  }
}
\`\`\`

**Note:** Should set session cookie for authentication.

#### POST /api/auth/signup
User registration.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "password",
  "fullName": "John Doe"
}
\`\`\`

#### POST /api/auth/logout
User logout (clears session).

#### GET /api/auth/me
Get current authenticated user.

**Response:**
\`\`\`json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "is_admin": false
  }
}
\`\`\`

Or if not authenticated:
\`\`\`json
{
  "user": null
}
\`\`\`

### Admin

#### GET /api/admin/stats
Get admin dashboard statistics.

**Response:**
\`\`\`json
{
  "totalProducts": 10,
  "totalOrders": 50,
  "totalRevenue": 1499.50,
  "availableVoucherCodes": 100
}
\`\`\`

## Authentication

The API should use cookie-based session authentication. The frontend sends requests with `credentials: 'include'` to include cookies.

## CORS Configuration

Your backend must allow CORS requests from the Next.js frontend:

\`\`\`
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type
\`\`\`

## eSIM API Integration

The application fetches eSIM data directly from:
\`\`\`
https://keys.foreignpay.ru/webhook/api/esims?country={countryName}
\`\`\`

This endpoint is called from the frontend and does not require your backend API for eSIM data fetching. Your backend only needs to handle eSIM order processing and code delivery.

## Database Schema

Your backend should implement the following database tables:

### Vouchers
- `products` - Product catalog
- `voucher_codes` - Digital voucher codes

### eSIMs
- `esims` - eSIM plans with country, data amount, and validity
- `esim_codes` - eSIM activation codes (similar to voucher codes)

### Orders
- `orders` - Customer orders
- `order_items` - Items in each order (both vouchers and eSIMs)

### Users
- `users` - User accounts
- `profiles` (optional) - Extended user information

Refer to the SQL scripts in the `/scripts` folder for the voucher schema. You'll need to create similar tables for eSIMs.
