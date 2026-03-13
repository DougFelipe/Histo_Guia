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
import EquipePage from './pages/EquipePage';
import SitemapPage from './pages/SitemapPage';
import EmElaboracaoPage from './pages/EmElaboracaoPage';
import ModuleGate from './components/ModuleGate';

function App() {
  return (
    <HelmetProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/questoes-teoricas"
              element={
                <ModuleGate moduleId="questoes-teoricas">
                  <QuestoesTeoricasPage />
                </ModuleGate>
              }
            />
            <Route
              path="/questoes-praticas"
              element={
                <ModuleGate moduleId="questoes-praticas">
                  <QuestoesPraticasPage />
                </ModuleGate>
              }
            />
            <Route
              path="/glossario"
              element={
                <ModuleGate moduleId="glossario">
                  <GlossarioPage />
                </ModuleGate>
              }
            />
            <Route
              path="/flashcards/teoricos"
              element={
                <ModuleGate moduleId="flashcards-teoricos">
                  <FlashcardsTeoricosPage />
                </ModuleGate>
              }
            />
            <Route
              path="/flashcards/praticos"
              element={
                <ModuleGate moduleId="flashcards-praticos">
                  <FlashcardsPraticosPage />
                </ModuleGate>
              }
            />
            <Route
              path="/simulado/configuracao"
              element={
                <ModuleGate moduleId="simulado-pratico">
                  <SimuladoConfiguracaoPage />
                </ModuleGate>
              }
            />
            <Route
              path="/simulado/iniciar"
              element={
                <ModuleGate moduleId="simulado-pratico">
                  <SimuladoExecucaoPage />
                </ModuleGate>
              }
            />
            <Route
              path="/simulado/resultado"
              element={
                <ModuleGate moduleId="simulado-pratico">
                  <SimuladoResultadoPage />
                </ModuleGate>
              }
            />
            <Route path="/equipe" element={<EquipePage />} />
            <Route path="/sitemap" element={<SitemapPage />} />
            <Route path="/em-elaboracao" element={<EmElaboracaoPage />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
