import { ref } from "vue"
import axios from "../api/axios";

const error = ref(null)

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

export default usegetUser