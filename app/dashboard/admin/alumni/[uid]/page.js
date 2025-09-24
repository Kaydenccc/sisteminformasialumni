// app/dashboard/admin/alumni/[uid]/page.js
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import Link from "next/link";

export default async function DetailAlumniPage({ params }) {
  const docRef = doc(db, "users", params.uid);
  const snapshot = await getDoc(docRef);
  const data = snapshot.exists() ? snapshot.data() : null;

  if (!data) {
    return <div className="p-6">❌ Data alumni tidak ditemukan.</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Detail Alumni</h1>
        <div className="space-y-2">
          <DetailItem label="Nama Lengkap" value={data.fullName} />
          <DetailItem label="Email" value={data.email} />
          <DetailItem label="NISN" value={data.nisn} />
          <DetailItem label="Tempat Tanggal Lahir" value={data.ttl} />
          <DetailItem label="Angkatan" value={data.angkatan} />
          <DetailItem label="Pekerjaan" value={data.pekerjaan} />
          <DetailItem label="Instansi" value={data.instansi} />
          <DetailItem label="Domisili" value={data.domisili} />
          <DetailItem label="No HP" value={data.noHP} />
          <DetailItem label="Nama Ayah" value={data.nama_ayah} />
          <DetailItem label="Nama Ibu" value={data.nama_ibu} />
          <DetailItem label="Asal SD/MI" value={data.asal_sekolah} />
          <DetailItem label="Instagram" value={data.instagram || "-"} />
        </div>
        <Link
          href={"/dashboard/admin"}
          className="text-cyan-100 bg-blue-700 p-2 rounded-md flex justify-center mt-8"
        >
          Kembali
        </Link>
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-medium text-gray-800">{value}</p>
    </div>
  );
}
