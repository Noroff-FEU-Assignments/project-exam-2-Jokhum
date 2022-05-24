import React, { useState, useEffect } from "react";
import AccommodationList from "./AccommodationList";
import Heading from "../../Heading";
import api from "../../../constants/api";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Accommodations() {
  const [accommodationData, setAccommodationData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);

  useEffect(() => {
    axios.get(api + "accommodations").then((response) => {
      setAccommodationData(response.data.data);
    });
  }, []);

  useEffect(() => {
    setFilteredAccommodations(accommodationData.filter((accommodation) => accommodation.attributes.name.toLowerCase().startsWith(search.toLowerCase())));
  }, [search, accommodationData]);

  return (
    <>
      <Heading title="Accommodations" />
      <div className="Search">
        <input type="text" placeholder="Search for establishment..." onChange={(e) => setSearch(e.target.value)} />
        <ul className="Search__List">
          {search.length > 0 && filteredAccommodations.length > 0
            ? filteredAccommodations.map((accommodation) => {
                const visibleList = document.querySelector(".Search__List");
                const error = document.querySelector(".Search__Error");
                error.classList.remove("FadeIn");
                visibleList.style.display = "block";
                return (
                  <li key={accommodation.id}>
                    <Link to={`detail/${accommodation.id}`}>{accommodation.attributes.name}</Link>
                  </li>
                );
              })
            : accommodationData.map((accommodation) => {
                if (search.length > 0 && filteredAccommodations.length === 0) {
                  const error = document.querySelector(".Search__Error");
                  error.classList.add("FadeIn");
                  return null;
                } else {
                  const visibleList = document.querySelector(".Search__List");
                  visibleList.style.display = "none";
                  return null;
                }
              })}
          <div className="Search__Error">No accommodations matches your search!</div>
        </ul>
      </div>
      <section className="Accommodations">
        <AccommodationList />
      </section>
    </>
  );
}
