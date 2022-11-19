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
  paymentStatus: 'PENDING' | 'SUCCESS' | 'FAILED' | undefined;
}) {
  return (
    <div className="bg-white p-10 rounded-lg lg:min-w-[400px]">
      <Title order={2} weight={300} color="dark" mb={15}>
        Payment
      </Title>
      <PricePreview price={totalPriceInCents} shippingPrice="Free" />
      {paymentStatus === 'PENDING' ||
        (paymentStatus === 'FAILED' && (
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
        ))}
    </div>
  );
}
