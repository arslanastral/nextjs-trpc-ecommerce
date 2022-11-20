import { Title, Badge, Text } from '@mantine/core';
import { IconHash, IconBuildingStore } from '@tabler/icons';
import OrderInfo from './OrderInfo';
import { OrderTimeline } from './OrderTimeline';
import { type Bag, BuyerOrderProps } from './OrderItem';
import OrderAddress from './OrderAddress';
import { PaymentSummary } from './PaymentSummary';

export type OrderAddressType = {
  address: {
    isDefault?: boolean;
    addressLine1: string;
    city: string;
    postalCode: string | null;
    region: string;
    country: string;
    id?: string;
  } | null;
};

type OrderPropsWithAddress = OrderAddressType & BuyerOrderProps;

function Order({
  id,
  bags,
  sellerName,
  paymentStatus,
  orderStatus,
  totalPrice,
  paymentLink,
  address
}: OrderPropsWithAddress) {
  return (
    <div className="p-3">
      <Title order={1}>Your Order</Title>
      <div className="flex items-center gap-3 mt-4 flex-wrap">
        <Title order={4} weight={300} color="dimmed" className="flex items-center">
          <IconHash /> {id}
        </Title>
        <Title order={4} weight={300} color="dimmed" className="flex items-center gap-2">
          <IconBuildingStore stroke={1.5} /> {sellerName}
        </Title>
      </div>

      <div className="flex gap-4 mt-10 flex-col xl:flex-row">
        <OrderInfo data={bags} />

        <OrderTimeline
          orderStatus={orderStatus}
          paymentStatus={paymentStatus}
          sellerName={sellerName}
        />
      </div>
      <div className="flex gap-4 mt-4 flex-col xl:flex-row">
        <OrderAddress address={address} />
        <PaymentSummary
          totalPriceInCents={(+totalPrice / 100).toString()}
          paymentStatus={paymentStatus}
          paymentLink={paymentLink}
        />
      </div>
    </div>
  );
}

export default Order;
