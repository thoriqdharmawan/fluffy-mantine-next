import { useState } from 'react';

import { Image, AspectRatio } from '@mantine/core';

import { ProductsCardProps } from '../../mock/products';

interface Props {
  name: string;
  image: string;
  sku: string;
  price: number;
  stock: number;
}

export default function ListProductTableRow({ name, image, sku, price, stock }: Props) {
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
      <td>Aksi</td>
    </tr>
  );
}
