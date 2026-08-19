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
        Schema::create('tenants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('building_id')->nullable()->constrained('buildings')->nullOnDelete();
            $table->foreignId('unit_id')->nullable()->constrained('units')->nullOnDelete();
            $table->string('full_name');
            $table->string('email');
            $table->string('phone');
            $table->string('status')->default('viewing');
            $table->decimal('monthly_rent', 10, 2)->nullable();
            $table->decimal('deposit', 10, 2)->nullable();
            $table->date('lease_start')->nullable();
            $table->date('lease_end')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tenants');
    }
};
