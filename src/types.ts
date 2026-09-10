export interface EventSpeaker {
  id: string;
  name: string;
  role: string;
  company: string;
  talkTitle: string;
  bio?: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  detail?: string;
}

export interface EventMoment {
  url: string;
  caption: string;
  aspect: 'large' | 'small';
}

export interface CommunityEvent {
  slug: string;
  eventNumber: string; // e.g. "EVENT / 01"
  numberOnly: string; // e.g. "01"
  title: string;
  poster?: string; // Poster image URL or base64
  meetupLink?: string; // Meetup.com event URL
  registrationUrl?: string;
  tags: string[]; // e.g. ["Observability", "Open Source"]
  dateIso: string; // "2026-09-18"
  dateDisplay: {
    day: string; // "18"
    month: string; // "SEP"
    monthFull: string; // "SEPTEMBER"
    year: string; // "2026"
  };
  timeDisplay: string; // "18:00 — 20:30"
  timeShort: string; // "6:00 PM"
  city: string; // "Chennai"
  location: {
    name: string;
    city: string;
    address: string;
    mapUrl: string;
    coordinates: string; // "13.0827° N, 80.2707° E"
  };
  description: string;
  detailedAbout?: string;
  isNextEvent?: boolean;
  isUpcoming: boolean;
  speakers: EventSpeaker[];
  schedule: ScheduleItem[];
  photos: EventMoment[];
}

export interface AddEventFormData {
  name: string;
  poster: string;
  mapLink: string;
  date: string;
  meetupLink: string;
  venueName?: string;
  venueAddress?: string;
  description?: string;
  time?: string;
}

export type PageRoute = 
  | { type: 'home' }
  | { type: 'events' }
  | { type: 'event-detail'; slug: string }
  | { type: 'community' }
  | { type: 'add-event' };

