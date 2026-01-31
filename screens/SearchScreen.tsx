import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Landmark, Mic2, Music2, Feather, ChevronLeft, ChevronRight, X, Library } from 'lucide-react';
import { PERIODS, INSTRUMENTS, GENRES } from '../constants';
import { Composer } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

type Category = 'Periods' | 'Instruments' | 'Genres' | 'Composers';

export const SearchScreen: React.FC<SearchScreenProps> = ({ composers }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const CATEGORIES: { label: Category; key: keyof typeof t.search.categories; icon: React.FC<any> }[] = [
    { label: 'Periods', key: 'periods', icon: Landmark },
    { label: 'Instruments', key: 'instruments', icon: Mic2 },
    { label: 'Genres', key: 'genres', icon: Music2 },
    { label: 'Composers', key: 'composers', icon: Feather },
  ];

  // --- Filtering Logic ---
  const filteredComposers = searchQuery
    ? composers.filter(c => {
      const query = searchQuery.toLowerCase();
      // Match Name
      if (c.name.toLowerCase().includes(query)) return true;
      // Match Period
      if (c.period.toLowerCase().includes(query)) return true;
      // Match Works (Title usually includes genre/instrument)
      if (c.works.some(w => w.title.toLowerCase().includes(query))) return true;

      return false;
    })
    : composers;

  const handleBack = () => {
    setActiveCategory(null);
    setSearchQuery('');
  };

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category);
  };

  const handleComposerClick = (id: string) => {
    navigate(`/composer/${id}`);
  };

  const handleTermClick = (term: string) => {
    setSearchQuery(term);
    setActiveCategory(null);
  };

  // --- Views ---

  const renderSearchHeader = () => (
    <>
      <header className="px-4 pt-12 pb-2">
        <h1 className="text-4xl font-bold tracking-tight text-textMain font-serif">{t.search.title}</h1>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-3 sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
        <div className="relative flex w-full items-center">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-textSub">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full rounded-xl border-0 py-2.5 pl-10 pr-10 text-base text-textMain bg-[#e8e6e1] placeholder:text-[#8a8470] focus:ring-2 focus:ring-oldGold/50 focus:bg-white transition-all duration-200 ease-in-out font-sans"
            placeholder={t.search.placeholder}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-textSub hover:text-textMain"
            >
              <X size={16} fill="currentColor" />
            </button>
          )}
        </div>
      </div>
    </>
  );

  const getCategoryTitle = (category: Category) => {
    switch (category) {
      case 'Periods': return t.search.categories.periods;
      case 'Instruments': return t.search.categories.instruments;
      case 'Genres': return t.search.categories.genres;
      case 'Composers': return t.search.categories.composers;
      default: return category;
    }
  }

  const renderCategoryHeader = (title: string) => (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-gray-100">
      <div className="px-4 pt-12 pb-4 flex items-center">
        <button
          onClick={handleBack}
          className="flex items-center text-oldGold font-semibold -ml-2 pr-4 active:opacity-60 transition-opacity"
        >
          <ChevronLeft size={28} />
          <span className="text-base">{t.search.title}</span>
        </button>
      </div>
      <h1 className="px-4 pb-4 text-3xl font-bold tracking-tight text-textMain font-serif animate-in fade-in slide-in-from-left-2 duration-300">
        {title}
      </h1>
    </div>
  );

  // --- Sub-Screens ---

  const renderComposersList = () => (
    <div className="bg-background min-h-screen pb-24">
      {renderCategoryHeader(t.search.categories.composers)}
      <div className="divide-y divide-gray-100 pl-4">
        {composers.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-20 pr-4">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <Library size={32} />
            </div>
            <p className="text-lg font-serif font-bold text-textMain">{t.search.noComposers}</p>
            <p className="text-sm text-textSub mt-1">{t.search.uploadPrompt}</p>
          </div>
        ) : (
          composers.map((composer) => (
            <div
              key={composer.id}
              onClick={() => handleComposerClick(composer.id)}
              className="flex items-center gap-4 py-3 pr-4 cursor-pointer hover:bg-gray-50 transition-colors active:bg-gray-100"
            >
              <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 shadow-sm shrink-0">
                <img src={composer.image} className="w-full h-full object-cover grayscale sepia-[.3] contrast-[1.1] opacity-90 mix-blend-multiply" alt={composer.name} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-bold text-textMain font-serif truncate">{composer.name}</p>
                <p className="text-xs text-textSub font-sans uppercase tracking-wider mt-0.5">{composer.period}</p>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderSimpleList = (title: string, items: string[]) => (
    <div className="bg-background min-h-screen pb-24">
      {renderCategoryHeader(title)}
      <div className="divide-y divide-gray-100 pl-4">
        {items.map((item) => (
          <div
            key={item}
            onClick={() => handleTermClick(item)}
            className="flex items-center justify-between py-4 pr-4 cursor-pointer hover:bg-gray-50 transition-colors active:bg-gray-100"
          >
            <span className="text-base font-medium text-textMain font-serif">{item}</span>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );

  const renderPeriodsList = () => (
    <div className="bg-background min-h-screen pb-24">
      {renderCategoryHeader(t.search.categories.periods)}
      <div className="divide-y divide-gray-100 pl-4">
        {PERIODS.map((period) => (
          <div
            key={period.name}
            onClick={() => handleTermClick(period.name)}
            className="flex items-center justify-between py-4 pr-4 cursor-pointer hover:bg-gray-50 transition-colors active:bg-gray-100"
          >
            <div>
              <p className="text-base font-medium text-textMain font-serif">{period.name}</p>
              <p className="text-xs text-textSub font-sans mt-0.5">{period.range}</p>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );

  // --- Main Render Logic ---

  if (activeCategory === 'Composers') return renderComposersList();
  if (activeCategory === 'Periods') return renderPeriodsList();
  if (activeCategory === 'Instruments') return renderSimpleList(t.search.categories.instruments, INSTRUMENTS);
  if (activeCategory === 'Genres') return renderSimpleList(t.search.categories.genres, GENRES);

  return (
    <div className="min-h-screen bg-background pb-24">
      {renderSearchHeader()}

      {/* Main Content (Grid or Search Results) */}
      <div className="px-4 py-4">
        {searchQuery ? (
          // Search Results View
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 pl-1">{t.search.topResults}</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
              {filteredComposers.length > 0 ? (
                filteredComposers.map(c => (
                  <div
                    key={c.id}
                    onClick={() => handleComposerClick(c.id)}
                    className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <img src={c.image} className="h-10 w-10 rounded-full object-cover grayscale sepia-[.3] contrast-[1.1] opacity-90 mix-blend-multiply" alt={c.name} />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-textMain font-serif">{c.name}</p>
                      <p className="text-xs text-textSub">
                        {c.name.toLowerCase().includes(searchQuery.toLowerCase()) ? t.search.type.composer :
                          (c.period.toLowerCase().includes(searchQuery.toLowerCase()) ? c.period : t.search.type.work)
                        }
                      </p>
                    </div>
                    <ChevronRight size={16} className="text-gray-300" />
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-400 font-serif italic">
                  {t.search.noResults.replace('{query}', searchQuery)}
                </div>
              )}
            </div>
          </div>
        ) : (
          // Category Grid View
          <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-300">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => handleCategoryClick(cat.label)}
                className="group flex flex-col items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white p-6 hover:bg-[#fcfbf9] active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <cat.icon
                  size={32}
                  className="text-textMain opacity-80 group-hover:opacity-100 group-hover:text-oldGold transition-colors"
                  strokeWidth={1.5}
                />
                <span className="text-lg font-semibold leading-tight text-textMain font-sans">{t.search.categories[cat.key]}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface SearchScreenProps {
  composers: Composer[];
}