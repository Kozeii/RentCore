\# 🔗 BACKEND-FRONTEND CONNECTION GUIDE

\# RentalCore v3 - Rental Property Management System



\---



\## 🛠️ TOOLS \& TECHNOLOGIES



\### Backend (Your Responsibility)

| Tool | Version | Purpose |

|------|---------|---------|

| PHP | 8.2+ | Server-side language |

| Laravel | 11.x | PHP Framework |

| Composer | 2.x | PHP package manager |

| MySQL | 8.x | Database |

| Inertia.js (Laravel adapter) | 1.x | Connects to React |

| Laravel Breeze | 2.x | Authentication |



\### Frontend (Already Built)

| Tool | Version | Purpose |

|------|---------|---------|

| React | 18.x | UI Framework |

| Inertia.js (React) | 1.x | Laravel bridge |

| Tailwind CSS | 3.x | Styling |

| Vite | 5.x | Build tool |

| Heroicons | 2.x | Icons |

| Chart.js | 4.x | Charts |



\---



\## 📁 PROJECT STRUCTURE

rentcorev3/

├── app/

│ ├── Http/

│ │ └── Controllers/ # YOU CREATE THESE

│ │ ├── DashboardController.php

│ │ ├── BuildingController.php

│ │ ├── TenantController.php

│ │ ├── DocumentController.php

│ │ ├── TransactionController.php

│ │ └── MessageController.php

│ ├── Models/ # YOU CREATE THESE

│ │ ├── Building.php

│ │ ├── Unit.php

│ │ ├── Tenant.php

│ │ ├── Document.php

│ │ ├── Transaction.php

│ │ └── Message.php

├── database/

│ └── migrations/ # YOU CREATE THESE

│ ├── create\_buildings\_table.php

│ ├── create\_units\_table.php

│ ├── create\_tenants\_table.php

│ ├── create\_documents\_table.php

│ ├── create\_transactions\_table.php

│ └── create\_messages\_table.php

├── routes/

│ └── web.php # YOU DEFINE ROUTES HERE

├── resources/

│ └── js/

│ └── Pages/ # ALREADY BUILT (FRONTEND)

│ ├── Dashboard.jsx

│ ├── Buildings/

│ │ ├── Index.jsx

│ │ ├── Create.jsx

│ │ └── Edit.jsx

│ ├── Tenants/

│ │ ├── Index.jsx

│ │ └── Create.jsx

│ ├── Documents/

│ │ └── Index.jsx

│ ├── Finance/

│ │ ├── Index.jsx

│ │ └── Create.jsx

│ └── Messages/

│ └── Index.jsx

└── .env # DATABASE CONFIG HERE



text



\---



\## 🔗 HOW FRONTEND CONNECTS TO BACKEND



\### 1. Inertia.js Bridge



The frontend (React) talks to the backend (Laravel) through \*\*Inertia.js\*\*.



\*\*Flow:\*\*

React Component → Sends Request → Laravel Route → Controller → Database

↓

React Component ← Receives Data ← Inertia Response



text



\### 2. Route Definition (routes/web.php)



```php

// YOU define routes. Frontend already has matching pages.



Route::get('/buildings', \[BuildingController::class, 'index'])

&#x20;   ->name('buildings.index');

3\. Controller Returns Inertia Response

php

// In your Controller:

public function index()

{

&#x20;   return Inertia::render('Buildings/Index', \[

&#x20;       'buildings' => Building::all()  // Data passed to React

&#x20;   ]);

}

4\. React Component Receives Data

jsx

// resources/js/Pages/Buildings/Index.jsx

export default function Index({ buildings }) {

&#x20;   // 'buildings' prop comes from your Controller

&#x20;   return (

&#x20;       <div>

&#x20;           {buildings.map(b => <div>{b.name}</div>)}

&#x20;       </div>

&#x20;   );

}



📊 PAGE MAPPING (Controller → React Page)

Route URL	Controller Method	React Page File

/dashboard	DashboardController@index	Pages/Dashboard.jsx

/buildings	BuildingController@index	Pages/Buildings/Index.jsx

/buildings/create	BuildingController@create	Pages/Buildings/Create.jsx

/buildings/{id}/edit	BuildingController@edit	Pages/Buildings/Edit.jsx

/tenants	TenantController@index	Pages/Tenants/Index.jsx

/tenants/create	TenantController@create	Pages/Tenants/Create.jsx

/documents	DocumentController@index	Pages/Documents/Index.jsx

/transactions	TransactionController@index	Pages/Finance/Index.jsx

/transactions/create	TransactionController@create	Pages/Finance/Create.jsx

/messages	MessageController@index	Pages/Messages/Index.jsx



📋 WHAT YOU NEED TO CREATE

1\. Controllers (app/Http/Controllers/)

bash

php artisan make:controller DashboardController

php artisan make:controller BuildingController

php artisan make:controller TenantController

php artisan make:controller DocumentController

php artisan make:controller TransactionController

php artisan make:controller MessageController

2\. Models (app/Models/)

bash

php artisan make:model Building -m

php artisan make:model Unit -m

php artisan make:model Tenant -m

php artisan make:model Document -m

php artisan make:model Transaction -m

php artisan make:model Message -m

3\. Database Tables

Run migrations after creating them:



bash

php artisan migrate

📝 CONTROLLER TEMPLATE

php

<?php



namespace App\\Http\\Controllers;



use Inertia\\Inertia;

use App\\Models\\Building;

use Illuminate\\Http\\Request;



class BuildingController extends Controller

{

&#x20;   // LIST - GET /buildings

&#x20;   public function index()

&#x20;   {

&#x20;       return Inertia::render('Buildings/Index', \[

&#x20;           'buildings' => Building::all()

&#x20;       ]);

&#x20;   }



&#x20;   // SHOW CREATE FORM - GET /buildings/create

&#x20;   public function create()

&#x20;   {

&#x20;       return Inertia::render('Buildings/Create');

&#x20;   }



&#x20;   // SAVE - POST /buildings

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



&#x20;       return redirect()->route('buildings.index')->with('success', 'Building added!');

&#x20;   }



&#x20;   // SHOW ONE - GET /buildings/{id}

&#x20;   public function show(Building $building)

&#x20;   {

&#x20;       return Inertia::render('Buildings/Show', \[

&#x20;           'building' => $building

&#x20;       ]);

&#x20;   }



&#x20;   // SHOW EDIT FORM - GET /buildings/{id}/edit

&#x20;   public function edit(Building $building)

&#x20;   {

&#x20;       return Inertia::render('Buildings/Edit', \[

&#x20;           'building' => $building

&#x20;       ]);

&#x20;   }



&#x20;   // UPDATE - PUT /buildings/{id}

&#x20;   public function update(Request $request, Building $building)

&#x20;   {

&#x20;       $building->update($request->all());

&#x20;       return redirect()->route('buildings.index');

&#x20;   }



&#x20;   // DELETE - DELETE /buildings/{id}

&#x20;   public function destroy(Building $building)

&#x20;   {

&#x20;       $building->delete();

&#x20;       return redirect()->route('buildings.index');

&#x20;   }

}

📝 MODEL TEMPLATE

php

<?php



namespace App\\Models;



use Illuminate\\Database\\Eloquent\\Model;



class Building extends Model

{

&#x20;   protected $fillable = \[

&#x20;       'name',

&#x20;       'address',

&#x20;       'city',

&#x20;       'state',

&#x20;       'zip\_code',

&#x20;       'description',

&#x20;   ];

}

📝 MIGRATION TEMPLATE

php

<?php



use Illuminate\\Database\\Migrations\\Migration;

use Illuminate\\Database\\Schema\\Blueprint;

use Illuminate\\Support\\Facades\\Schema;



return new class extends Migration

{

&#x20;   public function up(): void

&#x20;   {

&#x20;       Schema::create('buildings', function (Blueprint $table) {

&#x20;           $table->id();

&#x20;           $table->string('name');

&#x20;           $table->string('address');

&#x20;           $table->string('city');

&#x20;           $table->string('state');

&#x20;           $table->string('zip\_code');

&#x20;           $table->text('description')->nullable();

&#x20;           $table->timestamps();

&#x20;       });

&#x20;   }



&#x20;   public function down(): void

&#x20;   {

&#x20;       Schema::dropIfExists('buildings');

&#x20;   }

};



🔧 SETUP COMMANDS

bash

\# 1. Install dependencies

composer install



\# 2. Configure .env

DB\_CONNECTION=mysql

DB\_HOST=127.0.0.1

DB\_PORT=3306

DB\_DATABASE=rentcorev3

DB\_USERNAME=root

DB\_PASSWORD=



\# 3. Generate key

php artisan key:generate



\# 4. Run migrations

php artisan migrate



\# 5. Start server

php artisan serve

✅ TESTING CONNECTION

Start Laravel: php artisan serve



Start Vite: npm run dev



Visit: http://localhost:8000/dashboard



If you see the dashboard, connection works!



🚨 COMMON ERRORS

500 Error on page

Check controller exists



Check model exists



Check migration ran



Check Laravel logs: storage/logs/laravel.log



Page not found

Check route exists: php artisan route:list



Check React page file exists in correct folder



Database error

Check .env database settings



Check MySQL is running



Check database exists



📚 RESOURCES

Laravel Docs: https://laravel.com/docs



Inertia.js: https://inertiajs.com



React Docs: https://react.dev



text



\---



\## ✅ SAVE



1\. Press `Ctrl+S` in Notepad

2\. Close Notepad



\---



\## 📋 VERIFY



```powershell

dir "D:\\Code Kozeii\\rentcorev3\\CONNECTION\_GUIDE.md"

