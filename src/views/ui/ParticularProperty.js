import {
  faLocationDot,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
// import { TabPanel, useTabs } from "react-headless-tabs";
// import { TabSelector } from "../../components/TabSelector.js"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback } from "react";
import { useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";
import "./ParticularProperty.css";
import { Carousel, CarouselItem, CarouselControl, Button } from "reactstrap";
import { useEffect } from "react";
const ParticularProperty = () => {
  const [property, setProperty] = useState();
  // const [selectedTab, setSelectedTab] = useTabs([
  //   "details",
  //   "amenities",
  //   "pricing",
  // ]);
 
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const next = (length) => {
    if (animating) return;
    const nextIndex = activeIndex === length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = (length) => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const [showInstructions, setShowInstructions] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_IP}/property/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  const [properties,setProperties] = useState();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_IP}/property/all-paying-guest`)
    .then((res) => res.json())
    .then((data) => {
      setProperties(data);
    })
    .catch((err) => console.log(err));
  }, []);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const handlePhotoClick = (photoUrl) => {
    setSelectedPhoto(photoUrl);
  };

  const renderPhotos = () => {
    return property.photoUrls.map((photoUrl, index) => (
      <img
        key={index}
        src={photoUrl}
        alt={` ${index + 1}`}
        width={"200px"}
        height={"200px"}
        className="m-2 p-2"
        onClick={() => handlePhotoClick(photoUrl)}
        style={{
          cursor: "pointer",
          border: photoUrl === selectedPhoto ? "2px solid black" : "none",
          borderRadius:"10px"
        }}
      />
    ));
  };
  const Navigate = useNavigate();
  const approveProperty =async()=>{
    if (selectedPhoto) {
      try {
        const data = {
          id: property.id,
          imageUrl: selectedPhoto,
        };
        const response = await fetch(
          `${process.env.REACT_APP_API_IP}/property/Approve`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (response.ok) {
          Navigate('/unverifiedproperties');
        } else {
          console.error("Failed to submit property:", response.status);
        }
      } catch (error) {
        console.error("Error submitting property:", error);
      }
    }else{
      alert("Please select the photo first")
    }
  }
  if (!property) {
    return <p>Loading...</p>; // You can show a loading message or spinner
  }
  if (!properties) {
    return <p>Loading...</p>; // You can show a loading message or spinner
  }
  
 
  return (
    <div className="">
      <div className="container py-4">
        <div id="property-heading" className="row">
          <h2 id="addressHeading" className=" col-lg-8 col-sm-12">
            {property.title} Satellite {property.address.pincode}
          </h2>
        </div>
        <div id="propertyPhotos" className="row mobileAndTab-hide">
          <div className="col-md-9 col-8 ">
            <img
              src={property.photoUrls[0] || ""}
              onClick={() => openImageViewer(0)}
              alt="photos"
              width={"100%"}
              height={"500px"}
            />
          </div>
          <div className="col-md-3 col-4 " id="SecondaryImageBox">
            <div className="mobileAndTab-hide ">
              <img
                src={property.photoUrls[1] || ""}
                onClick={() => openImageViewer(1)}
                alt="photos"
                width={"100%"}
                height={"100%"}
              />
            </div>
            <span className="my-2"></span>
            <div className="">
            <div
                style={{
                  position: "relative",
                  height: "100%",
                }}
              >
                <img
                  src={property.photoUrls[3]}
                  alt="property "
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity as needed
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white", // Text color
                    fontSize: "24px", // Text font size
                  }}
                  onClick={() => openImageViewer(3)}
                >
                  +3 More
                </div>
              </div>
            </div>
          </div>

          {isViewerOpen && (
            <ImageViewer
              src={property.photoUrls}
              currentIndex={currentImage}
              onClose={closeImageViewer}
              disableScroll={true}
              backgroundStyle={{
                backgroundColor: "rgba(0,0,0,0.9)",
                height: "90%",
                top: "10%",
              }}
              closeOnClickOutside={true}
            />
          )}
        </div>
        <div className="LaptopHide">
          <Carousel
            activeIndex={activeIndex}
            next={() => {
              next(property.photoUrls.length);
            }}
            previous={() => {
              previous(property.photoUrls.length);
            }}
            id="ImageBox"
            interval={false}
          >
            {(property.photoUrls || []).map((item, index) => (
              <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={index} // Use the index as the key
              >
                <img
                  src={item}
                  alt="propertyImage"
                  id="CarouselImage"
                  className="rounded-2"
                />
              </CarouselItem>
            ))}
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={previous}
            />
            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={next}
            />
          </Carousel>
        </div>
        <div id="propertyDetails" className="row">
          <div className="col-md-8">
            <div className="detailsBox mobileAndTab-hide">
              <div className="boxHeader"> Property Details :</div>
              <div className="row innerDetailsBox">
                <div className="col-md">
                  <div className="SingleDetailBox">
                    <div className="labelTextForDetail">Propery Type:</div>
                    <div className="valueTextForDetail">
                      {property.type}, {property.bedroom} Bedrooms,
                      {property.bathroom} Bathrooms
                    </div>
                  </div>
                  <div className="SingleDetailBox">
                    <div className="labelTextForDetail">Furnishing :</div>
                    <div className="valueTextForDetail">
                      {property.furnishedType}
                    </div>
                  </div>
                  <div className="SingleDetailBox">
                    <div className="labelTextForDetail">
                      No of People Currently Living:
                    </div>
                    <div className="valueTextForDetail">
                      {property.currentlyLiving}
                    </div>
                  </div>
                  <div className="SingleDetailBox">
                    <div className="labelTextForDetail">
                      Options Available In :
                    </div>
                    <div className="valueTextForDetail">{property.sharing}</div>
                  </div>
                </div>
                <div className="col-md">
                  <div className="SingleDetailBox">
                    <div className="labelTextForDetail">Available From :</div>
                    <div className="valueTextForDetail">
                      {property.availableFrom}
                    </div>
                  </div>
                  <div className="SingleDetailBox">
                    <div className="labelTextForDetail">Available For :</div>
                    <div className="valueTextForDetail">
                      {property.memberedAllowed}
                    </div>
                  </div>
                  <div className="SingleDetailBox">
                    <div className="labelTextForDetail">
                      No of Vacancy Available:
                    </div>
                    <div className="valueTextForDetail">
                      {property.vacancyAvailable}
                    </div>
                  </div>
                  <div className="SingleDetailBox">
                    <div className="labelTextForDetail">Non-Veg allowed :</div>
                    <div className="valueTextForDetail">
                      {property.nonVegAllowed}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="detailsBox mobileAndTab-hide">
              <div className="boxHeader"> Amenities :</div>
              <div className="innerDetailsBox d-flex flex-wrap">
                {property.amenities.includes("electricity") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/electricity.svg"
                      alt="Amenities"
                    />
                    <span>Electricity</span>
                  </div>
                )}
                {property.amenities.includes("tv") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/tv-license.svg"
                      alt="Amenities"
                    />
                    <span>T.V.</span>
                  </div>
                )}
                {property.amenities.includes("2-wheeler-parking") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/parking-area.png"
                      alt="Amenities"
                    />
                    <span>Parking</span>
                  </div>
                )}
                {property.amenities.includes("free-wifi") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/wifi.svg"
                      alt="Amenities"
                    />
                    <span>Free Wifi</span>
                  </div>
                )}
                {property.amenities.includes("cooking") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/cooking.svg"
                      alt="Amenities"
                    />
                    <span>Cooking</span>
                  </div>
                )}
                {property.amenities.includes("house-keeping") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/housekeeping.webp"
                      alt="Amenities"
                    />
                    <span>House Keeping</span>
                  </div>
                )}
                {property.amenities.includes("laundry") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/laundry.png"
                      alt="Amenities"
                    />
                    <span>Laundry</span>
                  </div>
                )}
                {property.amenities.includes("fridge") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/fridge.svg"
                      alt="Amenities"
                    />
                    <span>Fridge</span>
                  </div>
                )}
                {property.amenities.includes("ro-water") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/ro-water.png"
                      alt="Amenities"
                    />
                    <span>R.O. Water</span>
                  </div>
                )}
                {property.amenities.includes("24*7-water") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/water-included.svg"
                      alt="Amenities"
                    />
                    <span>24*7 Water</span>
                  </div>
                )}
                {property.amenities.includes("air-conditioner") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/air-conditioner.svg"
                      alt="Amenities"
                    />
                    <span>A.C.</span>
                  </div>
                )}
                {property.amenities.includes("breakfast") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/breakfast.png"
                      alt="Amenities"
                    />
                    <span>Breakfast</span>
                  </div>
                )}
                {property.amenities.includes("gyser") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/gyser.png"
                      alt="Amenities"
                    />
                    <span>Gyser</span>
                  </div>
                )}
                {property.amenities.includes("lunch") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/lunch.png"
                      alt="Amenities"
                    />
                    <span>Lunch</span>
                  </div>
                )}
                {property.amenities.includes("security") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/security.svg"
                      alt="Amenities"
                    />
                    <span>Security</span>
                  </div>
                )}
                {property.amenities.includes("microwave") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/microwave.png"
                      alt="Amenities"
                    />
                    <span>Microwave</span>
                  </div>
                )}
                {property.amenities.includes("fans") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/fan.png"
                      alt="Amenities"
                    />
                    <span>Fans</span>
                  </div>
                )}
                {property.amenities.includes("wardrobe") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/wardrobe.png"
                      alt="Amenities"
                    />
                    <span>Wardrobe</span>
                  </div>
                )}
                {property.amenities.includes("cctv") && (
                  <div className="AmenityBox">
                    <img
                      className="amenities-size"
                      src="/emenities/cctv.svg"
                      alt="Amenities"
                    />
                    <span>C.C.T.V.</span>
                  </div>
                )}
              </div>
            </div>
            {/* <div className="flex border-b border-gray-300 LaptopHide">
              <TabSelector
                isActive={selectedTab === "details"}
                onClick={() => setSelectedTab("details")}
              >
                Details
              </TabSelector>
              <TabSelector
                isActive={selectedTab === "amenities"}
                onClick={() => setSelectedTab("amenities")}
              >
                Amenities
              </TabSelector>
              <TabSelector
                isActive={selectedTab === "pricing"}
                onClick={() => setSelectedTab("pricing")}
              >
                Pricing
              </TabSelector>
            </div> */}
            {/* <div className="LaptopHide">
              <TabPanel hidden={selectedTab !== "details"}>
                <div className="detailsBox">
                  <div className="row innerDetailsBox">
                    <div className="col-md">
                      <div className="SingleDetailBox row">
                        <div className="labelTextForDetail col-5">
                          Propery Type
                        </div>
                        <div className="col-1">:</div>
                        <div className="valueTextForDetail col-6">
                          {property.type}, {property.bedroom} Bedrooms,
                          {property.bathroom} Bathrooms
                        </div>
                      </div>
                      <div className="SingleDetailBox row">
                        <div className="labelTextForDetail col-5">
                          Furnishing{" "}
                        </div>
                        <div className="col-1">:</div>
                        <div className="valueTextForDetail col-6">
                          {property.furnishedType}
                        </div>
                      </div>
                      <div className="SingleDetailBox row">
                        <div className="labelTextForDetail col-5">
                          No of People Currently Living
                        </div>
                        <div className="col-1">:</div>
                        <div className="valueTextForDetail col-6">
                          {property.currentlyLiving}
                        </div>
                      </div>
                      <div className="SingleDetailBox row">
                        <div className="labelTextForDetail col-5">
                          Options Available In
                        </div>
                        <div className="col-1">:</div>
                        <div className="valueTextForDetail col-6">
                          {property.sharing}
                        </div>
                      </div>
                    </div>
                    <div className="col-md">
                      <div className="SingleDetailBox row">
                        <div className="labelTextForDetail col-5">
                          Available From
                        </div>
                        <div className="col-1">:</div>
                        <div className="valueTextForDetail col-6">
                          {property.availableFrom}
                        </div>
                      </div>
                      <div className="SingleDetailBox row">
                        <div className="labelTextForDetail col-5">
                          Available For
                        </div>
                        <div className="col-1">:</div>
                        <div className="valueTextForDetail col-6">
                          {property.memberedAllowed}
                        </div>
                      </div>
                      <div className="SingleDetailBox row">
                        <div className="labelTextForDetail col-5">
                          No of Vacancy Available
                        </div>
                        <div className="col-1">:</div>
                        <div className="valueTextForDetail col-6">
                          {property.vacancyAvailable}
                        </div>
                      </div>
                      <div className="SingleDetailBox row">
                        <div className="labelTextForDetail col-5">
                          Non-Veg allowed
                        </div>
                        <div className="col-1">:</div>
                        <div className="valueTextForDetail col-6">
                          {property.nonVegAllowed ? "Yes" : "No"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel hidden={selectedTab !== "amenities"}>
                <div className="detailsBox">
                  <div className="innerDetailsBox d-flex  flex-wrap">
                    <div className="amenitiesBox">
                      {property.amenities.includes("electricity") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/electricity.svg"
                            alt="Amenities"
                          />
                          <span>Electricity</span>
                        </div>
                      )}
                      {property.amenities.includes("tv") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/tv-license.svg"
                            alt="Amenities"
                          />
                          <span>T.V.</span>
                        </div>
                      )}
                      {property.amenities.includes("2-wheeler-parking") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/parking-area.png"
                            alt="Amenities"
                          />
                          <span>Parking</span>
                        </div>
                      )}
                      {property.amenities.includes("free-wifi") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/wifi.svg"
                            alt="Amenities"
                          />
                          <span>Free Wifi</span>
                        </div>
                      )}
                      {property.amenities.includes("cooking") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/cooking.svg"
                            alt="Amenities"
                          />
                          <span>Cooking</span>
                        </div>
                      )}
                      {property.amenities.includes("house-keeping") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/housekeeping.webp"
                            alt="Amenities"
                          />
                          <span>House Keeping</span>
                        </div>
                      )}
                      {property.amenities.includes("laundry") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/laundry.png"
                            alt="Amenities"
                          />
                          <span>Laundry</span>
                        </div>
                      )}
                      {property.amenities.includes("fridge") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/fridge.svg"
                            alt="Amenities"
                          />
                          <span>Fridge</span>
                        </div>
                      )}
                      {property.amenities.includes("ro-water") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/ro-water.png"
                            alt="Amenities"
                          />
                          <span>R.O. Water</span>
                        </div>
                      )}
                      {property.amenities.includes("24*7-water") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/water-included.svg"
                            alt="Amenities"
                          />
                          <span>24*7 Water</span>
                        </div>
                      )}
                      {property.amenities.includes("air-conditioner") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/air-conditioner.svg"
                            alt="Amenities"
                          />
                          <span>A.C.</span>
                        </div>
                      )}
                      {property.amenities.includes("breakfast") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/breakfast.png"
                            alt="Amenities"
                          />
                          <span>Breakfast</span>
                        </div>
                      )}
                      {property.amenities.includes("gyser") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/gyser.png"
                            alt="Amenities"
                          />
                          <span>Gyser</span>
                        </div>
                      )}
                      {property.amenities.includes("lunch") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/lunch.png"
                            alt="Amenities"
                          />
                          <span>Lunch</span>
                        </div>
                      )}
                      {property.amenities.includes("security") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/security.svg"
                            alt="Amenities"
                          />
                          <span>Security</span>
                        </div>
                      )}
                      {property.amenities.includes("microwave") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/microwave.png"
                            alt="Amenities"
                          />
                          <span>Microwave</span>
                        </div>
                      )}
                      {property.amenities.includes("fans") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/fan.png"
                            alt="Amenities"
                          />
                          <span>Fans</span>
                        </div>
                      )}
                      {property.amenities.includes("wardrobe") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/wardrobe.png"
                            alt="Amenities"
                          />
                          <span>Wardrobe</span>
                        </div>
                      )}
                      {property.amenities.includes("cctv") && (
                        <div className="AmenityBox">
                          <img
                            className="amenities-size"
                            src="/emenities/cctv.svg"
                            alt="Amenities"
                          />
                          <span>C.C.T.V.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel hidden={selectedTab !== "pricing"}>
                <div className="detailsBox ">
                  <div className="innerDetailsBox">
                    <div className="bg-white rounded-2 my-1">
                      <div className="row align-items-center">
                        <div className="col-7 pricingLabel ">
                          {" "}
                          Rent (Per Month)
                        </div>
                        <div className="col-1">:</div>
                        <div className="valueTextForDetail  fw-bold  col-4">
                          {" "}
                          {property.rent}
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-2 my-1">
                      <div className="row align-items-center">
                        <div className="col-7 pricingLabel">
                          {" "}
                          Deposit (in months)
                        </div>
                        <div className="col-1">:</div>
                        <div className="valueTextForDetail fw-bold  col-4">
                          {" "}
                          {property.depoist} rent
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-2 my-2">
                      <div className="row align-items-center">
                        <div className="col-7 grey fs-6 pricingLabel">
                          {" "}
                          Additional Cost
                        </div>
                        <div className="col-1">:</div>
                        <div className="valueTextForDetail fs-6 grey col-4">
                          {" "}
                          {property.additionalCosts.cost1 ? "Yes" : "No"}
                        </div>
                      </div>
                      {property.additionalCosts.description1 &&
                        property.additionalCosts.cost1 && (
                          <div className="row align-items-center">
                            <div className="col-7  pricingLabel">
                              {" "}
                              {property.additionalCosts.description1}
                            </div>
                            <div className="col-1">:</div>
                            <div className="valueTextForDetail  col-4">
                              {" "}
                              {property.additionalCosts.cost1}
                            </div>
                          </div>
                        )}
                      {property.additionalCosts.description2 &&
                        property.additionalCosts.cost2 && (
                          <div className="row align-items-center">
                            <div className="col-7  pricingLabel">
                              {" "}
                              {property.additionalCosts.description2}
                            </div>
                            <div className="col-1">:</div>
                            <div className="valueTextForDetail  col-4">
                              {" "}
                              {property.additionalCosts.cost2}
                            </div>
                          </div>
                        )}
                      {property.additionalCosts.description3 &&
                        property.additionalCosts.cost3 && (
                          <div className="row align-items-center">
                            <div className="col-7  pricingLabel">
                              {" "}
                              {property.additionalCosts.description3}
                            </div>
                            <div className="col-1">:</div>
                            <div className="valueTextForDetail  col-4">
                              {" "}
                              {property.additionalCosts.cost3}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </TabPanel>
            </div> */}
           {property.instructions  &&<> <div className="detailsBox mobileAndTab-hide">
              <div className="boxHeader">
                {" "}
                Instructions / rules or regulations:
              </div>
              <div className="innerDetailsBox grey">
                {property.instructions}
              </div>
            </div>
            <div className="detailsBox LaptopHide">
              <span
                className="text-primary"
                role="button"
                onClick={() => {
                  setShowInstructions(!showInstructions);
                }}
              >
                {showInstructions ? (
                  <div className="grey p-3">
                    {" "}
                    Instructions / rules or regulations{" "}
                    <FontAwesomeIcon icon={faAngleDown} />
                  </div>
                ) : (
                  <div className="grey p-3">
                    {" "}
                    Instructions / rules or regulations{" "}
                    <FontAwesomeIcon icon={faAngleDown} />
                  </div>
                )}
              </span>
              {showInstructions && (
                <div className="innerDetailsBox grey">
                  {property.instructions}
                </div>
              )}
            </div></>}
          </div>
          <div className="col-md-4">
            <div className="detailsBox">
              <div className="boxHeader"> Address:</div>
              <div className="innerDetailsBox">
                <div className="">
                  {" "}
                  <FontAwesomeIcon className="grey" icon={faLocationDot} />
                  {property.address.houseno}, {property.address.streetAddress}{" "}
                  {property.address.area} {property.address.pincode}{" "}
                </div>
                <div className="mapBox mt-3">
                  <iframe
                    title="addressMap"
                    src={property.address.link}
                    width="100%"
                    height="200"
                    style={{ border: "0" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="detailsBox mobileAndTab-hide">
              <div className="boxHeader"> Pricing :</div>
              <div className="detailsBox ">
                <div className="innerDetailsBox">
                  <div className="bg-white rounded-2 my-1">
                    <div className="row align-items-center">
                      <div className="col-6 pricingLabel ">
                        {" "}
                        Rent (Per Month)
                      </div>
                      <div className="col-1">:</div>
                      <div className="valueTextForDetail  fw-bold  col-3">
                        {" "}
                        {property.rent || property.totalFlatRent}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2 my-1">
                    <div className="row align-items-center">
                      <div className="col-6 pricingLabel">
                        {" "}
                        Deposit (in months)
                      </div>
                      <div className="col-1">:</div>
                      <div className="valueTextForDetail fw-bold  col-3">
                        {property.depoist} rent
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2 my-2">
                    <div className="row align-items-center">
                      <div className="col-6 grey fs-6 pricingLabel">
                        {" "}
                        Additional Cost
                      </div>
                      <div className="col-1">:</div>
                      <div className="valueTextForDetail fs-6 grey col-3">
                        {" "}
                        {property.additionalCosts.cost1 ? "Yes" : "No"}
                      </div>
                    </div>
                    {property.additionalCosts.description1 &&
                      property.additionalCosts.cost1 && (
                        <div className="row align-items-center">
                          <div className="col-6  pricingLabel">
                            {" "}
                            {property.additionalCosts.description1}
                          </div>
                          <div className="col-1">:</div>
                          <div className="valueTextForDetail  col-3">
                            {" "}
                            {property.additionalCosts.cost1}
                          </div>
                        </div>
                      )}
                    {property.additionalCosts.description2 &&
                      property.additionalCosts.cost2 && (
                        <div className="row align-items-center">
                          <div className="col-6  pricingLabel">
                            {" "}
                            {property.additionalCosts.description2}
                          </div>
                          <div className="col-1">:</div>
                          <div className="valueTextForDetail  col-3">
                            {" "}
                            {property.additionalCosts.cost2}
                          </div>
                        </div>
                      )}
                    {property.additionalCosts.description3 &&
                      property.additionalCosts.cost3 && (
                        <div className="row align-items-center">
                          <div className="col-6  pricingLabel">
                            {" "}
                            {property.additionalCosts.description3}
                          </div>
                          <div className="col-1">:</div>
                          <div className="valueTextForDetail  col-3">
                            {" "}
                            {property.additionalCosts.cost3}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="selectPhotos">
        <h2>Select a Photo:</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>{renderPhotos()}</div>
      <div>
        {selectedPhoto && (
          <p>Selected Photo: <img src={selectedPhoto} width={"150px"} alt="Selected" /></p>
        )}

      </div>
        </div>
        <div className="">
          <Button onClick={approveProperty}>Approve</Button>
          <Button>Reject</Button>
        </div>
      </div>
    </div>
  );
};

export default ParticularProperty;
