import { useState, useEffect } from "react";
import useAxios from "../../../../hooks/useAxios";

import React from "react";

export default function MediaSelection({ register }) {
  const [media, setMedia] = useState([]);
  const http = useAxios();

  useEffect(function () {
    async function getMedia() {
      try {
        const response = await http.get("upload/files/");
        setMedia(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMedia();
  }, []); // eslint-disable-line

  return (
    <>
      <select name="image" placeholder="Select" {...register("image")}>
        <option value="">Select image</option>
        {media.map((media) => {
          return (
            <option key={media.id} value={media.id}>
              {media.name}
            </option>
          );
        })}
      </select>
    </>
  );
}
