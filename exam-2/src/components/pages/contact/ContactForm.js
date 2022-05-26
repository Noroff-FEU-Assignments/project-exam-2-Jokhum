import { React, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../../constants/api";
import { useNavigate } from "react-router-dom";

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
  const history = useNavigate();

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

    try {
      const response = await fetch(url, options);

      if (response) {
        setSuccess(true);
      }
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      const form = document.querySelector("form");
      setSubmitting(false);
      form.reset();
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="ContactForm">
        <div className="ContactForm__Item">
          <label htmlFor="name">Full Name:</label>
          <input {...register("name")} placeholder="Your name here..." />
          {errors.name && <span className="Error">{errors.name.message}</span>}
        </div>

        <div className="ContactForm__Item">
          <label htmlFor="email">E-mail:</label>
          <input {...register("email")} placeholder="Your mail address here..." />
          {errors.email && <span className="Error">{errors.email.message}</span>}
        </div>

        <div className="ContactForm__Item">
          <label htmlFor="subject">Subject:</label>
          <input {...register("subject")} placeholder="Your subject here..." />
          {errors.subject && <span className="Error">{errors.subject.message}</span>}
        </div>
        <div className="ContactForm__Item">
          <label htmlFor="message">Message:</label>
          <textarea {...register("message")} placeholder="Your message here..." />
          {errors.message && <span className="Error">{errors.message.message}</span>}
        </div>
        {serverError && <span className="error">{serverError}</span>}
        {success ? <span className="Success">Your message has been sent!</span> : null}
        <div className="Centered">
          <button>{submitting ? "Sending message..." : "Send"}</button>
        </div>
      </form>
    </>
  );
}
