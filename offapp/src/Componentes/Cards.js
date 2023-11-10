import React from 'react';
import FavOffNav from "../img/favOffNav.png";
import "./cards.css";

import Lupa from "../img/lupa.png"
const Cards = ({data}) => {
  
  return (
    <div className="card" key={data.id}>
      <h4 className="titulo">{data.titulo}</h4>
        <img src={data.imagen} alt="imagen" />
          <p>Talle {data.talle}</p>
          <div className="Descripcion">
            <p>{data.descripcion}</p>
          </div>
          <p>{data.color}</p>
          <p>${data.precio}</p>
          <div className="navCard">
            <button className="btnCard"><img src={FavOffNav} alt="Ico Home" /></button>
            <button className="btnCard"><img src={Lupa} alt="Ico Home" /></button>
          </div>
    </div>
  )
}
export default Cards;