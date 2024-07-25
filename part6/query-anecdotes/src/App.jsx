import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";

import { useQuery } from "@tanstack/react-query";
import { getAll } from "./requests";

const App = () => {
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
    retry: 1,
  });

  const anecdotes = result.data;

  if (result.isLoading) {
    return <div>Loading...</div>;
  } else if (result.isError) {
    return (
      <div>
        Error fetching data, Anecdote service not available due to problems in
        server
      </div>
    );
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
      <AnecdoteList anecdotes={anecdotes} />
    </div>
  );
};

export default App;
