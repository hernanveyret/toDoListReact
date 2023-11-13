import React,{useState} from 'react';
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';

const initialDb = [
  {
    id: 1,
    articulo: 320,
    marca: "Jaguar"
  },
  {
    id: 2,
    articulo: 1010,
    marca: "Heyday"
  },
  {
    id: 3,
    articulo: 9002,
    marca: "Proforce"
  },
  {
    id: 4,
    articulo: 2023,
    marca: "Tridy"
  }
]

const CrudApp = () => {
  const [db, setDb] = useState(initialDb)
  const [dataToEdit, setDataToEdit] = useState(null); // variable que determina si se ingresa un dato o se edita el existente.

  const createData = (data) => {
    data.id = Date.now(); // para obtener un id unico
    setDb([...db,data])
  }

  const updateData = (data) => {
    let newdata = db.map(el => el.id === data.id ? data : el);
    setDb(newdata)
  }
  const deleteData = (id) => {
    let isDelete = window.confirm(`¿Estas seguro de eliminar el registro ${id}?`);// va window para que lo reconozca react
    if(isDelete){
      let newData = db.filter(el => el.id !==id); // mete dentro del array los id, cuando encuentra el que se selecciono lo pasa de largo
      setDb(newData); // luego actualiza la base de datos con los id que quedaron
    }else{
      return; // cuando encuentra el id elejido lo pasa de largo.
    }
  }
  return (
    <div>
      <h2> CRUD APP</h2>
      <article className="grid-1-2">
        <CrudForm 
          createData={createData} // estas funciones estan en el elemento padre,
          updateData={updateData} // se pasan por props para poder usarlas desde
          dataToEdit={dataToEdit} // los componenetes hijos.
          setDataToEdit={setDataToEdit}
          />
        <CrudTable 
          data={db}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
          />
          </article>
    </div>
  )
}

export default CrudApp;