import {
  Modal,
  Text,
  Button,
  Input,
  Grid,
  Checkbox,
  LoadingOverlay,
  Alert,
  createStyles,
  Badge,
  Select,
  TextInput,
  Group
} from '@mantine/core';
import ProductCard from './ProductCard';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Product, productInput } from '@/server/schema';
import { useEffect } from 'react';

type ProductModalProps = {
  opened: boolean;
  setOpened: (state: boolean) => void;
  data?: {};
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
      title: 'Blue sleeveless lace dress with belt',
      description: 'Perfect for beach vibes',
      price: '20'
    },
    resolver: zodResolver(productInput)
  });

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title="" size="auto">
      <div className="flex gap-10">
        <div>
          <Text className="text-2xl" weight={600} mt={15}>
            Add New Product
          </Text>
          <TextInput
            {...register('title')}
            size="lg"
            label="Product Title"
            placeholder="My cool product"
            classNames={classes}
            mt={15}
          />

          <TextInput
            {...register('description')}
            size="lg"
            label="Description"
            placeholder="It is the best damn product"
            classNames={classes}
            mt={15}
          />

          <Select
            size="lg"
            style={{ marginTop: 20, zIndex: 2 }}
            data={['Fashion', 'Luxury', 'Sports', 'Others']}
            placeholder="Fashion, Sports etc"
            label="Product's Category"
            classNames={classes}
            mt={15}
          />

          <TextInput
            {...register('price')}
            size="lg"
            label="Price"
            placeholder="$20"
            classNames={classes}
            mt={15}
          />
        </div>

        <div className="mt-2 w-[337px]">
          <Badge className="bg-black text-white mb-4">Live</Badge>

          <ProductCard
            title={watch('title')}
            description={watch('description')}
            price={watch('price')}
            status="sold out"
            image="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          />
        </div>
      </div>
    </Modal>
  );
}

export default ProductModal;
