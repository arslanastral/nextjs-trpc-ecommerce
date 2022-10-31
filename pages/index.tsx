import Head from 'next/head';
import { PageWithLayout } from '@/lib/types/page';
import { ReactElement } from 'react';
import Layout from '@/lib/components/Layouts/Layout';
import { useSession, signOut } from 'next-auth/react';
import Products from '@/lib/components/Core/Products';

const Home: PageWithLayout = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-col p-6 items-center justify-center 2xl:justify-around min-h-screen min-w-full text-white">
      <Head>
        <title>Zavy</title>
        <meta name="description" content="An ecommerce store" />
      </Head>

      <Products />
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
