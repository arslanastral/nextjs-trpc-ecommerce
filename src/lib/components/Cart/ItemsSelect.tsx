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
  item: Item;
  itemCount: number;
};

interface ItemSelectionProps {
  data: CartBag[];
  setPrice: (price: number) => void;
}

export function ItemsSelect({ data, setPrice }: ItemSelectionProps) {
  const [selection, setSelection] = useState([1]);

  console.log(selection);

  const toggleRow = useCallback(
    (id: number) => {
      setSelection((current) =>
        current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
      );

      setPrice(10);
    },
    [setSelection, setPrice]
  );

  const toggleAll = useCallback(
    () =>
      setSelection((current) =>
        current.length === data.length ? [] : data.map((item) => item.id)
      ),
    [setSelection, data]
  );

  const rows = data.map((e) => {
    const selected = selection.includes(e.id);
    return (
      <Item
        key={e.id}
        id={e.id}
        title={e.item.title}
        toggleRow={toggleRow}
        selected={selected}
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
                checked={selection.length === data.length}
                indeterminate={selection.length > 0 && selection.length !== data.length}
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
