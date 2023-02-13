import { deleteObject, getStorage, ref, uploadBytes } from 'firebase/storage';
import { FileWithPath } from '@mantine/dropzone';

import client from '../../apollo-client';

import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT } from './product.graphql';

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

const addProduct = ({ variables }: { variables: any }) => {
  return client.mutate({
    mutation: ADD_PRODUCT,
    variables,
  });
};

const editProduct = ({ variables }: { variables: any }) => {
  return client.mutate({
    mutation: EDIT_PRODUCT,
    variables,
  });
};

const uploadImage = (productId: string, files: FileWithPath[]) => {
  const storage = getStorage();
  const storageRef = ref(storage, 'products/' + productId);

  return uploadBytes(storageRef, files[0]);
};

export { deleteProductImage, deleteProduct, addProduct, editProduct, uploadImage };
