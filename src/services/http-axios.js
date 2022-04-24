import axios from 'axios'

export default axios.create({
  baseURL : "http://192.168.1.72/routes",
  mode : 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Content-type": "application/json"
    }
})
