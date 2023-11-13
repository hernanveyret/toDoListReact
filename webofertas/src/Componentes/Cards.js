import React from 'react';
import FavOffNav from "../img/fav.png";
import FavOn from "../img/favOn.png";
import Compras from "../img/carritoCompras.png";
import "./cards.css";

import Lupa from "../img/lupa.png"
const Cards = ({ openModal,data,idFavorito,ingresarProductos}) => {
  
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
            <button className="btnCard" onClick={openModal}><img src={Lupa} alt="Ico lupa" data-id={data.id} /></button>
            <button className="btnCard" onClick={ingresarProductos}><img src={Compras} alt="Ico Carrito de compras" data-id={data.id} /></button>
          </div>
    </div>
  )
}
export default Cards;