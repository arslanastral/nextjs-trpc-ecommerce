import { Text, Button, Modal, Badge, Title } from '@mantine/core';
import { ItemInfo } from '@/lib/components/Cart/ItemInfo';
import {
  IconBuildingStore,
  IconFileInvoice,
  IconBox,
  IconReceipt2,
  IconReceipt,
  IconHash
} from '@tabler/icons';
import Link from 'next/link';
import { useState } from 'react';
import { OrderTimeline } from './OrderTimeline';
import { statusMap } from '../../Seller/Orders/OrderItem';

export type Bag = {
  item: {
    title: string;
    image: string;
    priceInCents: string;
  };
  productId: string;
  itemCount: number;
};

export type BuyerOrderProps = {
  id: string;
  bags: Bag[];
  sellerName: string;
  paymentStatus?: 'PENDING' | 'SUCCESS' | 'FAILED';
  orderStatus:
    | 'OUTOFSTOCK'
    | 'USERCANCELLED'
    | 'SELLERCANCELLED'
    | 'PROCESSING'
    | 'PACKED'
    | 'SHIPPED'
    | 'OUTFORDELIVERY'
    | 'DELIVERED';
  totalPrice: string;
  paymentLink?: string;
};

function OrderItem({
  id,
  bags,
  sellerName,
  paymentStatus,
  orderStatus,
  totalPrice,
  paymentLink
}: BuyerOrderProps) {
  const [opened, setOpened] = useState<boolean>(false);

  let paymentInfo = '';
  if (paymentStatus === 'PENDING') {
    paymentInfo = 'Payment Pending';
  } else {
    paymentInfo = 'Payment Failed';
  }

  let badgeColor = '';
  if (paymentStatus === 'PENDING' || paymentStatus === 'FAILED') {
    badgeColor = 'orange';
  } else {
    badgeColor = '';
  }

  return (
    <div className="mt-4 rounded-lg p-4 bg-white">
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <Title order={4} weight={300} color="dimmed" className="flex items-center">
          <IconHash /> {id}
        </Title>

        <OrderTimeline
          orderStatus={orderStatus}
          paymentStatus={paymentStatus}
          sellerName={sellerName}
        />
      </Modal>
      <div className="flex items-center justify-between">
        <Button leftIcon={<IconBuildingStore stroke={1.5} />} variant="subtle">
          {sellerName}
        </Button>
        <Badge color={badgeColor}>
          {paymentStatus === 'SUCCESS' ? statusMap[orderStatus] : paymentInfo}
        </Badge>
      </div>

      {bags && (
        <div className="border rounded-lg mt-4">
          {bags.map((bag, i) => {
            return (
              <div key={i} className="p-3">
                <ItemInfo
                  price={(+bag.item.priceInCents / 100).toString()}
                  image={bag.item.image}
                  quantity={bag.itemCount}
                  title={bag.item.title}
                  productId={bag.productId}
                />
              </div>
            );
          })}
        </div>
      )}
      <div className="flex justify-between mt-4 items-center flex-col lg:flex-row">
        {totalPrice && (
          <Text className="text-md pl-3 flex gap-2 text-brown-500">
            <IconFileInvoice stroke={1.5} /> ${(+totalPrice / 100).toString()}
          </Text>
        )}

        <div className="flex items-center gap-4 mt-4">
          {paymentStatus === 'SUCCESS' ? (
            <>
              <Button
                component={Link}
                href={`/dashboard/buyer/orders/${id}`}
                variant="outline"
                leftIcon={<IconReceipt stroke={1.5} size={20} />}
              >
                View Order
              </Button>
              <Button
                onClick={() => setOpened(true)}
                variant="outline"
                leftIcon={<IconBox stroke={1.5} size={20} />}
              >
                Track Order
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                href={`/dashboard/buyer/orders/${id}`}
                variant="outline"
                leftIcon={<IconReceipt stroke={1.5} size={20} />}
              >
                View Order
              </Button>
              <Button
                component={Link}
                href={paymentLink ?? ''}
                variant="outline"
                leftIcon={<IconReceipt2 stroke={1.5} size={20} />}
              >
                Pay Now
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
