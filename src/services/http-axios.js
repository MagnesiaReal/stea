import axios from 'axios'

export default axios.create({
  baseURL : "http://localhost",
  mode : 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Content-type": "application/json"
    }
})
