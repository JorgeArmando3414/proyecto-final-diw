import React,{ useState } from 'react'
import canciones from './../assets/canciones.json';
import DivCancion from './DivCancion';

export default function DivPlaylist({pl, plays, setPlays}) {
    const play = JSON.parse(pl);
    const [visible , setVisible] = useState(false);
    const [rerenderKey, setRerenderKey] = useState(0);
    const [modalPlaylistName, setModalPlaylistName] = useState("");
    const [selectedSongs, setSelectedSongs] = useState([]);

    const handleSongSelect = (song) => {
        setSelectedSongs((prevSelectedSongs) => {
          const isSelected = prevSelectedSongs.includes(song);
          return isSelected ? prevSelectedSongs.filter((selectedSong) => selectedSong !== song) : [...prevSelectedSongs, song];
        });
    };

    const handleModalOpen = () => {
        console.log(play.nombreValue);
        setModalPlaylistName(play.nombreValue);
        document.getElementById(play.nombreValue).showModal();
        setRerenderKey( prev => prev + 1 )
    };

    const handleAceptar = (nplaylist, arrayCanciones) => {
        agregaCancion(nplaylist, arrayCanciones);
        setSelectedSongs([]);
        document.getElementById(play.nombreValue).close();
    };

    const agregaCancion = (nPlay, songNamesToAdd) => {
        const updatedPlaylists = plays.map(playlist => {
            if (playlist.nombreValue === nPlay) {
                const newSongs = songNamesToAdd.filter(song => !playlist.songs.includes(song));
                const updatedSongs = [...playlist.songs, ...newSongs];
                return {
                    ...playlist,
                    songs: updatedSongs
                };
            }
            return playlist;
        });
        setPlays(updatedPlaylists);
    };

    const borraCancion = (nPlay, nSong) => {
        const updatedPlaylists = plays.map(playlist => {
            if (playlist.nombreValue === nPlay) {
              const updatedSongs = playlist.songs.filter(song => song !== nSong);
              if (updatedSongs.length === 0) {
                return null;
              }
              return {
                ...playlist,
                songs: updatedSongs
              };
            }
            return playlist;
        });
        const updatedNonEmptyPlaylists = updatedPlaylists.filter(playlist => playlist !== null);
        setPlays(updatedNonEmptyPlaylists);
    }

    const renderCanciones = (songs) => {
        return songs.map((cancion, index)=>{
            return canciones.songs.map((can, ind)=>{
                if(can.nombre===cancion){
                    return (
                        <div key={index} className="font-light text-[0.7em] w-full odd:bg-gray-900 bg-black grid justify-center justify-items-start grid-rows-1 grid-cols-12 pl-2 items-center border-b-2 border-white">
                            <p className='col-span-3'>{cancion}</p>
                            <p className='col-span-4 pl-5'>{can.album}</p>
                            <p className='col-span-3'>{can.grupo}</p>
                            <p className='col-start-11'>{can.duracion}</p>
                            <button onClick={()=>borraCancion(play.nombreValue,cancion)} className='btn col-start-12 rounded-full w-[50%] h-[50%] p-0 border-0 bg-transparent hover:bg-gray-700'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-10 h-full">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </button>
                        </div>
                    )
                }
            }) 
        })
    }
  return (
    <div className={`h-fit rounded-lg flex flex-col bg-black`}>
                <div className={`h-[100%] flex flex-row justify-between items-center overflow-hidden px-10 text-[1.55em] font-light`}>
                    <p>{play.nombreValue}</p>
                    <div className='h-full grid grid-cols-2 w-[15%] space-x-5 items-center'>
                        <button disabled={play.songs.length===8} onClick={()=>handleModalOpen()} className='btn h-[80%] rounded-full p-0 border-0 bg-transparent hover:bg-gray-700 disabled:hidden'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-full h-full">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                        <label className="swap swap-rotate rotate-90 h-[80%] rounded-full hover:bg-gray-800 col-start-2">
                            <input type="checkbox" onClick={() => setVisible(!visible)}/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="swap-off h-full w-full">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="swap-on h-full w-full">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </label>
                    </div>
                </div>
                <div className={`overflow-hidden ${visible ? "block duration-300 " : "hidden "} h-[50%]`}>
                    {renderCanciones(play.songs)}
                </div>
                <dialog id={`${play.nombreValue}`} className="modal">
                    <div className="modal-box bg-black border-2 border-white w-11/12 max-w-5xl h-[60vh]">
                    <div className='flex flex-col w-full h-full'>
                        <div className='w-full h-[10%] flex flex-row justify-around'>
                            <p>{modalPlaylistName}</p>
                        </div>
                        <div className='flex flex-col w-full h-[80%]'>
                            <p>Añadir Canciones</p>
                            <div className='bg-black flex flex-col h-full border-white border-2 overflow-auto rounded-lg'>
                            {canciones.songs.map((song, index)=>{
                                if(!play.songs.includes(song.nombre)){
                                    return <DivCancion key={`${index}_${rerenderKey}`} className="w-full h-[20%]" nombre={song.nombre} album={song.album} grupo={song.grupo} duracion={song.duracion} onSelect={handleSongSelect}/>
                                }
                            })}
                            </div>
                        </div>
                        <div className="modal-action h-[10%]">
                            <div className='flex justify-around items-center space-x-5'>
                            <button onClick={()=>handleAceptar(play.nombreValue,selectedSongs)} className='btn w-fit btn-info text-white bg-[#214984] border-0'>
                                aceptar
                            </button>
                            <form method="dialog" className='h-fit flex items-center'>
                                <button className="btn text-white bg-red-800 hover:bg-red-600">Cancelar</button>
                            </form>
                        </div>
                    </div>
                    </div>
                    
                    </div>
                </dialog>
    </div>
  )
}
