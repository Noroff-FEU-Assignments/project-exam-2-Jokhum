import { useContext } from "react";
import axios from "axios";
import AuthContext from "../components/context/AuthContext";
import api from "../constants/api";

export default function useAxios() {
  const [auth] = useContext(AuthContext);

  const apiClient = axios.create({
    baseURL: api,
  });

  apiClient.interceptors.request.use(function (config) {
    const token = auth.jwt;
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return apiClient;
}
