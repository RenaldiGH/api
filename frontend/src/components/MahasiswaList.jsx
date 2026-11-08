export default function MahasiswaList({ data, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-lg font-sans text-gray-800">
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-2 border border-gray-300 font-semibold text-left">NIM</th>
            <th className="p-2 border border-gray-300 font-semibold text-left">Nama</th>
            <th className="p-2 border border-gray-300 font-semibold text-left">Bidang Prodi</th>
            <th className="p-2 border border-gray-300 font-semibold text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                Belum ada data
              </td>
            </tr>
          ) : (
            data.map((mhs) => (
              <tr
                key={mhs.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="p-2 border border-gray-300">{mhs.nim}</td>
                <td className="p-2 border border-gray-300">{mhs.nama}</td>
                <td className="p-2 border border-gray-300">{mhs.bidang_prodi}</td>
                <td className="p-2 border border-gray-300 text-center space-x-2">
                  <button
                    onClick={() => onEdit(mhs)}
                    className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(mhs)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
