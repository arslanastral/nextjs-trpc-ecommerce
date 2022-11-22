import { Title } from '@mantine/core';
import { trpc } from '@/utils/trpc';
import OrderItem from '@/lib/components/Dashboard/Seller/Orders/OrderItem';

function Orders() {
  const { data, isLoading, error } = trpc.order.getSellerOrders.useQuery();

  return (
    <div className="p-2">
      <Title order={1}>Orders</Title>

      {data && !data.length && (
        <Title order={4} weight={300} color="dimmed" className="flex items-center" mt={20}>
          You haven&apos;t received any orders yet.
        </Title>
      )}

      {data &&
        data.map((order, i) => {
          return (
            <OrderItem
              id={order.id}
              key={i}
              bags={order.Bag}
              orderStatus={order.status}
              totalPrice={order.totalPriceInCents ?? ''}
            />
          );
        })}
    </div>
  );
}

export default Orders;
