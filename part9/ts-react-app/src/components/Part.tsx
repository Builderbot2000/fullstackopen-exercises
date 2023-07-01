import { CoursePart, assertNever } from "../types";

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <p>
            <b>{part.name}</b>
            {" " + part.exerciseCount}
          </p>
          {part.description}
        </div>
      );
    case "group":
      return (
        <div>
          <p>
            <b>{part.name}</b>
            {" " + part.exerciseCount}
          </p>
          project exercises {part.groupProjectCount}
        </div>
      );
    case "background":
      return (
        <div>
          <p>
            <b>{part.name}</b>
            {" " + part.exerciseCount}
          </p>
          {part.description}
          {part.backgroundMaterial}
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
