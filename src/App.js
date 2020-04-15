import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSnowflake, faWind, faStopwatch20, faGlasses, faSun } from "@fortawesome/free-solid-svg-icons";
const api = {
  key: "692ba30b6629fd95773782e8874fbecc",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = evt=>{
    if(evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => 
        {
        setWeather(result);
        setQuery('');  
        console.log(result);
    });
     
    }
  }


const dateBuilder = (d) =>{
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`
}

  return (
    <div className={
      (typeof weather.main != "undefined")
       ? ((weather.main.temp >= 17)
       ? 'app warm' : 'app')
        : 'app'}>
      <main>
        <div className = "search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="search..."
            onChange={e=> setQuery(e.target.value)}
            value={query}
            onKeyPress = {search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
       <div>
       <div className="location-box">
          <div className="location">
            {weather.name}, {weather.sys.country}
          </div>
          <div className="date">
            {dateBuilder(new Date())}
          </div>
            <div className="weather-box">
              <div className="temp">
              {Math.round(weather.main.temp)}°C 

              {
      ((weather.main.temp >= 17)
       ?<FontAwesomeIcon 
              className = "icon-spin"
              icon={faSun} color="yellow" /> :  <FontAwesomeIcon 
              className = "icon-spin"
              icon={faSnowflake} color="#00bcd4" />)
        }
              </div>
              <div className="weather">
              {weather.weather[0].main}
              </div>
            </div>

            {/* weather Reports */}
            <div className="weather-box">
              <div className="temp1">
                      <h3>
                                                    Wind speed
                      </h3>
              <FontAwesomeIcon 
              className = "icons"
              icon={faWind} color="#00bcd4" />
               {weather.wind.speed} mph
              </div>
            </div>
            <div className="weather-box">
              <div className="temp2">
                      <h3>
                                                   Pressure
                      </h3>
              <FontAwesomeIcon 
               className = "icons"
              icon={faStopwatch20} color="red" />
              {weather.main.pressure} hPa
              </div>
            </div>
            <div className="weather-box">
              <div className="temp2">
                      <h3>
                                                   Visibility
                      </h3>
              <FontAwesomeIcon 
               className = "icons"
              icon={faGlasses} color="#f0a500" />
              {weather.visibility} m
              </div>
            </div>
           
            
              {/* weather Reports Ends */}
          </div>
       </div>
       ) : ('')}
      </main>
    </div>
  );
}

export default App;
