import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Event handlers
  const handleGoodClick = () => {
    const increment = good + 1;
    setGood(increment);
  };

  const handleNeutralClick = () => {
    const increment = neutral + 1;
    setNeutral(increment);
  };

  const handleBadClick = () => {
    const increment = bad + 1;
    setBad(increment);
  };

  // const clickEventHandlers = {
  //   good: handleGoodClick,
  //   neutral: handleNeutralClick,
  //   bad: handleBadClick,
  // };

  const statisticValues = {
    good: good,
    neutral: neutral,
    bad: bad,
  };


  return (
    <>
      <h2>give your feedback!</h2>
        <Button onClick={handleGoodClick} text={"good"} />
        <Button onClick={handleNeutralClick} text={"neutral"} />
        <Button onClick={handleBadClick} text={"bad"} />
      <Statistics statisticValues={statisticValues}/>
    </>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistics = ({statisticValues}) => {
  const { good, neutral, bad } = statisticValues;
  const total = good + neutral + bad;

  if (total  <= 0 ) {
    return (
      <>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </>
    );
  }

  let average = (good*1 + neutral*0 + bad*-1) / total;
  let positive = good / total;

  return (
    <>
        <h2>statistics</h2>
        <table>
          <tbody>
            <tr><StatisticLine text="good" value={good} /></tr>
            <tr><StatisticLine text="neutral" value={neutral} /></tr>
            <tr><StatisticLine text="bad" value={bad} /></tr>
            <tr><StatisticLine text="average" value={average} /></tr>
            <tr><StatisticLine text="positive" value={positive} /></tr>
          </tbody>
        </table>
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  );
}

export default App;
