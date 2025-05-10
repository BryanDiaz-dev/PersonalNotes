import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import NoteItem from './components/NoteItem'
import NoteView from './components/NoteView'

function App () {
  const [selectedNote, setSelectedNote] = useState(null) // Estado para la nota seleccionada

  const [notes, setNotes] = useState(() => {
    /* global localStorage */ // Esto le dice a StandardJS que localStorage es una variable global
    const savedNotes = localStorage.getItem('notes')
    return savedNotes ? JSON.parse(savedNotes) : []
  })
  // Esto permite que las notas se mantengan incluso si se recarga la página
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes)) // Guardar las notas en el localStorage
  }
  , [notes]) // Depencencia: solo se ejecuta cuando "notes" cambia

  // Función para eliminar una nota
  const removeNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id) // Filtra las notas para eliminar la con el id especificado
    setNotes(newNotes)
    if (selectedNote && selectedNote.id === id) { exitNote() } // Si la nota eliminada es la seleccionada, se deselecciona
  }

  const exitNote = () => {
    setSelectedNote(null) // Deselecciona la nota
  }

  // Función para agregar una nueva nota
  const addNote = () => {
    const newNote = {
      id: Date.now(), // Crea un identificador unico usando la funcion Date.now
      title: '',
      content: '',
      date: new Date().toLocaleString() // Incluye la fecha y hora actual
    }
    setNotes([...notes, newNote])
    setSelectedNote(newNote) // Selecciona la nueva nota
  }

  // Actualizar una nota
  const updateNote = (updateNote) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === updateNote.id) {
        return { ...note, ...updateNote }
      }
      return note
    })
    setNotes(updatedNotes)
  }

  // Función para seleccionar una nota
  const selectNote = (id) => {
    const selectedNote = notes.find((note) => note.id === id)
    if (selectedNote) {
      setSelectedNote(selectedNote)
    }
  }

  // Función para manejar el clic en una nota
  const handleNoteClick = (id) => {
    selectNote(id)
  }

  return (
    <div className='h-screen flex'>
      <aside className='w-1/6 bg-zinc-900 flex flex-col'>
        <section className='flex justify-between text-white p-3'>
          <div className='p-2'><p>Lista de Notas</p></div>
          <div className='p-2 bg-zinc-700 rounded' onClick={addNote}>
            <Plus />
          </div>
        </section>
        <section className='overflow-y-auto flex-1 p-2 flex flex-col gap-4'>
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} removeNote={removeNote} handleNoteClick={handleNoteClick} />
          ))}
        </section>
      </aside>

      <main className='flex-1 flex flex-col bg-zinc-800'>
        <NoteView selectedNote={selectedNote} exitNote={exitNote} updateNote={updateNote} />
      </main>
    </div>
  )
}

export default App
