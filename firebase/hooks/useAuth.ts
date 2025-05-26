import { useEffect, useState } from "react";

import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import useFirebase from "./useFirebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";

/**
 * Firebase authentication hook.
 * @returns Access to main auth service using email and password strategy, plus user object and loading state flag.
 */

/**
 * Validação de senha personalizada.
 */
function isPasswordValid(password: string): string | null {
  if (password.length < 8)
    return "A senha deve ter mais de 8 caracteres.";
  if (!/[a-z]/.test(password))
    return "A senha deve conter ao menos uma letra minúscula.";
  if (!/[0-9]/.test(password))
    return "A senha deve conter ao menos um número.";
  if (!/[^a-zA-Z0-9]/.test(password))
    return "A senha deve conter ao menos um caractere especial.";

  return null;
}

/**
 * Mapeamento de mensagens de erro do Firebase Auth para português.
 */
function translateAuthError(code: string): string {
  const map: { [key: string]: string } = {
    "auth/email-already-in-use": "Este e-mail já está em uso.",
    "auth/invalid-email": "E-mail inválido.",
    "auth/weak-password": "Senha fraca. Use uma mais segura.",
    "auth/user-not-found": "Usuário não encontrado.",
    "auth/wrong-password": "Senha incorreta.",
    "auth/too-many-requests": "Muitas tentativas. Tente novamente mais tarde.",
    "auth/network-request-failed": "Problema de conexão. Verifique sua internet.",
    "auth/invalid-credential": "E-mail ou senha incorretos.",
  };

  return map[code] || "Erro desconhecido. Tente novamente.";
}

export default function useAuth() {
  const { auth, db } = useFirebase();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  /**
   * Wrapper for login users with loading state flag for conditional renders.
   * @param email An active user registered in your firebase project.
   * @param password User's password.
   */
  const login = async (email: string, password: string) => {
    if (!auth) throw new Error("Auth not initialized");

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      const translated = translateAuthError(error.code);
      const customError = new Error(translated);
      (customError as any).code = error.code; // preserva o code original
      throw customError;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Wrapper for logout users.
   */
  const logout = async () => {
    if (!auth) throw new Error("Auth not initialized");

    await signOut(auth);
  };

  const isUsernameTaken = async (username: string): Promise<boolean> => {
    if (!db) throw new Error("DB not initialized");

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username.toLowerCase().trim()));
    const snapshot = await getDocs(q);

    return !snapshot.empty;
  };

  /**
   * Wrapper for creating new Users
   * @param email user email
   * @param password user password (min 6 chars)
   */
  const registerUser = async (
    email: string,
    password: string,
    username: string
  ) => {
    if (!auth || !db) throw new Error("Auth or DB not initialized");

    const cleanedUsername = username.toLowerCase().trim();

    if (cleanedUsername.length > 32)
      throw new Error("O nome de usuário deve ter no máximo 32 caracteres.");

    if (/\s/.test(cleanedUsername))
      throw new Error("O nome de usuário não pode conter espaços.");

    const passwordError = isPasswordValid(password);
    if (passwordError) throw new Error(passwordError);

    const alreadyExists = await isUsernameTaken(cleanedUsername);
    if (alreadyExists) throw new Error(`O nome de usuário "${cleanedUsername}" já está em uso.`);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email,
        username: cleanedUsername,
      });

      return user;
    } catch (error: any) {
      throw new Error(translateAuthError(error.code));
    }
  };

  useEffect(() => {
    if (auth) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setLoading(false);
      });
    }
  }, [auth]);

  return { loading, user, login, logout, registerUser };
}
