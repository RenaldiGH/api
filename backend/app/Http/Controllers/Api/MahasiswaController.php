<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use app\Models\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MahasiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       return response()->json(Mahasiswa::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function show($id)
    {
        $mhs = Mahasiswa::find ($id);
            if (!mhs){
                return response()->json(['error'=> 'data tidak di temukan'], 404);
            }
            return response()->json($mhs, 200);
    }

    /**
     * Display the specified resource.
     */
    public function store(Request $request)
    {
        $validator = Validator::make(request->all(),[
            'nim' => 'required|unique:mahasiswas,nim',
            'nama' => 'required|string|max:200',
            'bidang_prodi' => 'required|string|max:200',
        ]);
        if ($validator->fails()){
            return response()->json([errors => $validator->errors()],422 );
        }
        $mhs->update($request->all());
        return response()->json($mhs, 200);
    }

    /**                                 
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $mhs = Mahasiswa::find($id);
        if (!$mhs){
            return response()->json(['error'=> 'data tidak di temukan'], 404);

    }

    $validator = Validator::make(request->all(),[
            'nim' => 'required|unique:mahasiswas,nim',
            'nama' => 'required|string|max:200',
            'bidang_prodi' => 'required|string|max:200',
        ]);

        if ($validator->fails()){
            return response()->json([errors => $validator->errors()],422 );
        }

        $mhs->update($request->all());
        return response()->json($mhs, 200);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $mahasiswa = Mahasiswa::findOrFail($id);
        $mahasiswa->delete();
        return response()->json(['message' => 'Data berhasil dihapus'], 200);
    }
}
