import axios from 'axios';

export default axios.create({
    baseURL: 'https://twit-be.herokuapp.com'
})