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

  const total = good + neutral + bad;

  // If total > 0:
  const average = (good*1 + neutral*0 + bad*-1) / total;
  const positive = good / total;

  return (
    <>
      <h2>give your feedback!</h2>
        <Button onClick={handleGoodClick} text={"good"} />
        <Button onClick={handleNeutralClick} text={"neutral"} />
        <Button onClick={handleBadClick} text={"bad"} />
      <h2>statistics</h2>
        <Statistic text={"good"} value={good} />
        <Statistic text={"neutral"} value={neutral} />
        <Statistic text={"bad"} value={bad} />
        <Statistic text={"average"} value={average} />
        <Statistic text={"positive"} value={positive} />
    </>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistic = ({ text, value }) => {
  return (
    <p>
      {text}: {value}
    </p>
  );
}

export default App;
