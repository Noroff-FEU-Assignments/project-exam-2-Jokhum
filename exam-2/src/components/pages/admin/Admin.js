import React, { useContext, useState } from "react";
import AddEstablishment from "./establishment/AddEstablishment";
import Heading from "../../Heading";
import AuthContext from "../../context/AuthContext";
import MessagesList from "./messages/MessagesList";
import UploadImage from "./establishment/UploadImage";
import EnquiriesList from "./enquiries/EnquiriesList";

export default function Admin() {
  const [showForm, setShowForm] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [auth] = useContext(AuthContext);
  const username = auth.user.username;

  const onClick = () => setShowForm(!showForm);
  const onPress = () => setShowUpload(!showUpload);

  return (
    <>
      <Heading title={"Welcome, " + username + "!"} />
      <div className="adminMenu">
        <div className="adminMenu__messages">
          <EnquiriesList />
          <MessagesList />
        </div>
        {showForm ? (
          <button className="adminMenu__button" onClick={onClick}>
            X
          </button>
        ) : (
          <button className="adminMenu__button" onClick={onClick}>
            Add Establishment
          </button>
        )}
        {showForm ? <AddEstablishment /> : null}

        {showUpload ? (
          <button className="adminMenu__button" onClick={onPress}>
            X
          </button>
        ) : (
          <button className="adminMenu__button" onClick={onPress}>
            Upload Image
          </button>
        )}
        {showUpload ? <UploadImage /> : null}
      </div>
    </>
  );
}
