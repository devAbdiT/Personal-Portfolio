import { useEffect, useRef } from 'react';

const sections = [
  { id: 'hero', title: 'Home' },
  { id: 'projects', title: 'Projects' },
  { id: 'skills', title: 'Skills' },
  { id: 'experience', title: 'Experience' },
  { id: 'contact', title: 'Contact' },
];

export function DynamicTitle() {
  const ratios = useRef<Record<string, number>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.current[entry.target.id] = entry.intersectionRatio;
        });

        // Find the section with the highest visibility ratio
        let maxRatio = 0;
        let activeId = '';
        
        Object.entries(ratios.current).forEach(([id, ratio]) => {
          const numRatio = ratio as number;
          if (numRatio > maxRatio) {
            maxRatio = numRatio;
            activeId = id;
          }
        });

        if (activeId) {
          const section = sections.find((s) => s.id === activeId);
          if (section) {
            document.title = `Abdi Tadesse | ${section.title}`;
          }
        }
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i / 20), // 0 to 1 in 0.05 increments
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
