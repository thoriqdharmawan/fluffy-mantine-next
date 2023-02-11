import { deleteObject, getStorage, ref } from 'firebase/storage';

import client from '../../apollo-client';

import { DELETE_PRODUCT } from './product.graphql';

const deleteProductImage = (productId: string) => {
  const storage = getStorage();

  const desertRef = ref(storage, `products/${productId}`);

  return deleteObject(desertRef);
};

const deleteProduct = (productId: string) => {
  const promise1 = deleteProductImage(productId);
  const promise2 = client.mutate({
    mutation: DELETE_PRODUCT,
    variables: { product_id: productId },
  });

  return Promise.all([promise1, promise2]);
};

export { deleteProductImage, deleteProduct };
