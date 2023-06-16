import React from 'react';
import { Box, Text, Flex, Image, Grid, GridItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { User } from '../../models/user.model';

interface PropsUserBox {
  user: User;
}

interface PropsUserList {
  users: User[] | undefined;
  fetchCompleted: boolean;
  totalPages: number;
}

const UserCard = ({ user }: PropsUserBox) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 1 }}
    >
      <Flex borderWidth="1px" borderRadius="lg" p={2}>
        <Image
          src={user.avatar}
          alt={user.first_name}
          borderRadius="full"
          boxSize={{ base: '90px', md: '150px' }}
        />
        <Box p="6">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {user.first_name}
          </Box>
          <Box>{user.email}</Box>
        </Box>
      </Flex>
    </motion.div>
  );
};

const UserList = ({ users, fetchCompleted, totalPages }: PropsUserList) => {
  return (
    <Box as={'section'} maxW={'container.xl'} m={'auto'}>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
        gap={2}
      >
        {users?.map((user, index) => {
          return (
            <GridItem key={index}>
              <UserCard user={user} />
            </GridItem>
          );
        })}
      </Grid>
      {totalPages > 1 && fetchCompleted ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <Flex my={8} justifyContent="center" gap={2}>
            <Text as="i">No more users to show...</Text>
          </Flex>
        </motion.div>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default UserList;
