/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchJSON } from '../lib/api';
import MahasiswaForm from '../components/MahasiswaForm';
import toast from 'react-hot-toast';

export default function MahasiswaFormPage({ editing }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editingData, setEditingData] = useState(null);
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  const loadData = async () => {
    try {
      const data = await fetchJSON(`/mahasiswa/${id}`);
      setEditingData(data);
    } catch {
      toast.error('Gagal memuat data mahasiswa!');
      navigate('/list');
    } finally {
      setLoading(false);
    }
  };

  const handleSaved = () => {
    toast.success('Data berhasil disimpan!');
    navigate('/list');
  };

  const handleCancel = () => {
    navigate('/list');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
            <h2 className="text-xl font-bold text-white">
              {editing ? "Edit Data Mahasiswa" : "Tambah Data Mahasiswa"}
            </h2>
          </div>
          <div className="p-6">
            <MahasiswaForm
              editing={editingData}
              onSaved={handleSaved}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
