import React from "react";
import {
  LinkBox,
  LinkOverlay,
  HStack,
  Box,
  Text,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

interface FavouriteItemProps {
  id: string | number;
  title: string;
  linkTo: string;
  onRemove: (id: string | number) => void;
  onLinkClick: () => void;
  subtitle?: string;
  metadata?: string;
  badge?: {
    text: string;
    colorScheme: string;
  };
}

const FavouriteItem: React.FC<FavouriteItemProps> = ({
  id,
  title,
  linkTo,
  onRemove,
  onLinkClick,
  subtitle,
  metadata,
  badge,
}) => {
  return (
    <LinkBox
      p={4}
      bg="white"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="md"
      _hover={{ bg: "gray.50" }}
    >
      <HStack justify="space-between" align="start">
        <Box flex={1}>
          <LinkOverlay
            as={RouterLink}
            to={linkTo}
            onClick={onLinkClick}
          >
            <Text
              fontWeight="semibold"
              fontSize="sm"
            >
              {title}
            </Text>
          </LinkOverlay>
          {subtitle && (
            <Text fontSize="xs" color="gray.500" mt={1}>
              {subtitle}
            </Text>
          )}
          {metadata && (
            <Text
              fontSize="xs"
              color="gray.600"
              fontWeight="medium"
              mt={1}
            >
              {metadata}
            </Text>
          )}
          {badge && (
            <Badge
              colorScheme={badge.colorScheme}
              size="sm"
              mt={2}
            >
              {badge.text}
            </Badge>
          )}
        </Box>
        <IconButton
          aria-label="Remove from favourites"
          icon={<DeleteIcon />}
          size="sm"
          variant="ghost"
          colorScheme="red"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove(id);
          }}
        />
      </HStack>
    </LinkBox>
  );
};

export default FavouriteItem;
