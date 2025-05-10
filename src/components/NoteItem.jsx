import React from 'react'
import { Trash } from 'lucide-react'

const NoteItem = ({ note, removeNote, handleNoteClick }) => {
  const newTitle = note.title === '' ? 'Sin titulo' : note.title // Si el título está vacío, coloca "sin titulo", de lo contrario, usa el título

  return (
    <article className='p-2 text-white rounded bg-zinc-600 flex justify-between hover:cursor-pointer'>
      <div onClick={() => handleNoteClick(note.id)}>
        <h1>{newTitle}</h1>
        <p className='text-sm text-zinc-300'>{note.date}</p>
      </div>

      <div className='p-2'>
        <div onClick={() => removeNote(note.id)}><Trash /></div>
      </div>
    </article>
  )
}

export default NoteItem
