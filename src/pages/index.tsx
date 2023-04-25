import { auth, db } from "@/apis/firebase";
import Quest from "@/components/Quest";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

interface IUser {
  uid: string;
  isLoggedIn: boolean;
}

interface IQuest {
  daily: number;
  weekly: number;
}

export default function Home() {
  const [user, setUser] = useState<IUser>({ uid: "", isLoggedIn: false });
  const provider = new GoogleAuthProvider();
  const [quests, setQuests] = useState<IQuest>({
    daily: 0,
    weekly: 0,
  });

  function set(type: "daily" | "weekly", num: number) {
    const docRef = doc(db, "quests", user.uid);
    updateDoc(docRef, {
      [type]: num,
    });
    setQuests({ ...quests, [type]: num });
  }

  function handleLogin() {
    signInWithPopup(auth, provider)
      .then(async (res) => {
        const uid = res.user.uid;
        setUser({ uid, isLoggedIn: true });
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  function handleLogout() {
    signOut(auth);
  }

  useEffect(() => {
    auth.onAuthStateChanged(async (authState) => {
      if (authState) {
        const uid = authState.uid;
        const docRef = doc(db, "quests", uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (!data) await setDoc(docRef, { daily: 0, weekly: 0 });
        else setQuests({ daily: data.daily, weekly: data.weekly });
        setUser({ uid: uid, isLoggedIn: true });
      } else {
        setUser({ uid: "", isLoggedIn: false });
      }
    });
  }, []);

  return (
    <>
      {!user.isLoggedIn ? (
        <div className="flex flex-col items-center m-4 max-w-[360px]">
          <h1 className="mb-2 text-4xl font-bold">하스스톤 퀘스트 알람</h1>
          <div
            className="w-full text-right text-gray-500 hover:cursor-pointer"
            onClick={handleLogin}
          >
            로그인
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center m-4 max-w-[360px]">
          <h1 className="mb-2 text-4xl font-bold">하스스톤 퀘스트 알람</h1>
          <div
            className="w-full text-right text-gray-500 hover:cursor-pointer"
            onClick={() => handleLogout()}
          >
            로그아웃
          </div>
          <Quest
            txt="일일 퀘스트"
            num={quests.daily}
            set={(num) => set("daily", num)}
          />
          <Quest
            txt="주간 퀘스트"
            num={quests.weekly}
            set={(num) => set("weekly", num)}
          />
        </div>
      )}
    </>
  );
}
