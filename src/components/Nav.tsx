import React from 'react';
import { Flex, Heading, Spacer, Button, Text } from '@chakra-ui/react';
import { useFavourites } from '../contexts/FavouritesContext';
import HeartIcon from './HeartIcon';

const Nav: React.FC = () => {
  const { openDrawer, favouriteEvents, favouriteVenues } = useFavourites();
  const totalFavourites = favouriteEvents.length + favouriteVenues.length;

  return (
    <Flex
      as="nav"
      bg="gray.700"
      color="white"
      padding="24px"
      align="center"
      position="sticky"
      top="0"
      zIndex="11"
    >
      <Heading size="md">Ascential Front End Challenge</Heading>
      <Spacer />
      <Flex position="relative">
        <Button
          leftIcon={
            <HeartIcon 
              isFilled={totalFavourites > 0}
              boxSize="2em"
              color="red.400"
            />
          }
          aria-label="Open favourites"
          variant="ghost"
          onClick={openDrawer}
          color="white"
          _hover={{ bg: "whiteAlpha.200" }}
          height="60px"
        >
          <Text display={{ base: "none", md: "inline" }}>
            Favourites
          </Text>
        </Button>
        {totalFavourites > 0 && (
          <Flex
            position="absolute"
            top="2px"
            right="2px"
            bg="red.500"
            color="white"
            borderRadius="full"
            width="20px"
            height="20px"
            fontSize="xs"
            align="center"
            justify="center"
            fontWeight="bold"
          >
            {totalFavourites}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Nav;
