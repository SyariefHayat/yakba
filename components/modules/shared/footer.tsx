import { BOTTOM_LINKS, FOOTER_ITEMS } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
  icon?: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
  isSocialMedia?: boolean;
}

const Footer = () => {
  return (
    <footer className="px-5 sm:px-10 pb-6 sm:pb-10">
      {/* Columns */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-nowrap md:justify-between gap-8 md:gap-4">
        {FOOTER_ITEMS.map((column, index) => (
          <FooterColumn key={index} {...column} />
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="w-full mt-8 sm:mt-10 lg:mt-15 mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-2 md:gap-0 font-poppins text-xs md:text-sm text-center">
        <p>© 2025 Yakba Learning Center. All rights reserved.</p>
        <div className="flex gap-4">
          {BOTTOM_LINKS.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="hover:underline cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({
  title,
  links,
  isSocialMedia = false,
}: FooterColumn) => {
  return (
    <div className="w-fit">
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-mochi">{title}</h3>

      {isSocialMedia ? (
        <div className="w-36 sm:w-40 mt-2 grid grid-cols-3 gap-4 md:gap-4">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            >
              <Image
                src={link.icon || ""}
                alt={link.label}
                width={100}
                height={100}
                className={`${
                  link.label === "YouTube"
                    ? "w-7 h-6 mt-0.5 md:w-8 md:h-7 md:mt-0.75 lg:w-10 lg:h-8 lg:mt-1.5"
                    : "w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10"
                }`}
              />
            </Link>
          ))}
        </div>
      ) : (
        <ul className="text-sm sm:text-base md:text-lg font-poppins space-y-1 md:space-y-2 mt-2">
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link.href} className="hover:underline cursor-pointer">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Footer;
