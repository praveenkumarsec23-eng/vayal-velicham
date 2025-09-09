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
    
    // Dashboard
    welcome: 'സ്വാഗതം',
    todaysAdvisories: 'ഇന്നത്തെ ഉപദേശങ്ങൾ',
    urgent: 'അടിയന്തിരം',
    normal: 'സാധാരണം',
    viewMore: 'കൂടുതൽ കാണുക',
    answered: 'ഉത്തരം ലഭിച്ചു',
    pending: 'പ്രതീക്ഷിക്കുന്നു',
    askNewQuestion: 'പുതിയ ചോദ്യം',
    
    // Knowledge
    agriculturalKnowledgeCenter: 'കൃഷി അറിവ് കേന്ദ്രം',
    comprehensiveGuidance: 'കേരള കർഷകർക്കായുള്ള വിശദ കൃഷി ഉപദേശങ്ങൾ',
    searchPlaceholder: 'രോഗം, കീടം, അല്ലെങ്കിൽ വിള തിരയുക...',
    all: 'എല്ലാം',
    diseases: 'രോഗങ്ങൾ',
    pests: 'കീടങ്ങൾ',
    organic: 'ജൈവിക',
    description: 'വിവരണം',
    symptoms: 'ലക്ഷണങ്ങൾ',
    treatment: 'ചികിത്സ',
    prevention: 'പ്രതിരോധം',
    downloadPdf: 'പിഡിഎഫ് ഡൗൺലോഡ്',
    moreInfo: 'കൂടുതൽ വിവരങ്ങൾ',
    noArticlesFound: 'കണ്ടെത്താൻ കഴിഞ്ഞില്ല',
    tryDifferentKeywords: 'വ്ത്യസ്ത കീവേഡുകൾ ഉപയോഗിച്ച് വീണ്ടും ശ്രമിക്കുക',
    
    // Profile
    myProfile: 'എന്റെ പ്രൊഫൈൽ',
    viewAndEditInfo: 'നിങ്ങളുടെ വിവരങ്ങൾ കാണുകയും എഡിറ്റ് ചെയ്യുകയും ചെയ്യുക',
    privacy: 'സ്വകാര്യത',
    personalInformation: 'വ്യക്തിഗത വിവരങ്ങൾ',
    farmInformation: 'കൃഷി വിവരങ്ങൾ',
    name: 'പേര്',
    phone: 'ഫോൺ',
    email: 'ഇമെയിൽ',
    farmerType: 'കർഷക തരം',
    crops: 'വിളകൾ',
    seasons: 'സീസൺ',
    joinDate: 'അംഗത്വ തീയതി',
    totalQueries: 'മൊത്തം ചോദ്യങ്ങൾ',
    resolved: 'പരിഹാരം കണ്ടത്',
    satisfaction: 'സംതൃപ്തി',
    membership: 'അംഗത്വം',
    askedSoFar: 'ആകെ ചോദിച്ചത്',
    successfullyResolved: 'ഉത്തരം കിട്ടിയത്',
    averageRating: 'ശരാശരി റേറ്റിംഗ്',
    sinceJoining: 'അംഗമായിട്ട്',
    days: 'ദിവസം',
    privacyControls: 'സ്വകാര്യത നിയന്ത്രണങ്ങൾ',
    notifications: 'അറിയിപ്പുകൾ',
    pushNotifications: 'പുഷ് അറിയിപ്പുകൾ',
    receiveAppNotifications: 'ആപ്പ് അറിയിപ്പുകൾ സ്വീകരിക്കുക',
    smsAlerts: 'SMS അറിയിപ്പുകൾ',
    emergencyAlertsSms: 'അടിയന്തിര അറിയിപ്പുകൾ SMS വഴി',
    weatherAlerts: 'കാലാവസ്ഥ അറിയിപ്പുകൾ',
    weatherChangeNotifications: 'കാലാവസ്ഥ മാറ്റങ്ങൾ അറിയിക്കുക',
    dataControls: 'ഡാറ്റ നിയന്ത്രണം',
    downloadData: 'ഡാറ്റ ഡൗൺലോഡ്',
    downloadAllData: 'നിങ്ങളുടെ എല്ലാ ഡാറ്റയും ഡൗൺലോഡ് ചെയ്യുക',
    dataUsage: 'ഡാറ്റ ഉപയോഗം',
    seeHowDataUsed: 'ഡാറ്റ എങ്ങനെ ഉപയോഗിക്കുന്നു എന്ന് കാണുക',
    
    // Escalation
    escalationSystem: 'എസ്കലേഷൻ സിസ്റ്റം',
    connectWithOfficers: 'കൃഷി ഓഫീസർമാരുമായി നേരിട്ട് ബന്ധപ്പെടുക',
    newEscalation: 'പുതിയ എസ്കലേഷൻ',
    myEscalations: 'എന്റെ എസ്കലേഷനുകൾ',
    officers: 'ഓഫീസർമാർ',
    selectOfficer: 'ഓഫീസർ തിരഞ്ഞെടുക്കുക',
    available: 'ലഭ്യം',
    busy: 'തിരക്കിൽ',
    createEscalation: 'എസ്കലേഷൻ സൃഷ്ടിക്കുക',
    describeProbleInDetail: 'നിങ്ങളുടെ പ്രശ്നം വിശദമായി വിവരിക്കുക...',
    officer: 'ഓഫീസർ:',
    opened: 'തുറന്നത്',
    inReview: 'പരിശോധനയിൽ',
    closed: 'അടച്ചത്',
    call: 'കോൾ',
    mail: 'മെയിൽ',
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
    
    // Dashboard
    welcome: 'Welcome',
    todaysAdvisories: "Today's Advisories",
    urgent: 'Urgent',
    normal: 'Normal',
    viewMore: 'View More',
    answered: 'Answered',
    pending: 'Pending',
    askNewQuestion: 'Ask New Question',
    
    // Knowledge
    agriculturalKnowledgeCenter: 'Agricultural Knowledge Center',
    comprehensiveGuidance: 'Comprehensive agricultural guidance for Kerala farmers',
    searchPlaceholder: 'Search for diseases, pests, or crops...',
    all: 'All',
    diseases: 'Diseases',
    pests: 'Pests',
    organic: 'Organic',
    description: 'Description',
    symptoms: 'Symptoms',
    treatment: 'Treatment',
    prevention: 'Prevention',
    downloadPdf: 'Download PDF',
    moreInfo: 'More Info',
    noArticlesFound: 'No Articles Found',
    tryDifferentKeywords: 'Try searching with different keywords',
    
    // Profile
    myProfile: 'My Profile',
    viewAndEditInfo: 'View and edit your information',
    privacy: 'Privacy',
    personalInformation: 'Personal Information',
    farmInformation: 'Farm Information',
    name: 'Name',
    phone: 'Phone',
    email: 'Email',
    farmerType: 'Farmer Type',
    crops: 'Crops',
    seasons: 'Seasons',
    joinDate: 'Join Date',
    totalQueries: 'Total Queries',
    resolved: 'Resolved',
    satisfaction: 'Satisfaction',
    membership: 'Membership',
    askedSoFar: 'Asked so far',
    successfullyResolved: 'Successfully resolved',
    averageRating: 'Average rating',
    sinceJoining: 'Since joining',
    days: 'days',
    privacyControls: 'Privacy Controls',
    notifications: 'Notifications',
    pushNotifications: 'Push Notifications',
    receiveAppNotifications: 'Receive app notifications',
    smsAlerts: 'SMS Alerts',
    emergencyAlertsSms: 'Emergency alerts via SMS',
    weatherAlerts: 'Weather Alerts',
    weatherChangeNotifications: 'Weather change notifications',
    dataControls: 'Data Controls',
    downloadData: 'Download Data',
    downloadAllData: 'Download all your data',
    dataUsage: 'Data Usage',
    seeHowDataUsed: 'See how your data is used',
    
    // Escalation
    escalationSystem: 'Escalation System',
    connectWithOfficers: 'Connect directly with agriculture officers',
    newEscalation: 'New Escalation',
    myEscalations: 'My Escalations',
    officers: 'Officers',
    selectOfficer: 'Select Officer',
    available: 'Available',
    busy: 'Busy',
    createEscalation: 'Create Escalation',
    describeProbleInDetail: 'Describe your problem in detail...',
    officer: 'Officer:',
    opened: 'Opened',
    inReview: 'In Review',
    closed: 'Closed',
    call: 'Call',
    mail: 'Mail',
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