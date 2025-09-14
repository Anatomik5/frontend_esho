import React from 'react';
import { Monitor } from 'lucide-react';

interface TabNavigationProps {
  devices: string[];
  activeDevice: string;
  onDeviceChange: (device: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ devices, activeDevice, onDeviceChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-2 mb-8">
      <div className="flex flex-wrap gap-2">
        {devices.map((device) => (
          <button
            key={device}
            onClick={() => onDeviceChange(device)}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105
              ${activeDevice === device
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }
            `}
          >
            <Monitor className="w-4 h-4" />
            {device}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;