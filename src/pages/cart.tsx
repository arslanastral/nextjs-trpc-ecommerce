import Head from 'next/head';
import { PageWithLayout } from '@/lib/types/page';
import { ReactElement } from 'react';
import Layout from '@/lib/components/Layouts/Layout';
import { useSession, signOut } from 'next-auth/react';
import Cart from '@/lib/components/Cart/Cart';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, res } = ctx;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};

const CartPage: PageWithLayout = () => {
  const { data: session, status } = useSession();

  return (
    <div className="p-6 min-h-screen min-w-full text-white">
      <Head>
        <title>My Cart | Zavy</title>
        <meta name="description" content="An ecommerce store" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Cart />
    </div>
  );
};

CartPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CartPage;
