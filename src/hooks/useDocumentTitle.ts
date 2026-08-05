import { useEffect } from 'react';

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    const baseTitle = 'Portifólio Tamy';
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;
  }, [title]);
}
