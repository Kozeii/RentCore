\# 🔗 BACKEND-FRONTEND CONNECTION MAPPING

\# RentalCore v3 - Complete API/Data Mapping



\---



\## 📊 PAGE → CONTROLLER → DATA MAPPING



\### 1. DASHBOARD PAGE

\*\*Frontend:\*\* `resources/js/Pages/Dashboard.jsx`

\*\*Controller:\*\* `DashboardController@index`

\*\*Route:\*\* `GET /dashboard`



\*\*Data Needed from Backend:\*\*

```json

{

&#x20;   "stats": {

&#x20;       "total\_buildings": 4,

&#x20;       "total\_units": 70,

&#x20;       "active\_tenants": 58,

&#x20;       "monthly\_income": 95000,

&#x20;       "total\_income": 95000,

&#x20;       "total\_expenses": 56800,

&#x20;       "net\_profit": 38200,

&#x20;       "occupancy\_rate": 88

&#x20;   },

&#x20;   "cash\_flow\_data": \[

&#x20;       { "month": "Jan", "income": 75000, "expenses": 45000 },

&#x20;       { "month": "Feb", "income": 82000, "expenses": 50000 }

&#x20;   ],

&#x20;   "recent\_transactions": \[

&#x20;       { "id": 1, "description": "Rent - John Doe", "amount": 15000, "type": "income", "date": "2026-06-15" }

&#x20;   ]

}



2\. BUILDINGS PAGE

Frontend: resources/js/Pages/Buildings/Index.jsx

Controller: BuildingController@index

Route: GET /buildings



Data Needed:



json

{

&#x20;   "buildings": \[

&#x20;       {

&#x20;           "id": 1,

&#x20;           "name": "Sunset Apartments",

&#x20;           "address": "123 Main Street",

&#x20;           "city": "Manila",

&#x20;           "state": "NCR",

&#x20;           "zip\_code": "1000",

&#x20;           "units\_count": 20,

&#x20;           "occupied\_units": 16,

&#x20;           "vacant\_units": 3,

&#x20;           "maintenance\_units": 1,

&#x20;           "monthly\_income": 25000,

&#x20;           "occupancy\_rate": 80,

&#x20;           "status": "active",

&#x20;           "rating": 4.5,

&#x20;           "year\_built": 2015,

&#x20;           "amenities": \["Pool", "Gym", "Parking"],

&#x20;           "insurance\_expiry": "2026-12-31",

&#x20;           "last\_inspection": "2026-05-15"

&#x20;       }

&#x20;   ]

}



3\. TENANTS PAGE

Frontend: resources/js/Pages/Tenants/Index.jsx

Controller: TenantController@index

Route: GET /tenants



Data Needed:



json

{

&#x20;   "tenants": \[

&#x20;       {

&#x20;           "id": 1,

&#x20;           "name": "John Doe",

&#x20;           "email": "john@email.com",

&#x20;           "phone": "+639123456789",

&#x20;           "emergency\_contact": "Jane Doe (+639998887777)",

&#x20;           "building\_id": 1,

&#x20;           "building\_name": "Sunset Apartments",

&#x20;           "unit\_id": 1,

&#x20;           "unit\_number": "Unit 101",

&#x20;           "monthly\_rent": 15000,

&#x20;           "deposit": 15000,

&#x20;           "lease\_start": "2026-01-15",

&#x20;           "lease\_end": "2027-01-14",

&#x20;           "status": "active",

&#x20;           "payment\_status": "paid",

&#x20;           "rating": 4.8,

&#x20;           "background\_check": "Passed",

&#x20;           "documents\_completed": true

&#x20;       }

&#x20;   ]

}



4\. DOCUMENTS PAGE

Frontend: resources/js/Pages/Documents/Index.jsx

Controller: DocumentController@index

Route: GET /documents



Data Needed:



json

{

&#x20;   "documents": \[

&#x20;       {

&#x20;           "id": 1,

&#x20;           "title": "Lease Agreement - John Doe",

&#x20;           "type": "Lease Agreement",

&#x20;           "category": "Lease Agreements",

&#x20;           "tenant\_id": 1,

&#x20;           "tenant\_name": "John Doe",

&#x20;           "building\_id": 1,

&#x20;           "building\_name": "Sunset Apartments",

&#x20;           "unit\_number": "Unit 101",

&#x20;           "generated\_date": "2026-06-15",

&#x20;           "status": "signed",

&#x20;           "file\_size": "245 KB",

&#x20;           "version": "v3",

&#x20;           "expiry\_date": "2027-01-14"

&#x20;       }

&#x20;   ]

}



5\. FINANCE PAGE

Frontend: resources/js/Pages/Finance/Index.jsx

Controller: TransactionController@index

Route: GET /transactions



Data Needed:



json

{

&#x20;   "transactions": \[

&#x20;       {

&#x20;           "id": 1,

&#x20;           "description": "Rent Payment - John Doe",

&#x20;           "category": "Rent",

&#x20;           "type": "income",

&#x20;           "amount": 15000,

&#x20;           "date": "2026-06-15",

&#x20;           "building\_id": 1,

&#x20;           "building\_name": "Sunset Apartments",

&#x20;           "unit\_id": 1,

&#x20;           "unit\_number": "Unit 101",

&#x20;           "status": "completed",

&#x20;           "payment\_method": "Bank Transfer",

&#x20;           "recurring": true

&#x20;       }

&#x20;   ],

&#x20;   "summary": {

&#x20;       "total\_income": 95000,

&#x20;       "total\_expenses": 56800,

&#x20;       "net\_cash\_flow": 38200,

&#x20;       "pending\_amount": 14000

&#x20;   }

}



6\. MESSAGES PAGE

Frontend: resources/js/Pages/Messages/Index.jsx

Controller: MessageController@index

Route: GET /messages



Data Needed:



json

{

&#x20;   "messages": \[

&#x20;       {

&#x20;           "id": 1,

&#x20;           "recipient": "John Doe",

&#x20;           "message": "Rent reminder",

&#x20;           "status": "delivered",

&#x20;           "read": true,

&#x20;           "sent\_at": "2026-06-15 09:00:00"

&#x20;       }

&#x20;   ],

&#x20;   "automation\_rules": \[

&#x20;       {

&#x20;           "id": 1,

&#x20;           "name": "Rent Due Reminder",

&#x20;           "trigger": "3 days before due",

&#x20;           "template\_id": 1,

&#x20;           "status": "active",

&#x20;           "sent\_count": 45

&#x20;       }

&#x20;   ]

}



📋 DATABASE TABLES NEEDED

buildings

sql

CREATE TABLE buildings (

&#x20;   id BIGINT PRIMARY KEY AUTO\_INCREMENT,

&#x20;   name VARCHAR(255) NOT NULL,

&#x20;   address VARCHAR(255) NOT NULL,

&#x20;   city VARCHAR(100) NOT NULL,

&#x20;   state VARCHAR(100) NOT NULL,

&#x20;   zip\_code VARCHAR(20) NOT NULL,

&#x20;   description TEXT,

&#x20;   year\_built INT,

&#x20;   insurance\_expiry DATE,

&#x20;   last\_inspection DATE,

&#x20;   status ENUM('active', 'maintenance') DEFAULT 'active',

&#x20;   created\_at TIMESTAMP,

&#x20;   updated\_at TIMESTAMP

);



units

sql

CREATE TABLE units (

&#x20;   id BIGINT PRIMARY KEY AUTO\_INCREMENT,

&#x20;   building\_id BIGINT NOT NULL,

&#x20;   unit\_number VARCHAR(50) NOT NULL,

&#x20;   type VARCHAR(100),

&#x20;   rent\_amount DECIMAL(10,2) NOT NULL,

&#x20;   status ENUM('vacant', 'occupied', 'maintenance') DEFAULT 'vacant',

&#x20;   FOREIGN KEY (building\_id) REFERENCES buildings(id) ON DELETE CASCADE,

&#x20;   created\_at TIMESTAMP,

&#x20;   updated\_at TIMESTAMP

);



tenants

sql

CREATE TABLE tenants (

&#x20;   id BIGINT PRIMARY KEY AUTO\_INCREMENT,

&#x20;   unit\_id BIGINT NOT NULL,

&#x20;   name VARCHAR(255) NOT NULL,

&#x20;   email VARCHAR(255) NOT NULL,

&#x20;   phone VARCHAR(20) NOT NULL,

&#x20;   emergency\_contact VARCHAR(255),

&#x20;   monthly\_rent DECIMAL(10,2) NOT NULL,

&#x20;   deposit\_amount DECIMAL(10,2) DEFAULT 0,

&#x20;   lease\_start DATE NOT NULL,

&#x20;   lease\_end DATE NOT NULL,

&#x20;   status ENUM('active', 'viewing', 'moved\_out') DEFAULT 'viewing',

&#x20;   rating DECIMAL(2,1) DEFAULT 0,

&#x20;   background\_check VARCHAR(50),

&#x20;   documents\_completed BOOLEAN DEFAULT false,

&#x20;   FOREIGN KEY (unit\_id) REFERENCES units(id) ON DELETE CASCADE,

&#x20;   created\_at TIMESTAMP,

&#x20;   updated\_at TIMESTAMP

);



documents

sql

CREATE TABLE documents (

&#x20;   id BIGINT PRIMARY KEY AUTO\_INCREMENT,

&#x20;   tenant\_id BIGINT,

&#x20;   title VARCHAR(255) NOT NULL,

&#x20;   type VARCHAR(100) NOT NULL,

&#x20;   category VARCHAR(100),

&#x20;   file\_path VARCHAR(255),

&#x20;   version VARCHAR(10) DEFAULT 'v1',

&#x20;   status ENUM('generated', 'signed', 'pending', 'sent') DEFAULT 'generated',

&#x20;   expiry\_date DATE,

&#x20;   FOREIGN KEY (tenant\_id) REFERENCES tenants(id) ON DELETE CASCADE,

&#x20;   created\_at TIMESTAMP,

&#x20;   updated\_at TIMESTAMP

);



transactions

sql

CREATE TABLE transactions (

&#x20;   id BIGINT PRIMARY KEY AUTO\_INCREMENT,

&#x20;   building\_id BIGINT,

&#x20;   unit\_id BIGINT,

&#x20;   description VARCHAR(255) NOT NULL,

&#x20;   category VARCHAR(100) NOT NULL,

&#x20;   type ENUM('income', 'expense') NOT NULL,

&#x20;   amount DECIMAL(10,2) NOT NULL,

&#x20;   date DATE NOT NULL,

&#x20;   status ENUM('completed', 'pending', 'failed') DEFAULT 'completed',

&#x20;   payment\_method VARCHAR(50),

&#x20;   recurring BOOLEAN DEFAULT false,

&#x20;   created\_at TIMESTAMP,

&#x20;   updated\_at TIMESTAMP

);



messages

sql

CREATE TABLE messages (

&#x20;   id BIGINT PRIMARY KEY AUTO\_INCREMENT,

&#x20;   recipient VARCHAR(255),

&#x20;   recipient\_phone VARCHAR(20),

&#x20;   message TEXT NOT NULL,

&#x20;   status ENUM('delivered', 'failed', 'pending') DEFAULT 'pending',

&#x20;   read BOOLEAN DEFAULT false,

&#x20;   sent\_at TIMESTAMP,

&#x20;   created\_at TIMESTAMP

);

automation\_rules

sql

CREATE TABLE automation\_rules (

&#x20;   id BIGINT PRIMARY KEY AUTO\_INCREMENT,

&#x20;   name VARCHAR(255) NOT NULL,

&#x20;   trigger\_condition VARCHAR(255),

&#x20;   template\_id BIGINT,

&#x20;   status ENUM('active', 'inactive') DEFAULT 'active',

&#x20;   sent\_count INT DEFAULT 0,

&#x20;   last\_run TIMESTAMP,

&#x20;   created\_at TIMESTAMP

);



🔗 API ENDPOINTS

Method	URL	Controller	Purpose

GET	/dashboard	DashboardController@index	Dashboard data

GET	/buildings	BuildingController@index	List buildings

GET	/buildings/create	BuildingController@create	Show create form

POST	/buildings	BuildingController@store	Save building

GET	/buildings/{id}	BuildingController@show	Show building

GET	/buildings/{id}/edit	BuildingController@edit	Show edit form

PUT	/buildings/{id}	BuildingController@update	Update building

DELETE	/buildings/{id}	BuildingController@destroy	Delete building

GET	/tenants	TenantController@index	List tenants

POST	/tenants	TenantController@store	Save tenant

GET	/documents	DocumentController@index	List documents

POST	/documents/generate	DocumentController@generate	Generate PDF

GET	/transactions	TransactionController@index	List transactions

POST	/transactions	TransactionController@store	Save transaction

GET	/messages	MessageController@index	List messages

POST	/messages/send	MessageController@send	Send SMS



📝 CONTROLLER TEMPLATES

BuildingController.php

php

<?php

namespace App\\Http\\Controllers;

use Inertia\\Inertia;

use App\\Models\\Building;

use Illuminate\\Http\\Request;



class BuildingController extends Controller

{

&#x20;   public function index()

&#x20;   {

&#x20;       return Inertia::render('Buildings/Index', \[

&#x20;           'buildings' => Building::with('units')->get()

&#x20;       ]);

&#x20;   }



&#x20;   public function store(Request $request)

&#x20;   {

&#x20;       $validated = $request->validate(\[

&#x20;           'name' => 'required|string|max:255',

&#x20;           'address' => 'required|string',

&#x20;           'city' => 'required|string',

&#x20;           'state' => 'required|string',

&#x20;           'zip\_code' => 'required|string',

&#x20;       ]);

&#x20;       Building::create($validated);

&#x20;       return redirect()->route('buildings.index');

&#x20;   }

}



✅ CHECKLIST FOR BACKEND PARTNER

□ Create all migrations

□ Create all models

□ Create all controllers

□ Define all routes

□ Return data with correct keys

□ Test each endpoint

□ Ensure Inertia::render() matches page names

📚 RESOURCES

Inertia.js: https://inertiajs.com



Laravel: https://laravel.com/docs



text



\---



\## ✅ SAVE



Press `Ctrl+S` and close.



\---



\## 📋 VERIFY



```powershell

dir "D:\\Code Kozeii\\rentcorev3\\BACKEND\_MAPPING.md"

