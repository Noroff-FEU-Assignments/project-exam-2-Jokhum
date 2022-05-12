import { useState, useEffect } from "react";
import api from "../../../constants/api";
import { Link } from "react-router-dom";
import placeholderImage from "../../../images/Placeholder.png";

export default function AccommodationList() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch(api + "accommodations/?populate=*");

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
      {accommodations.map((accommodation) => (
        <article className="accommodationCard" key={accommodation.id}>
          <Link to={`detail/${accommodation.id}`}>
            <div className="accommodationCard__item">
              <div className="accommodationCard__item__image">
                {accommodation.attributes.image.data === null ? (
                  <img src={placeholderImage} alt="Placeholder"></img>
                ) : (
                  <img src={accommodation.attributes.image.data[0].attributes.url} alt={accommodation.attributes.image.data[0].attributes.alternativeText}></img>
                )}
              </div>
              <div className="accommodationCard__item__text">
                <h2>
                  {accommodation.attributes.name} {accommodation.attributes.type}
                </h2>
                <p>{accommodation.attributes.location}</p>
                <p className="accommodationCard__item__price">
                  <span className="blue">from {accommodation.attributes.price} NOK</span>
                </p>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </>
  );
}
