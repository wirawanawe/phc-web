type pricing_data_type = {
  id: number;
  title: string;
  monthly_price: number;
  yearly_price: number;
  features: {
    feature: string;
    cls?: string;
  }[];
};

const pricing_data: pricing_data_type[] = [
  {
    id: 1,
    title: "PAKET BASIC",
    monthly_price: 500000,
    yearly_price: 6000000,
    features: [
      { feature: "Modul Pendaftaran" },
      { feature: "Modul Dokter" },
      { feature: "Modul Apotek" },
      { feature: "Dukungan Integrasi dengan Satu Sehat Kemenkes" },
      { feature: "Laporan Operasional Dasar" },
    ],
  },
  {
    id: 2,
    title: "PAKET STANDARD",
    monthly_price: 1000000,
    yearly_price: 12000000,
    features: [
      { feature: "Semua fitur dari Paket Basic" },
      { feature: "Manajemen Pengelolaan Stok Obat Otomatis" },
      { feature: "Dashboard Monitoring Pasien Berbasis Grafik" },
      { feature: "Dukungan Integrasi dengan Asuransi PLN" },
      { feature: "Pelatihan Pengguna Awal (2 Sesi)" },
    ],
  },
  {
    id: 3,
    title: "PAKET PREMIUM",
    monthly_price: 2500000,
    yearly_price: 30000000,
    features: [
      { feature: "Semua fitur dari Paket Standard" },
      { feature: "Modul Laporan Keuangan Lengkap" },
      { feature: "Dukungan Teknis Prioritas (24/7)" },
      { feature: "Pembaruan Sistem Gratis untuk 1 Tahun" },
    ],
  },
  {
    id: 4,
    title: "PAKET ENTERPRISE",
    monthly_price: 5000000,
    yearly_price: 60000000,
    features: [
      { feature: "Semua fitur dari Paket Premium" },
      { feature: "Fitur Multi-cabang untuk Klinik Besar" },
      { feature: "Kustomisasi Sesuai Kebutuhan Klinik" },
      { feature: "Dukungan Integrasi dengan Sistem Klinik Lainnya" },
      { feature: "Tim Dukungan Khusus untuk Implementasi Awal" },
      { feature: "Pembaruan Sistem Gratis untuk 3 Tahun" },
    ],
  },
];

export default pricing_data;
