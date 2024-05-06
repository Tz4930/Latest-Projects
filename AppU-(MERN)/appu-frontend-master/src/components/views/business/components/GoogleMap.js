// import React, { useState } from "react";
// import style1 from './style.module.css'
// import {
//   // Map,
//   // Marker,
//   GoogleApiWrapper,
// } from "google-maps-react";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";
// import { Form } from "react-bootstrap";
// import Geocode from "react-geocode";
// Geocode.setApiKey("AIzaSyBMEmqFsiguwAJ8kkXYvqN16jNofxcyvu8");
// Geocode.enableDebug();

// const MapGoogle = (props) => {
//   const { onChangeInput, stateLocation, handleDeliveryAreas, locationKey } = props;
//   const [state, setState] = useState({
//     address: "",
//     city: "",
//     showingInfoWindow: false,
//     activeMarker: {},
//     selectedPlace: {},
//     mapCenter: {
//       lat: 59.955413,
//       lng: -80.1207375,
//     },
//   });
//   const handleChange = (address) => {
//     setState((prevState) => ({
//       ...prevState,
//       address: address,
//     }));
//     if(locationKey) {
//     onChangeInput({ address: address, city: "" }, "location");
//     }
//   };

//   function parseAddress(address) {
//     var addrObj = {};
//     var arr = address.replace(",", " ").split(" ");
//     addrObj.country = arr.pop();
//     addrObj.city = arr.join(" ");
//     addrObj.state = arr.pop();
//   }

//   const handleSelect = (address) => {
//     parseAddress(address);
//     setState((prevState) => ({
//       ...prevState,
//       address: address,
//     }));
//     if(!locationKey) {
//     handleDeliveryAreas(address, "deliveryAreas")
//     }
//     geocodeByAddress(address)
//       .then((results) => getLatLng(results[0]))
//       .then((latLng) => {
//         // update center state
        
//         Geocode.fromLatLng(latLng.lat, latLng.lng).then(
//           (response) => {
//             // const address = response.results[0].formatted_address;
//             let city, state, country;
//             for (let i = 0; i < response.results[0].address_components.length; i++) {
//               for (
//                 let j = 0;
//                 j < response.results[0].address_components[i].types.length;
//                 j++
//               ) {
//                 switch (response.results[0].address_components[i].types[j]) {
//                   case "locality":
//                     city = response.results[0].address_components[i].long_name;
//                     break;
//                   case "administrative_area_level_1":
//                     state = response.results[0].address_components[i].long_name;
//                     break;
//                   case "country":
//                     country = response.results[0].address_components[i].long_name;
//                     break;
//                     default:
//                     break;
//                 }
//               }
//             }
//             if(locationKey) {
//               onChangeInput({ address: address, city: city }, "location");
//             }
//             setState((prevState) => ({
//               ...prevState,
//               country: country,
//               state: state,
//               address: "",
//             }));
//           },
//           (error) => {
//             console.error(error);
//           }
//         );
//       })
//       .catch((error) => console.error("Error", error));
//   };

//   return (
//     <>
//       <div id="googleMaps">
//         <PlacesAutocomplete
//           value={stateLocation ? stateLocation : state.address}
//           onChange={handleChange}
//           onSelect={handleSelect}
//           key="auto"
//         >
//           {({
//             getInputProps,
//             suggestions,
//             getSuggestionItemProps,
//             loading,
//           }) => (
//             <div>
//               <Form.Control
//                 id={props.id}
//                 type="text"
//                 {...getInputProps()}
//               />
//               <div key="div-key" className={style1.locationDropDown}>
//                 {/* {loading && <div>Loading...</div>} */}
//                 {suggestions.map((suggestion, index) => {
//                   const className = suggestion.active
//                     ? "suggestion-item--active"
//                     : "suggestion-item";
//                   // inline style for demonstration purpose
//                   const style = suggestion.active
//                     ? { backgroundColor: '#DCDCDC', cursor: "pointer" }
//                     : { backgroundColor: "#ffffff", cursor: "pointer" };
//                   return (
//                     <div
//                       key={index}
//                       {...getSuggestionItemProps(suggestion, {
//                         className,
//                         style,
//                       })}
//                     >
//                       <span className={style1.locationText}>{suggestion.description}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </PlacesAutocomplete>
//       </div>
//     </>
//   );
// };

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyBMEmqFsiguwAJ8kkXYvqN16jNofxcyvu8",
// })(MapGoogle);
