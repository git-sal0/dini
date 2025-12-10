import React, { useEffect, useState, useRef } from 'react';

export default function Counter({ from, to, duration = 2000 }) {
  const [value, setValue] = useState(from);
  const counterRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          let startValue = from;
          const increment = (to - from) / (duration / 16);
          let current = startValue;
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= to) {
              setValue(to);
              clearInterval(timer);
            } else {
              setValue(Math.floor(current));
            }
          }, 16);
          
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [from, to, duration]);

  return <span ref={counterRef} style={{ display: 'inline' }}>{value}</span>;
}
