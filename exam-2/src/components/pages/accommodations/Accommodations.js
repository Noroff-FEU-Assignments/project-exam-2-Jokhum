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
      <div className="search">
        <input type="text" placeholder="Search for establishment..." onChange={(e) => setSearch(e.target.value)} />
        <ul className="search__list">
          {search.length > 0 && filteredAccommodations.length > 0
            ? filteredAccommodations.map((accommodation) => {
                const visibleList = document.querySelector(".search__list");
                const error = document.querySelector(".search__error");
                error.classList.remove("fade-in");
                visibleList.style.display = "block";
                return (
                  <li key={accommodation.id}>
                    <Link to={`detail/${accommodation.id}`}>{accommodation.attributes.name}</Link>
                  </li>
                );
              })
            : accommodationData.map((accommodation) => {
                if (search.length > 0 && filteredAccommodations.length === 0) {
                  const error = document.querySelector(".search__error");
                  error.classList.add("fade-in");
                  return null;
                } else {
                  const visibleList = document.querySelector(".search__list");
                  visibleList.style.display = "none";
                  return null;
                }
              })}
          <div className="search__error">No accommodations matches your search!</div>
        </ul>
      </div>
      <section className="accommodations">
        <AccommodationList />
      </section>
    </>
  );
}
