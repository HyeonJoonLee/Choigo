import { useState } from 'react';
import { MapPin, Search, Minus, Plus, Navigation, UtensilsCrossed, Building2, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { RestaurantDetailModal } from './RestaurantDetailModal';

interface Restaurant {
  id: string;
  name: string;
  category: string;
  rating: number;
  distance: string;
  position: { x: number; y: number };
  hasStamp: boolean;
  image: string;
  address: string;
  phone: string;
  openTime: string;
  menu: string[];
  reviews: number;
}

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: '부산밀면',
    category: '밀면',
    rating: 4.8,
    distance: '0.3km',
    position: { x: 35, y: 45 },
    hasStamp: false,
    image: 'https://images.unsplash.com/photo-1701598432406-a1dc7ddf7765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmb29kJTIwbm9vZGxlc3xlbnwxfHx8fDE3NjMzNDkzMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    address: '부산 해운대구 우동 123',
    phone: '051-123-4567',
    openTime: '10:00 - 21:00',
    menu: ['밀면', '비빔밀면', '수육'],
    reviews: 1234
  },
  {
    id: '2',
    name: '해운대 횟집',
    category: '회',
    rating: 4.6,
    distance: '0.5km',
    position: { x: 60, y: 30 },
    hasStamp: true,
    image: 'https://images.unsplash.com/photo-1638866381709-071747b518c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXNoaW1pfGVufDF8fHx8MTc2MzM0OTMzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    address: '부산 해운대구 중동 456',
    phone: '051-234-5678',
    openTime: '11:00 - 22:00',
    menu: ['모듬회', '회덮밥', '매운탕'],
    reviews: 892
  },
  {
    id: '3',
    name: '광안리 카페',
    category: '카페',
    rating: 4.5,
    distance: '0.8km',
    position: { x: 25, y: 60 },
    hasStamp: false,
    image: 'https://images.unsplash.com/photo-1506372023823-741c83b836fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwbGF0dGV8ZW58MXx8fHwxNzYzMzQzODkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    address: '부산 수영구 광안동 789',
    phone: '051-345-6789',
    openTime: '09:00 - 23:00',
    menu: ['아메리카노', '라떼', '케이크'],
    reviews: 567
  },
  {
    id: '4',
    name: '자갈치 곰장어',
    category: '곰장어',
    rating: 4.9,
    distance: '1.2km',
    position: { x: 70, y: 70 },
    hasStamp: true,
    image: 'https://images.unsplash.com/photo-1600699899970-b1c9fadd8f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwZmlzaHxlbnwxfHx8fDE3NjMzMDMyMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    address: '부산 중구 자갈치로 321',
    phone: '051-456-7890',
    openTime: '17:00 - 24:00',
    menu: ['곰장어구이', '소금구이', '양념구이'],
    reviews: 2103
  }
];

const mockAccommodations = [
  { id: 'h1', name: '해운대 호텔', position: { x: 45, y: 25 } },
  { id: 'h2', name: '광안리 게스트하우스', position: { x: 30, y: 75 } }
];

export function MapView() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showRestaurants, setShowRestaurants] = useState(true);
  const [showAccommodations, setShowAccommodations] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.5));

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 px-4 py-4 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <h1 className="text-white">맛집 지도</h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="맛집, 음식 검색..."
            className="pl-10 bg-white border-0 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white px-4 py-3 border-b flex gap-2 overflow-x-auto">
        <Button
          variant={showRestaurants ? 'default' : 'outline'}
          size="sm"
          onClick={() => setShowRestaurants(!showRestaurants)}
          className={showRestaurants ? 'bg-orange-500 hover:bg-orange-600' : ''}
        >
          <UtensilsCrossed className="w-4 h-4 mr-1" />
          식당
        </Button>
        <Button
          variant={showAccommodations ? 'default' : 'outline'}
          size="sm"
          onClick={() => setShowAccommodations(!showAccommodations)}
          className={showAccommodations ? 'bg-orange-500 hover:bg-orange-600' : ''}
        >
          <Building2 className="w-4 h-4 mr-1" />
          숙소
        </Button>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-1" />
          필터
        </Button>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative bg-gray-100 overflow-hidden">
        {/* Map Content */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center',
            transition: 'transform 0.3s ease'
          }}
        >
          {/* Grid Lines */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Restaurant Pins */}
          {showRestaurants && mockRestaurants.map((restaurant) => (
            <button
              key={restaurant.id}
              className="absolute transform -translate-x-1/2 -translate-y-full transition-transform hover:scale-110"
              style={{
                left: `${restaurant.position.x}%`,
                top: `${restaurant.position.y}%`
              }}
              onClick={() => setSelectedRestaurant(restaurant)}
            >
              <div className="relative">
                <div className="bg-orange-500 text-white p-2 rounded-full shadow-lg">
                  <UtensilsCrossed className="w-6 h-6" />
                </div>
                {restaurant.hasStamp && (
                  <div className="absolute -top-1 -right-1 bg-yellow-400 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    ✓
                  </div>
                )}
              </div>
              <div className="bg-white px-2 py-1 rounded shadow-md mt-1 whitespace-nowrap text-xs">
                {restaurant.name}
              </div>
            </button>
          ))}

          {/* Accommodation Pins */}
          {showAccommodations && mockAccommodations.map((accommodation) => (
            <button
              key={accommodation.id}
              className="absolute transform -translate-x-1/2 -translate-y-full transition-transform hover:scale-110"
              style={{
                left: `${accommodation.position.x}%`,
                top: `${accommodation.position.y}%`
              }}
            >
              <div className="bg-blue-500 text-white p-2 rounded-full shadow-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="bg-white px-2 py-1 rounded shadow-md mt-1 whitespace-nowrap text-xs">
                {accommodation.name}
              </div>
            </button>
          ))}

          {/* My Location */}
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: '50%', top: '50%' }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75"></div>
              <div className="relative bg-blue-600 text-white p-2 rounded-full shadow-lg">
                <Navigation className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute right-4 bottom-4 flex flex-col gap-2">
          <Button
            size="icon"
            className="bg-white text-gray-700 hover:bg-gray-100 shadow-lg"
            onClick={handleZoomIn}
          >
            <Plus className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            className="bg-white text-gray-700 hover:bg-gray-100 shadow-lg"
            onClick={handleZoomOut}
          >
            <Minus className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            className="bg-orange-500 text-white hover:bg-orange-600 shadow-lg"
          >
            <Navigation className="w-5 h-5" />
          </Button>
        </div>

        {/* Current Zoom Info */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-white text-gray-700 shadow-lg">
            줌: {Math.round(zoomLevel * 100)}%
          </Badge>
        </div>
      </div>

      {/* Restaurant Detail Modal */}
      {selectedRestaurant && (
        <RestaurantDetailModal
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}
    </div>
  );
}