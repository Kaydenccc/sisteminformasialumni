import { NextResponse } from "next/server";
import { adminAuth, adminDB } from "@/firebase/admin";

export async function POST(req) {
  const { uid } = await req.json();

  try {
    // Hapus dari Auth
    await adminAuth.deleteUser(uid);

    // Hapus dari Firestore
    await adminDB.collection("users").doc(uid).delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Gagal hapus data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
