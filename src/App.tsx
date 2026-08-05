import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Project from './pages/Project';
import About from './pages/About';
import Docs from './pages/Docs';
import { ProjectsProvider } from './context/ProjectsContext';
import { Lightbox } from './components/Lightbox';
import { AnimatePresence } from 'motion/react';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname} className="contents">
        <Routes location={location}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="project/:id" element={<Project />} />
            <Route path="sobre-mim" element={<About />} />
            <Route path="documentos" element={<Docs />} />
          </Route>
        </Routes>
      </div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ProjectsProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
      <Lightbox />
    </ProjectsProvider>
  );
}
