import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './ModalContent';
export default function ListCard({ country }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <li
        onClick={() => setShowModal(!showModal)}
        className='relative cursor-pointer rounded transition-transform duration-300 hover:-translate-y-1 will-change-transform'
      >
        <h2 className='absolute left-0 top-0 p-2 backdrop-blur-sm bg-white/40 font-semibold w-fit text-gray-700 text-xl rounded'>
          {country.name.common}
        </h2>
        <img
          className='w-full h-full object-cover rounded'
          src={country.flags.svg}
          alt=''
        />
      </li>
      {showModal &&
        createPortal(
          <ModalContent
            country={country}
            closeModal={() => setShowModal(!showModal)}
          />,
          document.body
        )}
    </>
  );
}
