import { Modal, Button, Input, Grid, Checkbox, LoadingOverlay, Alert } from '@mantine/core';

function ProductModal() {
  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title="Add New Product">
      {/* Modal content */}
    </Modal>
  );
}

export default ProductModal;
