import { StrictMode, Component, type ErrorInfo, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import './styles/design-tokens.css';
import App from './App.tsx';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Recovered non-fatal runtime event:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f9fb] p-6 text-center text-[#191c1e] font-sans">
          <div className="max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-200/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#4b41e1] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-2xl">refresh</span>
            </div>
            <h2 className="text-xl font-bold font-display-lg text-[#191c1e]">Tribeni Minati Foundation</h2>
            <p className="text-sm text-[#45464d] leading-relaxed">
              We've updated our verified content. Click below to view the latest live platform.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              className="w-full py-3 px-6 bg-[#4b41e1] text-white font-bold rounded-xl shadow-md hover:bg-[#645efb] transition-all cursor-pointer text-sm"
            >
              Continue to Website
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <App />
        <SpeedInsights />
        <Analytics />
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>
);
