import { useEffect, useState } from "react";
import zoomPlugin from 'chartjs-plugin-zoom'
import { Chart } from "react-chartjs-2";
import { ChartData, GraficConditionsProps } from "../interfaces/interfaces";

import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend,
  BarElement,
  BarController,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  LineController,
  BarElement,
  BarController,
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

  const isMobile = window.innerWidth <= 768; 
  useEffect(() => {
    const fetchData = async () => {

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
    <div >
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
                enabled: !isMobile,
                mode: 'x', // Permite arrastar na horizontal
              },
              zoom: {
                wheel: {
                  enabled: !isMobile, // Zoom ao rolar o mouse
                },
                pinch: {
                  enabled: !isMobile, // Zoom ao usar gesto de pinça (touch)
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
