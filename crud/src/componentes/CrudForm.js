import React, {useState, useEffect} from 'react';

const initialForm = {
  id: null,
  articulo:"",
  marca:""
}
const CrudForm = ({createData, updateData, dataToEdit, setDataToEdit}) => {

  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    if(dataToEdit) {
      setForm(dataToEdit);
    }else{
      setForm(initialForm);
    }
  },[dataToEdit])

  const handleChange = (e) => {
    setForm({
      ...form, [e.target.name]: e.target.value, // toma el valor de la propiedad name como nombre de la propiedad del objeto.
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // para que no se auto prosese el formulario.

    if(!form.articulo || !form.marca) { // en vez de usar required, por si no se ingreso valor al formulario.
      alert('datos incompletos');
      return;
    }

    if(form.id === null){ // si el id del form inicial es nulo, crea un nuevo registro
      createData(form)
    }else {
      updateData(form); // Caso contrario, actualiza la informacion.
    }

    handleReset(); // Para limpiar el frmulario
  }

  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit(null); // actualiza a null para volver a determinar si tiene que editar o crear datos nuevos.
  }

  return (
    <div>
      <h3>{dataToEdit ? "Editar" : "Agregar"}</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="articulo" placeholder="articulo" onChange={handleChange} value={form.articulo}/>
        <input type="text" name="marca" placeholder='Marca' onChange={handleChange} value={form.marca}/>
        <input type="submit" value="Enviar" />
        <input type="reset" value="Limpia" onClick={handleReset} />
      </form>
    </div>
  )
}

export default CrudForm;