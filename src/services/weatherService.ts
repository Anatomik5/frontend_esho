import { DeviceData } from '../types/weather';

class WeatherService {
  private jsonFilePath = '/weather-data.json';
  private updateInterval: NodeJS.Timeout | null = null;

  public async getData(): Promise<DeviceData> {
    try {
      const response = await fetch(this.jsonFilePath + '?t=' + Date.now());
      if (!response.ok) {
        throw new Error(`HTTP error, status: ${response.status}`);
      }
      const data: DeviceData = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return this.getFallbackData();
    }
  }

  private getFallbackData(): DeviceData {
    return {
      "Living Room": {
        device: "Living Room",
        pressure: 1013.2,
        humidity: 45,
        light: 12.5,
        temperature: 22.3,
        co2_concentration: 420,
        battery: 100,
        timestamp: Date.now()
      }
    };
  }
  public destroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }
}

export const weatherService = new WeatherService();