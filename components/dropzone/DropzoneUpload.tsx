import { useState } from 'react';

import { Button, Flex, Group, Text, useMantineTheme, Image } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons';
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { type UseFormReturnType } from '@mantine/form';

import { FormValues } from '../../pages/products/add';

interface DropzoneInterface extends Partial<DropzoneProps> {
  form: UseFormReturnType<FormValues>;
}

export default function DropzoneUpload(props: DropzoneInterface) {
  const { form } = props;
  const theme = useMantineTheme();
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const handleDeleteFiles = () => {
    if (form?.values.image) {
      form.setValues({ image: '' });
    } else {
      setFiles([]);
    }
  };

  if (form?.values.image || files[0]) {
    const imageUrl = form?.values.image || URL.createObjectURL(files?.[0]);

    return (
      <Flex direction="column">
        <Image
          src={imageUrl}
          imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
          radius="md"
          width={250}
          height={250}
          withPlaceholder
        />
        <Button onClick={handleDeleteFiles} mt={12}>
          Hapus Foto Produk
        </Button>
      </Flex>
    );
  }

  return (
    <Dropzone
      onDrop={setFiles}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      w={250}
      h={250}
      sx={{
        alignItems: 'center',
        display: 'flex',
      }}
      {...props}
    >
      <Group position="center" align="center" spacing="xl" style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            size={50}
            stroke={1.5}
            color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size={50}
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size={50} stroke={1.5} />
        </Dropzone.Idle>
        <div>
          <Text size="md" align="center" inline>
            Tambahkan Foto Produk
          </Text>
          <Text size="sm" align="center" color="dimmed" mt={8}>
            Foto Produk tidak boleh melebihi 5MB
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
