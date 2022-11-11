import { Modal, Button, Input, Grid, Checkbox, LoadingOverlay, Alert } from '@mantine/core';
import { IconTrash, IconAlertCircle } from '@tabler/icons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Address, addressInput } from '@/server/schema';
import { useMediaQuery } from '@mantine/hooks';
import { trpc } from '@/utils/trpc';

function AddressModal({
  opened,
  setOpened
}: {
  opened: boolean;
  setOpened: (state: boolean) => void;
}) {
  const current = trpc.useContext();
  const createBuyerAddress = trpc.address.create.useMutation();
  const isMobile = useMediaQuery('(max-width: 600px)');

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors }
  } = useForm<Address>({
    defaultValues: {
      isDefault: false
    },
    resolver: zodResolver(addressInput)
  });

  const addressSubmit = async (address: Address) => {
    if (createBuyerAddress.isLoading) {
      return;
    }

    if (address) {
      createBuyerAddress.mutate(address, {
        onSuccess: () => {
          current.address.list.invalidate();
          reset();
          setOpened(false);
        }
      });
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setOpened(false);
      }}
      fullScreen={isMobile}
      title="Add Address"
      closeOnEscape={!createBuyerAddress.isLoading}
      closeOnClickOutside={!createBuyerAddress.isLoading}
    >
      <LoadingOverlay visible={createBuyerAddress.isLoading} radius="lg" />
      {createBuyerAddress.error && (
        <Alert icon={<IconAlertCircle size={16} />} title="Bummer!" color="red" mb={15}>
          Something went wrong!
        </Alert>
      )}
      <form onSubmit={handleSubmit(addressSubmit)}>
        <Input.Wrapper label="Shipping Address" required error={errors.addressLine1?.message}>
          <Input placeholder="934 Hogwart 21st" {...register('addressLine1')} />
        </Input.Wrapper>

        <Grid>
          <Grid.Col span={6}>
            {' '}
            <Input.Wrapper label="City" required mt={15} error={errors.city?.message}>
              <Input placeholder="City" {...register('city')} />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={6}>
            {' '}
            <Input.Wrapper label="Postal Code" required mt={15} error={errors.postalCode?.message}>
              <Input placeholder="Postal Code" {...register('postalCode')} />
            </Input.Wrapper>
          </Grid.Col>
        </Grid>

        <Input.Wrapper label="Region/State" required mt={15} error={errors.region?.message}>
          <Input placeholder="Region/State" {...register('region')} />
        </Input.Wrapper>

        <Input.Wrapper label="Country" required mt={15} error={errors.country?.message}>
          <Input placeholder="Country" {...register('country')} />
        </Input.Wrapper>

        <Controller
          name="isDefault"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Checkbox
              checked={field.value}
              onChange={field.onChange}
              label="Set as default address"
              mt={15}
            />
          )}
        />

        <Button type="submit" mt="md" radius="md">
          Create Address
        </Button>
      </form>
    </Modal>
  );
}

export default AddressModal;
