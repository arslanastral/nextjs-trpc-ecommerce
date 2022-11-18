import { useRef, useState } from 'react';
import { createStyles, NumberInput, NumberInputHandlers, ActionIcon } from '@mantine/core';
import { IconPlus, IconMinus } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `6px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    border: `1px solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[3]}`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    height: 50,
    maxWidth: 200,
    '&:focus-within': {
      borderColor: theme.colors[theme.primaryColor][6]
    }
  },

  control: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    border: `1px solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[3]}`,

    '&:disabled': {
      borderColor: theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[3],
      opacity: 0.8,
      backgroundColor: 'transparent'
    }
  },

  input: {
    textAlign: 'center',
    paddingRight: `${theme.spacing.sm}px !important`,
    paddingLeft: `${theme.spacing.sm}px !important`,
    height: 28,
    flex: 1
  }
}));

interface QuantityInputProps {
  value: number | undefined;
  setValue: (value: number | undefined) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export function QuantityInput({
  value,
  setValue,
  disabled = false,
  min = 1,
  max = 10
}: QuantityInputProps) {
  const { classes } = useStyles();
  const handlers = useRef<NumberInputHandlers>(null);

  return (
    <div className={classes.wrapper}>
      <ActionIcon<'button'>
        size={28}
        variant="transparent"
        onClick={() => handlers.current?.decrement()}
        disabled={value === min || disabled}
        className={classes.control}
        onMouseDown={(event) => event.preventDefault()}
        radius="sm"
      >
        <IconMinus size={16} stroke={1.5} />
      </ActionIcon>

      <NumberInput
        disabled={disabled}
        variant="unstyled"
        min={min}
        max={max}
        handlersRef={handlers}
        value={value}
        onChange={setValue}
        classNames={{ input: classes.input }}
      />

      <ActionIcon<'button'>
        size={28}
        variant="transparent"
        onClick={() => handlers.current?.increment()}
        disabled={value === max || disabled}
        className={classes.control}
        onMouseDown={(event) => event.preventDefault()}
        radius="sm"
      >
        <IconPlus size={16} stroke={1.5} />
      </ActionIcon>
    </div>
  );
}
