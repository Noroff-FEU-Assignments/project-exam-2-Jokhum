import React from "react";
import Heading from "../Heading";
import Search from "../Search";
import FeaturedList from "../FeaturedList";

function Home() {
  return (
    <>
      <Heading title="Welcome to Holidaze!" />
      <Search />
      <h2>Featured Accommodations</h2>
      <div className="featured">
        <FeaturedList />
      </div>
    </>
  );
}

export default Home;
