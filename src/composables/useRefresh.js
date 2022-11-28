import { ref } from "vue"
import axios from "../api/axios";

const error = ref(null)

const refresh = async () => {
    error.value = null;

    try {

        const res = await axios.get('/users/refresh', { withCredentials: true });
        

        if (res.status === 200) {
            const token = res.data.accessToken;
            const response = await axios.get('/users/userdata', {
                headers: {
                    Authorization: 'Bearer ' + token
                },
                withCredentials: true
            })
            console.log(response);
            if (response.status === 200) return response.data;
            throw new Error('no data available')
        }

    } catch(err) {
        console.log(err.message)
        error.value = err.message;
    }

}

const useRefresh = () => {
    return {error, refresh}
}

export default useRefresh