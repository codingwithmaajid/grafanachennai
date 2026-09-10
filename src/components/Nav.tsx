import React, { useState, useRef, useEffect } from 'react';
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isCurrent = (type: PageRoute['type']) => currentRoute.type === type;

  // Auto-hide navbar when scrolling down; reveal when scrolling up or at top
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always keep visible if near the top of the page
      if (currentScrollY < 60) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollYRef.current + 6) {
        // Scrolling down -> hide navbar & close dropdown
        setIsVisible(false);
        setDropdownOpen(false);
      } else if (currentScrollY < lastScrollYRef.current - 6) {
        // Scrolling up -> show navbar
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  return (
    <>
      {/* Floating Top Notch Header bar like Supaste.com */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-300 ease-in-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative inline-flex items-center pointer-events-auto">
          {/* Left Inverted Flange Corner (Supaste notch curve) */}
          <div className="hidden sm:block absolute top-0 -left-[18px] w-[18px] h-[18px] pointer-events-none">
            <svg
              viewBox="0 0 20 20"
              className="w-full h-full text-black fill-current rotate-90"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M 0 0 L 20 0 C 8.954 0 0 8.954 0 20 Z" />
            </svg>
          </div>

          {/* Main Black Pill Navbar */}
          <nav
            id="supaste-style-navbar"
            className="bg-black text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-b-[18px] shadow-2xl flex items-center gap-3 sm:gap-4 border-b border-x border-white/10"
          >
            {/* Centerpiece: Grafana Chennai with interactive hover pop-up */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                id="nav-brand-button"
                onClick={() => {
                  onNavigate({ type: 'home' });
                  setDropdownOpen(false);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2.5 px-3 py-1 rounded-full text-left group transition-all duration-200 hover:bg-white/10 focus-visible:outline-none"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#1F1F1F] flex items-center justify-center p-1 border border-white/10 transition-transform duration-200 group-hover:scale-105 shadow-inner">
                  <GrafanaLogo size={18} color="#FF8800" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-sans text-sm sm:text-base font-semibold tracking-tight text-white whitespace-nowrap">
                    Grafana <span className="font-normal text-white/70">Chennai</span>
                  </span>
                  <svg
                    className={`w-3 h-3 text-white/50 transition-transform duration-200 ${
                      dropdownOpen ? 'rotate-180 text-[#FF8800]' : 'group-hover:text-white/80'
                    }`}
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 4.5 6 7.5 9 4.5" />
                  </svg>
                </div>
              </button>

              {/* Interactive Pop-up / Dropdown Panel */}
              <div
                id="brand-hover-popup"
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[280px] transition-all duration-200 transform ${
                  dropdownOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
                    : 'opacity-0 -translate-y-1.5 pointer-events-none scale-[0.98]'
                }`}
              >
                <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-white ring-1 ring-white/5">
                  {/* Micro header info bar */}
                  <div className="px-3 py-2 flex items-center justify-between border-b border-white/[0.08] mb-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
                      Navigation
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400">
                      13.08° N, 80.27° E
                    </span>
                  </div>

                  {/* Redirection Link: Home */}
                  <button
                    id="popup-link-home"
                    onClick={() => {
                      onNavigate({ type: 'home' });
                      setDropdownOpen(false);
                    }}
                    className={`group w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all ${
                      isCurrent('home')
                        ? 'bg-white/[0.08] text-white'
                        : 'text-neutral-300 hover:bg-white/[0.05] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] text-[#FF8800] font-semibold">01</span>
                      <div>
                        <div className="text-[13px] font-medium tracking-tight">Overview</div>
                        <div className="text-[11px] text-neutral-400">Chapter landing &amp; manifesto</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-all">
                      ↗
                    </span>
                  </button>

                  {/* Redirection Link: Events */}
                  <button
                    id="popup-link-events"
                    onClick={() => {
                      onNavigate({ type: 'events' });
                      setDropdownOpen(false);
                    }}
                    className={`group w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all ${
                      isCurrent('events') || isCurrent('event-detail')
                        ? 'bg-white/[0.08] text-white'
                        : 'text-neutral-300 hover:bg-white/[0.05] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] text-[#FF8800] font-semibold">02</span>
                      <div>
                        <div className="text-[13px] font-medium tracking-tight">Events</div>
                        <div className="text-[11px] text-neutral-400">Meetups, dates &amp; schedule</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-all">
                      ↗
                    </span>
                  </button>

                  {/* Redirection Link: Community */}
                  <button
                    id="popup-link-community"
                    onClick={() => {
                      onNavigate({ type: 'community' });
                      setDropdownOpen(false);
                    }}
                    className={`group w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all ${
                      isCurrent('community')
                        ? 'bg-white/[0.08] text-white'
                        : 'text-neutral-300 hover:bg-white/[0.05] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] text-[#FF8800] font-semibold">03</span>
                      <div>
                        <div className="text-[13px] font-medium tracking-tight">Community</div>
                        <div className="text-[11px] text-neutral-400">People, culture &amp; handbook</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-all">
                      ↗
                    </span>
                  </button>

                  {/* Redirection Link: Propose Talk / Add Event */}
                  {onOpenAddEvent && (
                    <button
                      id="popup-link-add-event"
                      onClick={() => {
                        onOpenAddEvent();
                        setDropdownOpen(false);
                      }}
                      className="group w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-neutral-300 hover:bg-white/[0.05] hover:text-white transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[11px] text-[#FF8800] font-semibold">04</span>
                        <div>
                          <div className="text-[13px] font-medium tracking-tight">Call for Speakers</div>
                          <div className="text-[11px] text-neutral-400">Submit a session or talk</div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-all">
                        ↗
                      </span>
                    </button>
                  )}

                  {/* Footer Action: Clean monospace link */}
                  <div className="pt-2 mt-1 border-t border-white/[0.08]">
                    <button
                      id="popup-link-join"
                      onClick={() => {
                        onOpenJoin();
                        setDropdownOpen(false);
                      }}
                      className="w-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs py-2 px-3 rounded-xl text-center flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
                    >
                      <span>Join Chapter Channels</span>
                      <span className="text-xs">↗</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Button on the right side */}
            <button
              id="nav-join-button"
              onClick={onOpenJoin}
              className="bg-white hover:bg-neutral-200 text-black text-xs font-semibold px-3 sm:px-3.5 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1 shadow-sm active:scale-95 whitespace-nowrap"
            >
              <span>Join</span>
              <span className="text-xs">↗</span>
            </button>

            {/* Mobile Menu Toggle button */}
            <button
              id="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden text-white/80 hover:text-white p-1 text-xs font-mono uppercase tracking-wider focus-visible:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </nav>

          {/* Right Inverted Flange Corner (Supaste notch curve) */}
          <div className="hidden sm:block absolute top-0 -right-[18px] w-[18px] h-[18px] pointer-events-none">
            <svg
              viewBox="0 0 20 20"
              className="w-full h-full text-black fill-current"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M 0 0 L 20 0 C 8.954 0 0 8.954 0 20 Z" />
            </svg>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed top-14 left-4 right-4 z-50 bg-[#111111] text-white border border-white/10 rounded-2xl p-4 shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-2 sm:hidden">
          <button
            onClick={() => {
              onNavigate({ type: 'home' });
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 text-sm font-medium text-white hover:bg-white/5 rounded-lg"
          >
            01 Overview
          </button>
          <button
            onClick={() => {
              onNavigate({ type: 'events' });
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 text-sm font-medium text-white hover:bg-white/5 rounded-lg"
          >
            02 Events &amp; Meetups
          </button>
          <button
            onClick={() => {
              onNavigate({ type: 'community' });
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 text-sm font-medium text-white hover:bg-white/5 rounded-lg"
          >
            03 Community &amp; Organizers
          </button>
          {onOpenAddEvent && (
            <button
              onClick={() => {
                onOpenAddEvent();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-[#FF8800] hover:bg-white/5 rounded-lg flex items-center gap-1.5"
            >
              <span>04 Call for Speakers</span>
            </button>
          )}
          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => {
                onOpenJoin();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-white text-black font-semibold text-center py-2 rounded-lg text-sm"
            >
              Join Chapter Channels ↗
            </button>
          </div>
        </div>
      )}
    </>
  );
};
