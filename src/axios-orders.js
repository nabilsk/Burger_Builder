import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://burger-builder-bb3bc-default-rtdb.firebaseio.com/'
});

export default instance;