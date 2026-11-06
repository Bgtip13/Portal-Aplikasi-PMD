# Portal Aplikasi Karyawan PMD

Halaman pusat aplikasi (launcher) untuk karyawan **CV Prima Mandiri Distribusi**.
Berisi sambutan, pencarian (tekan `/`), filter kategori, dan kartu aplikasi yang
langsung membuka aplikasi terkait.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # produksi ke folder dist/
npm run preview  # cek hasil build
```

## Menambah logo

Letakkan file logo di `public/icons/` dengan nama sesuai daftar di
[`public/icons/README.md`](public/icons/README.md). Selama logo belum ada, kartu
memakai ikon vektor bawaan sebagai fallback sehingga tampilan tetap rapi.

## Mengubah daftar aplikasi

Semua data aplikasi ada di `src/data/apps.ts` (nama, deskripsi, link, warna aksen,
kategori, dan nama file logo). Untuk aplikasi APK yang tautannya belum ada,
biarkan `href: null` — kartu tampil sebagai "Segera hadir". Cukup isi URL-nya
saat APK siap dibagikan.
