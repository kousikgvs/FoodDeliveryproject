import React, { useState, useEffect } from "react";
import Geolocation from "react-geolocation";
import { useDispatch, useSelector } from "react-redux";

function CurrentLocation() {
  const { Lattitude } = useSelector((state) => state.cart);
  const { Longitude } = useSelector((state) => state.cart);
  console.log(Lattitude);
  console.log(Longitude);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const setlattitude = (lattitude) => {};

  const setlongitude = (longitude) => {};

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          dispatch({
            type: "setlattitude",
            payload: position.coords.latitude,
          });
          dispatch({
            type: "setlongitude",
            payload: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {latitude && longitude && (
        <p
          style={{
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          {latitude}, {longitude}
        </p>
      )}
    </div>
  );
}

export default function GetCurrLoc() {
  return (
    <div>
      <CurrentLocation />
    </div>
  );
}
