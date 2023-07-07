import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useState } from "react";
function Card() {
  const [data, setData] = useState({});
  const [name, setName] = useState("");

  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        console.log("locat,", location);

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=${apiKey}`;
        axios.get(url).then((res) => setData(res.data));
      });
    }
  };

  const apiKey = "c39d60d9d777ad7a1bc7279536084643";

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=${apiKey}
      `;
      axios
        .get(apiUrl)
        .then((res) => {
          const { lon, lat } = res.data[0];
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
          axios.get(url).then((res) => setData(res.data));
        })
        .catch((err) => console.log(err));
    }
  };

  console.log(data);
  return (
    <div>
      <TextField
        id="standard-basic"
        label="Search City"
        variant="standard"
        onChange={(e) => setName(e.target.value)}
        InputProps={{
          endAdornment: (
            <SearchIcon
              color="secondary"
              aria-label="add an search"
              onClick={handleClick}
            />
          ),
        }}
      />
      <SearchIcon
        color="secondary"
        aria-label="add an search"
        onClick={handleClick}
      />
    </div>
  );
}
export default Card;
