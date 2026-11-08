import { useState, useEffect } from "react";
import { fetchJSON } from "../lib/api";

export default function MahasiswaForm({ editing, onSaved, onCancel }) {
  const [form, setForm] = useState({ nim: "", nama: "", bidang_prodi: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm(editing);
    } else {
      setForm({ nim: "", nama: "", bidang_prodi: "" });
    }
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      if (editing && editing.id) {
        await fetchJSON(`/mahasiswa/${editing.id}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      } else {
        await fetchJSON("/mahasiswa", {
          method: "POST",
          body: JSON.stringify(form),
        });
      }
      onSaved();
    } catch (err) {
      if (err.errors) setErrors(err.errors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded-lg space-y-4 font-sans text-gray-800"
    >
      <h2 className="text-lg flex items-center justify-center font-bold mb-2">
        {editing ? "Edit Data Mahasiswa" : "Tambah Data Mahasiswa"}
      </h2>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          NIM
        </label>
        <input
          name="nim"
          value={form.nim}
          onChange={handleChange}
          placeholder="Masukkan NIM"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.nim && (
          <p className="text-red-500 text-sm mt-1">{errors.nim[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Nama
        </label>
        <input
          name="nama"
          value={form.nama}
          onChange={handleChange}
          placeholder="Masukkan nama mahasiswa"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.nama && (
          <p className="text-red-500 text-sm mt-1">{errors.nama[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Bidang Prodi
        </label>
        <input
          name="bidang_prodi"
          value={form.bidang_prodi}
          onChange={handleChange}
          placeholder="Masukkan bidang prodi"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.bidang_prodi && (
          <p className="text-red-500 text-sm mt-1">
            {errors.bidang_prodi[0]}
          </p>
        )}
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
