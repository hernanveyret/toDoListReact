import React, { useState } from 'react';

const inicialTarea = {
  id: null,
  texto:"",
  leido: false
}

function TDLForm({data, createData}){
  const [tarea, setTarea] = useState(inicialTarea)
  

  // Crea una tarea
  const handleChange = (e) => {
    let nId = data.length - 1 // toma la cantidad de objetos dentro del array y le resta uno, asi si el array esta vacio el numero inicial va a ser cero.
    setTarea({
      id: nId + 1,
      texto: e.target.value,
      leido: false
    })
  }
  // envia la tarea a la funcion inicial para subirla al localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    createData(tarea)
    handleReset()
  }
  // Resetea el input donde ingresa la tarea
  const handleReset = () => {
    setTarea(inicialTarea)
  }

  return (
    <>
    <nav className="input-text">
      <form onSubmit={handleSubmit}>
        <input type="text" name="nuevoTexto" className="nuevoTexto" value={tarea.texto} placeholder="Ingrese nueva tarea..." autoFocus onChange={handleChange} required />
        <span title="Agrega Tarea"><input type="submit" name="cargar" value="➕" id="mas"/></span>
        <input type="hidden" id="edit-id" />
      </form>
    </nav>
    </>
  )
}
export default TDLForm;