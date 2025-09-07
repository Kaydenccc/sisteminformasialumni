"use client";
import { useState } from "react";
import { db } from "@/firebase/config";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

export default function EditAlumniForm({ initialData, onClose }) {
  const [formData, setFormData] = useState({ ...initialData });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const ref = doc(db, "users", formData.uid);
      await updateDoc(ref, {
        nisn: formData.nisn,
        fullName: formData.fullName,
        email: formData.email,
        angkatan: formData.angkatan,
        pekerjaan: formData.pekerjaan,
        instansi: formData.instansi,
        domisili: formData.domisili,
        noHP: formData.noHP,
        nama_ayah: formData.nama_ayah,
        nama_ibu: formData.nama_ibu,
        asal_sekolah: formData.asal_sekolah,
        instagram: formData.instagram,
        password: formData.password,
      });

      alert("✅ Data alumni berhasil diperbarui!");
      onClose?.();
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Terjadi kesalahan saat menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus data alumni ini?")) return;
    setLoading(true);

    try {
      const ref = doc(db, "users", formData.uid);
      await deleteDoc(ref);

      alert("✅ Data alumni berhasil dihapus!");
      onClose?.();
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Terjadi kesalahan saat menghapus data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-xl shadow-md"
    >
      <h2 className="text-lg font-semibold text-blue-700">Edit Data Alumni</h2>

      <input
        name="nisn"
        value={formData.nisn || ""}
        onChange={handleChange}
        placeholder="NISN"
        className="w-full border p-2 rounded text-black"
      />
      <input
        name="fullName"
        value={formData.fullName || ""}
        onChange={handleChange}
        placeholder="Nama Lengkap"
        className="w-full border p-2 rounded text-black"
      />
      <input
        name="email"
        type="email"
        value={formData.email || ""}
        onChange={handleChange}
        placeholder="Email"
        className="w-full border p-2 rounded text-black"
      />
      <input
        name="ttl"
        value={formData.ttl || ""}
        onChange={handleChange}
        placeholder="Tempat tanggal lahir"
        className="w-full border p-2 rounded text-black"
      />
      <input
        name="angkatan"
        value={formData.angkatan || ""}
        onChange={handleChange}
        placeholder="Angkatan (contoh: 2015)"
        className="w-full border p-2 rounded text-black"
      />
      <input
        name="pekerjaan"
        value={formData.pekerjaan || ""}
        onChange={handleChange}
        placeholder="Pekerjaan"
        className="w-full border p-2 rounded text-black"
      />
      <input
        name="instansi"
        value={formData.instansi || ""}
        onChange={handleChange}
        placeholder="Instansi"
        className="w-full border p-2 rounded text-black"
      />
      <input
        name="domisili"
        value={formData.domisili || ""}
        onChange={handleChange}
        placeholder="Domisili"
        className="w-full border p-2 rounded text-black"
      />
      <input
        name="noHP"
        value={formData.noHP || ""}
        onChange={handleChange}
        placeholder="No HP"
        className="w-full border p-2 rounded text-black"
      />
      <input
        name="nama_ayah"
        value={formData.nama_ayah || ""}
        onChange={handleChange}
        placeholder="Nama Ayah"
        className="w-full border p-2 rounded text-black"
      />
      <input
        name="nama_ibu"
        value={formData.nama_ibu || ""}
        onChange={handleChange}
        placeholder="Nama Ibu"
        className="w-full border p-2 rounded text-black"
      />
      <input
        name="asal_sekolah"
        value={formData.asal_sekolah || ""}
        onChange={handleChange}
        placeholder="Asal SD/MI"
        className="w-full border p-2 rounded text-black"
      />
      <input
        name="instagram"
        value={formData.instagram || ""}
        onChange={handleChange}
        placeholder="Instagram (opsional)"
        className="w-full border p-2 rounded text-black"
      />
      <input
        name="password"
        value={formData.password || ""}
        onChange={handleChange}
        placeholder="**** (opsional)"
        className="w-full border p-2 rounded text-black"
      />

      <div className="flex gap-4 justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          {loading ? "Menghapus..." : "Hapus"}
        </button>
      </div>
    </form>
  );
}
