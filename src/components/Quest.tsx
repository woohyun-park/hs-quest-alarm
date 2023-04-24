import { QuerySnapshot } from "@google-cloud/firestore";

interface IQuest {
  num: number;
  txt: string;
  set: (num: number) => void;
}

export default function Quest({ num, txt, set }: IQuest) {
  function handleClick(newNum: number) {
    if (newNum < 0) set(0);
    else if (newNum > 3) set(3);
    else set(newNum);
  }
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <h2>{txt}</h2>
        <div className="flex items-center">
          <div className="m-2 text-3xl">{num}</div>
          <div
            className="m-2 text-lg hover:cursor-pointer"
            onClick={() => handleClick(num + 1)}
          >
            +
          </div>
          <div
            className="m-2 text-lg hover:cursor-pointer"
            onClick={() => handleClick(num - 1)}
          >
            -
          </div>
        </div>
      </div>
    </>
  );
}
