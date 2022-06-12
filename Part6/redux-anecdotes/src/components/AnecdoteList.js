import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { castVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Notification from './Notification'


const AnecdoteList = () => {
    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdote)

    const dispatch = useDispatch()
    const vote = (id) => {
        dispatch(castVote(id))
        const content = anecdotes.find((item) => item.id === id).content
        dispatch(setNotification(`you voted "${content}"`, 5))
    }

    const anecdotesToShow = anecdotes.filter((item) => item.content.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => a.votes - b.votes).reverse()



    return (
        <div>
            <Notification />
            {
                anecdotesToShow.map(anecdote =>
                    <div key={ anecdote.id }>
                        <div>
                            { anecdote.content }
                        </div>
                        <div>
                            has { anecdote.votes }
                            <button onClick={ () => vote(anecdote.id) }>vote</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default AnecdoteList