import { useState } from 'react';

import { Button, Flex, Group, Text, useMantineTheme, Image } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons';
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';

export default function DropzoneUpload(props: Partial<DropzoneProps>) {
  const theme = useMantineTheme();
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const handleDeleteFiles = () => setFiles([]);

  const preview = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Flex direction="column">
        <Image
          key={index}
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
  });

  if (files[0]) {
    return <>{preview}</>;
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
