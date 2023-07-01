import { SyntheticEvent, useState } from "react";
import diariesService from "../services/diariesService";
import axios from "axios";
import { DiaryEntry, Visibility, Weather } from "../types";

const NewDiary = ({
  diaries,
  setDiaries,
}: {
  diaries: DiaryEntry[];
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}) => {
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleNewDiaryEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    let weatherType;
    switch (weather) {
      case "sunny":
        weatherType = Weather.Sunny;
        break;
      case "rainy":
        weatherType = Weather.Rainy;
        break;
      case "cloudy":
        weatherType = Weather.Cloudy;
        break;
      case "stormy":
        weatherType = Weather.Stormy;
        break;
      case "windy":
        weatherType = Weather.Windy;
        break;
      default:
        console.log("Unknown weather type!");
        weatherType = Weather.Sunny;
    }
    let visibilityType;
    switch (visibility) {
      case "great":
        visibilityType = Visibility.Great;
        break;
      case "good":
        visibilityType = Visibility.Good;
        break;
      case "ok":
        visibilityType = Visibility.Ok;
        break;
      case "poor":
        visibilityType = Visibility.Poor;
        break;
      default:
        console.log("Unknown visibility type!");
        visibilityType = Visibility.Great;
    }
    try {
      const newDiary = await diariesService.create({
        date,
        weather: weatherType,
        visibility: visibilityType,
        comment,
      });
      if (newDiary) setDiaries(diaries.concat(newDiary));
      else console.log("New diary not found!");
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.message) setError(error.message);
        else setError("Null Error!");
        setTimeout(() => {
          setError("");
        }, 2000);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <b>
        <h2>Add new entry</h2>
      </b>
      <p style={{ color: "red" }}>{error}</p>
      <form onSubmit={handleNewDiaryEntry}>
        <div>
          <label>
            Date{" "}
            <input
              type="date"
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
          </label>
        </div>
        <div>
          Visibility{"    "}
          <label>
            great
            <input
              type="radio"
              value="great"
              checked={visibility === "great"}
              onChange={({ target }) => setVisibility(target.value)}
            />
          </label>
          <label>
            good
            <input
              type="radio"
              value="good"
              checked={visibility === "good"}
              onChange={({ target }) => setVisibility(target.value)}
            />
          </label>
          <label>
            ok
            <input
              type="radio"
              value="ok"
              checked={visibility === "ok"}
              onChange={({ target }) => setVisibility(target.value)}
            />
          </label>
          <label>
            poor
            <input
              type="radio"
              value="poor"
              checked={visibility === "poor"}
              onChange={({ target }) => setVisibility(target.value)}
            />
          </label>
        </div>
        <div>
          Weather{"    "}
          <label>
            sunny
            <input
              type="radio"
              value="sunny"
              checked={weather === "sunny"}
              onChange={({ target }) => setWeather(target.value)}
            />
          </label>
          <label>
            rainy
            <input
              type="radio"
              value="rainy"
              checked={weather === "rainy"}
              onChange={({ target }) => setWeather(target.value)}
            />
          </label>
          <label>
            cloudy
            <input
              type="radio"
              value="cloudy"
              checked={weather === "cloudy"}
              onChange={({ target }) => setWeather(target.value)}
            />
          </label>
          <label>
            stormy
            <input
              type="radio"
              value="stormy"
              checked={weather === "stormy"}
              onChange={({ target }) => setWeather(target.value)}
            />
          </label>
          <label>
            windy
            <input
              type="radio"
              value="windy"
              checked={weather === "windy"}
              onChange={({ target }) => setWeather(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Comment{" "}
            <input
              type="text"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
          </label>
        </div>
        <br />
        <input type="submit" value="New Entry" />
      </form>
      <br />
    </div>
  );
};

export default NewDiary;
