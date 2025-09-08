import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Clock, 
  ThumbsUp,
  Download,
  Calendar,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

// Mock analytics data
const mockMetrics = {
  totalQueries: 1247,
  resolvedQueries: 1089,
  avgResponseTime: '2.3 മണിക്കൂർ',
  satisfactionRate: 4.2,
  activeUsers: 523,
  escalationRate: '12.7%'
};

const mockTrendData = [
  { month: 'ജനുവരി', queries: 120, resolved: 108, satisfaction: 4.1 },
  { month: 'ഫെബ്രുവരി', queries: 98, resolved: 89, satisfaction: 4.0 },
  { month: 'മാർച്ച്', queries: 145, resolved: 132, satisfaction: 4.3 },
  { month: 'ഏപ്രിൽ', queries: 167, resolved: 151, satisfaction: 4.2 },
  { month: 'മേയ്', queries: 189, resolved: 172, satisfaction: 4.4 },
  { month: 'ജൂൺ', queries: 203, resolved: 185, satisfaction: 4.1 }
];

const mockTopCrops = [
  { name: 'വാഴ', nameEn: 'Banana', queries: 234, percentage: 18.8 },
  { name: 'തെങ്ങ്', nameEn: 'Coconut', queries: 189, percentage: 15.2 },
  { name: 'കുരുമുളക്', nameEn: 'Pepper', queries: 156, percentage: 12.5 },
  { name: 'ചെമ്മീൻ', nameEn: 'Rice', queries: 134, percentage: 10.7 },
  { name: 'കാപ്പി', nameEn: 'Coffee', queries: 98, percentage: 7.9 }
];

const mockTopIssues = [
  { issue: 'ഇല പുള്ളി രോഗം', issueEn: 'Leaf Spot Disease', count: 156, trend: 'up' },
  { issue: 'കീട ആക്രമണം', issueEn: 'Pest Attack', count: 134, trend: 'down' },
  { issue: 'വളം പ്രശ്നങ്ങൾ', issueEn: 'Fertilizer Issues', count: 89, trend: 'up' },
  { issue: 'മണ്ണിന്റെ ഗുണനിലവാരം', issueEn: 'Soil Quality', count: 67, trend: 'stable' },
  { issue: 'ജലസേചനം', issueEn: 'Irrigation', count: 45, trend: 'up' }
];

export default function Analytics() {
  const { language, t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const StatCard = ({ 
    title, 
    value, 
    icon, 
    change, 
    changeType = 'positive' 
  }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
  }) => (
    <Card className="agricultural-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <p className={`text-xs flex items-center gap-1 ${
                changeType === 'positive' ? 'text-green-600' : 
                changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                <TrendingUp className={`h-3 w-3 ${
                  changeType === 'negative' ? 'rotate-180' : ''
                }`} />
                {change}
              </p>
            )}
          </div>
          <div className="p-3 bg-primary/10 rounded-2xl">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="max-w-7xl mx-auto py-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              {language === 'ml' ? 'അനലിറ്റിക്സ് ഡാഷ്ബോർഡ്' : 'Analytics Dashboard'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'ml' 
                ? 'സിസ്റ്റത്തിന്റെ പ്രകടന വിശകലനം'
                : 'System performance analysis and insights'
              }
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              {language === 'ml' ? 'ഫിൽട്ടർ' : 'Filter'}
            </Button>
            <Button className="hero-button flex items-center gap-2">
              <Download className="h-4 w-4" />
              {language === 'ml' ? 'റിപ്പോർട്ട്' : 'Export'}
            </Button>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 mb-8">
          {[
            { key: '1month', labelMl: '1 മാസം', labelEn: '1 Month' },
            { key: '3months', labelMl: '3 മാസം', labelEn: '3 Months' },
            { key: '6months', labelMl: '6 മാസം', labelEn: '6 Months' },
            { key: '1year', labelMl: '1 വർഷം', labelEn: '1 Year' }
          ].map((period) => (
            <Button
              key={period.key}
              variant={selectedPeriod === period.key ? "default" : "outline"}
              onClick={() => setSelectedPeriod(period.key)}
              size="sm"
            >
              {language === 'ml' ? period.labelMl : period.labelEn}
            </Button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <StatCard
            title={language === 'ml' ? 'മൊത്തം ചോദ്യങ്ങൾ' : 'Total Queries'}
            value={mockMetrics.totalQueries.toLocaleString()}
            icon={<MessageSquare className="h-6 w-6 text-primary" />}
            change="+12% ഈ മാസം"
          />
          <StatCard
            title={language === 'ml' ? 'പരിഹരിച്ചത്' : 'Resolved'}
            value={mockMetrics.resolvedQueries.toLocaleString()}
            icon={<ThumbsUp className="h-6 w-6 text-success" />}
            change="+8% ഈ മാസം"
          />
          <StatCard
            title={language === 'ml' ? 'ശരാശരി സമയം' : 'Avg Response Time'}
            value={mockMetrics.avgResponseTime}
            icon={<Clock className="h-6 w-6 text-warning" />}
            change="-15 മിനിറ്റ്"
          />
          <StatCard
            title={language === 'ml' ? 'സംതൃപ്തി' : 'Satisfaction'}
            value={`${mockMetrics.satisfactionRate}/5`}
            icon={<TrendingUp className="h-6 w-6 text-success" />}
            change="+0.2 പോയിന്റ്"
          />
          <StatCard
            title={language === 'ml' ? 'സജീവ ഉപയോക്താക്കൾ' : 'Active Users'}
            value={mockMetrics.activeUsers}
            icon={<Users className="h-6 w-6 text-primary" />}
            change="+23 പുതിയവർ"
          />
          <StatCard
            title={language === 'ml' ? 'എസ്കലേഷൻ നിരക്ക്' : 'Escalation Rate'}
            value={mockMetrics.escalationRate}
            icon={<BarChart3 className="h-6 w-6 text-warning" />}
            change="-2.1%"
            changeType="positive"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Query Trend */}
          <Card className="agricultural-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                {language === 'ml' ? 'ചോദ്യ ട്രെൻഡ്' : 'Query Trend'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTrendData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                    <span className="font-medium">{data.month}</span>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{data.queries} ചോദ്യങ്ങൾ</Badge>
                      <Badge variant="secondary">{data.resolved} പരിഹരിച്ചു</Badge>
                      <span className="text-sm text-muted-foreground">
                        {data.satisfaction} ★
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Crops */}
          <Card className="agricultural-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                {language === 'ml' ? 'പ്രധാന വിളകൾ' : 'Top Crops'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTopCrops.map((crop, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">
                          {language === 'ml' ? crop.name : crop.nameEn}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {crop.queries} ചോദ്യങ്ങൾ
                        </span>
                      </div>
                      <div className="w-full bg-secondary/50 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${crop.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Issues */}
        <Card className="agricultural-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              {language === 'ml' ? 'പ്രധാന പ്രശ്നങ്ങൾ' : 'Top Issues'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockTopIssues.map((issue, index) => (
                <div key={index} className="p-4 bg-secondary/20 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">
                      {language === 'ml' ? issue.issue : issue.issueEn}
                    </h3>
                    {getTrendIcon(issue.trend)}
                  </div>
                  <p className="text-2xl font-bold text-primary mb-1">{issue.count}</p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'ml' ? 'ചോദ്യങ്ങൾ ഈ മാസം' : 'queries this month'}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}