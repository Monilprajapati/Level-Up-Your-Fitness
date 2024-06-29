import axios from "axios";

const authUser = async (serverRoute, formData) => {
  const URL = import.meta.env.VITE_SERVER_URL;
  console.log(formData)
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(
      `${URL}/api/v1/auth/${serverRoute}`,
      formData
    );
    console.log("Response : ", response.data.data.isUserCreated._id)
    return response.data.data.isUserCreated._id;
  } catch (error) {
    throw error;
  }
};

export default authUser;
