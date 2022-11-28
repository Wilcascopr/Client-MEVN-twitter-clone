import { ref } from "vue"
import axios from "../api/axios";

const error = ref(null)

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

export default useSignup