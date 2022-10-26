const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <div>Header</div>
      <div className="bg-blue-700 flex min-h-[calc(100vh-75px)] max-h-fit mt-[calc(28px+75px)] max-w-[1566px] mx-auto">
        {children}
      </div>
    </>
  );
};

export default Layout;
