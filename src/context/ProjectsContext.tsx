import React, { createContext, useContext, useState } from 'react';
import { projects as initialProjects } from '../data';

export type ProjectData = typeof initialProjects[0] & {
  contentHtml?: string;
  thumbnail?: string;
  thumbBg?: string;
  coverImage?: string;
  roles?: string | string[];
  tools?: string | string[];
  team?: string | string[];
};

interface ProjectsContextType {
  projects: ProjectData[];
  loading: boolean;
  refreshProjects: () => Promise<void>;
  updateProjectLocally: (id: string, updated: Partial<ProjectData>) => Promise<void>;
}

const ProjectsContext = createContext<ProjectsContextType>({
  projects: initialProjects,
  loading: false,
  refreshProjects: async () => {},
  updateProjectLocally: async () => {},
});

export const useProjects = () => useContext(ProjectsContext);

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<ProjectData[]>(initialProjects);

  const refreshProjects = async () => {};

  const updateProjectLocally = async (id: string, updated: Partial<ProjectData>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  return (
    <ProjectsContext.Provider value={{ projects, loading: false, refreshProjects, updateProjectLocally }}>
      {children}
    </ProjectsContext.Provider>
  );
};
