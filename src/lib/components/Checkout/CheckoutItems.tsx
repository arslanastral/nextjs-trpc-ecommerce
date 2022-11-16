import { Title } from '@mantine/core';
import { ItemInfo } from '../Cart/ItemInfo';

type Item = {
  image: string;
  seller: { storeName: string };
  title: string;
  priceInCents: string;
};

type CartBag = {
  id: number;
  item: Item;
  itemCount: number;
};

type CheckoutItemsData = {
  data: CartBag[];
};

function CheckoutItems({ data }: CheckoutItemsData) {
  return (
    <div className="flex flex-col">
      <Title order={2} color="dark">
        Your Items
      </Title>
      <Title order={4} color="dark" weight={300} mt={4}>
        To edit this order go to cart
      </Title>
      <div className="max-w-[400px]  border rounded-lg mt-4">
        {data?.length &&
          data.map((e, i) => (
            <div key={i} className="divide-y p-5">
              <ItemInfo
                image={e.item.image}
                title={e.item.title}
                storeName={e.item.seller.storeName}
                quantity={e.itemCount}
                price={(+e.item.priceInCents / 100).toString()}
                isForCheckout={true}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default CheckoutItems;
