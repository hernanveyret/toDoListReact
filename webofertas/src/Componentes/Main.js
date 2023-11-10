import React,{ useState, useEffect} from 'react';
import Cards from "./Cards";
import Favoritos from "./Favoritos";
import './Main.css';
import HomeFalse from "../img/homeFalse.png";
import HomeTrue from "../img/homeTrue.png";
import FavOn from "../img/favOn.png";

const Main = () => {
  const [home, setHome] = useState(true)
  const [Fav, setFav] = useState(false)

  const [db, setDb] = useState([])
  const [error, setError] = useState("")
  const [favoritoId, setFavoritoId] = useState("")
  const [localS, setLocalS] = useState(localStorage.getItem("favoritosAppOff")) // ve si hay productos en localStorage 
  const [favoritos,setFavoritos] = useState(localS ? JSON.parse(localS) : []) // si hay los agrega al estado y si no crea un array vacio
  
   const url = "http://localhost:5000/ofertas"
  
 useEffect(() => {
  const dataFetch = async () => {
    try {
        const res = await fetch(url);
        if(!res.ok){
          const errorData = {
            status:res.status || "00",
            statusText:res.statusText || "Error de sistema"
          }
          throw errorData;           
        }
        const data = await res.json()
          setDb(data) 
    }catch(err){
      setError(err)
      const message = `Error: ${error.status}, ${error.statusText}`
      console.log(message)
    }
  }
  dataFetch()
  
  console.log("cambio algo")
 },[url,error])

 //Capturo el id del producto, lo guardo nen una variable y se guarda dentro del estado
 const idFavorito = (e) => {
    const id = parseFloat(e.target.dataset.id)
    setFavoritoId(id)
    const filtro = db.filter(elemento => elemento.id ===id)
    filtro[0].favorito = !filtro[0].favorito
      /* Si el valor del producto es falso, crea un nuevo array con todos los elementos diferentes al id seleccionado 
      y actualiza el estado con esos productos para eliminar al que quedo como false. */
    if(filtro[0].favorito === false) {
      const deleteFavorito = favoritos.filter(e => e.id !== filtro[0].id)
      setFavoritos(deleteFavorito)
    }else {
      setFavoritos([...favoritos,filtro[0]])
    }   
 }

 useEffect(() => {
  localStorage.setItem("favoritosAppOff",JSON.stringify(favoritos))
  if(favoritos.length === 0){
    setFav(false)
    setHome(true)
  }
 },[favoritos])

  return (
    <>
      <header>
        <h1 id="cabecera">Ofertas</h1>
      </header>
      <nav>
        <button className="btnNav" onClick={() => {setHome(!home); setFav(!Fav)}} >{home ? <img src={HomeTrue} alt="Ico Home true" />: <img src={HomeFalse} alt="Ico Home False" />}</button>
        <button className="btnNav" onClick={() => {setFav(!Fav); setHome(!home)}} ><img src={FavOn} alt="Ico Home" /></button>
      </nav>
      <section id="main">
        { 
          home ? db.map(e => (<Cards data={e} key={e.id} idFavorito={idFavorito} db={db}/>)) : favoritos.map(e => (<Favoritos data={e} key={e.id} idFavorito={idFavorito}/>))
        }
        
      </section>
      <a href="#cabecera" className="flecha">Flecha</a>
      <a href="https://wa.me/1134025499" target="_blanck" className="whatsAap">WhatAaap</a>
    </>
  )
} // 🏠 ⭐
export default Main;