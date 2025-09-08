import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  MessageSquare, 
  BookOpen, 
  AlertTriangle, 
  BarChart3, 
  User, 
  Languages,
  Menu,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const navigationItems = [
  { path: '/', icon: Home, labelKey: 'dashboard' },
  { path: '/query', icon: MessageSquare, labelKey: 'query' },
  { path: '/knowledge', icon: BookOpen, labelKey: 'knowledge' },
  { path: '/escalation', icon: AlertTriangle, labelKey: 'escalation' },
  { path: '/analytics', icon: BarChart3, labelKey: 'analytics' },
  { path: '/profile', icon: User, labelKey: 'profile' },
];

export function Layout() {
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 h-16">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          <h1 className="text-lg font-semibold text-primary">
            കൃഷി ഓഫീസർ
          </h1>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-xs"
            >
              <Languages className="h-4 w-4 mr-1" />
              {language === 'ml' ? 'EN' : 'മലയാളം'}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex flex-col h-full">
            {/* Desktop Header */}
            <div className="hidden lg:flex items-center justify-between p-6 border-b border-border">
              <div>
                <h1 className="text-xl font-bold text-primary">
                  {language === 'ml' ? 'ഡിജിറ്റൽ കൃഷി ഓഫീസർ' : 'Digital Krishi Officer'}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {language === 'ml' ? 'കേരള കർഷകർക്കായി' : 'For Kerala Farmers'}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-xs"
              >
                <Languages className="h-4 w-4 mr-1" />
                {language === 'ml' ? 'EN' : 'മലയാളം'}
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                    )}
                  >
                    <item.icon className={cn(
                      "h-5 w-5",
                      isActive ? "text-primary-foreground" : "text-muted-foreground"
                    )} />
                    {t(item.labelKey)}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-border">
              <div className="text-xs text-muted-foreground text-center">
                {language === 'ml' 
                  ? 'കേരള കൃഷി വകുപ്പ്' 
                  : 'Kerala Agriculture Department'
                }
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen lg:min-h-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}