import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  User,
  MessageSquare,
  Send,
  CheckCircle,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

// Mock data
const mockOfficers = [
  {
    id: 1,
    name: 'രാജേഷ് കുമാർ',
    nameEn: 'Rajesh Kumar',
    designation: 'കൃഷി ഓഫീസർ',
    designationEn: 'Agricultural Officer',
    panchayat: 'തിരുവനന്തപുരം',
    phone: '+91 9876543210',
    email: 'rajesh.kumar@kerala.gov.in',
    availability: 'available',
    responseTime: '2 മണിക്കൂർ'
  },
  {
    id: 2,
    name: 'പ്രിയ മേനോൻ',
    nameEn: 'Priya Menon',
    designation: 'ഹോർട്ടികൾച്ചർ ഓഫീസർ',
    designationEn: 'Horticulture Officer',
    panchayat: 'നെയ്യാറ്റിൻകര',
    phone: '+91 9876543211',
    email: 'priya.menon@kerala.gov.in',
    availability: 'busy',
    responseTime: '4 മണിക്കൂർ'
  }
];

const mockEscalations = [
  {
    id: 1,
    title: 'വാഴ രോഗം - അടിയന്തിര സഹായം',
    titleEn: 'Banana Disease - Urgent Help',
    status: 'in_review',
    officer: 'രാജേഷ് കുമാർ',
    date: '2024-01-08',
    priority: 'high'
  },
  {
    id: 2,
    title: 'തെങ്ങിന്റെ കീട ആക്രമണം',
    titleEn: 'Coconut Pest Attack',
    status: 'answered',
    officer: 'പ്രിയ മേനോൻ',
    date: '2024-01-06',
    priority: 'medium'
  }
];

const statusLabels = {
  ml: {
    opened: 'തുറന്നത്',
    in_review: 'പരിശോധനയിൽ',
    answered: 'ഉത്തരം ലഭിച്ചു',
    closed: 'അടച്ചത്'
  },
  en: {
    opened: 'Opened',
    in_review: 'In Review',
    answered: 'Answered',
    closed: 'Closed'
  }
};

export default function Escalation() {
  const { language, t } = useLanguage();
  const [selectedOfficer, setSelectedOfficer] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [showNewEscalation, setShowNewEscalation] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'opened': return 'bg-blue-100 text-blue-800';
      case 'in_review': return 'bg-yellow-100 text-yellow-800';
      case 'answered': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      default: return 'text-success';
    }
  };

  const handleCreateEscalation = () => {
    if (!selectedOfficer || !message.trim()) return;
    
    // Simulate escalation creation
    setTimeout(() => {
      setShowNewEscalation(false);
      setSelectedOfficer(null);
      setMessage('');
    }, 1000);
  };

  if (showNewEscalation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
        <div className="max-w-4xl mx-auto py-8">
          <Button 
            variant="outline" 
            onClick={() => setShowNewEscalation(false)}
            className="mb-6"
          >
            ← {t('back')}
          </Button>
          
          <Card className="agricultural-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-warning" />
                {language === 'ml' ? 'പുതിയ എസ്കലേഷൻ' : 'New Escalation'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Officer Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  {t('selectOfficer')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockOfficers.map((officer) => (
                    <Card 
                      key={officer.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedOfficer?.id === officer.id 
                          ? 'ring-2 ring-primary bg-primary/5' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedOfficer(officer)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">
                              {language === 'ml' ? officer.name : officer.nameEn}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {language === 'ml' ? officer.designation : officer.designationEn}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{officer.panchayat}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {officer.responseTime}
                              </span>
                              <Badge 
                                variant={officer.availability === 'available' ? 'default' : 'secondary'}
                                className="text-xs ml-2"
                              >
                                {officer.availability === 'available' ? t('available') : t('busy')}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {language === 'ml' ? 'വിവരണം' : 'Description'}
                </label>
                <Textarea
                  placeholder={t('describeProbleInDetail')}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-32"
                />
              </div>

              {/* Submit */}
              <Button 
                onClick={handleCreateEscalation}
                disabled={!selectedOfficer || !message.trim()}
                className="hero-button w-full flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                {t('createEscalation')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="max-w-6xl mx-auto py-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              {t('escalationSystem')}
            </h1>
            <p className="text-muted-foreground">
              {t('connectWithOfficers')}
            </p>
          </div>
          <Button 
            onClick={() => setShowNewEscalation(true)}
            className="hero-button flex items-center gap-2"
          >
            <AlertTriangle className="h-4 w-4" />
            {t('newEscalation')}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* My Escalations */}
          <div className="lg:col-span-2">
            <Card className="agricultural-card animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  {t('myEscalations')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockEscalations.map((escalation) => (
                  <Card key={escalation.id} className="border border-border/50 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">
                            {language === 'ml' ? escalation.title : escalation.titleEn}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {t('officer')} {escalation.officer}
                          </p>
                          <div className="flex items-center gap-3">
                            <Badge className={getStatusColor(escalation.status)} variant="secondary">
                              {statusLabels[language][escalation.status as keyof typeof statusLabels.ml]}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{escalation.date}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <AlertTriangle className={`h-4 w-4 ${getPriorityColor(escalation.priority)}`} />
                          <Button variant="outline" size="sm">
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Officers Directory */}
          <div>
            <Card className="agricultural-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {t('officers')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockOfficers.map((officer) => (
                  <Card key={officer.id} className="border border-border/50">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold">
                          {language === 'ml' ? officer.name : officer.nameEn}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {language === 'ml' ? officer.designation : officer.designationEn}
                        </p>
                        <div className="flex items-center gap-1 text-xs">
                          <MapPin className="h-3 w-3" />
                          {officer.panchayat}
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Phone className="h-3 w-3 mr-1" />
                            {t('call')}
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Mail className="h-3 w-3 mr-1" />
                            {t('mail')}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}