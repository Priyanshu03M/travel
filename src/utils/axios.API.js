import axios from "axios"

const baseUrl = "http://localhost:3000"

const Axios_API = axios.create({
    baseURL
})

export default Axios_API