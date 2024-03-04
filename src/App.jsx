import Nav from './Nav.jsx'
import Player from './Player.jsx'
import { useState, useEffect} from "react"
import Perfil from './contenido/Perfil.jsx'
import Artistas from './contenido/Artistas.jsx'
import CrearListas from './contenido/CrearListas.jsx'
import About from './contenido/About.jsx'
import Contacto from './contenido/Contacto.jsx'
import Login from './Login.jsx'

function App() {
  const [abierto, setAbierto] = useState(true);
  const [content, setContent] = useState("Perfil");
  const [playlists, setPlaylists] = useState([]);
  const [currentPlay, setCurrentPlay] = useState();
  const [login, setLogin] = useState(false);

  useEffect(() => {
    playlists.map((pl, ind) => {
      if(currentPlay){
        if(pl.nombreValue === currentPlay.nombreValue){
          setCurrentPlay(pl);
        }
      }
      
    })
  }, [playlists]);

  function contenido(c) {
    switch(c){
      case "Perfil":
        return <Perfil playlists={playlists} abierto={abierto} setCurrentPlay={setCurrentPlay}/>
      case "CrearListas":
        return <CrearListas playlists={playlists} setPlaylists={nuevasPlays => setPlaylists(nuevasPlays)}/>
      case "Artistas":
        return <Artistas/>
      case "About":
        return <About/>
      case "Contacto":
        return <Contacto/>
      default:
        return <Perfil/>
    }
  }

  const handleLogin = () => {
    console.log(login);
    if(login){
      return (
        <>
          <div className='flex flex-row '>
            <Nav abierto={abierto} setAbierto={setAbierto} content={content} setContent={setContent}/>
            <div className='duration-500 rounded-2xl bg-[#214984] max-h-[80vh] w-full ml-5 mr-3 mt-3'>
              {contenido(content)}
            </div>
          </div>
          <Player currentPlay={currentPlay}/>
        </>
      )
    }else{
      return (
        <Login setLogin={setLogin}/>
      )
    }
  }

  return (
    <>
      {handleLogin()}
      {/* <div className='flex flex-row '>
        <Nav abierto={abierto} setAbierto={setAbierto} content={content} setContent={setContent}/>
        <div className='duration-500 rounded-2xl bg-[#214984] max-h-[80vh] w-full ml-5 mr-3 mt-3'>
          {contenido(content)}
        </div>
      </div>
      <Player currentPlay={currentPlay}/> */}
    </>
  );
}

export default App
