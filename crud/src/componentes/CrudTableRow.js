import React from 'react';

const CrudTableRow = ({el,setDataToEdit, deleteData}) => {
  let {articulo,marca,id} = el; // destructuracion del elemento, en los td no se usa el.articulo por ejemplo
  return (    
    <tr>
      <td>{articulo}</td> 
      <td>{marca}</td>
      <td><button onClick={()=> setDataToEdit(el)}>Editar</button>
      <button onClick={()=> deleteData(id)}>Eliminar</button> 
      </td>
    </tr>
     
  )
}

export default CrudTableRow;