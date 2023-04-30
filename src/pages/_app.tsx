import { IQuest, IUser } from "@/interfaces";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, SetStateAction, useMemo, useState } from "react";

export const GlobalContext = createContext({
  user: { uid: "", isLoggedIn: false },
  quest: { daily: 0, weekly: 0 },
  setUser: (value: SetStateAction<IUser>) => {},
  setQuest: (value: SetStateAction<IQuest>) => {},
});

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<IUser>({ uid: "", isLoggedIn: false });
  const [quest, setQuest] = useState<IQuest>({
    daily: 0,
    weekly: 0,
  });

  const value = useMemo(
    () => ({ user, setUser, quest, setQuest }),
    [user, quest]
  );

  return (
    <GlobalContext.Provider value={value}>
      <Component {...pageProps} />
    </GlobalContext.Provider>
  );
}
