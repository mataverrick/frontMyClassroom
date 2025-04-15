import React, { useEffect, useState } from "react";
import { getPendings } from "../../services/PendingsService";
import PendingsList from "../../components/PendingList";
import NavbarStudents from "../../components/NavbarStudents";

const Pendientes = () => {
    const [pendings, setPendings] = useState([]);
    const [recargarClases, setRecargarClases] = useState(false);

    useEffect(() => {
        const fetchPendings = async () => {
            try {
                const response = await getPendings();
                setPendings(response); // `response` ya contiene `data`
            } catch (error) {
                alert(error);
            }
        };
        fetchPendings();
    }, [recargarClases]);

    return (
        <div>
            <NavbarStudents />
            <PendingsList pendings={pendings} />
        </div>
    );
};

export default Pendientes;