import { useEffect, useState } from 'react';

import { Image, AspectRatio } from '@mantine/core';

import { getDetailProduct } from '../../services/products/getProducts';
import { ProductsCardProps } from '../../mock/products';

interface Props extends ProductsCardProps {
  id: string;
}

export default function ListProductTableRow({ id, name, image }: Props) {
  const [result, setResult] = useState<any>({});
  // useEffect(() => {
  //   const promise = getDetailProduct(id);

  //   promise
  //     .then(
  //       (res) => {
  //         setResult(res);
  //       },
  //       (err) => {
  //         console.log({ err });
  //       }
  //     )
  //     .catch((err) => {
  //       console.log({ err });
  //     });
  // }, [id]);

  return (
    <>
      <td>
        <AspectRatio ratio={1 / 1} sx={{ maxWidth: 80 }}>
          <Image radius="md" withPlaceholder src={image} />
        </AspectRatio>
      </td>
      <td>{result?.productVariants?.[0].sku}</td>
      <td>{name}</td>
      <td>{result?.productVariants?.[0].price}</td>
      <td>{result?.productVariants?.[0].stock}</td>
      <td>Aksi</td>
    </>
  );
}
