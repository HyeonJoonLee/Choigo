import { useState } from 'react';
import { User, Settings, Award, Heart, MessageSquare, Users, Store, Calendar, Bell, ChevronRight, LogOut } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';

type UserMode = 'customer' | 'owner';

export function ProfileView() {
  const [userMode, setUserMode] = useState<UserMode>('customer');
  const [notifications, setNotifications] = useState(true);
  const [vibration, setVibration] = useState(true);

  const MenuButton = ({ icon: Icon, label, badge, onClick }: any) => (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full p-4 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-gray-600" />
        <span className="text-gray-900">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge && <Badge variant="secondary">{badge}</Badge>}
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </button>
  );

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 px-4 py-8 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-16 h-16 border-2 border-white">
            <AvatarImage src="" />
            <AvatarFallback className="bg-white text-orange-600">김</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-white mb-1">김맛집</h2>
            <p className="text-orange-100">gourmet@email.com</p>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={userMode === 'customer' ? 'default' : 'outline'}
            onClick={() => setUserMode('customer')}
            className={userMode === 'customer' ? 'bg-white text-orange-600 hover:bg-white' : 'bg-orange-400/30 text-white border-white/30'}
          >
            <User className="w-4 h-4 mr-2" />
            손님 모드
          </Button>
          <Button
            variant={userMode === 'owner' ? 'default' : 'outline'}
            onClick={() => setUserMode('owner')}
            className={userMode === 'owner' ? 'bg-white text-orange-600 hover:bg-white' : 'bg-orange-400/30 text-white border-white/30'}
          >
            <Store className="w-4 h-4 mr-2" />
            사장님 모드
          </Button>
        </div>
      </div>

      {/* Stats (Customer Only) */}
      {userMode === 'customer' && (
        <div className="px-4 py-4">
          <div className="grid grid-cols-3 gap-3">
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-0">
              <CardContent className="p-3 text-center">
                <Award className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                <div className="text-gray-900">12개</div>
                <div className="text-gray-600 text-xs">스탬프</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0">
              <CardContent className="p-3 text-center">
                <MessageSquare className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <div className="text-gray-900">8개</div>
                <div className="text-gray-600 text-xs">리뷰</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-0">
              <CardContent className="p-3 text-center">
                <Heart className="w-6 h-6 text-pink-600 mx-auto mb-1" />
                <div className="text-gray-900">24개</div>
                <div className="text-gray-600 text-xs">찜</div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Menu - Customer Mode */}
      {userMode === 'customer' && (
        <div className="flex-1">
          <Card className="mx-4 mb-3">
            <MenuButton icon={Calendar} label="내 예약" badge="3" />
            <div className="border-t" />
            <MenuButton icon={Award} label="내 스탬프 관리" badge="12" />
            <div className="border-t" />
            <MenuButton icon={Users} label="친구 관리" badge="5" />
            <div className="border-t" />
            <MenuButton icon={MessageSquare} label="내 리뷰 관리" badge="8" />
            <div className="border-t" />
            <MenuButton icon={Heart} label="찜한 맛집" badge="24" />
          </Card>

          <Card className="mx-4 mb-3">
            <div className="p-4">
              <h3 className="text-gray-900 mb-3">설정</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900">푸시 알림</span>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900">진동</span>
                  </div>
                  <Switch
                    checked={vibration}
                    onCheckedChange={setVibration}
                  />
                </div>
              </div>
            </div>
            <div className="border-t" />
            <MenuButton icon={Settings} label="개인정보 설정" />
          </Card>
        </div>
      )}

      {/* Menu - Owner Mode */}
      {userMode === 'owner' && (
        <div className="flex-1">
          <Card className="mx-4 mb-3 mt-4">
            <MenuButton icon={Store} label="가게 정보 관리" />
            <div className="border-t" />
            <MenuButton icon={Calendar} label="가게 스케줄 관리" />
            <div className="border-t" />
            <MenuButton icon={MessageSquare} label="가게 리뷰 관리" badge="23" />
            <div className="border-t" />
            <MenuButton icon={Award} label="스탬프 이벤트 관리" />
          </Card>

          <Card className="mx-4 mb-3">
            <div className="p-4">
              <h3 className="text-gray-900 mb-3">설정</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900">예약 알림</span>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
              </div>
            </div>
            <div className="border-t" />
            <MenuButton icon={Settings} label="가게 설정" />
          </Card>

          {/* Guide for Owners */}
          <Card className="mx-4 mb-3 bg-orange-50 border-orange-200">
            <CardContent className="p-4">
              <h3 className="text-orange-900 mb-2">💡 사장님 가이드</h3>
              <p className="text-orange-700 text-sm mb-3">
                고객들이 QR 코드를 스캔하면 자동으로 스탬프가 발급됩니다. 
                식당 스케줄을 업데이트하면 고객들이 실시간으로 확인할 수 있습니다.
              </p>
              <Button variant="outline" size="sm" className="w-full border-orange-300 text-orange-700">
                가이드 보기
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Logout */}
      <div className="px-4 pb-4">
        <Button variant="outline" className="w-full text-red-600 border-red-300 hover:bg-red-50">
          <LogOut className="w-4 h-4 mr-2" />
          로그아웃
        </Button>
      </div>
    </div>
  );
}
