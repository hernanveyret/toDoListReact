import React,{ useState } from 'react';
import FavOffNav from "../img/favOffNav.png";
import FavOn from "../img/favOn.png";
import "./cards.css";

import Lupa from "../img/lupa.png"
const Cards = ({data,idFavorito,db}) => {
  const [ imagenLupa, setImagenLupa] = useState(null)
  
  const openModal = (e) => {  
    const modal = document.getElementById("modal")
    modal.showModal()
    let id = e.target.dataset.id
    const imgLupa = db.filter(e => e.id == id)
    let imagen = imgLupa[0].imagen
    setImagenLupa(imagen)
    console.log(imagenLupa)
  }

  const closeModal = () => {
    const modal = document.getElementById("modal")
    modal.close()
  }

 
  return (
    <div className="card" key={data.id}>
      <h4 className="titulo">{data.titulo}</h4>
        <img src={data.imagen} alt="imagen" />
          <p>Talle {data.talle}</p>
          <div className="Descripcion">
            <p>{data.descripcion}</p>
          </div>
          <p>{data.color}</p>
          <p style={{fontSize:"1.5rem"}}>${data.precio}</p>
          <div className="navCard">
            <button className="btnCard" onClick={idFavorito}>{data.favorito ? <img src={FavOn} data-id={data.id} alt="Ico Home" /> : <img src={FavOffNav} data-id={data.id} alt="Ico Home" />}</button>
            <button className="btnCard" onClick={openModal}><img src={Lupa} alt="Ico Home" data-id={data.id} /></button>
          </div>

          <dialog id="modal">
            
            <img src={imagenLupa} alt="Imagen Lupa" />
            <div><button onClick={closeModal}>X</button>  </div>
            
          </dialog>
    </div>
  )
}
export default Cards;