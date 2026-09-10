import React, { useState } from 'react';
import { CommunityEvent, PageRoute } from '../types';
import { RSVPModal } from '../components/RSVPModal';

interface EventDetailPageProps {
  event: CommunityEvent;
  onNavigate: (route: PageRoute) => void;
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({ event, onNavigate }) => {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);

  return (
    <div className="w-full space-y-24 sm:space-y-32 pt-10 sm:pt-16 max-w-[1080px]">
      {/* Back button */}
      <div>
        <button
          onClick={() => onNavigate({ type: 'events' })}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#6B6B6B] hover:text-[#171717] transition-colors group focus-visible:outline-none"
        >
          <span className="transform transition-transform duration-200 group-hover:-translate-x-1">←</span>
          <span>All Events</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 13 — EVENT HEADER
          GRAFANA CHENNAI
          EVENT / 01
          Grafana & Friends
          Chennai
          18 SEPTEMBER 2026
          18:00 — 20:30
          CHENNAI, INDIA
          Register → (One orange button)
         ───────────────────────────────────────────────────────────── */}
      <section className="space-y-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#6B6B6B]">
            <span>GRAFANA CHENNAI</span>
            <span className="text-[#E8E5E1]">/</span>
            <span className="text-[#F2652A] font-medium">{event.eventNumber}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light text-[#171717] tracking-tight leading-[1.08]">
            {event.title.split(' ')[0]} {event.title.split(' ')[1] || ''} <br className="hidden sm:inline" />
            <span className="font-normal">{event.title.split(' ').slice(2).join(' ') || event.city}</span>
          </h1>
        </div>

        {/* Metadata grid */}
        <div className="border-t border-b border-[#E8E5E1] py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-[#6B6B6B] block uppercase tracking-wider">Date</span>
            <span className="text-[#171717] font-medium block sm:text-sm uppercase">
              {event.dateDisplay.day} {event.dateDisplay.monthFull} {event.dateDisplay.year}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[#6B6B6B] block uppercase tracking-wider">Time</span>
            <span className="text-[#171717] font-medium block sm:text-sm">
              {event.timeDisplay}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[#6B6B6B] block uppercase tracking-wider">Location</span>
            <span className="text-[#171717] font-medium block sm:text-sm uppercase">
              {event.city}, INDIA
            </span>
          </div>
        </div>

        {/* Register & Meetup Link Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          {event.isUpcoming ? (
            <button
              id="event-register-button"
              onClick={() => setIsRSVPOpen(true)}
              className="bg-[#F2652A] hover:bg-[#171717] text-[#FFFEFD] font-mono text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 transition-colors inline-flex items-center gap-2 group cursor-pointer focus-visible:outline-none"
            >
              <span>Register</span>
              <span className="transform transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-wider border border-[#E8E5E1] px-4 py-2.5 text-[#6B6B6B] bg-[#FAF9F7]">
              <span>EVENT CONCLUDED</span>
              <span className="text-[#E8E5E1]">|</span>
              <span className="text-[#171717]">ARCHIVE & SLIDES BELOW</span>
            </div>
          )}

          {event.meetupLink && (
            <a
              href={event.meetupLink}
              target="_blank"
              rel="noreferrer"
              className="border border-[#E8E5E1] hover:border-[#171717] hover:bg-[#FAF9F7] text-[#171717] font-mono text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 transition-colors inline-flex items-center gap-2 group"
            >
              <span>Meetup.com</span>
              <span className="transform transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#F2652A]">↗</span>
            </a>
          )}
        </div>

        {/* Event Poster if present */}
        {event.poster && (
          <div className="pt-4 border-t border-[#E8E5E1]">
            <span className="font-mono text-xs uppercase tracking-wider text-[#6B6B6B] block mb-3">
              EVENT POSTER
            </span>
            <div className="max-w-xl border border-[#E8E5E1] bg-[#FAF9F7] overflow-hidden">
              <img
                src={event.poster}
                alt={`${event.title} poster`}
                referrerPolicy="no-referrer"
                className="w-full max-h-[420px] object-cover contrast-105"
              />
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 14 — EVENT DESCRIPTION
          Two-column layout
          Left: ABOUT
          Right: Actual event description
         ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-[#E8E5E1] pt-12 sm:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <span className="font-mono text-xs uppercase tracking-wider text-[#6B6B6B] block">
              ABOUT
            </span>
          </div>
          <div className="md:col-span-8 space-y-6">
            <p className="text-xl sm:text-2xl font-light text-[#171717] leading-relaxed">
              {event.description}
            </p>
            {event.detailedAbout && (
              <p className="text-base text-[#6B6B6B] leading-relaxed">
                {event.detailedAbout}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 15 — SPEAKERS
          Only show when speakers exist.
          SPEAKERS
          01
          NAME
          Role, Company
          Talk title →
         ───────────────────────────────────────────────────────────── */}
      {event.speakers && event.speakers.length > 0 && (
        <section className="border-t border-[#E8E5E1] pt-12 sm:pt-16 space-y-10">
          <div className="font-mono text-xs text-[#6B6B6B] uppercase tracking-wider">
            SPEAKERS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {event.speakers.map((speaker, index) => (
              <div key={speaker.id} className="space-y-4">
                <span className="font-mono text-xs text-[#F2652A] block font-medium">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="space-y-1">
                  <h3 className="text-xl font-medium text-[#171717]">
                    {speaker.name}
                  </h3>
                  <p className="font-mono text-xs text-[#6B6B6B]">
                    {speaker.role}, {speaker.company}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#E8E5E1] space-y-2">
                  <span className="font-mono text-[11px] text-[#6B6B6B] uppercase tracking-wider block">
                    Talk
                  </span>
                  <p className="text-base text-[#171717] font-normal leading-snug">
                    {speaker.talkTitle}
                  </p>
                  {speaker.bio && (
                    <p className="text-xs text-[#6B6B6B] pt-1 leading-relaxed">
                      {speaker.bio}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SECTION 16 — SCHEDULE
          Thin lines. Lots of whitespace.
         ───────────────────────────────────────────────────────────── */}
      {event.schedule && event.schedule.length > 0 && (
        <section className="border-t border-[#E8E5E1] pt-12 sm:pt-16 space-y-10">
          <div className="font-mono text-xs text-[#6B6B6B] uppercase tracking-wider">
            SCHEDULE
          </div>

          <div className="border-t border-[#E8E5E1] divide-y divide-[#E8E5E1]">
            {event.schedule.map((item, idx) => (
              <div
                key={idx}
                className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline"
              >
                <div className="sm:col-span-3 font-mono text-xs sm:text-sm text-[#171717] font-medium">
                  {item.time}
                </div>
                <div className="sm:col-span-9 space-y-1">
                  <p className="text-sm sm:text-base text-[#171717]">
                    {item.title}
                  </p>
                  {item.detail && (
                    <p className="text-xs text-[#6B6B6B]">
                      {item.detail}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SECTION 17 — VENUE
          VENUE
          Venue Name
          Full address
          Chennai, Tamil Nadu
          Open in Maps →
          Monochrome map/coordinates graphic
         ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-[#E8E5E1] pt-12 sm:pt-16 space-y-10">
        <div className="font-mono text-xs text-[#6B6B6B] uppercase tracking-wider">
          VENUE
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-6 space-y-4">
            <h3 className="text-xl sm:text-2xl font-normal text-[#171717]">
              {event.location.name}
            </h3>
            <p className="text-sm text-[#6B6B6B] leading-relaxed max-w-md">
              {event.location.address}
            </p>
            <div className="font-mono text-xs text-[#6B6B6B]">
              COORDINATES: {event.location.coordinates}
            </div>
            <div className="pt-2">
              <a
                href={event.location.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#171717] hover:text-[#F2652A] transition-colors group"
              >
                <span>Open in Maps</span>
                <span className="transform transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          {/* Minimal monochrome schematic map preview */}
          <div className="md:col-span-6 border border-[#E8E5E1] bg-[#FAF9F7] p-6 space-y-4">
            <div className="flex items-center justify-between font-mono text-[10px] text-[#6B6B6B] tracking-wider border-b border-[#E8E5E1] pb-2">
              <span>LOCATION SCHEMATIC</span>
              <span>CHENNAI // {event.location.city.toUpperCase()}</span>
            </div>
            <div className="h-28 w-full flex items-center justify-center relative overflow-hidden bg-white/60 border border-[#E8E5E1]">
              {/* Abstract minimalist coordinate grid lines */}
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 opacity-30 pointer-events-none">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="border-r border-b border-[#171717]" />
                ))}
              </div>
              <div className="relative z-10 flex flex-col items-center gap-1.5 text-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F2652A] ring-4 ring-[#F2652A]/20"></span>
                <span className="font-mono text-[11px] text-[#171717] font-medium">
                  {event.location.name}
                </span>
                <span className="font-mono text-[10px] text-[#6B6B6B]">
                  {event.location.coordinates}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 18 — MOMENTS / EVENT PHOTOS
          After the event, this section appears.
          [large image] [small image]
          [small image] [large image]
         ───────────────────────────────────────────────────────────── */}
      {event.photos && event.photos.length > 0 && (
        <section className="border-t border-[#E8E5E1] pt-12 sm:pt-16 space-y-8">
          <div className="flex items-center justify-between">
            <div className="font-mono text-xs text-[#6B6B6B] uppercase tracking-wider">
              MOMENTS
            </div>
            <span className="font-mono text-xs text-[#6B6B6B]">COMMUNITY ARCHIVE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6">
            {event.photos.map((photo, i) => {
              // Pattern alternating: [large (col-span-7)] [small (col-span-5)]
              const isLarge = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`overflow-hidden border border-[#E8E5E1] group bg-[#FAF9F7] ${
                    isLarge ? 'sm:col-span-7' : 'sm:col-span-5'
                  }`}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-56 sm:h-72 object-cover grayscale contrast-105 group-hover:grayscale-0 transition-all duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="p-3 border-t border-[#E8E5E1] bg-[#FFFEFD]">
                    <p className="font-mono text-[11px] text-[#6B6B6B]">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SECTION 19 — FINAL EVENT CTA
          ────────────────────────────────────────
          SEE YOU AT THE NEXT ONE.
          Grafana Chennai
          Events →
          ────────────────────────────────────────
         ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-b border-[#E8E5E1] py-14 sm:py-20">
        <div className="space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-[#F2652A] block font-medium">
            SEE YOU AT THE NEXT ONE.
          </span>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6">
            <h3 className="text-2xl sm:text-3xl font-light text-[#171717]">
              Grafana Chennai
            </h3>
            <button
              onClick={() => onNavigate({ type: 'events' })}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#171717] hover:text-[#F2652A] transition-colors group focus-visible:outline-none"
            >
              <span>Events</span>
              <span className="transform transition-transform duration-200 group-hover:translate-x-1.5">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* RSVP Modal */}
      <RSVPModal
        event={event}
        isOpen={isRSVPOpen}
        onClose={() => setIsRSVPOpen(false)}
      />
    </div>
  );
};
