import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { divStyle, textStyle } from './constants';
const WeatherApp = () => {
  
    const[cityName,setCityName]=useState();
    const[cityIcon,setCityIcon]=useState();
    const[weatherType,setWeatherType]=useState();
    const[weatherDescription,setWeatherDesciption]=useState();
    const[temperature,setTemperature]=useState();
    const[humidity,setHumidity]=useState();
    const[city,setCity]=useState();
    const[change,setChange]=useState();
    const [isDivVisible, setIsDivVisible] = useState(false);

    const handleChange = (e) => {
      if(e.target.value==''){
        setIsDivVisible(false);
      }
      setChange(e.target.value);
  };

  const handleClick=()=>{
      setCity(change);
      setIsDivVisible(true);
  }

    if(city == ""){
      setIsDivVisible(false);
      return;
    }
   
       
    
    
    useEffect(() => {
        
        if(city){
     axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7774fc7f74b1b10b204bf1783df36c40`)
     .then((res)=>{
        const response = res.data;
        setCityName(response.name);
        setCityIcon(response.weather[0].icon);
        setWeatherType(response.weather[0].main);
        setWeatherDesciption(response.weather[0].description);
        setHumidity(response.main.humidity);
        const latitude=response.coord.lat;
        const longitude=response.coord.lon;

        return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7774fc7f74b1b10b204bf1783df36c40&units=metric`);
     })
     .then((res)=>{
    
       setTemperature(res.data.main.temp)
     })
     .catch((err)=>{
         return err;
     })
   
      }}, [city,setIsDivVisible]);

   
    
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <TextField
          id="outlined-basic"
          label="Enter a city name..."
          variant="outlined"
          style={{ width: '300px', transition: 'background-color 0.3s' }}
          // Hover effect
          onMouseEnter={(e) => e.target.style.backgroundColor = '#C9CCD5'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'inherit'}
          onChange={handleChange}
        />
        <div style={{ marginLeft: '10px' }}> {/* Adding a margin-left for spacing */}
          <SearchIcon 
            style={{ fontSize: '32px', cursor: 'pointer', transition: 'color 0.3s' }} 
            // Hover effect
            onMouseEnter={(e) => e.target.style.color = '#C9CCD5'}
            onMouseLeave={(e) => e.target.style.color = 'black'}
            onClick={handleClick}
          />
        </div>
      </div>
      {isDivVisible&&( <div style={divStyle}>
      <div style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '10px',
      }}>{cityName}</div>
         <img src={`http://openweathermap.org/img/w/${cityIcon}.png`} alt="Weather Icon" style={{
         width: '100px', // Adjust the width as needed
    height: '100px', // Adjust the height as needed
      }} />
      
       <div style={textStyle} >{weatherType}</div>
       <div style={textStyle}>{weatherDescription}</div>
       <div style={textStyle}>{temperature}° Celsius</div>
       <div style={textStyle}>{humidity}% Humidity</div>
      </div>)}
     
    </div>
  );
};

export default WeatherApp;
