import React, { useState, useEffect } from "react";
import axios from "axios";
import Match from "./Match";
import "../App.css";

//This is the cards component that will display all the dogs an their information in the form of cards
//api end  points used are /dogs/search
const Cards = ({ breed }) => {
  const [dogs, setDogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://frontend-take-home-service.fetch.com/dogs/search`,
          {
            withCredentials: true,
            headers: {
              "fetch-api-key":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s",
            },
            params: {
              breeds: [breed],
              sort: "breed:asc",
              from: (currentPage - 1) * 25,
              size: 25,
            },
          }
        );

        const dogIds = response.data.resultIds;
        const next = response.data.next;
        console.log("next is " + next);
        const dogsResponse = await axios.post(
          `https://frontend-take-home-service.fetch.com/dogs`,
          dogIds,
          {
            withCredentials: true,
            headers: {
              "fetch-api-key":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s",
            },
          }
        );

        const dogsData = dogsResponse.data;
        setDogs(dogsData);
        setTotalPages(Math.ceil(response.data.total / 25));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [breed, currentPage]);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleFavorite = (id) => {
    const dog = dogs.find((dog) => dog.id === id);
    if (favorites.includes(dog)) {
      setFavorites(favorites.filter((f) => f.id !== id));
    } else {
      setFavorites([...favorites, dog]);
    }
  };
  console.log(favorites);
  return (
    <div>
      <div className="cards-container">
        {dogs.map((dog) => (
          <div className="card" key={dog.id}>
            <img src={dog.img} alt={dog.name} />
            <h3>{dog.name}</h3>
            <p>
              <b>Breed:</b> {dog.breed}
            </p>
            <p>
              <b>Age:</b> {dog.age}
            </p>
            <p>
              <b>Zip Code:</b> {dog.zip_code}
            </p>
            <br></br>
            <br></br>
            <div className="favourite-button">
              <button onClick={() => handleFavorite(dog.id)}>
                {favorites.includes(dog)
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {currentPage > 1 && (
          <button className="next-button" onClick={handlePrevPage}>
            Prev
          </button>
        )}
        <p>
          <b> Page: </b>
          {currentPage} of {totalPages}{" "}
        </p>
        {currentPage < totalPages && (
          <button className="next-button" onClick={handleNextPage}>
            Next
          </button>
        )}
      </div>
      <div>
        <Match favorites={favorites} />
      </div>
    </div>
  );
};

export default Cards;