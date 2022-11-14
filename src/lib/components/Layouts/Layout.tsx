import Header from '../Core/Header';

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <Header />
      <div className="flex mt-0 lg:mt-16 max-w-[1566px] mx-auto">{children}</div>
    </>
  );
};

export default Layout;
