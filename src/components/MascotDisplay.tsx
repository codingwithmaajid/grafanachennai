import React, { useState, useEffect, useRef } from 'react';

interface MascotDisplayProps {
  className?: string;
}

export const MascotDisplay: React.FC<MascotDisplayProps> = ({ className = '' }) => {
  const [imageSrc, setImageSrc] = useState<string>('/images.png');
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if user previously uploaded their exact original file
    const saved = localStorage.getItem('grot_original_image');
    if (saved) {
      setImageSrc(saved);
    }
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setImageSrc(result);
        try {
          localStorage.setItem('grot_original_image', result);
        } catch {
          // localStorage might fail if quota exceeded; still keep in memory
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/svg+xml,image/webp"
        className="hidden"
        onChange={handleFileInputChange}
      />

      <div
        onClick={() => fileInputRef.current?.click()}
        className={`relative cursor-pointer transition-all duration-200 transform ${
          isDragging ? 'scale-105 ring-2 ring-[#F2652A] ring-offset-4 rounded-xl' : 'hover:scale-[1.02]'
        }`}
        title="Click or drag & drop your exact images.png here"
      >
        <img
          id="hero-grot-mascot-pic"
          src={imageSrc}
          alt="Grafana Grot mascot holding flag"
          className="w-[180px] sm:w-[210px] md:w-[230px] h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-transform duration-200"
          onError={() => {
            if (imageSrc !== '/grot-mascot.svg') {
              setImageSrc('/grot-mascot.svg');
            }
          }}
          referrerPolicy="no-referrer"
        />

        {/* Subtle dropzone indicator on hover or drag */}
        <div
          className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#171717]/85 backdrop-blur-xs text-white text-[9px] font-mono tracking-wider uppercase pointer-events-none transition-opacity duration-150 ${
            isHovered || isDragging ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {isDragging ? 'Drop images.png here' : 'Drop or Click to replace'}
        </div>
      </div>
    </div>
  );
};
