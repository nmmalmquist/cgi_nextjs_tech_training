'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();
    const links = [{ name: "About Me", href: "/content/about" }, { name: "API", href: "/content/beer" }, { name: "Test Link 2", href: "/test2" }, { name: "Test Link 3", href: "/test3" }, { name: "Test Link 4", href: "/test4" }];
    return (
        <nav className="flex flex-row justify-between items-center px-3 md:px-10 lg:px-48 bg-black py-5" style={{color: "white"}}>
          <h1 className="text-3xl">Nicks Website</h1>
            <ul className="flex gap-10">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link className={`${link.href === pathname && "text-blue-300 underline"}`} href={link.href}>
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
