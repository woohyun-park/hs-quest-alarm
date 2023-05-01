import { Quest } from "@/components";
import { useAuth, useQuest } from "@/hooks";
import { useContext } from "react";
import { GlobalContext } from "./_app";

export default function Home() {
  const { user, quest } = useContext(GlobalContext);
  const { handleLogin, handleLogout } = useAuth();
  const { updateQuest } = useQuest();

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
            num={quest.daily}
            set={(num) => updateQuest("daily", num)}
          />
          <Quest
            txt="주간 퀘스트"
            num={quest.weekly}
            set={(num) => updateQuest("weekly", num)}
          />
        </div>
      )}
    </>
  );
}
