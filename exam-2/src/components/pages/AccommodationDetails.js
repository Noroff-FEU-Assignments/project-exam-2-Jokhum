import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../constants/api";
import axios from "axios";
import Modal from "../Modal";
import { FaBath, FaBed } from "react-icons/fa";
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
    return <div className="Loader"></div>;
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
      <section className="Details">
        <h1>{accommodation.attributes.name}</h1>
        <ImageCarousel props={carouselImages} />
        <div className="Details__Container">
          <p>{accommodation.attributes.location}</p>
          <div className="Details__Facilites">
            <p className="Details__Facilites__Bedtype">
              <FaBed className="Details__Facilities__Icons" /> &nbsp;{accommodation.attributes.bed} x {accommodation.attributes.bedtype} bed(s)
            </p>
            {accommodation.attributes.bathroom === true ? <FaBath className="Details__Facilities__Icons" /> : <p className="Details__Facilities__Bathroom">No bathroom available.</p>}
          </div>
        </div>
        <p className="Details__Price">from {accommodation.attributes.price} NOK</p>
        <p className="Details__Description">{accommodation.attributes.description}</p>
        <h3 className="Centered">Book this establishment now:</h3>
        <button
          onClick={() => {
            setOpenModal(true);
            titleModal();
            idModal();
          }}
        >
          Enquiry
        </button>
        {openModal && <Modal closeModal={setOpenModal} pageTitle={title} pageId={pageId} />}
      </section>
    </>
  );
}
