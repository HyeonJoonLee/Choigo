import { X, Star, MapPin, Phone, Clock, QrCode, Calendar, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Restaurant {
  id: string;
  name: string;
  category: string;
  rating: number;
  distance: string;
  hasStamp: boolean;
  image: string;
  address: string;
  phone: string;
  openTime: string;
  menu: string[];
  reviews: number;
}

interface RestaurantDetailModalProps {
  restaurant: Restaurant;
  onClose: () => void;
}

export function RestaurantDetailModal({ restaurant, onClose }: RestaurantDetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl max-h-[85vh] overflow-y-auto animate-slide-up">
        {/* Header Image */}
        <div className="relative h-48">
          <ImageWithFallback
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>
          {restaurant.hasStamp && (
            <div className="absolute top-4 left-4 bg-yellow-400 text-white px-3 py-1 rounded-full flex items-center gap-1">
              <span>✓</span>
              <span>스탬프 획득</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title & Rating */}
          <div className="mb-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-gray-900 mb-1">{restaurant.name}</h2>
                <Badge variant="secondary">{restaurant.category}</Badge>
              </div>
              <Button variant="ghost" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{restaurant.rating}</span>
                <span>({restaurant.reviews})</span>
              </div>
              <span>•</span>
              <span>{restaurant.distance}</span>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="text-gray-600">{restaurant.address}</div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="text-gray-600">{restaurant.phone}</div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="text-gray-600">{restaurant.openTime}</div>
            </div>
          </div>

          {/* Menu */}
          <div className="mb-6">
            <h3 className="text-gray-900 mb-3">대표 메뉴</h3>
            <div className="flex flex-wrap gap-2">
              {restaurant.menu.map((item, index) => (
                <Badge key={index} variant="outline" className="text-orange-600 border-orange-300">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Calendar className="w-4 h-4 mr-2" />
              예약하기
            </Button>
            <Button 
              variant="outline" 
              className="border-orange-500 text-orange-600 hover:bg-orange-50"
            >
              <QrCode className="w-4 h-4 mr-2" />
              스탬프 찍기
            </Button>
          </div>

          {/* Add to Schedule */}
          <Button variant="outline" className="w-full mt-3">
            일정에 추가
          </Button>
        </div>
      </div>
    </div>
  );
}
