import axios from "axios";

export const postAviso = async (avisoData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `http://127.0.0.1:8000/api/teacher/subject/notice`,
    avisoData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
