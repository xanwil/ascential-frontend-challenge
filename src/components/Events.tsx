import React from 'react';
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
  HStack
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import Error from './Error';
import { useSeatGeek } from '../utils/useSeatGeek';
import { formatDateTime } from '../utils/formatDateTime';
import FavouriteButton from './FavouriteButton';
import { FavouriteEvent } from '../types/favourites';

export interface Performers {
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
  const { data, error } = useSeatGeek('/events', { 
    type: 'concert',
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
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Events' }]} />
      <SimpleGrid spacing={[4, 6]} m={[4, 6]} minChildWidth={["256px", "350px"]}>
        {data.events?.map((event: EventWithPerformers) => (
          <EventItem key={event.id.toString()} event={event} />
        ))}
      </SimpleGrid>
    </>
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