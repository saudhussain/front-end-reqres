import { useState } from 'react';

import { User } from '../models/user.model';
import { getUsers, ResponseGetUsers } from '../services/userService';

const useUsers = (pageSize: number) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [fetchCompleted, setFetchCompleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchUsers = () => {
    if (currentPage > 0 && currentPage === totalPages) return;

    let timeout = 0;
    // pulse animation is shown only for first time
    if (currentPage == 0) {
      setLoading(true);
      timeout = 1000;
    }

    // added timeout to show the pulse animation
    setTimeout(() => {
      getUsers(currentPage + 1, pageSize)
        .then((response: ResponseGetUsers) => {
          setLoading(false);
          setUsers([...users, ...response.data]);
          setCurrentPage(response.page);
          setTotalPages(response.total_pages);

          if (response.page === response.total_pages) {
            setFetchCompleted(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }, timeout);
  };

  return {
    isLoading,
    users,
    fetchCompleted,
    fetchUsers,
    totalPages,
  };
};

export default useUsers;
