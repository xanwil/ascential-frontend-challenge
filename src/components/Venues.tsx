import React from 'react';
import { SimpleGrid, Flex, Spinner, Heading, Text, Box, Badge, LinkBox, LinkOverlay, HStack } from '@chakra-ui/react';
import { Link as BrowserLink } from 'react-router-dom';
import { useSeatGeek } from '../utils/useSeatGeek';
import Error from './Error';
import Breadcrumbs from './Breadcrumbs';
import FavouriteButton from './FavouriteButton';
import { FavouriteVenue } from '../types/favourites';

interface VenuItemProps {
  venue: FavouriteVenue;
}

const Venues: React.FC = () => {
  const { data, error } = useSeatGeek('/venues', { 
    sort: 'score.desc',
    per_page: '24',
  });

  if (error) return <Error />;

  if (!data) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    )
  }

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Venues' }]} />
      <SimpleGrid spacing="6" m="6" minChildWidth="350px">
        {data.venues?.map((venue: FavouriteVenue) => (
          <VenueItem key={venue.id.toString()} venue={venue} />
        ))}
      </SimpleGrid>
    </>
  );
};

const VenueItem: React.FC<VenuItemProps> = ({ venue }) => (
  <LinkBox>
    <Box        
      p={[4, 6]}
      bg="gray.50"
      borderColor="gray.200"
      borderWidth="1px"
      justifyContent="center" 
      alignContent="center"
      rounded="lg"
      _hover={{ bg: 'gray.100' }}
    >
      <HStack justify="space-between" align="start" mb="2">
        <Badge colorScheme={venue.has_upcoming_events ? 'green' : 'red'}>
          {`${venue.has_upcoming_events ? venue.num_upcoming_events : 'No'} Upcoming Events`}
        </Badge>
        <Box 
          position="relative" 
          zIndex={10}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onMouseUp={(e) => e.stopPropagation()}
          style={{ pointerEvents: 'auto' }}
        >
          <FavouriteButton item={venue} type="venue" />
        </Box>
      </HStack>
      <Heading size='sm' noOfLines={1}>
        <LinkOverlay as={BrowserLink} to={`/venues/${venue.id}`}>
          {venue.name}
        </LinkOverlay>
      </Heading>
      <Text fontSize="sm" color="gray.500">{venue.display_location}</Text>
    </Box>
  </LinkBox>
);

export default Venues;