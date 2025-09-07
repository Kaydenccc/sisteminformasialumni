"use client";
import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Cari user di Firestore
      const q = query(
        collection(db, "users"),
        where("email", "==", email),
        where("password", "==", password) // NOTE: sebaiknya di-hash
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("Email atau password salah");
        return;
      }

      // Ambil data dan ID dokumen
      const docSnap = querySnapshot.docs[0];
      const userData = {
        uid: docSnap.id, // ID dokumen = UID
        ...docSnap.data(),
      };

      // Simpan ke localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      console.log("User login:", userData);

      // Redirect sesuai role
      if (userData.role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/alumni");
      }
    } catch (error) {
      console.error("Error login:", error);
      alert("Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
          Login Alumni
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-black"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition"
          >
            {loading ? "Masuk..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
