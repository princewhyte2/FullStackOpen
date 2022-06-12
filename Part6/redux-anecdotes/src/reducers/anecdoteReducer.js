import anecdotes from "../services/anecdotes"

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      state.find((item) => item.id === action.data.id).votes += 1
      return [...state]
    case "NEW_NOTE":
      return [...state, action.data.content]
    case "INIT_NOTE":
      return action.data.content
    default:
      return state
  }
}

export function newNote(newAnecdote) {
  return async (dispatch) => {
    const content = await anecdotes.createNew(newAnecdote)
    dispatch({ type: "NEW_NOTE", data: { content } })
  }
}

export function castVote(id) {
  return async (dispatch) => {
    await anecdotes.castVote(id)
    dispatch({ type: "VOTE", data: { id } })
  }
}

export function initNote() {
  return async (dispatch) => {
    const content = await anecdotes.getAll()
    dispatch({ type: "INIT_NOTE", data: { content } })
  }
}

export default anecdoteReducer
