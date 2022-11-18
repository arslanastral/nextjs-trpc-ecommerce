import Head from 'next/head';
import { Loader } from '@mantine/core';
import { ReactElement } from 'react';
import { trpc } from '@/utils/trpc';
import { PaymentLayout } from '@/lib/components/Layouts/PaymentLayout';
import NextError from 'next/error';
import { PageWithLayout } from '@/lib/types/page';
import { useRouter } from 'next/router';
import PaymentInfo from '@/lib/components/Payment/PaymentInfo';

const PaymentCheckPage: PageWithLayout = () => {
  const id = useRouter().query.id as string;
  const { data, error, isLoading } = trpc.order.verify.useQuery({ id }, { enabled: !!id });

  if (error) {
    return <NextError title={error.message} statusCode={error.data?.httpStatus ?? 500} />;
  }

  return (
    <>
      <Head>
        <title>Payment | Zavy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {isLoading && (
        <div className="w-full flex items-center justify-center min-h-[300px]">
          <Loader size={50} />
        </div>
      )}
      {!isLoading && <PaymentInfo status={data?.status} checkoutLink={data?.link} />}
    </>
  );
};

PaymentCheckPage.getLayout = function getLayout(page: ReactElement) {
  return <PaymentLayout>{page}</PaymentLayout>;
};

export default PaymentCheckPage;
