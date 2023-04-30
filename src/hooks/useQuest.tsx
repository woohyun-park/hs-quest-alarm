import { db } from "@/services/fb";
import { useContext } from "react";
import { GlobalContext } from "@/pages/_app";
import { doc, updateDoc } from "firebase/firestore";

export default function useQuest() {
  const { user, quest, setQuest } = useContext(GlobalContext);

  function filterNum(num: number) {
    if (num < 0) return 0;
    else if (num > 3) return 3;
    else return num;
  }

  function updateQuest(type: "daily" | "weekly", num: number) {
    num = filterNum(num);
    const docRef = doc(db, "quests", user.uid);
    updateDoc(docRef, {
      [type]: num,
    });
    setQuest({ ...quest, [type]: num });
  }

  return { updateQuest };
}
