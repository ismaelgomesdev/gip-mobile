// Background.js
import React, { useEffect, useRef } from 'react';
import './Background.scss';

const Background = () => {
  const colors = [
    'rgba(255, 200, 100, 0.8)', // Cores que representam a luz urbana suave
    'rgba(255, 223, 186, 0.8)',
    'rgba(255, 255, 204, 0.8)', // Tom amarelado mais claro
    'rgba(240, 231, 65, 0.8)',  // Luz vibrante
  ];

  const circlesRef = useRef([]);

  useEffect(() => {
    const circles = circlesRef.current;

    circles.forEach((circle) => {
      let colorIndex = Math.floor(Math.random() * colors.length);

      const intervalId = setInterval(() => {
        colorIndex = (colorIndex + 1) % colors.length;
        const newColor = colors[colorIndex];
        circle.style.transition = 'background-color 10s ease, box-shadow 10s ease';
        circle.style.backgroundColor = newColor;
        circle.style.boxShadow = `0 0 20px ${newColor.replace('0.8', '0.5')}`;
      }, 10000 + Math.random() * 5000); // Intervalo aleatório para cada círculo

      return () => clearInterval(intervalId);
    });
  }, [colors]);

  return (
    <div className="background">
      <div className="cityscape"></div> {/* Adiciona a silhueta urbana */}
      {Array.from({ length: 40 }).map((_, index) => (
        <div
          key={`circle-${index}`}
          ref={(el) => (circlesRef.current[index] = el)}
          className="circle"
          style={{
            top: `${Math.random() * 50}%`, // Posiciona aleatoriamente na metade superior da tela
            left: `${Math.random() * 100}%`,
            animationDuration: `${3 + Math.random() * 2}s`, // Define duração de animação aleatória entre 3s e 5s
            animationDelay: `${Math.random() * 5}s`, // Define atraso aleatório para cada círculo
          }}
        />
      ))}
    </div>
  );
};

export default Background;