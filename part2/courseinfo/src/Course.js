const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
    return (
        parts.map((part) => <Part key={part.name} part={part} />)
    )
}

const Course = ({course}) => {
    return (
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <p>Total of {course.parts.reduce((accum, curr) => accum + curr.exercises, 0)} exercises</p>
      </>
    )
  }

export default Course