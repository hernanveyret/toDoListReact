import React,{ useState,useEffect } from "react";

function Tabla({name,id,check,otroId}){
  const [checkTable, setCheckTable] = useState(check)
  const [estado, setEstado] = useState(false)
 
  const obj = {
    display: "none"
  }
  const none = {
    textDecoration:"none"
   }
   const tacha = {
    textDecoration:"line-through"
   }
  

  const checkear = (e) => {
    setCheckTable(e.target.checked)
  }

  useEffect(() => {
    setCheckTable(check)
    setEstado(check)
  },[check])  

  return (
    <>
    <table border="1">
      <thead>
      <tr>
        <th>NOMBRE</th>
        <th>ID</th>
        <th>otro-ID</th>
        <th>ESTADO</th>
        <th>CHECK</th>
        <th>CHECK</th>
        <th>MARCAR</th>
      </tr>
      </thead>
      <tbody>
        <tr>
          <td style={estado ? tacha : none }>{name}</td>
          <td>{id}</td>
          <td>{otroId}</td>
          <td>{check ? "ENCENDIDO" : "APAGADO"}</td>
          <td><input type="checkbox" checked={checkTable} onChange={checkear} /></td>
          <td><input type="checkbox" checked={estado} /></td>
          <td><input type="checkbox" checked={estado} className="checkbox" style={obj} />{estado ? "✔️" : "❌"}</td>

        </tr>
      </tbody>

    </table>      
    </>
   )
}
export default Tabla;