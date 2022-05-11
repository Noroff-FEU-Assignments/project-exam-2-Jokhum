import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../../../constants/api";
import AuthContext from "../../../context/AuthContext";
import MediaSelection from "./MediaSelection";

const schema = yup.object().shape({
  name: yup.string().required("Please enter the name of the establishment"),
  type: yup.string().required("Please enter the type of establishment"),
  location: yup.string().required("Please enter the location of the establishment"),
  price: yup.number().positive().integer().required("Please enter the price of the establishment"),
  description: yup.string().required("Please enter the description of the establishment"),
});

export default function AddEstablishment() {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [auth] = useContext(AuthContext);

  const url = api + "accommodations/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    const form = document.querySelector(".establishmentForm");
    setSubmitting(true);
    setServerError(null);

    const options = {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.jwt}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (json) {
        setSuccess(true);
        form.reset();
      }
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form className="establishmentForm" onSubmit={handleSubmit(onSubmit)}>
        {serverError && <span className="error">{serverError}</span>}
        <h2 className="establishmentForm__title">Add establishment:</h2>
        <div className="loginForm__item">
          <input name="name" placeholder="Name..." {...register("name")} />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>
        <div className="establishmentForm__item">
          <input name="type" placeholder="Type..." {...register("type")} />
          {errors.type && <span className="error">{errors.type.message}</span>}
        </div>
        <div className="establishmentForm__item">
          <input name="location" placeholder="Location..." {...register("location")} />
          {errors.location && <span className="error">{errors.location.message}</span>}
        </div>
        <div className="establishmentForm__item">
          <input name="price" placeholder="Price..." {...register("price")} />
          {errors.price && <span className="error">{errors.price.message}</span>}
        </div>
        <div className="establishmentForm__item">
          <textarea name="description" placeholder="Description..." {...register("description")} />
          {errors.description && <span className="error">{errors.description.message}</span>}
        </div>
        <div className="establishmentForm__item">
          <MediaSelection register={register} />
          {errors.select && <span className="error">{errors.select.message}</span>}
        </div>
        <div className="column">
          <label htmlFor="checkbox">Featured:</label>
          <input type="checkbox" className="loginForm__checkbox" {...register("featured")}></input>
        </div>
        {success ? <span className="success">Your establishment has been created!</span> : null}
        <div className="centered">
          <button>{submitting ? "Adding establishment" : "Add"}</button>
        </div>
      </form>
    </>
  );
}
