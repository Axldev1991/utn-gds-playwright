import React, { useState } from 'react';
import type { UIVersion } from './types';
import { useAuth } from './hooks/useAuth';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';

export const App: React.FC = () => {
  const { user, isAuthenticated, isLoading, error, login, logout } = useAuth();
  const [uiVersion, setUiVersion] = useState<UIVersion>('v1');

  return (
    <div className={`app-root theme-dark mode-${uiVersion}`}>
      {isAuthenticated && user ? (
        <DashboardPage
          user={user}
          uiVersion={uiVersion}
          onToggleUIVersion={setUiVersion}
          onLogout={logout}
        />
      ) : (
        <LoginPage
          isLoading={isLoading}
          error={error}
          uiVersion={uiVersion}
          onLogin={login}
        />
      )}
    </div>
  );
};

export default App;
