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
    <footer className="p-10">
      <div className="w-full flex flex-wrap md:flex-nowrap justify-between gap-8 md:gap-0">
        {/* All Columns (including Social Media) */}
        {FOOTER_ITEMS.map((column, index) => (
          <FooterColumn key={index} {...column} />
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="w-full mt-10 lg:mt-15 mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-2 md:gap-0 font-poppins text-xs md:text-sm text-center">
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
      <h3 className="text-4xl font-mochi">{title}</h3>

      {isSocialMedia ? (
        // Render Social Media Icons
        <div className="w-40 mt-2 grid grid-cols-3 gap-5 md:gap-4">
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
                className={`${link.label == "YouTube" ? "w-8 h-7 mt-0.75 md:w-10 md:h-8 md:mt-1.5" : "w-8 h-8 md:w-10 md:h-10"}`}
              />
            </Link>
          ))}
        </div>
      ) : (
        // Render Regular Links
        <ul className="text-base md:text-lg font-poppins space-y-1 md:space-y-2 mt-2">
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
