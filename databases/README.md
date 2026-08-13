# Local Database Setup Procedure

Folder ini digunakan untuk menyimpan file database pengembangan lokal (`dev.db`) serta seed dummy/development data sesuai aturan konstitusi Zagoour (`AGENTS.md`).

## File Structure

- `databases/dev.db` - SQLite database file untuk lingkungan pengembangan lokal (di-ignore dari git).
- `databases/.gitkeep` - Menjaga folder `databases/` tetap ada dalam versi kontrol.

## Prosedur Setup & Environment

1. Salin `.env.example` ke `.env` di folder `portfolio/`:
   ```bash
   cp portfolio/.env.example portfolio/.env
   ```
2. Pastikan isi `DATABASE_URL` di `portfolio/.env` mengarah ke SQLite lokal:
   ```env
   DATABASE_URL="file:../../databases/dev.db"
   SESSION_SECRET="change-this-to-a-random-secret-key-min-32-chars"
   ```
3. Jalankan Push Schema & Seed:
   ```bash
   cd portfolio
   npx prisma db push
   npx prisma db seed
   ```
