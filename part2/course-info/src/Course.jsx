// const course = {
//   id: 1,
//   name: "Half Stack application development",
//   parts: [
//     {
//       name: "Fundamentals of React",
//       exercises: 10,
//       id: 1,
//     },
//     {
//       name: "Using props to pass data",
//       exercises: 7,
//       id: 2,
//     },
//     {
//       name: "State of a component",
//       exercises: 14,
//       id: 3,
//     },
//   ],
// };

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};


const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};

const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    );
};

const Total = ({ parts }) => {
    const sum = parts.reduce((acc, part) => acc + part.exercises, 0);
    return <p>total of {sum} exercises</p>;
};


export default Course;
