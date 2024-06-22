
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import React, { useState } from 'react';
import AcercaDe from './components/AcercaDe';
import { MenuLateral } from "./components/MenuLateral";
import GruposDeTrabajo from "./components/GruposDeTrabajo";
import { VistaGeneral } from "./components/VistaGeneral";
import { GraficaIndividual } from "./components/GraficaIndividual";

function App() {
  const [contenido, setContenido] = useState('inicio');
  const [valor, setValor] = useState('');

  const cambiarContenido = (nuevoContenido, valor) => {
      setContenido(nuevoContenido);
      setValor(valor);
    };

  const renderizarContenido = () => {
      switch (contenido) {
        case 'inicio':
          return (
            <div>
              <h1>Bienvenido al sitio web</h1>
              <p>Este es el contenido principal de la página.</p>
            </div>
          );
        case 'AcercaDe':
          return <AcercaDe />;
        case 'GruposDeTrabajo':
          return <GruposDeTrabajo/>
        case 'VistaGeneral':
          return <VistaGeneral/>
        case 'GraficaIndividual':
          return <GraficaIndividual nombre = {valor}/>
        default:
          return null;
      }
    };

  return (
      <body>
          <MenuLateral cambiarContenido={cambiarContenido} />
          <div id="contenido">
              {renderizarContenido()}
          </div>

      </body>
  );
}

export default App;