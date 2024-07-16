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

export default function LinesChart({ datos }) {

    var data = {
        labels: datos[2],
        datasets: [ // Cada una de las líneas del gráfico
            {
                label: 'Estres',
                data: datos[0],
                tension: 0.5,
                fill: true,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 132, 0, 1)',
                pointRadius: 5,
                pointBorderColor: 'rgba(165, 85, 0, 1)',
                pointBackgroundColor: 'rgba(165, 85, 0, 1)',
            }
        ],
    };

    const misoptions = {
        scales: {
            y: {
                min: 0
            },
            x: {
                ticks: { color: 'rgb(255, 99, 132)' }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const index = context.dataIndex;
                        const value = context.dataset.data[index];
                        const extraData = datos[3][index];
                        return [
                            `Estres: ${value}`,
                            `Emocion: ${extraData}`
                        ];
                    }
                }
            }
        }
    };

    return  <Line data={data} options={misoptions} />

}