import React,{ useState, useEffect} from 'react';
import Cards from "./Cards";
import Error from './Error';
import Lupa from './Lupa';
import Carrito from './Carrito';
import './Main.css';
import HomeFalse from "../img/homeFalse.png";
import HomeTrue from "../img/homeTrue.png";
import FavOn from "../img/favOn.png";
import CarritoOf from '../img/carritoOf.png';
import CarritoOn from '../img/carritoOn.png';

const Main = () => {
  const [home, setHome] = useState(true)
  const [Fav, setFav] = useState(false)
  const [lupa, setLupa] = useState(false)
  const [carrito, setCarrito] = useState(false)

  const [db, setDb] = useState([])
  const [error, setError] = useState("")
  const [favoritoId, setFavoritoId] = useState("")
  const [localS, setLocalS] = useState(localStorage.getItem("favoritosAppOff")) // ve si hay productos en localStorage 
  const [favoritos,setFavoritos] = useState(localS ? JSON.parse(localS) : []) // si hay los agrega al estado y si no crea un array vacio
  const [imgLupa, setImgLupa] = useState("");

  //const url = "http://localhost:5000/ofertas"
  
  const url = "https://raw.githubusercontent.com/hernanveyret/webDeOfertas/main/src/Api/data.json"

 useEffect(() => {
  const dataFetch = async () => {
       
    try {
        const res = await fetch(url);
        
        if(!res.ok){
          const errorData = {
            status:res.status || "00",
            statusText:res.statusText || "Error, id_Interno: no se pudo comunicar con la base de datos."
          }
          throw errorData;           
        }
        const data = await res.json()
          setDb(data) 
    }catch(err){
      setError(err)
      const message = `Error: ${err.status}, ${err.statusText}`
      console.log(message)
    }
  }
  dataFetch()
  
 },[url])

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

 // Abre ventana modal con la imagen del producto
 const openModal = (e) => {
  let id = e.target.dataset.id;
  const productoLupa = db.filter(e => e.id == id)
  let img = productoLupa[0].imagen
  setImgLupa(img)
  setLupa(true);
 }

// cierra la venta modal
 const closeModal = () => {
  setLupa(false);
 }

 const ingresarProductos = () => {
  console.log("produtos")
 }

 return (
    <>
      <header>
        <h1 id="cabecera">Ofertas</h1>
      </header>
      <nav>
        <button className="btnNav" onClick={() => {setHome(true); setFav(false); setCarrito(false)}} >{home ? <img src={HomeTrue} alt="Ico Home true" />: <img src={HomeFalse} alt="Ico Home False" />}</button>
        <button className="btnNav" onClick={() => {setFav(true); setHome(false); setCarrito(false)}} ><img src={FavOn} alt="Ico Home" /></button>
        <button className="btnNav" onClick={() => {setCarrito(true); setHome(false); setFav(false)}}>{ carrito ? <img src={CarritoOn} alt="icono del carrito"/> : <img src={CarritoOf} alt="icono del carrito"/>}</button>
      </nav>
      <section id="main">
        { carrito && <Carrito />}
        { lupa && <Lupa closeModal={closeModal} imgLupa={imgLupa}/> }
        { home && db.map(e => (<Cards data={e} key={e.id} idFavorito={idFavorito} openModal={openModal} ingresarProductos={ingresarProductos}/>)) }
        { Fav && favoritos.map(e => (<Cards data={e} key={e.id} idFavorito={idFavorito} openModal={openModal} ingresarProductos={ingresarProductos}/>)) }
        { error && <Error msj={error} /> }
      </section>
      <a href="#cabecera" className="flecha">Flecha</a>
      <a href="https://wa.me/1134025499" target="_blanck" className="whatsAap">WhatAaap</a>
    </>
  )
} // 🏠 ⭐
export default Main;