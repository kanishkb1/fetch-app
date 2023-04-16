import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
// Match componet that displays the match 
//api end points used are /dogs/match and /dogs
const Match = ({  favorites }) => {
  const [match, setMatch] = useState('');

  const handleMatch = async () => {
    try {
      const response = await axios.post(
        `https://frontend-take-home-service.fetch.com/dogs/match`,
        favorites.map((dog) => dog.id),
        {
          withCredentials: true,
          headers: {
            'fetch-api-key':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s',
          },
        }
      );

      setMatch(response.data.match);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <p className='match-button'><b>To generate match click</b> <button className='Match-button' onClick={handleMatch}>Generate Match</button></p>
      {match && (
        <div className='card-match'>
          <h3 >Your Match:</h3>
          {favorites
            .filter((dog) => dog.id === match)
            .map((dog) => (
              <div className='Match-match' key={dog.id}>
                <img src={dog.img} alt={dog.name} />
                <h3>{dog.name}</h3>
                <p><b>Breed:</b> {dog.breed}</p>
                <p><b>Age: </b>{dog.age}</p>
                <p><b>Zip Code: </b>{dog.zip_code}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Match;

