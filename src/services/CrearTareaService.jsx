import axios from "axios";

export const postTarea = async (data) => {
  const endpoint = `http://127.0.0.1:8000/api/teacher/subject/assignment`;
  const token = localStorage.getItem("token");

  const response = await axios.post(endpoint, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
