import React, { useState} from 'react';
import TDLForm from './TDLForm';
import TDALista from './TDALista';
import Logo from '../Img/icono/logo.png'
function TDLApp(){
 
  const [localS, setLocalS] = useState(localStorage.getItem("toDoListReact"))
  const [db, setDb] = useState(localS ? JSON.parse(localS) : [])

  const estilologo = {
    width: "30px",
    filter:"drop-shadow(2px 2px 2px black)",
    margin:"0 5px 0 0"  
  }

  const estiloVersion = {
    color:"black",
    fontSize: "11px",
    display:"flex",
    height:"30px",
    width:"40px",
    alignItems:"end",
    marginLeft: "5px"
  }
  
  const createData = (data) => {
    let ocultoBtn = document.getElementById("edit-id")
    let idOculto = ocultoBtn.dataset.id
        if(idOculto){
          db.forEach(e => {
            if(e.id == idOculto){
              let texto = document.querySelector(".nuevoTexto");
              e.texto = texto.value
            }
          })
          ocultoBtn.removeAttribute("data-id")
          tachaData(db)
        }else {
          const updataDb = [...db,data] // Agrego la nueva info al db y le hago una copia.
          setDb(updataDb) // Actualizo la db con la nueva copia
          updateLocal(updataDb) // Actualizo el localStorage con la copia
          window.location.reload()
        }
    
  }

  const tachaData = (data) => {
    setDb(data)
    updateLocal(data)
  }
  
  // Actualizo localStorage y el estado localS
  const updateLocal = (dataUpdate) => {
    localStorage.setItem("toDoListReact", JSON.stringify(dataUpdate));
    setLocalS(JSON.stringify(dataUpdate)); // Actualiza localS con la nueva data
    setDb(dataUpdate); // Actualiza db con la nueva data
  };
  
  const handleDelete = (e) => {
    console.log(e.target)
    let checkIndividual = document.querySelectorAll(".checkTarea");
    checkIndividual.forEach(e => {
      if(e.checked){
        let idDelete = parseFloat(e.dataset.id);
          db.forEach(e => {
            if(e.id === idDelete){
              let idEdit= db.findIndex(e => e.id === idDelete)
              db.splice(idEdit,1)
              localStorage.setItem("toDoListReact",JSON.stringify(db))                            
            };                
          });
      };
    });
    window.location.reload();
  }
  
  // Marca todos los checkbox al hacer click en todos.  
  const checkAlls = (e) => {    
    let checkAll = document.querySelector(".checkTodos");  
    let checkIndividual = document.querySelectorAll(".checkTarea");   
    
      checkIndividual.forEach(el => { // recorro todos los checkbox para igualar el valor del checkbox todos
        el.checked = checkAll.checked // igualo el valor de cada checkbox
      })
  }

   return (
    <div>
      <header><img src={Logo} alt="Logo" style={estilologo}/><h1>Lista de tareas</h1><span style={estiloVersion}><p>V.1.R</p></span></header>
      <nav>
      <span title="Selecciona todo"><label><input type="checkbox" name="checkTodos" className="checkTodos" onChange={checkAlls} />Todos</label></span>      
      <span title="Eliminar"><button className="btn-borrar" onClick={handleDelete}>🗑️</button></span>
    </nav>

   <main className="lista-main">
    <TDALista 
       data={db}
       tachaData={tachaData}
    />
   </main>
   
    <TDLForm 
      data={db}
      createData={createData}
      />
    </div>
  )
}

export default TDLApp;