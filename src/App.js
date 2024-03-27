import React, { useState } from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Clouds from './assist-imgs/Clouds.png';
import Clear  from './assist-imgs/Clear.png';
import Rain  from './assist-imgs/Rain.png';
import Snow  from './assist-imgs/Snow.png';
import Drizzle from './assist-imgs/Drizzle.png';
import Mist from './assist-imgs/Mist.png';
import Humidity from './assist-imgs/Humidity.png';
import Wind from './assist-imgs/Wind.png';
import react_icon from './assist-imgs/react-icon.png'


function App() {
  const apiKey = 'f13e0f9a1a2f59577dfbf9f6014bf96d'; // Replace with your OpenWeatherMap API key
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&appid=' + apiKey;

  const [place, setPlace] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [img, setImg] = useState('');
  const imgsArray = [Clouds, Clear, Rain, Snow, Drizzle, Mist, Humidity, Wind];

  const fetchData = () => {
    fetch(apiUrl + '&q=' + place)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed try again');
        }
        return res.json();
      })
      .then((data) => {
        setWeatherData(data);
        const weatherMain = data.weather[0].main.trim('');
        // Check if weatherMain matches any item in the imgsArray
        const matchedImg = imgsArray.find(img => img.includes(weatherMain));
        if (matchedImg) {
          setImg(matchedImg);
        }else if(weatherMain === 'Rain') {
          setImg(Rain);
          
        }
         else {
          // If no match found, set default image or handle accordingly
          // For example, set a default image
          setImg('defaultImage.png');
        }
      })
      .catch((err) => setError(err.message));
      setPlace('');
  };

  return (
    <div className="App">
      
      <Container className="App-header text-center text-white ">
      <h1><img className='react-logo' style={{width:'10%'}} src={react_icon} alt='react-icon'/> <strong>WEATHER APP</strong> </h1>
        <ButtonGroup style={{ border: '2px solid black' }}>
          <TextField
            placeholder="Enter place"
            size="small"
            color='warning'
            id="standard-search"
            type="search"
            value={place}
            onChange={(event) => setPlace(event.target.value)}
            style={{ border: 'none' }}
          />
          <Button onClick={fetchData} style={{ border: 'none' }}>
            <SearchIcon color='warning' />
          </Button>
        </ButtonGroup>

        {weatherData ? (
         <Container>
           <Container className='output md'>
            <img src={img} alt={weatherData.weather[0].description} />
             <h1>{ Math.round(weatherData.main.temp)} &#8451;</h1>
            <h2>{weatherData.name}</h2>
          </Container>
            <div className='output-2'>
                 <div>
                  <img src={Humidity} alt='Humidity'/>
                  <p>Humidity {weatherData.main.humidity}%</p>
                 </div>
                 <div>
                  <img src={Wind} alt='Humidity'/>
                  <p> Wind Speed {weatherData.wind.speed}Km/h</p>
                 </div>
            </div>
          </Container>
        ) : error && <div>Error: {error}</div>
        }
      </Container>
    </div>
  );
}

export default App;

