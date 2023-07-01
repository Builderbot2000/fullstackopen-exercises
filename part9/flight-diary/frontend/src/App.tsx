import { useState, useEffect } from "react";
import diariesService from "./services/diariesService";
import { DiaryEntry } from "./types";
import Diaries from "./components/Diaries";
import NewDiary from "./components/NewDiary";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await diariesService.getAll();
      setDiaries(diaries);
    };
    void fetchDiaries();
  }, []);

  return (
    <div>
      <NewDiary diaries={diaries} setDiaries={setDiaries} />
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;
