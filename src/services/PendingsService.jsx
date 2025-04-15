import axios from "axios";

export const getPendings = async () => {
    const endpoint = "http://127.0.0.1:8000/api/student/pendings";
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Token no disponible");
        }

        const response = await axios.get(endpoint, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.data; // Devuelve solo la propiedad `data`
    } catch (error) {
        console.error("Error dentro del service:", error.message);
        throw error;
    }
};