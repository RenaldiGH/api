<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mahasiswa extends Model
{
    use HasFactory;
    protected $table = 'mahasiswas';
    protected $primarykey = 'id_mahasiswa';
    protected $fillable = ['nim', 'nama', 'bidang_prodi'];

    

}
