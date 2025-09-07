import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Flex,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Box,
  Spinner,
  Button,
  Stack,
  Tooltip,
} from '@chakra-ui/react';
import Breadcrumbs from './Breadcrumbs';
import Error from './Error';
import { useSeatGeek } from '../utils/useSeatGeek';
import { formatDateTime } from '../utils/formatDateTime';
import FavouriteButton from './FavouriteButton';
import { FavouriteEvent } from '../types/favourites';

interface EventDetail extends FavouriteEvent {
  datetime_local: Date;
  url: string;
}

interface EventInfoProps {
  event: EventDetail;
}

const Event: React.FC = () => {
  const { eventId } = useParams();
  const { data: event, error } = useSeatGeek(`events/${eventId}`);

  if (error) return <Error />;

  if (!event) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    )
  }

  return (
    <>
      <Breadcrumbs 
        items={[
          { label: 'Home', to: '/' },
          { label: 'Events', to: '/events' },
          { label: event.short_title },
        ]} 
      />
      <Flex align="center" gap={2} m="6">
        <Heading>{event.short_title}</Heading>
        <FavouriteButton item={event} type="event" />
      </Flex>
      <EventInfo event={event} />
    </>
  );
};

const EventInfo: React.FC<EventInfoProps> = ({ event }) => (
  <Stack spacing="6" m="6">
    <SimpleGrid 
      columns={[1, 1, 2]} 
      borderWidth="1px" 
      borderRadius="md"
      p="4" 
    >
      <Stat>
        <StatLabel display="flex">
          <Box as="span">Venue</Box>
        </StatLabel>
        <StatNumber fontSize="xl">{event.venue.name_v2}</StatNumber>
        <StatHelpText>{event.venue.display_location}</StatHelpText>
      </Stat>
      <Stat>
        <StatLabel display="flex">
          <Box as="span">Date</Box>
        </StatLabel>
        <Tooltip 
          label={formatDateTime(
           new Date(event.datetime_utc)
          )} 
          hasArrow 
          placement="top"
        >
          <StatNumber fontSize="xl" maxW="fit-content">{formatDateTime(event.datetime_local)}</StatNumber>
        </Tooltip>
      </Stat>
    </SimpleGrid>
    <Flex>
      <Button as={'a'} href={event.url} minWidth="0">Buy Tickets</Button>
    </Flex>
  </Stack>
);

export default Event;