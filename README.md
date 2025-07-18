NodeWave Todo App
NodeWave Todo App adalah aplikasi todo berbasis Next.js 15, TypeScript, dan Tailwind CSS. Aplikasi ini dibuat untuk kebutuhan rekrutmen frontend developer.

Fitur Utama
Sistem Autentikasi: Login & Register, autentikasi JWT, proteksi route dengan middleware
Manajemen Todo: Tambah, lihat, edit, hapus todo, tandai selesai/belum selesai, update real-time
Fitur Lanjutan: Pencarian & filter, pagination, seleksi & hapus todo massal, dashboard admin
UI/UX Modern: Desain responsif, komponen Shadcn UI & Tailwind CSS, loading & error state

Teknologi
Next.js 15, TypeScript, Tailwind CSS
Zustand (state management)
React Query (data fetching)
React Hook Form + Zod (validasi form)
Axios (HTTP client)
Sonner (notifikasi)
Lucide React (icon)
Date-fns (format tanggal)


Cara Menjalankan
1. Clone repo & install dependensi
git clone https://github.com/lirhzaaa/Todo-App.git
cd Todo-App
npm install

2. Jalankan development server
npm run dev

3. Buka http://localhost:3000 di browser

Struktur Project
src/
├── app/         # Halaman Next.js (App Router)
│   ├── admin/      # Dashboard admin
│   ├── dashboard/  # Dashboard user
│   ├── login/      # Login
│   └── register/   # Register
├── components/  # Komponen React
│   ├── admin/      # Komponen admin
│   ├── auth/       # Komponen autentikasi
│   ├── layout/     # Komponen layout
│   ├── todo/       # Komponen todo
│   └── ui/         # Komponen UI reusable
├── hooks/       # Custom hooks
├── services/    # Service API
├── stores/      # Zustand store
├── types/       # Tipe TypeScript
└── utils/       # Utility function


Proteksi & State Management
- Semua route penting dilindungi middleware (middleware.ts)
- Hanya user login yang bisa akses dashboard & admin
- Auth & todo dikelola dengan Zustand (persisten di localStorage)
- React Query untuk cache & update data