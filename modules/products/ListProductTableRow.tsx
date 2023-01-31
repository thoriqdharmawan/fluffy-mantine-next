import { useState, SetStateAction, Dispatch } from 'react';
import { Image, AspectRatio, ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons';

interface Props {
  name: string;
  image: string;
  sku: string;
  price: number;
  stock: number;
  onDelete: (setLoading: Dispatch<SetStateAction<boolean>>) => void;
}

export default function ListProductTableRow({ name, image, sku, price, stock, onDelete }: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <tr>
      <td>
        <AspectRatio ratio={1 / 1} sx={{ maxWidth: 80 }}>
          <Image radius="md" withPlaceholder src={image} />
        </AspectRatio>
      </td>
      <td>{sku}</td>
      <td>{name}</td>
      <td>{price}</td>
      <td>{stock}</td>
      <td>
        <ActionIcon loading={loading} onClick={() => onDelete(setLoading)}>
          <IconTrash size={18} />
        </ActionIcon>
      </td>
    </tr>
  );
}
