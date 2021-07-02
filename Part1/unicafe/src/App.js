import React, { useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  if (!total) {
    return <div>No feedback given</div>;
  } else {
    return (
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={total} />
          <Statistic
            text="average"
            value={((good * 1 + neutral * 0 + bad * -1) / total).toFixed(1)}
          />
          <Statistic
            text="positive"
            value={`${((good / total) * 100).toFixed(1)} %`}
          />
        </tbody>
      </table>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onGoodClicked = () => setGood(good + 1);
  const onNeutralClicked = () => setNeutral(neutral + 1);
  const onBadClicked = () => setBad(bad + 1);

  return (
    <div>
      <h3>give feedback</h3>
      <Button text="good" handleClick={onGoodClicked} />
      <Button text="neutral" handleClick={onNeutralClicked} />
      <Button text="bad" handleClick={onBadClicked} />
      <h3>statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
