import React, { useState } from 'react';
import { 
  MessageSquare, 
  Camera, 
  Mic, 
  Send,
  Image as ImageIcon,
  X,
  MapPin,
  Sprout,
  Calendar,
  MicOff,
  Upload,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

// Mock context data
const mockContext = {
  location: 'തിരുവനന്തപുരം',
  crop: 'വാഴ',
  season: 'മൺസൂൺ',
  stage: 'വളർച്ച'
};

const exampleQueries = {
  ml: [
    'എന്റെ വാഴയിൽ ഇലയിൽ പുള്ളി കാണുന്നു',
    'തെങ്ങിന് എന്ത് വളം ഇടണം?',
    'കുരുമുളകിന്റെ രോഗം എങ്ങനെ മാറ്റാം?',
    'മഴക്കാലത്ത് വിത്ത് വിതയ്ക്കാമോ?'
  ],
  en: [
    'I see spots on my banana leaves',
    'What fertilizer should I use for coconut?',
    'How to treat pepper plant disease?',
    'Can I sow seeds during monsoon?'
  ]
};

export default function Query() {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [contextChips, setContextChips] = useState(mockContext);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const handleSubmitQuery = async () => {
    if (!query.trim() && !selectedImage) return;
    
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const mockResponse = language === 'ml' 
        ? `**നിഗമനം**: നിങ്ങളുടെ വാഴയിലെ ഇലകളിലെ പുള്ളികൾ Sigatoka രോഗത്തിന്റെ ലക്ഷണമാണ്.

**വിശദാംശങ്ങൾ**: ഇത് ഒരു ഫംഗസ് രോഗമാണ്. ഈർപ്പമുള്ള കാലാവസ്ഥയിൽ വ്യാപിക്കുന്നു.

**മാത്രയും ഇടവേളയും**: 
- Propiconazole 25% EC - 1ml/ലിറ്റർ വെള്ളത്തിൽ
- 15 ദിവസത്തിലൊരിക്കൽ സ്പ്രേ ചെയ്യുക

**സുരക്ഷാ നിർദ്ദേശങ്ങൾ**: കയ്യുറയും മാസ്കും ധരിച്ച് സ്പ്രേ ചെയ്യുക. വിളവെടുപ്പിന് 15 ദിവസം മുമ്പ് സ്പ്രേ ചെയ്യരുത്.`
        : `**Conclusion**: The spots on your banana leaves are symptoms of Sigatoka disease.

**Details**: This is a fungal disease that spreads in humid weather conditions.

**Dosage & Interval**: 
- Propiconazole 25% EC - 1ml/liter water
- Spray once every 15 days

**Safety Instructions**: Use gloves and mask while spraying. Do not spray 15 days before harvest.`;
      
      setAiResponse(mockResponse);
      setIsLoading(false);
    }, 2000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording simulation
      setTimeout(() => {
        setIsRecording(false);
        setQuery(language === 'ml' 
          ? 'എന്റെ വാഴയിൽ ഇലയിൽ പുള്ളി കാണുന്നു'
          : 'I see spots on my banana leaves'
        );
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="max-w-4xl mx-auto py-8">
        
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-primary mb-4">
            {t('yourAgriculturalQuery')}
          </h1>
          <p className="text-muted-foreground">
            {t('askQuestionDescription')}
          </p>
        </div>

        {/* Context Chips */}
        <Card className="agricultural-card mb-6 animate-slide-up">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="h-5 w-5" />
              {t('contextChips')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Badge className="context-chip flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {contextChips.location}
              </Badge>
              <Badge className="context-chip flex items-center gap-1">
                <Sprout className="h-3 w-3" />
                {contextChips.crop}
              </Badge>
              <Badge className="context-chip flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {contextChips.season}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Query Input */}
        <Card className="agricultural-card mb-6">
          <CardContent className="p-6">
            <div className="space-y-4">
              
              {/* Text Input */}
              <div className="relative">
                <Textarea
                  placeholder={t('askQuestionPlaceholder')}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="min-h-32 text-base resize-none pr-12"
                  disabled={isRecording}
                />
                {isRecording && (
                  <div className="absolute inset-0 bg-primary/5 rounded-md flex items-center justify-center">
                  <div className="flex items-center gap-2 text-primary">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce-gentle" />
                    <span>{t('recording')}</span>
                  </div>
                  </div>
                )}
              </div>

              {/* Image Preview */}
              {selectedImage && (
                <div className="relative inline-block">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Uploaded"
                    className="w-24 h-24 object-cover rounded-lg border-2 border-border"
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-6 w-6"
                    onClick={() => setSelectedImage(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant={isRecording ? "destructive" : "outline"}
                  onClick={toggleRecording}
                  className="flex items-center gap-2"
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  {isRecording ? t('stop') : t('voice')}
                </Button>

                <label htmlFor="image-upload" className="cursor-pointer">
                  <Button variant="outline" className="flex items-center gap-2" asChild>
                    <span>
                      <Camera className="h-4 w-4" />
                      {t('photo')}
                    </span>
                  </Button>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />

                <div className="flex-1" />

                <Button
                  onClick={handleSubmitQuery}
                  disabled={(!query.trim() && !selectedImage) || isLoading}
                  className="hero-button flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  {isLoading ? t('loading') : t('submit')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Example Queries */}
        <Card className="agricultural-card mb-6">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              {t('exampleQuestions')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exampleQueries[language].map((example, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="text-left justify-start h-auto p-3 whitespace-normal"
                  onClick={() => setQuery(example)}
                >
                  <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{example}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Response */}
        {aiResponse && (
          <Card className="agricultural-card animate-fade-in">
            <CardHeader>
              <CardTitle className="text-lg text-primary flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                {t('aiResponse')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-line text-foreground">
                  {aiResponse}
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" className="flex-1">
                  {t('moreDetails')}
                </Button>
                <Button variant="outline" className="flex-1">
                  {t('contactOfficer')}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}