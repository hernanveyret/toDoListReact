import React from 'react';
import FavOffNav from "../img/favOffNav.png";
import FavOn from "../img/favOn.png";
import "./cards.css";

import Lupa from "../img/lupa.png"
const Favoritos = ({data,idFavorito}) => {

    
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
            <button className="btnCard"  onClick={idFavorito}>{data.favorito ? <img src={FavOn} data-id={data.id} alt="Ico Home" /> : <img src={FavOffNav} data-id={data.id} alt="Ico Home" />}</button>
            <button className="btnCard"><img src={Lupa} alt="Ico Home" /></button>
          </div>
    </div>
  )
}
export default Favoritos;