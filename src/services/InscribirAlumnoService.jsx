import axios from "axios";

const endpoint = "http://127.0.0.1:8000/api/teacher/subject/users";

export const postAlumno = async (id, selectedAlumno) => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("Token no disponible");

//   console.log(selectedAlumno);
  await axios.post(
    endpoint,
    {
      subject: id,
      users: [selectedAlumno],
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
