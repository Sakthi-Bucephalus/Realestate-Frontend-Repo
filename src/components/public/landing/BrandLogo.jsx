import React from 'react';
import logoImg from '../../../assets/levoralead-logo.png';

export const BrandLogo = ({
  size = 'md',
  light = true,
  showTagline = false,
  className = '',
  imgClassName = '',
}) => {
  // Sizing optimized for the 1024x341 logo image (3:1 aspect ratio)
  // 'navbar' option provides responsive 70px height on desktop
  const sizeClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-9 sm:h-10 md:h-11',
    navbar: 'h-[46px] sm:h-[58px] md:h-[70px]',
    lg: 'h-12 sm:h-14',
    xl: 'h-16 sm:h-20',
  };

  const selectedSize = imgClassName || sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`flex items-center gap-2 group select-none ${className}`}>
      <img
        src={logoImg}
        alt="LevoraLead"
        className={`${selectedSize} w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]`}
        style={{
          filter: light
            ? 'brightness(1.08) contrast(1.05) drop-shadow(0 2px 10px rgba(214, 180, 106, 0.35))'
            : 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.12))',
        }}
      />
      {showTagline && (
        <span
          className={`text-[9.5px] font-bold tracking-wider uppercase hidden xl:inline-block border-l pl-2.5 ${
            light ? 'border-white/20 text-[#A7B0C0]' : 'border-[#E5E0D5] text-[#667085]'
          }`}
        >
          Real Estate Lead OS
        </span>
      )}
    </div>
  );
};

export const FacebookOfficialIcon = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="#1877F2"
    className={className}
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const MetaOfficialIcon = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="#0081FB"
    className={className}
  >
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);
