import { useState } from 'react';
import { ChevronLeft, ChevronRight, Users, User, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

interface Event {
  id: string;
  title: string;
  date: string;
  type: 'restaurant' | 'accommodation' | 'activity';
  time?: string;
}

const mockEvents: Event[] = [
  { id: '1', title: '부산밀면', date: '2025-11-20', type: 'restaurant', time: '12:00' },
  { id: '2', title: '해운대 호텔 체크인', date: '2025-11-19', type: 'accommodation', time: '15:00' },
  { id: '3', title: '자갈치 시장 투어', date: '2025-11-21', type: 'activity', time: '10:00' },
];

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<'personal' | 'shared'>('personal');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  const getEventsForDate = (date: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return mockEvents.filter(e => e.date === dateStr);
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'restaurant': return 'bg-orange-500';
      case 'accommodation': return 'bg-blue-500';
      case 'activity': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const days = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 px-4 py-6 shadow-lg">
        <h1 className="text-white mb-1">여행 캘린더</h1>
        <p className="text-orange-100">일정을 관리하세요</p>
      </div>

      {/* Calendar Type Toggle */}
      <Tabs 
        value={viewMode} 
        onValueChange={(v) => setViewMode(v as 'personal' | 'shared')}
        className="flex-1 flex flex-col"
      >
        <TabsList className="grid w-full grid-cols-2 bg-white border-b">
          <TabsTrigger 
            value="personal"
            className="data-[state=active]:text-orange-600 data-[state=active]:border-b-2 data-[state=active]:border-orange-600"
          >
            <User className="w-4 h-4 mr-2" />
            개인 캘린더
          </TabsTrigger>
          <TabsTrigger 
            value="shared"
            className="data-[state=active]:text-orange-600 data-[state=active]:border-b-2 data-[state=active]:border-orange-600"
          >
            <Users className="w-4 h-4 mr-2" />
            공유 캘린더
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="flex-1 overflow-auto mt-0">
          <div className="p-4">
            {/* Month Navigation */}
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <Button variant="ghost" size="icon" onClick={prevMonth}>
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <h2 className="text-gray-900">
                    {year}년 {month + 1}월
                  </h2>
                  <Button variant="ghost" size="icon" onClick={nextMonth}>
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>

                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {days.map((day, index) => (
                    <div
                      key={day}
                      className={`text-center py-2 ${
                        index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-600'
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Empty cells for days before month starts */}
                  {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                  ))}

                  {/* Days of the month */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const date = i + 1;
                    const events = getEventsForDate(date);
                    const isToday = 
                      new Date().getDate() === date &&
                      new Date().getMonth() === month &&
                      new Date().getFullYear() === year;

                    return (
                      <button
                        key={date}
                        className={`aspect-square p-1 rounded-lg border ${
                          isToday ? 'bg-orange-50 border-orange-500' : 'border-gray-200'
                        } hover:bg-gray-50 transition-colors`}
                      >
                        <div className="text-gray-900">{date}</div>
                        <div className="flex flex-wrap gap-0.5 mt-1">
                          {events.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className={`w-1.5 h-1.5 rounded-full ${getEventColor(event.type)}`}
                            />
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Event List */}
            <div>
              <h3 className="text-gray-900 mb-3">예정된 일정</h3>
              <div className="space-y-2">
                {mockEvents.map((event) => (
                  <Card key={event.id}>
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getEventColor(event.type)} flex-shrink-0`} />
                        <div className="flex-1">
                          <div className="text-gray-900">{event.title}</div>
                          <div className="text-gray-500">
                            {event.date} {event.time && `• ${event.time}`}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="shared" className="flex-1 overflow-auto p-4 mt-0">
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Users className="w-16 h-16 mb-4" />
            <p className="mb-4">공유된 여행 일정이 없습니다</p>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              친구 초대하기
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Floating Action Button */}
      <div className="absolute bottom-20 right-4">
        <Button 
          size="lg" 
          className="rounded-full shadow-lg bg-orange-500 hover:bg-orange-600 h-14 px-6"
        >
          + 일정 추가
        </Button>
      </div>
    </div>
  );
}
