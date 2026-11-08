import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchJSON } from '../lib/api';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, loading: true });

  const loadStats = async () => {
    try {
      const data = await fetchJSON('/mahasiswa');
      setStats({ total: data.length, loading: false });
    } catch {
      toast.error('Gagal memuat data!');
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Dashboard Mahasiswa
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Selamat datang di sistem manajemen data mahasiswa
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-transform">
          <div className="flex items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Mahasiswa</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.loading ? "..." : stats.total}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/form" className="block">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Tambah Mahasiswa Baru</h3>
                <p className="text-gray-600">Input data mahasiswa baru ke dalam sistem</p>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/list" className="block">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Lihat Daftar Mahasiswa</h3>
                <p className="text-gray-600">Kelola dan edit data mahasiswa yang sudah terdaftar</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
