import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAnecdotes } from "./reducers/anecdoteReducer";
import anecdoteService from "./services/anecdotes";

import AnecdotesList from "./components/AnecdotesList";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, []);

  return (
    <div>
      <Filter />
      <AnecdotesList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
