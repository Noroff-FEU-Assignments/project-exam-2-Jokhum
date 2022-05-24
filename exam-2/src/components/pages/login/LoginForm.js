import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import api from "../../../constants/api";
import AuthContext from "../../context/AuthContext";

const url = api + "auth/local/";

const schema = yup.object().shape({
  identifier: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const history = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth, setAuth] = useContext(AuthContext); // eslint-disable-line

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    try {
      const response = await axios.post(url, data);
      setAuth(response.data);
      history("/admin");
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form className="LoginForm" onSubmit={handleSubmit(onSubmit)}>
        {loginError && <span className="error">{loginError}</span>}
        <h2 className="LoginForm__Title">Enter your credentials below:</h2>
        <div className="LoginForm__Item">
          <input name="identifier" placeholder="Username" {...register("identifier")} />
          {errors.username && <span className="Error">{errors.username.message}</span>}
        </div>

        <div className="LoginForm__Item">
          <input name="password" placeholder="Password" {...register("password")} type="password" />
          {errors.password && <span className="Error">{errors.password.message}</span>}
        </div>
        <div className="Centered">
          <button>{submitting ? "Logging in..." : "Login"}</button>
        </div>
      </form>
    </>
  );
}
