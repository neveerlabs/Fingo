<div align="center">
  <img src="https://raw.githubusercontent.com/neveerlabs/OSM/main/Screenshot.png" alt="Screenshot OSM v2" width="600">
</div>

<p align="center"><b>Operating System MySQL v2.9.1-release</b></p>

Tools interaktif berbasis Node.js untuk mengelola database MySQL melalui terminal.  
Versi 2.9.1 menghadirkan antarmuka yang lebih modern dan interaktif dengan dukungan **Inquirer.js**.

## Fitur Unggulan
- Manajemen database (lihat, buat, hapus, pilih database)
- Manajemen tabel (lihat, buat, hapus, lihat struktur, lihat isi tabel)
- Operasi CRUD data:
  - **INSERT** – tambah data dengan panduan kolom
  - **SELECT** – cari data dengan filter interaktif (WHERE)
  - **UPDATE** – ubah data dengan pemilihan kolom dan kondisi
  - **DELETE** – hapus data dengan kondisi atau tanpa kondisi (dengan konfirmasi)
- Eksekusi query SQL bebas (menggunakan editor)
- Tampilan warna-warni untuk pesan sukses, error, dan peringatan
- Koneksi fleksibel: host, port, user, password, database awal
- Pool koneksi untuk performa optimal

## Cara Penggunaan
1. Clone repositori ini:
   ```bash
   git clone https://github.com/neveerlabs/OSM.git
   ```
2. Masuk ke direktori proyek dan instal dependensi:
   ```bash
   cd OSM
   ```
   ```bash
   npm install
   ```
   > _Install juga dependen tambahan_ `mysql2`
3. Jalankan aplikasi:
   ```bash
   node OSM.js
   ```
4. Ikuti petunjuk interaktif yang muncul di terminal.

## Persyaratan Sistem
- `Node.js` versi `14` atau lebih baru
- MySQL server (lokal atau remote) – pastikan service MySQL aktif (misal melalui `XAMPP` untuk lokal)

## Teknologi yang Digunakan:
- `mysql2` – koneksi database MySQL yang cepat dan aman
- `inquirer` – antarmuka interaktif untuk input pengguna

<div align="center">
<b>© 2026 <i>Operating System MySQL v2.9.1-release</i></b>. All right reserved.
</div>