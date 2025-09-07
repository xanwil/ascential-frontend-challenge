import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { STORAGE_KEYS } from '../constants/storage';
import { FavouriteEvent, FavouriteVenue } from '../types/favourites';

interface FavouritesContextType {
  favouriteEvents: FavouriteEvent[];
  favouriteVenues: FavouriteVenue[];
  addFavouriteEvent: (event: FavouriteEvent) => void;
  removeFavouriteEvent: (eventId: string) => void;
  addFavouriteVenue: (venue: FavouriteVenue) => void;
  removeFavouriteVenue: (venueId: number) => void;
  clearAllFavourites: () => void;
  isEventFavourited: (eventId: string) => boolean;
  isVenueFavourited: (venueId: number) => boolean;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export const FavouritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favouriteEvents, setFavouriteEvents] = useState<FavouriteEvent[]>([]);
  const [favouriteVenues, setFavouriteVenues] = useState<FavouriteVenue[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInitialised, setIsInitialised] = useState(false);

  useEffect(() => {
    const savedEvents = localStorage.getItem(STORAGE_KEYS.EVENTS);
    const savedVenues = localStorage.getItem(STORAGE_KEYS.VENUES);

    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents);
        setFavouriteEvents(parsedEvents);
      } catch (error) {
        console.error('Error parsing saved events:', error);
      }
    }

    if (savedVenues) {
      try {
        const parsedVenues = JSON.parse(savedVenues);
        setFavouriteVenues(parsedVenues);
      } catch (error) {
        console.error('Error parsing saved venues:', error);
      }
    }

    setIsInitialised(true);
  }, []);

  useEffect(() => {
    if (isInitialised) {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(favouriteEvents));
    }
  }, [favouriteEvents, isInitialised]);

  useEffect(() => {
    if (isInitialised) {
      localStorage.setItem(STORAGE_KEYS.VENUES, JSON.stringify(favouriteVenues));
    }
  }, [favouriteVenues, isInitialised]);

  const addFavouriteEvent = (event: FavouriteEvent) => {
    setFavouriteEvents(prev => {
      const exists = prev.some(e => e.id === event.id);
      if (exists) return prev;
      const newEvents = [...prev, event];
      return newEvents;
    });
  };

  const removeFavouriteEvent = (eventId: string) => {
    setFavouriteEvents(prev => prev.filter(e => e.id !== eventId));
  };

  const addFavouriteVenue = (venue: FavouriteVenue) => {
    setFavouriteVenues(prev => {
      const exists = prev.some(v => v.id === venue.id);
      if (exists) return prev;
      const newVenues = [...prev, venue];
      return newVenues;
    });
  };

  const removeFavouriteVenue = (venueId: number) => {
    setFavouriteVenues(prev => prev.filter(v => v.id !== venueId));
  };

  const clearAllFavourites = () => {
    setFavouriteEvents([]);
    setFavouriteVenues([]);
  };

  const isEventFavourited = (eventId: string) => {
    return favouriteEvents.some(e => e.id === eventId);
  };

  const isVenueFavourited = (venueId: number) => {
    return favouriteVenues.some(v => v.id === venueId);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const value: FavouritesContextType = {
    favouriteEvents,
    favouriteVenues,
    addFavouriteEvent,
    removeFavouriteEvent,
    addFavouriteVenue,
    removeFavouriteVenue,
    clearAllFavourites,
    isEventFavourited,
    isVenueFavourited,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (context === undefined) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
};
