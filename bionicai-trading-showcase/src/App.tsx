import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { PerformancePage } from './pages/PerformancePage';
import { StrategyPage } from './pages/StrategyPage';
import { JourneyPage } from './pages/JourneyPage';
import { UpdatesPage } from './pages/UpdatesPage';
import { CommunityPage } from './pages/CommunityPage';
import { AdminPage } from './pages/AdminPage';
import { LoginPage } from './pages/LoginPage';
import { registerServiceWorker } from './utils/pwa';

function App() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-primary text-text-primary">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/journey" element={<JourneyPage />} />
                <Route path="/performance" element={<PerformancePage />} />
                <Route path="/strategy" element={<StrategyPage />} />
                <Route path="/updates" element={<UpdatesPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
