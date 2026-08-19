<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained('tenants')->cascadeOnDelete();
            $table->foreignId('unit_id')->nullable()->constrained('units')->nullOnDelete();
            $table->string('type'); // Rent, Deposit, Late Fee, Maintenance, Utility
            $table->decimal('amount', 10, 2);
            $table->string('status')->default('Pending'); // Paid, Pending, Overdue, Cancelled
            $table->string('payment_method')->nullable(); // GCash, Bank Transfer, Cash, Check
            $table->date('due_date');
            $table->date('paid_at')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
