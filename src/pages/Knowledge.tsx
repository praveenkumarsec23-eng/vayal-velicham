import React, { useState } from 'react';
import { 
  Search,
  BookOpen,
  Filter,
  Download,
  ExternalLink,
  Bug,
  Sprout,
  Leaf,
  Clock,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import knowledgeImage from '@/assets/kerala-crops-knowledge.jpg';

// Mock knowledge articles
const mockArticles = [
  {
    id: 1,
    title: 'വാഴ ഇല പുള്ളി രോഗം - Sigatoka',
    titleEn: 'Banana Leaf Spot Disease - Sigatoka',
    category: 'diseases',
    crop: 'വാഴ',
    summary: 'വാഴയിലെ ഏറ്റവും സാധാരണ ഫംഗസ് രോഗം. ഇലകളിൽ മഞ്ഞ പുള്ളികൾ പ്രത്യക്ഷപ്പെടുന്നു.',
    summaryEn: 'Most common fungal disease in banana. Yellow spots appear on leaves.',
    severity: 'high',
    readTime: '5 മിനിറ്റ്',
    rating: 4.5,
    date: '2024-01-05'
  },
  {
    id: 2,
    title: 'തെങ്ങിലെ കീടങ്ങൾ നിയന്ത്രിക്കാൻ',
    titleEn: 'Controlling Coconut Pests',
    category: 'pests',
    crop: 'തെങ്ങ്',
    summary: 'തെങ്ങിലെ പ്രധാന കീടങ്ങളും അവയുടെ നിയന്ത്രണ മാർഗ്ഗങ്ങളും.',
    summaryEn: 'Major pests in coconut and their control measures.',
    severity: 'medium',
    readTime: '7 മിനിറ്റ്',
    rating: 4.2,
    date: '2024-01-03'
  },
  {
    id: 3,
    title: 'ജൈവിക കൃഷി രീതികൾ',
    titleEn: 'Organic Farming Methods',
    category: 'organic',
    crop: 'എല്ലാം',
    summary: 'രാസവളങ്ങൾ ഇല്ലാതെ കൃഷി ചെയ്യാനുള്ള പ്രായോഗിക മാർഗ്ഗങ്ങൾ.',
    summaryEn: 'Practical ways to farm without chemical fertilizers.',
    severity: 'low',
    readTime: '10 മിനിറ്റ്',
    rating: 4.8,
    date: '2024-01-01'
  }
];

const categories = [
  { key: 'all', labelMl: 'എല്ലാം', labelEn: 'All', icon: BookOpen },
  { key: 'diseases', labelMl: 'രോഗങ്ങൾ', labelEn: 'Diseases', icon: Bug },
  { key: 'pests', labelMl: 'കീടങ്ങൾ', labelEn: 'Pests', icon: Leaf },
  { key: 'organic', labelMl: 'ജൈവിക', labelEn: 'Organic', icon: Sprout }
];

export default function Knowledge() {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = searchQuery === '' || 
      (language === 'ml' ? article.title : article.titleEn)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-destructive bg-destructive/10';
      case 'medium': return 'text-warning bg-warning/10';
      default: return 'text-success bg-success/10';
    }
  };

  const getSeverityLabel = (severity: string) => {
    const labels = {
      ml: { high: 'അടിയന്തിരം', medium: 'മധ്യമം', low: 'സാധാരണം' },
      en: { high: 'Urgent', medium: 'Medium', low: 'Normal' }
    };
    return labels[language][severity as keyof typeof labels.ml];
  };

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
        <div className="max-w-4xl mx-auto py-8">
          <Button 
            variant="outline" 
            onClick={() => setSelectedArticle(null)}
            className="mb-6"
          >
            ← {t('back')}
          </Button>
          
          <Card className="agricultural-card">
            <CardHeader>
              <CardTitle className="text-2xl">
                {language === 'ml' ? selectedArticle.title : selectedArticle.titleEn}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <Badge className={getSeverityColor(selectedArticle.severity)}>
                  {getSeverityLabel(selectedArticle.severity)}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {selectedArticle.readTime}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {selectedArticle.rating}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <img 
                src={knowledgeImage} 
                alt="Knowledge"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              
              <div className="prose prose-sm max-w-none">
                <h3>{t('description')}</h3>
                <p>
                  {language === 'ml' ? selectedArticle.summary : selectedArticle.summaryEn}
                </p>
                
                <h3>{t('symptoms')}</h3>
                <ul>
                  <li>{language === 'ml' ? 'ഇലകളിൽ മഞ്ഞ പുള്ളികൾ' : 'Yellow spots on leaves'}</li>
                  <li>{language === 'ml' ? 'ഇലകൾ വാടുന്നു' : 'Leaves wilt'}</li>
                  <li>{language === 'ml' ? 'വളർച്ച മന്ദഗതിയിലാകുന്നു' : 'Stunted growth'}</li>
                </ul>
                
                <h3>{t('treatment')}</h3>
                <ul>
                  <li>{language === 'ml' ? 'Propiconazole സ്പ്രേ ചെയ്യുക' : 'Spray Propiconazole'}</li>
                  <li>{language === 'ml' ? '15 ദിവസത്തിലൊരിക്കൽ' : 'Once every 15 days'}</li>
                  <li>{language === 'ml' ? 'രോഗബാധിത ഇലകൾ നീക്കം ചെയ്യുക' : 'Remove infected leaves'}</li>
                </ul>
                
                <h3>{t('prevention')}</h3>
                <ul>
                  <li>{language === 'ml' ? 'ശരിയായ അകലം പാലിക്കുക' : 'Maintain proper spacing'}</li>
                  <li>{language === 'ml' ? 'മികച്ച വറ്റൽ ഉറപ്പാക്കുക' : 'Ensure good drainage'}</li>
                  <li>{language === 'ml' ? 'രോഗപ്രതിരോധശേഷിയുള്ള ഇനങ്ങൾ' : 'Use resistant varieties'}</li>
                </ul>
              </div>
              
              <div className="flex gap-3 mt-8">
                <Button className="hero-button flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  {t('downloadPdf')}
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  {t('moreInfo')}
                </Button>
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
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-primary mb-4">
            {t('agriculturalKnowledgeCenter')}
          </h1>
          <p className="text-muted-foreground">
            {t('comprehensiveGuidance')}
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="agricultural-card mb-6 animate-slide-up">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Button
                    key={category.key}
                    variant={selectedCategory === category.key ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.key)}
                    className="flex items-center gap-2"
                  >
                    <category.icon className="h-4 w-4" />
                    {t(category.key === 'all' ? 'all' : category.key)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Card 
              key={article.id} 
              className="agricultural-card cursor-pointer hover:shadow-lg transition-all duration-300"
              onClick={() => setSelectedArticle(article)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg leading-tight">
                    {language === 'ml' ? article.title : article.titleEn}
                  </CardTitle>
                  <Badge className={getSeverityColor(article.severity)} variant="secondary">
                    {getSeverityLabel(article.severity)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {language === 'ml' ? article.summary : article.summaryEn}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {article.rating}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {article.crop}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <Card className="agricultural-card text-center py-12">
            <CardContent>
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {t('noArticlesFound')}
              </h3>
              <p className="text-muted-foreground">
                {t('tryDifferentKeywords')}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}