<?php

use App\Models\User;
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
        Schema::create('planta', function (Blueprint $table) {

            $table->id();
            $table->string('name');
            $table->enum('adubo', ['organico', 'organomineral', 'mineral']);
            $table->enum('frequencia', ['dia', 'semana', 'mes']);
            $table->integer('quantidade_frequencia');
            $table->foreignIdFor(User::class);
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::drop('planta');
    }
};
