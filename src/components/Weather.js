import React, { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Card from "@mui/material/Card";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import CardMedia from "@mui/material/CardMedia";

import { CardActionArea } from "@mui/material";

function Weather() {
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

  const apiKey = process.env.REACT_APP_API_KEY;

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
    <div className="weather GeeksForGeeks">
      <br />
      <h1>Weather App</h1>

      <div>
        <TextField
          id="standard-basic"
          label="Search City"
          variant="standard"
          onChange={(e) => setName(e.target.value)}
        />
        <SearchIcon
          color="black"
          aria-label="add an search"
          onClick={handleClick}
          className="input-icons"
        />
        <LocationOnIcon
          aria-label="add an location"
          onClick={getGeoLocation}
          className="input-icons"
        />
      </div>
      <br />
      <div className="center">
        <Card
          sx={{
            maxWidth: 345,
            backgroundColor: "lightslategrey",
            maxHeight: 363,
          }}
          className="good"
        >
          <CardActionArea>
            <br />
            {Object.keys(data).length !== 0 && (
              <>
                <CardMedia
                  component="img"
                  height="230"
                  image={`http://openweathermap.org/img/w/${data?.weather[0]?.icon}.png`}
                  alt="green iguana"
                />
                <p>{data?.weather[0]?.main}</p>
                <h1>{data?.main?.temp}°C</h1>
                <h2>{data?.name}</h2>
              </>
            )}
          </CardActionArea>
        </Card>
      </div>
      <div></div>
    </div>
  );
}

export default Weather;
