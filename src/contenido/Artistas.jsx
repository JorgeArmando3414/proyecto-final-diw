import React, { useState} from 'react';
import CartaArtista from './CartaArtista';
import Artists from './../assets/artistas.json';

function Artistas(){

  const [art , setArt] = useState("");

  let nombres=[];

  const aaa = (items) =>{
    for (const key in items) {
      nombres.push(items[key])
    }
  }


  return (
    <>
      <div className='flex flex-col  h-full w-full font-rubik text-white'>
        <div className='w-full h-[25%] flex items-center pl-20 font-semibold text-[5.3em]'>
          Artistas
        </div>
        <div className='bg-[#030F3C] bg-opacity-70 h-[75%] rounded-xl rounded-t-none px-[8%] py-[3%] overflow-auto space-y-5'>
          {aaa(Artists)}
          {nombres.map(element => {
            return <CartaArtista art={art} setArt={setArt} datos={JSON.stringify(element)}/>;
          })}
        </div>
      </div>
    </>
  );
};

export default Artistas;