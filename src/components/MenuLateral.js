import React, { useState, useEffect } from 'react'
import { Logo } from "../components/Logo";

export const MenuLateral = ({ cambiarContenido, onCerrarSesion }) => {
    const [mostrarSubOpciones, setMostrarSubOpciones] = useState(false);
    const [desarrolladores, setDesarrolladores] = useState([]);
    const [usuario, setUsuario] = useState(null);
    const [tipoUsuario, setTipoUsuario] = useState(null);
    var subopcionText = '🤝 Grupo';

    useEffect(() => {
        setUsuario(localStorage.getItem('username'));
        setTipoUsuario(localStorage.getItem('tipoUsuario'));
    }, []);

    const obtenerDesarrolladores = () => {
    fetch("https://200.58.127.244:7001/Users/list", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error('Hubo un problema al obtener los datos.');
            }
            // Convertir la respuesta a formato JSON
            return response.json();
        })
        .then(data => {
            // Aquí ya tienes los datos en formato de arreglo JavaScript
            //console.log('Datos obtenidos:', data);

            // Ahora puedes trabajar con el arreglo de datos
            setDesarrolladores(data);
            console.log('Datos obtenidos:', data);
        })
        .catch(error => {
            // Manejar errores en caso de que ocurran durante la solicitud
            console.error('Se produjo un error:', error);
        });
    }

    const toggleSubOpciones = () => {
        setMostrarSubOpciones(!mostrarSubOpciones);
        if(mostrarSubOpciones === false){
            obtenerDesarrolladores();
        }
    };

    const handleSubOpcionClick = (subOpcion, valor) => {
        cambiarContenido(subOpcion, valor);
        //setMostrarSubOpciones(false);
    };

    const handleCerrarSesion = () => {
        onCerrarSesion();
    };

    return (
        <div id="menu-lateral">
            <a href="#inicio" onClick={() => cambiarContenido('inicio')}><Logo /></a>
            {tipoUsuario === '0' && (
                <>
                    <a href="#vistaGeneral" onClick={() => cambiarContenido('VistaGeneral')}>📊 Vista general</a>
                    <div className="subopciones-container">
                        <a href="#integrantes" onClick={toggleSubOpciones}>{subopcionText}</a>
                        {mostrarSubOpciones && (
                            <div className="subopciones">
                                {desarrolladores.length > 0 ? (
                                    desarrolladores.map((desarrollador, index) => (
                                        <a href="#graficaIndividual" key={index} onClick={() => handleSubOpcionClick('GraficaIndividual', desarrollador)}>
                                            {desarrollador}
                                        </a>
                                    ))
                                ) : (
                                    <div className="loadingio-spinner-spin-nq4q5u6dq7r">
                                        <div className="ldio-x2uulkbinbj">
                                            <div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
            {tipoUsuario === '1' && (
                <a href="#graficaIndividual" onClick={() => cambiarContenido('GraficaIndividual', usuario)}>📊 Estadisticas</a>
            )}
            <a href="#acercaDe" onClick={() => cambiarContenido('AcercaDe')} id="acercaDe" >🔎 Acerca de</a>
            <p id='username'>👤 {usuario}</p>
            <button id='log-out' className="btn btn-link" onClick={handleCerrarSesion}>⬅️ Cerrar sesión</button>
        </div>
    );
};

export default MenuLateral;