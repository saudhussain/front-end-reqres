import React, { ReactElement } from 'react';
import { Box, Flex, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface LoaderProps {
  isLoading: boolean;
}

interface LoaderOverlayProps {
  children: ReactElement;
}

interface CircleProps {
  opacity?: number;
  children?: ReactElement;
}

const LoaderOverlay = ({ children }: LoaderOverlayProps) => {
  return (
    <Flex
      m={0}
      top={0}
      h={'100vh'}
      w={'100vw'}
      alignItems={'center'}
      justifyContent={'center'}
      bg={'white'}
      zIndex={'overlay'}
      position={'fixed'}
    >
      {children}
    </Flex>
  );
};

const Circle = ({ children, opacity = 1 }: CircleProps) => {
  return (
    <Box
      borderRadius={'full'}
      bgColor="#7FB900"
      width={'30px'}
      height={'30px'}
      opacity={opacity}
    >
      {children}
    </Box>
  );
};

const animationKeyframesOuterCircle = keyframes`
  100% {transform: scale(2)}
`;

const animationKeyframes = keyframes`
  100% {transform: scale(3)}
`;

const animationOuterCircle = `${animationKeyframesOuterCircle} 1s ease-out infinite`;
const animation = `${animationKeyframes} 1s ease-out infinite`;

const Loader = ({ isLoading }: LoaderProps) => {
  return isLoading ? (
    <LoaderOverlay>
      <Circle>
        <Box as={motion.div} animation={animation}>
          <Circle opacity={0.5}>
            <Box as={motion.div} animation={animationOuterCircle}>
              <Circle opacity={0.3}></Circle>
            </Box>
          </Circle>
        </Box>
      </Circle>
    </LoaderOverlay>
  ) : (
    <></>
  );
};

export default Loader;
