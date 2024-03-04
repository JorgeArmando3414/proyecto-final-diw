import React from 'react';
import canciones from './../assets/canciones.json';

function Perfil({playlists, abierto, setCurrentPlay}){

  const caratulas = (pl) =>{
    return canciones.songs.map((cancion, ind)=>{
      if(cancion.nombre===pl.songs[0]){
        return <img key={ind} src={cancion.caratula} className='h-full rounded-lg' />
      }
    })
  }

  const renderPlays = (plays) => {
    if (plays!=undefined || plays.length != 0) {
      return plays.map((pl, index)=>{
        return (
          <div key={index} className='bg-black rounded-xl flex flex-col'>
            <div className='w-full h-[80%] bg-black p-5 flex justify-center rounded-t-xl'>
              {caratulas(pl)}
            </div>
            <div className='w-full h-max flex flex-row pb-0'>
              <p className='w-[70%] pl-2 text-[0.6em] flex items-center'>{pl.nombreValue}</p>
              <button onClick={()=>setCurrentPlay(pl)} className='btn p-0 m-0 w-[20%] h-[full] rounded-lg bg-white hover:bg-white'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-full h-full hover:scale-110 duration-75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
              </button>
            </div>
          </div>
        )
      })
    }
  }

  return (
    <>
      <div className='flex flex-col h-full w-full font-rubik text-white '>
        <div className='w-full h-[40%] flex flex-row items-center pl-20 font-semibold text-[5.3em]'>
          <div className='avatar placeholder h-[60%] min-w-[20%] mr-10'>
            <div className="bg-neutral text-neutral-content rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </div>
          </div>
          Usuario
        </div>
        <div className={`bg-[#030F3C] bg-opacity-70 h-[60%] rounded-xl rounded-t-none px-[8%] py-[3%] font-medium text-[2em] overflow-auto grid gap-[5%] ${!abierto?'grid-cols-3':'grid-cols-4'}`}>
          {playlists.length===0 || playlists[0]===undefined?<p className='text-[1em]'>Crea una lista para empezar</p>:renderPlays(playlists)}
        </div>
      </div>
    </>
  );
};

export default Perfil;