import axios from 'axios'

class HttpClient {
  constructor() {
    this.axios = axios.create({
      baseURL: 'http://localhost:3001/api/v1/admin'
    })
  }
  async get(url, options = {}) {
    try {
      const response = await this.axios.get(url, options)
      return [response.data, response.status]
    } catch (err) {
      console.table(err) // // log error
      return []
    }
  }

  async post(url, data = {}, options = {}) {
    try {
      const response = await this.axios.post(url, data, options)
      return [response.data, response.status]
    } catch (err) {
      console.table(err) // log error
      return [null, null]
    }
  }

  async put(url, data = {}, options = {}) {
    try {
      const response = await this.axios.put(url, data, options)
      return [response.data, response.status]
    } catch (err) {
      console.table(err) // log error
      return [null, null]
    }
  }

  async delete(url, data = {}, options = {}) {
    try {
      const response = await this.axios.delete(url, data, options)
      return [response.data, response.status]
    } catch (err) {
      console.table(err) // log error
      return [null, null]
    }
  }
}

export default HttpClient
