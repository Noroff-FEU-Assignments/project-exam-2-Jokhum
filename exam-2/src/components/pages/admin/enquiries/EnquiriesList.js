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
        console.log(error);
      }
    }
    fetchEnquiries();
  }, []); // eslint-disable-line

  return (
    <>
      {showEnquiry ? (
        <>
          {enquiries.length >= 1 ? (
            <button className="AdminMenu__Button" onClick={onClick}>
              Close Enquiries
            </button>
          ) : (
            <button className="AdminMenu__Button" style={{ backgroundColor: "#a40d0d" }} onClick={onClick}>
              No new enquiries!
            </button>
          )}
          <ul className="AdminMenu__Message__List">
            {enquiries.map((enquiry) => {
              const name = enquiry.attributes.enquiries.data[0].attributes.name;
              const message = enquiry.attributes.enquiries.data[0].attributes.message;
              return (
                <li key={enquiry.id} className="AdminMenu__Message__Item">
                  <>
                    <h3 className="AdminMenu__Message__Heading">
                      Enquiry about <span className="Uppercase">"{enquiry.attributes.name}"</span> from <span className="Uppercase">{name}</span> -{" "}
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
        <button className="AdminMenu__Button" onClick={onClick}>
          Show Enquiries
        </button>
      )}
    </>
  );
}
