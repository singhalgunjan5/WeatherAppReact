import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
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
    if(city == ""){
      setIsDivVisible(false);
      return;
    }
    const divStyle = {
        backgroundColor: '#f0f0f0',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '300px',
        margin: 'auto',
        marginTop: '50px',
      };
    
      const imgStyle = {
        width: '50px',
        height: '50px',
        marginBottom: '10px',
      };
      const textStyle = {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '5px',
        fontStyle: 'italic',
        fontWeight: 'normal',
      };
    
    useEffect(() => {
        console.log(city);
        if(city){
     axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7774fc7f74b1b10b204bf1783df36c40`)
     .then((res)=>{
        const response = res.data;
        console.log(response);
        console.log(response.weather[0].icon);
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
         console.log(err);
     })
   
      }}, [city,setIsDivVisible]);

      const handleChange = (e) => {
        console.log(e);
        if(e.target.value==''){
          setIsDivVisible(false);
        }
        setChange(e.target.value);
    };
    const handleClick=()=>{
        console.log(change);
        setCity(change);
        setIsDivVisible(true);
    }
    
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
