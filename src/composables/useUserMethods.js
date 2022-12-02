import { ref } from "vue"
import axios from "../api/axios";

const error = ref(null)

// post request to add a user in the database

const signup = async (user) => {
    error.value = null;

    try {

        const res = await axios.post('/users/register', user);

        if (res.status != 200) {
            new Error('there is an error')
        }

        return res.data.message;

    } catch(err) {
        console.log(err.message)
        error.value = err.message;
    }

}

const useSignup = () => {
    return {error, signup}
}

// post request to validate user and log them in

const login = async (user) => {
    error.value = null;

    try {

        const res = await axios.post('/users/login', user, { withCredentials: true });

        if (res.status != 200) {
            new Error('there is an error')
        }

        return res.data;

    } catch(err) {
        console.log(err.message)
        error.value = err.message;
    }

}

const useLogin = () => {
    return {error, login}
}

// sends get request to get accessToken and user information if pages is refreshed

const refresh = async () => {
    error.value = null;

    try {

        const res = await axios.get('/users/refresh', { withCredentials: true });
        
        return res.data

    } catch(err) {
        console.log(err.message)
        error.value = err.message;
    }

}

const useRefresh = () => {
    return {error, refresh}
}

// send a get request get public user information 

const getUser = async (id) => {
    error.value = null;

    try {

        const res = await axios.get('/users/userdata/' + id);
        
        return res.data

    } catch(err) {
        console.log(err.message)
        error.value = err.message;
    }

}

const usegetUser = () => {
    return {error, getUser}
}


const logout = async () => {
    error.value = null;

    try {

        await axios.get('/users/logout', {
            withCredentials: true
        });
        

    } catch(err) {
        console.log(err.message)
        error.value = err.message;
    }

}

const useLogout = () => {
    return {error, logout}
}


export { useSignup, useLogin, useRefresh, usegetUser, useLogout }