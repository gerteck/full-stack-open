import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

import Notification from "./Notification";

// The AnecdotesList component should render all the anecdotes in the application.
const AnecdotesList = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) => {
    const allAnecdotes = state.anecdotes;
    return allAnecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );
  });

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5));
  };

  return (
    <>
      <h2>Anecdotes</h2>
      <Notification />
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div style={{ display: "flex", gap: 5 }}>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
            <br />
          </div>
        ))}
    </>
  );
};

export default AnecdotesList;
