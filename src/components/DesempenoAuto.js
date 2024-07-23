import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { obtenerDesempenoAuto } from './api';
import 'chart.js/auto';

const preprocessData = (data) => {
  if (!Array.isArray(data)) {
    throw new Error('Data is not an array');
  }

  const formattedData = data.map((entry) => {
    const [, date, time, score, activity, performance] = entry;
    return {
      date: date,
      time: time,
      score: parseInt(score, 10),
      activity: activity,
      performance: performance,
    };
  });

  formattedData.sort((a, b) => new Date(a.date) - new Date(b.date));

  const labels = formattedData.map((entry) => entry.date);
  const times = formattedData.map((entry) => entry.time);
  const scores = formattedData.map((entry) => entry.score);
  const activities = formattedData.map((entry) => entry.activity);
  const performances = formattedData.map((entry) => entry.performance);

  return { labels, times, scores, activities, performances };
};

const DesempenoAutopercibido = ({ username, fechaInicio, fechaFin }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await obtenerDesempenoAuto(username, fechaInicio, fechaFin);
        console.log('Fetched data:', result);
        const preprocessedData = preprocessData(result);
        setData(preprocessedData);
      } catch (error) {
        console.error('Error fetching or processing data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, [username, fechaInicio, fechaFin]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Desempeño',
        data: data.scores,
        fill: false,
        borderColor: 'rgba(75,112,192,1)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          min: 1,
          max: 5,
          callback: function (value) {
            switch (value) {
              case 1: return 'Muy bajo';
              case 2: return 'Bajo';
              case 3: return 'Regular';
              case 4: return 'Alto';
              case 5: return 'Muy alto';
              default: return value;
            }
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const label = [
              `Desempeño: ${data.performances[index]}`,
              `Hora: ${data.times[index]}`,
              `Actividad: ${data.activities[index]}`,
            ];
            return label;
          },
        },
      },
    },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div style={{ width: '75%', height: '75%', marginTop: '20px' }}>
        <h2 style={{ textAlign: 'center' }}>Desempeño autopercibido</h2>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default DesempenoAutopercibido;
