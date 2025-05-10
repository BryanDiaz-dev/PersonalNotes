import { useState, useEffect } from 'react'
import { LogOut, Download } from 'lucide-react'

const NoteView = ({ selectedNote, exitNote, updateNote }) => {
  if (!selectedNote) {
    return (
      <div className='flex-1 flex items-center justify-center bg-zinc-800'>
        <h1 className='text-2xl text-gray-500'>Selecciona una nota</h1>
      </div>
    )
  }

  const [titleNote, setTitleNote] = useState(null)
  const [contentNote, setContentNote] = useState(null)

  // Actualiza el título y el contenido cuando se selecciona una nota
  useEffect(() => {
    setTitleNote(selectedNote.title)
    setContentNote(selectedNote.content)
  }, [selectedNote])

  // Guardar los cambios
  const handleSave = () => {
    const updatedNote = {
      id: selectedNote.id,
      title: titleNote,
      content: contentNote,
      date: selectedNote.date // Mantén la fecha original
    }
    updateNote(updatedNote) // Actualiza la nota
  }

  return (
    <>
      <header className='p-4 h-14 flex items-center justify-between text-white'>
        <div>
          <input
            type='text'
            className='text-white text-xl font-bold outline-none border-none'
            value={titleNote}
            onChange={(e) => setTitleNote(e.target.value)} // Actualiza el estado al escribir
            placeholder='Escribe el título aquí...'
          />
        </div>
        <div className='flex gap-4'>
          <div onClick={handleSave}>
            <Download className='hover:cursor-pointer hover:text-zinc-400' />
          </div>
          <div onClick={exitNote}>
            <LogOut className='hover:cursor-pointer hover:text-zinc-400' />
          </div>
        </div>
      </header>
      <textarea
        className='flex-1 text-zinc-400 p-3 outline-none'
        value={contentNote}
        onChange={(e) => setContentNote(e.target.value)} // Actualiza el estado al escribir
        placeholder='Escribe el contenido de la nota aquí...'
      />
    </>
  )
}

export default NoteView
