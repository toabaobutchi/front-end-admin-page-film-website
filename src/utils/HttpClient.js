import axios from 'axios'

class HttpClient {
  constructor() {
    this.axios = axios.create({
      baseURL: 'https://be-ticket-film.onrender.com/api/v1/admin',
      timeout: 5000
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded'
      // }
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
      return [err.response.data, err.status]
    }
  }
}

export default HttpClient
