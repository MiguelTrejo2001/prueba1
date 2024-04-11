import React, { useEffect } from 'react';
import { useState } from 'react';

const Modal = ({ isOpen, onClose, data }) => {

    const [urlImg, setUrlImg] = useState()

    const loadRandomImage = (data) => {
        fetch(`https://dog.ceo/api/breed/${data}/images/random`)
          .then((response) => response.json())
          .then((data) => {
        setUrlImg(data.message)
        console.log(data.message)
          })
          .catch((error) => {
            console.error("Error fetching random image:", error);
          });
      };

      useEffect(() => {
        
        loadRandomImage(data)

        console.log("data: ", data)
      }, [data])
      
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-lg mx-auto my-6">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="relative p-6"><h1 className="text-lg font-semibold mb-4">Esta es la raza:</h1>
        <img src={urlImg} alt="img" title='img' />
        </div>
              <button
                className="absolute top-0 right-0 px-4 py-2 m-4 text-sm font-semibold text-gray-500 transition duration-300 transform hover:text-gray-700 hover:scale-105"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={`${isOpen ? 'fixed' : 'hidden'} inset-0 w-full h-full bg-black opacity-25`} onClick={onClose}></div>
    </>
  );
};

export default Modal;
