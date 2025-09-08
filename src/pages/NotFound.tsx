import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { language, t } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">
          {language === 'ml' ? 'ക്ഷമിക്കണം! പേജ് കണ്ടെത്താൻ കഴിഞ്ഞില്ല' : 'Oops! Page not found'}
        </p>
        <Link to="/">
          <button className="hero-button">
            {language === 'ml' ? 'ഹോം പേജിലേക്ക് മടങ്ങുക' : 'Return to Home'}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
