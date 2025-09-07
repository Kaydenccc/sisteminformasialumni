import { NextResponse } from "next/server";
import { adminAuth, adminDB } from "@/firebase/admin";

export async function POST(req) {
  try {
    const { uid, newEmail } = await req.json();

    console.log("Updating user:", uid, "to", newEmail);

    // Update email di Firebase Auth
    const updatedUser = await adminAuth.updateUser(uid, { email: newEmail });
    console.log("Auth email updated:", updatedUser.email);

    // Update email di Firestore
    await adminDB.collection("users").doc(uid).update({ email: newEmail });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Gagal update email:", error.code, error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
