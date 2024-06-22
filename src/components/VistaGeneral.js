import React, { useState } from 'react'
import { Graphics } from './Graphics';


export const VistaGeneral = ({ usuarios }) => {
    const [dato, setDato] = useState('estres');
    const [grafica, setGrafica] = useState('lineal');
    const [datosUsuario, setDatosUsuario] = useState('');
    const [desarrolladores, setDesarrolladores] = useState('');
    const [mostrarGrafica, setMostrarGrafica] = useState(false);

    const obtenerDatos = (fechaInicio, fechaFin) => {
        setDatosUsuario('');
        document.getElementById("cargandoGrafica").style.display = 'inline-block';
        setMostrarGrafica(false);
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

                if (dato === 'estres') {
                    fetch(`https://200.58.127.244:7001/NN50_PNN50?user=marti&fecha1=${fechaInicio}&fecha2=${fechaFin}`, {
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
                            const rendimiento = data.map(dato => dato[0]);
                            const estres = data.map(dato => dato[1]);
                            const indicador = desarrolladores;
        
                            document.getElementById("cargandoGrafica").style.display = 'none';
                            setDatosUsuario([rendimiento, estres, indicador]);
                            setMostrarGrafica(true);
                            console.log('Datos obtenidos:', data);
                            console.log('rendimiento', rendimiento);
                            console.log('estres', estres);
                            console.log('indicador', indicador);
                            console.log('tipo grafica: ', grafica);
                        })
                        .catch(error => {
                            console.error('Se produjo un error:', error);
                        });
                }
                else if (dato === 'emocion') {
                    //aqui iria el servicio para graficar la emocion
                }
            })
            .catch(error => {
                // Manejar errores en caso de que ocurran durante la solicitud
                console.error('Se produjo un error:', error);
            });
    };

    const handleChangeGrafica = (event) => {
        setGrafica(event.target.value);
    };

    const renderizarPantalla = (dato) => {
        setDato(dato);
        setMostrarGrafica(false);
        document.getElementById("tipoGrafico").value = 'lineal';
        document.getElementById("fechaInicio").value = '';
        document.getElementById("fechaFin").value = '';
        setDatosUsuario('');
        switch (dato) {
            case 'estres':
                document.getElementById('titulo').style.backgroundColor = '#ffc282';
                break;
            case 'emocion':
                document.getElementById('titulo').style.backgroundColor = '#6cda86';
                break;
            default:
                return null;
        }
    };

    return (
        <div class="contenidoCentrado">
            <p className="m-2"><b>VISTA GENERAL DEL GRUPO </b></p>
            <div className="oval-container">
                <button className="left-button" onClick={() => renderizarPantalla('estres')}>😣Estres</button>
                <button className="right-button" onClick={() => renderizarPantalla('emocion')}>🎭Emocion</button>
            </div>
            <div id="grafica">
                <div className="contenedor">
                    <select name="tipoGrafico" id="tipoGrafico" onChange={handleChangeGrafica}>
                        <option value="lineal">Lineal</option>
                        <option value="barras">Barras</option>
                        {/*<option value="circular">Circular</option>*/}
                    </select>
                    <input type="date" name="fechaInicio" id="fechaInicio" />
                    <input type="date" name="fechaFin" id="fechaFin" />
                    <div className="oval-container">
                        <button className="normal-button" onClick={() => obtenerDatos(document.getElementById('fechaInicio').value, document.getElementById('fechaFin').value)}>🔎Consultar</button>
                    </div>
                    <div id='titulo'>{dato} general del grupo</div>
                    {mostrarGrafica && (
                        <div id='graficas'>
                            <Graphics tipo={grafica} datos={datosUsuario} />
                        </div>
                    )}
                    <div class="loadingio-spinner-spin-nq4q5u6dq7r" id='cargandoGrafica' style={{ display: 'none' }}><div class="ldio-x2uulkbinbj">
                        <div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div>
                    </div></div>
                </div>
            </div>
        </div>
    )
}

export default VistaGeneral;
