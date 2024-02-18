// ParametersForm.js
/*import React, { useState } from 'react';

function ParametersForm({ onSubmit }) {
  const [maxCities, setMaxCities] = useState('');
  const [maxDistance, setMaxDistance] = useState('');
  const [minPopulation, setMinPopulation] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ maxCities, maxDistance, minPopulation });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre maximal de villes à afficher :
        <input type="number" value={maxCities} onChange={(e) => setMaxCities(e.target.value)} />
      </label>
      <label>
        Distance maximale du point ciblé (en km) :
        <input type="number" value={maxDistance} onChange={(e) => setMaxDistance(e.target.value)} />
      </label>
      <label>
        Population minimale pour qu'une ville soit prise en compte :
        <input type="number" value={minPopulation} onChange={(e) => setMinPopulation(e.target.value)} />
      </label>
      <button type="submit">Valider</button>
    </form>
  );
}

export default ParametersForm;*/
