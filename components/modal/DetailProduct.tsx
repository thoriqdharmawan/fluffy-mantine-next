import { Modal } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

interface Props {
  opened: boolean;
  onClose: () => void;
}

export default function DetailProduct(props: Props) {
  const { opened, onClose } = props;

  const isMobile = useMediaQuery('(max-width: 50em)');

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Authentication"
      size="xl"
      fullScreen={isMobile}
      centered
    >
      <h1>title</h1>
    </Modal>
  );
}
