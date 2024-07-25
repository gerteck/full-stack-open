import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAll = () => {
    return axios.get(baseUrl).then((res) => res.data);
};

export const createNew = (newAnecdote) => {
    return axios.post(baseUrl, newAnecdote).then((res) => res.data);
};

export const vote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    return axios
        .put(`${baseUrl}/${anecdote.id}`, updatedAnecdote)
        .then((res) => res.data);
};