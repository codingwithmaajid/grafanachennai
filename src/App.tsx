/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { CommunityPage } from './pages/CommunityPage';
import { JoinModal } from './components/JoinModal';
import { RSVPModal } from './components/RSVPModal';
import { GetInvolvedModal } from './components/GetInvolvedModal';
import { AddEventModal } from './components/AddEventModal';
import { AddEventForm } from './components/AddEventForm';
import { COMMUNITY_EVENTS } from './data/events';
import { CommunityEvent, PageRoute } from './types';

const STORAGE_KEY = 'grafana_chennai_events_v1';

function parseUrlToRoute(): PageRoute {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  if (path === '/events') {
    return { type: 'events' };
  }
  if (path === '/events/new' || path === '/add-event') {
    return { type: 'add-event' };
  }
  if (path.startsWith('/events/')) {
    const slug = path.replace('/events/', '');
    if (slug) {
      return { type: 'event-detail', slug };
    }
    return { type: 'events' };
  }
  if (path === '/community') {
    return { type: 'community' };
  }
  return { type: 'home' };
}

export default function App() {
  const [events, setEvents] = useState<CommunityEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse local stored events', e);
    }
    return COMMUNITY_EVENTS;
  });

  const [route, setRoute] = useState<PageRoute>(() => parseUrlToRoute());
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isGetInvolvedOpen, setIsGetInvolvedOpen] = useState(false);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [quickRSVPSlug, setQuickRSVPSlug] = useState<string | null>(null);

  // Sync route to URL path and document title
  const navigate = useCallback((newRoute: PageRoute, pushState = true) => {
    setRoute(newRoute);
    window.scrollTo({ top: 0, behavior: 'instant' });

    let path = '/';
    let title = 'Grafana Chennai — Observability & Open Source Community';

    if (newRoute.type === 'events') {
      path = '/events';
      title = 'Events — Grafana Chennai';
    } else if (newRoute.type === 'add-event') {
      path = '/events/new';
      title = 'Add Event — Grafana Chennai';
    } else if (newRoute.type === 'event-detail') {
      path = `/events/${newRoute.slug}`;
      const found = events.find((e) => e.slug === newRoute.slug);
      if (found) {
        title = `${found.title} — Grafana Chennai`;
      } else {
        title = 'Event — Grafana Chennai';
      }
    } else if (newRoute.type === 'community') {
      path = '/community';
      title = 'Community — Grafana Chennai';
    }

    document.title = title;

    if (pushState && window.location.pathname !== path) {
      window.history.pushState({ route: newRoute }, '', path);
    }
  }, [events]);

  // Listen to popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseUrlToRoute();
      navigate(parsed, false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigate]);

  // Appending new event to existing events data structure
  const handleAddEvent = (newEvent: CommunityEvent) => {
    setEvents((prev) => {
      // Append the newly created event to the list
      const updated = [newEvent, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save to localStorage', err);
      }
      return updated;
    });
    setIsAddEventOpen(false);
    navigate({ type: 'event-detail', slug: newEvent.slug });
  };

  // Find target event if on event-detail
  const currentEvent =
    route.type === 'event-detail'
      ? events.find((e) => e.slug === route.slug) || events[0]
      : null;

  const quickRSVPEvent = quickRSVPSlug
    ? events.find((e) => e.slug === quickRSVPSlug) || null
    : null;

  return (
    <div className="min-h-screen bg-[#FFFEFD] text-[#171717] flex flex-col font-sans selection:bg-[#F2652A] selection:text-[#FFFEFD]">
      {/* Navbar */}
      <Nav
        currentRoute={route}
        onNavigate={(r) => navigate(r)}
        onOpenJoin={() => setIsJoinOpen(true)}
        onOpenAddEvent={() => setIsAddEventOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {route.type === 'home' && (
          <HomePage
            events={events}
            onNavigate={(r) => navigate(r)}
            onOpenRSVP={(slug) => setQuickRSVPSlug(slug)}
          />
        )}

        {route.type === 'events' && (
          <div className="max-w-[1280px] xl:max-w-[1360px] mx-auto px-5 sm:px-10 lg:px-12">
            <EventsPage
              events={events}
              onNavigate={(r) => navigate(r)}
              onOpenAddEvent={() => setIsAddEventOpen(true)}
            />
          </div>
        )}

        {route.type === 'add-event' && (
          <div className="max-w-[1280px] xl:max-w-[1360px] mx-auto px-5 sm:px-10 lg:px-12">
            <div className="pt-12 sm:pt-20 max-w-3xl mx-auto">
              <AddEventForm
                existingEvents={events}
                onEventCreated={handleAddEvent}
                onCancel={() => navigate({ type: 'events' })}
              />
            </div>
          </div>
        )}

        {route.type === 'event-detail' && currentEvent && (
          <div className="max-w-[1280px] xl:max-w-[1360px] mx-auto px-5 sm:px-10 lg:px-12">
            <EventDetailPage
              event={currentEvent}
              onNavigate={(r) => navigate(r)}
            />
          </div>
        )}

        {route.type === 'community' && (
          <div className="max-w-[1280px] xl:max-w-[1360px] mx-auto px-5 sm:px-10 lg:px-12">
            <CommunityPage onNavigate={(r) => navigate(r)} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(r) => navigate(r)}
        onOpenJoin={() => setIsJoinOpen(true)}
      />

      {/* Add Event Modal (accessible from anywhere) */}
      <AddEventModal
        isOpen={isAddEventOpen}
        existingEvents={events}
        onClose={() => setIsAddEventOpen(false)}
        onEventCreated={handleAddEvent}
      />

      {/* Join Community Modal */}
      <JoinModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        onSelectGetInvolved={() => setIsGetInvolvedOpen(true)}
      />

      {/* Quick RSVP Modal */}
      {quickRSVPEvent && (
        <RSVPModal
          event={quickRSVPEvent}
          isOpen={quickRSVPSlug !== null}
          onClose={() => setQuickRSVPSlug(null)}
        />
      )}

      {/* Get Involved Modal */}
      <GetInvolvedModal
        isOpen={isGetInvolvedOpen}
        onClose={() => setIsGetInvolvedOpen(false)}
      />
    </div>
  );
}
