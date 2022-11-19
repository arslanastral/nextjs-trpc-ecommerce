import { Title } from '@mantine/core';
import { trpc } from '@/utils/trpc';
import Order from './Order';
import { RouterOutput } from '@/utils/trpc';

type BuyerOrder = RouterOutput['order']['getBuyerOrders'];

function Orders() {
  const { data, isLoading, error } = trpc.order.getBuyerOrders.useQuery();

  if (data) {
    console.log(data);
  }

  return (
    <div className="p-8">
      <Title order={1}>My Orders</Title>
      {data &&
        data.map((order, i) => {
          return (
            <Order
              key={i}
              bags={order.Bag}
              orderStatus={order.status}
              paymentStatus={order.payment?.status}
              sellerName={order.seller.storeName}
              totalPrice={order.totalPriceInCents ?? ''}
            />
          );
        })}
    </div>
  );
}

export default Orders;
