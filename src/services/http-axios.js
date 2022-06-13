import axios from 'axios'

export default axios.create({
  //baseURL : "http://localhost",
  baseURL: "http://192.168.1.71",
  //baseURL: "https://stea-tt.ddns.net:8080",
  mode : 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Content-type": "application/json"
    }
})
