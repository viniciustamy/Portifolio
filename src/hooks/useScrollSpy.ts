import { useState, useEffect, useRef } from 'react';

interface UseScrollSpyOptions {
  rootMargin?: string;
  threshold?: number | number[];
}

export function useScrollSpy(
  elementIds: string[],
  options: UseScrollSpyOptions = {}
) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const visibleElements = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!elementIds || elementIds.length === 0) return;

    const elements = elementIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Use a large bottom margin so that tall sections are considered visible 
    // even if they don't reach the top margin
    const { rootMargin = '-130px 0px -40% 0px', threshold = 0 } = options;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleElements.current.add(entry.target.id);
        } else {
          visibleElements.current.delete(entry.target.id);
        }
      });

      // Find the first visible element based on the order in the DOM
      for (const el of elements) {
        if (visibleElements.current.has(el.id)) {
          setActiveId(el.id);
          break;
        }
      }
    };

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin,
      threshold,
    });

    elements.forEach((el) => observer.observe(el));
    observerRef.current = observer;

    return () => {
      observer.disconnect();
      visibleElements.current.clear();
    };
  }, [elementIds, options.rootMargin, options.threshold]);

  return activeId;
}
