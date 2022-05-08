/*global google*/
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
  InfoWindow,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import "./Maps.css";
import { Button, CardActionArea, CardActions,IconButton } from "@mui/material";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Tooltip from '@mui/material/Tooltip';


export const MapContainer = () => {
  const [currentPosition, setCurrentPosition] = useState({});
  const [ref, setRef] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [bounds, setBounds] = useState(null);
  const [infoWindowID, setInfoWindowID] = useState("");
  const [services, setServices] = useState();
  const [map, setMap] = useState();
  // useEffect(() => {
  //   geoLocation();
  // }, []);

  const success = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  };

  const mapStyles = {
    height: "100vh",
    width: "100%",
    padding: "400px 500px",
    margin: "40px 40px",
  };
  const geoLocation = () => {
    navigator.geolocation.getCurrentPosition(success);
  };

  const onLoad = (ref) => {
    setRef(ref);
  };
  const onMapLoad = (map) => {
    setMap(map);
    setServices(new google.maps.places.PlacesService(map));
    // navigator?.geolocation.getCurrentPosition(
    //   ({ coords: { latitude: lat, longitude: lng } }) => {
    //     const pos = { lat, lng };
    //     setCurrentPosition(pos);
    //   }
    // );

    map.addListener("bounds_changed", () => {
      setBounds(map.getBounds());
    });
  };

  const onPlacesChanged = () => {
    setInfoWindowID("");
    let searched = [];

    let results = ref.getPlaces();

    results.filter((outlet, index) => {
      if (
        outlet.name.includes("Ideas by Gul Ahmed") ||
        outlet.name.includes("J. Junaid Jamshed") ||
        outlet.name.includes("Gul Ahmed Warehouse") ||
        outlet.name.includes("Junaid Jamshed")
      ) {
        searched.push(outlet);
      }
    });
    setPlaces(searched);
    if (searched.length > 0) {
      if (searched.length > 1) {
        let details = [];
        for (let i = 0; i < searched.length; i++) {
          services.getDetails(
            { placeId: searched[i].place_id },
            (result, status) => {
              if (status != google.maps.places.PlacesServiceStatus.OK) {
                alert(status);
                return;
              }

              details.push(result);
            }
          );
        }
        setPlaces(details);
      }
    } else {
      alert("Please search Only Gul Ahmed & J.Junaid Jamshed");
    }
  };

  return (
    <div className="main_container">
      <div className="inner_container">
        {Object.keys(currentPosition).length === 0 ? (
          <div >
            {/* <Button variant="contained"  onClick={() => {
                geoLocation();
              }} size="large"  startIcon={< TravelExploreIcon/>}>
             
              Locate Near By Stores
            </Button>
            */}
          
            <Tooltip title="Search Near By Stores">
            <IconButton onClick={() => {
                geoLocation();
                    }} style={{height:"250px",width:"250px", backgroundColor:"#154360"}} >
                <TravelExploreIcon style={{height:"200px",width:"200px",color:"white"}}/>
            

                  </IconButton>
          
             </Tooltip>
          </div>
        ) : (
          <div>
            <LoadScript
              libraries={["places"]}
              googleMapsApiKey="AIzaSyCeFBsVXkUOZMS-q9UHRe294UaztxZMxI8"
              id="https://maps.googleapis.com/maps/api/js?location=33.6462725,73.0310777&radius=100&key=AIzaSyCeFBsVXkUOZMS-q9UHRe294UaztxZMxI8&libraries=places"
            >
              <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={places.length > 0 ? 12 : 15}
                onLoad={(map) => onMapLoad(map)}
                center={currentPosition}
              >
                <StandaloneSearchBox
                  onLoad={onLoad}
                  onPlacesChanged={onPlacesChanged}
                  bounds={bounds}
                >
                  <input
                    type="text"
                    placeholder="Customized your placeholder"
                    style={{
                      boxSizing: `border-box`,
                      border: `1px solid transparent`,
                      width: `50%`,
                      height: `40px`,
                      padding: `0 12px`,
                      borderRadius: `3px`,
                      boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                      fontSize: `14px`,
                      outline: `none`,
                      textOverflow: `ellipses`,
                      position: "absolute",
                      left: "30%",
                      top: "10px",
                    }}
                  />
                </StandaloneSearchBox>

                {currentPosition.lat ? (
                  <>
                    <Marker
                      position={currentPosition}
                      title="Your're Here"
                      onClick={() => {
                        setInfoWindowID("current");
                      }}
                    >
                      {infoWindowID === "current" && (
                        <InfoWindow onCloseClick={() => setInfoWindowID("")}>
                          <div>
                            <h6>Your current Location</h6>
                          </div>
                        </InfoWindow>
                      )}
                    </Marker>

                    {places.map((mark, index) => (
                      <Marker
                        key={mark.place_id}
                        title={mark.formatted_address}
                        position={mark.geometry.location}
                        onClick={() => {
                          setInfoWindowID(index);
                        }}
                      >
                        {infoWindowID === index && (
                          <InfoWindow onCloseClick={() => setInfoWindowID("")}>
                            <div>
                              {mark.name}

                              <div>{mark.formatted_address}</div>

                              {mark?.url && (
                                <div>
                                  <a href={mark?.url} target="_blank">
                                    {mark?.url}
                                  </a>
                                </div>
                              )}
                            </div>
                          </InfoWindow>
                        )}
                      </Marker>
                    ))}
                  </>
                ) : null}
              </GoogleMap>
            </LoadScript>
          </div>
        )}
      </div>
    </div>
  );
};
