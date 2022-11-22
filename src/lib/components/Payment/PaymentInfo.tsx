import { Button, Title, AspectRatio, Text, Skeleton, Loader } from '@mantine/core';
import { IconCircleCheck, IconAlertTriangle } from '@tabler/icons';
import Link from 'next/link';
import { useEffect } from 'react';

type PaymentInfoProps = {
  status?: 'complete' | 'expired' | 'open' | null;
  checkoutLink?: string | null;
};

function PaymentInfo({ status, checkoutLink }: PaymentInfoProps) {
  useEffect(() => {
    if (!status) {
      window.location.href = '/';
    }
  }, [status]);

  return (
    <div className="w-full rounded-lg flex justify-center items-center">
      <div className="p-6 flex items-center max-w-[500px] flex-1 flex-col justify-between min-h-[300px] rounded-lg">
        <div className="flex items-center">
          {status === 'complete' && (
            <>
              <IconCircleCheck size={60} color="green" stroke={1.5} />
              <Title order={1} weight={300} color="dark" ml={15}>
                Payment Successful
              </Title>
            </>
          )}
          {status === 'open' && (
            <>
              <IconAlertTriangle size={60} color="red" stroke={1.5} />
              <Title order={1} weight={300} color="dark" ml={15}>
                Payment Pending
              </Title>
            </>
          )}
        </div>

        <div className="w-full">
          {status === 'complete' && (
            <>
              <Button
                component={Link}
                href="/"
                variant="outline"
                fullWidth
                className="h-[45px] font-light text-lg"
              >
                Shop More
              </Button>
              <Button
                variant="outline"
                component={Link}
                href="/dashboard/buyer/orders"
                fullWidth
                mt={20}
                className="h-[45px] font-light text-lg"
              >
                View Orders
              </Button>
            </>
          )}
          {status === 'open' && checkoutLink && (
            <>
              <Button
                component={Link}
                href={checkoutLink}
                fullWidth
                className="h-[45px] font-light text-lg"
              >
                Pay Now
              </Button>
              <Button
                color="black"
                variant="outline"
                component={Link}
                href="/"
                fullWidth
                mt={20}
                className="h-[45px] font-light text-lg"
              >
                Pay Later
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentInfo;
