import React from "react";
import AccommodationList from "../AccommodationList";
import Heading from "../Heading";

function Accommodations() {
  return (
    <>
      <Heading title="Accommodations" />
      <div className="accommodations">
        <AccommodationList />
      </div>
    </>
  );
}

export default Accommodations;
