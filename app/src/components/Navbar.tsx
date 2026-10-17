import React from 'react';
import type { User, UIVersion } from '../types';

interface NavbarProps {
  user: User | null;
  uiVersion: UIVersion;
  onToggleUIVersion: (version: UIVersion) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  uiVersion,
  onToggleUIVersion,
  onLogout,
}) => {
  return (
    <header className="navbar" role="banner">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="brand-badge">GDS</span>
          <h1 className="brand-title">TaskFlow</h1>
          <span className="brand-subtitle">SPA Testing Suite</span>
        </div>

        <div className="navbar-controls">
          {/* Selector de versión de UI para demostración de QA Adaptativo */}
          <div className="version-switch" role="group" aria-label="Selector de versión de interfaz">
            <span className="version-label">Modo UI:</span>
            <button
              type="button"
              className={`version-btn ${uiVersion === 'v1' ? 'active' : ''}`}
              onClick={() => onToggleUIVersion('v1')}
              aria-pressed={uiVersion === 'v1'}
              title="v1: Selectores semánticos y convencionales estándar"
            >
              v1 (Estándar)
            </button>
            <button
              type="button"
              className={`version-btn ${uiVersion === 'v2' ? 'active' : ''}`}
              onClick={() => onToggleUIVersion('v2')}
              aria-pressed={uiVersion === 'v2'}
              title="v2: DOM y clases mutadas para prueba de QA Adaptativo"
            >
              v2 (Rediseño Alterado)
            </button>
          </div>

          {/* Botón de acceso a las Diapositivas de la Presentación */}
          <a
            href="/slides.html"
            target="_blank"
            rel="noopener noreferrer"
            className="slides-nav-btn"
            title="Abrir Presentación de Diapositivas en pestaña completa"
            style={{
              textDecoration: 'none',
              background: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: '#38bdf8',
              fontSize: '0.8rem',
              fontWeight: 600,
              padding: '0.3rem 0.75rem',
              borderRadius: '9999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'all 0.2s ease',
            }}
          >
            📊 Diapositivas
          </a>

          {user && (
            <div className="user-profile">
              <span className="user-name" aria-label={`Usuario actual: ${user.name}`}>
                👤 {user.name}
              </span>
              <button
                type="button"
                className="btn-logout"
                onClick={onLogout}
                aria-label="Cerrar Sesión"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
