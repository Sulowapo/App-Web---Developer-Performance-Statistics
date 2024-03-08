import React, { useState } from 'react'
import { Logo } from "../components/Logo";

export const MenuLateral = ({ cambiarContenido }) => {
    const [mostrarSubOpciones, setMostrarSubOpciones] = useState(false);

    const toggleSubOpciones = () => {
        setMostrarSubOpciones(!mostrarSubOpciones);
    };

    const handleSubOpcionClick = (subOpcion) => {
        cambiarContenido(subOpcion);
        // Aquí puedes cerrar el menú desplegable si es necesario
        setMostrarSubOpciones(false);
    };
    return (
        <div id="menu-lateral">
            <Logo />
            <a href="#seccion1" onClick={() => cambiarContenido('GruposDeTrabajo')}>Grupos de trabajo</a>
            <a href="#seccion2" onClick={() => cambiarContenido('VistaGeneral')}>Vista general</a>
            <div className="subopciones-container">
                <a href="#subopciones" onClick={toggleSubOpciones}>Grupo 'Equipo tufesa'</a>
                {mostrarSubOpciones && (
                    <div className="subopciones">
                        <a href="#subopcion1" onClick={() => handleSubOpcionClick('saul')}>Saúl Reyna López</a>
                        <a href="#subopcion2" onClick={() => handleSubOpcionClick('manuel')}>Manuel Domitsu Kono</a>
                        <a href="#subopcion3" onClick={() => handleSubOpcionClick('antonio')}>Antonio Montana</a>
                        {/* Agrega más subopciones según sea necesario */}
                    </div>
                )}
            </div>
            <a href="#acercaDe" onClick={() => cambiarContenido('AcercaDe') } id="acercaDe" >Acerca de</a>
        </div>
    );
};

export default MenuLateral;
