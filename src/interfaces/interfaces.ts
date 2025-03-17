export interface Dataset {
    type: 'bar' | 'line';
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor?:string;
    tension: number;
}

export interface ChartData{
    labels: string[];
    datasets: Dataset[];
}

export interface GraficConditionsProps {
    date: string[];
    data1: number[];
    data2?: number[];
    legendData1: string;
    legendData2?: string;
    title: string;
    type: 'line' | 'bar';
    colorData1: string;
    colorData2?: string;
  }