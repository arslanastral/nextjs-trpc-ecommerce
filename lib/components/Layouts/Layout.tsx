import Header from '../Core/Header';

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <Header />
      <div className="flex min-h-[calc(100vh-75px)] max-h-fit mt-[calc(28px+75px)] max-w-[1566px] mx-auto">
        {children}
      </div>
    </>
  );
};

export default Layout;
