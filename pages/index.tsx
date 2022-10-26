import Head from 'next/head';
import { PageWithLayout } from '@/lib/types/page';
import { ReactElement } from 'react';
import Layout from '@/lib/components/Layouts/Layout';

const Home: PageWithLayout = () => {
  return (
    <div className="flex items-center justify-center 2xl:justify-around min-h-screen min-w-full bg-black text-white">
      <Head>
        <title>Store</title>
        <meta name="description" content="An ecommerce store" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛒</text></svg>"
        />
      </Head>

      <h1 className="text-4xl">Store Items</h1>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
