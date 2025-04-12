import axios from "axios";


export  const postMaterial = async (data) => {
  const endpoint = `http://127.0.0.1:8000/api/teacher/subject/resource`;
  const token = localStorage.getItem("token");

  const response = await axios.post(endpoint, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
