import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import google from "google";
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
    };
  }

  componentDidMount() {
    const { lat, lng } = this.props;

    // Initialize the map
    const map = new google.maps.Map(this.map, {
      center: { lat, lng },
      zoom: 15,
    });

    // Initialize the PlacesService
    const service = new google.maps.places.PlacesService(map);

    // Search for nearby restaurants
    service.nearbySearch(
      {
        location: { lat, lng },
        radius: 500,
        type: "restaurant",
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // Store the results in the state
          this.setState({ restaurants: results });
        }
      }
    );
  }

  render() {
    const { lat, lng } = this.props;
    const { restaurants } = this.state;

    return (
      <div
        style={{ height: "400px", width: "100%" }}
        ref={(el) => (this.map = el)}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: "YOUR_API_KEY" }}
          defaultCenter={{ lat, lng }}
          defaultZoom={15}
        >
          {restaurants.map((restaurant) => (
            <Marker
              key={restaurant.id}
              lat={restaurant.geometry.location.lat()}
              lng={restaurant.geometry.location.lng()}
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

const Marker = () => <div style={{ color: "red", fontSize: "30px" }}>🍔</div>;

export default Map;
