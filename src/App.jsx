import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { data } from "autoprefixer";

export default function App() {
  const [breeds, setBreeds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => response.json())
      .then((data) => {
        const breedList = Object.keys(data.message);
        setBreeds(breedList);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);



  const filteredBreeds = breeds.filter((breed) =>
    breed.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState();

  const openModal = () => {
    setIsModalOpen(true);
  };



  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
 <>
    <div className="container mx-auto mt-8">
      <h1 className="rounded-l-3xl bg-gradient-to-r text-blue-700 font-bold"> BUSCA TU RAZA PREFERIDA:</h1>
      <input
        type="text"
        placeholder="Buscar por letra..."
        className="block w-full mb-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="w-full border-collapse border border-gray-400 rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gradient-to-r from-blue-400 to-blue-600 text-white">
          <tr>
            <th className="w-1/2 py-3 px-6 border border-gray-400">RAZA DE PERRO</th>
            <th className="w-1/2 py-3 px-6 border border-gray-400">IMÁGENES</th>
          </tr>
        </thead>
        <tbody>
          {filteredBreeds.map((breed, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="py-3 px-6 border border-gray-400">{breed}</td>
              <td className="py-3 px-6 border border-gray-400 text-center">
                {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                onClick={openModales}>
                  Ver
                </button> */}

<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
  onClick={() => {
    openModal();
    setData(breed);
  }}>
Ver
</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    
 
      <Modal isOpen={isModalOpen} onClose={closeModal} data={data}>
        
      </Modal>
    </>
  );
}
