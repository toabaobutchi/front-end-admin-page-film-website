import axios from "axios";

const ax = axios.create({
  baseURL: 'http://localhost:3001/api/v1/admin',
});

export default ax;