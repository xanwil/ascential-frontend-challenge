export interface FavouriteEvent {
  id: string;
  short_title: string;
  datetime_utc: string;
  datetime_local: string;
  venue: {
    name_v2: string;
    display_location: string;
  };
}

export interface FavouriteVenue {
  id: number;
  name: string;
  display_location: string;
  has_upcoming_events: boolean;
  num_upcoming_events: number;
}
