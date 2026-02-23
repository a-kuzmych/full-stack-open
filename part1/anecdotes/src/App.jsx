import { useState } from "react";

const AnecdoteDisplay = ({ header, anecdote, votes }) => (
  <>
    <h1>{header}</h1>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </>
);

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  const handleVote = () => {
    setVotes({ ...votes, [selected]: votes[selected] + 1 });
  };

  const handleNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  return (
    <>
      <AnecdoteDisplay
        header="Anecdote of the day"
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
      />

      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleNextAnecdote} text="next anecdote" />
      <AnecdoteDisplay
        header="Anecdote with most votes"
        anecdote={
          anecdotes[
            Object.keys(votes).reduce((a, b) => (votes[a] > votes[b] ? a : b))
          ]
        }
        votes={Math.max(...Object.values(votes))}
      />
    </>
  );
};

export default App;
