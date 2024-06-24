import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import React, { useState, useEffect } from 'react';
import AcercaDe from './components/AcercaDe';
import { MenuLateral } from "./components/MenuLateral";
import GruposDeTrabajo from "./components/GruposDeTrabajo";
import { VistaGeneral } from "./components/VistaGeneral";
import { GraficaIndividual } from "./components/GraficaIndividual";
import Login from "./components/InicioSesion";
import Registro from './components/Registro';

function App() {
  const [isSesionIniciada, setSesionIniciada] = useState(false);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [contenido, setContenido] = useState('inicio');
  const [valor, setValor] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setSesionIniciada(true);
    }
  }, []);

  const cambiarContenido = (nuevoContenido, valor) => {
      setContenido(nuevoContenido);
      setValor(valor);
    };

    const handleLogin = () => {
      setSesionIniciada(true);
      localStorage.setItem('token', 'yourAuthTokenHere');
    };
  
    const handleLogout = () => {
      setSesionIniciada(false);
      localStorage.removeItem('token');
    };

    const handleRegisterClick = () => {
      setMostrarRegistro(true);
    };

    const handleBackToLogin = () => {
      setMostrarRegistro(false);
    };  

    const renderizarContenidoPrincipal = () => {
      if (!isSesionIniciada) {
        return (
          <div style={{ background: '#f0f0f0', minHeight: '100vh' }}>
          {mostrarRegistro ? <Registro onBackToLogin={handleBackToLogin} /> : <Login onLogin={handleLogin} onRegisterClick={handleRegisterClick} />}
        </div>
          );
      }
  
      return (
        <div>
          <MenuLateral cambiarContenido={cambiarContenido} onCerrarSesion={handleLogout} />
          <div id="contenido">
            {renderizarContenido()}
          </div>
        </div>
      );
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
      <div className="App">
        {renderizarContenidoPrincipal()}
      </div>
    );
  }

export default App;