import { useEffect, useState } from "react";
import zoomPlugin from 'chartjs-plugin-zoom'
import { Chart } from "react-chartjs-2";
import { ChartData, GraficConditionsProps } from "../interfaces/interfaces";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Tooltip,
  Title,
  Legend,
  zoomPlugin,
);



function GraficConditions(props: GraficConditionsProps) {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      // const humidityBefore = await gethumidityBeforeAction();
      // const date = await getDateAction();
      // console.log(date);
      // const humidityAfter = await gethumidityAfterAction();
      // console.log(humidityAfter);
      // const temperatureBefore = await getTemperatureBeforeAction();
      // const temperatureAfter = await getTemperatureAfterAction();
      // const soilMoistureBefore = await getSoilMoistureBeforeAction();
      // const soilMoistureAfter = await getSoilMoistureAfterAction();
      // const waterUsage = [10, 20, 15, 25, 18]; // Exemplo de dados de consumo de água

      setChartData({
        labels: props.date,
        datasets: [
          {
            type: props.type,
            label: props.legendData1,
            data: props.data1,
            borderColor: props.colorData1,
            backgroundColor: props.colorData1,
            tension: 0.4,
          },
          ...(props.data2 && props.legendData2 && props.colorData2 ?[
            {
              type: props.type,
              label: props.legendData2,
              data: props.data2,
              borderColor: props.colorData2,
              backgroundColor: props.colorData2,
              tension: 0.4,
            },
          ]
        :[]),
        
          // {
          //   type: 'bar',
          //   label: "Consumo de água",
          //   data: waterUsage,
          //   backgroundColor: "#3ddbd0",
          //   borderColor: "red",

          //   tension: 0.4
          // },
          // {
          //   type: 'line',
          //   label: "Temperatura antes da irrigação em °C",
          //   data: temperatureBefore,
          //   borderColor: "#FFD280",
          //   backgroundColor: "#FFD280",
          //   tension: 0.4,
          // },
          // {
          //   type: 'line',
          //   label: "Temperatura depois da irrigação em °C",
          //   data: temperatureAfter,
          //   borderColor: "#e78906",
          //   backgroundColor: "#e78906",
          //   tension: 0.4,
          // },
          // {
          //   type: 'line',
          //   label: "Umidade do solo antes da irrigação em %",
          //   data: soilMoistureBefore,
          //   borderColor: "#06aFFF",
          //   backgroundColor: "#06aFFF",
          //   tension: 0.4,
          // },
          // {
          //   type: 'line',
          //   label: "Umidade do solo depois da irrigação em %",
          //   data: soilMoistureAfter,
          //   borderColor: "#0080ff",
          //   backgroundColor: "#0080ff",
          //   tension: 0.4,
          // },
        ],
      });
    };

    fetchData();
  }, [
    props.date,
    props.data1,
    props.data2,
    props.legendData1,
    props.legendData2,
    props.colorData1,
    props.colorData2,
    props.type
  ]);

  return (
    <div>
      <h2>{props.title}</h2>
      <Chart
        width={500}
        height={400}
        type="line"
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            zoom: {
              pan: {
                enabled: true,
                mode: 'x', // Permite arrastar na horizontal
              },
              zoom: {
                wheel: {
                  enabled: true, // Zoom ao rolar o mouse
                },
                pinch: {
                  enabled: true, // Zoom ao usar gesto de pinça (touch)
                },
                mode: 'x', // Zoom apenas no eixo X
              },
            },
            legend: {
              position: "bottom",
            },
          },
        }}
      />
    </div>
  );
}

export default GraficConditions;
