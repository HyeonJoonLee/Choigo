import { useState } from 'react';
import { Search, MapPin, TrendingUp, Award, Calendar as CalendarIcon } from 'lucide-react';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FoodTour {
  id: string;
  title: string;
  location: string;
  description: string;
  stamps: number;
  totalStamps: number;
  image: string;
  type: 'tour' | 'festival' | 'market';
}

const mockTours: FoodTour[] = [
  {
    id: '1',
    title: '부산 밀면 투어',
    location: '부산',
    description: '부산의 대표 밀면 맛집 5곳을 방문하고 스탬프를 모으세요',
    stamps: 3,
    totalStamps: 5,
    image: 'https://images.unsplash.com/photo-1701598432406-a1dc7ddf7765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmb29kJTIwbm9vZGxlc3xlbnwxfHx8fDE3NjMzNDkzMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    type: 'tour'
  },
  {
    id: '2',
    title: '전주 비빔밥 투어',
    location: '전주',
    description: '전주 한옥마을에서 즐기는 정통 비빔밥 여행',
    stamps: 0,
    totalStamps: 4,
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWJpbWJhcHxlbnwxfHx8fDE3NjMzNDk0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    type: 'tour'
  },
  {
    id: '3',
    title: '자갈치 시장 투어',
    location: '부산',
    description: '부산 최대 수산시장에서 신선한 해산물 체험',
    stamps: 2,
    totalStamps: 3,
    image: 'https://images.unsplash.com/photo-1689590735625-760f8b2fa77a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwbWFya2V0fGVufDF8fHx8MTc2MzM0OTQ2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    type: 'market'
  },
  {
    id: '4',
    title: '봄꽃 벚꽃 축제',
    location: '서울',
    description: '벚꽃과 함께하는 봄맞이 먹거리 축제',
    stamps: 0,
    totalStamps: 6,
    image: 'https://images.unsplash.com/photo-1679991811922-6470a50deca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVycnklMjBibG9zc29tJTIwZmVzdGl2YWx8ZW58MXx8fHwxNzYzMzA4NDY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    type: 'festival'
  }
];

export function DestinationView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'tour' | 'festival' | 'market'>('all');

  const filteredTours = mockTours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || tour.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'tour': return '맛집 투어';
      case 'festival': return '축제';
      case 'market': return '시장';
      default: return '';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'tour': return 'bg-orange-500';
      case 'festival': return 'bg-pink-500';
      case 'market': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 px-4 py-6 shadow-lg">
        <h1 className="text-white mb-1">여행지 & 투어</h1>
        <p className="text-orange-100">맛있는 테마 여행을 떠나보세요</p>
      </div>

      {/* Search */}
      <div className="bg-white px-4 py-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="투어, 축제, 시장 검색..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white px-4 py-3 border-b flex gap-2 overflow-x-auto">
        <Button
          variant={selectedType === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedType('all')}
          className={selectedType === 'all' ? 'bg-orange-500 hover:bg-orange-600' : ''}
        >
          전체
        </Button>
        <Button
          variant={selectedType === 'tour' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedType('tour')}
          className={selectedType === 'tour' ? 'bg-orange-500 hover:bg-orange-600' : ''}
        >
          맛집 투어
        </Button>
        <Button
          variant={selectedType === 'festival' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedType('festival')}
          className={selectedType === 'festival' ? 'bg-orange-500 hover:bg-orange-600' : ''}
        >
          축제
        </Button>
        <Button
          variant={selectedType === 'market' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedType('market')}
          className={selectedType === 'market' ? 'bg-orange-500 hover:bg-orange-600' : ''}
        >
          시장
        </Button>
      </div>

      {/* Stats */}
      <div className="bg-white px-4 py-4 border-b">
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-0">
            <CardContent className="p-3 text-center">
              <Award className="w-6 h-6 text-orange-600 mx-auto mb-1" />
              <div className="text-gray-900">5개</div>
              <div className="text-gray-600">획득 스탬프</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0">
            <CardContent className="p-3 text-center">
              <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <div className="text-gray-900">3개</div>
              <div className="text-gray-600">진행중 투어</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0">
            <CardContent className="p-3 text-center">
              <CalendarIcon className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <div className="text-gray-900">2개</div>
              <div className="text-gray-600">예정 축제</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tour List */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          {filteredTours.map((tour) => (
            <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex">
                <div className="w-28 h-28 flex-shrink-0 relative">
                  <ImageWithFallback
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className={`absolute top-2 left-2 ${getTypeColor(tour.type)}`}>
                    {getTypeLabel(tour.type)}
                  </Badge>
                </div>
                <CardContent className="flex-1 p-4">
                  <h3 className="text-gray-900 mb-1">{tour.title}</h3>
                  <div className="flex items-center gap-1 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{tour.location}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {tour.description}
                  </p>
                  
                  {/* Stamp Progress */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">스탬프 진행도</span>
                      <span className="text-xs text-orange-600">
                        {tour.stamps}/{tour.totalStamps}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all"
                        style={{ width: `${(tour.stamps / tour.totalStamps) * 100}%` }}
                      />
                    </div>
                  </div>

                  <Button 
                    size="sm" 
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    투어 시작하기
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}