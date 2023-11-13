import React, { useState,useEffect } from "react";


function Input({mostrar}) {

  const [nombre, setNombre] = useState("")
  const [id, setId] = useState("");
  const [check, setCheck] = useState(false)
  const [btn, setBtn] = useState(null)

  useEffect(()=> {
    mostrar(nombre,id,check,btn)
  },[nombre,id,mostrar,check,btn])

  return (
    <div>
      <input type="text" name="nombre" onChange={(e) => {setNombre(e.target.value)}}/>
      <input type="checkbox" onChange={(e)=>{setCheck(e.target.checked)}} />
      <button data-id="12345" onClick={(e)=> {setId(e.target.dataset.id)}}>CLICK</button>
      <button data-id={id ? id : "nada"} onClick={(e) => {setBtn(e.target.dataset.id)}}>BTN</button>
      <p>{nombre}</p>
      <p>{id}</p>
    </div>
  )
}

export default Input;