import React from 'react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import HeartIcon from './HeartIcon';
import { useFavourites } from '../contexts/FavouritesContext';
import { FavouriteEvent, FavouriteVenue } from '../types/favourites';

interface FavouriteButtonProps {
  item: FavouriteEvent | FavouriteVenue;
  type: 'event' | 'venue';
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ 
  item, 
  type
}) => {
  const {
    isEventFavourited,
    isVenueFavourited,
    addFavouriteEvent,
    removeFavouriteEvent,
    addFavouriteVenue,
    removeFavouriteVenue,
  } = useFavourites();

  const isEvent = type === 'event';
  const itemId = isEvent ? (item as FavouriteEvent).id : (item as FavouriteVenue).id;
  const isFavourited = isEvent 
    ? isEventFavourited(itemId as string)
    : isVenueFavourited(itemId as number);

  const handleToggleFavourite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isEvent) {
      const eventItem = item as FavouriteEvent;
      if (isFavourited) {
        removeFavouriteEvent(eventItem.id);
      } else {
        addFavouriteEvent(eventItem);
      }
    } else {
      const venueItem = item as FavouriteVenue;
      if (isFavourited) {
        removeFavouriteVenue(venueItem.id);
      } else {
        addFavouriteVenue(venueItem);
      }
    }
  };

  return (
    <Tooltip 
      label={isFavourited ? 'Remove from favourites' : 'Add to favourites'}
      hasArrow
      placement="top"
    >
      <IconButton
        aria-label={isFavourited ? 'Remove from favourites' : 'Add to favourites'}
        icon={
          <HeartIcon 
            isFilled={isFavourited}
            boxSize="2em"
            color={isFavourited ? 'red.400' : 'gray.500'}
          />
        }
        size="lg"
        color={isFavourited ? 'red.400' : 'gray.500'}
        bg="transparent"
        border="none"
        borderRadius="md"
        onClick={handleToggleFavourite}
        _hover={{
          color: isFavourited ? 'red.500' : 'red.500',
          bg: "transparent",
          transform: 'scale(1.15)',
          transition: 'all 0.2s ease-in-out',
        }}
        _active={{
          transform: 'scale(0.9)',
          bg: "transparent",
        }}
        _focus={{
          boxShadow: "none",
          bg: "transparent",
        }}
        transition="all 0.2s ease-in-out"
      />
    </Tooltip>
  );
};

export default FavouriteButton;
