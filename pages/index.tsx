import Head from 'next/head';
import { PageWithLayout } from '@/lib/types/page';
import { ReactElement } from 'react';
import Layout from '@/lib/components/Layouts/Layout';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const Home: PageWithLayout = () => {
  const { data: session, status } = useSession();
  return (
    <div className="flex items-center justify-center 2xl:justify-around min-h-screen min-w-full bg-black text-white">
      <Head>
        <title>Zavy</title>
        <meta name="description" content="An ecommerce store" />
      </Head>

      <h1 className="text-4xl">Store Items</h1>
      <h2 className="text-4xl">
        {session && `Signed in as: ${session?.user?.name}`}
        {session && (
          <button className="bg-blue-700 m-2 p-6" onClick={() => signOut()}>
            Sign Out
          </button>
        )}
        {!session && (
          <Link href="/login">
            <a className="text-blue-700">Login</a>
          </Link>
        )}
      </h2>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
