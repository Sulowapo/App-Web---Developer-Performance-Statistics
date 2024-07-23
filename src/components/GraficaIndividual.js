import React, { useState, useEffect } from 'react';
import '../botonOval.css';
import DesempenoAutopercibido from './DesempenoAuto';

export const GraficaIndividual = ({ usuario }) => {
  const [username, setUsername] = useState('');
  const [dato, setDato] = useState('estres');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [mostrarGrafica, setMostrarGrafica] = useState(false);

  useEffect(() => {
    setUsername(usuario);
  }, [usuario]);

  const handleFechaInicioChange = (event) => {
    setFechaInicio(event.target.value);
  };

  const handleFechaFinChange = (event) => {
    setFechaFin(event.target.value);
  };

  const handleDatoChange = (event) => {
    setDato(event.target.value);
  };

  const handleButtonClick = () => {
    setMostrarGrafica(true);
  };

  const isDateRangeValid = () => {
    return fechaInicio && fechaFin && new Date(fechaInicio) <= new Date(fechaFin);
  };

  return (
    <div className="contenidoCentrado">
      <select value={dato} onChange={handleDatoChange}>
        <option value="des-auto">Desempeño autopercibido</option>
        {/* Add more options as needed */}
      </select>
      <select className='ms-4' value={dato} onChange={handleDatoChange}>
        <option value="completo">Completo</option>
        <option value="promedio">Promedio</option>
        {/* Add more options as needed */}
      </select>
      <input
        type="date"
        name="fechaInicio"
        id="fechaInicio"
        value={fechaInicio}
        onChange={handleFechaInicioChange}
      />
      <input
        type="date"
        name="fechaFin"
        id="fechaFin"
        value={fechaFin}
        onChange={handleFechaFinChange}
      />
      <button
        className="btn btn-primary"
        onClick={handleButtonClick}
        disabled={!isDateRangeValid()}
      >
        Consultar
      </button>
      {mostrarGrafica && (
        <DesempenoAutopercibido
          username={username}
          fechaInicio={fechaInicio}
          fechaFin={fechaFin}
        />
      )}
    </div>
  );
};

export default GraficaIndividual;
