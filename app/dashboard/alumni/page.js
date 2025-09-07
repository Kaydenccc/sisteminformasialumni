"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AlumniProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const router = useRouter();

  const fetchUserData = async (uid) => {
    try {
      const docSnap = await getDoc(doc(db, "users", uid));
      if (!docSnap.exists()) {
        router.push("/login");
        return;
      }
      setUserData({ uid, ...docSnap.data() });
    } catch (err) {
      console.error("Gagal ambil data:", err);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (!parsedUser.uid) {
      console.error("UID tidak ditemukan di localStorage");
      router.push("/login");
      return;
    }

    fetchUserData(parsedUser.uid);
  }, [router]);

  const handleChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!userData) return;

    try {
      // Validasi password lama (opsional)
      if (oldPassword && oldPassword !== userData.password) {
        alert("Password lama salah");
        return;
      }

      // Data yang diupdate
      const updatedData = {
        ...userData,
        ...(newPassword ? { password: newPassword } : {}),
        updatedAt: new Date(),
      };

      // Simpan ke Firestore (pastikan uid dipakai)
      await setDoc(doc(db, "users", userData.uid), updatedData, {
        merge: true,
      });

      alert("Profil berhasil diperbarui!");
      setOldPassword("");
      setNewPassword("");

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedData));
    } catch (error) {
      console.error(error);
      alert("Gagal memperbarui profil");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (loading) return <div className="p-10 text-center">Memuat data...</div>;
  if (!userData) return null;

  if (userData.role !== "alumni") {
    return (
      <div className="p-10 text-center text-black">
        <h1 className="text-xl font-bold">Halo, Admin!</h1>
        <p>Halaman alumni tidak tersedia untuk admin.</p>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-10 bg-gray-100 min-h-screen text-black">
      <div className="bg-gray-50 shadow-md rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-4">Profile Alumni</h2>
        <form onSubmit={handleSave} className="space-y-3">
          {[
            { label: "Nama Lengkap", name: "fullName" },
            { label: "NISN", name: "nisn" },
            { label: "Email", name: "email", type: "email" },
            { label: "Angkatan", name: "angkatan" },
            { label: "Pekerjaan Saat ini", name: "pekerjaan" },
            { label: "Tempat Kerja", name: "instansi" },
            { label: "Domisili", name: "domisili" },
            { label: "No. HP", name: "noHP" },
            { label: "Nama Ayah", name: "nama_ayah" },
            { label: "Nama Ibu", name: "nama_ibu" },
            { label: "Asal SD/MI", name: "asal_sekolah" },
            { label: "Instagram", name: "instagram" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm">{field.label}</label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={userData[field.name] || ""}
                onChange={handleChange}
                className="w-full p-2 bg-gray-200 rounded"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm">Password Baru</label>
            <input
              type="password"
              placeholder="Kosongkan jika tidak diubah"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 bg-gray-200 rounded"
            />
          </div>

          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={handleLogout}
              className="bg-gray-300 px-4 py-2 rounded cursor-pointer"
            >
              Logout
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
