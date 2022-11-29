import { ref } from "vue"
import axios from "../api/axios";

const error = ref(null)

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

export default useRefresh