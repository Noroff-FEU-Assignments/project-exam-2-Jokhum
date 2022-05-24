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
      <section className="AdminMenu">
        <div className="AdminMenu__Messages">
          <EnquiriesList />
          <MessagesList />
        </div>
        {showForm ? (
          <button className="AdminMenu__Button" onClick={onClick}>
            X
          </button>
        ) : (
          <button className="AdminMenu__Button" onClick={onClick}>
            Add Establishment
          </button>
        )}
        {showForm ? <AddEstablishment /> : null}

        {showUpload ? (
          <button className="AdminMenu__Button" onClick={onPress}>
            X
          </button>
        ) : (
          <button className="AdminMenu__Button" onClick={onPress}>
            Upload Image
          </button>
        )}
        {showUpload ? <UploadImage /> : null}
      </section>
    </>
  );
}
