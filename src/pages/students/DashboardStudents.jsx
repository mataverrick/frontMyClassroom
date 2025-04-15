import React, { useEffect, useState } from "react";
import { getSubjects } from "../../services/ClasesService";
import Navbar from "../../components/NavbarStudents";
import { useNavigate } from "react-router-dom";
import Cards from "../../components/Cards";

const DashboardStudent = () => {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [recargarClases, setRecargarClases] = useState(false);

    const updateRecargarClases = (value) => {
        setRecargarClases((prev) => (prev !== value ? value : prev));
    };


    const navigate = useNavigate();

    //Recuperar clases
    useEffect(() => {
        const fetchClases = async () => {
            try {
                const response = await getSubjects();
                setSubjects(response);
            } catch (error) {
                alert(error);
            } finally {
                setLoading(false);
            }
        };
        fetchClases();
    }, [recargarClases]);

    const onCardClick = (id) => {
        navigate(`/maestro/clase/${id}`);
    };

    return (
        <Navbar>
            <Cards data={subjects} onCardClick={onCardClick} />
        </Navbar>
    );

};

export default DashboardStudent;