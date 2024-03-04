import React , {useEffect, useState} from 'react';
import canciones from './../assets/canciones.json';
import DivCancion from './DivCancion.jsx'
import DivPlaylist from './DivPlaylist.jsx';

function CrearListas({playlists, setPlaylists}){
  const [selectedSongs, setSelectedSongs] = useState([]);
  
  const [rerenderKey, setRerenderKey] = useState(0);
  const [nombreValue, setNombreValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAcceptButtonClick = () => {
    if(evaluarModal()){
      setErrorMessage('La lista debe tener un nombre único y mínimo una canción.');
      return
    };
    const newPlaylist = [...playlists, { nombreValue, songs: selectedSongs }];
    setPlaylists(newPlaylist);
    limpiarModal();
    setRerenderKey(prevKey => prevKey + 1);
    document.getElementById('my_modal_1').close();
  };

  const evaluarModal = () => {
    const playlistExists = playlists.some((playlist) => playlist.nombreValue === nombreValue);
    if (selectedSongs.length === 0||!nombreValue.trim()||playlistExists) {
      return true;
    }else{
      return false;
    }
  }

  const limpiarModal = () =>{
    setSelectedSongs([]);
    setNombreValue('');
    setErrorMessage('');
  }

  const handleSongSelect = (song) => {
    setSelectedSongs((prevSelectedSongs) => {
      const isSelected = prevSelectedSongs.includes(song);
      return isSelected ? prevSelectedSongs.filter((selectedSong) => selectedSong !== song) : [...prevSelectedSongs, song];
    });
  };

  const renderPlays = (plays) => {
    if (plays===undefined || plays.length === 0) {
      return <div className='text-[3.5em]'>No tienes listas...</div>; // Or any other message or component
    }
    return plays.map((pl, index)=>{
      return (
        <DivPlaylist key={index} pl={JSON.stringify(pl)} plays={playlists} setPlays={nuevasPlays => setPlaylists(nuevasPlays)}/>
      )
    })
  }


  return (
    <>
      <div className='flex flex-col h-full w-full font-rubik text-white '>
        <div className='w-full h-[25%] flex items-center pl-20 font-semibold text-[5.3em]'>
          Crea y modifica tus listas
        </div>
        <div className='bg-[#030F3C] bg-opacity-70 h-[75%] rounded-xl rounded-t-none px-[8%] py-[3%] font-medium text-[2em] overflow-auto'>
          <div className='w-full h-[15%]'>
            <button onClick={()=>document.getElementById('my_modal_1').showModal()} className='btn hover:bg-black h-full w-[20%] font-light border-white border-2 text-[1.20em] rounded-full text-white bg-black hover:border-[#2717E4] hover:text-[#2717E4]'>
              <p>Crear Lista</p>
            </button>
          </div>
          <div className='h-[85%] w-full space-y-5 pt-5 overflow-auto'>
            {renderPlays(playlists)}
          </div>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box bg-black border-2 border-white w-11/12 max-w-5xl h-[60vh]">
              <div className='flex flex-col w-full h-full'>
                <div className='w-full h-[10%] flex flex-row justify-around'>
                  <p>Nombre</p>
                  <input className='rounded-full text-black bg-white' placeholder='  introduce el nombre' type="text" name="nombre" id="nombre" value={nombreValue} onChange={(e) => setNombreValue(e.target.value)}/>
                </div>
                <div className='flex flex-col w-full h-[80%]'>
                  <p>Canciones</p>
                  <div className='bg-black flex flex-col h-full border-white border-2 overflow-auto rounded-lg'>
                    {canciones.songs.map((song, index)=>(
                      <DivCancion key={`${index}_${rerenderKey}`} className="w-full h-[20%]" nombre={song.nombre} album={song.album} grupo={song.grupo} duracion={song.duracion} onSelect={handleSongSelect}/>
                    ))}
                  </div>
                </div>
                <div className="modal-action h-[10%]">
                  <p className='text-red-600 font-light text-[0.5em]'>{errorMessage}</p>
                <div className='flex justify-around items-center space-x-5'>
                  <button disabled={!nombreValue.trim()} onClick={handleAcceptButtonClick} className='btn w-fit btn-info text-white bg-[#214984] border-0'>
                    aceptar
                  </button>
                  <form method="dialog" className='h-fit flex items-center'>
                  <button onClick={limpiarModal} className="btn text-white bg-red-800 hover:bg-red-600">Cancelar</button>
                  </form>
                </div>
              </div>
              </div>
              
            </div>
          </dialog>
        </div>
      </div>
    </>
  );
};

export default CrearListas;