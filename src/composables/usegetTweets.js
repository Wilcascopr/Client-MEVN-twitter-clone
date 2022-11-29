import { ref } from "vue"
import axios from "../api/axios";

const error = ref(null)

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

export default usegetTweets