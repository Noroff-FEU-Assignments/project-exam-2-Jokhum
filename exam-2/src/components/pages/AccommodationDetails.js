import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../constants/api";
import axios from "axios";
import Modal from "../Modal";
import placeholderImage from "../../images/Placeholder.png";
import { FaBath } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import ImageCarousel from "../ImageCarousel";

export default function AccommodationDetails() {
  const [accommodation, setAccommodation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [pageId, setPageId] = useState("");

  let history = useNavigate();

  const { id } = useParams();

  if (!id) {
    history.push("/");
  }

  const url = api + "accommodations/" + id + "/?populate=*";

  useEffect(
    function () {
      async function fetchAccommodation() {
        try {
          const response = await axios.get(url);
          setAccommodation(response.data.data);
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      fetchAccommodation();
    },
    [url]
  );

  if (loading) {
    return <div className="loader"></div>;
  }
  if (error) {
    return <div>Error: An error has occured.</div>;
  }

  const titleModal = () => {
    setTitle(accommodation.attributes.name);
  };

  const idModal = () => {
    setPageId(accommodation.id);
  };

  const carouselImages = accommodation.attributes.image_gallery.data;

  return (
    <>
      <section className="details">
        <h1>{accommodation.attributes.name}</h1>
        <div className="details__container">
          {accommodation.attributes.image.data === null ? (
            <img className="details__image" src={placeholderImage} alt="Placeholder"></img>
          ) : (
            <img className="details__image" src={accommodation.attributes.image.data[0].attributes.url} alt={accommodation.attributes.image.data[0].attributes.alternativeText}></img>
          )}
          <div className="details__subtext">
            <p>{accommodation.attributes.location}</p>
            <div className="details__facilites">
              <p className="details__facilites__bedtype">
                <FaBed className="details__facilities__icons" /> &nbsp;{accommodation.attributes.bed} x {accommodation.attributes.bedtype} bed(s)
              </p>
              {accommodation.attributes.bathroom === true ? <FaBath className="details__facilities__icons" /> : <p className="details__facilities__bathroom">No bathroom available.</p>}
            </div>
          </div>
          <p className="details__subtext__price">{accommodation.attributes.price} NOK /night</p>
        </div>
        <p className="details__description">{accommodation.attributes.description}</p>
        <ImageCarousel props={carouselImages} />
        <h3 className="centered enquiry">Send us an enquiry on this establishment now:</h3>
        <div className="centered">
          <button
            onClick={() => {
              setOpenModal(true);
              titleModal();
              idModal();
            }}
          >
            Enquiry
          </button>
        </div>
        {openModal && <Modal closeModal={setOpenModal} pageTitle={title} pageId={pageId} />}
      </section>
    </>
  );
}
