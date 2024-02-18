/*import React, { useState } from 'react';

function Map({ carte, fetchData, setSelectedCity }) {
  const handleMapClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    fetchData(x, y);
  };

  const [hoveredCity, setHoveredCity] = useState(null);

  const handleMouseOver = (cityName) => {
    setHoveredCity(cityName);
  };

  const handleMouseOut = () => {
    setHoveredCity(null);
  };

  return (
    <div style={{ position: "relative" }}>
      <img 
        src={carte} 
        alt="Carte de France" 
        style={{ width: "50%", height: "auto", float:"left" }} 
        onClick={handleMapClick} 
        onMouseOver={() => handleMouseOver("Paris")}
        onMouseOut={handleMouseOut}
      />
      {hoveredCity && <p>{hoveredCity}</p>}
    </div>
  );
}

export default Map;*/


