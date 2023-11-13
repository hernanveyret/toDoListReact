import React,{ useState, useEffect } from 'react';
import { helpHttp } from "../helpers/helpHttp";
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';
import Loader from "./Loader";
import Message from "./Message";

const CrudAppi = () => {
  const [db, setDb] = useState(null)
  const [dataToEdit, setDataToEdit] = useState(null); // variable que determina si se ingresa un dato o se edita el existente.
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  let api = helpHttp(); 
  let url = "http://localhost:5000/calzadosAdulto"; // url de nuestra base de datos

  useEffect(() => {
    setLoading(true)
    helpHttp().get(url).then(res => {  // carg el helpHttp.get(la url).then(la respues {y hago que se vea}) 
      if(!res.err) {
        setDb(res)
        setError(null)
      }else{
        setDb(null)
        setError(res)
      }
      setLoading(false)
      console.log(res)
    }); 
    
  },[url]) // el segundo objeto vacio, se carga solo la primera vez

  const createData = (data) => {
    let options = {
      body:data,
      headers: {"content-type":"application/json"},
    }
    data.id = Date.now(); // para obtener un id unico
    api.post(url, options).then((res) => {
      console.log(res)
      if(!res.err) { // si no hay algun error
        setDb([...db,res]); //Agrega a lo que hay, lo que traiga en la respuesta
      }else {
        setError(res);
      }
    })    
  };

  const updateData = (data) => {
    let endpoint = `${url}/${data.id}` // se agrega el id a la url para actualizar
    let options = {
      body:data,
      headers: {"content-type":"application/json"},
    }
    api.put(endpoint, options).then((res) => {
      if(!res.err) { // si no hay algun error
        let newData = db.map(el => el.id === data.id ? data : el);
        setDb(newData)
      }else {
        setError(res);
      }
    })
  }
  const deleteData = (id) => {
    let isDelete = window.confirm(`¿Estas seguro de eliminar el registro ${id}?`);// va window para que lo reconozca react
    if(isDelete){
      let endpoint = `${url}/${id}`;
      let options = {
        headers:{"content-type":"application/json"}
      }
      api.del(endpoint,options).then((res)=> {
        if(!res.err) { // si no hay algun error
          let newData = db.filter(el => el.id !==id); // mete dentro del array los id, cuando encuentra el que se selecciono lo pasa de largo
          setDb(newData); // luego actualiza la base de datos con los id que quedaron
        }else {
          setError(res);
        }
      })
    }else{
      return; // cuando encuentra el id elejido lo pasa de largo.
    }
  }
  return (
    <div>
      <h2> CRUD APPI</h2>
      <article className="grid-1-2">
        <CrudForm 
          createData={createData} // estas funciones estan en el elemento padre,
          updateData={updateData} // se pasan por props para poder usarlas desde
          dataToEdit={dataToEdit} // los componenetes hijos.
          setDataToEdit={setDataToEdit}
          />
          {loading && <Loader />} 
          {error && <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545"/>}
     { db && <CrudTable 
          data={db}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
          />
     }
          </article>
    </div>
  )
}

export default CrudAppi;