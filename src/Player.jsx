import { useState, useEffect, useRef } from 'react';
import canciones from './assets/canciones.json';

function Player({currentPlay}) {
  const [currentSong, setCurrentSong] = useState(0);
  const [sonando, setSonando] = useState(false);
  const [volume, setVolume] = useState(0.05);
  const [minuto, setMinuto] = useState('00:00');
  const audio = useRef();

  useEffect(() => {
    if (currentPlay) {
      setCurrentSong(0);
    }
  }, [currentPlay]);
  
  useEffect(()=>{
    if(currentPlay){
      if (currentPlay.songs[currentSong]) {
        canciones.songs.map((cancion, ind)=>{
          if(cancion.nombre === currentPlay.songs[currentSong]){
            audio.current.src = cancion.path_to_file;
            audio.current.play();
            setSonando(false);
          }
        })
      }
    }
  }, [currentSong, currentPlay])

  useEffect(() => {
    if (audio.current) {
      audio.current.volume = volume;
    }
  }, [volume]);

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const siguiente = () =>{
    if(currentPlay && currentSong < currentPlay.songs.length - 1){
      setCurrentSong(currentSong + 1);
    }else{
      setCurrentSong(0);
    }
  }

  const anterior = () =>{
    if(currentPlay && currentSong > 0){
      setCurrentSong(currentSong -1);
    }else{
      setCurrentSong(currentPlay.songs.length - 1);
    }
  }

  const playPause = () =>{
    if(sonando){
      audio.current.play();
      setSonando(!sonando);
    }else{
      audio.current.pause();
      setSonando(!sonando);
    }
  }

    const mostrarDatos = () => {
      if(currentPlay && currentPlay.songs[currentSong]){
        return canciones.songs.map((song, ind)=>{
          if(currentPlay.songs[currentSong]===song.nombre){
            return (
              <>
                <img src={song.caratula} alt="caratula" title={song.copy} />
                <div className='flex flex-col justify-center ml-5'>
                  <p>{song.nombre} - {song.album}</p>
                  <br />
                  <p>{song.grupo}</p>
                  <br />
                  <p className='font-semibold'>{currentPlay.nombreValue}</p>
                </div>
              </>
            )
          }
        })
      }
    }

    const formatTiempo = (duracion, duracionTotal) =>{
      if(duracion === duracionTotal){
        siguiente();
      }
      const min = Math.floor(duracion / 60);
      const seg = Math.floor(duracion % 60);
      if(seg < 10){
        setMinuto(`${min}:0${seg}`)
      }else{
        setMinuto(`${min}:${seg}`)
      }
      const porciento = (duracion / duracionTotal) * 100;
      const slider = document.querySelector('#progreso');
      if (slider) {
        slider.value = porciento;
      }
    }

    const duracionEnt = (duracion) =>{
      const min = Math.floor(duracion / 60);
      const seg = Math.floor(duracion % 60);
      if(seg < 10){
        return `${min}:0${seg}`
      }else{
        return `${min}:${seg}`
      }
    }

    const cambioTiempo = (event) => {
      const valorActual = event.target.value;
      const nuevoTiempo = (valorActual / 100) * audio.current.duration;
      audio.current.currentTime = nuevoTiempo;
      setSonando(false);
    };

    const mostrarTiempo = () => {
      if(currentPlay){
        return (
          <div className='h-full w-[80%] flex-row flex items-center'>
            <p>{minuto}</p>
            <input id='progreso' type="range" onChange={(event) => cambioTiempo(event)} onMouseUp={()=>audio.current.play()} onMouseDown={()=>audio.current.pause()} className="range range-xs hover:[--range-shdw:#160d82] [--range-shdw:#2717E4] w-[80%] mx-5"/>
            <p>{duracionEnt(audio.current.duration)}</p>
          </div>
        )
      }else{
        return (
          <div className='h-full w-[80%]'>
            <p>0:00 - 0:00</p>
          </div>
        )
      }
    }

    const mostrarSvg = () => {
      console.log(sonando);
      if(sonando){
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
          </svg>
        )
      }else {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
          </svg>
        )
      }
    }

    return (
      <>
        <div className="bg-black w-full h-[15vh]  bottom-0 flex flex-row items-center">
          <div className='h-full w-[35%] flex flex-row text-white'>
            {mostrarDatos()}
          </div>
          <div className='h-full w-[15%] flex flex-row items-center space-x-3'>
            <button onClick={()=>anterior()} className='btn bg-[#417deb] hover:bg-[#3249b3] rounded-full p-0 w-[27%] h-max '>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
              </svg>
            </button>
            <button onClick={()=>playPause()} className='btn rounded-full p-0 bg-[#417deb] hover:bg-[#3249b3] w-[35%] h-max'>
              {mostrarSvg()}
            </button>
            <button onClick={()=>siguiente()} className='btn bg-[#417deb] hover:bg-[#3249b3] rounded-full p-0 w-[27%] h-max'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-full h-full">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
            </svg>
            </button>
          </div>
          <div className='w-[50%] flex flex-row items-center text-white ml-5'>
            {mostrarTiempo()}
            
            <input
              type="range"
              min="0"
              max="0.1"
              step="0.001"
              value={volume}
              onChange={handleVolumeChange}
              className="range range-xs [--range-shdw:white] hover:[--range-shdw:#2717E4] w-[10%]"
            />
          </div>
        </div>
        <audio ref={audio} onTimeUpdate={()=>formatTiempo(audio.current.currentTime, audio.current.duration)} />
      </>
    )
  }
  
  export default Player