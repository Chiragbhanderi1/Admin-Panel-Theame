import "./UnverifiedProperties.css";
import { React, useEffect, useState } from "react";
// import LoginModal from "./Login.js";
// // import ContactDetails from "./Others/ContactDetails";
// import Signup from "./Signup.js";
import CustomCarousel from "../../components/CustomCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { 
  Button,
  Card,
  CardTitle,
  CardBody,
} from "reactstrap";
const UnverifiedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState(properties);
//   const [locationFilter, setLocationFilter] = useState("All");
//   const [budgetFilter, setBudgetFilter] = useState(50000); 
//   const [genderFilter, setGenderFilter] = useState("");
//   const [occupancyFilter, setOccupancyFilter] = useState("");
//   const [furnishedFilter, setFurnishedFilter] = useState("");
//   const [availabilityFilter, setAvailabilityFilter] = useState("");
//   useEffect(() => {
//     // Update the URL when locationFilter changes
//     const url = new URL(window.location.href);
//     url.searchParams.set("location", locationFilter);
//     window.history.pushState({}, "", url);

//     applyFilters();
//     // eslint-disable-next-line
//   }, [locationFilter]);
//   useEffect(() => {
//     // Update the URL when budgetFilter changes
//     const url = new URL(window.location.href);
//     url.searchParams.set("budget", budgetFilter);
//     window.history.pushState({}, "", url);

//     applyFilters();
//     // eslint-disable-next-line
//   }, [budgetFilter]);
//   useEffect(() => {
//     // Update the URL when budgetFilter changes
//     const url = new URL(window.location.href);
//     url.searchParams.set("gender", genderFilter);
//     window.history.pushState({}, "", url);

//     applyFilters();
//     // eslint-disable-next-line
//   }, [genderFilter]);
//   useEffect(() => {
//     // Update the URL when budgetFilter changes
//     const url = new URL(window.location.href);
//     url.searchParams.set("furnished", furnishedFilter);
//     window.history.pushState({}, "", url);

//     applyFilters();
//     // eslint-disable-next-line
//   }, [furnishedFilter]);
//   useEffect(() => {
//     // Update the URL when budgetFilter changes
//     const url = new URL(window.location.href);
//     url.searchParams.set("availability", availabilityFilter);
//     window.history.pushState({}, "", url);

//     applyFilters();
//     // eslint-disable-next-line
//   }, [availabilityFilter]);
//   useEffect(() => {
//     // Update the URL when budgetFilter changes
//     const url = new URL(window.location.href);
//     url.searchParams.set("occupancy", occupancyFilter);
//     window.history.pushState({}, "", url);

//     applyFilters();
//     // eslint-disable-next-line
//   }, [occupancyFilter]);
//   const calculateDaysBetweenDates = (date1, date2) => {
//     const oneDay = 24 * 60 * 60 * 1000;
//     return Math.round(Math.abs((date1 - date2) / oneDay));
//   };
//   const applyFilters = () => {
//     const filtered = properties.filter((property) => {
//       let locationMatches = {};
//       if (locationFilter === "All") {
//         locationMatches = property;
//       } else {
//         locationMatches = property.address.area.includes(locationFilter);
//       }
//       const budgetMatches = property.rent <= budgetFilter;
//       let genderMatches = true;
//       if (genderFilter) {
//         genderMatches = property.memberedAllowed === genderFilter;
//       }
//       let occupancyMatches = true;
//       if (occupancyMatches === "Any") {
//         occupancyMatches = property;
//       } else {
//         occupancyMatches = property.sharing.includes(locationFilter);
//       }
//       let furnishedMatches = true;
//       if (furnishedFilter) {
//         furnishedMatches = property.furnishedType === furnishedFilter;
//       }
//       let availabilityMatches = true;
//       const currentDate = new Date();
//       const propertyAvailability = new Date(property.availability);
//       switch (availabilityFilter) {
//         case "0":
//           availabilityMatches =
//             calculateDaysBetweenDates(currentDate, propertyAvailability) <= 5;
//           break;
//         case "1":
//           const days = calculateDaysBetweenDates(
//             currentDate,
//             propertyAvailability
//           );
//           availabilityMatches = days <= 30;
//           break;
//         case "2":
//           const day = calculateDaysBetweenDates(
//             currentDate,
//             propertyAvailability
//           );
//           availabilityMatches = day > 30 && day <= 60;
//           break;
//         default:
//           availabilityMatches = property;
//       }

//       return (
//         locationMatches &&
//         budgetMatches &&
//         genderMatches &&
//         occupancyMatches &&
//         furnishedMatches &&
//         availabilityMatches
//       );
//     });
//     setFilteredProperties(filtered);
//   };
//   const handleLocationChange = (value) => {
//     setLocationFilter(value);
//     applyFilters();
//   };
//   const handleBudgetChange = (event) => {
//     setBudgetFilter(parseInt(event.target.value));
//     applyFilters();
//   };
//   const handleGenderChange = (value) => {
//     setGenderFilter(value);
//     applyFilters();
//   };
//   const handleOccupancyChange = (value) => {
//     setOccupancyFilter(value);
//     applyFilters();
//   };
//   const handleFurnishedChange = (value) => {
//     setFurnishedFilter(value);
//     applyFilters();
//   };
//   const handleAvailabilityChange = (value) => {
//     setAvailabilityFilter(value);
//     applyFilters();
//   };
  useEffect(() => {
    fetch(`http://15.206.66.176:8080/property/Unverified-properties`)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setFilteredProperties(data);
      })
      .catch((err) => console.log(err));
  }, []);
  
//   const [listView, setListView] = useState(false);
//   const handleToggle = () => {
//     setListView(!listView);
//   };

//   const locations = [
//     { value: "All", label: "All" },
//     { value: "Bodakdev", label: "Bodakdev" },
//     { value: "Shaymal", label: "Shaymal" },
//     { value: "Satellite", label: "Satellite" },
//     { value: "Prahalad Nagar", label: "Prahalad Nagar" },
//     { value: "Paldi", label: "Paldi" },
//     { value: "Ambawadi", label: "Ambawadi" },
//   ];
//   const gender = [
//     { value: "male", label: "Male" },
//     { value: "female", label: "Female" },
//     { value: "both", label: "Both" },
//   ];
//   const Ocupancy = [
//     { value: "single", label: "Single" },
//     { value: "double", label: "Double" },
//     { value: "Any", label: "Any" },
//   ];
//   const Furnished = [
//     { value: "furnished", label: "Furnished" },
//     { value: "unfurnished", label: "Unfurnished" },
//     { value: "semi-furnished", label: "Semi-furnished" },
//   ];
//   const Availability = [
//     { value: "0", label: "Immediately" },
//     { value: "1", label: "Within 1 Month" },
//     { value: "2", label: "1-2 Months" },
//   ];
  const [currentPage, setCurrentPage] = useState(1);
  let totalPages = 1;
  let visibleData = filteredProperties;
  if (filteredProperties.length && filteredProperties.length > 10) {
    totalPages = Math.ceil(filteredProperties.length / 10);
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    visibleData = filteredProperties.slice(startIndex, endIndex);
  }
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

//   const [contactDetails, setContactDetails] = useState(false);
//   const contactModal = () => setContactDetails(!contactDetails);
//   const [loginmodal, setLoginmodal] = useState(false);
//   const [filterBar, setFilterBar] = useState();
//   const filterModal = () => setFilterBar(!filterBar);
//   const [signinmodal, setSigninmodal] = useState(false);
//   const loginModal = () => setLoginmodal(!loginmodal);
//   const signinModal = () => setSigninmodal(!signinmodal);
  return (
    <Card>
          <CardTitle tag="h4" className="text-center border-bottom p-3 mb-0">
          <i className="bi bi-person-fill-lock me-2"></i>
            Unverified Properties
          </CardTitle>
          <CardTitle tag="h6" className=" p-3 mb-0">
          <i className="bi bi-person-fill-lock me-2"></i> 
            Verify Property
          </CardTitle>
          <CardBody>
    <div className="">
      <div className="header">
        {/* Search Bar */}
       
        {/* <div className="toggle-container">
          <p className="toggle-text"> List View</p>
          <label className="toggle-switch">
            <input type="checkbox" checked={listView} onChange={handleToggle} />
            <span className="slider"></span>
          </label>
          <p className="toggle-text">Map View</p>
        </div> */}
      </div>
      {/* <div id="mobileviewHeader">
        <div className="mobilview-search-bar shadow-sm  rounded-pill">
          <div className="mobileview-search-icon">
            <FontAwesomeIcon icon={faLocationDot} />
          </div>
          <input
            type="text"
            id="searchInput"
            placeholder="Search for location"
            value={locationFilter}
            onChange={(e) => {
              handleLocationChange(e.target.value);
            }}
          />
          <button className="mobileview-search-button rounded-pill">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <div className="sortButton rounded" onClick={filterModal}>
          <FontAwesomeIcon icon={faFilter} />
        </div>
      </div> */}
      <div className="row justify-content-center">
        {/* Filter Bar */}
        {/* <div className=" col-md-3" id="filterBar">
          <Form>
            <FormGroup>
              <Label for="location">Location :</Label>
              <Input
                id="location"
                placeholder="search..."
                value={locationFilter}
                onChange={(e) => {
                  handleLocationChange(e.target.value);
                }}
              />
              <div className="location-groups mt-2">
                {locations.map((button) => (
                  <div
                    key={button.value}
                    className={`location-button rounded-pill ${
                      locationFilter === button.value ? "selected" : ""
                    }`}
                    value={locationFilter}
                    onClick={() => {
                      handleLocationChange(button.value);
                    }}
                  >
                    {button.label}
                  </div>
                ))}
              </div>
            </FormGroup>
            <FormGroup className="mt-3">
              <Label for="budget">Budget :</Label>
              <div className="range-bar">
                <input
                  type="range"
                  className="range-input"
                  min="5000"
                  max="25000"
                  value={budgetFilter}
                  step="1000"
                  onChange={handleBudgetChange}
                />
              </div>
              <div className="range-labels">
                <span>5k</span>
                <span>10k</span>
                <span>20k</span>
                <span>25k</span>
                <span>50k</span>
              </div>
            </FormGroup>
            <FormGroup className="mt-3">
              <Label>Gender :</Label>
              <div className="location-groups">
                {gender.map((button) => (
                  <div
                    key={button.value}
                    className={`location-button rounded-pill ${
                      genderFilter === button.value ? "selected" : ""
                    }`}
                    value={genderFilter}
                    onClick={() => {
                      handleGenderChange(button.value);
                    }}
                  >
                    {button.label}
                  </div>
                ))}
              </div>
            </FormGroup>
            <FormGroup className="mt-3">
              <Label>Ocupancy Type :</Label>
              <div className="location-groups">
                {Ocupancy.map((button) => (
                  <div
                    key={button.value}
                    className={`location-button rounded-pill ${
                      occupancyFilter === button.value ? "selected" : ""
                    }`}
                    value={locationFilter}
                    onClick={() => {
                      handleOccupancyChange(button.value);
                    }}
                  >
                    {button.label}
                  </div>
                ))}
              </div>
            </FormGroup>
            <FormGroup className="mt-3">
              <Label>Furnished Type :</Label>
              <div className="location-groups">
                {Furnished.map((button) => (
                  <div
                    key={button.value}
                    className={`location-button rounded-pill ${
                      furnishedFilter === button.value ? "selected" : ""
                    }`}
                    value={furnishedFilter}
                    onClick={() => {
                      handleFurnishedChange(button.value);
                    }}
                  >
                    {button.label}
                  </div>
                ))}
              </div>
            </FormGroup>
            <FormGroup className="mt-3">
              <Label>Availability :</Label>
              <div className="location-groups">
                {Availability.map((button) => (
                  <div
                    key={button.value}
                    className={`location-button rounded-pill ${
                      availabilityFilter === button.value ? "selected" : ""
                    }`}
                    value={availabilityFilter}
                    onClick={() => {
                      handleAvailabilityChange(button.value);
                    }}
                  >
                    {button.label}
                  </div>
                ))}
              </div>
            </FormGroup>
          </Form>
        </div> */}
        {/* Main Contain */}
        <div className="mainContain py-2 col-md-12">
          
            <div className="mb-3 " style={{ maxWidth: "100%" }}>
              {visibleData.map((property, index) => (
                <div
                  className="row shadow-sm no-gutters rounded-2"
                  key={index}
                  id="propertyCard"
                >
                  <div className="col-md-4 p-0">
                    <div id="GenderBox">
                      <span className="">{property.memberedAllowed}</span>
                    </div>
                    <CustomCarousel photoUrls={property.photoUrls} />
                    
                  </div>
                  <div className="col-md-6" id="propertyCard-body">
                    <Link
                      className="text-decoration-none text-dark"
                      to={`/paying-guest-in-ahmedabad/${property.id}`}
                    >
                      <div id="card-Heading">
                        2 bhk fully furnished flat in sagar apartment
                      </div>
                      <div id="card-location" className="row">
                        <div id="" className="col">
                          <FontAwesomeIcon
                            className="me-2 grey"
                            icon={faLocationDot}
                          />{" "}
                          {property.address && property.address.area} Ahemdabad{" "}
                          {property.address && property.address.pincode}
                        </div>
                        <div className="LaptopHide col">
                          Type : {property.furnishedType}
                        </div>
                      </div>
                      <div id="card-Details" className="row">
                        <div id="Details" className="col">
                          <span className="grey">Available For :</span>{" "}
                          {property.memberedAllowed}
                        </div>
                        <div id="Details" className="col">
                          <span className="grey">Property Type :</span>{" "}
                          {property.subtype}
                        </div>
                      </div>
                      <div id="card-Details" className="row">
                        <div id="Details" className="col">
                          <span className="grey">Property Size :</span>{" "}
                          {property.bedroom} BHK
                        </div>
                        <div id="Details" className="col">
                          <span className="grey">Status :</span> Available
                        </div>
                      </div>
                      <div id="emnities" className=" mobileAndTab-hide">
                        {property.amenities.includes("electricity") && (
                          <img
                            className="amenities-size"
                            src="/emenities/electricity.svg"
                            alt="Amenities"
                          />
                        )}
                        {property.amenities.includes("cctv") && (
                          <img
                            className=" amenities-size"
                            src="/emenities/cctv.svg"
                            alt="Amenities"
                          />
                        )}
                        {property.amenities.includes("cooking") && (
                          <img
                            className=" amenities-size"
                            src="/emenities/gas-included.svg"
                            alt="Amenities"
                          />
                        )}
                        {property.amenities.includes("24*7-water") && (
                          <img
                            className=" amenities-size"
                            src="/emenities/water-included.svg"
                            alt="Amenities"
                            style={{ color: "red" }}
                          />
                        )}
                        {property.amenities.includes("house-keeping") && (
                          <img
                            className=" amenities-size"
                            src="/emenities/house cleaning- keeping.webp"
                            alt="Amenities"
                            style={{ color: "red" }}
                          />
                        )}
                        {property.amenities.includes("2-wheeler-parking") && (
                          <img
                            className=" amenities-size"
                            src="/emenities/parking-area.svg"
                            alt="Amenities"
                            style={{ color: "red" }}
                          />
                        )}
                        {property.amenities.includes("fans") && (
                          <img
                            className=" amenities-size"
                            src="/emenities/fans.svg"
                            alt="Amenities"
                            height="30px"
                            width="30px"
                            style={{ color: "red" }}
                          />
                        )}
                      </div>
                      <div id="rentBox" className="row">
                        <div className="col p-0 mobileAndTab-hide">
                          <b
                            style={{
                              fontSize: "23px",
                              color: "rgba(0, 0, 0, 0.6)",
                            }}
                          >
                            ₹ {property.rent}
                          </b>{" "}
                          <span className="grey">/per month</span>
                        </div>
                        <div
                          className="col p-0 mobileAndTab-hide "
                          style={{ color: "rgba(0, 0, 0, 0.7)" }}
                        >
                          {" "}
                          <span className="grey">Deposit </span>:{" "}
                          {property.deposit} Rent{" "}
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col-md-2 rounded-4 " id="card-ButtonBox">
                   
                    <div className="ownerBox">
                      <span>Owner :</span>
                      <br /> {property.name}
                    </div>
                    <div className="LaptopHide">
                      <b
                        style={{
                          marginLeft: "2px",
                          fontSize: "20px",
                          color: "rgba(0, 0, 0, 0.6)",
                        }}
                      >
                        ₹ {property.rent}
                      </b>{" "}
                      <span className="grey" style={{ fontSize: "12px" }}>
                        /per month
                      </span>
                    </div>
                    
                  </div>
                </div>
              ))}
              {filteredProperties.length > 10 && (
                <div className="paginationBox">
                  <Button className="paginationBtn" onClick={goToPreviousPage}>
                    {" "}
                    <FontAwesomeIcon icon={faArrowLeft} /> Previous{" "}
                  </Button>
                  <Button className="paginationBtn" onClick={goToNextPage}>
                    Next <FontAwesomeIcon icon={faArrowRight} />
                  </Button>
                </div>
              )}
            </div>
          
          
          {/* <Signup isOpen={signinmodal} onClose={signinModal} />
          <LoginModal isOpen={loginmodal} onClose={loginModal} /> */}
          {/* Filter bar for mobile view */}
          {/* <div className={`filter-modal ${filterBar ? "open" : ""}`}>
            <div className="modal-content">
              <Form>
                <div className="p-3 d-flex flex-column">
                  <div className="closeBox">
                    <span className="close" onClick={filterModal}>
                      <FontAwesomeIcon icon={faClose} />
                    </span>
                  </div>
                  <div className=" col-md-3" id="filterBarMobileview">
                    <FormGroup>
                      <Label for="location">Location :</Label>
                      <Input
                        id="location"
                        placeholder="search..."
                        value={locationFilter}
                        onChange={(e) => {
                          handleLocationChange(e.target.value);
                        }}
                      />
                      <div className="location-groups mt-2">
                        {locations.map((button) => (
                          <div
                            key={button.value}
                            className={`location-button rounded-pill ${
                              locationFilter === button.value ? "selected" : ""
                            }`}
                            value={locationFilter}
                            onClick={() => {
                              handleLocationChange(button.value);
                            }}
                          >
                            {button.label}
                          </div>
                        ))}
                      </div>
                    </FormGroup>
                    <FormGroup className="mt-3">
                      <Label for="budget">Budget :</Label>
                      <div className="range-bar">
                        <input
                          type="range"
                          className="range-input"
                          min="5000"
                          max="25000"
                          value={budgetFilter}
                          step="1000"
                          onChange={handleBudgetChange}
                        />
                      </div>
                      <div className="range-labels">
                        <span>5k</span>
                        <span>10k</span>
                        <span>20k</span>
                        <span>25k</span>
                        <span>50k</span>
                      </div>
                    </FormGroup>
                    <FormGroup className="mt-3">
                      <Label>Gender :</Label>
                      <div className="location-groups">
                        {gender.map((button) => (
                          <div
                            key={button.value}
                            className={`location-button rounded-pill ${
                              genderFilter === button.value ? "selected" : ""
                            }`}
                            value={genderFilter}
                            onClick={() => {
                              handleGenderChange(button.value);
                            }}
                          >
                            {button.label}
                          </div>
                        ))}
                      </div>
                    </FormGroup>
                    <FormGroup className="mt-3">
                      <Label>Ocupancy Type :</Label>
                      <div className="location-groups">
                        {Ocupancy.map((button) => (
                          <div
                            key={button.value}
                            className={`location-button rounded-pill ${
                              occupancyFilter === button.value ? "selected" : ""
                            }`}
                            value={locationFilter}
                            onClick={() => {
                              handleOccupancyChange(button.value);
                            }}
                          >
                            {button.label}
                          </div>
                        ))}
                      </div>
                    </FormGroup>
                    <FormGroup className="mt-3">
                      <Label>Furnished Type :</Label>
                      <div className="location-groups">
                        {Furnished.map((button) => (
                          <div
                            key={button.value}
                            className={`location-button rounded-pill ${
                              furnishedFilter === button.value ? "selected" : ""
                            }`}
                            value={furnishedFilter}
                            onClick={() => {
                              handleFurnishedChange(button.value);
                            }}
                          >
                            {button.label}
                          </div>
                        ))}
                      </div>
                    </FormGroup>
                    <FormGroup className="mt-3">
                      <Label>Availability :</Label>
                      <div className="location-groups">
                        {Availability.map((button) => (
                          <div
                            key={button.value}
                            className={`location-button rounded-pill ${
                              availabilityFilter === button.value
                                ? "selected"
                                : ""
                            }`}
                            value={availabilityFilter}
                            onClick={() => {
                              handleAvailabilityChange(button.value);
                            }}
                          >
                            {button.label}
                          </div>
                        ))}
                      </div>
                    </FormGroup>
                  </div>
                </div>
              </Form>
            </div>
          </div> */}
        </div>
      </div>
    </div>
    </CardBody>
    </Card>
  );
};

export default UnverifiedProperties;
