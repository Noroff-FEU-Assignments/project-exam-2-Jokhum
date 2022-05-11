import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../constants/api";
import axios from "axios";
import Modal from "../Modal";
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
        <ImageCarousel props={carouselImages} />
        <div className="details__container">
          <p>{accommodation.attributes.location}</p>
          <div className="details__facilites">
            <p className="details__facilites__bedtype">
              <FaBed className="details__facilities__icons" /> &nbsp;{accommodation.attributes.bed} x {accommodation.attributes.bedtype} bed(s)
            </p>
            {accommodation.attributes.bathroom === true ? <FaBath className="details__facilities__icons" /> : <p className="details__facilities__bathroom">No bathroom available.</p>}
          </div>
        </div>

        <p className="details__price">{accommodation.attributes.price} NOK /night</p>
        <p className="details__description">{accommodation.attributes.description}</p>
        <h3 className="centered enquiry">Book this establishment now:</h3>
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
