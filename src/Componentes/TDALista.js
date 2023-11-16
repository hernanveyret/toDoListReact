import React, {useState} from 'react';
import Fondo from "../Img/sintareas.png"
function TDALista({data,tachaData}) {
  const [tareas,setTareas] = useState(data)

  // Estilo CSS para el texo, si esta leido lo tacha y pone gris, sino que da normal
  let estiloTrue = {
      textDecoration:"line-through",
      color:"grey"
  }
  let estiloFalse = { textDecoration:"none"}

  const algo = tareas

  const handleCheck = (e) => {    
    let dataSet = parseFloat(e.target.dataset.id)
    algo.forEach(el => {
      if(el.id === dataSet){
          let condicion = !el.leido
          el.leido = condicion          
      }    
    })
    setTareas(algo) 
    tachaData(tareas)
  }
  // pasa la tarea el input text, cambia el ico del + por el disquete y agrega un id al boton oculto
  const handleEdit = (e) => {
    let id = parseFloat(e.target.dataset.id)
    let btn = document.getElementById("mas")
    let btnOculto = document.getElementById("edit-id")
    btnOculto.dataset.id = id    
    data.forEach(e => {
      if(e.id === id){
        let textoInput = document.querySelector(".nuevoTexto")
        btn.value = "💾"
        textoInput.value = e.texto
      }
    })
  }
  
  
  return (
     <>      
      { data.length > 0 ?
       data.map(e => (
        <div className="tareaContenedor" key={e.id}>
          <input type="checkbox" name="checkTarea" className="checkTarea" data-id={e.id}/>
          <div className="texto" id="text" style={e.leido ? estiloTrue : estiloFalse }>{e.texto}</div>
          <button className="btn-tachar" data-id={e.id} onClick={handleCheck}>{e.leido ? "✔️" : "❌" }</button>
          <span title="Editar"><button className="btn-editar" data-id={e.id} onClick={handleEdit}>🖊️</button></span>
        </div>
       ))
       : <img src={Fondo} alt="Fondo sin tareas" className="imgFondo" />
      }
    
     </>
  )
}// ✔️ ❌ ☀️ 🌙 💾 ➕ ⁝
export default TDALista;