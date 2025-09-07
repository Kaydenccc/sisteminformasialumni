"use client";
import { useState } from "react";
import { db } from "@/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export default function AddAlumniForm({ onSuccess, onClose }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    nisn: "",
    angkatan: "",
    pekerjaan: "",
    instansi: "",
    domisili: "",
    noHP: "",
    linkedin: "",
    instagram: "",
  });

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
      const uid = uuidv4(); // generate UID unik

      const newUser = {
        ...formData,
        uid,
        role: "alumni",
        createdAt: new Date(),
      };

      await setDoc(doc(db, "users", uid), newUser);

      alert("✅ Alumni berhasil ditambahkan!");
      onSuccess?.();
      setFormData({
        email: "",
        password: "",
        fullName: "",
        nisn: "",
        ttl: "",
        angkatan: "",
        pekerjaan: "",
        instansi: "",
        domisili: "",
        noHP: "",
        nama_ayah: "",
        nama_ibu: "",
        asal_sekolah: "",
        instagram: "",
      });
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Gagal menambahkan alumni.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-xl shadow-md"
    >
      <h2 className="text-lg font-semibold text-blue-700">
        Tambah Data Alumni
      </h2>

      {[
        { name: "email", type: "email", required: true },
        { name: "password", type: "password", required: true },
        { name: "fullName", required: true },
        { name: "nisn", required: true },
        { name: "ttl", required: true },
        { name: "angkatan", required: true },
        { name: "pekerjaan" },
        { name: "instansi" },
        { name: "domisili" },
        { name: "noHP" },
        { name: "nama_ayah" },
        { name: "nama_ibu" },
        { name: "asal_sekolah" },
        { name: "instagram" },
      ].map((field) => (
        <input
          key={field.name}
          type={field.type || "text"}
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          placeholder={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
          required={field.required || false}
          className="w-full border p-2 rounded text-black"
        />
      ))}

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
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {loading ? "Menambahkan..." : "Tambah Alumni"}
        </button>
      </div>
    </form>
  );
}
