<?php

namespace App\Http\Controllers;

use App\Models\Planta;
use App\Traits\ApiResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PlantaController extends Controller
{
    use ApiResponses;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Planta::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $plantaData = $request->validate([
            'name' => ['string', 'required'],
            'frequencia' => ['string', 'required'],
            'quantidade_frequencia' => ['integer', 'required'],
            'adubo' => ['string', 'required'],
        ]);
        $planta = new Planta($plantaData);
        $user = $request->user();
        $user->planta()->save($planta);
        
        return $this->ok(['created']);        
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        dd($request);
        return $request;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Planta $planta)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $planta = Planta::findOrFail($id);

        $validatedData = $request->validate([
            'name' => ['string', 'required'],
            'frequencia' => ['string', 'required'],
            'quantidade_frequencia' => ['integer', 'required'],
            'adubo' => ['string', 'required'],
        ]);

        error_log($planta);
        $planta->update($validatedData);

        error_log($request);

        return response()->json(['message' => 'Planta atualizada com sucesso!', 'planta' => $planta], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $deleted = DB::table('planta')->where('id', '=', $id)->delete();

        return $this->ok('deleted');
    }
}
