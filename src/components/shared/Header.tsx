import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="max-w-[78rem] px-4 mx-auto" role="banner">
      <nav className="flex justify-between items-center gap-4 pt-6" role="navigation" aria-label="Main navigation">
        <Link href="/" className="flex items-center" aria-label="Go to homepage">
          <Image
            src="/images/logo-pokemon.svg"
            alt="Pokemon Logo"
            width={1080}
            height={1080}
            className="w-36 h-auto"
            priority
          />
        </Link>
      </nav>
    </header>
  );
}
