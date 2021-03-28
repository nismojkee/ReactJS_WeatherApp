import React, {useState} from 'react';
import './App.css';

const apiKey = {
  key: "e38a76bd5556c71752f1759a8064c922",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    if (e.key === "Enter") {
      fetch(`${apiKey.base}weather?q=${query}&units=metric&APPID=${apiKey.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        })
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'App warm' : 'App') : 'App'}>
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
        </div>

        { (typeof weather.main != "undefined") ? (
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
        ) : ('') }

        {(typeof weather.main != "undefined") ? (
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}
            </div>
            <div className="weather">
              {weather.weather[0].main}
            </div>
          </div>
        ) : ('') }
      </main>      
    </div>
  );
}

export default App;
