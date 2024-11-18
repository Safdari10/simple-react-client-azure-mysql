import { useEffect, useState } from 'react';
import axios from 'axios';

const API_HOST = import.meta.env.VITE_API_HOST;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 

  const fetchOceaniaCountries = async () => {
    try {
      const response = await axios.get(`${API_HOST}/oceania`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Oceania countries:', error.message);
      throw new Error('Failed to fetch Oceania countries');
    }
  };

  useEffect(() => {
    const displayOceaniaCountries = async () => {
      try {
        const fetchedCountries = await fetchOceaniaCountries();
        if (fetchedCountries && Array.isArray(fetchedCountries) && fetchedCountries.length > 0) {
          setCountries(fetchedCountries);
        } else {
          setError('No countries found for Oceania.');
        }
      } catch (error) {
        console.log('Error displaying Oceania countries:', error);
        setError('Failed to display Oceania countries.');
      } finally {
        setLoading(false); // Stop loading after data is fetched or error occurs
      }
    };

    displayOceaniaCountries();
  }, []);

  return (
    <div>
      <h1>Oceania Countries</h1>
      {loading && <p>Loading...</p>}  {/* Show loading state */}
      {error && <p>{error}</p>}
      <ul>
        {countries.map((country, index) => (
          <li key={index}>
            <strong>{country.Name}</strong> - Life Expectancy: {country.LifeExpectancy}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
