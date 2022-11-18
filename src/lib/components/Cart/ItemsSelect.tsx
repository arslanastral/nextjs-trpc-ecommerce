import { trpc } from '@/utils/trpc';
import { createStyles, Table, Checkbox, ScrollArea, LoadingOverlay } from '@mantine/core';
import { Item } from './Item';

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0]
  }
}));

type Item = {
  image: string;
  seller: { storeName: string };
  stock: number;
  title: string;
  priceInCents: string;
};

type CartBag = {
  id: number;
  selected: boolean;
  item: Item;
  itemCount: number;
  productId: string;
};

type ItemSelectionProps = {
  data: CartBag[];
};

export function ItemsSelect({ data }: ItemSelectionProps) {
  const current = trpc.useContext();
  const selectBag = trpc.cart.toggleBagSelect.useMutation();
  const selectAllBags = trpc.cart.toggleAllBagsSelect.useMutation();

  const toggleRow = async (id: number, selected: boolean) => {
    if (selectBag.isLoading || selectAllBags.isLoading) {
      return;
    }
    selectBag.mutate(
      { bagId: id, isSelected: selected },
      {
        onSuccess: invalidateData
      }
    );
  };

  const toggleAll = async () => {
    if (selectBag.isLoading || selectAllBags.isLoading) {
      return;
    }
    const shouldDeselect = data.every((e) => e.selected === true);

    selectAllBags.mutate(
      { shouldDeselect },
      {
        onSuccess: invalidateData
      }
    );
  };

  const invalidateData = () => {
    current.cart.getCartItemsPrice.invalidate();
    current.cart.getCartItems.invalidate();
  };

  const rows = data
    .sort((a, b) => (a.id > b.id ? 1 : -1))
    .map((e) => {
      return (
        <Item
          key={e.id}
          id={e.id}
          title={e.item.title}
          toggleRow={toggleRow}
          selected={e.selected}
          image={e.item.image}
          price={(+e.item.priceInCents / 100).toString()}
          quantity={e.itemCount}
          stock={e.item.stock}
          storeName={e.item.seller.storeName}
          productId={e.productId}
        />
      );
    });

  return (
    <ScrollArea>
      <LoadingOverlay visible={selectBag.isLoading || selectAllBags.isLoading} overlayBlur={1} />
      <Table sx={{ minWidth: 320 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th style={{ width: 40 }}>
              <Checkbox
                onChange={toggleAll}
                checked={data.every((e) => e.selected === true)}
                indeterminate={data.some((e) => e.selected === true)}
                transitionDuration={0}
              />
            </th>
            <th>Items</th>
            <th>Price</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
