import React, { useState, useRef } from 'react';
import { AddEventFormData, CommunityEvent } from '../types';
import { createCommunityEventFromForm } from '../data/eventHelpers';

interface AddEventFormProps {
  existingEvents: CommunityEvent[];
  onEventCreated: (newEvent: CommunityEvent) => void;
  onCancel?: () => void;
  className?: string;
}

export const AddEventForm: React.FC<AddEventFormProps> = ({
  existingEvents,
  onEventCreated,
  onCancel,
  className = '',
}) => {
  const [formData, setFormData] = useState<AddEventFormData>({
    name: '',
    poster: '',
    mapLink: '',
    date: new Date().toISOString().split('T')[0],
    meetupLink: '',
    venueName: '',
    venueAddress: '',
    description: '',
    time: '18:00 — 20:30',
  });

  const [posterMode, setPosterMode] = useState<'upload' | 'url'>('url');
  const [dragOver, setDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file (PNG, JPG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setFormData((prev) => ({ ...prev, poster: result }));
      setErrorMsg(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validate 5 required fields
    if (!formData.name.trim()) {
      setErrorMsg('Event Name is required.');
      return;
    }
    if (!formData.poster.trim()) {
      setErrorMsg('Event Poster (Image upload or URL) is required.');
      return;
    }
    if (!formData.mapLink.trim()) {
      setErrorMsg('Venue Map Link is required.');
      return;
    }
    if (!formData.date.trim()) {
      setErrorMsg('Event Date is required.');
      return;
    }
    if (!formData.meetupLink.trim()) {
      setErrorMsg('Meetup Link is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newEvent = createCommunityEventFromForm(formData, existingEvents);
      onEventCreated(newEvent);
    } catch {
      setErrorMsg('Failed to create event. Please check your inputs.');
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-[#FFFEFD] border border-[#E8E5E1] p-6 sm:p-10 space-y-8 ${className}`}
    >
      {/* Header */}
      <div className="border-b border-[#E8E5E1] pb-5">
        <span className="font-mono text-xs uppercase tracking-widest text-[#6B6B6B] block">
          COMMUNITY / EVENT DISPATCH
        </span>
        <h2 className="text-2xl sm:text-3xl font-light text-[#171717] mt-1 tracking-tight">
          Add Community Event
        </h2>
        <p className="font-mono text-xs text-[#6B6B6B] mt-1">
          Capture required event fields and append directly to the Chennai events archive.
        </p>
      </div>

      {errorMsg && (
        <div className="border border-[#F2652A] bg-[#FAF9F7] p-4 text-xs font-mono text-[#F2652A]">
          ERROR // {errorMsg}
        </div>
      )}

      <div className="space-y-6">
        {/* 1. NAME (Required) */}
        <div className="space-y-1.5">
          <label className="font-mono text-xs uppercase tracking-wider text-[#171717] flex items-center justify-between">
            <span>
              1. Event Name <span className="text-[#F2652A]">*</span>
            </span>
            <span className="text-[#6B6B6B] font-normal text-[11px]">Required</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Grafana & Prometheus Deep Dive Chennai"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-[#E8E5E1] bg-[#FFFEFD] px-4 py-3 text-sm text-[#171717] placeholder:text-[#6B6B6B]/40 focus:border-[#F2652A] focus:outline-none transition-colors"
          />
        </div>

        {/* 2. POSTER (Required) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="font-mono text-xs uppercase tracking-wider text-[#171717]">
              2. Event Poster <span className="text-[#F2652A]">*</span>
            </label>
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <button
                type="button"
                onClick={() => setPosterMode('url')}
                className={`pb-0.5 uppercase transition-colors ${
                  posterMode === 'url'
                    ? 'text-[#F2652A] border-b border-[#F2652A] font-medium'
                    : 'text-[#6B6B6B] hover:text-[#171717]'
                }`}
              >
                Image URL
              </button>
              <span className="text-[#E8E5E1]">|</span>
              <button
                type="button"
                onClick={() => setPosterMode('upload')}
                className={`pb-0.5 uppercase transition-colors ${
                  posterMode === 'upload'
                    ? 'text-[#F2652A] border-b border-[#F2652A] font-medium'
                    : 'text-[#6B6B6B] hover:text-[#171717]'
                }`}
              >
                Upload File
              </button>
            </div>
          </div>

          {posterMode === 'url' ? (
            <div className="space-y-2">
              <input
                type="url"
                placeholder="https://images.unsplash.com/... or poster image URL"
                value={formData.poster}
                onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
                className="w-full border border-[#E8E5E1] bg-[#FFFEFD] px-4 py-3 text-sm text-[#171717] placeholder:text-[#6B6B6B]/40 focus:border-[#F2652A] focus:outline-none transition-colors"
              />
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-[#6B6B6B]">Quick presets:</span>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      poster:
                        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
                    })
                  }
                  className="font-mono text-[10px] text-[#171717] hover:text-[#F2652A] underline"
                >
                  Auditorium
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      poster:
                        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
                    })
                  }
                  className="font-mono text-[10px] text-[#171717] hover:text-[#F2652A] underline"
                >
                  Workshop
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      poster:
                        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
                    })
                  }
                  className="font-mono text-[10px] text-[#171717] hover:text-[#F2652A] underline"
                >
                  Collaborative
                </button>
              </div>
            </div>
          ) : (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
                dragOver
                  ? 'border-[#F2652A] bg-[#FAF9F7]'
                  : 'border-[#E8E5E1] hover:border-[#171717] bg-[#FFFEFD]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase text-[#171717] block">
                  Drag & Drop poster image here, or click to browse
                </span>
                <span className="font-mono text-[11px] text-[#6B6B6B] block">
                  PNG, JPG, or WebP (max 5MB)
                </span>
              </div>
            </div>
          )}

          {/* Poster preview */}
          {formData.poster && (
            <div className="relative border border-[#E8E5E1] p-2 bg-[#FAF9F7] flex items-center gap-4">
              <img
                src={formData.poster}
                alt="Poster preview"
                className="w-20 h-14 object-cover border border-[#E8E5E1]"
                onError={() => setErrorMsg('Image could not be loaded from provided URL.')}
              />
              <div className="flex-1 min-w-0 font-mono text-xs">
                <span className="text-[#171717] block truncate">
                  Poster Loaded
                </span>
                <span className="text-[10px] text-[#6B6B6B] truncate block">
                  {formData.poster.slice(0, 45)}...
                </span>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, poster: '' })}
                className="font-mono text-xs text-[#F2652A] hover:underline px-2 py-1"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* 3. DATE & 4. TIME (Date is Required) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-1.5">
            <label className="font-mono text-xs uppercase tracking-wider text-[#171717] flex items-center justify-between">
              <span>
                3. Event Date <span className="text-[#F2652A]">*</span>
              </span>
              <span className="text-[#6B6B6B] font-normal text-[11px]">Required</span>
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full border border-[#E8E5E1] bg-[#FFFEFD] px-4 py-3 text-sm text-[#171717] font-mono focus:border-[#F2652A] focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-xs uppercase tracking-wider text-[#171717] flex items-center justify-between">
              <span>Time Slot</span>
              <span className="text-[#6B6B6B] font-normal text-[11px]">Optional</span>
            </label>
            <input
              type="text"
              placeholder="18:00 — 20:30"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full border border-[#E8E5E1] bg-[#FFFEFD] px-4 py-3 text-sm text-[#171717] font-mono focus:border-[#F2652A] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* 4. MAP LINK (Required) */}
        <div className="space-y-1.5">
          <label className="font-mono text-xs uppercase tracking-wider text-[#171717] flex items-center justify-between">
            <span>
              4. Map Link <span className="text-[#F2652A]">*</span>
            </span>
            <span className="text-[#6B6B6B] font-normal text-[11px]">Required</span>
          </label>
          <input
            type="url"
            required
            placeholder="https://maps.google.com/?q=IIT+Madras+Research+Park"
            value={formData.mapLink}
            onChange={(e) => setFormData({ ...formData, mapLink: e.target.value })}
            className="w-full border border-[#E8E5E1] bg-[#FFFEFD] px-4 py-3 text-sm text-[#171717] placeholder:text-[#6B6B6B]/40 focus:border-[#F2652A] focus:outline-none transition-colors"
          />
        </div>

        {/* 5. MEETUP LINK (Required) */}
        <div className="space-y-1.5">
          <label className="font-mono text-xs uppercase tracking-wider text-[#171717] flex items-center justify-between">
            <span>
              5. Meetup Link <span className="text-[#F2652A]">*</span>
            </span>
            <span className="text-[#6B6B6B] font-normal text-[11px]">Required</span>
          </label>
          <input
            type="url"
            required
            placeholder="https://meetup.com/grafana-chennai/events/123456"
            value={formData.meetupLink}
            onChange={(e) => setFormData({ ...formData, meetupLink: e.target.value })}
            className="w-full border border-[#E8E5E1] bg-[#FFFEFD] px-4 py-3 text-sm text-[#171717] placeholder:text-[#6B6B6B]/40 focus:border-[#F2652A] focus:outline-none transition-colors"
          />
        </div>

        {/* Optional Venue details & Description */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2 border-t border-[#E8E5E1]">
          <div className="space-y-1.5">
            <label className="font-mono text-xs uppercase tracking-wider text-[#171717] block">
              Venue Name (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. IIT Madras Research Park"
              value={formData.venueName}
              onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
              className="w-full border border-[#E8E5E1] bg-[#FFFEFD] px-4 py-3 text-sm text-[#171717] placeholder:text-[#6B6B6B]/40 focus:border-[#F2652A] focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-xs uppercase tracking-wider text-[#171717] block">
              Venue Address (Optional)
            </label>
            <input
              type="text"
              placeholder="Kanagam Road, Taramani, Chennai"
              value={formData.venueAddress}
              onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
              className="w-full border border-[#E8E5E1] bg-[#FFFEFD] px-4 py-3 text-sm text-[#171717] placeholder:text-[#6B6B6B]/40 focus:border-[#F2652A] focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="font-mono text-xs uppercase tracking-wider text-[#171717] block">
            Event Description (Optional)
          </label>
          <textarea
            rows={3}
            placeholder="Brief editorial summary about the talks, topics, and discussions planned for this meetup..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border border-[#E8E5E1] bg-[#FFFEFD] px-4 py-3 text-sm text-[#171717] placeholder:text-[#6B6B6B]/40 focus:border-[#F2652A] focus:outline-none resize-none transition-colors"
          />
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-6 border-t border-[#E8E5E1] flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-[#6B6B6B]">
          Appends to local events dataset and persists in browser state.
        </span>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto px-6 py-3 font-mono text-xs uppercase tracking-wider text-[#6B6B6B] hover:text-[#171717] border border-[#E8E5E1] transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-[#F2652A] hover:bg-[#171717] text-[#FFFEFD] font-mono text-xs uppercase tracking-wider px-8 py-3.5 transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 group"
          >
            <span>{isSubmitting ? 'Appending...' : 'Append Event →'}</span>
          </button>
        </div>
      </div>
    </form>
  );
};
