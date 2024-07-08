const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const parts = [part1, part2, part3];
  const exerciseTotal = parts.reduce((total, part) => total + part.exercises, 0);

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total total={exerciseTotal}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]}/>
      <Part part={props.parts[1]}/>
      <Part part={props.parts[2]}/>
    </div>
  )
}

const Part = (props) => {
  const part = props.part;
  return (
    <p>
      {part.name}: {part.exercises}
    </p>
  )
}


const Total = (props) => {
  return (
    <p>Total Number of exercises: {props.total}</p>
  )
}


export default App
