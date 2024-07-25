import { createSlice } from '@reduxjs/toolkit';
// import { current } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    incrementAnecdoteVote(state, action) {
      const updatedAnecdote = action.payload;
      const id = updatedAnecdote.id;
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
});

export const initalizeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = id => {
  return async dispatch => {

    const anecdote = await anecdoteService.get(id);
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    await anecdoteService.update(anecdote.id, updatedAnecdote);
    dispatch(incrementAnecdoteVote(updatedAnecdote));
  };
};


export const { incrementAnecdoteVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;