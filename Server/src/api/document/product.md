# Product API Documentation

## Endpoints

### Create Product
**POST** `/api/products/create`

#### Request Body
```json
{
  "name": "string",
  "slug": "string",
  "description": "string",
  "base_price": "number",
  "category_id": "number",
  "size_chart": "string (optional)",
  "payment_options": "array of strings (optional)",
  "estimated_delivery_days": "number (optional)",
  "active": "boolean",
  "stock": "number",
  "sku": "string"
}
```

#### Response
```json
{
  "status": "success",
  "message": "Product created successfully",
  "data": {
    "id": "number",
    "name": "string",
    "slug": "string",
    "description": "string",
    "base_price": "number",
    "category_id": "number",
    "size_chart": "string",
    "payment_options": "array of strings",
    "estimated_delivery_days": "number",
    "active": "boolean",
    "stock": "number",
    "sku": "string",
    "created_at": "string",
    "updated_at": "string"
  }
}
```

### Get Products
**GET** `/api/products`

#### Response
```json
{
  "status": "success",
  "message": "Product fetched successfully",
  "data": [
    {
      "id": "number",
      "name": "string",
      "slug": "string",
      "description": "string",
      "base_price": "number",
      "category_id": "number",
      "size_chart": "string",
      "payment_options": "array of strings",
      "estimated_delivery_days": "number",
      "active": "boolean",
      "stock": "number",
      "sku": "string",
      "created_at": "string",
      "updated_at": "string"
    }
  ]
}
```

### Create Category
**POST** `/api/categories/create`

#### Request Body
```json
{
  "name": "string",
  "slug": "string",
  "parent_category_id": "number (optional)"
}
```

#### Response
```json
{
  "status": "success",
  "message": "Category created successfully",
  "data": {
    "id": "number",
    "name": "string",
    "slug": "string",
    "parent_category_id": "number",
    "created_at": "string",
    "updated_at": "string"
  }
}
```

### Get Categories
**GET** `/api/categories`

#### Response
```json
{
  "status": "success",
  "message": "Category fetched successfully",
  "data": [
    {
      "id": "number",
      "name": "string",
      "slug": "string",
      "parent_category_id": "number",
      "created_at": "string",
      "updated_at": "string"
    }
  ]
}
```