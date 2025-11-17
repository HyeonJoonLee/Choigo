import { useState } from 'react';
import { Map, Calendar, Utensils, Home, User } from 'lucide-react';
import { MapView } from './components/MapView';
import { ReservationView } from './components/ReservationView';
import { CalendarView } from './components/CalendarView';
import { DestinationView } from './components/DestinationView';
import { ProfileView } from './components/ProfileView';

type TabType = 'map' | 'reservation' | 'calendar' | 'destination' | 'profile';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('map');

  const renderView = () => {
    switch (activeTab) {
      case 'map':
        return <MapView />;
      case 'reservation':
        return <ReservationView />;
      case 'calendar':
        return <CalendarView />;
      case 'destination':
        return <DestinationView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <MapView />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderView()}
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 safe-area-bottom">
        <div className="flex items-center justify-around px-2 py-3">
          <button
            onClick={() => setActiveTab('map')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'map' ? 'text-orange-600 bg-orange-50' : 'text-gray-600'
            }`}
          >
            <Map className="w-6 h-6" />
            <span className="text-xs">지도</span>
          </button>

          <button
            onClick={() => setActiveTab('reservation')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'reservation' ? 'text-orange-600 bg-orange-50' : 'text-gray-600'
            }`}
          >
            <Utensils className="w-6 h-6" />
            <span className="text-xs">예약</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'calendar' ? 'text-orange-600 bg-orange-50' : 'text-gray-600'
            }`}
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs">캘린더</span>
          </button>

          <button
            onClick={() => setActiveTab('destination')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'destination' ? 'text-orange-600 bg-orange-50' : 'text-gray-600'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">여행지</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'profile' ? 'text-orange-600 bg-orange-50' : 'text-gray-600'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs">내정보</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
