# Runbook Operasional & Database Cutover

Dokumen ini berisi panduan operasional manajemen database, environment, seeding, backup, serta prosedur cutover ke database produksi untuk aplikasi Student Developer Portfolio.

---

## 1. Environment & Konfigurasi Security

### Environment Variables
Pastikan file `.env` diisi dengan konfigurasi yang valid (gunakan [.env.example](file:///D:/Project/Template/portfolio%20v1/.env.example) sebagai acuan):

- `DATABASE_URL`: Connection string ke database (contoh dev: `file:../databases/dev.db`, contoh prod PostgreSQL: `postgresql://user:pass@host:5432/dbname?sslmode=require`).
- `SESSION_SECRET`: Random string minimal 32 karakter untuk enkripsi session cookie.
- `ADMIN_USERNAME`: Username akun admin/owner.
- `ADMIN_PASSWORD_HASH`: Hashing password akun admin (menggunakan bcrypt).
- `NEXT_PUBLIC_SITE_URL`: Domain publik aplikasi produksi (contoh: `https://domainanda.com`).

---

## 2. Manajemen Database Lokal (SQLite Dev)

### Schema Validation & Migration
Untuk memvalidasi schema Prisma:
```bash
cd portfolio
npx prisma validate
```

Untuk menjalankan migrasi lokal baru:
```bash
cd portfolio
npx prisma migrate dev --name <nama-migrasi>
```

### Seeding Data Development
Untuk mengisi data awal (1 user owner + data template):
```bash
cd portfolio
npx prisma db seed
```
*Catatan:* Seeding akan menggunakan credential dari `ADMIN_USERNAME` dan `ADMIN_PASSWORD_HASH` di `.env`.

### Backup Database SQLite Dev
Secara berkala atau sebelum migrasi besar, salin file database lokal di `databases/dev.db`:
```bash
# Power Shell
Copy-Item databases/dev.db databases/dev.db.bak-$(Get-Date -Format "yyyyMMddHHmmss")
```

---

## 3. Prosedur Cutover Database Produksi (PostgreSQL)

SQLite hanya digunakan untuk lingkungan development lokal. Untuk deployment produksi, gunakan PostgreSQL (misal via Supabase, Neon, atau Managed PostgreSQL Coolify/Vercel).

### Langkah Cutover Produksi:

1. **Ubah Provider Prisma (bila diperlukan untuk PostgreSQL)**:
   - Di `portfolio/prisma/schema.prisma`, sesuaikan `datasource db`:
     ```prisma
     datasource db {
       provider = "postgresql"
       url      = env("DATABASE_URL")
     }
     ```

2. **Jalankan Migrasi ke Database Produksi**:
   ```bash
   cd portfolio
   npx prisma migrate deploy
   ```

3. **Seeding Akun Owner Produksi**:
   - Pastikan `.env` produksi sudah diset dengan `ADMIN_USERNAME` & `ADMIN_PASSWORD_HASH` yang aman.
   - Jalankan seed:
     ```bash
     cd portfolio
     npx prisma db seed
     ```

4. **Prosedur Backup & Restore PostgreSQL Produksi**:
   - **Backup**:
     ```bash
     pg_dump -U <user> -h <host> -d <dbname> > backup-$(date +%Y%m%m_%H%M%S).sql
     ```
   - **Restore**:
     ```bash
     psql -U <user> -h <host> -d <dbname> < backup-file.sql
     ```

5. **Verifikasi Post-Cutover**:
   - Uji akses login admin di `/login`.
   - Uji penambahan/perubahan publikasi project di `/dashboard/projects`.
   - Pastikan hanya konten berkategori `PUBLISHED` yang tampil pada halaman publik (`/`, `/projects`, `/projects/[slug]`).
