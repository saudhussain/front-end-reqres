import axios from 'axios';

import { User } from '../models/user.model';

export type ResponseGetUsers = {
  data: User[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
};

const url = 'https://reqres.in/api/users';

const getUsers = async (page: number, pageSize: number) => {
  const response = await axios.get(`${url}?page=${page}&per_page=${pageSize}`);
  return response.data as ResponseGetUsers;
};

export { getUsers };
