import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  Camera, 
  Mic, 
  Cloud, 
  Sun, 
  CloudRain,
  Thermometer,
  Droplets,
  TrendingUp,
  AlertCircle,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/kerala-farms-hero.jpg';

// Mock data
const mockWeather = {
  temperature: 28,
  humidity: 75,
  condition: 'partly_cloudy',
  location: 'തിരുവനന്തപുരം'
};

const mockAdvisories = [
  {
    id: 1,
    title: 'വാഴ ഇല പുള്ളി രോഗം',
    titleEn: 'Banana Leaf Spot Disease',
    priority: 'high',
    date: '2024-01-08'
  },
  {
    id: 2,
    title: 'ചെമ്മീൻ കീട ആക്രമണം',
    titleEn: 'Pest Attack Prevention',
    priority: 'medium',
    date: '2024-01-07'
  }
];

const mockRecentQueries = [
  {
    id: 1,
    question: 'എന്റെ വാഴയിൽ ഇലയിൽ പുള്ളി കാണുന്നു',
    questionEn: 'I see spots on my banana leaves',
    status: 'answered',
    date: '2024-01-08'
  },
  {
    id: 2,
    question: 'തെങ്ങിന് വളം ഇടാൻ സമയമായോ?',
    questionEn: 'Is it time to fertilize coconut trees?',
    status: 'pending',
    date: '2024-01-07'
  }
];

export default function Dashboard() {
  const { language, t } = useLanguage();
  const currentDate = new Date().toLocaleDateString(
    language === 'ml' ? 'ml-IN' : 'en-IN',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );

  const farmerName = 'രാമൻ';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-hero text-white px-4 py-12 lg:py-20"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(34, 139, 34, 0.9), rgba(0, 100, 0, 0.8)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">
              {t('welcome')}, {farmerName}
            </h1>
            <p className="text-xl lg:text-2xl mb-6 opacity-90">
              {t('todayIs')} {currentDate}
            </p>
            
            {/* Weather Card */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-md">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="h-6 w-6 text-yellow-300" />
                    <span className="text-lg font-medium">{mockWeather.location}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Thermometer className="h-4 w-4" />
                      <span>{mockWeather.temperature}°C</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Droplets className="h-4 w-4" />
                      <span>{mockWeather.humidity}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 py-8 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Card className="agricultural-card animate-slide-up">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {t('quickActions')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/query">
                  <Button className="hero-button w-full h-20 flex flex-col gap-2">
                    <MessageSquare className="h-6 w-6" />
                    <span>{t('askQuestion')}</span>
                  </Button>
                </Link>
                <Link to="/query">
                  <Button className="hero-button w-full h-20 flex flex-col gap-2">
                    <Camera className="h-6 w-6" />
                    <span>{t('uploadPhoto')}</span>
                  </Button>
                </Link>
                <Link to="/query">
                  <Button className="hero-button w-full h-20 flex flex-col gap-2">
                    <Mic className="h-6 w-6" />
                    <span>{t('recordVoice')}</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Today's Advisories */}
          <Card className="agricultural-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-warning" />
                {t('todaysAdvisories')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockAdvisories.map((advisory) => (
                <div key={advisory.id} className="flex items-start gap-3 p-4 bg-secondary/20 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">
                      {language === 'ml' ? advisory.title : advisory.titleEn}
                    </h3>
                    <p className="text-sm text-muted-foreground">{advisory.date}</p>
                  </div>
                  <Badge 
                    variant={advisory.priority === 'high' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {advisory.priority === 'high' ? t('urgent') : t('normal')}
                  </Badge>
                </div>
              ))}
              <Link to="/knowledge">
                <Button variant="outline" className="w-full mt-4">
                  {t('viewMore')}
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Queries */}
          <Card className="agricultural-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                {t('recentQueries')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockRecentQueries.map((query) => (
                <div key={query.id} className="flex items-start gap-3 p-4 bg-secondary/20 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">
                      {language === 'ml' ? query.question : query.questionEn}
                    </h3>
                    <p className="text-sm text-muted-foreground">{query.date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {query.status === 'answered' ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <Clock className="h-4 w-4 text-warning" />
                    )}
                    <span className="text-xs">
                      {query.status === 'answered' ? t('answered') : t('pending')}
                    </span>
                  </div>
                </div>
              ))}
              <Link to="/query">
                <Button variant="outline" className="w-full mt-4">
                  {language === 'ml' ? 'പുതിയ ചോദ്യം' : 'Ask New Question'}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

// Missing import - let me add it
function Clock({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <circle cx={12} cy={12} r={10} />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  );
}