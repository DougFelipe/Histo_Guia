import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from './pages/HomePage';
import QuestoesTeoricasPage from './pages/QuestoesTeoricasPage';
import QuestoesPraticasPage from './pages/QuestoesPraticasPage';
import GlossarioPage from './pages/GlossarioPage';
import FlashcardsTeoricosPage from './pages/FlashcardsTeoricosPage';
import FlashcardsPraticosPage from './pages/FlashcardsPraticosPage';
import SimuladoConfiguracaoPage from './pages/SimuladoConfiguracaoPage';
import SimuladoExecucaoPage from './pages/SimuladoExecucaoPage';
import SimuladoResultadoPage from './pages/SimuladoResultadoPage';
import SitemapPage from './pages/SitemapPage';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/questoes-teoricas" element={<QuestoesTeoricasPage />} />
            <Route path="/questoes-praticas" element={<QuestoesPraticasPage />} />
            <Route path="/glossario" element={<GlossarioPage />} />
            <Route path="/flashcards/teoricos" element={<FlashcardsTeoricosPage />} />
            <Route path="/flashcards/praticos" element={<FlashcardsPraticosPage />} />
            <Route path="/simulado/configuracao" element={<SimuladoConfiguracaoPage />} />
            <Route path="/simulado/iniciar" element={<SimuladoExecucaoPage />} />
            <Route path="/simulado/resultado" element={<SimuladoResultadoPage />} />
            <Route path="/sitemap" element={<SitemapPage />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;