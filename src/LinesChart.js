import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var dataSaul = {
    labels: meses,
    datasets: [ // Cada una de las líneas del gráfico
        {
            label: 'Rendimiento',
            data: [10, 15, 50, 36, 45, 20, 70, 80, 40, 10, 15, 80],
            tension: 0.5,
            fill: true,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            pointRadius: 5,
            pointBorderColor: 'rgba(255, 99, 132)',
            pointBackgroundColor: 'rgba(255, 99, 132)',
        },
        {
            label: 'Estres',
            data: [30, 15, 50, 22, 10, 15, 0, 60, 20, 15, 30, 15]
        },
    ],
};

var dataManuel = {
    labels: meses,
    datasets: [ // Cada una de las líneas del gráfico
        {
            label: 'Rendimiento',
            data: [0, 56, 20, 36, 80, 40, 30, -20, 25, 30, 12, 60],
            tension: 0.5,
            fill: true,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            pointRadius: 5,
            pointBorderColor: 'rgba(255, 99, 132)',
            pointBackgroundColor: 'rgba(255, 99, 132)',
        },
        {
            label: 'Estres',
            data: [20, 25, 60, 65, 45, 10, 0, 25, 35, 7, 20, 25]
        },
    ],
};

var dataAntonio = {
    labels: meses,
    datasets: [ // Cada una de las líneas del gráfico
        {
            label: 'Rendimiento',
            data: [0, 56, 10, 36, 60, 40, 50, 30, 11, 50, 10, 30],
            tension: 0.5,
            fill: true,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            pointRadius: 5,
            pointBorderColor: 'rgba(255, 99, 132)',
            pointBackgroundColor: 'rgba(255, 99, 132)',
        },
        {
            label: 'Estres',
            data: [14, 45, 20, 55, 45, 0, 10, 25, 55, 11, 22, 60]
        },
    ],
};

var misoptions = {
    scales: {
        y: {
            min: 0
        },
        x: {
            ticks: { color: 'rgb(255, 99, 132)' }
        }
    }
};

export default function LinesChart({ desarrollador }) {
    switch (desarrollador) {
        case 'saul':
            return <div>
                Saúl Armando Reyna López
                <Line data={dataSaul} options={misoptions} />
            </div>;
        case 'manuel':
            return <div>
                Manuel Domitsu Kono
                <Line data={dataManuel} options={misoptions} />
            </div>;
        case 'antonio':
            return <div> 
                Antonio Montana
                <Line data={dataAntonio} options={misoptions} />
            </div>;
        default: return null;
    }


}