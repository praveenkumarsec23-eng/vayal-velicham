import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Sprout, 
  Calendar, 
  Settings, 
  Shield,
  Download,
  Edit,
  Save,
  X,
  Languages,
  Bell,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/contexts/LanguageContext';

// Mock profile data
const mockProfile = {
  name: 'രാമൻ നായർ',
  nameEn: 'Raman Nair',
  phone: '+91 9876543210',
  email: 'raman.nair@gmail.com',
  village: 'നെയ്യാറ്റിൻകര',
  panchayat: 'നെയ്യാറ്റിൻകര',
  block: 'തിരുവനന്തപുരം',
  district: 'തിരുവനന്തപുരം',
  plotSize: '2.5 ഏക്കർ',
  farmerType: 'ചെറുകിട കർഷകൻ',
  joinDate: '2023-06-15',
  crops: ['വാഴ', 'തെങ്ങ്', 'കുരുമുളക്', 'ഏലം'],
  seasons: ['മുന്നിൽ മൺസൂൺ', 'തിരികെ മൺസൂൺ'],
  preferences: {
    language: 'ml',
    notifications: true,
    smsAlerts: true,
    emailUpdates: false,
    weatherAlerts: true,
    pestAlerts: true
  }
};

const mockStats = {
  totalQueries: 47,
  resolvedQueries: 42,
  escalations: 3,
  satisfaction: 4.3,
  joinedDays: 207
};

export default function Profile() {
  const { language, t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(mockProfile);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // Save profile logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfile(mockProfile); // Reset to original
  };

  const StatCard = ({ 
    title, 
    value, 
    icon, 
    description 
  }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    description: string;
  }) => (
    <Card className="agricultural-card">
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            {icon}
          </div>
          <div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (showPrivacySettings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
        <div className="max-w-4xl mx-auto py-8">
          <Button 
            variant="outline" 
            onClick={() => setShowPrivacySettings(false)}
            className="mb-6"
          >
            ← {t('back')}
          </Button>
          
          <Card className="agricultural-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Shield className="h-6 w-6" />
                {language === 'ml' ? 'സ്വകാര്യത നിയന്ത്രണങ്ങൾ' : 'Privacy Controls'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Notifications */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  {language === 'ml' ? 'അറിയിപ്പുകൾ' : 'Notifications'}
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                    <div>
                      <Label>{language === 'ml' ? 'പുഷ് അറിയിപ്പുകൾ' : 'Push Notifications'}</Label>
                      <p className="text-sm text-muted-foreground">
                        {language === 'ml' ? 'ആപ്പ് അറിയിപ്പുകൾ സ്വീകരിക്കുക' : 'Receive app notifications'}
                      </p>
                    </div>
                    <Switch 
                      checked={profile.preferences.notifications}
                      onCheckedChange={(checked) => 
                        setProfile(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, notifications: checked }
                        }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                    <div>
                      <Label>{language === 'ml' ? 'SMS അറിയിപ്പുകൾ' : 'SMS Alerts'}</Label>
                      <p className="text-sm text-muted-foreground">
                        {language === 'ml' ? 'അടിയന്തിര അറിയിപ്പുകൾ SMS വഴി' : 'Emergency alerts via SMS'}
                      </p>
                    </div>
                    <Switch 
                      checked={profile.preferences.smsAlerts}
                      onCheckedChange={(checked) => 
                        setProfile(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, smsAlerts: checked }
                        }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                    <div>
                      <Label>{language === 'ml' ? 'കാലാവസ്ഥ അറിയിപ്പുകൾ' : 'Weather Alerts'}</Label>
                      <p className="text-sm text-muted-foreground">
                        {language === 'ml' ? 'കാലാവസ്ഥ മാറ്റങ്ങൾ അറിയിക്കുക' : 'Weather change notifications'}
                      </p>
                    </div>
                    <Switch 
                      checked={profile.preferences.weatherAlerts}
                      onCheckedChange={(checked) => 
                        setProfile(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, weatherAlerts: checked }
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Data Controls */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  {language === 'ml' ? 'ഡാറ്റ നിയന്ത്രണം' : 'Data Controls'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
                    <div className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      <span className="font-medium">
                        {language === 'ml' ? 'ഡാറ്റ ഡൗൺലോഡ്' : 'Download Data'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground text-left">
                      {language === 'ml' 
                        ? 'നിങ്ങളുടെ എല്ലാ ഡാറ്റയും ഡൗൺലോഡ് ചെയ്യുക'
                        : 'Download all your data'
                      }
                    </p>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span className="font-medium">
                        {language === 'ml' ? 'ഡാറ്റ ഉപയോഗം' : 'Data Usage'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground text-left">
                      {language === 'ml' 
                        ? 'ഡാറ്റ എങ്ങനെ ഉപയോഗിക്കുന്നു എന്ന് കാണുക'
                        : 'See how your data is used'
                      }
                    </p>
                  </Button>
                </div>
              </div>
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
              {language === 'ml' ? 'എന്റെ പ്രൊഫൈൽ' : 'My Profile'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'ml' 
                ? 'നിങ്ങളുടെ വിവരങ്ങൾ കാണുകയും എഡിറ്റ് ചെയ്യുകയും ചെയ്യുക'
                : 'View and edit your information'
              }
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setShowPrivacySettings(true)}
              className="flex items-center gap-2"
            >
              <Shield className="h-4 w-4" />
              {language === 'ml' ? 'സ്വകാര്യത' : 'Privacy'}
            </Button>
            {isEditing ? (
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  {t('cancel')}
                </Button>
                <Button onClick={handleSave} className="hero-button">
                  <Save className="h-4 w-4 mr-2" />
                  {t('save')}
                </Button>
              </div>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="hero-button">
                <Edit className="h-4 w-4 mr-2" />
                {t('edit')}
              </Button>
            )}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title={language === 'ml' ? 'മൊത്തം ചോദ്യങ്ങൾ' : 'Total Queries'}
            value={mockStats.totalQueries}
            icon={<User className="h-5 w-5 text-primary" />}
            description={language === 'ml' ? 'ആകെ ചോദിച്ചത്' : 'Asked so far'}
          />
          <StatCard
            title={language === 'ml' ? 'പരിഹാരം കണ്ടത്' : 'Resolved'}
            value={mockStats.resolvedQueries}
            icon={<Sprout className="h-5 w-5 text-success" />}
            description={language === 'ml' ? 'ഉത്തരം കിട്ടിയത്' : 'Successfully resolved'}
          />
          <StatCard
            title={language === 'ml' ? 'സംതൃപ്തി' : 'Satisfaction'}
            value={`${mockStats.satisfaction}/5`}
            icon={<Calendar className="h-5 w-5 text-warning" />}
            description={language === 'ml' ? 'ശരാശരി റേറ്റിംഗ്' : 'Average rating'}
          />
          <StatCard
            title={language === 'ml' ? 'അംഗത്വം' : 'Membership'}
            value={`${mockStats.joinedDays} ദിവസം`}
            icon={<Settings className="h-5 w-5 text-primary" />}
            description={language === 'ml' ? 'അംഗമായിട്ട്' : 'Since joining'}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Personal Information */}
          <Card className="agricultural-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {language === 'ml' ? 'വ്യക്തിഗത വിവരങ്ങൾ' : 'Personal Information'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{language === 'ml' ? 'പേര്' : 'Name'}</Label>
                {isEditing ? (
                  <Input 
                    value={language === 'ml' ? profile.name : profile.nameEn}
                    onChange={(e) => setProfile(prev => ({ 
                      ...prev, 
                      [language === 'ml' ? 'name' : 'nameEn']: e.target.value 
                    }))}
                  />
                ) : (
                  <p className="text-sm p-2 bg-secondary/20 rounded-md">
                    {language === 'ml' ? profile.name : profile.nameEn}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>{language === 'ml' ? 'ഫോൺ' : 'Phone'}</Label>
                {isEditing ? (
                  <Input 
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  />
                ) : (
                  <p className="text-sm p-2 bg-secondary/20 rounded-md">{profile.phone}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>{language === 'ml' ? 'ഇമെയിൽ' : 'Email'}</Label>
                {isEditing ? (
                  <Input 
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  />
                ) : (
                  <p className="text-sm p-2 bg-secondary/20 rounded-md">{profile.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>{language === 'ml' ? 'ഗ്രാമം' : 'Village'}</Label>
                <p className="text-sm p-2 bg-secondary/20 rounded-md">{profile.village}</p>
              </div>
              
              <div className="space-y-2">
                <Label>{language === 'ml' ? 'ജില്ല' : 'District'}</Label>
                <p className="text-sm p-2 bg-secondary/20 rounded-md">{profile.district}</p>
              </div>
            </CardContent>
          </Card>

          {/* Farm Information */}
          <Card className="agricultural-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sprout className="h-5 w-5" />
                {language === 'ml' ? 'കൃഷി വിവരങ്ങൾ' : 'Farm Information'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{language === 'ml' ? 'സ്ഥലത്തിന്റെ വലുപ്പം' : 'Plot Size'}</Label>
                {isEditing ? (
                  <Input 
                    value={profile.plotSize}
                    onChange={(e) => setProfile(prev => ({ ...prev, plotSize: e.target.value }))}
                  />
                ) : (
                  <p className="text-sm p-2 bg-secondary/20 rounded-md">{profile.plotSize}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>{language === 'ml' ? 'കർഷക തരം' : 'Farmer Type'}</Label>
                <p className="text-sm p-2 bg-secondary/20 rounded-md">{profile.farmerType}</p>
              </div>
              
              <div className="space-y-2">
                <Label>{language === 'ml' ? 'വിളകൾ' : 'Crops'}</Label>
                <div className="flex flex-wrap gap-2">
                  {profile.crops.map((crop, index) => (
                    <Badge key={index} variant="secondary">{crop}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>{language === 'ml' ? 'സീസൺ' : 'Seasons'}</Label>
                <div className="flex flex-wrap gap-2">
                  {profile.seasons.map((season, index) => (
                    <Badge key={index} variant="outline">{season}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>{language === 'ml' ? 'അംഗത്വ തീയതി' : 'Join Date'}</Label>
                <p className="text-sm p-2 bg-secondary/20 rounded-md">
                  {new Date(profile.joinDate).toLocaleDateString(language === 'ml' ? 'ml-IN' : 'en-IN')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}