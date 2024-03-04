import React, { useState , useEffect} from "react";

function CartaArtista({datos, art, setArt}){
    const [visible , setVisible] = useState(false);
    const elementos = JSON.parse(datos);
    const nombre = elementos["nombre"];
    const desc = elementos["descripcion"];
    const cambiaVista = () =>{
        setVisible(!visible);
        setArt(nombre);
    }
    useEffect(() => {
        setVisible(art === nombre);
      }, [art]);
    return (
        <>
            <div className={`${art===nombre && visible? " h-[52%] duration-300 ":" h-[12%]  "}  rounded-lg flex flex-col bg-black`}>
                <div className={`${art===nombre && visible? " h-[20%] ":" h-[100%] "} flex flex-row justify-between items-center px-10 text-[2.55em] font-light`}>
                    <p>{nombre}</p>
                    <label className="swap swap-rotate rotate-90 h-[100%] w-[4%] rounded-full hover:bg-gray-800">
                        <input type="checkbox" onClick={()=>cambiaVista()} checked={art === nombre && visible}/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="swap-off h-full w-full">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="swap-on h-full w-full">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </label>
                </div>
                <div className={`${art===nombre && visible? "block":"hidden"} h-[80%] bg-black flex flex-row rounded-b-lg overflow-hidden`}>
                    <div className="min-w-[23%] h-full bg-black flex justify-center items-center">
                        <img className=" rounded-lg  max-h-[90%]" src={elementos.imagen} title={elementos.copy} alt="artista" />
                    </div>        
                    <p className="text-left flex items-center px-10 text-[1.20em] font-normal">{desc}</p>
                </div>
            </div>
        </>
    );
};

export default CartaArtista;