import { AddEventFormData, CommunityEvent } from '../types';

const MONTH_NAMES = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

const MONTH_SHORT = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function createCommunityEventFromForm(
  formData: AddEventFormData,
  existingEvents: CommunityEvent[]
): CommunityEvent {
  const baseSlug = slugify(formData.name) || `event-${Date.now()}`;
  let slug = baseSlug;
  let counter = 1;
  while (existingEvents.some((e) => e.slug === slug)) {
    counter += 1;
    slug = `${baseSlug}-${counter}`;
  }

  // Parse date
  const parsedDate = new Date(formData.date);
  const isValidDate = !isNaN(parsedDate.getTime());
  
  const year = isValidDate ? String(parsedDate.getFullYear()) : '2026';
  const monthIdx = isValidDate ? parsedDate.getMonth() : 8;
  const day = isValidDate ? String(parsedDate.getDate()).padStart(2, '0') : '18';
  const month = MONTH_SHORT[monthIdx] || 'SEP';
  const monthFull = MONTH_NAMES[monthIdx] || 'SEPTEMBER';

  const nextNumber = existingEvents.length + 1;
  const numberPadded = String(nextNumber).padStart(2, '0');

  // Check if upcoming
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isUpcoming = isValidDate ? parsedDate >= today : true;

  const photos = formData.poster
    ? [
        {
          url: formData.poster,
          caption: `${formData.name} poster & community session`,
          aspect: 'large' as const,
        },
      ]
    : [];

  return {
    slug,
    eventNumber: `EVENT / ${numberPadded}`,
    numberOnly: numberPadded,
    title: formData.name.trim(),
    poster: formData.poster,
    meetupLink: formData.meetupLink.trim(),
    registrationUrl: formData.meetupLink.trim(),
    tags: ['Community', 'Observability'],
    dateIso: formData.date,
    dateDisplay: {
      day,
      month,
      monthFull,
      year,
    },
    timeDisplay: formData.time ? `${formData.time}` : '18:00 — 20:30',
    timeShort: formData.time ? formData.time.split('—')[0].trim() : '6:00 PM',
    city: 'Chennai',
    location: {
      name: formData.venueName?.trim() || 'Chennai Tech Centre',
      city: 'Chennai',
      address: formData.venueAddress?.trim() || 'Chennai, Tamil Nadu, India',
      mapUrl: formData.mapLink.trim(),
      coordinates: '13.0827° N, 80.2707° E',
    },
    description:
      formData.description?.trim() ||
      `An evening with the Grafana community in Chennai, exploring observability practices, open-source metrics, and cloud-native monitoring for ${formData.name}.`,
    detailedAbout:
      formData.description?.trim() ||
      'Join fellow developers, DevOps practitioners, and SREs in Chennai for hands-on sessions, technical talks, and networking around Grafana and modern infrastructure.',
    isNextEvent: isUpcoming,
    isUpcoming,
    speakers: [],
    schedule: [
      { time: '18:00', title: 'Doors open & Check-in', detail: 'Welcome and attendee reception' },
      { time: '18:30', title: 'Opening Remarks & Community Introduction', detail: 'Grafana Chennai community updates' },
      { time: '18:45', title: 'Main Session & Demos', detail: formData.name },
      { time: '19:45', title: 'Open Q&A and Networking', detail: 'Connect with speakers and fellow attendees' },
      { time: '20:30', title: 'End', detail: 'Wrap-up and conclusion' },
    ],
    photos,
  };
}
