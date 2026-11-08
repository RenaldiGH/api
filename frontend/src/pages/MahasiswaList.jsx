import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchJSON } from '../lib/api';
import MahasiswaList from '../components/MahasiswaList';
import ConfirmModal from '../components/ConfirmModal';
import toast from 'react-hot-toast';

export default function MahasiswaListPage() {
  const [data, setData] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetchJSON("/mahasiswa");
      setData(res);
    } catch {
      toast.error("Gagal memuat data!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

 const handleDelete = async () => {
  const target = deleteTarget;
  if (!target) return;
  setDeleteTarget(null);
  try {
    await fetchJSON(`/mahasiswa/${target.id}`, { method: "DELETE" });
    toast.success("Data berhasil dihapus!");
    loadData();
  } catch {
    toast.error("Gagal menghapus data!");
  }
};

  return (
    <div>


      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold text-white mb-2 sm:mb-0">
              Data Mahasiswa
            </h2>

            <div className="flex items-center space-x-2">
              <Link
                to="/form"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mt-4 sm:mt-0"
              > <span className="text-white">+ Tambah Mahasiswa</span>
              </Link>
              <button
                onClick={loadData}
                className="inline-flex items-center px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <MahasiswaList
              data={data}
              onEdit={(mhs) => window.location.href = `/form/${mhs.id}`}
              onDelete={setDeleteTarget}
            />
          )}
        </div>
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Konfirmasi Hapus Data"
        message={
          deleteTarget
            ? `Apakah Anda yakin ingin menghapus data mahasiswa "${deleteTarget.nama}"? Tindakan ini tidak dapat dibatalkan.`
            : ""
        }
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
