import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createNew } from "../requests";
import { useDisplayNotification } from "../contexts/NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const displayNotification = useDisplayNotification();

  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
    onError: (error) => {
      const errorMessage = error.response.data.error;
      displayNotification(`Error creating anecdote: ${errorMessage}`);
    },
  });

  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    newAnecdoteMutation.mutate({ content, votes: 0 });
    displayNotification(`created new anecdote: ${content}`);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
