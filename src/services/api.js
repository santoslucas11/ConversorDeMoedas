import axios from 'axios';

// https://free.currconv.com/api/v7/convert?q=USD_BRL&compact=ultra&apiKey=f4c5b41da8a16fc1e796
const api = axios.create({
    baseURL: ' https://free.currconv.com/api/v7'
})

export default api;