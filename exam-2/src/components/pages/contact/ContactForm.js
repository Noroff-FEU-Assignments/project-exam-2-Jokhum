import { React, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../../constants/api";

const schema = yup.object().shape({
  name: yup.string().required("Please enter your name.").min(3, "The name must be at least 3 characters!"),
  email: yup.string().required("Please enter your email address.").email("Please enter a valid email address!"),
  subject: yup.string().required("Please enter a subject.").min(5, "Subject must be atleast 5 characters!"),
  message: yup.string().required("Please enter a message.").min(15, "Please provide atleast 15 characters as your message!"),
});

export default function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const form = document.querySelector(".contactForm");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    const url = api + "messages";
    const options = {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log(data);
    console.log(options);
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      console.log("response", json);
      if (response) {
        setSuccess(true);
      }
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
      form.reset();
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="contactForm">
        <div className="contactForm__item">
          <label htmlFor="name">Full Name:</label>
          <input {...register("name")} placeholder="Your name here..." />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="contactForm__item">
          <label htmlFor="email">E-mail:</label>
          <input {...register("email")} placeholder="Your mail address here..." />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div className="contactForm__item">
          <label htmlFor="subject">Subject:</label>
          <input {...register("subject")} placeholder="Your subject here..." />
          {errors.subject && <span className="error">{errors.subject.message}</span>}
        </div>
        <div className="contactForm__item">
          <label htmlFor="message">Message:</label>
          <textarea {...register("message")} placeholder="Your message here..." />
          {errors.message && <span className="error">{errors.message.message}</span>}
        </div>
        {serverError && <span className="error">{serverError}</span>}
        {success ? <span className="success">Your message has been sent!</span> : null}
        <div className="centered">
          <button className="contactForm__button">{submitting ? "Sending message..." : "Send"}</button>
        </div>
      </form>
    </>
  );
}
