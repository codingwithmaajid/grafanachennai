import React, { useState } from 'react';
import { CommunityEvent } from '../types';

interface RSVPModalProps {
  event: CommunityEvent;
  isOpen: boolean;
  onClose: () => void;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({ event, isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    question: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', company: '', question: '' });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px] animate-in fade-in duration-200"
      onClick={handleReset}
    >
      <div
        className="w-full max-w-lg bg-[#FFFEFD] border border-[#E8E5E1] p-6 sm:p-8 relative shadow-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#E8E5E1] pb-4 mb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#6B6B6B] block">
              REGISTRATION // {event.eventNumber}
            </span>
            <h3 className="text-xl font-medium text-[#171717] mt-1">
              {event.title}
            </h3>
          </div>
          <button
            onClick={handleReset}
            className="font-mono text-xs text-[#6B6B6B] hover:text-[#171717] p-1 uppercase"
            aria-label="Close dialog"
          >
            [ESC]
          </button>
        </div>

        {submitted ? (
          <div className="space-y-6">
            <div className="border border-[#E8E5E1] bg-[#FAF9F7] p-4 space-y-2">
              <span className="font-mono text-xs uppercase text-[#F2652A] font-medium block">
                RSVP CONFIRMED
              </span>
              <p className="text-sm text-[#171717]">
                Thank you, <span className="font-medium">{formData.name}</span>. You are registered for{' '}
                <span className="font-medium">{event.title}</span>.
              </p>
              <div className="font-mono text-xs text-[#6B6B6B] pt-2 space-y-1">
                <div>DATE: {event.dateDisplay.day} {event.dateDisplay.monthFull} {event.dateDisplay.year}</div>
                <div>TIME: {event.timeDisplay}</div>
                <div>VENUE: {event.location.name}</div>
              </div>
            </div>

            <p className="text-xs text-[#6B6B6B]">
              A confirmation and calendar invite placeholder have been logged for {formData.email}. Attendance is free as always.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleReset}
                className="w-full bg-[#171717] text-[#FFFEFD] font-mono text-xs uppercase tracking-wider py-3 hover:bg-[#F2652A] transition-colors text-center"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="font-mono text-xs uppercase text-[#171717] block">
                Full Name <span className="text-[#F2652A]">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="Ada Lovelace"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-[#E8E5E1] bg-[#FFFEFD] px-3.5 py-2.5 text-sm text-[#171717] placeholder:text-[#6B6B6B]/50 focus:border-[#F2652A] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-xs uppercase text-[#171717] block">
                Email Address <span className="text-[#F2652A]">*</span>
              </label>
              <input
                required
                type="email"
                placeholder="ada@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-[#E8E5E1] bg-[#FFFEFD] px-3.5 py-2.5 text-sm text-[#171717] placeholder:text-[#6B6B6B]/50 focus:border-[#F2652A] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-xs uppercase text-[#171717] block">
                Role & Organization (Optional)
              </label>
              <input
                type="text"
                placeholder="SRE, Platform Engineer, Student..."
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full border border-[#E8E5E1] bg-[#FFFEFD] px-3.5 py-2.5 text-sm text-[#171717] placeholder:text-[#6B6B6B]/50 focus:border-[#F2652A] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-xs uppercase text-[#171717] block">
                Topics or questions for speakers (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Questions about Tempo retention, Loki indexing..."
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full border border-[#E8E5E1] bg-[#FFFEFD] px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#6B6B6B]/50 focus:border-[#F2652A] focus:outline-none resize-none"
              />
            </div>

            <div className="pt-3 flex items-center justify-between gap-4">
              <span className="font-mono text-[11px] text-[#6B6B6B]">
                Free admission · Limited seating
              </span>
              <button
                type="submit"
                className="bg-[#F2652A] text-[#FFFEFD] font-mono text-xs uppercase tracking-wider px-6 py-3 hover:bg-[#171717] transition-colors"
              >
                Confirm RSVP →
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
