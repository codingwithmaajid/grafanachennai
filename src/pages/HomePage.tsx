import React from 'react';
import { EventRow } from '../components/EventRow';
import { COMMUNITY_EVENTS } from '../data/events';
import { CommunityEvent, PageRoute } from '../types';
import { GrotMascot } from '../components/GrotMascot';
import { FluidHeroGradient } from '../components/FluidHeroGradient';
import { MascotDisplay } from '../components/MascotDisplay';

interface HomePageProps {
  events?: CommunityEvent[];
  onNavigate: (route: PageRoute) => void;
  onOpenRSVP: (eventSlug: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ events = COMMUNITY_EVENTS, onNavigate }) => {
  const nextEvent = events.find((e) => e.isNextEvent && e.isUpcoming) || events.find((e) => e.isUpcoming) || events[0];
  const recentEvents = events.slice(0, 3);

  return (
    <div className="w-full">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 01 — HERO (WHOLE PAGE ABOVE THE ABOUT SECTION)
          The ENTIRE page above the about page is this blurry gradient!
          No box, no card frame!
         ───────────────────────────────────────────────────────────── */}
      <section
        id="hero-gradient-section"
        className="relative w-full overflow-hidden pt-12 sm:pt-20 md:pt-24 pb-16 sm:pb-24 border-b border-[#E8E5E1]"
      >
        {/* Full fluid blurry gradient in the background */}
        <FluidHeroGradient />

        {/* Content container aligned with the site margins */}
        <div className="relative z-10 max-w-[1280px] xl:max-w-[1360px] mx-auto px-5 sm:px-10 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 md:gap-14">
            <div className="space-y-8 max-w-2xl">
              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#171717] leading-[1.08]">
                Grafana <br className="hidden sm:inline" />
                <span className="font-normal">Chennai</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-2xl text-[#1F1F1F] font-normal max-w-xl leading-relaxed">
                A local community around Grafana, observability, and open source.
              </p>

              {/* Simple link */}
              <div className="pt-2">
                <button
                  id="hero-explore-events-btn"
                  onClick={() => onNavigate({ type: 'events' })}
                  className="inline-flex items-center gap-2.5 bg-[#171717] hover:bg-black text-white px-7 py-3.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-0.5 group focus-visible:outline-none"
                >
                  <span>Explore events</span>
                  <span className="transform transition-transform duration-200 group-hover:translate-x-1.5">→</span>
                </button>
              </div>
            </div>

            {/* Mascot picture */}
            <div className="flex justify-start md:justify-end md:pr-4 pt-2 md:pt-0">
              <MascotDisplay />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 02 — ABOUT (01 ABOUT) & REST OF THE PAGE
         ───────────────────────────────────────────────────────────── */}
      <div className="max-w-[1280px] xl:max-w-[1360px] mx-auto px-5 sm:px-10 lg:px-12 space-y-24 sm:space-y-32 pt-16 sm:pt-20">
        <section className="pt-4">
        <div className="space-y-6">
          {/* Section index marker */}
          <div className="font-mono text-xs text-[#6B6B6B] uppercase tracking-wider">
            01 <span className="mx-2 text-[#E8E5E1]">/</span> ABOUT
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 pt-4">
            {/* Left */}
            <div className="md:col-span-5">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#171717] leading-snug">
                A community for people who build and operate things.
              </h2>
            </div>

            {/* Right */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
              <p className="text-base sm:text-lg text-[#6B6B6B] leading-relaxed">
                Grafana Chennai brings together engineers, developers, students and open-source contributors to learn about observability, share ideas and meet others working with modern infrastructure.
              </p>
              <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed">
                We meet in person across Chennai to talk about metrics architectures, distributed traces, log pipelines, dashboards, and production incident lessons. Free to attend and organized by the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 03 — NEXT EVENT (02 NEXT EVENT)
          Main functional section. Large editorial listing row.
         ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-[#E8E5E1] pt-12 sm:pt-16">
        <div className="space-y-8">
          <div className="font-mono text-xs text-[#6B6B6B] uppercase tracking-wider">
            02 <span className="mx-2 text-[#E8E5E1]">/</span> NEXT EVENT
          </div>

          {/* Large editorial event banner row */}
          <div
            onClick={() => onNavigate({ type: 'event-detail', slug: nextEvent.slug })}
            className="group border border-[#E8E5E1] hover:border-[#F2652A] p-6 sm:p-10 lg:p-12 transition-all duration-200 cursor-pointer bg-[#FFFEFD] hover:bg-[#FAF9F7]/40"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigate({ type: 'event-detail', slug: nextEvent.slug });
              }
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start md:items-center">
              {/* Date */}
              <div className="md:col-span-4 space-y-1">
                <span className="font-mono text-sm sm:text-base uppercase tracking-widest text-[#F2652A] block font-medium">
                  {nextEvent.dateDisplay.day} {nextEvent.dateDisplay.month} {nextEvent.dateDisplay.year}
                </span>
                <span className="font-mono text-xs text-[#6B6B6B] block">
                  {nextEvent.eventNumber}
                </span>
              </div>

              {/* Title & Venue */}
              <div className="md:col-span-5 space-y-2">
                <h3 className="text-2xl sm:text-3xl font-normal text-[#171717] group-hover:text-[#F2652A] transition-colors">
                  {nextEvent.title.toUpperCase()}
                </h3>
                <div className="font-mono text-xs text-[#6B6B6B] space-y-0.5">
                  <p>{nextEvent.city} · {nextEvent.location.name}</p>
                  <p>{nextEvent.timeShort}</p>
                </div>
              </div>

              {/* Action link */}
              <div className="md:col-span-3 flex md:justify-end items-center pt-2 md:pt-0">
                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#171717] group-hover:text-[#F2652A] transition-colors">
                  <span>View event</span>
                  <span className="transform transition-transform duration-200 group-hover:translate-x-1.5">→</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 04 — EVENTS (03 EVENTS)
          Shows 3-5 events archive.
          Bottom: View all events →
         ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-[#E8E5E1] pt-12 sm:pt-16">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="font-mono text-xs text-[#6B6B6B] uppercase tracking-wider">
              03 <span className="mx-2 text-[#E8E5E1]">/</span> EVENTS
            </div>
            <span className="font-mono text-xs text-[#6B6B6B]">2026 ARCHIVE</span>
          </div>

          <div className="space-y-0">
            {recentEvents.map((ev) => (
              <EventRow
                key={ev.slug}
                event={ev}
                onSelect={(slug) => onNavigate({ type: 'event-detail', slug })}
              />
            ))}
          </div>

          <div className="pt-6 border-t border-[#E8E5E1]">
            <button
              id="view-all-events-btn"
              onClick={() => onNavigate({ type: 'events' })}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#171717] hover:text-[#F2652A] group transition-colors focus-visible:outline-none"
            >
              <span>View all events</span>
              <span className="transform transition-transform duration-200 group-hover:translate-x-1.5">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 05 — COMMUNITY (04 COMMUNITY)
          Very restrained.
          Headline: Meet people who care about how things work.
          Three words: LEARN        SHARE        CONTRIBUTE
          One sentence.
         ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-[#E8E5E1] pt-12 sm:pt-16">
        <div className="space-y-10">
          <div className="font-mono text-xs text-[#6B6B6B] uppercase tracking-wider">
            04 <span className="mx-2 text-[#E8E5E1]">/</span> COMMUNITY
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-8 space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#171717] leading-snug">
                Meet people who care about how things work.
              </h2>

              {/* Three restrained words */}
              <div className="pt-2 pb-2">
                <div className="flex flex-wrap gap-x-12 sm:gap-x-16 gap-y-3 font-mono text-xs sm:text-sm tracking-widest uppercase text-[#F2652A] font-medium">
                  <span>LEARN</span>
                  <span>SHARE</span>
                  <span>CONTRIBUTE</span>
                </div>
              </div>

              {/* One sentence */}
              <p className="text-base sm:text-lg text-[#6B6B6B] leading-relaxed">
                Whether you are tuning an alerting pipeline, contributing to an open-source exporter, or diagnosing latency bottlenecks, you will find colleagues working on the same challenges.
              </p>

              <div className="pt-4 flex flex-wrap gap-6 items-center">
                <button
                  id="community-learn-more-btn"
                  onClick={() => onNavigate({ type: 'community' })}
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#171717] hover:text-[#F2652A] group transition-colors focus-visible:outline-none"
                >
                  <span>About the community</span>
                  <span className="transform transition-transform duration-200 group-hover:translate-x-1.5">→</span>
                </button>
              </div>
            </div>

            {/* Mascot Corner Card */}
            <div className="md:col-span-4 border border-[#E8E5E1] p-6 bg-[#FAF9F7]/60 flex flex-col items-center text-center space-y-3">
              <GrotMascot size={95} showQuote={true} interactive={true} />
              <div className="space-y-1">
                <p className="font-mono text-xs text-[#171717] font-medium">
                  Meet Grot
                </p>
                <p className="text-[11px] text-[#6B6B6B]">
                  Official Grafana mascot & ambassador for the Golden Grot Awards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};
