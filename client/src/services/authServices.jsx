import axios from "axios";

const authUser = async (serverRoute, formData) => {
  const URL = import.meta.env.VITE_SERVER_URL;

  try {
    const response = await axios.post(
      `${URL}/api/v1/auth/${serverRoute}`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default authUser;
