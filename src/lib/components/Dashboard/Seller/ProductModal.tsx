import {
  Modal,
  Button,
  Input,
  Grid,
  Checkbox,
  LoadingOverlay,
  Alert,
  createStyles,
  Select,
  TextInput
} from '@mantine/core';

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

  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title="Add New Product">
      <div>
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
    </Modal>
  );
}

export default ProductModal;
