import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div className="flex items-center justify-center 2xl:justify-around min-h-screen bg-black text-white">
      <Head>
        <title>Store</title>
        <meta name="description" content="An ecommerce store" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛒</text></svg>"
        />
      </Head>

      <h1 className="text-4xl">Store 🛒🔥🔥🔥</h1>
    </div>
  );
};

export default Home;
