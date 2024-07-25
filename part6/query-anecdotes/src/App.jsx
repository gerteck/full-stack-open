import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { getAll, vote } from "./requests";

const App = () => {
  const queryClient = useQueryClient();

  const voteMutation = useMutation({
    mutationFn: vote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote);
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
    retry: 1,
  });

  // console.log(JSON.parse(JSON.stringify(result)));

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

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
