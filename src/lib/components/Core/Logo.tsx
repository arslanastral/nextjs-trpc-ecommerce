function Logo({ className, name = 'ZAVY' }: { name?: string; className?: string }) {
  return (
    <div className="flex w-full pt-8 pb-16 h-full lg:pb-4 justify-center items-start text-black font-logo text-6xl">
      {name}
    </div>
  );
}

export default Logo;
