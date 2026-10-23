export type PmdApp = {
  /** Dipakai untuk nama file logo: /icons/<slug>.png|svg|webp|jpg */
  slug: string
  name: string
  short: string
  description: string
  href: string | null
  category: 'Core System' | 'Internal' | 'Keuangan' | 'Operasional' | 'Publik'
  tag: string
  /** Warna aksen kartu (dipakai untuk glow, badge, dan ikon fallback). */
  accent: string
  accentSoft: string
}

/**
 * Data seluruh aplikasi di PMD Ecosystem.
 * Tambah / ubah aplikasi cukup di sini.
 *
 * Untuk logo: taruh file di folder `public/icons/` dengan nama sesuai `slug`
 * (contoh: accurate.png, pmd-apk.png, ...). Logo akan otomatis dipakai.
 */
export const apps: PmdApp[] = [
  {
    slug: 'accurate',
    name: 'Accurate Online',
    short: 'Accurate',
    description:
      'Core System PMD.',
    href: 'https://account.accurate.id/manage',
    category: 'Core System',
    tag: 'ERP System PMD',
    accent: '#ff0011',
    accentSoft: '#f46568',
  },
  {
    slug: 'pmd-apk',
    name: 'PMD Ecosystem 4.0',
    short: 'PMD Ecosystem 4.0 · APK version',
    description:
      'Shorrtcut untuk download aplikasi PMD Ecosystem 4.0.apk disini.',
    href: 'https://drive.google.com/file/d/1UrjzjAaw3CGMIWIM0Y32y4gc5LMsCccT/view?usp=drivesdk',
    category: 'Internal',
    tag: 'Mobile · APK',
    accent: '#ffb340',
    accentSoft: '#ff7a18',
  },
  {
    slug: 'pmd-web',
    name: 'PMD Ecosystem 4.0',
    short: 'PMD Ecosystem 4.0 · Web version',
    description:
      'Versi web PMD Ecosystem 4.0. Buka langsung dari browser tanpa instalasi.',
    href: 'https://pmd-ecosystem4.vercel.app/',
    category: 'Internal',
    tag: 'Web App',
    accent: '#a78bfa',
    accentSoft: '#7c3aed',
  },
  {
    slug: 'input-ekspedisi',
    name: 'Input Ekspedisi PMD',
    short: 'Input',
    description: 'Formulir input data laporan ekspedisi pengiriman CV Prima Mandiri Distribusi.',
    href: 'https://script.google.com/macros/s/AKfycbx1wU9ZBWzHZ9SKmhG_H2Rf3NfwqltnFlVFQAnl43_Rlo47txWkT9XOY0ClIrfjIazP/exec',
    category: 'Operasional',
    tag: 'Input',
    accent: '#45d0ff',
    accentSoft: '#0284c7',
  },
  {
    slug: 'view-ekspedisi',
    name: 'View Laporan Ekspedisi',
    short: 'Laporan',
    description: 'Pantau dan cetak seluruh hasil laporan ekspedisi pengiriman CV Prima Mandiri Distribusi.',
    href: 'https://laporan-app-phi.vercel.app/',
    category: 'Operasional',
    tag: 'Monitoring',
    accent: '#2ee6a8',
    accentSoft: '#059669',
  },
  {
    slug: 'website-pmd',
    name: 'Website PMD',
    short: 'Website',
    description:
      'Situs resmi perusahaan: profil, layanan katalog, pricelist update, dan informasi publik CV Prima Mandiri Distribusi.',
    href: 'https://primamandiridistribusiwebsite.vercel.app/',
    category: 'Publik',
    tag: 'Publik',
    accent: '#ff7ab6',
    accentSoft: '#e11d70',
  },
  {
    slug: 'dashboard-spv',
    name: 'Dashboard SPV',
    short: 'Dashboard SPV',
    description:
      'Dasboard supervisor untuk memantau penjualan, target, speed mingguan dan produk fokus.',
    href: 'https://dashboard-ebon-beta-83.vercel.app/',
    category: 'Operasional',
    tag: 'Supervisor',
    accent: '#8b95ff',
    accentSoft: '#4f46e5',
  },
]

export const categories = ['Semua', 'Internal', 'Keuangan', 'Operasional', 'Publik'] as const
export type Category = (typeof categories)[number]
