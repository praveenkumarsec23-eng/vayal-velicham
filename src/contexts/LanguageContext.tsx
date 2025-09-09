import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ml' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  ml: {
    // Navigation
    dashboard: 'ഡാഷ്ബോർഡ്',
    query: 'ചോദ്യം',
    knowledge: 'അറിവ്',
    escalation: 'സഹായം',
    analytics: 'വിശകലനം',
    profile: 'പ്രൊഫൈൽ',
    
    // Common
    search: 'തിരയുക',
    back: 'തിരികെ',
    submit: 'സമർപ്പിക്കുക',
    cancel: 'റദ്ദാക്കുക',
    save: 'സേവ് ചെയ്യുക',
    edit: 'എഡിറ്റ് ചെയ്യുക',
    delete: 'ഇല്ലാതാക്കുക',
    loading: 'ലോഡ് ചെയ്യുന്നു...',
    
    // Dashboard
    welcomeMessage: 'സ്വാഗതം, {name}',
    todayIs: 'ഇന്ന്',
    weather: 'കാലാവസ്ഥ',
    quickActions: 'വേഗത്തിലുള്ള പ്രവർത്തനങ്ങൾ',
    askQuestion: 'ചോദ്യം ചോദിക്കുക',
    uploadPhoto: 'ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക',
    recordVoice: 'ശബ്ദം റെക്കോർഡ് ചെയ്യുക',
    recentQueries: 'സമീപകാല ചോദ്യങ്ങൾ',
    
    // Query
    askQuestionPlaceholder: 'എന്റെ വാഴയിലെ ഇലകളിൽ പുള്ളി. ഏത് കീടനാശിനി ഉപയോഗിക്കണം?',
    contextChips: 'സാഹചര്യം',
    location: 'സ്ഥലം',
    crop: 'വിള',
    season: 'സീസൺ',
    
    // Knowledge
    searchKnowledge: 'അറിവ് തിരയുക',
    cropDiseases: 'വിള രോഗങ്ങൾ',
    pestControl: 'കീട നിയന്ത്രണം',
    organicMethods: 'ജൈവിക രീതികൾ',
    
    // Profile
    farmerName: 'കർഷകന്റെ പേര്',
    phoneNumber: 'ഫോൺ നമ്പർ',
    village: 'ഗ്രാമം',
    district: 'ജില്ല',
    plotSize: 'സ്ഥലത്തിന്റെ വലുപ്പം',
    
    // Query specific
    yourAgriculturalQuery: 'നിങ്ങളുടെ കൃഷി ചോദ്യം',
    askQuestionDescription: 'ടെക്സ്റ്റ്, ഫോട്ടോ അല്ലെങ്കിൽ ശബ്ദം വഴി ചോദ്യം ചോദിക്കാം',
    recording: 'റെക്കോർഡ് ചെയ്യുന്നു...',
    stop: 'നിർത്തുക',
    voice: 'ശബ്ദം',
    photo: 'ഫോട്ടോ',
    exampleQuestions: 'ഉദാഹരണ ചോദ്യങ്ങൾ:',
    aiResponse: 'AI ഉത്തരം',
    moreDetails: 'കൂടുതൽ വിവരങ്ങൾ',
    contactOfficer: 'ഓഫീസറിനെ ബന്ധപ്പെടുക',
  },
  en: {
    // Navigation
    dashboard: 'Dashboard',
    query: 'Query',
    knowledge: 'Knowledge',
    escalation: 'Escalation',
    analytics: 'Analytics',
    profile: 'Profile',
    
    // Common
    search: 'Search',
    back: 'Back',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    loading: 'Loading...',
    
    // Dashboard
    welcomeMessage: 'Welcome, {name}',
    todayIs: 'Today is',
    weather: 'Weather',
    quickActions: 'Quick Actions',
    askQuestion: 'Ask Question',
    uploadPhoto: 'Upload Photo',
    recordVoice: 'Record Voice',
    recentQueries: 'Recent Queries',
    
    // Query
    askQuestionPlaceholder: 'My banana leaves have spots. Which pesticide should I use?',
    contextChips: 'Context',
    location: 'Location',
    crop: 'Crop',
    season: 'Season',
    
    // Knowledge
    searchKnowledge: 'Search Knowledge',
    cropDiseases: 'Crop Diseases',
    pestControl: 'Pest Control',
    organicMethods: 'Organic Methods',
    
    // Profile
    farmerName: 'Farmer Name',
    phoneNumber: 'Phone Number',
    village: 'Village',
    district: 'District',
    plotSize: 'Plot Size',
    
    // Query specific
    yourAgriculturalQuery: 'Your Agricultural Query',
    askQuestionDescription: 'Ask your question via text, photo, or voice',
    recording: 'Recording...',
    stop: 'Stop',
    voice: 'Voice',
    photo: 'Photo',
    exampleQuestions: 'Example Questions:',
    aiResponse: 'AI Response',
    moreDetails: 'More Details',
    contactOfficer: 'Contact Officer',
  },
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ml');

  useEffect(() => {
    const saved = localStorage.getItem('preferred-language') as Language;
    if (saved && (saved === 'ml' || saved === 'en')) {
      setLanguage(saved);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'ml' ? 'en' : 'ml';
    setLanguage(newLang);
    localStorage.setItem('preferred-language', newLang);
  };

  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      <div className={language === 'ml' ? 'font-malayalam' : 'font-inter'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}