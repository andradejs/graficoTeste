import { getDocs, where, query, Timestamp } from "firebase/firestore";
import { getIrrigationsAcess } from "../dataAcess/irrigationAcess";
import { DataIrrigation } from "../../types/irrigationType";


export async function getDataAction(startDate: string, endDate: string): Promise<DataIrrigation> {

    const irrigationCollection = await getIrrigationsAcess();

    const dates = parseTimestemps(startDate, endDate);

    const q = query(irrigationCollection,
        where("data", ">=", dates.startTimestamps),
        where("data", "<=", dates.endTimestamps))

    const irrigationDocs = await getDocs(q);

    const irrigationData = irrigationDocs.docs.map((doc) => ({ ...doc.data() }))

    const data: DataIrrigation = {
        humidityBefore: [],
        humidityAfter: [],
        temperatureBefore: [],
        temperatureAfter: [],
        soilMoistureAfter: [],
        soilMoistureBefore: [],
        data: [],
        usedWater: []
    }

    irrigationData.forEach((key) => {

        data.humidityBefore.push(key.humidityBefore)
        data.humidityAfter.push(key.humidityAfter)
        data.temperatureBefore.push(key.temperatureBefore)
        data.temperatureAfter.push(key.temperatureAfter)
        data.soilMoistureBefore.push(key.soilMoistureBefore)
        data.soilMoistureAfter.push(key.soilMoistureAfter)
        data.usedWater.push(key.usedWater)

        const date = new Date(key.data.seconds * 1000);

        const timeZone = 'America/Sao_Paulo';

        const formatted = new Intl.DateTimeFormat('pt-BR', {
            timeZone,
            timeStyle: 'short',
            dateStyle: 'short'
        }).format(date);

        data.data.push(formatted)
    })
    return data;
}

function parseTimestemps(startDate: string, endDate: string) {
    const startDateUTC = new Date(startDate + "T00:00:00Z");
    startDateUTC.setTime(startDateUTC.getTime() + 3 * 60 * 60 * 1000)
    const startTimestamps = Timestamp.fromDate(startDateUTC);

    const endDateUTC = new Date(endDate + "T23:59:59Z");
    endDateUTC.setTime(endDateUTC.getTime() + 3 * 60 * 60 * 1000)
    const endTimestamps = Timestamp.fromDate(endDateUTC);

    return { startTimestamps, endTimestamps }
}

