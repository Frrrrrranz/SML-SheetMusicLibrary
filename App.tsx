import React, { useState, useEffect } from 'react';
import { api } from './api';
import { HashRouter, Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { BottomNav } from './components/BottomNav';
import { ComposersScreen } from './screens/ComposersScreen';
import { ComposerDetailScreen } from './screens/ComposerDetailScreen';
import { SearchScreen } from './screens/SearchScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { AuthScreen } from './screens/AuthScreen';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Composer } from './types';


// 主应用内容（需要登录）
const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Lifted state for composers
  const [composers, setComposers] = useState<Composer[]>([]);

  // NOTE: 当路由变化到主页时重新加载数据，确保统计数量正确
  useEffect(() => {
    if (location.pathname === '/') {
      loadComposers();
    }
  }, [location.pathname]);

  const loadComposers = async () => {
    try {
      const data = await api.getComposers();
      setComposers(data);
    } catch (error) {
      console.error('Failed to load composers:', error);
    }
  };

  const handleAddComposer = async (newComposer: Composer): Promise<Composer | null> => {
    try {
      const created = await api.createComposer(newComposer);
      setComposers((prev) => [...prev, created]);
      return created;
    } catch (error) {
      console.error('Failed to create composer:', error);
      return null;
    }
  };

  // NOTE: 这个函数只更新本地状态，不调用 API
  // 实际的数据库操作（如添加/删除作品）已经在 ComposerDetailScreen 中完成
  const handleUpdateComposer = (updatedComposer: Composer) => {
    setComposers((prev) =>
      prev.map(c => c.id === updatedComposer.id ? updatedComposer : c)
    );
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
                onUpdateComposer={handleUpdateComposer}
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

// 认证路由守卫
const AuthGuard: React.FC = () => {
  const { session, loading } = useAuth();

  // 加载中显示 loading 状态
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-oldGold border-t-transparent rounded-full animate-spin" />
          <p className="text-textSub">加载中...</p>
        </div>
      </div>
    );
  }

  // 未登录显示登录页
  if (!session) {
    return <AuthScreen />;
  }

  // 已登录显示主应用
  return <AppContent />;
};

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <HashRouter>
          <AuthGuard />
        </HashRouter>
      </AuthProvider>
      <Analytics />
    </>
  );
};

export default App;