import axios from 'axios';

const Request = axios.create({ baseURL: `http://localhost:5000` });

export default Request;