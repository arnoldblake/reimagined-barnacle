const Header = ({ name }) => {
    return (
      <h1>{name}</h1>
    )
  }
  
  const Content = ({parts}) => {
    return (
      parts.map((part) =>
          <Part key={part.id} part={part}/>
      )
    )
  }
  
  const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }
  
  const Total = ({course}) => {
    let totalExercises = course.parts.reduce((s, p) => s + p.exercises, 0)
  
    return (
      <p>Number of exercises {totalExercises}</p>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total course={course}/>
      </div>
    )
  }

  export default Course