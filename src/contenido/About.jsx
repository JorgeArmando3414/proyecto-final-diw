import React from 'react';

function About(){
  return (
    <>
      <div className='flex flex-col h-full overflow-hidden w-full font-rubik text-white '>
        <div className='w-full h-[25%] flex items-center pl-20 font-semibold text-[5.3em]'>
          Nuestra identidad
        </div>
        <div className='bg-[#030F3C] bg-opacity-70 max-h-[75%] rounded-xl m-20 mt-0 p-10 font-medium text-balance text-[2em]'>
          <p>
            Somos una plataforma líder en streaming de música, comprometida con ofrecer a nuestros usuarios una experiencia auditiva excepcional.
          </p>
          <p>
            Nuestra amplia biblioteca musical abarca una diversidad de géneros y artistas de renombre internacional, proporcionando un acceso sin igual a la música en cualquier momento y lugar.
          </p>
          <p>
            Con un enfoque en la calidad y la accesibilidad, nos esforzamos por conectar a los amantes de la música con sus canciones favoritas y descubrimientos emocionantes. Nuestro compromiso con la innovación y la excelencia nos impulsa a seguir siendo la opción preferida de millones de usuarios en todo el mundo.
          </p>
          <p>
            Únete a nosotros y descubre el poder de la música en nuestras manos.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;