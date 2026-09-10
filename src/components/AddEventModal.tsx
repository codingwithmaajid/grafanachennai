import React from 'react';
import { AddEventForm } from './AddEventForm';
import { CommunityEvent } from '../types';

interface AddEventModalProps {
  isOpen: boolean;
  existingEvents: CommunityEvent[];
  onClose: () => void;
  onEventCreated: (newEvent: CommunityEvent) => void;
}

export const AddEventModal: React.FC<AddEventModalProps> = ({
  isOpen,
  existingEvents,
  onClose,
  onEventCreated,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 sm:p-6 backdrop-blur-[2px] overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl my-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 font-mono text-xs text-[#6B6B6B] hover:text-[#171717] px-2 py-1 uppercase"
            aria-label="Close form dialog"
          >
            [ESC]
          </button>
          <AddEventForm
            existingEvents={existingEvents}
            onEventCreated={(event) => {
              onEventCreated(event);
              onClose();
            }}
            onCancel={onClose}
            className="shadow-md"
          />
        </div>
      </div>
    </div>
  );
};
