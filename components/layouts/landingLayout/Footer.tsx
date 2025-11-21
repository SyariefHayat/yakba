const Footer = () => {
  return (
    <footer className="mt-16 border-t border-sky-100 bg-white/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-slate-500 md:flex-row md:text-sm">
        <p>© {new Date().getFullYear()} Yakba Kinder. Semua hak dilindungi.</p>
        <p className="text-[11px] md:text-xs">
          Dibuat dengan ❤ untuk belajar yang ceria & menyenangkan.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
