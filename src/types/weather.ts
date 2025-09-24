export interface WeatherData {
  device: string;
  pressure: number;
  humidity: number;
  light: number;
  temperature: number;
  co2: number;
  battery: number,
  timestamp: number;
}

export interface DeviceData {
  [deviceName: string]: WeatherData;
}