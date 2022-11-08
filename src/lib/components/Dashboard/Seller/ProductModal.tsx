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

type ProductModalProps = {
  opened: boolean;
  setOpened: (state: boolean) => void;
  data?: Product;
};

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative'
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
  const [file, setFile] = useState<File | null>(null);
  const { classes } = useStyles();

  const {
    register,
    handleSubmit,
    getValues,
    control,
    watch,
    reset,
    formState: { errors }
  } = useForm<Product>({
    defaultValues: {
      image:
        'https://images.unsplash.com/photo-1542295669297-4d352b042bca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      title: 'Red floral sleeveless dress',
      description: 'Perfect for summer vibes',
      price: '20',
      category: 'Others'
    },
    resolver: zodResolver(productInput)
  });

  const handleImageUpload = async (file: File) => {
    setFile(file);
    let imageDataUrl = await readFile(file);
    setSrc(imageDataUrl);
    // setImageEditMode(true)
  };

  // useEffect(() => {
  //   // reset();
  // }, [reset]);

  function readFile(file: File) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const productSubmit = (product: Product) => {
    // console.log(getValues('title'));
    console.log(product);
    // console.log(product);
  };

  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title="" size="auto">
      <div className="flex gap-10">
        <div>
          <Text className="text-2xl" weight={600} mt={15}>
            Add New Product
          </Text>

          <form onSubmit={handleSubmit(productSubmit)}>
            <Group position="left" mt={25}>
              <FileButton onChange={handleImageUpload} accept="image/png,image/jpeg">
                {(props) => (
                  <Button color="" {...props}>
                    Upload image
                  </Button>
                )}
              </FileButton>
              {file && (
                <Text size="sm" align="center" mt="sm">
                  Picked file: {file.name}
                </Text>
              )}
            </Group>

            <TextInput
              size="lg"
              label="Product Image"
              placeholder="https://images.unsplash.com/"
              classNames={classes}
              mt={15}
              error={errors.image?.message}
              {...register('image')}
            />
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
            <Button type="submit" mt={20} radius="md">
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
          />
        </div>
      </div>
    </Modal>
  );
}

export default ProductModal;
