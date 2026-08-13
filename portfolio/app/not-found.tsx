import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell grid min-h-[65vh] content-center gap-7 py-16" id="main-content">
      <p className="eyebrow">404 / Halaman tidak ada</p>
      <h1 className="max-w-[8ch] text-[clamp(3.5rem,9vw,8rem)] font-[510] leading-[0.88] tracking-[-0.1em]">
        Halaman ini belum punya isi.
      </h1>
      <p className="max-w-[34rem] text-[1.06rem] leading-7 text-[var(--muted-foreground)]">
        Mungkin alamatnya berubah, atau project tersebut belum dibuat.
      </p>
      <div>
        <Link className="button-primary focus-ring" href="/">
          Kembali ke beranda <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </main>
  );
}
