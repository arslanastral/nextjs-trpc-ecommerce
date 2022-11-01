import Head from 'next/head';
import { PageWithLayout } from '@/lib/types/page';
import { ReactElement } from 'react';
import { DashboardLayout } from '@/lib/components/Layouts/DashboardLayout';
import { useSession, signOut } from 'next-auth/react';

const BuyerDashboard: PageWithLayout = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Zavy | Buyer</title>
        <meta name="description" content="An ecommerce store" />
      </Head>

      <div>Hello Buyer</div>
    </>
  );
};

BuyerDashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default BuyerDashboard;
