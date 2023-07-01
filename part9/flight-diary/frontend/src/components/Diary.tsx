import { DiaryEntry } from "../types";

const Diary = ({ diary }: { diary: DiaryEntry }) => {
  return (
    <div>
      <div>{diary.id}</div>
      <div>{diary.date}</div>
      <div>{diary.weather}</div>
      <div>{diary.visibility}</div>
      <div>{diary.comment}</div>
      <br></br>
    </div>
  );
};

export default Diary;
