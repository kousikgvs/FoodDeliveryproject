import React, { useState } from "react";
import "./sidebar.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Itemdiv from "../Itemdiv";
const Sidebar = (props) => {
  const [selectedPlace, setSelectedPlace] = useState(0);

  // Show All Reviews
  const updateSelectedPlace = (modal, index) => {
    if (modal === "all-reviews") {
      setSelectedPlace(index);
      toggleModal();
    } else if (modal === "add-review") {
      setSelectedPlace(index);
      showAddReviewModal();
    }
  };

  const toggleModal = () => {
    const allReviewsModal = document.querySelector("#all-reviews");
    allReviewsModal.classList.toggle("open");
  };

  // Add Review
  const showAddReviewModal = () => {
    const addReviewModal = document.querySelector("#add-review");
    addReviewModal.classList.add("open");
  };

  const hideAddReviewModal = () => {
    const addReviewModal = document.querySelector("#add-review");
    addReviewModal.classList.remove("open");
  };

  const addReview = () => {
    // User Input
    const reviewUser = document.querySelector("#review-user");
    const reviewText = document.querySelector("#review-text");
    const reviewRate = document.querySelector("#review-rate");
    const reviewDate = Math.floor(Date.now() / 1000);

    // Add Review
    const review = {
      author_name: reviewUser.value,
      author_url: "",
      profile_photo_url: "https://via.placeholder.com/50",
      rating: reviewRate.value,
      text: reviewText.value,
      time: reviewDate,
    };
    props.placesDetails[selectedPlace].reviews.push(review);
    props.placesDetails[selectedPlace].user_ratings_total += 1;

    // Hide Modal
    hideAddReviewModal();

    // Reset Fields
    resetInputFields([reviewUser, reviewText, reviewRate]);
  };

  // Add Place
  const showAddPlaceModal = () => {
    const addPlaceModal = document.querySelector("#add-place");
    addPlaceModal.classList.add("open");
  };

  const hideAddPlaceModal = () => {
    const addPlaceModal = document.querySelector("#add-place");
    addPlaceModal.classList.remove("open");
  };

  const addPlace = () => {
    // User Input
    const placeName = document.querySelector("#place-name");
    const placeAddress = document.querySelector("#place-address");
    const placePhone = document.querySelector("#place-phone");
    const placeLat = document.querySelector("#place-latitude");
    const placeLng = document.querySelector("#place-longitude");
    const placeRate = document.querySelector("#place-rate");

    // Add Place
    const place = {
      name: placeName.value,
      formatted_address: placeAddress.value,
      formatted_phone_number: placePhone.value,
      rating: placeRate.value,
      user_ratings_total: 0,
      reviews: [],
      lat: Number(placeLat.value),
      lng: Number(placeLng.value),
    };

    props.addPlace(place);

    // Hide Modal
    hideAddPlaceModal();

    // Reset Fields
    resetInputFields([
      placeName,
      placeAddress,
      placePhone,
      placeRate,
      placeLat,
      placeLng,
    ]);
  };

  // Reset Input Fields
  const resetInputFields = (inputs) => {
    inputs.map((input) => {
      input.value = "";
    });
  };

  // Convert UNIX Timestamp
  const convertTime = (time) => {
    return new Date(time * 1000).toISOString().slice(0, 19).replace("T", " ");
  };

  const [selectedItem, setSelectedItem] = useState("");

  const handleChange = (event) => {
    setSelectedItem(event.target.value);
    if (event.target.value === "Kabab Biryani") {
      setItemcost(130);
    } else if (event.target.value === "Gobi fried Rice") {
      setItemcost(110);
    } else if (event.target.value === "Veg Fried Rice") {
      setItemcost(100);
    } else if (event.target.value === "Kabab Biryani") {
      setItemcost(130);
    }
  };
  const [hotel, sethotel] = useState("");
  const [id, setid] = useState("");
  const [img, setimg] = useState("");

  const dispatch = useDispatch();

  const addToCartHandler = (options) => {
    dispatch({ type: "addToCart", payload: options });
    dispatch({ type: "calculatePrice" });
    toast.success("Added To Cart");
  };

  const [itemcost, setItemcost] = useState(0);
  return (
    <>
      <div className="sidebar">
        <div className="options">
          {/* <button className="cta" onClick={showAddPlaceModal}>Add New Place</button> */}
        </div>
        <div className="places">
          {props.placesDetails.map((place, index) => (
            <Itemdiv place={place} index={index} />
          ))}
        </div>

        <div className="modal reviews" id="all-reviews">
          <div className="inner">
            <div className="close" onClick={toggleModal}>
              X
            </div>
            <div className="review-list">
              {props.placesDetails[0] ? (
                props.placesDetails[selectedPlace].reviews.map(
                  (review, index) => (
                    <div className="review" key={index}>
                      <div className="author">
                        <img
                          src={review.profile_photo_url}
                          alt={review.author_name}
                          title={review.author_name}
                          className="author-thumbnail"
                        />
                        <ul className="author-info">
                          <li>
                            {review.author_url ? (
                              <a href={review.author_url} target="_blank">
                                {review.author_name}
                              </a>
                            ) : (
                              <span>{review.author_name}</span>
                            )}
                          </li>
                          <li>
                            <ul
                              className={
                                "stars rate-" + Math.round(review.rating)
                              }
                            >
                              <li>
                                <i className="fas fa-star"></i>
                              </li>
                              <li>
                                <i className="fas fa-star"></i>
                              </li>
                              <li>
                                <i className="fas fa-star"></i>
                              </li>
                              <li>
                                <i className="fas fa-star"></i>
                              </li>
                              <li>
                                <i className="fas fa-star"></i>
                              </li>
                            </ul>
                            <time>{convertTime(review.time)}</time>
                          </li>
                        </ul>
                      </div>
                      <p className="text">{review.text}</p>
                    </div>
                  )
                )
              ) : (
                <div>Nothing!</div>
              )}
            </div>
          </div>
        </div>

        <div className="modal add-review" id="add-review">
          <div className="inner">
            <div className="close" onClick={hideAddReviewModal}>
              X
            </div>
            <form action="" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="review-user">Full Name</label>
                <input
                  type="text"
                  id="review-user"
                  placeholder="Ex. John Doe"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="review-rate">Rating</label>
                <select id="review-rate" required>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="review-text">Review</label>
                <textarea
                  id="review-text"
                  cols="30"
                  rows="10"
                  placeholder="Write your review..."
                  required
                ></textarea>
              </div>
              <button onClick={addReview}>Add Review</button>
            </form>
          </div>
        </div>
      </div>

      <div className="modal add-place" id="add-place">
        <div className="inner">
          <div className="close" onClick={hideAddPlaceModal}>
            X
          </div>
          <form action="" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="place-name">Place Name</label>
              <input
                type="text"
                id="place-name"
                placeholder="Ex. The Osmanly Restaurant"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="place-address">Address</label>
              <input
                type="text"
                id="place-address"
                placeholder="Ex. Kempinski Nile Hotel, Corniche El Nil, 12 Ahmed Raghab Street"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="place-latitude">Latitude</label>
              <input
                type="text"
                id="place-latitude"
                placeholder="Ex. 48.850073"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="place-longitude">Longitude</label>
              <input
                type="text"
                id="place-longitude"
                placeholder="Ex. 2.299631"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="place-phone">Phone</label>
              <input
                type="text"
                id="place-phone"
                placeholder="Ex. 02 27980000"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="place-rate">Rating</label>
              <select id="place-rate" required>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <button onClick={addPlace}>Add Place</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
