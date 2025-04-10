import axios from "axios";

export const getSubjects = async () => {
    const endpoint = "http://127.0.0.1:8000/api/auth/subjects";

    try {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Token no disponible");
        }

        const response = await axios.get(endpoint, {
            headers: { Authorization: `Bearer ${token}` },
        });

        // console.log(response.data.subjects);
        return response.data.subjects;
    } catch (error) {
        console.error("Error dentro del service:", error.message);
        throw error;
    }

    
};
