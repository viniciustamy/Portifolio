import { useEffect } from 'react';

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    const baseTitle = 'Vinicius Tamy · Product Designer';
    // Sem título (Home), a aba mostra só o nome
    document.title = title ? `${title} | ${baseTitle}` : 'Vinicius Tamy';
  }, [title]);
}
