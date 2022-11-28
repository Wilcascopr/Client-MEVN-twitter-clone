import { ref } from "vue"
import axios from "../api/axios";

const error = ref(null)

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

export default useLogin