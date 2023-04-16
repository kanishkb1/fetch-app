import React from "react";
import Search from "../components/Search";
import Header from "../components/Header";
//This is the page that displays the search bar and the results in the form of cards
const Home = () => {
  return (
    <div>
      <Header />
      <Search />
    </div>
  );
};

export default Home;
