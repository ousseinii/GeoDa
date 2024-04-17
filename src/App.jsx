import { useState, useEffect } from 'react';
import ListCard from './components/ListCard';

function App() {
  const [countries, setCountries] = useState();
  const [filteredCountries, setFilteredCountries] = useState();
  const [continent, setContinent] = useState('africa');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/region/${continent}`)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        data.sort((a, b) => {
          if (a.name.common < b.name.common) {
            return -1;
          } else if (a.name.common > b.name.common) {
            return 1;
          } else {
            return 0;
          }
        });
        setCountries(data);
        setFilteredCountries(data);
      });
  }, [continent]); // Exécuter useEffect à chaque fois que le continent change

  useEffect(() => {
    if (countries) {
      const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  }, [searchTerm, countries]);

  const handleContinentChange = (newContinent) => {
    setContinent(newContinent);
  };

  const continents = ['africa', 'america', 'asia', 'europe', 'oceania'];

  return (
    <div className='min-h-screen'>
      <div className='max-w-7xl mx-auto py-20 px-4 text-center'>
        <h1 className='text-gray-50 text-7xl mb-4 font-bold uppercase'>
          {continent.charAt(0).toUpperCase() + continent.slice(1)} Countries
        </h1>
        <p className='text-gray-100 text-xl mb-8'>
          Click on a card to reveal a country's information.
        </p>
        <div className='mb-4 flex justify-center flex-wrap'>
          {continents.map((cont, index) => (
            <button
              key={index}
              onClick={() => handleContinentChange(cont)}
              className={`mr-4 mb-4 py-2 px-4 rounded capitalize text-white text-xl ${
                continent === cont
                  ? 'bg-blue-500'
                  : 'bg-gray-500 hover:bg-gray-600'
              }`}
            >
              {cont}
            </button>
          ))}
        </div>
        <div className='mb-10 flex items-center justify-center'>
          <input
            type='text'
            placeholder='Search country'
            className='px-4 py-2 rounded-l-lg border border-gray-500 w-[460px] h-16 focus:outline-none focus:ring focus:border-blue-300'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className='bg-blue-500 text-white px-4 py-2 h-16 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'
            onClick={() => setSearchTerm('')}
          >
            Clear
          </button>
        </div>
        {filteredCountries && (
          <ul className='grid min-[450px] grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 auto-rows-[200px]'>
            {filteredCountries.map((country, index) => (
              <ListCard key={index} country={country} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
