import {
  collection,
  query,
  getDocs,
  DocumentData,
  getCountFromServer,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';

const productsRef = collection(db, 'products');
const variantsRef = collection(db, 'productVariants');

export const getProducts = async () => {
  try {
    const query_ = query(productsRef);
    const data = await getDocs(query_);
    const aggregate = await getCountFromServer(productsRef);

    return {
      data: data.docs.map((doc: DocumentData) => {
        

        const detailRef = collection(db, `productVariants`);
        const queryDetail = query(detailRef, where('productId', '==', doc.id));

        const dataDetail = getDocs(queryDetail);
        let detail = {};
        dataDetail.then((res) => {
          res.docs.map((doc: DocumentData) => {
            detail = { ...doc.data() };
          });
        });
        console.log("OK : ", { ...doc.data(), id: doc.id, ...detail });
        return { ...doc.data(), id: doc.id, ...detail };
      }),
      total: aggregate.data().count,
    };
  } catch (err) {
    console.error(err);
  }
};

export const getDetailProduct = async (id: string) => {
  try {
    const q = query(variantsRef, where('productId', '==', id));
    const data = await getDocs(q);

    const result = data.docs.map((doc: DocumentData) => ({ ...doc.data(), id: doc.id }));

    return await result?.[0];
  } catch (err) {
    console.error(err);
  }
};
