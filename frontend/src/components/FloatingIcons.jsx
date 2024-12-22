import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  Sword, 
  Target, 
  Trophy, 
  Crosshair, 
  Bomb,
  Flame,
  Shield,
  Zap,
  Crown,
  Skull
} from 'lucide-react';

const FloatingIcon = ({ Icon, delay, duration, initialPosition, colorClass, size = 32, mousePosition }) => {
  const [position, setPosition] = useState(initialPosition);
  const repulsionRadius = 150; // Distance at which icons start moving away
  const repulsionStrength = 30; // Strength of the repulsion effect

  useEffect(() => {
    if (!mousePosition) return;

    // Calculate distance between mouse and icon
    const dx = (mousePosition.x / 100 * window.innerWidth) - (position.x / 100 * window.innerWidth);
    const dy = (mousePosition.y / 100 * window.innerHeight) - (position.y / 100 * window.innerHeight);
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < repulsionRadius) {
      // Calculate repulsion force
      const force = (1 - distance / repulsionRadius) * repulsionStrength;
      const angle = Math.atan2(dy, dx);

      // Calculate new position with boundaries
      const newX = position.x - (Math.cos(angle) * force);
      const newY = position.y - (Math.sin(angle) * force);

      // Keep icons within bounds
      const boundedX = Math.max(5, Math.min(95, newX));
      const boundedY = Math.max(5, Math.min(95, newY));

      setPosition({ x: boundedX, y: boundedY });
    } else {
      // Gradually return to initial position when mouse is far
      setPosition(prev => ({
        x: prev.x + (initialPosition.x - prev.x) * 0.05,
        y: prev.y + (initialPosition.y - prev.y) * 0.05
      }));
    }
  }, [mousePosition, initialPosition, repulsionRadius, repulsionStrength]);

  return (
    <div
      className={`absolute animate-float ${colorClass}`}
      style={{
        animation: `float ${duration}s infinite`,
        animationDelay: `${delay}s`,
        left: `${position.x}%`,
        top: `${position.y}%`,
        transition: 'left 0.3s ease-out, top 0.3s ease-out',
      }}
    >
      <div className="animate-pulse">
        <Icon 
          size={size} 
          className="animate-glow transition-colors duration-[3000ms]" 
        />
      </div>
    </div>
  );
};

const FloatingIcons = () => {
  const [mousePosition, setMousePosition] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const icons = [
    { icon: Gamepad2, delay: 0, duration: 15, position: { x: 10, y: 20 }, colorClass: 'text-blue-500 animate-color-shift-1' },
    { icon: Sword, delay: 2, duration: 18, position: { x: 80, y: 15 }, colorClass: 'text-purple-500 animate-color-shift-2' },
    { icon: Target, delay: 4, duration: 20, position: { x: 20, y: 70 }, colorClass: 'text-pink-500 animate-color-shift-3' },
    { icon: Trophy, delay: 6, duration: 16, position: { x: 70, y: 80 }, colorClass: 'text-green-500 animate-color-shift-4' },
    { icon: Crosshair, delay: 8, duration: 17, position: { x: 90, y: 40 }, colorClass: 'text-yellow-500 animate-color-shift-5' },
    { icon: Bomb, delay: 10, duration: 19, position: { x: 15, y: 50 }, colorClass: 'text-red-500 animate-color-shift-6' },
    { icon: Flame, delay: 3, duration: 16, position: { x: 45, y: 25 }, colorClass: 'text-orange-500 animate-color-shift-1', size: 28 },
    { icon: Shield, delay: 5, duration: 18, position: { x: 85, y: 65 }, colorClass: 'text-blue-400 animate-color-shift-2', size: 36 },
    { icon: Zap, delay: 7, duration: 14, position: { x: 30, y: 85 }, colorClass: 'text-yellow-400 animate-color-shift-3', size: 24 },
    { icon: Crown, delay: 9, duration: 17, position: { x: 60, y: 10 }, colorClass: 'text-purple-400 animate-color-shift-4', size: 30 },
    { icon: Skull, delay: 11, duration: 19, position: { x: 40, y: 60 }, colorClass: 'text-red-400 animate-color-shift-5', size: 28 }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0) translateX(0) rotate(0deg);
            }
            25% {
              transform: translateY(-20px) translateX(10px) rotate(5deg);
            }
            50% {
              transform: translateY(0) translateX(20px) rotate(0deg);
            }
            75% {
              transform: translateY(20px) translateX(10px) rotate(-5deg);
            }
          }
          
          @keyframes color-shift-1 {
            0%, 100% { color: rgb(59, 130, 246); }
            33% { color: rgb(236, 72, 153); }
            66% { color: rgb(168, 85, 247); }
          }
          
          @keyframes color-shift-2 {
            0%, 100% { color: rgb(168, 85, 247); }
            33% { color: rgb(59, 130, 246); }
            66% { color: rgb(236, 72, 153); }
          }
          
          @keyframes color-shift-3 {
            0%, 100% { color: rgb(236, 72, 153); }
            33% { color: rgb(168, 85, 247); }
            66% { color: rgb(59, 130, 246); }
          }
          
          @keyframes color-shift-4 {
            0%, 100% { color: rgb(34, 197, 94); }
            33% { color: rgb(236, 72, 153); }
            66% { color: rgb(234, 179, 8); }
          }
          
          @keyframes color-shift-5 {
            0%, 100% { color: rgb(234, 179, 8); }
            33% { color: rgb(34, 197, 94); }
            66% { color: rgb(239, 68, 68); }
          }
          
          @keyframes color-shift-6 {
            0%, 100% { color: rgb(239, 68, 68); }
            33% { color: rgb(234, 179, 8); }
            66% { color: rgb(34, 197, 94); }
          }

          .animate-color-shift-1 {
            animation: color-shift-1 6s infinite;
          }
          .animate-color-shift-2 {
            animation: color-shift-2 6s infinite;
          }
          .animate-color-shift-3 {
            animation: color-shift-3 6s infinite;
          }
          .animate-color-shift-4 {
            animation: color-shift-4 6s infinite;
          }
          .animate-color-shift-5 {
            animation: color-shift-5 6s infinite;
          }
          .animate-color-shift-6 {
            animation: color-shift-6 6s infinite;
          }
          
          .animate-glow {
            filter: drop-shadow(0 0 8px currentColor);
          }
        `}
      </style>
      {icons.map((icon, index) => (
        <FloatingIcon
          key={index}
          Icon={icon.icon}
          delay={icon.delay}
          duration={icon.duration}
          initialPosition={icon.position}
          colorClass={icon.colorClass}
          size={icon.size}
          mousePosition={mousePosition}
        />
      ))}
    </div>
  );
};

export default FloatingIcons;