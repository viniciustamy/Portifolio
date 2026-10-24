import { useEffect } from 'react';

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    const baseTitle = 'Vinicius Tamy · Product Designer';
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;
  }, [title]);
}
