import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const nav = [
    { href: "#tentang", label: "Tentang" },
    { href: "#data", label: "Data" },
    { href: "#visi-misi", label: "Visi & Misi" },
    { href: "#struktur", label: "Struktur" },
    { href: "#fasilitas", label: "Fasilitas" },
    { href: "#galeri", label: "Galeri" },
    { href: "#lokasi", label: "Lokasi" },
  ];

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-emerald-600 grid place-items-center text-white font-bold">
              M
            </div>
            <div>
              <p className="text-sm leading-tight text-neutral-500">
                Madrasah Tsanawiyah Negeri 2
              </p>
              <h1 className="text-lg font-semibold tracking-tight">
                MTsN 2 Tana Toraja
              </h1>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-4">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-neutral-700 hover:text-emerald-700 transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20 grid md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-3">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Profil MTsN 2 Tana Toraja
            </h2>
            <p className="mt-3 text-lg text-neutral-700">
              <strong> Madrasah Hebat Bermartabat </strong>
            </p>
            <p className="mt-6 text-neutral-700 leading-relaxed">
              Madrasah Tsanawiyah Negeri 2 Tana Toraja (MTsN 2 Tana Toraja)
              berdiri sebagai wujud komitmen pemerintah untuk memperluas akses
              pendidikan agama yang berkualitas di wilayah Sulawesi Selatan.
              Madrasah ini secara resmi diresmikan pada{" "}
              <strong>19 Juni 2009</strong>, berdasarkan{" "}
              <strong>SK Pendirian & Operasional No. 92 Tahun 2009</strong>.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="/cari-alumni"
                className="rounded-2xl bg-emerald-600 text-white px-5 py-2.5 text-sm font-medium shadow hover:bg-emerald-700"
              >
                Cari Alumni
              </Link>
              <a
                href="/login"
                className="rounded-2xl border border-neutral-300 px-5 py-2.5 text-sm font-medium hover:border-neutral-400"
              >
                Login
              </a>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="aspect-[4/3] w-full rounded-2xl overflow-clip bg-neutral-200 grid place-items-center text-neutral-500">
              <Image
                width={500}
                height={500}
                alt="foto sekolah"
                src={"/sekolah.jpg"}
                className="aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tentang */}
      <section id="tentang" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-semibold">Tentang Sekolah</h3>
            <div className="mt-4 space-y-4 text-neutral-700 leading-relaxed">
              <p>
                Berada di bawah naungan{" "}
                <strong>Kementerian Agama Republik Indonesia</strong>, madrasah
                ini memiliki luas lahan sekitar <strong>1.012 m²</strong>,
                berlokasi strategis di{" "}
                <strong>
                  Kelurahan Salubarani, Kecamatan Gandangbatu Sillanan,
                  Kabupaten Tana Toraja
                </strong>{" "}
                untuk menjangkau masyarakat yang mendambakan pendidikan agama
                dan umum berkualitas.
              </p>
              <p>
                Pada <strong>24 Oktober 2014</strong>, MTsN 2 Tana Toraja
                memperoleh <strong>Akreditasi A</strong> melalui SK
                <strong> No. 68/SK/BAP-SM/X/2014</strong> dan hingga{" "}
                <strong>2025</strong> masih mempertahankan capaian tersebut.
                Pencapaian ini mencerminkan dedikasi madrasah dalam mencetak
                generasi berilmu, berakhlak mulia, dan kompeten.
              </p>
            </div>
          </div>
          <div
            id="data"
            className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm"
          >
            <h4 className="text-lg font-semibold">Data Sekolah</h4>
            <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border p-4">
                <dt className="text-sm text-neutral-500">Status</dt>
                <dd className="font-medium">Negeri (Kemenag RI)</dd>
              </div>
              <div className="rounded-xl border p-4">
                <dt className="text-sm text-neutral-500">Tanggal Peresmian</dt>
                <dd className="font-medium">19 Juni 2009</dd>
              </div>
              <div className="rounded-xl border p-4">
                <dt className="text-sm text-neutral-500">Dasar SK</dt>
                <dd className="font-medium">No. 92 Tahun 2009</dd>
              </div>
              <div className="rounded-xl border p-4">
                <dt className="text-sm text-neutral-500">Akreditasi</dt>
                <dd className="font-medium">
                  A (SK 68/SK/BAP-SM/X/2014) – dipertahankan s.d. 2025
                </dd>
              </div>
              <div className="rounded-xl border p-4 sm:col-span-2">
                <dt className="text-sm text-neutral-500">Alamat</dt>
                <dd className="font-medium">
                  Kel. Salubarani, Kec. Gandangbatu Sillanan, Kab. Tana Toraja
                </dd>
              </div>
              <div className="rounded-xl border p-4 sm:col-span-2">
                <dt className="text-sm text-neutral-500">Luas Lahan</dt>
                <dd className="font-medium">± 1.012 m²</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section
        id="visi-misi"
        className="bg-emerald-50 border-y border-emerald-100"
      >
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <h3 className="text-2xl font-semibold">Visi & Misi</h3>
          <div className="mt-6 grid md:grid-cols-3 gap-10">
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold">Visi</h4>
              <p className="mt-3 leading-relaxed text-neutral-800">
                Terwujudnya manusia yang religius, berakhlak mulia, cerdas dan
                terampil serta kompetitif.
              </p>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-lg font-semibold">Misi</h4>
              <ol className="mt-3 list-decimal pl-5 space-y-2 leading-relaxed text-neutral-800">
                <li>
                  Meningkatkan mutu pendidikan, baik pendidikan umum maupun
                  pendidikan agama.
                </li>
                <li>
                  Menyelenggarakan proses belajar mengajar guna menghasilkan
                  lulusan yang berprestasi.
                </li>
                <li>
                  Mendidik anak berkepribadian islami dan berwawasan global.
                </li>
                <li>Membubuhkan semangat berprestasi pada warga sekolah.</li>
                <li>
                  Menjalin kerja sama yang baik antara warga sekolah dan
                  lingkungan.
                </li>
                <li>
                  Menjadi sekolah unggulan di masa mendatang dengan membenahi
                  diri untuk melengkapi sarana dan prasarana.
                </li>
                <li>
                  Mengoptimalkan kegiatan belajar mengajar sehingga hasil
                  belajar meningkat.
                </li>
                <li>Melaksanakan pembelajaran dan bimbingan secara efektif.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Struktur Organisasi */}
      <section id="struktur" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-2xl font-semibold">Struktur Organisasi</h3>
          <a
            href="#gambar-struktur"
            className="text-sm text-emerald-700 hover:underline"
          >
            Lihat gambar
          </a>
        </div>
        <p className="mt-3 text-neutral-700">Tahun Ajaran 2025/2026</p>
        <div
          id="gambar-struktur"
          className="mt-6 rounded-2xl border border-neutral-200 p-3 bg-white"
        >
          <Image
            width={500}
            height={500}
            src="/organisasi.jpg"
            alt="Struktur Organisasi MTsN 2 Tana Toraja 2025/2026"
            className="w-full h-full rounded-xl"
          />
          <p className="mt-2 text-xs text-neutral-500">
            Gambar 1. Struktur Organisasi
          </p>
        </div>
      </section>

      {/* Fasilitas */}
      <section id="fasilitas" className="bg-white border-y border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <h3 className="text-2xl font-semibold">Fasilitas Sekolah</h3>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              {
                label: "Perpustakaan",
                icon: (
                  <Image
                    width={300}
                    height={300}
                    src="/library_icon.ico"
                    alt="Struktur Organisasi MTsN 2 Tana Toraja 2025/2026"
                    className="w-full h-full rounded-xl"
                  />
                ),
              },
              {
                label: "Laboratorium",
                icon: (
                  <Image
                    width={300}
                    height={300}
                    src="/laboratory_icon.ico"
                    alt="Struktur Organisasi MTsN 2 Tana Toraja 2025/2026"
                    className="w-full h-full rounded-xl"
                  />
                ),
              },
              {
                label: "Masjid",
                icon: (
                  <Image
                    width={300}
                    height={300}
                    src="/masjid_icon.ico"
                    alt="Struktur Organisasi MTsN 2 Tana Toraja 2025/2026"
                    className="w-full h-full rounded-xl"
                  />
                ),
              },
              {
                label: "Ruang Kelas",
                icon: (
                  <Image
                    width={300}
                    height={300}
                    src="/kelas.png"
                    alt="Struktur Organisasi MTsN 2 Tana Toraja 2025/2026"
                    className="w-full h-full rounded-xl"
                  />
                ),
              },
              {
                label: "Lapangan",
                icon: (
                  <Image
                    width={300}
                    height={300}
                    src="/lapangan.png"
                    alt="Struktur Organisasi MTsN 2 Tana Toraja 2025/2026"
                    className="w-full h-full rounded-xl"
                  />
                ),
              },
              {
                label: "UKS",
                icon: (
                  <Image
                    width={300}
                    height={300}
                    src="/uks.png"
                    alt="Struktur Organisasi MTsN 2 Tana Toraja 2025/2026"
                    className="w-full h-full rounded-xl"
                  />
                ),
              },
            ]?.map((f) => (
              <div
                key={f.label}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-center shadow-sm"
              >
                <div className="aspect-square w-full rounded-xl bg-neutral-200 grid place-items-center text-sm text-neutral-500 mb-3">
                  {f.icon}
                </div>
                <p className="text-sm font-medium">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeri */}
      <section id="galeri" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h3 className="text-2xl font-semibold">Galeri Sekolah</h3>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((g) => (
            <div key={g} className="aspect-[4/5] rounded-2xl bg-neutral-200" />
          ))}
        </div>
      </section>

      {/* Lokasi */}
      <section
        id="lokasi"
        className="bg-neutral-50 border-t border-neutral-200"
      >
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <h3 className="text-2xl font-semibold">Lokasi Sekolah</h3>
          <div className="mt-6 grid md:grid-cols-5 gap-6">
            <div className="md:col-span-3 overflow-hidden rounded-2xl border border-neutral-200">
              <iframe
                title="Peta MTsN 2 Tana Toraja"
                src="https://www.google.com/maps?q=MTsN%202%20Tana%20Toraja&output=embed"
                className="w-full h-[340px]"
                loading="lazy"
              />
            </div>
            <div className="md:col-span-2">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h4 className="text-lg font-semibold">Alamat & Kontak</h4>
                <p className="mt-3 text-neutral-700">
                  Kel. Salubarani, Kec. Gandangbatu Sillanan, Kab. Tana Toraja,
                  Sulawesi Selatan
                </p>
                <div className="mt-4 space-y-2 text-sm text-neutral-700">
                  <p>
                    Email: <span className="font-medium">—</span>
                  </p>
                  <p>
                    Telepon/WA: <span className="font-medium">—</span>
                  </p>
                </div>
                <p className="mt-4 text-xs text-neutral-500">
                  *Lengkapi data kontak sesuai kebutuhan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-neutral-600">
          <p>© {new Date().getFullYear()} MTsN 2 Tana Toraja</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-emerald-700">
              Facebook
            </a>
            <a href="#" className="hover:text-emerald-700">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
