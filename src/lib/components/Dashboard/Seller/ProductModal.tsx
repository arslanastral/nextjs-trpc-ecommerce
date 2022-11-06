import { Modal, Button, Input, Grid, Checkbox, LoadingOverlay, Alert } from '@mantine/core';

type ProductModalProps = {
  opened: boolean;
  setOpened: (state: boolean) => void;
  data?: {};
};

function ProductModal({ opened, setOpened, data }: ProductModalProps) {
  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title="Add New Product">
      {/* Modal content */}
    </Modal>
  );
}

export default ProductModal;
