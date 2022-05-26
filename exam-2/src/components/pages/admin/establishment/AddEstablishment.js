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
    const form = document.querySelector(".EstablishmentForm");
    setSubmitting(true);
    setServerError(null);

    if (data.image === "") {
      data.image = null;
    }

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
      <form className="EstablishmentForm" onSubmit={handleSubmit(onSubmit)}>
        {serverError && <span className="Error">{serverError}</span>}
        <h2 className="EstablishmentForm__Title">Add establishment:</h2>
        <div className="EstablishmentForm__Item">
          <input name="name" placeholder="Name..." {...register("name")} />
          {errors.name && <span className="Error">{errors.name.message}</span>}
        </div>
        <div className="EstablishmentForm__Item">
          <input name="type" placeholder="Type..." {...register("type")} />
          {errors.type && <span className="Error">{errors.type.message}</span>}
        </div>
        <div className="EstablishmentForm__Item">
          <input name="location" placeholder="Location..." {...register("location")} />
          {errors.location && <span className="Error">{errors.location.message}</span>}
        </div>
        <div className="EstablishmentForm__Item">
          <input name="price" placeholder="Price..." {...register("price")} />
          {errors.price && <span className="Error">{errors.price.message}</span>}
        </div>
        <div className="EstablishmentForm__Item">
          <textarea name="description" placeholder="Description..." {...register("description")} />
          {errors.description && <span className="Error">{errors.description.message}</span>}
        </div>
        <div className="EstablishmentForm__item">
          <MediaSelection register={register} />
          {errors.select && <span className="Error">{errors.select.message}</span>}
        </div>
        <div className="Column">
          <label htmlFor="checkbox">Featured:</label>
          <input type="checkbox" className="LoginForm__checkbox" {...register("featured")}></input>
        </div>
        {success ? <span className="Success">Your establishment has been created!</span> : null}
        <div className="Centered">
          <button>{submitting ? "Adding establishment" : "Add"}</button>
        </div>
      </form>
    </>
  );
}
