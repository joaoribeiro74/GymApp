// Global store for firebase and auth instances

import { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";
import { create } from "zustand";
import { Firestore } from "firebase/firestore";

type FirebaseStoreProps = {
  app: FirebaseApp | null;
  auth: Auth | null;
  db: Firestore | null;
  setApp: (app: FirebaseApp | null) => void;
  setAuth: (auth: Auth | null) => void;
  setDb: (db: Firestore | null) => void;
};

const useFirebaseStore = create<FirebaseStoreProps>()((set) => ({
  app: null,
  auth: null,
  db: null,
  setApp: (app: FirebaseApp | null) => set(() => ({ app })),
  setAuth: (auth: Auth | null) => set(() => ({ auth })),
  setDb: (db: Firestore | null) => set(() => ({ db })),
}));

export default useFirebaseStore;
