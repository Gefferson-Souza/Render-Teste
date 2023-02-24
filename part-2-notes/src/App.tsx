import { useState, useEffect } from 'react'
import './App.css'
import noteService from './services/Notes'

function App() {

  interface Inotes {
    id: number;
    content: String;
    important: Boolean;
  }

  const [notes, setNotes] = useState<Inotes[]>([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  

  const hook = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }
  useEffect(hook, [])


  

  const submitNote = (e:any) =>{
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  } 

  const toggleImportantOf = (id:number) => {
    const note:any = notes.find((n) => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => setNotes(notes.map((n) => n.id !== id ? n : returnedNote)))
      .catch(error => {
        alert (
          `The note Was already deleted from the server`
        )
      })
  }

  const deleteNote = (id:number) => {
    const note = notes.find(n => n.id === id)

    noteService
    .del(id)
    .then(deletedNote => setNotes(notes.filter(n => n.id !== id)))
    .catch(error => {
      alert (
        `The note with the id: '${id}' Was already deleted from the server`
      )
      setNotes(notes.filter(n => n.id !== id))
    })

  }

  const allNotes = notes.map((note) =>{
     return <li key={note.id}>
        {note.content}
         <button onClick={() => toggleImportantOf(note.id)}>
          {note.important ? 'not important' : 'important'}
          </button>
          <button onClick={() => deleteNote(note.id)}>
             Delete
          </button>
        </li>
    })

  const importantNotes = notes.map((note) => {
    return note.important ?  <li key={note.id}  onClick={() => deleteNote(note.id)} >{note.content}</li> : null
  })

  return (
    <div className="App">
      <h1>Notes</h1>
      <ul>{showAll ? allNotes : importantNotes }</ul>
      <button onClick={() => setShowAll(!showAll)}>Show {showAll ?'Important':'All'}</button>
      <form onSubmit={submitNote}>
        <input value={newNote} onChange={(e) => setNewNote(e.target.value)} required />
        <button>ADD Note</button>
      </form>
    </div>
  )
}

export default App
