import { useState } from 'react';
import {
  createStyles,
  Table,
  Checkbox,
  ScrollArea,
  Group,
  ActionIcon,
  Avatar,
  Text
} from '@mantine/core';
import { IconTrash } from '@tabler/icons';
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
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState(['fsd1']);
  console.log(selection);
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));

  const rows = data.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
            transitionDuration={0}
          />
        </td>
        <td>
          {/* <Group spacing="sm"> */}
          <Item image={item.avatar} title={item.title} />
          {/* </Group> */}
        </td>
        <td>
          <Text size="lg">${item.price}</Text>
        </td>
        <td>
          <Group spacing={0} position="right">
            <ActionIcon color="red" m={10} size="lg">
              <IconTrash size={22} stroke={1.5} />
            </ActionIcon>
          </Group>
        </td>
      </tr>
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
