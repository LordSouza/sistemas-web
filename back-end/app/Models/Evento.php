<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Evento extends Model
{ 
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'evento';
    
    protected $fillable = [
        'disparar',
    ];
}
