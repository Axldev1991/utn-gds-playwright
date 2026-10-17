import React, { useState } from 'react';
import type { UIVersion, User } from '../types';

interface LoginPageProps {
  isLoading: boolean;
  error: string | null;
  uiVersion: UIVersion;
  onLogin: (email: string, pass: string) => Promise<User>;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  isLoading,
  error,
  uiVersion,
  onLogin,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isV2 = uiVersion === 'v2';
  const emailInputId = isV2 ? 'fld_email_hash_22' : 'input-email';
  const passInputId = isV2 ? 'fld_pass_hash_33' : 'input-password';
  const loginBtnId = isV2 ? 'btn_auth_submit_x9' : 'btn-submit-login';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      await onLogin(email, password);
    } catch {
      // El error ya es capturado y manejado en el hook/estado
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@taskflow.dev');
    setPassword('password123');
  };

  return (
    <main className="login-page-container">
      <div className="login-card">
        <div className="login-header">
          <div className="brand-badge-lg">GDS</div>
          <h1 className="login-title">TaskFlow</h1>
          <p className="login-subtitle">Gestión Ágil de Sprints & Automatización E2E</p>
        </div>

        {error && (
          <div className="login-error-alert" role="alert" aria-live="assertive">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="form-group">
            <label htmlFor={emailInputId} className="form-label">
              Correo Electrónico
            </label>
            <input
              id={emailInputId}
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@taskflow.dev"
              autoComplete="username"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor={passInputId} className="form-label">
              Contraseña
            </label>
            <input
              id={passInputId}
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              autoComplete="current-password"
              disabled={isLoading}
              required
            />
          </div>

          <button
            type="submit"
            id={loginBtnId}
            className="btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner-wrapper" role="status" aria-label="Autenticando...">
                <span className="spinner"></span> Verificando credenciales...
              </span>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>

        <div className="demo-credentials-box">
          <p className="demo-title">🔑 Credenciales de Prueba (Simulación):</p>
          <p className="demo-item">
            <strong>Email:</strong> <code>admin@taskflow.dev</code>
          </p>
          <p className="demo-item">
            <strong>Password:</strong> <code>password123</code>
          </p>
          <button
            type="button"
            className="btn-link"
            onClick={handleFillDemo}
            disabled={isLoading}
          >
            Autocompletar credenciales
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
          <a
            href="/slides.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#38bdf8',
              fontSize: '0.85rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              opacity: 0.85,
            }}
          >
            📊 Ver Diapositivas de la Presentación ↗
          </a>
        </div>
      </div>
    </main>
  );
};
