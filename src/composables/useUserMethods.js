import { ref } from "vue"
import axios from "../api/axios";

const errorOneU = ref(null); 
const errorTwoU = ref(null); 
const errorThreeU = ref(null);
const errorFourU = ref(null);
const errorFiveU = ref(null);
const errorSixU = ref(null);
const errorSevenU = ref(null);
const errorEightU = ref(null);


// post request to add a user in the database

const signup = async (user) => {
    errorOneU.value = null;

    try {

        const res = await axios.post('/users/register', user);

        if (res.status != 200) {
            new Error('there is an error')
        }

        return res.data.message;

    } catch(err) {
        console.log(err.message)
        errorOneU.value = err.message;
    }

}

const useSignup = () => {
    return {errorOneU, signup}
}

// post request to validate user and log them in

const login = async (user) => {
    errorTwoU.value = null;

    try {

        const res = await axios.post('/users/login', user, { withCredentials: true });

        return res.data;

    } catch(err) {
        console.log(err.message)
        errorTwoU.value = err.message;
    }

}

const useLogin = () => {
    return {errorTwoU, login}
}

// sends get request to get accessToken and user information if pages is refreshed

const refresh = async () => {
    errorThreeU.value = null;

    try {

        const res = await axios.get('/users/refresh', { withCredentials: true });
        
        return res.data

    } catch(err) {
        console.log(err.message)
        errorThreeU.value = err.message;
    }

}

const useRefresh = () => {
    return {errorThreeU, refresh}
}

// send a get request get public user information 

const getUser = async (id) => {
    errorFourU.value = null;

    try {

        const res = await axios.get('/users/userdata/' + id);
        
        return res.data

    } catch(err) {
        console.log(err.message)
        errorFourU.value = err.message;
    }

}

const usegetUser = () => {
    return {errorFourU, getUser}
}


const logout = async () => {
    errorFiveU.value = null;

    try {

        await axios.get('/users/logout', {
            withCredentials: true
        });
        

    } catch(err) {
        console.log(err.message)
        errorFiveU.value = err.message;
    }

}

const useLogout = () => {
    return {errorFiveU, logout}
}


const updateProfile = async (info) => {
    
    errorSixU.value = null

    try {

        await axios.put('/users/update', { id: info.userID, name: info.name, bio: info.bio } , {
            headers: {
                Authorization: 'Bearer ' + info.accessToken
            }
        })


    } catch(err) {

        errorSixU.value = err.message
        console.log(err.message)

    }
}

const useUpdateProfile = () =>{
    return { errorSixU, updateProfile }
}


const updateFollow = async (info) => {

    errorSevenU.value = null;

    try {
        
        await axios.put('/users/follow', {
            userFollowing: info.userFollowing,
            userFollowed: info.userFollowed
        }, {
             headers: {
                Authorization: 'Bearer ' + info.accessToken
             }
        })

    } catch(err) {
        
        errorSevenU.value = err.message;
        console.log(err.message);

    }
    
}

const useUpdateFollow = () =>{
    return { errorSevenU, updateFollow }
}


const getUsers = async () => {
    errorEightU.value = null;

    try {
        const res = await axios.get('/users')

        return res.data
    } catch(err) {
        errorEightU.value = err.message;
        console.log(err)
    }
}

const usegetUsers = () => {
    return {  errorEightU, getUsers }
}


export { useSignup, useLogin, useRefresh, usegetUser, useLogout, useUpdateProfile, useUpdateFollow, usegetUsers }