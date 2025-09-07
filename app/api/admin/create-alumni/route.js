import { NextResponse } from "next/server";
import { adminAuth, adminDB } from "@/firebase/admin"; // Gunakan konfigurasi admin SDK

export async function POST(req) {
  try {
    const {
      email,
      password,
      nisn,
      fullName,
      angkatan,
      pekerjaan,
      instansi,
      domisili,
      noHP,
      linkedin,
      instagram,
    } = await req.json();

    // 1. Buat akun di Firebase Auth
    const userRecord = await adminAuth.createUser({
      email,
      password,
    });

    const uid = userRecord.uid;

    // 2. Simpan data tambahan ke Firestore
    await adminDB
      .collection("users")
      .doc(uid)
      .set({
        nisn,
        fullName,
        email,
        angkatan,
        pekerjaan,
        instansi,
        domisili,
        noHP,
        linkedin,
        instagram: instagram || "",
        role: "alumni", // sangat penting
        createdAt: new Date(),
      });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Gagal menambahkan alumni:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
