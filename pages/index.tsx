import Head from 'next/head';
import { PageWithLayout } from '@/lib/types/page';
import { ReactElement } from 'react';
import Layout from '@/lib/components/Layouts/Layout';
import { useSession, signOut } from 'next-auth/react';

const Home: PageWithLayout = () => {
  const { data: session, status } = useSession();
  return (
    <div className="flex items-center justify-center 2xl:justify-around min-h-screen min-w-full bg-black text-white">
      <Head>
        <title>Zavy</title>
        <meta name="description" content="An ecommerce store" />
      </Head>

      <h1 className="text-4xl">Store Items</h1>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
