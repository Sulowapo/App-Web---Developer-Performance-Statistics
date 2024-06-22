import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function Bars({ datos }) {

    function roundToNextTen(num) {
        return Math.ceil(num / 10) * 10;
    }

    console.log(datos);
    var arreglo = [datos[0], datos[1]];
    var datoMayor = roundToNextTen(Math.max(...arreglo.flat()));
    console.log(datoMayor);

    var midata = {
        labels: datos[2],
        datasets: [
            {
                label: 'Estres',
                data: datos[1],
                backgroundColor: 'rgba(150, 150, 150, 1)'
            }, 
            {
                label: 'Rendimiento',
                data: datos[0],
                backgroundColor: 'rgba(255, 132, 0, 1)'
            }
        ]
    };

    var misoptions = {
        responsive: true,
        animation: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                min: 0,
                max: datoMayor
            },
            x: {
                ticks: { color: 'rgba(0, 0, 0)' }
            }
        }
    };
    return <Bar data={midata} options={misoptions} />
}
