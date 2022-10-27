function NavBar({
  className,
  pages = [
    'New',
    'Health & Beauty',
    `Women's Fasion`,
    `Men's Fashion`,
    'Luxury',
    'Electronics',
    'Sport',
    'Other'
  ]
}: {
  pages?: string[];
  className?: string;
}) {
  return (
    <nav className="flex w-full h-24 justify-center items-center text-black text-2xl divide-x-2">
      {pages.map((page, i) => (
        <a className={'px-5 cursor-pointer'} key={i}>
          {page}
        </a>
      ))}
    </nav>
  );
}

export default NavBar;
