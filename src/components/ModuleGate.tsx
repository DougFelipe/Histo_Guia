import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isStudyModuleEnabled } from '../config/studyModules';
import type { StudyModuleId } from '../types';

interface ModuleGateProps {
  moduleId: StudyModuleId;
  children: React.ReactElement;
}

const ModuleGate: React.FC<ModuleGateProps> = ({ moduleId, children }) => {
  const location = useLocation();

  if (isStudyModuleEnabled(moduleId)) {
    return children;
  }

  const params = new URLSearchParams({
    modulo: moduleId,
    from: `${location.pathname}${location.search}${location.hash}`,
  });

  return <Navigate to={`/em-elaboracao?${params.toString()}`} replace />;
};

export default ModuleGate;

