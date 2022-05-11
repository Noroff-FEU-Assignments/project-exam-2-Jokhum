import React, { useEffect, useState } from "react";
import useAxios from "../../../../hooks/useAxios";
import api from "../../../../constants/api";

export default function EnquiriesList() {
  const [enquiries, setEnquiries] = useState([]);
  const [showEnquiry, setShowEnquiry] = useState(false);

  const http = useAxios();

  const onClick = () => setShowEnquiry(!showEnquiry);

  const url = api + "accommodations/?populate=*";

  useEffect(function () {
    async function fetchEnquiries() {
      try {
        const response = await http.get(url);

        const newData = response.data.data;

        const tempArray = [];
        newData.map((data) => {
          if (data.attributes.enquiries.data[0]) {
            tempArray.push(data);
          } else {
            return null;
          }
          return setEnquiries(tempArray);
        });
      } catch (error) {
        // setError(error.toString());
      } finally {
        // setLoading(false);
      }
    }
    fetchEnquiries();
  }, []); // eslint-disable-line

  return (
    <>
      {showEnquiry ? (
        <>
          <button className="adminMenu__button" onClick={onClick}>
            Close Enquiries
          </button>
          <ul className="adminMenu__message__list">
            {enquiries.map((enquiry) => {
              const name = enquiry.attributes.enquiries.data[0].attributes.name;
              const message = enquiry.attributes.enquiries.data[0].attributes.message;
              return (
                <li key={enquiry.id} className="adminMenu__message__item">
                  <>
                    <h3 className="adminMenu__message__heading">
                      Enquiry about <span className="uppercase">"{enquiry.attributes.name}"</span> from <span className="uppercase">{name}</span> -{" "}
                      <a href="mailto: {message.attributes.email}">Reply</a>
                    </h3>

                    <p>{message}</p>
                  </>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <button className="adminMenu__button" onClick={onClick}>
          Show Enquiries
        </button>
      )}
    </>
  );
}
