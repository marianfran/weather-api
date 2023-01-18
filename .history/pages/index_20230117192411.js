import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import { useState } from 'react'


export default function Home() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  var apiKey ="ae2b4e70b35d32e161cdf1269abe5669";
  var lang = "en";
  var units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}&lang${lang}`;

  const searchLocation = (event) => {
    if(event.key === "Enter"){
      axios.get(url)
        .then((response) => {
          console.clear();
          setData(response.data)
          console.log(response.data)
          setWeather(response.data.weather)
          setErrorMessage("")
        }).catch(err => {
          console.log(err)
          setErrorMessage("Please enter another location")
          setData({})
          setWeather()
        })
        setLocation('');
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {errorMessage}

        <div className={styles.header}>
          <h2>What's the Weather Today?</h2>
        </div>

        <input 
          className={styles.inputbox}
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder="Enter location"
          onKeyDown={searchLocation}
          type="text"
        />

        {data.name}
        {
          weather && weather.map((w, index) => {
            return (
              <div className={styles.inputbox} key={index}>
                <h1>{data.name}</h1>

                <div className={styles.weatherdescription}>
                  <div className={styles.weathertext}>{w.description}</div>
                  <div className={styles.weathertexttwo}>{w.main}</div>

                  <div> <p> Temperature: {data.main.temp} °C </p></div> 
                  <div> <p> Feels Like: {data.main.feels_like} °C </p></div> 
                  <div> <p> Wind Speed: {data.wind.speed} m/s </p></div> 
                </div>

              </div>
            )
          })
        }
      </main>
    </div>
  )
}
