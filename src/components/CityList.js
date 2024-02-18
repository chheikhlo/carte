/*import React, { useState } from 'react';

function CityList({ cities, selectedCity }) {
  const [hoveredCity, setHoveredCity] = useState(null);

  const calculateDistance = (city) => {
   // Implémentez ici la formule de calcul de la distance entre la ville et le point cliqué
    
// Coordonnées du point cliqué
const clickedX = city.x;; // Remplacez ... par la coordonnée x du point cliqué
const clickedY = city.y; // Remplacez ... par la coordonnée y du point cliqué

// Coordonnées de la ville
const cityX = city.x;
const cityY = city.y;

// Calcul de la distance euclidienne
const distance = Math.sqrt(Math.pow(clickedX - cityX, 2) + Math.pow(clickedY - cityY, 2));

   return  distance ;
  };

  return (
    <div>
      <h2>Liste des villes</h2>
      <ul>
        {cities.map(city => (
          <li key={city.id}
              onMouseEnter={() => setHoveredCity(city)}
              onMouseLeave={() => setHoveredCity(null)}
          >
            {city.name} - {calculateDistance(city)} km
          </li>
        ))}
      </ul>
      {hoveredCity && (
        <div>
          <h3>Détails de la ville survolée :</h3>
          <p>Nom : {hoveredCity.name}</p>
          <p>Distance : {hoveredCity.distance}</p>
          <p>population : {hoveredCity.population}</p>
          <p>region: {hoveredCity.region}</p>
          {/* Afficher d'autres détails de la ville survolée ici }
        </div>
      )}
      {selectedCity && (
        <div>
          <h3>Détails de la ville sélectionnée :</h3>
          <p>Nom : {selectedCity.name}</p>
          {/* Afficher d'autres détails de la ville sélectionnée ici }
        </div>
      )}
    </div>
  );
}

export default CityList;*/

