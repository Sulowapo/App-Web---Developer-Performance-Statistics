import React, { useState } from 'react';
import '../botonOval.css';
import { Graphics } from './Graphics';

export const GraficaIndividual = ({ nombre }) => {
    const [dato, setDato] = useState('estres');
    const [grafica, setGrafica] = useState('lineal');
    const [datosUsuario, setDatosUsuario] = useState('');
    const [mostrarGrafica, setMostrarGrafica] = useState(false);

    const obtenerDatos = (fechaInicio, fechaFin) => {
        let rendimiento = [0], estres = [0], fechass = [0], emocion = [0];
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
                    console.log('RMSSDHRv data:');
                    console.log(data);
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

                    if (fechas.length === 1) {
                        const fecha = fechas[0];
                        //data.forEach( entry => {
                        //    if()
                        //})
                        rendimiento = data.map(dato => dato[0]);
                        estres = data.map(dato => dato[0]);
                        fechass = data.map(dato => dato[1]);
                        rendimiento = rendimiento.map(dato => dato.toFixed(2));
                        estres = estres.map(dato => dato.toFixed(2));
                    } else {
                        for (const [fecha, { suma, conteo }] of Object.entries(sumaYConteoPorFecha)) {
                            const promedio = suma / conteo;
                            rendimiento.push(promedio.toFixed(2));
                            estres.push(promedio.toFixed(2));
                            fechass.push(fecha);
                        }
                    }

                    console.log(datosUsuario);
                    console.log([rendimiento, estres, fechass, emocion]);

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
                                console.log('EmotionFromRussel data:');
                                console.log(data);
                                const emociones = fechass.map(item => {
                                    encuentraLabelCercano(item, data);
                                });
                                console.log('emociones: ');
                                console.log(emociones);
                                setDatosUsuario([rendimiento, estres, fechass, emociones]);
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
                                console.log('EmotionPromFromRussel data:');
                                console.log(data);
                                emocion = data.map(subarreglo => subarreglo[2])
                                console.log('emocion por fecha distinta');
                                console.log(emocion);
                                console.log([rendimiento, estres, fechass, emocion]);
                                setDatosUsuario([rendimiento, estres, fechass, emocion]);
                                document.getElementById("cargandoGrafica").style.display = 'none';
                                setMostrarGrafica(true);
                            })
                            .catch(error => {
                                console.error('Se produjo un error:', error);
                                document.getElementById("cargandoGrafica").style.display = 'none';
                                document.getElementById("avisoError").style.display = 'inline-block';
                            });
                    }
                })
                .catch(error => {
                    console.error('Se produjo un error:', error);
                });
        }
        else if (dato === 'emocion') {
            //aqui iria el servicio para graficar la emocion
        }
    }

    const convertirAMinutos = (time = "") => {
        let tiempo = time.replace("a. m.", "a.m.").replace("p. m.", "p.m.");
        const [hoursMinutes, period] = tiempo.split(' ');
        let [hours, minutes, seconds] = hoursMinutes.split(':').map(Number);
        if (period.toLowerCase() === 'p.m.' && hours !== 12) {
            hours += 12;
        } else if (period.toLowerCase() === 'a.m.' && hours === 12) {
            hours = 0;
        }
        return hours * 60 + minutes;
    };

    const encuentraLabelCercano = (tiempo, labels) => {
        let closestLabel = "";
        let closestTime = -1;
        const timeMinutes = convertirAMinutos(tiempo);

        console.log(`Hora a comparar: ${tiempo} (${timeMinutes} minutos)`);

        for (const [user, fecha, hora, tarea, emocion1, emocion2, emocion3, emocion4, descripcion, emocion] of labels) {
            const labelMinutes = convertirAMinutos(hora);

            console.log(`Comparando con: ${hora} (${labelMinutes} minutos), Emocion: ${emocion}`);

            if (!isNaN(labelMinutes) && labelMinutes <= timeMinutes && labelMinutes > closestTime) {
                closestTime = labelMinutes;
                closestLabel = emocion;
                console.log(`Nueva emocion mas cercana encontrada: ${emocion}`);
            }
        }
        return closestLabel;
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

    const handleChangeGrafica = (event) => {
        setGrafica(event.target.value);
    };

    return (
        <div class="contenidoCentrado">
            <div className="oval-container">
                <button className="left-button" onClick={() => renderizarPantalla('estres')}>😣Estres</button>
                <button className="right-button" onClick={() => renderizarPantalla('emocion')}>🎭Emocion</button>
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