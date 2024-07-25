import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initalizeAnecdotes } from "./reducers/anecdoteReducer";

import AnecdotesList from "./components/AnecdotesList";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initalizeAnecdotes());
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
