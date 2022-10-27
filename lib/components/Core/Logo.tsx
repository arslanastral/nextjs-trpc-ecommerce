function Logo({ className, name = 'ZAVY' }: { name?: string; className?: string }) {
  return (
    <div className="flex w-full h-20 justify-center items-center text-black font-logo text-6xl">
      {name}
    </div>
  );
}

export default Logo;
