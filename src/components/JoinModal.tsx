import React from 'react';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGetInvolved: () => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose, onSelectGetInvolved }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px] animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#FFFEFD] border border-[#E8E5E1] p-6 sm:p-8 relative shadow-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#E8E5E1] pb-4 mb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#6B6B6B] block">
              COMMUNITY // CONNECT
            </span>
            <h3 className="text-xl font-medium text-[#171717] mt-1">
              Join Grafana Chennai
            </h3>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-xs text-[#6B6B6B] hover:text-[#171717] p-1 uppercase"
            aria-label="Close dialog"
          >
            [ESC]
          </button>
        </div>

        <p className="text-sm text-[#6B6B6B] mb-6">
          Grafana Chennai is an open technical community. No membership fee, no promotional emails. Join the channels where local discussions happen:
        </p>

        {/* Links */}
        <div className="space-y-3 font-mono text-xs">
          <a
            href="https://meetup.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-3.5 border border-[#E8E5E1] hover:border-[#F2652A] hover:bg-[#FAF9F7] transition-all group"
          >
            <div>
              <span className="font-medium text-[#171717] block">Meetup.com Group</span>
              <span className="text-[11px] text-[#6B6B6B]">Primary channel for event announcements and RSVPs</span>
            </div>
            <span className="text-[#F2652A] group-hover:translate-x-1 transition-transform">↗</span>
          </a>

          <a
            href="https://github.com/grafanachennai"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-3.5 border border-[#E8E5E1] hover:border-[#F2652A] hover:bg-[#FAF9F7] transition-all group"
          >
            <div>
              <span className="font-medium text-[#171717] block">GitHub Organization</span>
              <span className="text-[11px] text-[#6B6B6B]">Open-source repos, sample configs, and slide decks</span>
            </div>
            <span className="text-[#F2652A] group-hover:translate-x-1 transition-transform">↗</span>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-3.5 border border-[#E8E5E1] hover:border-[#F2652A] hover:bg-[#FAF9F7] transition-all group"
          >
            <div>
              <span className="font-medium text-[#171717] block">LinkedIn Group</span>
              <span className="text-[11px] text-[#6B6B6B]">Professional networking and community updates</span>
            </div>
            <span className="text-[#F2652A] group-hover:translate-x-1 transition-transform">↗</span>
          </a>

          <button
            onClick={() => {
              onClose();
              onSelectGetInvolved();
            }}
            className="w-full flex items-center justify-between p-3.5 border border-[#E8E5E1] hover:border-[#F2652A] hover:bg-[#FAF9F7] transition-all group text-left"
          >
            <div>
              <span className="font-medium text-[#171717] block">Speak, Volunteer, or Host</span>
              <span className="text-[11px] text-[#6B6B6B]">Propose a talk or offer venue space for upcoming meetups</span>
            </div>
            <span className="text-[#F2652A] group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
