import { Text, Button, Badge, Title } from '@mantine/core';
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

export type Bag = {
  item: {
    title: string;
    image: string;
    priceInCents: string;
  };
  productId: string;
  itemCount: number;
};

export const statusMap = {
  OUTOFSTOCK: 'Out Of Stock',
  USERCANCELLED: 'Cancelled',
  SELLERCANCELLED: 'Seller Cancelled',
  PROCESSING: 'Processing',
  PACKED: 'Order Packed',
  SHIPPED: 'Order Shipped',
  OUTFORDELIVERY: 'Out For Delivery',
  DELIVERED: 'Delivered'
};

export type SellerOrderProps = {
  id: string;
  bags: Bag[];
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
};

function OrderItem({ id, bags, orderStatus, totalPrice }: SellerOrderProps) {
  return (
    <div className="mt-4 rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between">
        <Badge>{statusMap[orderStatus]}</Badge>
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
          <Button
            component={Link}
            href={`/dashboard/seller/orders/${id}`}
            variant="outline"
            leftIcon={<IconReceipt stroke={1.5} size={20} />}
          >
            View Order
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
