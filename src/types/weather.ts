export interface WeatherData {
  device: string;
  pressure: number;
  humidity: number;
  radiation: number;
  temperature: number;
  co2: number;
  timestamp: number;
}

export interface DeviceData {
  [deviceName: string]: WeatherData;
}