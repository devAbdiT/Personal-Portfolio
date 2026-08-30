import { useEffect } from 'react';

const sections = ['hero', 'projects', 'skills', 'experience', 'contact'];

export function KeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        
        const windowHeight = window.innerHeight;
        
        let currentIndex = -1;
        let minDistance = Infinity;

        // Find the section currently most visible in the viewport
        sections.forEach((id, index) => {
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Distance from center of viewport to center of element
            const distance = Math.abs(rect.top + rect.height / 2 - windowHeight / 2);
            if (distance < minDistance) {
              minDistance = distance;
              currentIndex = index;
            }
          }
        });

        if (currentIndex !== -1) {
          let nextIndex = currentIndex;
          if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
            nextIndex = currentIndex + 1;
          } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            nextIndex = currentIndex - 1;
          }

          if (nextIndex !== currentIndex) {
            const nextElement = document.getElementById(sections[nextIndex]);
            if (nextElement) {
              nextElement.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return null;
}
