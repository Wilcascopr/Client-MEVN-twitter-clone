import { ref } from "vue"
import axios from "../api/axios";

const error = ref(null)

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

export default useCrateTweet