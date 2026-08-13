# Product Requirements Document - Portfolio Pelajar dengan Dashboard Admin

## 1. Informasi Dokumen

| Item | Detail |
|---|---|
| Nama produk | Student Developer Portfolio |
| Jenis produk | Portfolio publik dengan dashboard admin privat |
| Versi PRD | 2.1 |
| Status | Revised MVP |
| Target publik | Recruiter, mentor, teman komunitas, dan calon kolaborator |
| Pengelola | Satu pemilik portfolio |
| Platform | Web responsif |
| Batas implementasi | Satu aplikasi Next.js di `portfolio/`, tanpa backend terpisah |

## 2. Ringkasan Produk

Student Developer Portfolio membantu pelajar yang sedang belajar programming untuk menampilkan project sekolah, eksperimen mandiri, tech stack, dan proses belajar secara jujur. Konten publik memakai contoh yang jelas dapat diganti sampai pemilik memiliki karya nyata.

Versi ini menambahkan dashboard admin privat. Pemilik dapat masuk, mengubah profil, skill, alur belajar, project, dan status publikasi tanpa perlu menyentuh file TypeScript. Pengunjung publik tidak dapat melihat atau mengakses dashboard.

## 3. Masalah yang Diselesaikan

- Portfolio pemula sering berhenti sebagai kode statis karena isi sulit diperbarui.
- Pemilik membutuhkan cara aman untuk menyimpan project draft sebelum siap dibagikan.
- Project sekolah perlu diberi konteks masalah, proses, dan pembelajaran tanpa membuat klaim profesional palsu.
- Dashboard umum sering dipenuhi chart dan angka contoh yang tidak membantu. Dashboard ini hanya menampilkan status konten yang nyata.

## 4. Tujuan Produk

### 4.1 Tujuan utama

- Menjadi portfolio publik yang rapi untuk programmer pelajar.
- Memudahkan pemilik memperbarui konten dari dashboard privat.
- Memisahkan project draft dari project yang sudah dipublikasikan.
- Menjaga semua klaim, tautan, dan data kontak tetap dapat dipertanggungjawabkan.

### 4.2 Sasaran MVP

- Pemilik dapat login dan logout dengan session aman.
- Pemilik dapat membuat, mengubah, menghapus, mendraft, dan mempublikasikan project.
- Pemilik dapat mengubah profil, kontak, grup skill, skill, dan learning track.
- Halaman publik hanya menampilkan data berstatus published.
- Tidak ada akses dashboard atau API admin tanpa session pemilik.
- Halaman publik dan dashboard tetap dapat digunakan pada lebar 360px, 768px, 1024px, dan 1440px.

## 5. Pengguna dan Hak Akses

| Peran | Akses | Kebutuhan utama |
|---|---|---|
| Pengunjung publik | Hanya halaman portfolio publik | Melihat profil, skill, project published, dan kontak. |
| Pemilik dashboard | Semua halaman dashboard dan data miliknya | Mengelola konten portfolio tanpa mengubah kode. |

Tidak ada registrasi publik, role tambahan, atau dashboard multi-user pada MVP.

## 6. Ruang Lingkup MVP

### 6.1 Termasuk

#### Portfolio publik

- Beranda dengan positioning pelajar, tech stack, workflow belajar, featured project, dan CTA kontak.
- Daftar project di `/projects`.
- Detail project di `/projects/[slug]`.
- Halaman kontak di `/contact`.
- Halaman `not-found`, metadata, sitemap, robots, responsivitas, dan aksesibilitas dasar.

#### Dashboard admin privat

- Login dan logout pemilik di `/login`.
- Dashboard ringkasan di `/dashboard`.
- Manajemen profil dan kontak di `/dashboard/profile`.
- Manajemen grup skill dan skill di `/dashboard/skills`.
- Manajemen learning track di `/dashboard/learning-tracks`.
- Manajemen project di `/dashboard/projects`.
- Form create dan edit project di `/dashboard/projects/new` dan `/dashboard/projects/[id]`.
- Status draft dan published untuk project.
- Validasi input, pesan sukses, error, loading, empty state, dan confirm sebelum menghapus data.

### 6.2 Tidak termasuk

- Registrasi publik, reset password melalui email, dan multi-user role.
- CMS eksternal atau sinkronisasi ke Notion, GitHub, atau Google Drive.
- Upload file ke storage production. MVP memakai URL gambar atau path aset lokal yang telah tersedia.
- Blog, komentar, chat, payment, booking kalender, chatbot AI, newsletter, dan multi-bahasa.
- Analytics dashboard, chart performa, dan angka demo.
- Riwayat revisi, audit log, dan kolaborasi real-time.

## 7. Struktur Informasi dan Route

| Area | Route | Akses | Fungsi |
|---|---|---|---|
| Beranda | `/` | publik | Pengenalan, skill, workflow, featured project, kontak. |
| Project | `/projects` | publik | Daftar project yang published. |
| Detail project | `/projects/[slug]` | publik | Cerita project yang published. |
| Kontak | `/contact` | publik | Cara menghubungi pemilik. |
| Login | `/login` | publik tanpa session | Form login pemilik. |
| Ringkasan | `/dashboard` | owner | Status konten dan tindakan berikutnya. |
| Profil | `/dashboard/profile` | owner | Profil, bio, kontak, dan tautan sosial. |
| Skill | `/dashboard/skills` | owner | Grup skill dan item skill. |
| Learning track | `/dashboard/learning-tracks` | owner | Urutan proses atau roadmap belajar. |
| Project | `/dashboard/projects` | owner | Daftar, status, filter, dan aksi project. |
| Edit project | `/dashboard/projects/new`, `/dashboard/projects/[id]` | owner | Form project draft atau published. |

## 8. Kebutuhan Fungsional

### 8.1 Portfolio publik

| ID | Kebutuhan | Prioritas | Kriteria penerimaan |
|---|---|---|---|
| PUB-01 | Navigasi publik | Must | Header dan menu mobile membawa pengunjung ke route atau section yang benar serta dapat dipakai dengan keyboard. |
| PUB-02 | Profil dan skill | Must | Nama, peran, bio, kontak, grup skill, dan skill berasal dari data konten yang dikelola owner. |
| PUB-03 | Daftar project | Must | Hanya project published yang tampil, dengan judul, ringkasan, cover, kategori, skill, dan tautan detail. |
| PUB-04 | Detail project | Must | Detail menampilkan tantangan, pendekatan, hasil belajar, skill, gambar, dan link yang tersedia. |
| PUB-05 | Kontak | Must | Email contoh atau alamat final ditampilkan jelas. Tautan email memakai `mailto:` yang valid. |
| PUB-06 | Empty state | Must | Bila tidak ada project published, halaman menjelaskan langkah berikutnya tanpa menampilkan data palsu. |

### 8.2 Autentikasi dan otorisasi dashboard

| ID | Kebutuhan | Prioritas | Kriteria penerimaan |
|---|---|---|---|
| ADM-01 | Login owner | Must | Hanya kredensial owner yang valid dapat membuat session. Pesan gagal tidak membocorkan apakah email atau password yang salah. |
| ADM-02 | Session aman | Must | Session disimpan pada cookie `httpOnly`, `Secure` di production, dan `SameSite=Lax` atau lebih ketat. |
| ADM-03 | Route protection | Must | Semua `/dashboard/**` dan Route Handler admin menolak session tidak ada atau tidak valid. |
| ADM-04 | Logout | Must | Logout menghapus session dan mengarahkan pemilik ke `/login`. |
| ADM-05 | Anti brute force | Must | Endpoint login dibatasi per IP dan identifier. Percobaan berulang menghasilkan respons generik. |
| ADM-06 | Tidak ada registrasi publik | Must | Tidak ada route atau UI pendaftaran akun. Akun owner dibuat melalui seed development atau prosedur deploy aman. |

### 8.3 Dashboard ringkasan

| ID | Kebutuhan | Prioritas | Kriteria penerimaan |
|---|---|---|---|
| DASH-01 | Status konten nyata | Must | Ringkasan menampilkan jumlah project draft, project published, skill, dan learning track dari database nyata. |
| DASH-02 | Tindakan berikutnya | Must | Jika data wajib belum ada, dashboard memberi tautan langsung ke halaman pengelolaan terkait. |
| DASH-03 | Aktivitas terbaru | Should | Menampilkan maksimal lima perubahan konten terbaru berdasarkan `updatedAt`, tanpa data contoh. |
| DASH-04 | Tidak ada chart palsu | Must | Chart hanya boleh ada jika sumber data nyata dan tujuan penggunaannya jelas. MVP tidak menampilkan chart. |

### 8.4 Manajemen profil dan skill

| ID | Kebutuhan | Prioritas | Kriteria penerimaan |
|---|---|---|---|
| CNT-01 | Edit profil | Must | Owner dapat menyimpan nama, handle, peran, bio, lokasi umum, email, GitHub, dan link kontak lain yang disetujui. |
| CNT-02 | Validasi profil | Must | Email, URL, panjang teks, dan field wajib divalidasi di server dengan Zod. |
| CNT-03 | Kelola grup skill | Must | Owner dapat membuat, mengubah urutan, mengubah nama, dan menghapus grup skill. |
| CNT-04 | Kelola skill | Must | Owner dapat membuat, mengubah, mengurutkan, dan menghapus skill dalam grupnya. |
| CNT-05 | Kelola learning track | Must | Owner dapat membuat, mengubah, mengurutkan, dan menghapus track pembelajaran. |

### 8.5 Manajemen project

| ID | Kebutuhan | Prioritas | Kriteria penerimaan |
|---|---|---|---|
| PRJ-01 | Buat project draft | Must | Owner dapat membuat project dengan judul, slug, kategori, ringkasan, tantangan, pendekatan, hasil belajar, skill, dan cover path atau URL. |
| PRJ-02 | Edit project | Must | Owner dapat menyunting data project tanpa kehilangan field lain. |
| PRJ-03 | Validasi slug | Must | Slug wajib unik, URL-safe, dan kesalahannya tampil dekat field. |
| PRJ-04 | Draft dan publish | Must | Project draft tidak dapat muncul di route publik. Project published dapat muncul setelah revalidasi konten. |
| PRJ-05 | Hapus project | Must | Owner melihat confirm dialog. Data hanya dihapus setelah konfirmasi dan daftar project diperbarui. |
| PRJ-06 | Link eksternal | Should | GitHub dan live demo opsional serta hanya menerima URL `https:` yang valid. |
| PRJ-07 | Gambar project | Must | MVP menerima path aset lokal atau URL `https:` yang tervalidasi. Upload file dan storage production ditunda. |

## 9. Model Data MVP

Data disimpan melalui Prisma di aplikasi Next.js. Model final harus mengikuti pola Prisma v7 yang aktif di project, tanpa folder backend terpisah.

| Model | Field inti | Catatan |
|---|---|---|
| `AdminUser` | `id`, `email`, `passwordHash`, `role`, `createdAt`, `updatedAt` | Hanya role `OWNER` untuk MVP. |
| `SiteProfile` | `id`, `name`, `handle`, `role`, `bio`, `email`, `githubUrl`, `location`, `updatedAt` | Satu record profil aktif. |
| `SkillGroup` | `id`, `name`, `position` | Memiliki banyak `Skill`. |
| `Skill` | `id`, `groupId`, `name`, `level`, `description`, `position` | Setiap skill berada dalam satu grup. |
| `LearningTrack` | `id`, `title`, `description`, `position` | Urutan tampilan berdasarkan `position`. |
| `Project` | `id`, `slug`, `label`, `title`, `summary`, `category`, `skills`, `challenge`, `approach`, `outcome`, `coverImage`, `coverAlt`, `githubUrl`, `demoUrl`, `status`, `createdAt`, `updatedAt` | `status` bernilai `DRAFT` atau `PUBLISHED`. |

Aturan data:

- Field string publik dibatasi panjangnya dan divalidasi pada server.
- `slug`, email, URL, dan status memiliki constraint database yang sesuai.
- Semua query dashboard wajib disaring melalui session owner.
- Data awal yang dibuat oleh seed harus jelas sebagai contoh template.

## 10. Kontrak Route Handler

Route Handler memakai `src/app/api/**/route.ts` atau lokasi setara pada struktur Next.js yang telah ada. Business logic berada pada `src/server/` atau lokasi server yang terdokumentasi. Tidak ada controller NestJS atau folder `backend/` terpisah.

| Method | Path | Akses | Fungsi |
|---|---|---|---|
| `POST` | `/api/auth/login` | publik terbatas | Membuat session owner setelah validasi kredensial. |
| `POST` | `/api/auth/logout` | owner | Menghapus session. |
| `GET`, `PATCH` | `/api/admin/profile` | owner | Membaca dan memperbarui profil. |
| `GET`, `POST`, `PATCH`, `DELETE` | `/api/admin/skill-groups` | owner | Mengelola grup skill. |
| `GET`, `POST`, `PATCH`, `DELETE` | `/api/admin/skills` | owner | Mengelola skill. |
| `GET`, `POST`, `PATCH`, `DELETE` | `/api/admin/learning-tracks` | owner | Mengelola learning track. |
| `GET`, `POST` | `/api/admin/projects` | owner | Menampilkan dan membuat project. |
| `GET`, `PATCH`, `DELETE` | `/api/admin/projects/[id]` | owner | Membaca, mengubah, atau menghapus satu project. |

Semua payload mutasi wajib divalidasi dengan Zod. Respons error tidak boleh membocorkan stack trace, hash password, atau detail internal database.

## 11. UX/UI Dashboard

### 11.1 Arah desain

- Dashboard memakai design system Cyber-Industrial Developer Notebook yang sudah terkunci di `portfolio/STYLESEED.md`.
- Gunakan layout aplikasi yang scanable, density sedang-tinggi, navigasi jelas, dan aksen emerald atau cyan yang konsisten.
- Dashboard tidak memakai hero marketing, testimonial, logo wall, chart contoh, atau kartu statistik dekoratif.
- Informasi status menggunakan teks, ikon, dan warna hanya ketika status memiliki arti nyata.
- Komponen harus memakai semantic HTML, focus ring terlihat, dan keyboard navigation lengkap.

### 11.3 Urutan frontend terlebih dahulu

- Sebelum data, auth, Prisma, dan Route Handler tersedia, dashboard boleh dibangun sebagai preview frontend statis.
- Preview memakai data template yang diberi penanda jelas. Angka, aktivitas, dan statusnya bukan bukti data database atau persistence.
- Preview mencakup login visual, shell dashboard, ringkasan, profile, skills, learning tracks, daftar project, dan editor project.
- Proteksi route, login yang berfungsi, simpan, publish, hapus, validasi server, dan data nyata tetap dimulai pada Phase 2 dan Phase 3.

### 11.2 Navigasi dan responsivitas

- Desktop memakai sidebar atau header aplikasi yang ringkas dengan tautan Dashboard, Profile, Skills, Learning Tracks, Projects, dan Logout.
- Mobile memakai navigasi yang tidak menutupi aksi form utama dan dapat ditutup dengan Escape bila berbentuk dialog atau drawer.
- Tabel project pada mobile berubah menjadi daftar atau kartu ringkas, bukan tabel yang overflow horizontal.
- Form memakai label di atas input, helper text jika dibutuhkan, dan error di bawah field.

### 11.3 State wajib

- Loading skeleton untuk data dashboard dan daftar project.
- Empty state dengan aksi yang menjelaskan cara menambah konten.
- Inline error untuk field form dan error global yang tidak membocorkan detail internal.
- Success feedback setelah simpan, publish, unpublish, atau hapus.
- Confirm dialog untuk hapus project.
- Disabled state selama request mutasi berjalan.
- `prefers-reduced-motion` untuk transisi yang ditambahkan.

## 12. Keamanan dan Privasi

- Password hanya disimpan sebagai hash yang kuat. Tidak pernah dikirim kembali ke browser atau log.
- Session memakai cookie aman dan diverifikasi di server pada setiap request admin.
- Login dibatasi, error generik, dan audit keamanan dependency dijalankan saat auth ditambahkan.
- Semua input publik dan admin divalidasi dengan Zod.
- URL gambar, GitHub, dan demo dibatasi ke protocol yang diizinkan. Tidak ada fetch server-side terhadap URL input pengguna tanpa validasi SSRF.
- Aksi hapus membutuhkan konfirmasi UI dan hanya dapat dilakukan oleh owner.
- Media upload belum dibuat agar tidak menyimpan file pada disk lokal sebagai solusi production.

## 13. Nonfungsional

### 13.1 Performa

- Portfolio publik tetap memakai Server Components dan `next/image` untuk aset lokal.
- Dashboard memuat data sesuai halaman, tanpa mengambil seluruh database pada setiap route.
- Daftar project dipaginasi atau dibatasi ketika jumlahnya sudah tidak nyaman dibaca.
- Revalidasi halaman publik hanya terjadi setelah mutasi konten yang relevan berhasil.

### 13.2 Accessibility

- WCAG 2.2 AA untuk alur utama publik dan admin.
- Seluruh aksi penting dapat dijalankan dengan keyboard.
- Heading, landmark, label, error, focus, kontras, dan reduced motion diverifikasi.

### 13.3 Deployment dan database

- Development database dapat memakai SQLite di folder root `databases/` untuk data contoh lokal.
- Production database harus memakai layanan yang durable sebelum dashboard diterbitkan untuk pengguna nyata.
- `DATABASE_URL`, secret session, dan kredensial owner hanya berasal dari environment variables.
- Migrations, seed, backup, dan rollback harus didokumentasikan sebelum deploy production.

## 14. Acceptance Criteria

### 14.1 Portfolio publik

- Halaman publik hanya menampilkan project published.
- Tiga project contoh tetap jelas sebagai template sampai diganti dengan karya pemilik.
- Navigasi, metadata, image fallback, mobile menu, dan route `not-found` bekerja tanpa console error kritis.

### 14.2 Dashboard admin

- Akses `/dashboard` tanpa session diarahkan ke `/login`.
- Login valid membuat session owner dan logout mencabutnya.
- Request API admin tanpa session mendapat respons tidak berwenang.
- Owner dapat mengelola profil, skill, learning track, dan project melalui UI.
- Project draft tidak dapat dilihat dari `/projects` atau `/projects/[slug]` publik.
- Mutasi project sukses memperbarui tampilan dashboard dan konten publik setelah revalidasi.
- Slug duplikat, URL invalid, field wajib kosong, dan hapus project memiliki pesan error atau konfirmasi yang jelas.
- Desktop dan mobile dashboard lolos URL/H1, console, failed-network, keyboard, dan visual review.
- `npm run lint`, `npx tsc --noEmit`, test relevan, Prisma validation, dan `npm run build` lulus.

## 15. Prioritas Fase

### Phase 1 - Frontend Portfolio Publik

- Menyelesaikan halaman publik, data contoh, responsivitas, aksesibilitas, dan visual lock.
- Status: selesai untuk scope template pelajar.

### Phase 1B - Dashboard Frontend Preview

- [FE] Bangun login visual, shell dashboard responsif, dan ringkasan status konten template.
- [FE] Bangun tampilan statis profile, skills, learning tracks, daftar project, serta form create dan edit project.
- [FE] Gunakan data contoh yang eksplisit berstatus preview. Jangan membuat API, database, atau simulasi persistence.
- [FE] Uji visual desktop dan mobile, keyboard, focus, reduced motion, loading, empty, dan error states yang dapat dipakai kembali saat backend tersedia.
- Status: dikerjakan sebelum Phase 2 atas instruksi product owner.

### Phase 2 - Data dan Auth Foundation

- [OPS] Siapkan database development di `databases/` dan environment example.
- [BE] Definisikan Prisma schema dan migration untuk model dashboard.
- [BE] Buat seed owner dan data template yang aman untuk development.
- [BE] Buat session owner, login, logout, route guard, dan rate limit login.
- [FE] Buat `/login`, shell dashboard, navigasi responsif, serta state loading, empty, error, dan success.

### Phase 3 - Dashboard Content CRUD

- [BE] Implementasikan Route Handler dan Zod schema profile.
- [FE] Implementasikan halaman profile dan feedback simpan.
- [BE] Implementasikan Route Handler dan validasi skill group, skill, dan learning track.
- [FE] Implementasikan halaman skills dan learning tracks dengan create, edit, urutkan, dan hapus.
- [BE] Implementasikan Route Handler project dengan slug unik, status draft, dan constraint URL.
- [FE] Implementasikan daftar project, form create/edit, publish toggle, empty state, dan confirm delete.

### Phase 4 - Integrasi Publik dan Hardening

- [BE] Ganti sumber data publik dari contoh lokal ke query aman yang hanya membaca record published.
- [FE] Tambahkan revalidasi publik setelah mutasi dashboard berhasil.
- [FE] Uji draft tidak bocor ke halaman publik.
- [BE] Uji auth boundary, validasi input, rate limit, dan error sanitization.
- [OPS] Validasi migration, seed, backup, dan env deployment.

### Phase 5 - Quality Assurance

- [FE] Uji dashboard dan halaman publik pada 360px, 768px, 1024px, dan 1440px.
- [FE] Uji keyboard, focus, loading, empty, error, success, dark mode, dan reduced motion.
- [BE] Uji login, logout, unauthorized API, CRUD, slug duplicate, draft visibility, dan delete confirmation.
- [OPS] Jalankan lint, typecheck, test, build, security audit, dan deploy rehearsal.

## 16. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Dashboard menambah kompleksitas terlalu cepat | Portfolio publik berhenti stabil | Kerjakan Phase 2 sampai 5 setelah frontend publik terkunci. |
| Session atau login lemah | Akses admin bocor | Cookie aman, guard server-side, rate limit, dan test unauthorized. |
| Data draft tampil ke publik | Klaim atau konten belum siap bocor | Status `DRAFT` default dan filter `PUBLISHED` pada semua query publik. |
| Upload gambar dibuat tanpa storage | File hilang saat deploy | MVP hanya path atau URL. Storage production menjadi keputusan terpisah. |
| Dashboard berisi metrik palsu | Mengurangi kepercayaan | Tampilkan status konten nyata saja. |
| SQLite dipakai sebagai storage production | Data tidak durable | Gunakan hanya untuk development. Pilih database managed sebelum deploy. |

## 17. Keputusan yang Tersisa

1. Email owner pertama untuk seed development.
2. Secret session dan kebijakan rotasinya pada production.
3. Pilihan database production dan strategi backup.
4. Apakah gambar project tetap memakai path atau URL sampai storage production dipilih.
5. Apakah contact form diperlukan setelah dashboard dasar selesai.
6. Kapan data contoh diganti dengan karya, link, dan kontak pemilik yang faktual.

## 18. Definition of Done

Sebuah fitur dashboard selesai bila:

- Kriteria penerimaan dan state UI terkait terpenuhi.
- Route, Route Handler, dan query owner terlindungi server-side.
- Input tervalidasi dan error aman.
- Tidak ada `any` tanpa alasan kuat, console error kritis, lint error, type error, atau build error.
- Test paling kecil yang melindungi logika baru tersedia dan lulus.
- Desktop dan mobile telah ditinjau untuk hierarchy, aksesibilitas, responsivitas, dan state interaksi.
- Tracker `docs/PRD.tasks.md` diperbarui dengan hasil verifikasi nyata.

Dashboard frontend preview hanya selesai bila route, shell, responsivitas, dan state visual telah diverifikasi. Preview tidak memenuhi definition of done dashboard admin sampai auth, database, API, validasi server, dan persistence pada Phase 2 sampai Phase 5 selesai.
