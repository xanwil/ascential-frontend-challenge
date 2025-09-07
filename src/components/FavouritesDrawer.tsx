import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  HStack,
  Text,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useFavourites } from "../contexts/FavouritesContext";
import { formatDateTime } from "../utils/formatDateTime";
import FavouriteSection from "./FavouriteSection";
import FavouriteItem from "./FavouriteItem";

const FavouritesDrawer: React.FC = () => {
  const {
    isDrawerOpen,
    closeDrawer,
    favouriteEvents,
    favouriteVenues,
    removeFavouriteEvent,
    removeFavouriteVenue,
    clearAllFavourites,
  } = useFavourites();

  const handleRemoveEvent = (id: string | number) => {
    removeFavouriteEvent(id as string);
  };

  const handleRemoveVenue = (id: string | number) => {
    removeFavouriteVenue(id as number);
  };

  return (
    <Drawer
      isOpen={isDrawerOpen}
      placement="right"
      onClose={closeDrawer}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <HStack spacing={3} align="center">
            <Text fontSize="2xl" fontWeight="bold">My Favourites</Text>
            {(favouriteEvents.length > 0 || favouriteVenues.length > 0) && (
              <Button
                size="sm"
                colorScheme="red"
                variant="outline"
                onClick={clearAllFavourites}
              >
                Clear All
              </Button>
            )}
          </HStack>
        </DrawerHeader>

        <DrawerBody>
          <VStack spacing={6} align="stretch">
            {/* Favourite Events Section */}
            <FavouriteSection
              title="Events"
              count={favouriteEvents.length}
              emptyMessage="No favourite events yet"
            >
              {favouriteEvents.map((event) => (
                <FavouriteItem
                  key={event.id}
                  id={event.id}
                  title={event.short_title}
                  linkTo={`/events/${event.id}`}
                  onRemove={handleRemoveEvent}
                  onLinkClick={closeDrawer}
                  subtitle={`${event.venue.name_v2} • ${event.venue.display_location}`}
                  metadata={formatDateTime(new Date(event.datetime_utc))}
                />
              ))}
            </FavouriteSection>

            <Divider />

            {/* Favourite Venues Section */}
            <FavouriteSection
              title="Venues"
              count={favouriteVenues.length}
              emptyMessage="No favourite venues yet"
            >
              {favouriteVenues.map((venue) => (
                <FavouriteItem
                  key={venue.id}
                  id={venue.id}
                  title={venue.name}
                  linkTo={`/venues/${venue.id}`}
                  onRemove={handleRemoveVenue}
                  onLinkClick={closeDrawer}
                  subtitle={venue.display_location}
                  badge={{
                    text: venue.has_upcoming_events
                      ? `${venue.num_upcoming_events} Upcoming Events`
                      : "No Upcoming Events",
                    colorScheme: venue.has_upcoming_events ? "green" : "red",
                  }}
                />
              ))}
            </FavouriteSection>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default FavouritesDrawer;
