import Image from "next/image";

const Navbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Left logos */}
        <div className="flex items-center gap-3">
          <Image
            src="/yakba-kinder.png"
            alt="Yakba Kinder"
            width={64}
            height={64}
          />
          <Image
            src="/akba-kinder.png"
            alt="Akba Kinder"
            width={64}
            height={64}
          />
        </div>

        {/* Right logos */}
        <div className="hidden items-center gap-3 md:flex">
          <Image src="/yakba.png" alt="Yakba" width={56} height={56} />
          <Image src="/akba.png" alt="Akba" width={56} height={56} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
