function NavBar({
  className,
  pages = [
    'New',
    'Health & Beauty',
    `Women's Fasion`,
    `Men's Fashion`,
    'Luxury',
    'Electronics',
    'Sports',
    'Other'
  ]
}: {
  pages?: string[];
  className?: string;
}) {
  return (
    <nav className="hidden w-full h-24 justify-center items-center font-light text-black text-xl divide-x-2 xl:text-2xl lg:flex">
      {pages.map((page, i) => (
        <a className={'px-5 cursor-pointer hover:underline hover:decoration-green-600'} key={i}>
          {page.toUpperCase()}
        </a>
      ))}
    </nav>
  );
}

export default NavBar;
