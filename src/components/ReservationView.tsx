import { useState } from 'react';
import { UtensilsCrossed, Building2, Clock, Users, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Reservation {
  id: string;
  type: 'restaurant' | 'accommodation';
  name: string;
  date: string;
  time: string;
  people: number;
  status: 'confirmed' | 'pending' | 'completed';
  image: string;
}

const mockReservations: Reservation[] = [
  {
    id: '1',
    type: 'restaurant',
    name: '부산밀면',
    date: '2025-11-20',
    time: '12:00',
    people: 2,
    status: 'confirmed',
    image: 'https://images.unsplash.com/photo-1701598432406-a1dc7ddf7765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmb29kJTIwbm9vZGxlc3xlbnwxfHx8fDE3NjMzNDkzMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '2',
    type: 'accommodation',
    name: '해운대 호텔',
    date: '2025-11-19',
    time: '15:00',
    people: 2,
    status: 'confirmed',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzMjkzNjYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '3',
    type: 'restaurant',
    name: '자갈치 곰장어',
    date: '2025-11-18',
    time: '18:00',
    people: 4,
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1600699899970-b1c9fadd8f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwZmlzaHxlbnwxfHx8fDE3NjMzMDMyMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

export function ReservationView() {
  const [activeTab, setActiveTab] = useState<'restaurant' | 'accommodation'>('restaurant');

  const filteredReservations = mockReservations.filter(r => r.type === activeTab);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500">예약 확정</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">대기중</Badge>;
      case 'completed':
        return <Badge variant="secondary">이용 완료</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 px-4 py-6 shadow-lg">
        <h1 className="text-white mb-1">예약 관리</h1>
        <p className="text-orange-100">내 예약 내역을 확인하세요</p>
      </div>

      {/* Tabs */}
      <Tabs 
        value={activeTab} 
        onValueChange={(v) => setActiveTab(v as 'restaurant' | 'accommodation')}
        className="flex-1 flex flex-col"
      >
        <TabsList className="grid w-full grid-cols-2 bg-white border-b">
          <TabsTrigger 
            value="restaurant"
            className="data-[state=active]:text-orange-600 data-[state=active]:border-b-2 data-[state=active]:border-orange-600"
          >
            <UtensilsCrossed className="w-4 h-4 mr-2" />
            식당 예약
          </TabsTrigger>
          <TabsTrigger 
            value="accommodation"
            className="data-[state=active]:text-orange-600 data-[state=active]:border-b-2 data-[state=active]:border-orange-600"
          >
            <Building2 className="w-4 h-4 mr-2" />
            숙소 예약
          </TabsTrigger>
        </TabsList>

        <TabsContent value="restaurant" className="flex-1 overflow-auto p-4 mt-0">
          {filteredReservations.length > 0 ? (
            <div className="space-y-3">
              {filteredReservations.map((reservation) => (
                <Card key={reservation.id} className="overflow-hidden">
                  <div className="flex">
                    <div className="w-24 h-24 flex-shrink-0">
                      <ImageWithFallback
                        src={reservation.image}
                        alt={reservation.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-gray-900">{reservation.name}</h3>
                        {getStatusBadge(reservation.status)}
                      </div>
                      <div className="space-y-1 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{reservation.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{reservation.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{reservation.people}명</span>
                        </div>
                      </div>
                      {reservation.status === 'confirmed' && (
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            예약 변경
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 text-red-600 border-red-300">
                            예약 취소
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <UtensilsCrossed className="w-16 h-16 mb-4" />
              <p>예약 내역이 없습니다</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="accommodation" className="flex-1 overflow-auto p-4 mt-0">
          {filteredReservations.length > 0 ? (
            <div className="space-y-3">
              {filteredReservations.map((reservation) => (
                <Card key={reservation.id} className="overflow-hidden">
                  <div className="flex">
                    <div className="w-24 h-24 flex-shrink-0">
                      <ImageWithFallback
                        src={reservation.image}
                        alt={reservation.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-gray-900">{reservation.name}</h3>
                        {getStatusBadge(reservation.status)}
                      </div>
                      <div className="space-y-1 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{reservation.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>체크인 {reservation.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{reservation.people}명</span>
                        </div>
                      </div>
                      {reservation.status === 'confirmed' && (
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            예약 변경
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 text-red-600 border-red-300">
                            예약 취소
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Building2 className="w-16 h-16 mb-4" />
              <p>예약 내역이 없습니다</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Floating Action Button */}
      <div className="absolute bottom-20 right-4">
        <Button 
          size="lg" 
          className="rounded-full shadow-lg bg-orange-500 hover:bg-orange-600 h-14 px-6"
        >
          + 새 예약
        </Button>
      </div>
    </div>
  );
}