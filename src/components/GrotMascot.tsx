import React, { useState } from 'react';
import mascotImg from '../assets/images-removebg-preview.png';

interface GrotMascotProps {
  size?: number;
  className?: string;
  showQuote?: boolean;
  interactive?: boolean;
  variant?: 'telemetry' | 'offline';
}

export const GrotMascot: React.FC<GrotMascotProps> = ({
  size = 140,
  className = '',
  showQuote = false,
  interactive = true,
  variant: initialVariant = 'telemetry',
}) => {
  const [variant, setVariant] = useState<'telemetry' | 'offline'>(initialVariant);
  const [quoteIdx, setQuoteIdx] = useState(0);

  const quotes = [
    'Observing Chennai systems at 99.99% uptime!',
    'Telemetry streaming directly from Chennai servers!',
    'Metrics, logs, traces, and filter coffee.',
    'Golden Grot candidate detected in Chennai!',
    'PromQL query executed in 1.2ms!',
    'All alert rules green across the cluster.',
  ];

  const toggleVariant = () => {
    if (!interactive) return;
    setVariant((prev) => (prev === 'telemetry' ? 'offline' : 'telemetry'));
    setQuoteIdx((prev) => (prev + 1) % quotes.length);
  };

  return (
    <div
      className={`inline-flex flex-col items-center select-none ${className}`}
      onClick={toggleVariant}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      title="Meet Grot — Official Grafana Mascot"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          toggleVariant();
        }
      }}
    >
      {/* Speech bubble */}
      {showQuote && (
        <div className="mb-2 relative bg-[#171717] text-[#FFFEFD] border border-[#E8E5E1] px-3 py-1.5 text-[11px] font-mono shadow-sm animate-in fade-in slide-in-from-bottom-1 max-w-[220px] text-center">
          <span>{variant === 'offline' ? '404: Signal dropped! Tap to reconnect telemetry.' : quotes[quoteIdx]}</span>
          {/* Arrow */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-[#171717]" />
        </div>
      )}

      {/* Exact uploaded Grot Mascot PNG asset */}
      <img
        src={mascotImg}
        alt="Grafana Grot Mascot"
        style={{ width: `${size}px`, height: 'auto' }}
        className={`object-contain transition-all duration-300 drop-shadow-sm ${
          interactive ? 'cursor-pointer hover:scale-105 active:scale-95' : ''
        }`}
      />

      {/* Mascot Label */}
      <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] flex items-center gap-1.5">
        <span
          className={`w-1.5 h-1.5 rounded-full inline-block ${
            variant === 'telemetry' ? 'bg-[#38BDF8] animate-pulse' : 'bg-[#EF4444]'
          }`}
        />
        <span>GROT // {variant === 'telemetry' ? 'CHENNAI CHAPTER' : 'OFFLINE'}</span>
        {interactive && <span className="text-[9px] text-[#A3A3A3]">(TAP)</span>}
      </div>
    </div>
  );
};
