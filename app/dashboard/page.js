"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirector() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      console.log("User belum login");
      router.replace("/login");
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      console.log("User ditemukan, role:", user.role);

      if (user.role === "admin") {
        router.replace("/dashboard/admin");
      } else if (user.role === "alumni") {
        router.replace("/dashboard/alumni");
      } else {
        console.warn("Role tidak diketahui, kembali ke login");
        router.replace("/login");
      }
    } catch (err) {
      console.error("Error parsing localStorage:", err);
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div className="p-10 text-center">Memuat...</div>;
  }

  return null;
}
