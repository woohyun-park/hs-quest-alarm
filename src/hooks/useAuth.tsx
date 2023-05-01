import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { auth, db } from "@/services/fb";
import { useContext, useEffect } from "react";
import { GlobalContext } from "@/pages/_app";
import { doc, getDoc, setDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();

export default function useAuth() {
  const { setUser, setQuest } = useContext(GlobalContext);

  useEffect(() => {
    auth.onAuthStateChanged((authState) => handleAuthStateChange(authState));
  }, []);

  async function handleAuthStateChange(authState: User | null) {
    if (authState) {
      const uid = authState.uid;
      const docRef = doc(db, "quests", uid);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if (!data) await setDoc(docRef, { daily: 0, weekly: 0 });
      else setQuest({ daily: data.daily, weekly: data.weekly });
      setUser({ uid: uid, isLoggedIn: true });
    } else {
      setUser({ uid: "", isLoggedIn: false });
    }
  }

  function handleLogin() {
    signInWithPopup(auth, provider)
      .then(async (res) => {
        const uid = res.user.uid;
        setUser({ uid, isLoggedIn: true });
      })
      .catch((e) => {
        console.log(e.messsage);
      });
  }

  function handleLogout() {
    signOut(auth);
  }

  return { handleLogin, handleLogout };
}
