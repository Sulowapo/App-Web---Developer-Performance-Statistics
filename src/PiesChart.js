import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PiesChart({ datos }) {

    function calcularPromedio(valores) {
        const numeros = valores.map(numero => parseInt(numero, 10));
        const suma = numeros.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
        console.log(suma);
        const promedio = suma / valores.length;
        return promedio;
    }

    var options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    var data = {
        labels: ['Rendimiento', 'Estres'],
        datasets: [
            {
                label: ' promedio',
                data: [calcularPromedio(datos[0]), calcularPromedio(datos[1])],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };

    return <Pie data={data} options={options} />
}
