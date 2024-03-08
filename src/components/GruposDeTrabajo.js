import React from 'react'

export const GruposDeTrabajo = () => {
  const grupos = [
    { nombre: 'Desarrollo página web', integrantes: '4', FechaCreacion: '25/01/2022' },
    { nombre: 'Equipo tufesa', integrantes: '3', FechaCreacion: '12/02/2024' },
    { nombre: 'Juego proyecto final', integrantes: '7', FechaCreacion: '13/18/2023' },
    // Agrega más integrantes según sea necesario
  ];

  return (
    <div className="tabla-container">
      <table>
        <thead>
          <tr>
            <th>Grupo</th>
            <th>Integrantes</th>
            <th>Fecha de creación</th>
          </tr>
        </thead>
        <tbody>
          {grupos.map((integrante, index) => (
            <tr key={index}>
              <td>{integrante.nombre}</td>
              <td>{integrante.integrantes}</td>
              <td>{integrante.FechaCreacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GruposDeTrabajo;
