function Login ({setLogin}){



    return (
        <>
            <div className="flex flex-row h-full w-full p-40">
                <div className="w-[30%] h-full bg-[#080914] flex flex-col rounded-lg mr-20 p-10 text-[white] font-rubik">
                    <p className="font-semibold mt-20">Usuario</p>
                    <input type="text" placeholder="nombre de usuario" className="input input-bordered input-info w-full bg-[white] text-[black]" />
                    <p className="font-semibold mt-40">Contraseña</p>
                    <input type="text" placeholder="nombre de usuario" className="input input-bordered input-info w-full bg-[white] text-[black]" />
                    <button className="btn btn-info mt-40" onClick={()=>setLogin(true)}>Aceptar</button>
                </div>
                <p className="text-[white] font-rubik text-[4em] font-bold">
                    Inicia sesión para empezar!
                </p>
            </div>
        </>
    )
}

export default Login