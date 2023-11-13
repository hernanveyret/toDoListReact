import React from 'react';
import CrudTableRow from './CrudTableRow';
const CrudTable = ({data, setDataToEdit,deleteData}) => {
  return (
    <div>
      <h3>Tabla de datos</h3>
      <table>
        <thead>
          <tr>
            <th>Articulos</th>
            <th>Marcas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? <tr><td calSpan="3">Sin datos</td></tr> : data.map((el) => <CrudTableRow key={el.id} el={el} setDataToEdit={setDataToEdit} deleteData={deleteData}/>)}
        </tbody>
      </table>
    </div>
  )
}

export default CrudTable;