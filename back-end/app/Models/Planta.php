<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Planta extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'planta';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'adubo',
        'frequecia',
        'quantidade_frequencia',
    ];

    public function evento(): HasMany
    {

        return $this->HasMany(Evento::class);

    }
}
