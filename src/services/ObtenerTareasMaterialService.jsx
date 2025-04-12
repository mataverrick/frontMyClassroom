import axios from "axios";

//id del tema
export const getTareasMaterial = async (id) => {
  const endpoint = `http://127.0.0.1:8000/api/auth/subject/resources/${id}`;
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    alert(error);
  }
};
