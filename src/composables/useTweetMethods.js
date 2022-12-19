import { ref } from "vue"
import axios from "../api/axios";

const errorOne = ref(null) 
const errorTwo = ref(null) 
const errorThree = ref(null)
const errorFour = ref(null);
const errorFive = ref(null);
const errorSix = ref(null);
const errorSeven = ref(null);
const errorEight = ref(null);

// get tweets from server to diplasy in hompage

const getTweets = async (page) => {
    errorOne.value = null

    try {

        const res = await axios.get('/tweets/' + page);

        if (res.status != 200) {
            new Error('there is an error')
        }

        return res.data;

    } catch(err) {
        console.log(err.message)
        errorOne.value = err.message;
    }

}

const usegetTweets = () => {
    return { errorOne , getTweets}
}

// post the new tweet to the server

const createTweet = async (tweet, token) => {
    errorTwo.value = null;

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
        errorTwo.value = err.message;
    }

}

const useCrateTweet = () => {
    return { errorTwo, createTweet}
}

const likeTweet = async (tweet, token) => {

    errorThree.value = null;

    try {

        const res = await axios.put('/tweets/update', tweet,
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
        errorThree.value = err.message;
    }

}

const useLikeTweet = () => {
    return { errorThree, likeTweet }
}

const getUserTweets = async (id) => {

    errorFour.value = null;

    try {

        const res = await axios.get('/tweets/user/' + id)

        if (res.status != 200) {
            new Error('there is an error')
        }

        return res.data;

    } catch(err) {
        console.log(err.message)
        errorFour.value = err.message;
    }

}

const useGetUserTweets = () => {
    return { errorFour, getUserTweets }
}

const replyTweet = async (info) => {
    
    errorFive.value = null;

    try {
        
        const res = await axios.post('/tweets/reply/' + info.tweetID, { text: info.text, tags: info.tags }, {
            headers: {
                Authorization: 'Bearer ' + info.accessToken
            },
            withCredentials: true
        })

        return res.data

    } catch(err) {

        errorFive.value = err.message;
        console.log(err.message);
    }

}

const useReplyTweet = () => {
    return { errorFive, replyTweet }
}

const getTweet = async (id) => {
    
    errorSix.value = null;

    try {

        const res = await axios.get('/tweets/single/' + id)

        return res.data

    } catch(err) {

        errorSix.value = err.message;
        console.log(err.message);
    }  
}

const usegetTweet = () => {
    return { errorSix, getTweet}
}

const getReplyTweets = async (tweets) => {

    errorSeven.value = null

    try {
        const res = await axios.post('/tweets/replies', {tweets})
        return res.data;

    } catch(err) {

        errorSeven.value = err.message;
        console.log(err.message);

    }
}

const userGetReplyTweets = () => {
    return { errorSeven, getReplyTweets}
}

const deleteTweet = async (id, accessToken) => {

    errorEight.value = null;
    
    try {
        axios.delete('/tweets/delete/' + id, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        })
    } catch(err) {
        errorEight.value = err.message
        console.log(err);
    }

}

const useDeleteTweet = () => {
    return { errorEight, deleteTweet }
}

export { useCrateTweet, usegetTweets, useLikeTweet, useGetUserTweets, useReplyTweet, usegetTweet, userGetReplyTweets, useDeleteTweet }
