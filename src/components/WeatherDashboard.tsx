import React from 'react';
import { Thermometer, Droplets, Gauge, Wind, Sun } from 'lucide-react';
import { WeatherData } from '../types/weather';
import MetricCard from './MetricCard';

interface WeatherDashboardProps {
  data: WeatherData;
}

const WeatherDashboard: React.FC<WeatherDashboardProps> = ({ data }) => {
  const metrics = [
    {
      title: 'Temperature',
      value: data.temperature,
      unit: '°C',
      icon: Thermometer,
      color: 'bg-gradient-to-r from-red-500 to-orange-500',
      bgColor: 'bg-gradient-to-br from-red-50 to-orange-50'
    },
    {
      title: 'Humidity',
      value: data.humidity,
      unit: '%',
      icon: Droplets,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50'
    },
    {
      title: 'Pressure',
      value: data.pressure,
      unit: 'hPa',
      icon: Gauge,
      color: 'bg-gradient-to-r from-purple-500 to-indigo-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-indigo-50'
    },
    {
      title: 'Radiation',
      value: data.radiation,
      unit: 'µSv/h',
      icon: Sun,
      color: 'bg-gradient-to-r from-yellow-500 to-amber-500',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-amber-50'
    },
    {
      title: 'CO2 Level',
      value: data.co2,
      unit: 'ppm',
      icon: Wind,
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{data.device}</h2>
        <p className="text-gray-600">
          Last updated: {new Date(data.timestamp).toLocaleTimeString()}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            unit={metric.unit}
            icon={metric.icon}
            color={metric.color}
            bgColor={metric.bgColor}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherDashboard;