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
      title: 'My cool product',
      description: "A very nice product that's a must buy",
      price: '20'
    },
    resolver: zodResolver(productInput)
  });

  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title="" size="auto">
      <div className="flex gap-10">
        <div>
          <Text className="text-2xl" weight={600} mt={15}>
            Add New Product
          </Text>
          <TextInput
            size="lg"
            label="Product Title"
            placeholder="My cool product"
            classNames={classes}
            mt={15}
          />

          <TextInput
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

          <TextInput size="lg" label="Price" placeholder="$20" classNames={classes} mt={15} />
        </div>

        <div className="mt-2">
          <Badge className="bg-black text-white mb-4">Live</Badge>

          <ProductCard
            title="Blue dress with silk cotten and smooth"
            description="Blue floral dress with beach vibes"
            price="20"
            status="sold out"
            image="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          />
        </div>
      </div>
    </Modal>
  );
}

export default ProductModal;
