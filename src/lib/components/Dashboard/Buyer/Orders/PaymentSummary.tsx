import PricePreview from '@/lib/components/Cart/PricePreview';
import { Timeline, Text, Title, Button } from '@mantine/core';
import Link from 'next/link';

export function PaymentSummary({
  totalPriceInCents,
  paymentStatus,
  paymentLink
}: {
  totalPriceInCents: string;
  paymentLink?: string;
  paymentStatus?: 'PENDING' | 'SUCCESS' | 'FAILED' | undefined;
}) {
  let paymentButton = false;
  if (paymentStatus === 'PENDING' || paymentStatus === 'FAILED') {
    paymentButton = true;
  }

  return (
    <div className="bg-white p-4 lg:p-10 rounded-lg lg:min-w-[411px]">
      <Title order={2} weight={300} color="dark" mb={15}>
        Payment
      </Title>
      <PricePreview price={totalPriceInCents} shippingPrice="Free" />
      {paymentButton && (
        <Button
          component={Link}
          href={`/payment/${paymentLink}`}
          fullWidth
          radius="md"
          mt={25}
          className="h-[45px] font-light text-lg"
        >
          Pay Now
        </Button>
      )}
    </div>
  );
}
