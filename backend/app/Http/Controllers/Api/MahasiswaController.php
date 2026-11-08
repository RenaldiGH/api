<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MahasiswaController extends Controller
{
    public function index()
    {
        return response()->json(Mahasiswa::all(), 200);
    }

    public function show($id)
    {
        $mhs = Mahasiswa::find($id);
        if (!$mhs) {
            return response()->json(['error' => 'Data tidak ditemukan'], 404);
        }
        return response()->json($mhs, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nim' => 'required|unique:mahasiswas,nim',
            'nama' => 'required|string|max:255',
            'bidang_prodi' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $mhs = Mahasiswa::create($request->all());
        return response()->json($mhs, 201);
    }

    public function update(Request $request, $id)
    {
        $mhs = Mahasiswa::find($id);
        if (!$mhs) {
            return response()->json(['error' => 'Data tidak ditemukan'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nim' => 'required|unique:mahasiswas,nim,' . $id . ',id',
            'nama' => 'required|string|max:255',
            'bidang_prodi' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $mhs->update($request->all());
        return response()->json($mhs, 200);
    }

    public function destroy($id)
    {
        $mahasiswa = Mahasiswa::findOrFail($id);
        $mahasiswa->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }

}
