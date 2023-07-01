import { DiaryEntry } from "../types";
import Diary from "./Diary";

const Diaries = ({ diaries }: { diaries: DiaryEntry[] }) => {
  return (
    <div>
      {diaries.map((diary) => (
        <Diary key={diary.id} diary={diary} />
      ))}
    </div>
  );
};

export default Diaries;
