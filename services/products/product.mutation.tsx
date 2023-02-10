import { deleteObject, getStorage, ref } from 'firebase/storage';

export const deleteProductImage = (productId: string) => {
  const storage = getStorage();

  const desertRef = ref(storage, `products/${productId}`);

  return deleteObject(desertRef);
};
