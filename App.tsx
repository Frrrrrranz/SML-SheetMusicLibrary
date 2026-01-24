import React, { useState, useEffect } from 'react';
import { api } from './api';
import { HashRouter, Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import { BottomNav } from './components/BottomNav';
import { ComposersScreen } from './screens/ComposersScreen';
import { ComposerDetailScreen } from './screens/ComposerDetailScreen';
import { SearchScreen } from './screens/SearchScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { COMPOSERS } from './constants';
import { Composer } from './types';

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Lifted state for composers
  const [composers, setComposers] = useState<Composer[]>([]);

  useEffect(() => {
    loadComposers();
  }, []);

  const loadComposers = async () => {
    try {
      const data = await api.getComposers();
      setComposers(data);
    } catch (error) {
      console.error('Failed to load composers:', error);
    }
  };

  const handleAddComposer = async (newComposer: Composer) => {
    try {
      const created = await api.createComposer(newComposer);
      setComposers((prev) => [...prev, created]);
    } catch (error) {
      console.error('Failed to create composer:', error);
    }
  };

  const handleUpdateComposer = async (updatedComposer: Composer) => {
    try {
      const updated = await api.updateComposer(updatedComposer.id, updatedComposer);
      setComposers((prev) =>
        prev.map(c => c.id === updated.id ? updated : c)
      );
    } catch (error) {
      console.error('Failed to update composer:', error);
    }
  };

  const handleDeleteComposer = async (id: string) => {
    try {
      await api.deleteComposer(id);
      setComposers((prev) => prev.filter(c => c.id !== id));
      navigate('/');
    } catch (error) {
      console.error('Failed to delete composer:', error);
    }
  };

  return (
    <div className="flex justify-center bg-[#E5E5E5]">
      {/* 
        Restricting width to simulate mobile app experience on desktop, 
        but full width on mobile. 
      */}
      <div className="w-full max-w-[480px] bg-background min-h-screen shadow-2xl relative overflow-hidden">
        <Routes>
          <Route
            path="/"
            element={
              <ComposersScreen
                composers={composers}
                onComposerSelect={(id) => navigate(`/composer/${id}`)}
                onAddComposer={handleAddComposer}
              />
            }
          />
          <Route
            path="/search"
            element={<SearchScreen composers={composers} />}
          />
          <Route
            path="/settings"
            element={<SettingsScreen />}
          />
          {/* Detail Routes */}
          <Route
            path="/composer/:id"
            element={
              <DetailWrapper
                composers={composers}
                onUpdateComposer={handleUpdateComposer}
                onDeleteComposer={handleDeleteComposer}
              />
            }
          />
        </Routes>

        {/* Conditionally render Nav based on path */}
        {!location.pathname.includes('/composer/') && (
          <BottomNav
            currentPath={location.pathname}
            onNavigate={(path) => navigate(path)}
          />
        )}
      </div>
    </div>
  );
};

// Wrapper to extract params and pass composers and update handler
const DetailWrapper = ({
  composers,
  onUpdateComposer,
  onDeleteComposer
}: {
  composers: Composer[],
  onUpdateComposer: (c: Composer) => void,
  onDeleteComposer: (id: string) => void
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  return (
    <ComposerDetailScreen
      composerId={id || ''}
      composers={composers}
      onUpdateComposer={onUpdateComposer}
      onDeleteComposer={onDeleteComposer}
      onBack={() => navigate(-1)}
    />
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;