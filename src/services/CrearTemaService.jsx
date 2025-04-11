import axios from "axios";

const endpoint = "http://127.0.0.1:8000/api/teacher/subject/topic"
// {
//     *      "name" : "AJAX",
//     *      "description":"Parece que esta feo pero es de lo mejor que existe",
//     *      "subject":1
//     * }

export const postTema = async (data)=>{
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token no disponible");
    }

    const response = await axios.post(endpoint, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}