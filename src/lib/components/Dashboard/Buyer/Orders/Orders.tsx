import { Title } from '@mantine/core';
import { trpc } from '@/utils/trpc';
import OrderItem from './OrderItem';

function Orders() {
  const { data, isLoading, error } = trpc.order.getBuyerOrders.useQuery();

  if (data) {
    console.log(data);
  }

  return (
    <div className="p-2">
      <Title order={1}>My Orders</Title>
      {data &&
        data.map((order, i) => {
          let paymentStatus = order.payment?.status;
          let notPaid = paymentStatus === 'PENDING' || paymentStatus === 'FAILED';
          return (
            <OrderItem
              id={order.id}
              key={i}
              bags={order.Bag}
              orderStatus={order.status}
              paymentStatus={paymentStatus}
              sellerName={order.seller.storeName}
              totalPrice={order.totalPriceInCents ?? ''}
              paymentLink={
                notPaid
                  ? `${process.env.NEXT_PUBLIC_CURRENT_URL}payment/${order.payment?.refId}`
                  : ''
              }
            />
          );
        })}
    </div>
  );
}

export default Orders;
