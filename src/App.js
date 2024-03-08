/*
    Estos 'imports' sirven para incluir bootstrap, NO son necesarios para
    utilizar las gráficas de ChartJS. Yo los utilizaré para modificar 
    rápidamente el aspecto de mi página durante los ejemplos expuestos. 
*/
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import React, { useState } from 'react';
import AcercaDe from './components/AcercaDe';
import { MenuLateral } from "./components/MenuLateral";
import GruposDeTrabajo from "./components/GruposDeTrabajo";
import { VistaGeneral } from "./components/VistaGeneral";
import LinesChart from "./LinesChart";

function App() {
    const [contenido, setContenido] = useState('inicio');

    const cambiarContenido = (nuevoContenido) => {
        setContenido(nuevoContenido);
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
          case 'saul':
            return <LinesChart desarrollador='saul'/>
          case 'manuel':
            return <LinesChart desarrollador='manuel'/>
          case 'antonio':
            return <LinesChart desarrollador='antonio'/>
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