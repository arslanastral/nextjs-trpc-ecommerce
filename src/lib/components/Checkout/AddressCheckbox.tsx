import { UnstyledButton, Checkbox, Text, createStyles, Badge } from '@mantine/core';
import { memo } from 'react';

const useStyles = createStyles((theme, { checked }: { checked: boolean }) => ({
  button: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    transition: 'background-color 150ms ease, border-color 150ms ease',
    border: `1px solid ${
      checked
        ? theme.fn.variant({ variant: 'outline', color: theme.primaryColor }).border
        : theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.colors.gray[3]
    }`,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.sm,
    backgroundColor: checked
      ? theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background
      : theme.colorScheme === 'dark'
      ? theme.colors.dark[8]
      : theme.white
  },

  body: {
    flex: 1,
    marginLeft: theme.spacing.md
  }
}));

interface AddressCheckboxProps {
  checked?: boolean;
  isDefault?: boolean;
  onChange?: () => void;
  city: string;
  addressLine1: string;
}

export const AddressCheckbox = memo(
  ({ checked = false, onChange, isDefault, city, addressLine1 }: AddressCheckboxProps) => {
    const { classes, cx } = useStyles({ checked: checked });

    return (
      <UnstyledButton onClick={onChange} className={cx(classes.button)}>
        <div className={classes.body}>
          <Text color="dimmed" size="sm" sx={{ lineHeight: 1 }} mb={5}>
            {addressLine1}
          </Text>
          <Text weight={500} size="md" sx={{ lineHeight: 1 }}>
            {city}
          </Text>
        </div>
        {isDefault && (
          <Badge variant="light" mr={10}>
            default
          </Badge>
        )}

        <Checkbox
          checked={checked}
          onChange={() => {}}
          tabIndex={-1}
          styles={{ input: { cursor: 'pointer' } }}
        />
      </UnstyledButton>
    );
  }
);

AddressCheckbox.displayName = 'AddressCheckbox';
