import React, { useState } from 'react';
import { EventRow } from '../components/EventRow';
import { COMMUNITY_EVENTS } from '../data/events';
import { CommunityEvent, PageRoute } from '../types';

interface EventsPageProps {
  events?: CommunityEvent[];
  onNavigate: (route: PageRoute) => void;
  onOpenAddEvent: () => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({
  events = COMMUNITY_EVENTS,
  onNavigate,
  onOpenAddEvent,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Dynamic years from events list
  const years = Array.from(new Set(events.map((e) => e.dateDisplay.year))).sort(
    (a, b) => Number(b) - Number(a)
  );

  const filteredEvents =
    activeFilter === 'all'
      ? events
      : events.filter((e) => e.dateDisplay.year === activeFilter);

  return (
    <div className="w-full space-y-16 sm:space-y-24 pt-12 sm:pt-20">
      {/* Hero */}
      <section className="space-y-4 max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-[#6B6B6B] block">
            ARCHIVE // CHENNAI
          </span>

          <button
            id="add-event-button"
            onClick={onOpenAddEvent}
            className="self-start sm:self-auto font-mono text-xs uppercase tracking-wider text-[#171717] hover:text-[#F2652A] border border-[#E8E5E1] hover:border-[#F2652A] px-4 py-2 transition-colors flex items-center gap-1.5"
          >
            <span className="text-[#F2652A] font-bold">+</span>
            <span>Add Event</span>
          </button>
        </div>

        <h1 className="text-4xl sm:text-6xl font-light text-[#171717] tracking-tight">
          Events
        </h1>
        <p className="text-lg sm:text-xl text-[#6B6B6B] font-light max-w-xl">
          Meetups, talks and workshops in Chennai.
        </p>

        {/* Minimal Year Toggle Filter */}
        <div className="pt-6 flex flex-wrap items-center gap-6 font-mono text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`pb-1 uppercase tracking-wider transition-colors ${
              activeFilter === 'all'
                ? 'text-[#F2652A] border-b-2 border-[#F2652A] font-medium'
                : 'text-[#6B6B6B] hover:text-[#171717]'
            }`}
          >
            All Events ({events.length})
          </button>

          {years.map((year) => {
            const count = events.filter((e) => e.dateDisplay.year === year).length;
            return (
              <button
                key={year}
                onClick={() => setActiveFilter(year)}
                className={`pb-1 uppercase tracking-wider transition-colors ${
                  activeFilter === year
                    ? 'text-[#F2652A] border-b-2 border-[#F2652A] font-medium'
                    : 'text-[#6B6B6B] hover:text-[#171717]'
                }`}
              >
                {year} ({count})
              </button>
            );
          })}
        </div>
      </section>

      {/* Event List Section */}
      <div className="space-y-16">
        {activeFilter === 'all' ? (
          years.map((year) => {
            const yearGroup = events.filter((e) => e.dateDisplay.year === year);
            if (yearGroup.length === 0) return null;
            return (
              <section key={year} className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#E8E5E1] pb-3">
                  <span className="font-mono text-xs uppercase tracking-widest font-semibold text-[#171717]">
                    {year}
                  </span>
                  <span className="font-mono text-xs text-[#6B6B6B]">
                    {yearGroup.length} {yearGroup.length === 1 ? 'MEETUP' : 'MEETUPS'}
                  </span>
                </div>

                <div className="space-y-0">
                  {yearGroup.map((ev) => (
                    <EventRow
                      key={ev.slug}
                      event={ev}
                      onSelect={(slug) => onNavigate({ type: 'event-detail', slug })}
                    />
                  ))}
                </div>
              </section>
            );
          })
        ) : (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#E8E5E1] pb-3">
              <span className="font-mono text-xs uppercase tracking-widest font-semibold text-[#171717]">
                {activeFilter}
              </span>
              <span className="font-mono text-xs text-[#6B6B6B]">
                {filteredEvents.length} {filteredEvents.length === 1 ? 'MEETUP' : 'MEETUPS'}
              </span>
            </div>

            <div className="space-y-0">
              {filteredEvents.map((ev) => (
                <EventRow
                  key={ev.slug}
                  event={ev}
                  onSelect={(slug) => onNavigate({ type: 'event-detail', slug })}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
