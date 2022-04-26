import { useState, useEffect } from "react";
import api from "../constants/api";

function AccommodationList() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch(api);

        if (response.ok) {
          const json = await response.json();

          setAccommodations(json.data);
        } else {
          setError("An error has occured!");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  if (loading) {
    return <div className="loader"></div>;
  }
  if (error) {
    return <div>Error: An error has occured.</div>;
  }

  return (
    <>
      {accommodations.map(function (accommodation) {
        return (
          <div className="accommodationCard" key={accommodation.id}>
            <div className="accommodationCard__item">
              <div className="accommodationCard__item__image">
                <img src={accommodation.attributes.image.data[0].attributes.url} alt={accommodation.attributes.image.data[0].attributes.alternativeText}></img>
              </div>
              <div className="accommodationCard__item__text">
                <h2>{accommodation.attributes.name}</h2>
                <p>{accommodation.attributes.location}</p>
                <p className="accommodationCard__item__price">Price p/night: {accommodation.attributes.price} NOK</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default AccommodationList;
