import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_BASEURL;

console.log(process.env.VUE_APP_BASEURL)

export default axios