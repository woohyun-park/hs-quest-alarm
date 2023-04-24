import Quest from "@/components/Quest";
import { useEffect, useState } from "react";

export default function Home() {
  const [quests, setQuests] = useState<{
    daily: number;
    weekly: number;
  }>({
    daily: 0,
    weekly: 0,
  });

  function set(type: "daily" | "weekly", num: number) {
    localStorage.setItem(type, JSON.stringify(num));
    setQuests({ ...quests, [type]: num });
  }

  useEffect(() => {
    function init() {
      const newDaily = Number(localStorage.getItem("daily"));
      if (newDaily) set("daily", newDaily);
      const newWeekly = Number(localStorage.getItem("weekly"));
      if (newWeekly) set("weekly", newWeekly);
    }
    init();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center m-4 max-w-[360px]">
        <h1 className="mb-8 text-4xl font-bold">하스스톤 퀘스트 알람</h1>
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
    </>
  );
}
