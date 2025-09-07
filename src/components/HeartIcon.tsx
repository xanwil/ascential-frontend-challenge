import React from 'react';
import { Icon } from '@chakra-ui/react';

interface HeartIconProps {
  isFilled?: boolean;
  boxSize?: string;
  color?: string;
}

const HeartIcon: React.FC<HeartIconProps> = ({ 
  isFilled = false, 
  boxSize = "1em",
  color = "currentColor"
}) => (
  <Icon viewBox="0 0 24 24" boxSize={boxSize} color={color}>
    <path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      fill={isFilled ? 'currentColor' : 'transparent'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export default HeartIcon;
