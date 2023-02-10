import { deleteObject, getStorage, ref } from 'firebase/storage';

export const deleteImage = (productId: string) => {
  const storage = getStorage();

  const desertRef = ref(storage, `products/${productId}`);

  return deleteObject(desertRef);
};
