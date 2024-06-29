import axios from 'axios';

const URL = import.meta.env.VITE_SERVER_URL;
const user = async () => {
    try {
        // if (localStorage.getItem("token") == null) return null;
        // const response = await axios.get(
        //     `${URL}/api/v1/auth/me`,
        //     {
        //         headers: {
        //             "Authorization": "Bearer " + localStorage.getItem("token")
        //         }
        //     }
        // );
        // // this is returning us the user data: email, name,
        // return response.data.data;
    } catch (error) {
        return null;
    }
}

export { user }