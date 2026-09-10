import React, { useState } from 'react';
import { PageRoute } from '../types';
import { GrafanaLogo } from './GrafanaLogo';

interface NavProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenJoin: () => void;
  onOpenAddEvent?: () => void;
}

export const Nav: React.FC<NavProps> = ({ currentRoute, onNavigate, onOpenJoin, onOpenAddEvent }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isCurrent = (type: PageRoute['type']) => currentRoute.type === type;

  return (
    <header className="w-full bg-[#FFFEFD] border-b border-[#E8E5E1] sticky top-0 z-40">
      <div className="max-w-[1280px] xl:max-w-[1360px] mx-auto px-5 sm:px-10 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo / Wordmark */}
        <button
          id="nav-brand-button"
          onClick={() => {
            onNavigate({ type: 'home' });
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2.5 text-left group focus-visible:outline-none"
        >
          {/* Official Grafana Swirl SVG Logo */}
          <GrafanaLogo size={20} color="#F2652A" />
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#171717] uppercase group-hover:text-[#F2652A] transition-colors">
            Grafana Chennai
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <button
            id="nav-events-link"
            onClick={() => onNavigate({ type: 'events' })}
            className={`font-mono text-xs uppercase tracking-wider transition-colors py-1 relative ${
              isCurrent('events') || isCurrent('event-detail')
                ? 'text-[#F2652A] font-medium'
                : 'text-[#171717] hover:text-[#F2652A]'
            }`}
          >
            Events
            {(isCurrent('events') || isCurrent('event-detail')) && (
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#F2652A]" />
            )}
          </button>

          <button
            id="nav-community-link"
            onClick={() => onNavigate({ type: 'community' })}
            className={`font-mono text-xs uppercase tracking-wider transition-colors py-1 relative ${
              isCurrent('community')
                ? 'text-[#F2652A] font-medium'
                : 'text-[#171717] hover:text-[#F2652A]'
            }`}
          >
            Community
            {isCurrent('community') && (
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#F2652A]" />
            )}
          </button>

          {onOpenAddEvent && (
            <button
              id="nav-add-event-button"
              onClick={onOpenAddEvent}
              className="font-mono text-xs uppercase tracking-wider text-[#6B6B6B] hover:text-[#F2652A] transition-colors flex items-center gap-1 group py-1"
            >
              <span className="text-[#F2652A] font-bold">+</span>
              <span>Add Event</span>
            </button>
          )}

          <button
            id="nav-join-button"
            onClick={onOpenJoin}
            className="font-mono text-xs uppercase tracking-wider text-[#171717] hover:text-[#F2652A] transition-colors flex items-center gap-1 group py-1"
          >
            <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
            <span>Join</span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          id="nav-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden font-mono text-xs uppercase tracking-wider text-[#171717] py-2 px-1 focus-visible:outline-none"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E5E1] bg-[#FFFEFD] px-5 py-6 space-y-4 animate-in fade-in duration-200">
          <div>
            <button
              onClick={() => {
                onNavigate({ type: 'home' });
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left font-mono text-sm uppercase tracking-wider text-[#171717] hover:text-[#F2652A] py-2"
            >
              Home
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                onNavigate({ type: 'events' });
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left font-mono text-sm uppercase tracking-wider text-[#171717] hover:text-[#F2652A] py-2"
            >
              Events
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                onNavigate({ type: 'community' });
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left font-mono text-sm uppercase tracking-wider text-[#171717] hover:text-[#F2652A] py-2"
            >
              Community
            </button>
          </div>
          {onOpenAddEvent && (
            <div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAddEvent();
                }}
                className="block w-full text-left font-mono text-sm uppercase tracking-wider text-[#171717] hover:text-[#F2652A] py-2 flex items-center gap-1.5"
              >
                <span className="text-[#F2652A] font-bold">+</span>
                <span>Add Event</span>
              </button>
            </div>
          )}
          <div className="pt-2 border-t border-[#E8E5E1]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJoin();
              }}
              className="flex items-center gap-1 font-mono text-sm uppercase tracking-wider text-[#F2652A] py-2"
            >
              <span>↗</span>
              <span>Join Grafana Chennai</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
