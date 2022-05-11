import { React, useState } from "react";
import { MdClose } from "react-icons/md";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../constants/api";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required("Please enter your name.").min(3, "The name must be at least 3 characters!"),
  email: yup.string().required("Please enter your email address.").email("Please enter a valid email address!"),
  message: yup.string().required("Please enter a message.").min(15, "Please provide atleast 15 characters as your message!"),
});

export default function Modal({ closeModal, pageTitle, pageId }) {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const history = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    const url = api + "enquiries/?populate=*";
    data.accommodation = { id: pageId };

    const options = {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      console.log("response", json.data);
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
      history("/hotels");
    }
  }

  return (
    <>
      <div className="modalBackground">
        <form className="modalForm" onSubmit={handleSubmit(onSubmit)}>
          <MdClose className="closeModal" onClick={() => closeModal(false)} />
          <div className="modalForm__title">
            <h1>Send an enquiry about {pageTitle} below:</h1>
          </div>
          <div className="modalForm__item">
            <label htmlFor="name">Name:</label>
            <input {...register("name")} placeholder="Your name here..." />
            {errors.subject && <span className="error">{errors.subject.message}</span>}
          </div>
          <div className="modalForm__item">
            <label htmlFor="email">E-mail:</label>
            <input {...register("email")} placeholder="Your e-mail here..." />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>
          <div className="modalForm__item">
            <label htmlFor="accommodation">Accommodation:</label>
            <input {...register("accommodation")} value={pageTitle} disabled />
            {errors.accommodation && <span className="error">{errors.accommodation.message}</span>}
          </div>
          <div className="modalForm__item">
            <label htmlFor="message">Message:</label>
            <textarea {...register("message")} placeholder="Your message here..." />
            {errors.message && <span className="error">{errors.message.message}</span>}
          </div>
          {serverError && <span className="error">{serverError}</span>}
          <div className="centered">
            <button>{submitting ? "Sending message..." : "Send"}</button>
          </div>
        </form>
      </div>
    </>
  );
}
