import { db } from "@/firebase/config";
import { NextResponse } from "next/server";
import { doc, updateDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      uid,
      nisn,
      fullName,
      email,
      angkatan,
      pekerjaan,
      instansi,
      domisili,
      noHP,
      linkedin,
      instagram,
    } = body;

    if (!uid) {
      return NextResponse.json({ error: "Missing user UID" }, { status: 400 });
    }

    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      nisn,
      fullName,
      email,
      angkatan,
      pekerjaan,
      instansi,
      domisili,
      noHP,
      linkedin,
      instagram,
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating alumni:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui data alumni" },
      { status: 500 }
    );
  }
}
