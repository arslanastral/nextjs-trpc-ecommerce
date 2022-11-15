import { trpc } from '@/utils/trpc';
import { useCallback, useState } from 'react';
import { createStyles, Table, Checkbox, ScrollArea } from '@mantine/core';
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
};

interface ItemSelectionProps {
  data: CartBag[];
  setPrice: (price: number) => void;
}

export function ItemsSelect({ data, setPrice }: ItemSelectionProps) {
  const current = trpc.useContext();
  const selectBag = trpc.cart.toggleBagSelect.useMutation();
  const selectAllBags = trpc.cart.selectAllBags.useMutation();

  console.log(selectBag.data);

  const toggleRow = async (id: number, selected: boolean) => {
    selectBag.mutate(
      { bagId: id, isSelected: selected },
      {
        onSuccess: () => {
          current.cart.getCartItems.invalidate();
        }
      }
    );
  };

  const toggleAll = async () => {
    selectAllBags.mutate(undefined, {
      onSuccess: () => {
        current.cart.getCartItems.invalidate();
      }
    });
  };

  const rows = data.map((e) => {
    return (
      <Item
        key={e.id}
        id={e.id}
        title={e.item.title}
        toggleRow={toggleRow}
        selected={e.selected}
        image={`https://res.cloudinary.com/dv9wpbflv/image/upload/v${e.item.image}.jpg`}
        price={(+e.item.priceInCents / 100).toString()}
        quantity={e.itemCount}
      />
    );
  });

  return (
    <ScrollArea>
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
