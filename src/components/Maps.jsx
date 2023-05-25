import React, { useEffect, useState } from "react";

import "../styles/Maps.scss";

import Sidebar from "./sidebar/sidebar";
import Map from "./map/map";
import { useSelector } from "react-redux";
import Geolocation from "react-geolocation";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";

const API_KEY = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
const mapStyle = [
  // Map style code here
];

let map;
let infowindow;
let service;

const Maps = () => {
  const [placesDetails, setPlacesDetails] = useState([]);
  const [sortedPlacesDetails, setSortedPlacesDetails] = useState([]);
  const [lat, setLat] = useState(8.89023);
  const [lng, setLng] = useState(76.57836);
  const [zoom, setZoom] = useState(17);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [error, setError] = useState(null);

  const { Lattitude } = useSelector((state) => state.cart);
  const { Longitude } = useSelector((state) => state.cart);

  console.log("LOcation :");
  console.log(Lattitude);
  console.log(Longitude);
  
  const [selectedItem, setSelectedItem] = useState("");

  const handleChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const dispatch = useDispatch();

  const addToCartHandler = (options) => {
    dispatch({ type: "addToCart", payload: options });
    dispatch({ type: "calculatePrice" });
    toast.success("Added To Cart");
  };
  useEffect(() => {
    renderMap();
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  }, [latitude, longitude]);

  const renderMap = () => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initMap`
    );
    window.initMap = initMap;
  };

  const initMap = () => {
    const location = {
      lat: Lattitude,
      lng: Longitude,
    };

    map = new window.google.maps.Map(document.getElementById("map"), {
      center: location,
      zoom: 15,
      styles: mapStyle,
    });

    const marker = new window.google.maps.Marker({
      position: location,
      map: map,
      title: "You're Here!",
    });

    const request = {
      location: location,
      radius: 500,
      type: ["restaurant"],
    };

    infowindow = new window.google.maps.InfoWindow();
    service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  };

  const callback = (results, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      const placesInfo = [];
      const fields = [
        "name",
        "formatted_address",
        "formatted_phone_number",
        "rating",
        "user_ratings_total",
        "reviews",
        "photo",
        "place_id",
        "geometry",
      ];

      results.forEach((place) => {
        service.getDetails(
          { placeId: place.place_id, fields },
          (placeInfo, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              placesInfo.push(placeInfo);

              setPlacesDetails(placesInfo);
              setSortedPlacesDetails(placesInfo);
              addMarkers(placesInfo);
            }
          }
        );
      });
    }
  };

  const addMarkers = (placesInfo) => {
    placesInfo.forEach(createMarker);
  };

  const createMarker = (place) => {
    const marker = new window.google.maps.Marker({
      map: map,
      title: place.name,
      icon: {
        url: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
        anchor: new window.google.maps.Point(10, 10),
        scaledSize: new window.google.maps.Size(20, 20),
      },
      position: place.geometry.location,
    });

    marker.addListener("click", function () {
      const request = {
        reference: place.reference,
      };

      const placePicture = place.photos
        ? place.photos[0].getUrl({ maxWidth: 300, maxHeight: 300 })
        : "https://via.placeholder.com/300";

      const content = `
        <h2>${place.name}</h2>
        <img src=${placePicture}>
        <ul>
          <li>${place.formatted_address}</li>
          <li>${place.formatted_phone_number}</li>
          <li>Rating: ${place.rating}</li>
          <li>Total Reviews: ${place.user_ratings_total}</li>
        </ul>
      `;

      infowindow.setContent(content);
      infowindow.open(map, marker);
    });
  };

  const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
    infowindow.setPosition(pos);
    infowindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infowindow.open(map);
  };

  const loadScript = (url) => {
    const index = window.document.getElementsByTagName("script")[0];
    const script = window.document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script, index);
  };

  return (
    <div className="maps-container">
      <Map />
      <Sidebar
        placesDetails={sortedPlacesDetails}
        setSortedPlacesDetails={setSortedPlacesDetails}
      />
    </div>
  );
};

export default Maps;
