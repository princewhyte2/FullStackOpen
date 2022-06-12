import axios from 'axios';

const baseUrl = '/api/users';

export const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

export const getUser = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`);
  return request.data;
};

const usersService = {
  getAll, getUser,
};
export default { usersService };
