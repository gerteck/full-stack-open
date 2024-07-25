import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { vote } from "../requests";
import { useDisplayNotification } from "../contexts/NotificationContext";

const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient();
  const dispatchNotification = useDisplayNotification();

  const voteMutation = useMutation({
    mutationFn: vote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote);
    dispatchNotification(`You voted '${anecdote.content}'`);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

AnecdoteList.propTypes = {
  anecdotes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default AnecdoteList;
