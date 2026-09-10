import React from 'react';
import { CommunityEvent } from '../types';

interface EventRowProps {
  event: CommunityEvent;
  onSelect: (slug: string) => void;
  showYear?: boolean;
}

export const EventRow: React.FC<EventRowProps> = ({ event, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(event.slug)}
      className="group relative border-t border-[#E8E5E1] py-6 sm:py-7 cursor-pointer transition-all duration-200 hover:bg-[#FAF9F7]/60"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(event.slug);
        }
      }}
    >
      {/* Orange accent line indicator on hover */}
      <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-transparent group-hover:bg-[#F2652A] transition-colors duration-200" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 px-2 sm:px-4 group-hover:translate-x-1 transition-transform duration-200">
        {/* Date block */}
        <div className="w-28 flex-shrink-0">
          <span className="font-mono text-xs uppercase tracking-wider text-[#171717] font-medium block">
            {event.dateDisplay.day} {event.dateDisplay.month}
          </span>
          <span className="font-mono text-[11px] text-[#6B6B6B] block">
            {event.dateDisplay.year}
          </span>
        </div>

        {/* Title & metadata */}
        <div className="flex-1 space-y-1">
          <h4 className="text-base sm:text-lg font-medium text-[#171717] group-hover:text-[#F2652A] transition-colors">
            {event.title}
          </h4>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-[#6B6B6B]">
            <span>{event.tags.join(' · ')}</span>
            <span className="text-[#E8E5E1]">|</span>
            <span>{event.location.name}</span>
          </div>
        </div>

        {/* Location & Time */}
        <div className="md:w-36 text-left md:text-right font-mono text-xs text-[#6B6B6B]">
          <span className="block text-[#171717]">{event.city}</span>
          <span className="text-[11px]">{event.timeShort}</span>
        </div>

        {/* Arrow */}
        <div className="w-8 flex justify-end items-center text-[#171717] group-hover:text-[#F2652A] transition-colors">
          <span className="text-lg leading-none transform transition-transform duration-200 group-hover:translate-x-2">
            →
          </span>
        </div>
      </div>
    </div>
  );
};
