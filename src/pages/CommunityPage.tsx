import React, { useState } from 'react';
import { PageRoute } from '../types';
import { GetInvolvedModal, GetInvolvedType } from '../components/GetInvolvedModal';
import { GrotMascot } from '../components/GrotMascot';
import { GrafanaLogo } from '../components/GrafanaLogo';

interface CommunityPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigate: _onNavigate }) => {
  const [modalType, setModalType] = useState<GetInvolvedType | null>(null);

  const organizers = [
    {
      name: 'Venkatesh Raghavan',
      role: 'Community Lead',
      focus: 'Distributed Systems & Observability',
    },
    {
      name: 'Sneha Narayanan',
      role: 'Organizer',
      focus: 'Cloud Architecture & Open Source',
    },
    {
      name: 'Karthik Subramanian',
      role: 'Co-Organizer',
      focus: 'Site Reliability Engineering',
    },
  ];

  return (
    <div className="w-full space-y-24 sm:space-y-32 pt-12 sm:pt-20 max-w-[1080px]">
      {/* Hero */}
      <section className="space-y-6">
        <div className="font-mono text-xs uppercase tracking-widest text-[#6B6B6B]">
          COMMUNITY // CHENNAI
        </div>

        <h1 className="text-4xl sm:text-6xl font-light text-[#171717] tracking-tight">
          Community
        </h1>

        <p className="text-xl sm:text-2xl text-[#6B6B6B] font-light max-w-2xl leading-relaxed">
          An open, independent gathering of engineers and students who care about telemetry, reliability, and modern systems.
        </p>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          WHAT WE ARE
         ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-[#E8E5E1] pt-12 sm:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <span className="font-mono text-xs uppercase tracking-wider text-[#6B6B6B] block">
              WHAT WE ARE
            </span>
          </div>
          <div className="md:col-span-8 space-y-6">
            <p className="text-lg text-[#171717] leading-relaxed">
              Grafana Chennai is organized by practicing DevOps, SRE, and platform engineers. We run regular in-person meetups, open-source workshops, and casual technical discussions across Chennai.
            </p>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">
              We operate under vendor-neutral community values: all technical meetups are free to attend, open to all experience levels, and strictly focused on honest engineering practices rather than vendor pitches.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          PEOPLE / ORGANIZERS
         ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-[#E8E5E1] pt-12 sm:pt-16 space-y-10">
        <div className="font-mono text-xs text-[#6B6B6B] uppercase tracking-wider">
          PEOPLE
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          {organizers.map((person, idx) => (
            <div key={idx} className="space-y-2 border-t border-[#E8E5E1] pt-4">
              <h3 className="text-base font-medium text-[#171717]">
                {person.name}
              </h3>
              <p className="font-mono text-xs text-[#F2652A]">
                {person.role}
              </p>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                {person.focus}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          GET INVOLVED: SPEAK, VOLUNTEER, HOST, PARTNER
         ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-[#E8E5E1] pt-12 sm:pt-16 space-y-10">
        <div className="font-mono text-xs text-[#6B6B6B] uppercase tracking-wider">
          GET INVOLVED
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            onClick={() => setModalType('SPEAK')}
            className="group border border-[#E8E5E1] hover:border-[#F2652A] p-6 cursor-pointer bg-[#FFFEFD] hover:bg-[#FAF9F7] transition-all space-y-3"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setModalType('SPEAK');
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#171717] group-hover:text-[#F2652A] transition-colors">
                SPEAK
              </span>
              <span className="font-mono text-xs text-[#6B6B6B] group-hover:text-[#F2652A] group-hover:translate-x-1 transition-all">→</span>
            </div>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Give a 25-minute architecture talk or a 5-minute lightning demo about an observability challenge you solved.
            </p>
          </div>

          <div
            onClick={() => setModalType('VOLUNTEER')}
            className="group border border-[#E8E5E1] hover:border-[#F2652A] p-6 cursor-pointer bg-[#FFFEFD] hover:bg-[#FAF9F7] transition-all space-y-3"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setModalType('VOLUNTEER');
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#171717] group-hover:text-[#F2652A] transition-colors">
                VOLUNTEER
              </span>
              <span className="font-mono text-xs text-[#6B6B6B] group-hover:text-[#F2652A] group-hover:translate-x-1 transition-all">→</span>
            </div>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Help coordinate event logistics, attendee check-in, audiovisual setups, photography, or website maintenance.
            </p>
          </div>

          <div
            onClick={() => setModalType('HOST')}
            className="group border border-[#E8E5E1] hover:border-[#F2652A] p-6 cursor-pointer bg-[#FFFEFD] hover:bg-[#FAF9F7] transition-all space-y-3"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setModalType('HOST');
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#171717] group-hover:text-[#F2652A] transition-colors">
                HOST
              </span>
              <span className="font-mono text-xs text-[#6B6B6B] group-hover:text-[#F2652A] group-hover:translate-x-1 transition-all">→</span>
            </div>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Offer your company's auditorium or tech conference hall (40–120 capacity) to host an upcoming Saturday morning meetup.
            </p>
          </div>

          <div
            onClick={() => setModalType('PARTNER')}
            className="group border border-[#E8E5E1] hover:border-[#F2652A] p-6 cursor-pointer bg-[#FFFEFD] hover:bg-[#FAF9F7] transition-all space-y-3"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setModalType('PARTNER');
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#171717] group-hover:text-[#F2652A] transition-colors">
                PARTNER
              </span>
              <span className="font-mono text-xs text-[#6B6B6B] group-hover:text-[#F2652A] group-hover:translate-x-1 transition-all">→</span>
            </div>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Collaborate on community swag, student workshop sponsorships, or regional open-source hackathons.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          MASCOT & BRAND ASSETS (GROT & GRAFANA VECTOR ASSETS)
         ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-[#E8E5E1] pt-12 sm:pt-16 space-y-10">
        <div className="flex items-center justify-between">
          <div className="font-mono text-xs text-[#6B6B6B] uppercase tracking-wider">
            MASCOT & BRAND
          </div>
          <span className="font-mono text-[11px] text-[#6B6B6B]">
            GRAFANA DESIGN SYSTEM
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Grot Spotlight Card */}
          <div className="md:col-span-7 border border-[#E8E5E1] p-6 sm:p-8 bg-[#FAF9F7]/60 flex flex-col justify-between space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="font-mono text-xs text-[#F2652A] uppercase tracking-wider font-semibold block">
                  OFFICIAL MASCOT
                </span>
                <h3 className="text-2xl font-light text-[#171717]">
                  Meet Grot
                </h3>
              </div>
              <span className="font-mono text-[10px] text-[#6B6B6B] border border-[#E8E5E1] px-2 py-0.5 bg-[#FFFEFD]">
                BABY DINOSAUR
              </span>
            </div>

            <p className="text-sm text-[#6B6B6B] leading-relaxed">
              Grot is the beloved mascot of Grafana Labs. Inspired by the original Grafana swirl glyph, Grot serves as an automated GitHub bot, the host of the Golden Grot Awards, and a friendly face for our Chennai community workshops.
            </p>

            {/* Interactive Grot character showcase */}
            <div className="py-4 flex flex-col sm:flex-row items-center gap-6 justify-around bg-[#FFFEFD] border border-[#E8E5E1] p-4">
              <GrotMascot size={110} showQuote={true} interactive={true} />
              <div className="space-y-2 text-center sm:text-left max-w-xs">
                <p className="font-mono text-xs font-medium text-[#171717]">
                  Golden Grot Awards
                </p>
                <p className="text-xs text-[#6B6B6B] leading-relaxed">
                  Have you built a world-class dashboard in Chennai? We nominate our community members for Grafana Labs' global Golden Grot Awards.
                </p>
                <div className="pt-1">
                  <a
                    href="/grot-mascot.svg"
                    download="grot-mascot.svg"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#F2652A] hover:underline"
                  >
                    <span>Download Grot Mascot SVG</span>
                    <span>↓</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Official Vector Assets & Colors Card */}
          <div className="md:col-span-5 border border-[#E8E5E1] p-6 sm:p-8 bg-[#FFFEFD] flex flex-col justify-between space-y-6">
            <div className="space-y-1">
              <span className="font-mono text-xs text-[#6B6B6B] uppercase tracking-wider font-medium block">
                COMMUNITY TOOLKIT
              </span>
              <h3 className="text-xl font-light text-[#171717]">
                Vector Graphics & Colors
              </h3>
            </div>

            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Clean, scalable SVG vector assets for speaker slides, community posters, and technical hackathon projects.
            </p>

            {/* Asset downloads */}
            <div className="space-y-3 font-mono text-xs">
              <a
                href="/grafana-logo.svg"
                download="grafana-logo.svg"
                className="flex items-center justify-between p-3 border border-[#E8E5E1] hover:border-[#F2652A] transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <GrafanaLogo size={18} />
                  <span className="text-[#171717] font-medium">Grafana Swirl Logo</span>
                </div>
                <span className="text-[#F2652A] group-hover:translate-y-0.5 transition-transform">SVG ↓</span>
              </a>

              <a
                href="/grot-mascot.svg"
                download="grot-mascot.svg"
                className="flex items-center justify-between p-3 border border-[#E8E5E1] hover:border-[#F2652A] transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#F2652A] flex items-center justify-center text-[10px] text-white font-bold">G</span>
                  <span className="text-[#171717] font-medium">Grot Mascot Artwork</span>
                </div>
                <span className="text-[#F2652A] group-hover:translate-y-0.5 transition-transform">SVG ↓</span>
              </a>
            </div>

            {/* Brand Color Swatches */}
            <div className="pt-2 border-t border-[#E8E5E1] space-y-2">
              <span className="font-mono text-[10px] uppercase text-[#6B6B6B] tracking-wider block">
                BRAND PALETTE
              </span>
              <div className="grid grid-cols-3 gap-2 font-mono text-[10px]">
                <div className="border border-[#E8E5E1] p-2 space-y-1">
                  <div className="w-full h-4 bg-[#F2652A]" />
                  <span className="block text-[#171717] font-bold">#F2652A</span>
                  <span className="block text-[#6B6B6B]">ORANGE</span>
                </div>
                <div className="border border-[#E8E5E1] p-2 space-y-1">
                  <div className="w-full h-4 bg-[#F9A824]" />
                  <span className="block text-[#171717] font-bold">#F9A824</span>
                  <span className="block text-[#6B6B6B]">GOLD</span>
                </div>
                <div className="border border-[#E8E5E1] p-2 space-y-1">
                  <div className="w-full h-4 bg-[#171717]" />
                  <span className="block text-[#171717] font-bold">#171717</span>
                  <span className="block text-[#6B6B6B]">CHARCOAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          COMMUNITY LINKS
         ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-[#E8E5E1] pt-12 sm:pt-16 space-y-8">
        <div className="font-mono text-xs text-[#6B6B6B] uppercase tracking-wider">
          LINKS
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <a
            href="https://meetup.com"
            target="_blank"
            rel="noreferrer"
            className="p-4 border border-[#E8E5E1] hover:border-[#F2652A] transition-colors flex items-center justify-between group"
          >
            <span>Meetup</span>
            <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#F2652A]">↗</span>
          </a>

          <a
            href="https://github.com/grafanachennai"
            target="_blank"
            rel="noreferrer"
            className="p-4 border border-[#E8E5E1] hover:border-[#F2652A] transition-colors flex items-center justify-between group"
          >
            <span>GitHub</span>
            <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#F2652A]">↗</span>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="p-4 border border-[#E8E5E1] hover:border-[#F2652A] transition-colors flex items-center justify-between group"
          >
            <span>LinkedIn</span>
            <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#F2652A]">↗</span>
          </a>

          <a
            href="https://chat.whatsapp.com"
            target="_blank"
            rel="noreferrer"
            className="p-4 border border-[#E8E5E1] hover:border-[#F2652A] transition-colors flex items-center justify-between group"
          >
            <span>Community Group</span>
            <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#F2652A]">↗</span>
          </a>
        </div>
      </section>

      {/* Modal */}
      <GetInvolvedModal
        initialType={modalType || 'SPEAK'}
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
      />
    </div>
  );
};
