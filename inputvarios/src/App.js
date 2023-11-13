import React, { useState } from "react"
import Input from "./Componentes/Input";
import Tabla from "./Componentes/Tabla";
import './App.css';

function App() {
  const [newName, setNewName] = useState("")
  const [id, setId] = useState("")
  const [ckecks, setChecks] = useState(false)
  const [otroId, setOtroId] = useState(undefined)

  const mostrar = (nombre,id,check,btn)=> {
    setNewName(nombre)
    setId(id)
    setChecks(check)
    setOtroId(btn)
    console.log(otroId)
  }
 urn (
    <div className="App">
      <Input
        mostrar={mostrar}
      />
      <Tabla 
      name={newName}
      id={id}
      check={ckecks}
      otroId={otroId}
      />
    </div>
  );
}

export default App;

