import React from 'react'
import { useDispatch } from 'react-redux'
import { newNote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {

    const dispatch = useDispatch()


    function handleSubmit (e) {
        e.preventDefault()
        const content = e.target.note.value
        e.target.note.value = ''
        dispatch(newNote(content))
        dispatch(setNotification(`you added ${content}`, 5))

    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={ handleSubmit } >
                <div><input name="note" /></div>
                <button>create</button>
            </ form >
        </div>
    )
}

export default AnecdoteForm