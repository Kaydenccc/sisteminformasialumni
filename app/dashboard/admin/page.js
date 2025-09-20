"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import EditAlumniForm from "@/components/EditAlumniForm";
import AddAlumniForm from "@/components/admin/AddAlumniForm";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function AdminDashboard() {
  const [alumniList, setAlumniList] = useState([]);
  const router = useRouter();
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAngkatan, setFilterAngkatan] = useState("");
  const [filterInstansi, setFilterInstansi] = useState("");
  const [filterDomisili, setFilterDomisili] = useState("");

  // 🔹 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // tampilkan 10 per halaman

  const fetchAlumni = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const data = [];
    querySnapshot.forEach((doc) => {
      const item = doc.data();
      if (item.role === "alumni") {
        data.push({ uid: doc.id, ...item });
      }
    });
    setAlumniList(data);
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const filteredAlumni = alumniList.filter((alumni) => {
    const searchMatch =
      alumni.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const angkatanMatch = filterAngkatan
      ? alumni.angkatan?.toLowerCase().includes(filterAngkatan.toLowerCase())
      : true;

    const instansiMatch = filterInstansi
      ? alumni.instansi?.toLowerCase().includes(filterInstansi.toLowerCase())
      : true;

    const domisiliMatch = filterDomisili
      ? alumni.domisili?.toLowerCase().includes(filterDomisili.toLowerCase())
      : true;

    return searchMatch && angkatanMatch && instansiMatch && domisiliMatch;
  });

  // 🔹 Hitung data untuk pagination
  const totalPages = Math.ceil(filteredAlumni.length / itemsPerPage);
  const paginatedAlumni = filteredAlumni.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 🔹 Export ke Excel (berdasarkan data yang difilter)
  const handleExportExcel = () => {
    if (filteredAlumni.length === 0) {
      alert("❌ Tidak ada data untuk diexport.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(filteredAlumni);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Alumni");
    XLSX.writeFile(workbook, "data-alumni.xlsx");
  };

  // 🔹 Export ke PDF (berdasarkan data yang difilter)
  const handleExportPDF = () => {
    if (filteredAlumni.length === 0) {
      alert("❌ Tidak ada data untuk diexport.");
      return;
    }

    const doc = new jsPDF();

    autoTable(doc, {
      head: [["Nama", "NISN", "Angkatan", "Instansi", "Domisili", "No HP"]],
      body: filteredAlumni.map((item) => [
        item.fullName,
        item.nisn,
        item.angkatan,
        item.instansi,
        item.domisili,
        item.noHP,
      ]),
      startY: 20,
    });

    doc.save("data-alumni.pdf");
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6 text-black">Dashboard Admin</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="bg-gray-700 px-4 mb-6 rounded cursor-pointer border-2 border-gray-200"
        >
          Logout
        </button>
      </div>

      {selectedAlumni ? (
        <EditAlumniForm
          initialData={selectedAlumni}
          onClose={() => {
            setSelectedAlumni(null);
            fetchAlumni(); // refresh data setelah edit
          }}
        />
      ) : showAddForm ? (
        <AddAlumniForm
          onClose={() => {
            setShowAddForm(false);
            fetchAlumni(); // refresh setelah tambah
          }}
        />
      ) : (
        <>
          {/* Filter UI */}
          <div className="mb-4 flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Cari nama atau email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded w-64 text-black"
            />
            <input
              type="text"
              placeholder="Filter angkatan"
              value={filterAngkatan}
              onChange={(e) => setFilterAngkatan(e.target.value)}
              className="p-2 border rounded w-40 text-black"
            />
            <input
              type="text"
              placeholder="Filter instansi"
              value={filterInstansi}
              onChange={(e) => setFilterInstansi(e.target.value)}
              className="p-2 border rounded w-40 text-black"
            />
            <input
              type="text"
              placeholder="Filter domisili"
              value={filterDomisili}
              onChange={(e) => setFilterDomisili(e.target.value)}
              className="p-2 border rounded w-40 text-black"
            />
          </div>

          {/* Tabel Alumni */}
          <table className="w-full border bg-white rounded-xl shadow-md">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">Nama</th>
                <th className="p-3 text-left">NISN</th>
                <th className="p-3 text-left">Angkatan</th>
                <th className="p-3 text-left">Instansi</th>
                <th className="p-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAlumni.map((alumni) => (
                <tr
                  key={alumni.uid}
                  className="border-t text-black hover:bg-gray-300 cursor-pointer"
                >
                  <td
                    className="p-3"
                    onClick={() =>
                      router.push(`/dashboard/admin/alumni/${alumni.uid}`)
                    }
                  >
                    {alumni.fullName}
                  </td>
                  <td
                    className="p-3"
                    onClick={() =>
                      router.push(`/dashboard/admin/alumni/${alumni.uid}`)
                    }
                  >
                    {alumni.nisn}
                  </td>
                  <td
                    className="p-3"
                    onClick={() =>
                      router.push(`/dashboard/admin/alumni/${alumni.uid}`)
                    }
                  >
                    {alumni.angkatan}
                  </td>
                  <td
                    className="p-3"
                    onClick={() =>
                      router.push(`/dashboard/admin/alumni/${alumni.uid}`)
                    }
                  >
                    {alumni.instansi}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedAlumni(alumni)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {filteredAlumni.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    Tidak ada data alumni.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* 🔹 Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-2 text-black">
                Halaman {currentPage} dari {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Tombol Export & Tambah */}
      <div className="flex gap-4 mb-4 mt-4">
        <button
          onClick={handleExportExcel}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Export ke Excel
        </button>
        <button
          onClick={handleExportPDF}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Export ke PDF
        </button>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Tambah Alumni
        </button>
      </div>
    </div>
  );
}
