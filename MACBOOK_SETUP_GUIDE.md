\# 🍎 MACBOOK SETUP GUIDE

\# RentalCore v3 - Complete Installation Instructions



\---



\## 📋 PREREQUISITES CHECK



Before starting, check what's already installed:



```bash

\# Check PHP

php --version



\# Check Composer

composer --version



\# Check Node.js

node --version



\# Check npm

npm --version



\# Check MySQL

mysql --version



\# Check Homebrew

brew --version

🔧 STEP 1: INSTALL HOMEBREW (If Not Installed)

Homebrew is the package manager for macOS.



bash

\# Install Homebrew

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"



\# After installation, add to PATH (if needed)

echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> \~/.zprofile

eval "$(/opt/homebrew/bin/brew shellenv)"



\# Verify

brew --version

🐘 STEP 2: INSTALL PHP 8.2+

bash

\# Install PHP

brew install php@8.2



\# Add to PATH

echo 'export PATH="/opt/homebrew/opt/php@8.2/bin:$PATH"' >> \~/.zshrc

source \~/.zshrc



\# Verify

php --version

\# Should show: PHP 8.2.x

📦 STEP 3: INSTALL COMPOSER

bash

\# Install Composer

brew install composer



\# Verify

composer --version

\# Should show: Composer version 2.x

🟢 STEP 4: INSTALL NODE.JS \& NPM

bash

\# Install Node.js (includes npm)

brew install node@20



\# Or install via nvm (recommended)

brew install nvm

mkdir \~/.nvm

echo 'export NVM\_DIR="$HOME/.nvm"' >> \~/.zshrc

echo '\[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] \&\& \\. "/opt/homebrew/opt/nvm/nvm.sh"' >> \~/.zshrc

source \~/.zshrc



\# Install Node 20

nvm install 20

nvm use 20



\# Verify

node --version

npm --version

🗄️ STEP 5: INSTALL MYSQL

Option A: MySQL via Homebrew

bash

\# Install MySQL

brew install mysql



\# Start MySQL

brew services start mysql



\# Secure installation (optional)

mysql\_secure\_installation



\# Verify

mysql --version

Option B: Use SQLite (Simpler - No MySQL Needed)

If you don't want to install MySQL, use SQLite:



bash

\# No installation needed - SQLite is built into PHP

\# Just configure .env later with:

\# DB\_CONNECTION=sqlite

Option C: Use DBngin (GUI Tool - Easiest)

Download DBngin: https://dbngin.com



Install and open



Click "Create Server"



Select MySQL 8.x



Click "Start"



🎨 STEP 6: INSTALL VALET (Optional - Alternative to php artisan serve)

Laravel Valet makes development easier on Mac:



bash

\# Install Valet

composer global require laravel/valet



\# Add to PATH

echo 'export PATH="$HOME/.composer/vendor/bin:$PATH"' >> \~/.zshrc

source \~/.zshrc



\# Install Valet

valet install



\# Park your projects folder

mkdir \~/Sites

cd \~/Sites

valet park

📁 STEP 7: GET THE PROJECT

Option A: Clone from Git (if repo exists)

bash

\# Clone the repository

cd \~/Sites  # or any folder you prefer

git clone \[YOUR\_REPO\_URL] rentcorev3

cd rentcorev3

Option B: Copy from USB/Drive

bash

\# Copy project folder to your Mac

cp -r /path/to/rentcorev3 \~/Sites/rentcorev3

cd \~/Sites/rentcorev3

Option C: Fresh Laravel Install

bash

\# Create project

composer create-project laravel/laravel rentcorev3

cd rentcorev3

⚙️ STEP 8: CONFIGURE ENVIRONMENT

bash

\# Navigate to project

cd rentcorev3



\# Copy .env file

cp .env.example .env



\# Generate app key

php artisan key:generate



\# Open .env in editor

nano .env

\# Or use VS Code: code .env

Edit .env with your database settings:



If using MySQL:

env

DB\_CONNECTION=mysql

DB\_HOST=127.0.0.1

DB\_PORT=3306

DB\_DATABASE=rentcorev3

DB\_USERNAME=root

DB\_PASSWORD=your\_password\_here

If using SQLite (simpler):

env

DB\_CONNECTION=sqlite

\# Comment out other DB settings

For SQLite, create the database file:



bash

touch database/database.sqlite

💾 STEP 9: CREATE DATABASE (MySQL Only)

bash

\# Login to MySQL

mysql -u root -p



\# Create database

CREATE DATABASE rentcorev3;



\# Exit

EXIT;

📦 STEP 10: INSTALL BACKEND DEPENDENCIES

bash

\# Install PHP packages

composer install



\# If composer.lock doesn't exist:

composer update



\# Install Laravel Breeze (Authentication)

composer require laravel/breeze --dev

php artisan breeze:install react



\# Install additional packages

composer require barryvdh/laravel-dompdf twilio/sdk

📦 STEP 11: INSTALL FRONTEND DEPENDENCIES

bash

\# Install npm packages

npm install



\# If peer dependency errors:

npm install --legacy-peer-deps



\# Install additional frontend packages

npm install recharts @heroicons/react date-fns react-hook-form zod @hookform/resolvers chart.js react-chartjs-2 --legacy-peer-deps

🗄️ STEP 12: RUN MIGRATIONS

bash

\# Run database migrations

php artisan migrate



\# Fresh migration (if needed)

php artisan migrate:fresh

🚀 STEP 13: START DEVELOPMENT SERVERS

Open TWO terminals:



Terminal 1 - Laravel Backend:

bash

cd rentcorev3

php artisan serve

\# Output: http://127.0.0.1:8000

Terminal 2 - Vite Frontend:

bash

cd rentcorev3

npm run dev

\# Output: http://localhost:5173

🌐 STEP 14: ACCESS THE APPLICATION

Open browser and visit:



http://localhost:8000



Or if using Valet:

http://rentcorev3.test



🔧 COMMON ISSUES \& FIXES

Issue 1: PHP not found

bash

\# Check if PHP is in PATH

which php



\# If not, add to .zshrc

echo 'export PATH="/opt/homebrew/opt/php@8.2/bin:$PATH"' >> \~/.zshrc

source \~/.zshrc

Issue 2: Composer not found

bash

\# Check Composer location

which composer



\# If not found:

brew install composer

Issue 3: Permission denied on storage

bash

\# Fix permissions

chmod -R 775 storage bootstrap/cache

Issue 4: MySQL connection refused

bash

\# Start MySQL

brew services start mysql



\# Or check if running

brew services list

Issue 5: Port 8000 already in use

bash

\# Use different port

php artisan serve --port=8001



\# Or kill process

lsof -ti:8000 | xargs kill -9

Issue 6: npm install fails

bash

\# Clear npm cache

npm cache clean --force



\# Delete node\_modules

rm -rf node\_modules package-lock.json



\# Reinstall

npm install --legacy-peer-deps

Issue 7: Vite not loading

bash

\# Clear Vite cache

rm -rf node\_modules/.vite



\# Restart

npm run dev

✅ VERIFY INSTALLATION

Run these commands to verify everything works:



bash

\# Check all tools

php --version

composer --version

node --version

npm --version

mysql --version



\# Check Laravel

php artisan --version



\# Check routes

php artisan route:list

📋 QUICK COMMANDS CHEAT SHEET

bash

\# Start servers

php artisan serve        # Terminal 1

npm run dev             # Terminal 2



\# Database

php artisan migrate     # Run migrations

php artisan migrate:fresh  # Reset database



\# Clear cache

php artisan cache:clear

php artisan config:clear

php artisan route:clear



\# Create files

php artisan make:model Name -m

php artisan make:controller Name

php artisan make:migration create\_table\_name



\# Check logs

tail -f storage/logs/laravel.log

🎯 PROJECT SPECIFIC COMMANDS

bash

\# Create all models

php artisan make:model Building -m

php artisan make:model Unit -m

php artisan make:model Tenant -m

php artisan make:model Document -m

php artisan make:model Transaction -m

php artisan make:model Message -m



\# Create all controllers

php artisan make:controller DashboardController

php artisan make:controller BuildingController

php artisan make:controller TenantController

php artisan make:controller DocumentController

php artisan make:controller TransactionController

php artisan make:controller MessageController



\# Run migrations

php artisan migrate

📱 TWILIO SMS CONFIGURATION (Optional)

If using SMS features:



Create account at https://twilio.com



Get SID and Auth Token



Add to .env:



env

TWILIO\_SID=your\_sid\_here

TWILIO\_AUTH\_TOKEN=your\_token\_here

TWILIO\_PHONE\_NUMBER=+1234567890

📄 PDF GENERATION (Already Installed)

DomPDF is already included via composer. No additional setup needed.



✅ SUCCESS CHECKLIST

□ PHP 8.2+ installed

□ Composer installed

□ Node.js 20+ installed

□ MySQL installed (or SQLite configured)

□ Project cloned/copied

□ .env configured

□ Database created

□ composer install ran

□ npm install ran

□ Migrations ran

□ Both servers running

□ Can access http://localhost:8000

🆘 GETTING HELP

If you encounter issues:



Check Laravel logs: storage/logs/laravel.log



Check terminal errors



Clear cache: php artisan cache:clear



Restart servers



Contact backend team



📚 RESOURCES

Laravel Docs



Inertia.js Docs



React Docs



Homebrew



Valet



text



\---



\## ✅ SAVE



1\. Press `Ctrl+S`

2\. Close Notepad



\---



\## 📋 VERIFY



```powershell

dir "D:\\Code Kozeii\\rentcorev3\\MACBOOK\_SETUP\_GUIDE.md"

