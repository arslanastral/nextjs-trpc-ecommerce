import { Modal, Button, Input, Grid, Checkbox } from '@mantine/core';
import { Address } from '@/server/schema';
import { useState } from 'react';

function AddressModal({
  opened,
  setOpened
}: {
  opened: boolean;
  setOpened: (state: boolean) => void;
}) {
  const [checked, setChecked] = useState(false);
  const [newAddress, setNewAddress] = useState<Address>();
  // const createBuyerAddress = trpc.address.create.useMutation();

  // const handleAddressCreation = async () => {
  //   createBuyerAddress.mutate(newAddress);
  // };

  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title="Add Address">
      <Input.Wrapper label="Shipping Address" required>
        <Input placeholder="934 Hogwart 21st" />
      </Input.Wrapper>

      <Grid>
        <Grid.Col span={6}>
          {' '}
          <Input.Wrapper label="City" required mt={15}>
            <Input placeholder="City" />
          </Input.Wrapper>
        </Grid.Col>
        <Grid.Col span={6}>
          {' '}
          <Input.Wrapper label="Postal Code" required mt={15}>
            <Input placeholder="Postal Code" />
          </Input.Wrapper>
        </Grid.Col>
      </Grid>

      <Input.Wrapper label="Region/State" required mt={15}>
        <Input placeholder="Region/State" />
      </Input.Wrapper>

      <Input.Wrapper label="Country" required mt={15}>
        <Input placeholder="Country" />
      </Input.Wrapper>

      <Checkbox
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        label="Set as default address"
        mt={15}
      />

      <Button mt="md" radius="md">
        Create Address
      </Button>
    </Modal>
  );
}

export default AddressModal;
