import { RouterOutput } from '@/utils/trpc';
import { Title } from '@mantine/core';

type BuyerOrderData = RouterOutput['order']['getBuyerOrderById'];

function Order(data: BuyerOrderData) {
  return (
    <div className="p-8">
      <Title order={1}>Your Order</Title>
      <div className="bg-black">Track</div>
    </div>
  );
}

export default Order;
