import { Title, Badge, Text } from '@mantine/core';
import { IconHash, IconBuildingStore } from '@tabler/icons';
import OrderInfo from '@/lib/components/Dashboard/Buyer/Orders/OrderInfo';
import { type Bag, SellerOrderProps } from './OrderItem';
import OrderAddress from '@/lib/components/Dashboard/Buyer/Orders/OrderAddress';
import { PaymentSummary } from '@/lib/components/Dashboard/Buyer/Orders/PaymentSummary';

export type OrderAddressType = {
  address: {
    isDefault: boolean;
    addressLine1: string;
    city: string;
    postalCode: string | null;
    region: string;
    country: string;
    id: string;
  } | null;
};

type OrderPropsWithAddress = OrderAddressType & SellerOrderProps;

function Order({ id, bags, orderStatus, totalPrice, address }: OrderPropsWithAddress) {
  return (
    <div className="p-3">
      <Title order={1}>Buyer Order</Title>
      <div className="flex items-center gap-3 mt-4 flex-wrap">
        <Title order={4} weight={300} color="dimmed" className="flex items-center">
          <IconHash /> {id}
        </Title>
      </div>

      <div className="flex gap-4 mt-10 flex-col xl:flex-row">
        <OrderInfo data={bags} />
      </div>
      <div className="flex gap-4 mt-4 flex-col xl:flex-row">
        <OrderAddress address={address} />
        <PaymentSummary totalPriceInCents={(+totalPrice / 100).toString()} />
      </div>
    </div>
  );
}

export default Order;
