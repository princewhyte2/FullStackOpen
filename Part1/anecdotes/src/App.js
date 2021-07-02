import React, { useState } from "react";

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const Header = ({ text }) => <h2>{text}</h2>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients",
  ];

  let initialValue = new Array(anecdotes.length + 1)
    .join("0")
    .split("")
    .map(parseFloat);

  const [lead, setLead] = useState(0);
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(initialValue);
  const generateRandomNumber = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const voteClicked = () => {
    const oldPoints = [...points];
    oldPoints[selected] += 1;
    setPoints(oldPoints);
    setLead(points.indexOf(Math.max(...points)));
  };

  return (
    <div>
      <Header text="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button text="vote" handleClick={voteClicked} />
      <Button text="next anecdote" handleClick={generateRandomNumber} />
      <Header text="Anecdote with most votes" />
      <p>{anecdotes[lead]}</p>
      <p>has score {points[lead]}</p>
    </div>
  );
};

export default App;
