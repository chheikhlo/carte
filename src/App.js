import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from './france.png';
import redMarkerIcon from './target.png';

function App() {
  const [cities, setCities] = useState([]);
  const [hoveredCity, setHoveredCity] = useState(null);
  const [userCoords] = useState({ latitude: null, longitude: null });
  const [distanceToCity, setDistanceToCity] = useState(null);
  const [clickedPoint, setClickedPoint] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/citys');
      setCities(response.data);
      console.log('Données des villes récupérées avec succès:', response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données des villes:', error);
    }
  };

  useEffect(() => {
    const map = L.map('map').setView([46.603354, 1.888334], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

    cities.forEach(city => {
      const marker = L.marker([city.latitude, city.longitude], {
        icon: L.icon({
          iconUrl: markerIcon,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32]
        })
      }).addTo(map);

      marker.on('mouseover', function() {
        setHoveredCity(city);
        this.openPopup();
        if (userCoords.latitude && userCoords.longitude) {
          const distance = calculateDistance(
            userCoords.latitude,
            userCoords.longitude,
            city.latitude,
            city.longitude
          );
          setDistanceToCity(distance);
          updatePopupContent(city, distance);
        }
        this.setIcon(L.icon({
          iconUrl: markerIcon,
          iconSize: [55, 55],
          iconAnchor: [18, 55],
          popupAnchor: [0, -55]
        }));
      });

      marker.on('mouseout', function() {
        if (!clickedPoint) {
          setHoveredCity(null);
          setDistanceToCity(null);
          this.setIcon(L.icon({
            iconUrl: markerIcon,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
          }));
        }
      });

      //pour les infos de la ville sur le popup
      marker.bindPopup(`<div id="popup-${city.id}"><b>${city.name}</b><br>Région: ${city.region}<br>Population: ${city.population}</div>`);
    });

    if (clickedPoint) {
      L.marker(clickedPoint, {
        icon: L.icon({
          iconUrl: redMarkerIcon,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        })
      }).addTo(map);
    }

    const handleClick = (e) => {
      const clickedPoint = e.latlng;
      setClickedPoint(clickedPoint);
      setHoveredCity(null);

      const distances = cities.map(city => ({
        id: city.id,
        distance: calculateDistance(
          clickedPoint.lat,
          clickedPoint.lng,
          city.latitude,
          city.longitude
        )
      }));
      setDistanceToCity(distances);
    };

    map.on('click', handleClick);

    return () => {
      map.off('click', handleClick);
      map.remove();
    };
  }, [cities, userCoords, clickedPoint]);

  // La la formule de la "Haversine"
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Math.round(distance);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const maxVillesValue = parseInt(event.target.maxVilles.value);
    const populationMin = parseInt(event.target.populationMin.value);
    const selectedRegion = event.target.selectedRegion.value.trim();

    try {
      const response = await axios.get('http://localhost:8080/citys');
      let filteredCities = response.data;


      // Filtre en fonction de population minimale
      if (!isNaN(populationMin) && populationMin > 0) {
        filteredCities = filteredCities.filter(city => city.population >= populationMin);
      }

      // Filtre en fonction de région sélectionnée
      if (selectedRegion !== "") {
        filteredCities = filteredCities.filter(city => city.region.toLowerCase() === selectedRegion.toLowerCase());
      }

      // Filtre en fonction du nombre maximal de villes
      if (!isNaN(maxVillesValue) && maxVillesValue > 0) {
        filteredCities = filteredCities.slice(0, maxVillesValue);
      }

      setCities(filteredCities);
      console.log('Villes filtrées:', filteredCities);
    } catch (error) {
      console.error('Erreur lors de la récupération des villes filtrées:', error);
    }
  };

  const updatePopupContent = (city, distance) => {
    const popup = document.getElementById(`popup-${city.id}`);
    if (popup) {
      popup.innerHTML = `<b>${city.name}</b><br>Région: ${city.region}<br>Population: ${city.population}<br>Distance: ${distance} km`;
    }
  };

  return (
    <div className="App">
      <div className="sidebar" style={{ width: '20%' }}>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="maxVilles" className="form-label" style={{ color: 'black'}}>Nombre maximal de villes :</label>
            <input type="number" id="maxVilles" name="maxVilles" className="form-input" />

            <label htmlFor="distanceMax" className="form-label" style={{ color: 'black'}}>Distance maximale (en km) :</label>
            <input type="number" id="distanceMax" name="distanceMax" className="form-input" />

            <label htmlFor="populationMin" className="form-label" style={{ color: 'black'}}>Population minimale :</label>
            <input type="number" id="populationMin" name="populationMin" className="form-input" />

            <label htmlFor="selectedRegion" className="form-label" style={{ color: 'black'}}>Région :</label>
            <input type="text" id="selectedRegion" name="selectedRegion" className="form-input" onChange={(e) => setSelectedRegion(e.target.value)} />

            <button type="submit" className="form-button">Filtrer</button>
          </form>
        </div>
        <h3>Liste des Villes</h3>
        <ul>
          {cities.map(city => (
            <li key={city.id} className={hoveredCity === city ? 'highlighted' : null} >
              {distanceToCity && distanceToCity.find(item => item.id === city.id) && `[ ${distanceToCity.find(item => item.id === city.id).distance} km ] - `}
              <span style={{ color: hoveredCity === city ? 'red' : 'white', fontSize: hoveredCity === city ? '1.2em' : '1em' }}>{city.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="map-container" id="map" style={{ height: '500px', width: '60%', marginLeft: '20%' }}></div>
    </div>
  );
}

export default App;
