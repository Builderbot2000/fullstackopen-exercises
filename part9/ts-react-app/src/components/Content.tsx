import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({
  courseParts,
}: {
  courseParts: CoursePart[];
}): JSX.Element => {
  return (
    <div>
      <Part part={courseParts[0]} />
      <Part part={courseParts[1]} />
      <Part part={courseParts[2]} />
    </div>
  );
};
export default Content;
