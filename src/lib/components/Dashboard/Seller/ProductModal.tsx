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
  Group
} from '@mantine/core';
import PreviewProductCard from './PreviewProductCard';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Product, productInput } from '@/server/schema';
import { useEffect, useState } from 'react';
import { DropzoneButton } from './Dropzone';

type ProductModalProps = {
  opened: boolean;
  setOpened: (state: boolean) => void;
  data?: Product;
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

function ProductModal({ opened, setOpened, data }: ProductModalProps) {
  const [imageEditMode, setImageEditMode] = useState<boolean>(false);
  const [src, setSrc] = useState<any>(null);
  const [cropSrc, setCropSrc] = useState<any>(null);

  const { classes } = useStyles();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors }
  } = useForm<Product>({
    defaultValues: {
      title: 'Red floral sleeveless dress',
      description: 'Perfect for summer vibes',
      price: '20',
      category: 'Others'
    },
    resolver: zodResolver(productInput)
  });

  const handleImageUpload = async (file: string) => {
    setSrc(file);
    setImageEditMode(true);
  };

  // useEffect(() => {
  //   // reset();
  // }, [reset]);

  const productSubmit = (product: Product) => {
    console.log(product);
  };

  return (
    <Modal
      classNames={{ title: classes.title }}
      opened={opened}
      onClose={() => setOpened(false)}
      title="Create Your Product"
      size="auto"
    >
      <div className="flex gap-10 ">
        <div>
          <form onSubmit={handleSubmit(productSubmit)}>
            <TextInput
              size="lg"
              label="Product Title"
              placeholder="My cool product"
              classNames={classes}
              mt={15}
              {...register('title')}
              error={errors.title?.message}
            />

            <TextInput
              size="lg"
              label="Description"
              placeholder="It is the best damn product"
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
                  data={['Fashion', 'Luxury', 'Sports', 'Others']}
                  placeholder="Fashion, Sports etc"
                  label="Product's Category"
                  classNames={classes}
                  mt={15}
                />
              )}
            />

            <TextInput
              size="lg"
              label="Price"
              placeholder="$20"
              classNames={classes}
              mt={15}
              {...register('price')}
              error={errors.price?.message}
            />
            <DropzoneButton onDrop={handleImageUpload} />

            <Button type="submit" fullWidth size="md" radius="md" mt={15}>
              Create Product
            </Button>
          </form>
        </div>

        <div className="mt-2">
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
