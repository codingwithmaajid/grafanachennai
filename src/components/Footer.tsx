import React from 'react';
import { PageRoute } from '../types';
import { GrafanaLogo } from './GrafanaLogo';
import { GrotMascot } from './GrotMascot';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  onOpenJoin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenJoin }) => {
  return (
    <footer id="site-footer" className="w-full mt-20 sm:mt-28">
      {/* Upward Curve on the Edges Only */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none -mb-[1px]">
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-7 sm:h-9 md:h-11 block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C0,28 25,48 80,48 L1360,48 C1415,48 1440,28 1440,0 L1440,48 L0,48 Z"
            fill="#F2652A"
          />
        </svg>
      </div>

      {/* Main Footer Body in #F2652A */}
      <div className="w-full bg-[#F2652A] text-white">
        <div className="max-w-[1280px] xl:max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 pt-8 sm:pt-12 pb-14">
          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-white/20 items-start">
          {/* Identity & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs">
                <GrafanaLogo size={18} color="#F2652A" />
              </div>
              <div>
                <h3 className="font-mono text-sm uppercase tracking-wider font-bold text-white">
                  Grafana Chennai
                </h3>
                <span className="font-mono text-[11px] text-white/80 block">
                  Open Source Observability Community
                </span>
              </div>
            </div>

            <p className="text-sm text-white/90 leading-relaxed max-w-sm">
              Gathering engineers, SREs, and observability practitioners across Chennai to share real-world architectures, Prometheus pipelines, and dashboards.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-xs border border-white/25 px-3 py-1 font-mono text-[11px] text-white rounded-full">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>13.0827° N, 80.2707° E</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-black/20 border border-white/15 px-3 py-1 font-mono text-[11px] text-white rounded-full">
                <span>STATUS: HEALTHY</span>
              </div>
            </div>
          </div>

          {/* Grot Mascot Easter Egg */}
          <div className="md:col-span-3 flex justify-start md:justify-center items-center py-2">
            <div className="bg-white/10 border border-white/20 p-4 rounded-2xl flex flex-col items-center backdrop-blur-xs">
              <GrotMascot size={90} showQuote={true} interactive={true} />
            </div>
          </div>

          {/* Navigation & Community Links */}
          <div className="md:col-span-4 flex flex-col md:items-end justify-between space-y-6">
            <div className="space-y-3 w-full md:w-auto">
              <span className="font-mono text-[11px] uppercase tracking-widest text-white/70 block md:text-right">
                NAVIGATION
              </span>
              <nav className="flex flex-wrap md:justify-end gap-x-6 gap-y-2 font-mono text-xs">
                <button
                  id="footer-nav-home"
                  onClick={() => onNavigate({ type: 'home' })}
                  className="text-white hover:text-[#171717] transition-colors py-1 focus-visible:outline-none"
                >
                  Home
                </button>
                <button
                  id="footer-nav-events"
                  onClick={() => onNavigate({ type: 'events' })}
                  className="text-white hover:text-[#171717] transition-colors py-1 focus-visible:outline-none"
                >
                  Events
                </button>
                <button
                  id="footer-nav-community"
                  onClick={() => onNavigate({ type: 'community' })}
                  className="text-white hover:text-[#171717] transition-colors py-1 focus-visible:outline-none"
                >
                  Community
                </button>
                <button
                  id="footer-nav-join"
                  onClick={onOpenJoin}
                  className="text-white hover:text-[#171717] transition-colors py-1 focus-visible:outline-none underline decoration-white/50 underline-offset-4"
                >
                  Join Community
                </button>
              </nav>
            </div>

            <div className="space-y-2 w-full md:w-auto">
              <span className="font-mono text-[11px] uppercase tracking-widest text-white/70 block md:text-right">
                RESOURCES & LINKS
              </span>
              <div className="flex flex-wrap md:justify-end gap-4 font-mono text-xs">
                <a
                  href="https://github.com/grafana"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 bg-white text-[#171717] hover:bg-[#171717] hover:text-white px-3 py-1.5 rounded-full transition-all duration-150 font-medium"
                >
                  <span>GitHub</span>
                  <span className="text-[10px]">↗</span>
                </a>
                <a
                  href="https://meetup.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 bg-white text-[#171717] hover:bg-[#171717] hover:text-white px-3 py-1.5 rounded-full transition-all duration-150 font-medium"
                >
                  <span>Meetup Group</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Craft Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-white/80 font-sans text-xs">
          <p className="max-w-2xl leading-relaxed text-[11px] text-white/85">
            Grafana® is a registered trademark of Grafana Labs. Grafana Chennai is an independent community and is not affiliated with, endorsed by, or sponsored by Grafana Labs.
          </p>
          <div className="flex items-center gap-4 font-mono text-[11px] text-white/90 shrink-0">
            <span>© 2026 GRAFANA CHENNAI</span>
            <span>·</span>
            <span className="tracking-wider">OPEN OBSERVABILITY</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
};
