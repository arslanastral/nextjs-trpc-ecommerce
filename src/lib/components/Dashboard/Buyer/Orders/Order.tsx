import { Title, Badge, Text } from '@mantine/core';
import { IconHash, IconBuildingStore } from '@tabler/icons';
import OrderInfo from './OrderInfo';
import { OrderTimeline } from './OrderTimeline';
import { type Bag, BuyerOrderProps } from './OrderItem';

function Order({
  id,
  bags,
  sellerName,
  paymentStatus,
  orderStatus,
  totalPrice,
  paymentLink
}: BuyerOrderProps) {
  return (
    <div className="p-8">
      <Title order={1}>Your Order</Title>
      <div className="flex items-center gap-4 mt-2">
        <Title order={4} weight={300} color="dimmed" className="flex items-center">
          <IconHash /> {id}
        </Title>
        <Title order={4} weight={300} color="dimmed" className="flex items-center gap-2">
          <IconBuildingStore stroke={1.5} /> {sellerName}
        </Title>
      </div>

      <div className="flex gap-4 mt-10">
        <div className="bg-white">
          <OrderInfo data={bags} />
        </div>
        <OrderTimeline />
      </div>
    </div>
  );
}

export default Order;
