import axios from 'axios'

export default axios.create({
    baseURL : "http://magnesiaestelar.ddns.net",
    headers: {
        "Content-type": "application/json"
    }
})
