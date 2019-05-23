import axios from 'axios';

export const LOC_API_KEY = 'f750d586c2243a';

export default axios.create({
    baseURL: 'https://us1.locationiq.com'
})