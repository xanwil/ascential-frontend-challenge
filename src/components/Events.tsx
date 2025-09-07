import React, { useState, useMemo } from 'react';
import {
  SimpleGrid,
  Flex,
  Spinner,
  Heading,
  Text,
  Box,
  Card,
  CardBody,
  Stack,
  Image,
  LinkBox,
  LinkOverlay,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  VStack
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import Error from './Error';
import { useSeatGeek } from '../utils/useSeatGeek';
import { formatDateTime } from '../utils/formatDateTime';
import FavouriteButton from './FavouriteButton';
import { FavouriteEvent } from '../types/favourites';

export interface Performers {
  name: string;
  image: string;
}

export interface Venue {
  name_v2: string;
  display_location: string;
}

interface EventWithPerformers extends FavouriteEvent {
  performers: Performers[];
}

interface EventItemProps {
  event: EventWithPerformers;
}

const Events: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data, error } = useSeatGeek('/events', { 
    type: 'concert',
    sort: 'score.desc',
    per_page: '100',
  });

  const filteredEvents = useMemo(() => {
    if (!data?.events || !searchQuery.trim()) {
      return data?.events || [];
    }

    const query = searchQuery.toLowerCase().trim();
    return data.events.filter((event: EventWithPerformers) => {
      const titleMatch = event.short_title?.toLowerCase().includes(query);
      
      const performerMatch = event.performers?.some(performer => 
        performer.name?.toLowerCase().includes(query)
      );
      
      return titleMatch || performerMatch;
    });
  }, [data?.events, searchQuery]);

  if (error) return <Error />;

  if (!data) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    )
  }

  return (
    <VStack spacing={4} align="stretch">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Events' }]} />
      
      <Box mx={[4, 6]} mb={2}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search events or performers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            bg="white"
            borderColor="gray.200"
            _hover={{ borderColor: 'gray.300' }}
            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
          />
        </InputGroup>
        {searchQuery && (
          <Text fontSize="sm" color="gray.600" mt={2}>
            {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
            {searchQuery && ` for "${searchQuery}"`}
          </Text>
        )}
      </Box>

      <SimpleGrid 
        spacing={[4, 6]} 
        m={[4, 6]} 
        mt={0} 
        columns={[1, 1, 2, 3]}
      >
        {filteredEvents.map((event: EventWithPerformers) => (
          <EventItem key={event.id.toString()} event={event} />
        ))}
      </SimpleGrid>
      
      {filteredEvents.length === 0 && searchQuery && (
        <Flex justifyContent="center" alignItems="center" minHeight="20vh">
          <VStack spacing={2}>
            <Text fontSize="lg" color="gray.500">No events found</Text>
            <Text fontSize="sm" color="gray.400">
              Try searching for different keywords or check your spelling
            </Text>
          </VStack>
        </Flex>
      )}
    </VStack>
  );
};

const EventItem: React.FC<EventItemProps> = ({ event }) => (
  <LinkBox 
    as={Card} 
    variant="outline"
    overflow="hidden"
    bg="gray.50"
    borderColor="gray.200"
    _hover={{ bg: 'gray.100' }}
  >
    <Image src={event.performers[0].image} />
    <CardBody>
      <Stack spacing="2">
        <HStack justify="space-between" align="start">
          <Heading size="md" flex={1}>
            <LinkOverlay as={Link} to={`/events/${event.id}`}>{event.short_title}</LinkOverlay>
          </Heading>
          <FavouriteButton item={event} type="event" />
        </HStack>
        <Box>
          <Text fontSize="sm" color="gray.600">
            {event.venue.name_v2}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {event.venue.display_location}
          </Text>
        </Box>
        <Text fontSize="sm" fontWeight="bold" color="gray.600" justifySelf={'end'}>
          {formatDateTime(new Date(event.datetime_local))}
        </Text>
      </Stack>
    </CardBody>
  </LinkBox>
);

export default Events;