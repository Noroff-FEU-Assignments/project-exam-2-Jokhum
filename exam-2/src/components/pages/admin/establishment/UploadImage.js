import React, { useState } from "react";
import api from "../../../../constants/api";
import useAxios from "../../../../hooks/useAxios";

export default function UploadImage() {
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const http = useAxios();
  const submitImage = async () => {
    setSubmitting(true);
    const formData = new FormData();

    formData.append("files", files[0]);
    http
      .post(api + "upload", formData)
      .then((response) => {
        setSubmitting(false);
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="adminMenu__imageUpload">
        <label htmlFor="file">Select your image and submit:</label>
        <input type="file" onChange={(e) => setFiles(e.target.files)}></input>
        {success ? <span className="success">Image has been uploaded!</span> : null}
        <button onClick={submitImage}>{submitting ? "Uploading Image" : "Upload"}</button>
      </div>
    </>
  );
}
