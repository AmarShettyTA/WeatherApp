import React from 'react';

interface PixelWeatherIconProps {
  type: 'sun' | 'moon' | 'partly-cloudy' | 'cloud' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'storm';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const PixelWeatherIcon: React.FC<PixelWeatherIconProps> = ({
  type,
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const dim = sizeMap[size];

  // Pixel SVG Icons rendered on crisp 16x16 or 24x24 pixel grid with image-rendering: pixelated
  switch (type) {
    case 'sun':
      return (
        <svg
          className={`${dim} ${className} image-pixelated animate-pixel-float`}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Pixel Rays */}
          <rect x="7" y="0" width="2" height="2" fill="#F59E0B" />
          <rect x="7" y="14" width="2" height="2" fill="#F59E0B" />
          <rect x="0" y="7" width="2" height="2" fill="#F59E0B" />
          <rect x="14" y="7" width="2" height="2" fill="#F59E0B" />
          <rect x="2" y="2" width="2" height="2" fill="#FBBF24" />
          <rect x="12" y="2" width="2" height="2" fill="#FBBF24" />
          <rect x="2" y="12" width="2" height="2" fill="#FBBF24" />
          <rect x="12" y="12" width="2" height="2" fill="#FBBF24" />
          {/* Sun Body */}
          <rect x="5" y="4" width="6" height="8" fill="#F59E0B" />
          <rect x="4" y="5" width="8" height="6" fill="#F59E0B" />
          <rect x="5" y="5" width="6" height="6" fill="#FCD34D" />
          {/* Inner Highlight */}
          <rect x="6" y="6" width="2" height="2" fill="#FFFBEB" />
        </svg>
      );

    case 'moon':
      return (
        <svg
          className={`${dim} ${className} image-pixelated animate-pixel-float`}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stars */}
          <rect x="1" y="2" width="1" height="1" fill="#FDE047" />
          <rect x="13" y="1" width="1" height="1" fill="#FDE047" />
          <rect x="14" y="11" width="1" height="1" fill="#FDE047" />
          {/* Crescent Moon */}
          <rect x="5" y="3" width="6" height="10" fill="#A78BFA" />
          <rect x="4" y="4" width="7" height="8" fill="#A78BFA" />
          <rect x="7" y="2" width="3" height="12" fill="#A78BFA" />
          {/* Moon shadow cut-out */}
          <rect x="8" y="2" width="6" height="12" fill="#0F172A" />
          <rect x="7" y="4" width="5" height="8" fill="#0F172A" />
          {/* Moon inner highlight */}
          <rect x="5" y="5" width="2" height="6" fill="#DDD6FE" />
        </svg>
      );

    case 'partly-cloudy':
      return (
        <svg
          className={`${dim} ${className} image-pixelated`}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sun behind */}
          <rect x="2" y="1" width="5" height="5" fill="#F59E0B" />
          <rect x="1" y="2" width="7" height="3" fill="#F59E0B" />
          <rect x="3" y="2" width="3" height="3" fill="#FDE047" />
          {/* Cloud in front */}
          <rect x="5" y="7" width="8" height="6" fill="#94A3B8" />
          <rect x="3" y="9" width="12" height="4" fill="#94A3B8" />
          <rect x="4" y="8" width="9" height="5" fill="#E2E8F0" />
          <rect x="6" y="6" width="6" height="3" fill="#E2E8F0" />
          <rect x="5" y="9" width="8" height="3" fill="#F8FAFC" />
        </svg>
      );

    case 'cloud':
      return (
        <svg
          className={`${dim} ${className} image-pixelated`}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cloud Outline & Body */}
          <rect x="3" y="7" width="10" height="6" fill="#64748B" />
          <rect x="1" y="9" width="14" height="4" fill="#64748B" />
          <rect x="5" y="5" width="6" height="4" fill="#64748B" />
          {/* Cloud Highlights */}
          <rect x="2" y="9" width="12" height="3" fill="#CBD5E1" />
          <rect x="5" y="6" width="6" height="4" fill="#E2E8F0" />
          <rect x="4" y="8" width="8" height="3" fill="#F8FAFC" />
        </svg>
      );

    case 'fog':
      return (
        <svg
          className={`${dim} ${className} image-pixelated`}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="1" y="3" width="14" height="2" fill="#94A3B8" />
          <rect x="3" y="4" width="10" height="1" fill="#E2E8F0" />
          <rect x="0" y="7" width="16" height="2" fill="#64748B" />
          <rect x="2" y="8" width="12" height="1" fill="#CBD5E1" />
          <rect x="1" y="11" width="14" height="2" fill="#94A3B8" />
          <rect x="4" y="12" width="8" height="1" fill="#E2E8F0" />
        </svg>
      );

    case 'drizzle':
      return (
        <svg
          className={`${dim} ${className} image-pixelated`}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cloud */}
          <rect x="2" y="3" width="12" height="5" fill="#64748B" />
          <rect x="4" y="2" width="8" height="3" fill="#CBD5E1" />
          <rect x="3" y="4" width="10" height="3" fill="#E2E8F0" />
          {/* Drizzle drops */}
          <rect x="3" y="10" width="1" height="2" fill="#38BDF8" />
          <rect x="7" y="11" width="1" height="2" fill="#38BDF8" />
          <rect x="11" y="10" width="1" height="2" fill="#38BDF8" />
          <rect x="5" y="13" width="1" height="2" fill="#38BDF8" />
          <rect x="9" y="13" width="1" height="2" fill="#38BDF8" />
        </svg>
      );

    case 'rain':
      return (
        <svg
          className={`${dim} ${className} image-pixelated`}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cloud */}
          <rect x="2" y="2" width="12" height="6" fill="#475569" />
          <rect x="4" y="1" width="8" height="3" fill="#94A3B8" />
          <rect x="3" y="3" width="10" height="4" fill="#CBD5E1" />
          {/* Rain streaks */}
          <rect x="3" y="9" width="1" height="3" fill="#38BDF8" />
          <rect x="7" y="10" width="1" height="3" fill="#0284C7" />
          <rect x="11" y="9" width="1" height="3" fill="#38BDF8" />
          <rect x="5" y="12" width="1" height="3" fill="#0284C7" />
          <rect x="9" y="12" width="1" height="3" fill="#38BDF8" />
          <rect x="13" y="13" width="1" height="2" fill="#0284C7" />
        </svg>
      );

    case 'snow':
      return (
        <svg
          className={`${dim} ${className} image-pixelated`}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cloud */}
          <rect x="2" y="2" width="12" height="5" fill="#475569" />
          <rect x="4" y="1" width="8" height="3" fill="#94A3B8" />
          <rect x="3" y="3" width="10" height="3" fill="#CBD5E1" />
          {/* Snowflakes */}
          <rect x="3" y="9" width="2" height="2" fill="#BAE6FD" />
          <rect x="7" y="11" width="2" height="2" fill="#E0F2FE" />
          <rect x="11" y="9" width="2" height="2" fill="#BAE6FD" />
          <rect x="5" y="13" width="2" height="2" fill="#E0F2FE" />
          <rect x="10" y="13" width="2" height="2" fill="#BAE6FD" />
        </svg>
      );

    case 'storm':
      return (
        <svg
          className={`${dim} ${className} image-pixelated`}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Dark Cloud */}
          <rect x="2" y="1" width="12" height="6" fill="#1E293B" />
          <rect x="4" y="0" width="8" height="3" fill="#334155" />
          <rect x="3" y="2" width="10" height="4" fill="#475569" />
          {/* Lightning Bolt */}
          <rect x="8" y="7" width="3" height="2" fill="#FACC15" />
          <rect x="7" y="9" width="3" height="2" fill="#FACC15" />
          <rect x="5" y="11" width="4" height="2" fill="#FEF08A" />
          <rect x="6" y="13" width="2" height="2" fill="#FACC15" />
          <rect x="6" y="15" width="1" height="1" fill="#FEF08A" />
          {/* Rain drops around bolt */}
          <rect x="2" y="9" width="1" height="2" fill="#38BDF8" />
          <rect x="13" y="10" width="1" height="2" fill="#38BDF8" />
        </svg>
      );

    default:
      return (
        <svg
          className={`${dim} ${className} image-pixelated`}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="4" y="4" width="8" height="8" fill="#F59E0B" />
        </svg>
      );
  }
};
