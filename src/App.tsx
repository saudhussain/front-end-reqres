import React, { useEffect, useRef } from 'react';
import { Box, Heading, useBreakpointValue, Flex, Tag } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import Loader from './components/common/loader.component';
import UserList from './components/users/userList.component';
import useUsers from './hooks/useUsers';

function App() {
  const observerTarget = useRef(null);
  const pageSize = useBreakpointValue({ base: 5, md: 8 }, { ssr: false }) || 5;
  const { isLoading, users, fetchCompleted, fetchUsers, totalPages } =
    useUsers(pageSize);

  const onIntersection = (enteries: IntersectionObserverEntry[]) => {
    // if user has scrolled to the end of the page
    const firstEntry = enteries[0];
    if (firstEntry.isIntersecting && !fetchCompleted) {
      fetchUsers();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    // clean up to d/c the observer
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [users]);

  return (
    <div>
      <header></header>
      <Loader isLoading={isLoading} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1 }}
      >
        <Flex
          justifyContent={'center'}
          alignItems="center"
          my={4}
          direction="column"
          gap={2}
        >
          <Heading as="h2" size="2xl">
            REQRES
          </Heading>
          <Tag>Users List</Tag>
        </Flex>
      </motion.div>
      <Box p={2}>
        <UserList
          users={users}
          fetchCompleted={fetchCompleted}
          totalPages={totalPages}
        />
        <div ref={observerTarget}></div>
      </Box>
    </div>
  );
}

export default App;
