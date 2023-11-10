import React,{ useState, useEffect} from 'react';
import Cards from "./Cards";
import './Main.css';
import Home from "../img/home.png";
import FavOn from "../img/favOn.png";

const Main = () => {
  const [db, setDb] = useState([])
  const [error, setError] = useState("")
  const url = "http://localhost:5000/ofertas"
  
 useEffect(() => {
  const dataFetch = async () => {
    try {
        const res = await fetch(url);
        console.log(res)
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
  console.log(db)
 },[url,error])
  return (
    <>
      <header>
        <h1 id="cabecera">Ofertas</h1>
      </header>
      <nav>
        <button className="btnNav"><img src={Home} alt="Ico Home" /></button>
        <button className="btnNav"><img src={FavOn} alt="Ico Home" /></button>
      </nav>
      <section id="main">
        {
          db && db.map(e => (
          <Cards data={e} key={e.id}/>
         ))
        }
        
      </section>
      <div className="flecha"><a href="cabecera">Flecha</a></div>
      <div className="whatsAap"><a href="cabecera">WhatAaap</a></div>
    </>
  )
}
export default Main;