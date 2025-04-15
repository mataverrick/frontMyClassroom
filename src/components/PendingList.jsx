import React from "react";

const PendingsList = ({ pendings }) => {
    if (!pendings || pendings.length === 0) {
        return <p className="text-center mt-4">No hay pendientes por mostrar.</p>;
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Pendientes</h2>
            <ul className="list-group">
                {pendings.map((pending) => (
                    <li key={pending.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="mb-1">{pending.resource.title}</h5>
                            <small className="text-muted">
                                Fecha límite: {new Date(pending.limit).toLocaleDateString()}
                            </small>
                        </div>
                        <span className="badge bg-primary rounded-pill">Pendiente</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PendingsList;