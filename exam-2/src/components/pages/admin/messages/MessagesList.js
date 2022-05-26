import React, { useEffect, useState } from "react";
import useAxios from "../../../../hooks/useAxios";
import api from "../../../../constants/api";

export default function MessagesList() {
  const [messages, setMessages] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const button = document.getElementById("messageBtn");

  const http = useAxios();

  const onClick = () => setShowMessage(!showMessage);

  const url = api + "messages";

  useEffect(function () {
    async function fetchMessages() {
      try {
        const response = await http.get(url);
        setMessages(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMessages();
  }, []); // eslint-disable-line

  return (
    <>
      {showMessage ? (
        <>
          {messages.length === 0 ? (
            <button style={{ backgroundColor: "#a40d0d" }} onClick={onClick}>
              No new messages!
            </button>
          ) : (
            <button className="AdminMenu__Button" id="messageBtn" onClick={onClick}>
              Close Messages
            </button>
          )}
          <ul className="AdminMenu__Message__List">
            {messages.map((message) => {
              return (
                <li key={message.id} className="AdminMenu__Message__Item">
                  <>
                    <h3 className="AdminMenu__Message__Heading">
                      <span className="Uppercase">"{message.attributes.subject}"</span> from <span className="Uppercase">{message.attributes.name}</span> -{" "}
                      <a href="mailto: {message.attributes.email}">Reply</a>
                    </h3>
                    <p>{message.attributes.message}</p>
                  </>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <button className="AdminMenu__Button" id="messageBtn" onClick={onClick}>
          Show Messages
        </button>
      )}
    </>
  );
}
