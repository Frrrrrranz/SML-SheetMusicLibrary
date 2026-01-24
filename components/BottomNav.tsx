import React from 'react';
import { Library, Search, Settings } from 'lucide-react';
import { NavItem } from '../types';

interface BottomNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'composers', label: 'Composers', icon: Library, path: '/' },
  { id: 'search', label: 'Search', icon: Search, path: '/search' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
];

export const BottomNav: React.FC<BottomNavProps> = ({ currentPath, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white/95 backdrop-blur-lg pb-[env(safe-area-inset-bottom)]">
      <div className="flex h-16 items-center justify-around px-2">
        {NAV_ITEMS.map((item) => {
          // Simple active check: strictly equal or (for root) strictly root
          const isActive = 
            item.path === '/' 
              ? currentPath === '/' || currentPath.startsWith('/composer')
              : currentPath.startsWith(item.path);
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.path)}
              className="group flex flex-1 flex-col items-center justify-center gap-1 focus:outline-none"
            >
              <item.icon
                strokeWidth={isActive ? 2.5 : 2}
                className={`h-6 w-6 transition-colors duration-200 ${
                  isActive ? 'text-oldGold' : 'text-gray-400 group-hover:text-gray-600'
                }`}
              />
              <span
                className={`text-[10px] font-medium tracking-wide transition-colors duration-200 ${
                  isActive ? 'text-oldGold' : 'text-gray-400 group-hover:text-gray-600'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};