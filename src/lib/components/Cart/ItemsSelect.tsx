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

interface ItemSelectionProps {
  data: { avatar: string; title: string; price: string; id: string }[];
}

export function ItemsSelect({ data }: ItemSelectionProps) {
  const [selection, setSelection] = useState(['fsd1']);

  console.log(selection);

  const toggleRow = useCallback(
    (id: string) =>
      setSelection((current) =>
        current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
      ),
    [setSelection]
  );

  const toggleAll = useCallback(
    () =>
      setSelection((current) =>
        current.length === data.length ? [] : data.map((item) => item.id)
      ),
    [setSelection, data]
  );

  const rows = data.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <Item
        key={item.id}
        id={item.id}
        title={item.title}
        toggleRow={toggleRow}
        selected={selected}
        image={item.avatar}
        price={item.price}
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
