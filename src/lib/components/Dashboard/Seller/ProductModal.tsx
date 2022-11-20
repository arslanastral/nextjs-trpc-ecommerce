import {
  Modal,
  Text,
  Button,
  ActionIcon,
  Input,
  Grid,
  Checkbox,
  LoadingOverlay,
  Alert,
  createStyles,
  Badge,
  Select,
  FileButton,
  TextInput,
  NumberInput,
  Group
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import PreviewProductCard from './PreviewProductCard';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Product, productInput } from '@/server/schema';
import { useEffect, useState } from 'react';
import { DropzoneButton } from './Dropzone';
import { getBase64FromBlobURI } from '@/utils/client/getBase64FromBlobURI';
import { trpc } from '@/utils/trpc';

type ProductModalProps = {
  opened: boolean;
  setOpened: (state: boolean) => void;
};

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative'
  },

  title: {
    fontSize: '30px'
  },

  input: {
    height: 'auto',
    paddingTop: 18
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1
  }
}));

function ProductModal({ opened, setOpened }: ProductModalProps) {
  const current = trpc.useContext();
  const createProduct = trpc.product.create.useMutation();
  const [imageEditMode, setImageEditMode] = useState<boolean>(false);
  const [src, setSrc] = useState<any>(null);
  const [cropSrc, setCropSrc] = useState<any>(null);
  const isMobile = useMediaQuery('(max-width: 600px)');

  const { classes } = useStyles();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<Product>({
    resolver: zodResolver(productInput)
  });

  const handleImageUpload = async (file: string) => {
    setSrc(file);
    setImageEditMode(true);
  };

  useEffect(() => {
    register('image');
    const setImageValue = async () => {
      if (cropSrc) {
        let base64 = (await getBase64FromBlobURI(cropSrc)) as string;
        setValue('image', base64);
        return;
      }
    };
    setImageValue();
  }, [register, cropSrc, setValue]);

  const productSubmit = async (product: Product) => {
    if (createProduct.isLoading) {
      return;
    }

    if (product) {
      createProduct.mutate(product, {
        onSuccess: () => {
          current.product.list.invalidate();
          reset();
          setSrc(null);
          setCropSrc(null);
          setOpened(false);
        }
      });
    }
  };

  return (
    <Modal
      classNames={{ title: classes.title }}
      opened={opened}
      onClose={() => setOpened(false)}
      title="Create Your Product"
      size="auto"
      fullScreen={isMobile}
      closeOnEscape={!createProduct.isLoading}
      closeOnClickOutside={!createProduct.isLoading}
    >
      <LoadingOverlay visible={createProduct.isLoading} radius="lg" />
      <div className="flex gap-10 flex-wrap justify-center">
        <div className="w-full md:w-auto">
          <form onSubmit={handleSubmit(productSubmit)}>
            <TextInput
              size="lg"
              label="Product Title"
              placeholder="Your Product's Name"
              classNames={classes}
              mt={15}
              {...register('title')}
              error={errors.title?.message}
            />

            <TextInput
              size="lg"
              label="Description"
              placeholder="Describe Your Product"
              classNames={classes}
              mt={15}
              {...register('description')}
              error={errors.description?.message}
            />

            <Controller
              name="category"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  size="lg"
                  style={{ marginTop: 20, zIndex: 2 }}
                  data={[
                    { label: 'Health & Beauty', value: '1' },
                    { label: `Women's Fashion`, value: '2' },
                    { label: `Men's Fashion`, value: '3' },
                    { label: 'Luxury', value: '4' },
                    { label: 'Electronics', value: '5' },
                    { label: 'Sports', value: '6' },
                    { label: 'Other', value: '7' }
                  ]}
                  placeholder="Fashion, Sports etc"
                  label="Product's Category"
                  classNames={classes}
                  mt={15}
                  error={errors.category?.message}
                />
              )}
            />

            <Controller
              name="price"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <NumberInput
                  value={field.value}
                  onChange={field.onChange}
                  size="lg"
                  label="Price"
                  placeholder="$20"
                  precision={2}
                  classNames={classes}
                  mt={15}
                  hideControls
                  error={errors.price?.message}
                />
              )}
            />

            <Controller
              name="stock"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <NumberInput
                  value={field.value}
                  onChange={field.onChange}
                  size="lg"
                  label="Available Stock"
                  placeholder="20"
                  classNames={classes}
                  mt={15}
                  hideControls
                  error={errors.stock?.message}
                />
              )}
            />

            <DropzoneButton onDrop={handleImageUpload} />
            <Text color={src ? 'green' : 'red'} size="md" mt={15}>
              {errors.image?.message && !src && <>Product must have an image</>}
              {errors.image?.message && src && <>Save the image before continuing</>}
            </Text>

            <Button type="submit" fullWidth size="md" radius="md" mt={15}>
              Create Product
            </Button>
          </form>
        </div>

        <div className="mt-2 w-full md:w-auto">
          <PreviewProductCard
            title={watch('title')}
            description={watch('description')}
            price={watch('price')}
            status="sold out"
            image={''}
            src={src}
            imageEditMode={imageEditMode}
            setImageEditMode={setImageEditMode}
            cropSrc={cropSrc}
            setCropSrc={setCropSrc}
          />
        </div>
      </div>
    </Modal>
  );
}

export default ProductModal;
