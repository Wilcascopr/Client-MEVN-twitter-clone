import { ref } from "vue"
import axios from "../api/axios";

const error = ref(null)

// get tweets from server to diplasy in hompage

const getTweets = async (page) => {
    error.value = null;

    try {

        const res = await axios.get('/tweets/' + page);

        if (res.status != 200) {
            new Error('there is an error')
        }

        return res.data;

    } catch(err) {
        console.log(err.message)
        error.value = err.message;
    }

}

const usegetTweets = () => {
    return {error, getTweets}
}

// post the new tweet to the server

const createTweet = async (tweet, token) => {
    error.value = null;

    try {

        const res = await axios.post('/tweets/create', tweet,
        {
            headers: {
                Authorization: 'Bearer ' + token
            },
            withCredentials: true
        })

        if (res.status != 200) {
            new Error('there is an error')
        }

        return res.data;

    } catch(err) {
        console.log(err.message)
        error.value = err.message;
    }

}

const useCrateTweet = () => {
    return {error, createTweet}
}

const likeTweet = async (tweet, token) => {

    error.value = null;

    try {

        const res = await axios.post('/tweets/update', tweet,
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })

        if (res.status != 200) {
            new Error('there is an error')
        }

        return res.data;

    } catch(err) {
        console.log(err.message)
        error.value = err.message;
    }

}

const useLikeTweet = () => {
    return { error, likeTweet }
}

export { useCrateTweet, usegetTweets, useLikeTweet }
