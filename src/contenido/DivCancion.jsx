import React , {useState} from 'react'

const DivCancion = ({nombre, grupo, album, duracion, onSelect}) => {

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        onSelect(nombre);
    };

    return (
        <div className='bg-black odd:bg-gray-900 border-b-2 border-white font-light text-[0.75em] min-h-[20%] flex flex-row'>
            <div className='w-[90%] h-full flex flex-row overflow-hidden justify-stretch items-center'>
                <div className='w-[35%] '>
                    <p className='w-fit  font-semibold'>{nombre}</p>
                </div>
                <div className='w-[66%] flex flex-row'>
                    <div className='overflow-hidden w-[50%]'>
                        <p className='w-fit infinite-scroll-right-to-left text-nowrap whitespace-nowrap'>{album}</p>
                    </div>
                    <div className='overflow-hidden w-[50%]'>
                        <p className='w-fit font-semibold infinite-scroll-right-to-left text-nowrap whitespace-nowrap'>{grupo}</p>
                    </div>
                </div>
                <div>
                    <p className='w-fit '>{duracion}</p>
                </div>
            </div>
            <div className='w-[10%] flex justify-center items-center'>
                <input checked={isChecked} onChange={handleCheckboxChange} className='rounded-full bg-gray-600 border-0 checkbox [--chkbg:#2717E4]' type="checkbox"/>
            </div>
        </div>
    )
}

export default DivCancion