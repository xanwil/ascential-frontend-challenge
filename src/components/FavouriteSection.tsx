import React from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";

interface FavouriteSectionProps {
  title: string;
  count: number;
  emptyMessage: string;
  children: React.ReactNode;
}

const FavouriteSection: React.FC<FavouriteSectionProps> = ({
  title,
  count,
  emptyMessage,
  children,
}) => {
  return (
    <Box>
      <Heading size="md" mb={4}>
        {title} ({count})
      </Heading>
      <VStack spacing={3} align="stretch">
        {count === 0 ? (
          <Text color="gray.500" textAlign="center">
            {emptyMessage}
          </Text>
        ) : (
          children
        )}
      </VStack>
    </Box>
  );
};

export default FavouriteSection;
