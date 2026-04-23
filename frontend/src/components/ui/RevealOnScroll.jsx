import { useEffect, useRef, useState } from 'react';

export default function RevealOnScroll({ children, className = '', delayMs = 0, yOffset = 26 }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`reveal-section ${isVisible ? 'revealed' : ''} ${className}`}
      style={{
        transitionDelay: `${delayMs}ms`,
        '--reveal-y': `${yOffset}px`,
      }}
    >
      {children}
    </div>
  );
}
