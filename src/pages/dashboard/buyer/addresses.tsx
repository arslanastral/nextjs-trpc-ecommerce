import Head from 'next/head';
import { PageWithLayout } from '@/lib/types/page';
import { ReactElement } from 'react';
import { DashboardLayout } from '@/lib/components/Layouts/DashboardLayout';
import { useSession, signOut } from 'next-auth/react';
import Address from '@/lib/components/Dashboard/Buyer/Address';

const BuyerAddresses: PageWithLayout = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Zavy | Address Book</title>
        <meta name="description" content="An ecommerce store" />
      </Head>

      <Address />
    </>
  );
};

BuyerAddresses.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default BuyerAddresses;
