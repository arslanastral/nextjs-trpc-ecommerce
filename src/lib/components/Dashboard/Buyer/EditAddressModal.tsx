import {
  Modal,
  Button,
  Input,
  Text,
  Grid,
  Checkbox,
  LoadingOverlay,
  Group,
  Alert
} from '@mantine/core';
import { IconTrash, IconAlertCircle } from '@tabler/icons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddressWithId, addressInput } from '@/server/schema';
import { trpc } from '@/utils/trpc';
import { openConfirmModal } from '@mantine/modals';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect } from 'react';

type EditableAddressModalProps = {
  opened: boolean;
  setOpened: (state: boolean) => void;
  data?: AddressWithId;
};

function EditAddressModal({ opened, setOpened, data }: EditableAddressModalProps) {
  const current = trpc.useContext();
  const updateBuyerAddress = trpc.address.update.useMutation();
  const deleteBuyerAddress = trpc.address.delete.useMutation();
  const isMobile = useMediaQuery('(max-width: 600px)');

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<AddressWithId>({
    defaultValues: {
      ...data
    },
    resolver: zodResolver(addressInput)
  });

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  const addressUpdate = async (updatedAddress: AddressWithId) => {
    if (updateBuyerAddress.isLoading || deleteBuyerAddress.isLoading) {
      return;
    }
    if (data) {
      let updatedAddressWithId = {
        ...updatedAddress,
        id: data.id
      };
      updateBuyerAddress.mutate(updatedAddressWithId, {
        onSuccess: () => {
          current.address.list.invalidate();
          setOpened(false);
        }
      });
    }
  };

  const deleteAddress = async () => {
    if (updateBuyerAddress.isLoading || deleteBuyerAddress.isLoading) {
      return;
    }
    if (data) {
      deleteBuyerAddress.mutate(
        { id: data.id },
        {
          onSuccess: () => {
            current.address.list.invalidate();
            setOpened(false);
          }
        }
      );
    }
  };

  const openDeleteModal = () =>
    openConfirmModal({
      zIndex: 1000,
      title: 'Delete my address',
      centered: true,
      children: <Text size="sm">Are you sure you want to delete your address?</Text>,
      labels: { confirm: 'Delete Address', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onCancel: () => setOpened(false),
      onConfirm: () => deleteAddress()
    });

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setOpened(false);
      }}
      fullScreen={isMobile}
      title="Update Address"
      closeOnEscape={!updateBuyerAddress.isLoading || !deleteBuyerAddress.isLoading}
      closeOnClickOutside={!updateBuyerAddress.isLoading || !deleteBuyerAddress.isLoading}
    >
      <LoadingOverlay
        visible={updateBuyerAddress.isLoading || deleteBuyerAddress.isLoading}
        radius="lg"
      />
      {(deleteBuyerAddress.error || updateBuyerAddress.error) && (
        <Alert icon={<IconAlertCircle size={16} />} title="Bummer!" color="red" mb={15}>
          Something went wrong!
        </Alert>
      )}

      <form onSubmit={handleSubmit(addressUpdate)}>
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
        <Group position="apart">
          <Button type="submit" mt="md" radius="md">
            Update Address
          </Button>

          <Button
            type="button"
            onClick={openDeleteModal}
            leftIcon={<IconTrash size="15" />}
            mt="md"
            radius="md"
            variant="outline"
            color="red"
          >
            Delete
          </Button>
        </Group>
      </form>
    </Modal>
  );
}

export default EditAddressModal;
