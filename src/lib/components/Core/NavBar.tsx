import Link from 'next/link';
import { pages } from './SideNavBar';

function NavBar({ className }: { className?: string }) {
  return (
    <nav className="hidden w-full h-24 justify-center items-center font-light text-black text-xl divide-x-2 xl:text-2xl lg:flex">
      {pages.map((page, i) => (
        <Link
          href={page.link}
          className={'px-5 cursor-pointer hover:underline hover:decoration-green-600'}
          key={i}
        >
          {page.label.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}

export default NavBar;
