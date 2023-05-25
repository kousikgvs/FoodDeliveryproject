import React from "react";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
const Itemdiv = ({ place, index }) => {
  const [selectedPlace, setSelectedPlace] = useState(0);

  const [selectedItem, setSelectedItem] = useState("");
  const updateSelectedPlace = (modal, index) => {
    if (modal === "all-reviews") {
      setSelectedPlace(index);
      toggleModal();
    } else if (modal === "add-review") {
      setSelectedPlace(index);
      showAddReviewModal();
    }
  };
  const showAddReviewModal = () => {
    const addReviewModal = document.querySelector("#add-review");
    addReviewModal.classList.add("open");
  };

  const hideAddReviewModal = () => {
    const addReviewModal = document.querySelector("#add-review");
    addReviewModal.classList.remove("open");
  };
  const toggleModal = () => {
    const allReviewsModal = document.querySelector("#all-reviews");
    allReviewsModal.classList.toggle("open");
  };

  const addReview = () => {
    // User Input
    const reviewUser = document.querySelector("#review-user");
    const reviewText = document.querySelector("#review-text");
    const reviewRate = document.querySelector("#review-rate");
    const reviewDate = Math.floor(Date.now() / 1000);
  };

  const [itemcost, setItemcost] = useState(100);
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
  const placeslist = [];
  console.log("places");
  useEffect(() => {
    const getUsers = async () => {
      console.log(place);
    };

    getUsers();
  }, [placeslist]);
  return (
    <div>
      {" "}
      <div className="place" key={index}>
        <img
          src={
            place.photos
              ? place.photos[0].getUrl({ maxWidth: 300, maxHeight: 300 })
              : "https://via.placeholder.com/300"
          }
          alt={place.name}
        />
        <div className="details">
          <h2 className="name">{place.name}</h2>
          <div className="review">
            <ul className={"stars rate-" + Math.round(place.rating)}>
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
            <strong>{Math.round(place.rating)}</strong>
            <span
              className="all-reviews"
              onClick={() => updateSelectedPlace("all-reviews", index)}
            >
              ({place.user_ratings_total})
            </span>
            <span
              className="add-review"
              onClick={() => updateSelectedPlace("add-review", index)}
            >
              Add Review
            </span>
            {/* <span className="add-review" onClick={(e) => openReviewModal(index)}>Add Review</span> */}
          </div>
          <ul className="info">
            <li>
              <i className="fas fa-phone-alt"></i>
              <a href={"tel:" + place.formatted_phone_number}>
                {place.formatted_phone_number}
              </a>
            </li>
            <li>
              <i className="fas fa-map-marker-alt"></i>{" "}
              {place.formatted_address}
            </li>
          </ul>
          {/* <select
            value={selectedItem}
            onChange={handleChange}
            className="selectItem"
          >
            <option value="Meals">Meals</option>
            <option value="Kabab Biryani">Kabab Biryani</option>
            <option value="Gobi fried Rice">Gobi fried Rice</option>
            <option value="Veg Fried Rice">Veg Fried Rice</option>
            <option value="Chicken fried Rice">Chicken fried Rice</option>
          </select> */}
          {/* <p>
        {" "}
        {selectedItem}
        {itemcost}
      </p> */}
          <button className="ordernow" onClick={() => console.log(placeslist)}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Itemdiv;
