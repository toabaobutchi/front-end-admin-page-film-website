import axios from "axios";

class HttpClient {
  constructor() {
    this.axios = axios.create({
      baseURL: 'http://localhost:3001/api/v1/admin',
    });
  }
  async get(url, options = {}) {
    try {
      const respone = await this.axios.get(url, options)
      return respone.data;
    }
    catch (err) {
      console.table(err); // // log error
      return [];
    }
  }

  async post(url, data = {}, options = {}) {
    try {
      const respone = await this.axios.post(url, data, options)
      return respone.data;
    }
    catch (err) {
      console.label(err); // log error
      return null;
    }
  }
}

export default HttpClient;