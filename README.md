# 📝 NodeWave Todo App

NodeWave Todo App adalah aplikasi Todo berbasis **Next.js 15**, **TypeScript**, dan **Tailwind CSS**.  
Aplikasi ini dikembangkan untuk keperluan rekrutmen **Frontend Developer** di NodeWave.

---

## 🚀 Fitur Utama

- 🔐 **Sistem Autentikasi**
  - Login & Register
  - Autentikasi JWT
  - Proteksi route dengan middleware

- ✅ **Manajemen Todo**
  - Tambah, lihat, edit, hapus todo
  - Tandai selesai / belum selesai
  - Update real-time

- 📊 **Fitur Lanjutan**
  - Pencarian & filter todo
  - Pagination
  - Seleksi & hapus todo massal
  - Dashboard admin (opsional)

- 💎 **UI/UX Modern**
  - Desain responsif
  - Komponen dari Shadcn UI & Tailwind CSS
  - Loading & error state

---

## 🧰 Teknologi yang Digunakan

- `Next.js 15`
- `TypeScript`
- `Tailwind CSS`
- `Zustand` (state management)
- `React Query` (data fetching & cache)
- `React Hook Form` + `Zod` (validasi form)
- `Axios` (HTTP client)
- `Sonner` (notifikasi)
- `Lucide React` (ikon)
- `date-fns` (format tanggal)

---

## ⚙️ Cara Menjalankan Aplikasi

```bash
# 1. Clone repositori & masuk ke direktori project
git clone https://github.com/lirhzaaa/Todo-App.git
cd Todo-App

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
Akses aplikasi di browser melalui:
➡️ http://localhost:3000

Demo (Vercel): https://todo-ay0u2wb22-lirhzas-projects.vercel.app/

## 📁 Struktur Project

src/  
├── app/             # Halaman Next.js (App Router)  
│   ├── admin/         # Halaman dashboard admin  
│   ├── dashboard/     # Halaman dashboard user  
│   ├── login/         # Halaman login  
│   └── register/      # Halaman register  
├── components/      # Komponen React  
│   ├── admin/         # Komponen admin  
│   ├── auth/          # Komponen autentikasi  
│   ├── layout/        # Layout dan navigasi  
│   ├── todo/          # Komponen todo  
│   └── ui/            # Komponen UI reusable  
├── hooks/           # Custom React hooks  
├── services/        # API services  
├── stores/          # State management dengan Zustand  
├── types/           # Tipe TypeScript  
└── utils/           # Fungsi utilitas


🔐 Proteksi & Manajemen State
Semua route penting dilindungi oleh middleware (middleware.ts)

Hanya user yang login yang dapat mengakses halaman dashboard dan admin

Autentikasi dan todo state dikelola menggunakan Zustand dan disimpan di localStorage

Pengambilan & update data dilakukan melalui React Query untuk efisiensi cache

✅ Status
 Fitur Login & Register

 CRUD Todo

 Filtering & Pagination

 Dashboard Admin (Opsional)

 Deploy ke Vercel

 Kode bersih & terstruktur

📫 Kontak
Jika ada pertanyaan lebih lanjut terkait project ini, silakan hubungi saya melalui GitHub Issues kirim email melalui mazhrilnurmaulidan@gmail.com
