import { useState, useEffect } from 'react';
import { Cloud } from 'lucide-react';
import { DeviceData } from './types/weather';
import { weatherService } from './services/weatherService';
import TabNavigation from './components/TabNavigation';
import WeatherDashboard from './components/WeatherDashboard';

function App() {
  const [weatherData, setWeatherData] = useState<DeviceData>({});
  const [activeDevice, setActiveDevice] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await weatherService.getData();
      setWeatherData(data);

      // Set first device as active if not set
      if (!activeDevice && Object.keys(data).length > 0) {
        setActiveDevice(Object.keys(data)[0]);
      }

      if (isLoading) {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Set up interval for updates every 1 second
    const interval = setInterval(fetchData, 1000);

    return () => {
      clearInterval(interval);
      weatherService.destroy();
    };
  }, [activeDevice, isLoading]);

  const devices = Object.keys(weatherData);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Cloud className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600 text-lg">Loading weather data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cloud className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Weather Monitor
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Real-time environmental monitoring across multiple devices
          </p>
        </div>

        <TabNavigation
          devices={devices}
          activeDevice={activeDevice}
          onDeviceChange={setActiveDevice}
        />

        {activeDevice && weatherData[activeDevice] && (
          <div className="animate-fadeIn">
            <WeatherDashboard data={weatherData[activeDevice]} />
          </div>
        )}

        <div className="fixed bottom-6 right-6">
          <div className="bg-white rounded-full p-3 shadow-lg border border-green-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-600 font-medium">Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;