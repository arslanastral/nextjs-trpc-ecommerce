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
import { ItemInfo } from './ItemInfo';
import { QuantityInput } from '../Products/QuantityInput';
import { ItemInfoProps } from './ItemInfo';
import { memo, useState } from 'react';

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0]
  }
}));

interface ItemRowProps {
  toggleRow: (id: number, selected: boolean) => void;
  id: number;
  price: string;
  selected: boolean;
}

type ItemProps = ItemInfoProps & ItemRowProps;

export const Item = memo(
  ({ id, toggleRow, title, image, selected, price, quantity, stock, storeName }: ItemProps) => {
    const { classes, cx } = useStyles();
    const [itemQuantity, setItemQuantity] = useState<number | undefined>(quantity);

    return (
      <tr className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selected}
            onChange={() => toggleRow(id, selected)}
            transitionDuration={0}
          />
        </td>
        <td>
          {/* <Group spacing="sm"> */}
          <ItemInfo
            image={image}
            title={title}
            quantity={itemQuantity ?? 1}
            stock={stock}
            storeName={storeName}
          />
          {/* </Group> */}
        </td>
        <td>
          <Text size="lg">${price}</Text>
        </td>
        <td>
          <Group spacing={10} position="right">
            <ActionIcon color="red" m={20} size="lg">
              <IconTrash size={22} stroke={1.5} />
            </ActionIcon>
            <div className="max-w-[130px]">
              <QuantityInput value={itemQuantity} setValue={setItemQuantity} />
            </div>
          </Group>
        </td>
      </tr>
    );
  }
);

Item.displayName = 'Item';
