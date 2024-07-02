import React, { useState } from 'react';
import '../botonOval.css';
import { Graphics } from './Graphics';

export const GraficaIndividual = ({ nombre }) => {
    const [dato, setDato] = useState('estres');
    const [grafica, setGrafica] = useState('lineal');
    const [datosUsuario, setDatosUsuario] = useState('');
    const [mostrarGrafica, setMostrarGrafica] = useState(false);

    const obtenerDatos = (fechaInicio, fechaFin) => {
        setDatosUsuario('');
        document.getElementById("cargandoGrafica").style.display = 'inline-block';
        document.getElementById("avisoError").style.display = 'none';
        setMostrarGrafica(false);
        if (dato === 'estres') {
            fetch(`https://200.58.127.244:7001/RMSSDHrv?user=${nombre}&fecha1=${fechaInicio}&fecha2=${fechaFin}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Hubo un problema al obtener los datos.');
                    }
                    return response.json();
                })
                .then(data => {
                    const sumaYConteoPorFecha = {};
                    data.forEach(entry => {
                        const valor = parseFloat(entry[0]);
                        const fecha = entry[2];

                        if (sumaYConteoPorFecha[fecha]) {
                            sumaYConteoPorFecha[fecha].suma += valor;
                            sumaYConteoPorFecha[fecha].conteo += 1;
                        } else {
                            sumaYConteoPorFecha[fecha] = { suma: valor, conteo: 1 };
                        }
                    });

                    const fechas = Object.keys(sumaYConteoPorFecha);
                    var rendimiento = [];
                    var estres = [];
                    var fechass = [];

                    if (fechas.length === 1) {
                        const fecha = fechas[0];
                        //data.forEach( entry => {
                        //    if()
                        //})
                        rendimiento = data.map(dato => dato[0]);
                        estres = data.map(dato => dato[0]);
                        fechass = data.map(dato => dato[1]);
                    } else {
                        for (const [fecha, { suma, conteo }] of Object.entries(sumaYConteoPorFecha)) {
                            const promedio = suma / conteo;

                            rendimiento.push(promedio);
                            estres.push(promedio);
                            fechass.push(fecha);
                            console.log(`Fecha: ${fecha}, Promedio: ${promedio}`);
                        }
                    }
                    setDatosUsuario([rendimiento, estres, fechass]);
                })
                .catch(error => {
                    console.error('Se produjo un error:', error);
                });

            if (fechaInicio == fechaFin) {
                fetch(`https://200.58.127.244:7001/EmotionFromRussel?user=${nombre}&fecha1=${fechaInicio}&fecha2=${fechaFin}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Hubo un problema al obtener los datos.');
                        }
                        return response.json();
                    })
                    .then(data => {

                        document.getElementById("cargandoGrafica").style.display = 'none';
                        setMostrarGrafica(true);
                    })
                    .catch(error => {
                        console.error('Se produjo un error:', error);
                        document.getElementById("cargandoGrafica").style.display = 'none';
                        document.getElementById("avisoError").style.display = 'inline-block';
                    });
            } else {
                fetch(`https://200.58.127.244:7001/EmotionPromFromRussel?user=${nombre}&fecha1=${fechaInicio}&fecha2=${fechaFin}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Hubo un problema al obtener los datos.');
                        }
                        return response.json();
                    })
                    .then(data => {
                        var datosNuevos = datosUsuario;
                        const emociones = data.map(subarreglo => subarreglo[2])
                        datosNuevos.push(emociones);
                        setDatosUsuario(datosNuevos);
                        document.getElementById("cargandoGrafica").style.display = 'none';
                        setMostrarGrafica(true);
                    })
                    .catch(error => {
                        console.error('Se produjo un error:', error);
                        document.getElementById("cargandoGrafica").style.display = 'none';
                        document.getElementById("avisoError").style.display = 'inline-block';
                    });
                
            }
        }
        else if (dato === 'emocion') {
            //aqui iria el servicio para graficar la emocion
        }
    }

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

    const handleChangeGrafica = (event) => {
        setGrafica(event.target.value);
    };

    return (
        <div className="contenidoCentrado">
            <div className="oval-container">
                <button className="left-button" onClick={() => renderizarPantalla('estres')}>😣Estres</button>
                <button className="right-button" onClick={() => renderizarPantalla('emocion')}>🎭Emoción</button>
            </div>
            <div id="grafica">
                <div className="contenedor">
                    <select name="tipoGrafico" id="tipoGrafico" onChange={handleChangeGrafica}>
                        <option value="lineal">Lineal</option>
                        <option value="barras">Barras</option>
                        <option value="circular">Circular</option>
                    </select>
                    <input type="date" name="fechaInicio" id="fechaInicio" />
                    <input type="date" name="fechaFin" id="fechaFin" />
                    <div className="oval-container">
                        <button className="normal-button" onClick={() => obtenerDatos(document.getElementById('fechaInicio').value, document.getElementById('fechaFin').value)}>🔎Consultar</button>
                    </div>
                    <div id='titulo'> <b>{dato} de {nombre}</b></div>
                    {mostrarGrafica && (
                        <div id='graficas'>
                            Emoción percibida
                            <Graphics tipo={grafica} datos={datosUsuario} />
                        </div>
                    )}
                    <div class="loadingio-spinner-spin-nq4q5u6dq7r" id='cargandoGrafica' style={{ display: 'none' }}><div class="ldio-x2uulkbinbj">
                    <div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div>
                    </div></div>
                    <br></br>
                    <div id='avisoError' style={{ display: 'none' }}> ¡¡ERROR!! vuelve a intentarlo. </div>
                </div>
            </div>
        </div>
    );
}

export default GraficaIndividual;