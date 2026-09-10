import React, { useState } from 'react';

interface GrotMascotProps {
  size?: number;
  className?: string;
  showQuote?: boolean;
  interactive?: boolean;
  variant?: 'telemetry' | 'offline'; // 'telemetry' = blue visor with graph, 'offline' = XX visor
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
    'Telemetry streaming directly to my visor!',
    'Observing Chennai systems at 99.99% uptime!',
    'Metrics, logs, traces, and filter coffee.',
    'Golden Grot candidate detected!',
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
      title="Meet Grot — Click to toggle telemetry visor mode!"
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

      {/* SVG Grot Character with Visor */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-all duration-300 ${
          interactive ? 'cursor-pointer hover:scale-105 active:scale-95' : ''
        }`}
      >
        <defs>
          {/* Body gradient */}
          <linearGradient id="grotBodyGrad" x1="50" y1="40" x2="160" y2="170" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFCD1E" />
            <stop offset="60%" stopColor="#FFB800" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          {/* Spikes gradient */}
          <linearGradient id="grotSpikeGrad" x1="80" y1="20" x2="160" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          {/* Visor inner glow */}
          <linearGradient id="visorScreenGrad" x1="20" y1="70" x2="140" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0B0F2A" />
            <stop offset="100%" stopColor="#1B1F4B" />
          </linearGradient>
        </defs>

        {/* Soft ground shadow */}
        <ellipse cx="105" cy="180" rx="65" ry="8" fill="#171717" fillOpacity="0.1" />

        {/* ─── DORSAL SPIKES (Orange flame fins along head & spine) ─── */}
        {/* Top big flame crest */}
        <path
          d="M 95 48 C 95 40, 108 20, 128 16 C 132 28, 126 44, 120 54 Z"
          fill="url(#grotSpikeGrad)"
        />
        {/* Spike 2 */}
        <path
          d="M 124 50 C 138 52, 154 62, 158 72 C 148 78, 136 78, 130 74 Z"
          fill="url(#grotSpikeGrad)"
        />
        {/* Spike 3 */}
        <path
          d="M 132 78 C 146 82, 156 94, 158 104 C 148 108, 138 106, 132 100 Z"
          fill="url(#grotSpikeGrad)"
        />
        {/* Spike 4 */}
        <path
          d="M 132 106 C 144 112, 152 122, 152 132 C 142 134, 134 130, 130 124 Z"
          fill="url(#grotSpikeGrad)"
        />

        {/* ─── CURLY TAIL (Spirals up with tiny spikes) ─── */}
        <path
          d="M 130 156 
             C 142 168, 160 166, 170 152 
             C 176 142, 176 130, 164 128 
             C 156 126, 150 134, 154 140 
             C 156 144, 162 144, 164 140 
             C 165 138, 163 135, 160 136 
             C 158 136, 157 138, 158 140 
             C 156 142, 152 138, 154 134 
             C 160 124, 180 128, 178 146 
             C 176 164, 154 174, 136 166 Z"
          fill="url(#grotSpikeGrad)"
        />
        {/* Tail ridges */}
        <circle cx="160" cy="130" r="2.5" fill="#EA580C" />
        <circle cx="168" cy="134" r="2.5" fill="#EA580C" />
        <circle cx="174" cy="142" r="2.5" fill="#EA580C" />

        {/* ─── GROT BODY (Round, chubby yellow dinosaur) ─── */}
        <path
          d="M 72 48 
             C 86 36, 114 36, 126 50 
             C 138 64, 140 84, 140 110 
             C 140 142, 138 166, 128 172 
             C 118 178, 62 178, 48 172 
             C 38 166, 36 142, 38 114 
             C 40 82, 54 54, 72 48 Z"
          fill="url(#grotBodyGrad)"
        />

        {/* ─── FEET (Sitting paws) ─── */}
        {/* Left foot */}
        <path
          d="M 46 172 C 38 172, 34 168, 38 162 C 44 156, 52 164, 58 172 Z"
          fill="#EA580C"
          opacity="0.85"
        />
        {/* Right foot */}
        <path
          d="M 78 174 C 70 174, 68 166, 76 160 C 84 154, 94 162, 98 174 Z"
          fill="#EA580C"
          opacity="0.85"
        />

        {/* ─── MOUTH (Charming little smirk) ─── */}
        <path
          d="M 76 128 Q 92 134 98 122"
          stroke="#171717"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* ─── VISOR (Observability / Telemetry VR Goggles) ─── */}
        <g>
          {/* Visor outer shell - vibrant cobalt blue */}
          <rect
            x="24"
            y="74"
            width="106"
            height="36"
            rx="18"
            fill="#1D4ED8"
            stroke="#2563EB"
            strokeWidth="3"
          />

          {/* Visor inner bezel */}
          <rect
            x="28"
            y="77"
            width="98"
            height="30"
            rx="15"
            fill="url(#visorScreenGrad)"
          />

          {variant === 'telemetry' ? (
            <>
              {/* Telemetry Grid lines */}
              <line x1="28" y1="87" x2="126" y2="87" stroke="#312E81" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="28" y1="97" x2="126" y2="97" stroke="#312E81" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="52" y1="77" x2="52" y2="107" stroke="#312E81" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="76" y1="77" x2="76" y2="107" stroke="#312E81" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="100" y1="77" x2="100" y2="107" stroke="#312E81" strokeWidth="1" strokeDasharray="2 2" />

              {/* Glowing Metric Waveform (Grafana Time Series Chart) */}
              <path
                d="M 32 94 Q 44 82, 54 92 T 76 96 T 98 84 T 120 90"
                stroke="#38BDF8"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                className="animate-pulse"
              />
              {/* Data points */}
              <circle cx="54" cy="92" r="2.5" fill="#38BDF8" />
              <circle cx="98" cy="84" r="2.5" fill="#67E8F9" />
              <circle cx="120" cy="90" r="2" fill="#38BDF8" />
            </>
          ) : (
            <>
              {/* Offline / 404 mode "XX" display */}
              <g stroke="#F87171" strokeWidth="3" strokeLinecap="round">
                <line x1="48" y1="86" x2="62" y2="98" />
                <line x1="62" y1="86" x2="48" y2="98" />

                <line x1="86" y1="86" x2="100" y2="98" />
                <line x1="100" y1="86" x2="86" y2="98" />
              </g>
            </>
          )}

          {/* Visor glass sheen highlight */}
          <path
            d="M 36 80 Q 75 77 114 80"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.35"
          />
        </g>

        {/* ─── ARMS / HANDS (Holding the visor on both sides) ─── */}
        {/* Left hand gripping left edge */}
        <path
          d="M 34 100 C 26 102, 18 106, 20 114 C 22 122, 34 126, 42 120 C 38 116, 36 108, 34 100 Z"
          fill="#FF6B35"
        />
        {/* Left fingers holding visor edge */}
        <circle cx="24" cy="86" r="4.5" fill="#FF6B35" />
        <circle cx="22" cy="94" r="4.5" fill="#FF6B35" />
        <circle cx="26" cy="101" r="4" fill="#FF6B35" />

        {/* Right hand gripping right edge */}
        <path
          d="M 122 96 C 132 100, 142 108, 138 118 C 134 128, 120 128, 116 116 Z"
          fill="#FF6B35"
        />
        {/* Right fingers holding visor edge */}
        <circle cx="128" cy="84" r="4.5" fill="#FF6B35" />
        <circle cx="132" cy="92" r="4.5" fill="#FF6B35" />
        <circle cx="130" cy="100" r="4" fill="#FF6B35" />

        {/* Tech sparkles / particle accents if telemetry mode */}
        {variant === 'telemetry' && (
          <g fill="#171717" opacity="0.4">
            <path d="M 22 46 L 24 40 L 26 46 L 32 48 L 26 50 L 24 56 L 22 50 L 16 48 Z" />
            <circle cx="160" cy="44" r="2.5" />
            <rect x="170" y="76" width="4" height="4" transform="rotate(45 172 78)" />
          </g>
        )}
      </svg>

      {/* Mascot Label with interactive toggle hint */}
      <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] flex items-center gap-1.5">
        <span
          className={`w-1.5 h-1.5 rounded-full inline-block ${
            variant === 'telemetry' ? 'bg-[#38BDF8] animate-pulse' : 'bg-[#EF4444]'
          }`}
        />
        <span>GROT // {variant === 'telemetry' ? 'TELEMETRY VISOR' : 'OFFLINE'}</span>
        {interactive && <span className="text-[9px] text-[#A3A3A3]">(TAP)</span>}
      </div>
    </div>
  );
};
