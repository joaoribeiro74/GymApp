import {
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import useFirebase from "./useFirebase";

/**
 * Hook to access and manage a firestore document.
 * @param collectionName Collection name in plural (e.g. 'books'). Can also be a path to subcollection.
 * @returns
 */
export default function useDocument<T extends { [x: string]: any }>(
  collectionName: string,
  id?: string,
  realtime: boolean = true
) {
  useFirebase();

  const db = getFirestore();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>();

  useEffect(() => {
    if (!collectionName || !id) return;

    const docRef = doc(db, collectionName, id);

    const refresh = async () => {
      setLoading(true);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data() as T;
      setData({ id: docSnap.id, ...data });
      setLoading(false);
    };

    refresh();

    const unsub = realtime
      ? onSnapshot(docRef, (docSnap) => {
          const data = docSnap.data() as T;
          setData({ id: docSnap.id, ...data });
        })
      : () => {};

    return unsub;
  }, [collectionName, id, realtime]);

  const upsert = async (newVal: T) => {
    if (!id) throw new Error("Cannot upsert document without an ID");
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, newVal);
    return docRef.id;
  };

  const refresh = async () => {
    if (!id) throw new Error("Cannot refresh document without an ID");
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data() as T;
    setData({ id: docSnap.id, ...data });
    return { id: docSnap.id, ...data };
  };

  return { data, loading, upsert, refresh };
}
