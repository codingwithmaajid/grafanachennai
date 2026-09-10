import React, { useState } from 'react';

export type GetInvolvedType = 'SPEAK' | 'VOLUNTEER' | 'HOST' | 'PARTNER';

interface GetInvolvedModalProps {
  initialType?: GetInvolvedType;
  isOpen: boolean;
  onClose: () => void;
}

export const GetInvolvedModal: React.FC<GetInvolvedModalProps> = ({
  initialType = 'SPEAK',
  isOpen,
  onClose,
}) => {
  const [activeType, setActiveType] = useState<GetInvolvedType>(initialType);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    topicOrProposal: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', organization: '', topicOrProposal: '' });
    onClose();
  };

  const getLabel = () => {
    switch (activeType) {
      case 'SPEAK':
        return 'Talk Title or Abstract';
      case 'HOST':
        return 'Venue Capacity & Location';
      case 'VOLUNTEER':
        return 'How would you like to help? (AV, Check-in, Design)';
      case 'PARTNER':
        return 'Sponsorship or Community Collaboration Idea';
    }
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
              PARTICIPATE // CHENNAI
            </span>
            <h3 className="text-xl font-medium text-[#171717] mt-1">
              Get Involved with Grafana Chennai
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
                PROPOSAL RECEIVED
              </span>
              <p className="text-sm text-[#171717]">
                Thank you, <span className="font-medium">{formData.name}</span>. The Grafana Chennai volunteer team will review your {activeType.toLowerCase()} submission.
              </p>
            </div>
            <p className="text-xs text-[#6B6B6B]">
              We will reach out to {formData.email} before the next meetup planning cycle.
            </p>
            <button
              onClick={handleReset}
              className="w-full bg-[#171717] text-[#FFFEFD] font-mono text-xs uppercase tracking-wider py-3 hover:bg-[#F2652A] transition-colors text-center"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category selection */}
            <div className="grid grid-cols-4 gap-2 font-mono text-xs">
              {(['SPEAK', 'VOLUNTEER', 'HOST', 'PARTNER'] as GetInvolvedType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setActiveType(type)}
                  className={`py-2 border text-center transition-colors ${
                    activeType === type
                      ? 'border-[#F2652A] bg-[#FAF9F7] text-[#F2652A] font-medium'
                      : 'border-[#E8E5E1] text-[#6B6B6B] hover:text-[#171717]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="space-y-1">
              <label className="font-mono text-xs uppercase text-[#171717] block">
                Name <span className="text-[#F2652A]">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="Your name"
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
                placeholder="you@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-[#E8E5E1] bg-[#FFFEFD] px-3.5 py-2.5 text-sm text-[#171717] placeholder:text-[#6B6B6B]/50 focus:border-[#F2652A] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-xs uppercase text-[#171717] block">
                Company / Github (Optional)
              </label>
              <input
                type="text"
                placeholder="github.com/handle or Organization"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full border border-[#E8E5E1] bg-[#FFFEFD] px-3.5 py-2.5 text-sm text-[#171717] placeholder:text-[#6B6B6B]/50 focus:border-[#F2652A] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-xs uppercase text-[#171717] block">
                {getLabel()} <span className="text-[#F2652A]">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="Brief outline..."
                value={formData.topicOrProposal}
                onChange={(e) => setFormData({ ...formData, topicOrProposal: e.target.value })}
                className="w-full border border-[#E8E5E1] bg-[#FFFEFD] px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#6B6B6B]/50 focus:border-[#F2652A] focus:outline-none resize-none"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="bg-[#F2652A] text-[#FFFEFD] font-mono text-xs uppercase tracking-wider px-6 py-3 hover:bg-[#171717] transition-colors"
              >
                Submit Proposal →
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
