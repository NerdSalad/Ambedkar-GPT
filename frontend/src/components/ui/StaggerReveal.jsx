import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react';

// Wraps a list of siblings and fades each one in with a staggered delay once
// the group first scrolls into view. Children keep their own className/style —
// we only augment with the `reveal-section` utility and a `transitionDelay`.
//
// Usage:
//   <StaggerReveal step={90}>
//     <div>...</div>
//     <div>...</div>
//   </StaggerReveal>
export default function StaggerReveal({
  children,
  step = 90,
  yOffset = 22,
  threshold = 0.15,
  className = '',
}) {
  const hostRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div ref={hostRef} className={className} style={{ '--reveal-y': `${yOffset}px` }}>
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child;
        const existing = child.props.className || '';
        const existingStyle = child.props.style || {};
        return cloneElement(child, {
          className: `${existing} reveal-section ${visible ? 'revealed' : ''}`.trim(),
          style: { ...existingStyle, transitionDelay: `${i * step}ms` },
        });
      })}
    </div>
  );
}
