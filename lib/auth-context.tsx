import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";

type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  signUp: (email: string, password: string) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
  loadingUser: boolean;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [loadingUser, SetLoadingUser] = useState<boolean>(true);

  useEffect(() => {
    getUser();
  }, []);

  const signOut = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      if (error) {
        return console.error(error);
      }
    }
  };

  const getUser = async () => {
    try {
      const session = await account.get();
      setUser(session);
    } catch (error) {
      setUser(null);
    } finally {
      SetLoadingUser(false);
    }
  };
  const signUp = async (email: string, password: string) => {
    try {
      await account.create(ID.unique(), email, password);
      await signIn(email, password);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "An error occured during sign up";
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const erro = await account.createEmailPasswordSession(email, password);

      const session = await account.get();
      setUser(session);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "An error occured during sign In";
    }
  };

  return (
    <AuthContext.Provider
      value={{ signOut, loadingUser, user, signIn, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Unable to get context");
  }

  return context;
}
