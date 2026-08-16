# RentCore API Contract (v1)

- **Base URL:** `http://127.0.0.1:8000/api/v1`
- **Headers Required:**
  - `Content-Type: application/json`
  - `Accept: application/json`
  - `Authorization: Bearer {token}` *(for protected routes)*

---

## 1. Global Response Standards

### 1.1 Success Response (`200 OK` / `201 Created`)
```json
{
  "success": true,
  "message": "Resource retrieved successfully",
  "data": {}
}
```



### 1.2 Validation Error (422 Unprocessable Content)
- Returned when request body inputs fail Laravel validation rules:
```json
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "unit_number": ["The unit number field is required."],
    "monthly_rent": ["The monthly rent must be a number."]
  }
}
```


### 1.3 Authentication Error (401 Unauthorized)
- Returned when a token is missing, expired, or invalid:
```json

{
  "success": false,
  "message": "Unauthenticated. Please log in."
}
```


### 1.4 Not Found Error (404 Not Found)
```json

{
  "success": false,
  "message": "Resource not found"
}
```


## 2. Authentication Endpoints
### POST /auth/login
- Authenticates a user and returns a Bearer token.

- **Auth Required: No**
#### Request Body
```json
{
  "email": "admin@rentcore.com",
  "password": "secretpassword"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "1|laravel_sanctum_token_string_here",
    "user": {
      "id": 1,
      "name": "Admin User",
      "email": "admin@rentcore.com"
    }
  }
}
```

### POST /auth/logout
- Logs out the current user and revokes their active token.

- **Auth Required: Yes**

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Successfully logged out"
}
```



## 3. Buildings Endpoints
### GET /buildings
- Retrieves a list of all buildings with summary stats.

- **Auth Required: Yes**

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Buildings retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Sunrise Heights",
      "address": "123 Mabini St, Manila",
      "total_units": 12,
      "occupied_units": 10,
      "created_at": "2026-04-10T08:00:00Z"
    }
  ]
}
```


### POST /buildings
- Creates a new building record.

- **Auth Required: Yes**

#### Request Body
```json
{
  "name": "Grand Horizon Tower",
  "address": "456 Roxas Blvd, Manila"
}
```


#### Response (201 Created)
```json
{
  "success": true,
  "message": "Building created successfully",
  "data": {
    "id": 2,
    "name": "Grand Horizon Tower",
    "address": "456 Roxas Blvd, Manila",
    "total_units": 0,
    "occupied_units": 0,
    "created_at": "2026-08-16T14:00:00Z"
  }
}
```


### GET /buildings/{id}
- Retrieves single building details.

- **Auth Required: Yes**
#### Response (200 OK)
```json
{
  "success": true,
  "message": "Building retrieved successfully",
  "data": {
    "id": 1,
    "name": "Sunrise Heights",
    "address": "123 Mabini St, Manila",
    "total_units": 12,
    "occupied_units": 10,
    "created_at": "2026-04-10T08:00:00Z"
  }
}
```


## 4. Units Endpoints
### GET /units
- Retrieves all units with optional query filtering.

- **Auth Required: Yes**

- **Query Params: ?building_id=1&status=vacant (optional)**
#### Response (200 OK)
```json
{
  "success": true,
  "message": "Units retrieved successfully",
  "data": [
    {
      "id": 101,
      "building_id": 1,
      "building_name": "Sunrise Heights",
      "unit_number": "Unit 3B",
      "monthly_rent": 15000.00,
      "status": "vacant",
      "created_at": "2026-04-12T10:30:00Z"
    }
  ]
}
```


### POST /units
- Creates a new unit inside a building.

- **Auth Required: Yes**
#### Request Body
```json
{
  "building_id": 1,
  "unit_number": "Unit 4A",
  "monthly_rent": 18000.00,
  "status": "vacant"
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "message": "Unit created successfully",
  "data": {
    "id": 102,
    "building_id": 1,
    "building_name": "Sunrise Heights",
    "unit_number": "Unit 4A",
    "monthly_rent": 18000.00,
    "status": "vacant",
    "created_at": "2026-08-16T14:05:00Z"
  }
}
```


## 5. Tenants Endpoints
### GET /tenants
- Retrieves a list of all tenants along with their assigned unit details.

- **Auth Required: Yes**

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Tenants retrieved successfully",
  "data": [
    {
      "id": 1,
      "full_name": "Maria Santos",
      "email": "maria@example.com",
      "phone": "+639171234567",
      "unit": {
        "id": 101,
        "unit_number": "Unit 3B",
        "building_name": "Sunrise Heights"
      },
      "lease_start": "2026-01-01",
      "lease_end": "2026-12-31",
      "status": "active"
    }
  ]
}
```


### POST /tenants
- Registers a new tenant and assigns them to a unit.

- **Auth Required: Yes**
#### Request Body
```json
{
  "unit_id": 101,
  "full_name": "Juan Dela Cruz",
  "email": "juan@example.com",
  "phone": "+639189876543",
  "lease_start": "2026-09-01",
  "lease_end": "2027-08-31"
}
```


#### Response (201 Created)
```json
{
  "success": true,
  "message": "Tenant registered successfully",
  "data": {
    "id": 2,
    "full_name": "Juan Dela Cruz",
    "email": "juan@example.com",
    "phone": "+639189876543",
    "unit": {
      "id": 101,
      "unit_number": "Unit 3B",
      "building_name": "Sunrise Heights"
    },
    "lease_start": "2026-09-01",
    "lease_end": "2027-08-31",
    "status": "active"
  }
}
```


## 6. Payments Endpoints
### GET /payments
- Retrieves payment transaction history.

- **Auth Required: Yes**
#### Response (200 OK)
```json
{
  "success": true,
  "message": "Payments retrieved successfully",
  "data": [
    {
      "id": 501,
      "tenant_id": 1,
      "tenant_name": "Maria Santos",
      "amount": 15000.00,
      "payment_method": "GCash",
      "reference_number": "GCASH-9823102",
      "payment_date": "2026-08-01",
      "status": "paid"
    }
  ]
}
```


### POST /payments
- Records a payment made by a tenant.

- **Auth Required: Yes**

#### Request Body
```json
{
  "tenant_id": 1,
  "amount": 15000.00,
  "payment_method": "GCash",
  "reference_number": "GCASH-9823102",
  "payment_date": "2026-08-01"
}
```


#### Response (201 Created)
```json
{
  "success": true,
  "message": "Payment recorded successfully",
  "data": {
    "id": 501,
    "tenant_id": 1,
    "tenant_name": "Maria Santos",
    "amount": 15000.00,
    "payment_method": "GCash",
    "reference_number": "GCASH-9823102",
    "payment_date": "2026-08-01",
    "status": "paid"
  }
}
```


