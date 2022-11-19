import { Text, Button, Badge } from '@mantine/core';
import { ItemInfo } from '@/lib/components/Cart/ItemInfo';
import { IconBuildingStore, IconFileInvoice, IconBox } from '@tabler/icons';

type Bag = {
  item: {
    title: string;
    image: string;
    priceInCents: string;
  };
  productId: string;
  itemCount: number;
};

type BuyerOrderProps = {
  bags: Bag[];
  sellerName: string;
  paymentStatus: string;
  orderStatus: string;
  totalPrice: string;
};

function Order({ bags, sellerName, paymentStatus, orderStatus, totalPrice }: BuyerOrderProps) {
  return (
    <div className="mt-4 rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between">
        <Button leftIcon={<IconBuildingStore stroke={1.5} />} variant="subtle">
          {sellerName}
        </Button>
        <Badge>{paymentStatus === 'SUCCESS' ? orderStatus : paymentStatus}</Badge>
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
      <div className="flex justify-between mt-4 items-center">
        <Text className="text-md pl-3 flex gap-2 text-brown-500">
          <IconFileInvoice stroke={1.5} /> ${totalPrice}
        </Text>

        <Button variant="outline" leftIcon={<IconBox stroke={1.5} size={20} />}>
          Track Order
        </Button>
      </div>
    </div>
  );
}

export default Order;
