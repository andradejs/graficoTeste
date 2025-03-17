import { useEffect, useState } from "react";
import "./App.css";
import GraficConditions from "./components/graficConditions";
import {
  getDataAction,
} from "../src/service/action/irrigationAction.ts";

function App() {
  
  const [startDate,setStartDate] = useState<string>("2025-03-13");
  const [endDate,setEndDate] = useState<string>("2025-03-13");

  const [humidityBefore, setHumidityBefore] = useState<number[]>([]);
  const [humidityAfter, setHumidityAfter] = useState<number[]>([]);
  const [temperatureBefore, setTemperaturreBefore] = useState<number[]>([]);
  const [temperatureAfter, setTemperatureAfter] = useState<number[]>([]);
  const [soilMoistureBefore, setSoilMoistureBefore] = useState<number[]>([]);
  const [soilMoistureAfter, setSoilMoistureAfter] = useState<number[]>([]);
  const [usedWater, setUsedWater] = useState<number[]>([]);
  const [date, setDate] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const data = await getDataAction(
          startDate,
          endDate
        );
        console.log("agua usada",data);
  
        setHumidityBefore(data.humidityBefore);
        setHumidityAfter(data.humidityAfter);
        setTemperaturreBefore(data.temperatureBefore);
        setTemperatureAfter(data.temperatureAfter);
        setSoilMoistureBefore(data.soilMoistureBefore);
        setSoilMoistureAfter(data.soilMoistureAfter);
        setUsedWater(data.usedWater);
        setDate(data.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [startDate,endDate]);

  return (
    <>

      <div>
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      </div>
      <GraficConditions
        data1={humidityBefore}
        date={date}
        data2={humidityAfter}
        legendData1="Antes da irrigação (%)"
        legendData2="Depois da irrigação (%)"
        title="Dados da Umidade do ar"
        type="line"
        colorData1="#f48d8d"
        colorData2="red"
      />
      <GraficConditions
        data1={temperatureBefore}
        date={date}
        data2={temperatureAfter}
        legendData1="Antes da irrigação (°C)"
        legendData2="Depois da irrigação (°C)"
        title="Dados da Temperatura do ar"
        type="line"
        colorData1="#FFD280"
        colorData2="#e78906"
      />

      <GraficConditions
        data1={soilMoistureBefore}
        date={date}
        data2={soilMoistureAfter}
        legendData1="Antes da irrigação (%)"
        legendData2="Depois da irrigação (%)"
        title="Dados da Umidade do solo"
        type="line"
        colorData1="#06aFFF"
        colorData2="#0080ff"
      />

      <GraficConditions
        data1={usedWater}
        date={date}
        legendData1="Valor gasto na irrigação (L)"
        title="Dados Consumo de água em cada irrigação"
        type="bar"
        colorData1="#3ddbd0"
      />
    </>
  );
}

export default App;
