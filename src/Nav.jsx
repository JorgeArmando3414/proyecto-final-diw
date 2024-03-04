import svgs from './assets/svgs.json'
const perfil = svgs.perfil;
const crear = svgs.crear;
const artistas = svgs.artistas;
const contacto = svgs.contacto;
const about = svgs.about;

function Nav({abierto,setAbierto,content,setContent}) {
    return (
      <>
        <div className={` ${abierto?"w-[5vw]":"w-[30vw]"} duration-500 rounded-2xl bg-[#080914] h-[80vh] ml-3 mt-3 `}>
            <div className="h-[20%] w-full flex justify-end pt-5">
                <label className="swap swap-flip h-[50%] right-0 rounded-full hover:bg-gray-800">
                    <input type="checkbox" onClick={()=>setAbierto(!abierto)} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="swap-off h-full w-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="swap-on h-full w-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </label>
            </div>
            <div className="grid h-[80%] w-full font-rubik text-nowrap">
                <button onClick={() => setContent("Perfil")} className={` ${!abierto?" hover:pl-[10%] ":""} text-left bg-inherit h-[50%] btn justify-normal pl-[5%] rounded-sm border-0 font-[400] text-[3.3em] text-white  hover:text-[#2717E4] hover:bg-black`}>
                    {abierto?<div className='w-full max-w-[5vw] flex justify-center' dangerouslySetInnerHTML={{ __html: perfil }}/>:"perfil"}
                </button>
                <button onClick={() => setContent("CrearListas")} className={` ${!abierto?" hover:pl-[10%] ":""} text-left bg-inherit h-[50%] btn justify-normal pl-[5%] rounded-sm border-0 font-[400] text-[3.3em] text-white  hover:text-[#2717E4] hover:bg-black`}>
                    {abierto?<div className='w-full max-w-[5vw] flex justify-center' dangerouslySetInnerHTML={{ __html: crear }}/>:"crear lista"}
                </button>
                <button onClick={() => setContent("Artistas")} className={` ${!abierto?" hover:pl-[10%] ":""} text-left bg-inherit h-[50%] btn justify-normal pl-[5%] rounded-sm border-0 font-[400] text-[3.3em] text-white  hover:text-[#2717E4] hover:bg-black`}>
                    {abierto?<div className='w-full max-w-[5vw] flex justify-center' dangerouslySetInnerHTML={{ __html: artistas }}/>:"artistas"}
                </button>
                <button onClick={() => setContent("About")} className={` ${!abierto?" hover:pl-[10%] ":""} text-left bg-inherit h-[50%] btn justify-normal pl-[5%] overflow-hidden rounded-sm border-0 font-[400] text-[3.3em] text-white  hover:text-[#2717E4] hover:bg-black`}>
                    {abierto?<div className='w-full max-w-[5vw] flex justify-center' dangerouslySetInnerHTML={{ __html: about }}/>:"quienes somos"}
                </button>
                <button onClick={() => setContent("Contacto")} className={` ${!abierto?" hover:pl-[10%] ":""} text-left bg-inherit h-[50%] btn justify-normal pl-[5%] rounded-sm border-0 font-[400] text-[3.3em] text-white  hover:text-[#2717E4] hover:bg-black`}>
                    {abierto?<div className='w-full max-w-[5vw] flex justify-center' dangerouslySetInnerHTML={{ __html: contacto }}/>:"contacto"}
                </button>
            </div>
        </div>
      </>
    )
  }
  
  export default Nav