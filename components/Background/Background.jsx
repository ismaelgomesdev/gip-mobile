import React, { useEffect, useRef } from 'react';
import './Background.scss';

const Background = () => {
  const colors = [
    'rgba(0, 150, 136, 0.8)', // #009688 - Transmite inovação e bem-estar
    'rgba(33, 150, 243, 0.8)', // #2196f3 - Representa criatividade
    'rgba(76, 175, 80, 0.8)', // #4caf50 - Reflete sustentabilidade e bem-estar
    'rgba(255, 235, 59, 0.8)', // #ffeb3b - Luz e otimismo
    'rgba(156, 39, 176, 0.8)' // #9c27b0 - Transmite um toque de modernidade e inovação
  ];

  const circlesRef = useRef([]);

  useEffect(() => {
    const circles = circlesRef.current;

    circles.forEach((circle, index) => {
      let colorIndex = index % colors.length;

      const intervalId = setInterval(() => {
        colorIndex = (colorIndex + 1) % colors.length;
        const newColor = colors[colorIndex];
        circle.style.transition = 'background-color 10s ease, box-shadow 10s ease';
        circle.style.backgroundColor = newColor;
        circle.style.boxShadow = `0 0 20px ${newColor.replace('0.8', '0.5')}`;
      }, 10000);

      return () => clearInterval(intervalId);
    });
  }, [colors]);

  return (
    <div className="background">
      {['small', 'medium', 'large', 'xlarge'].map((size, index) => (
        <div
          key={size}
          ref={(el) => (circlesRef.current[index] = el)}
          className={`circle ${size}`}
        />
      ))}
    </div>
  );
};

export default Background;