import React from "react";

const NoticeCardList = ({ notices }) => {
    if (!notices || notices.length === 0) {
        return <p className="text-center mt-4">No hay avisos disponibles.</p>;
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Avisos</h2>
            <div className="d-flex flex-column gap-3">
                {notices.map((notice) => (
                    <div key={notice.id} className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title text-primary">{notice.message}</h5>
                            <p className="card-text text-muted">
                                Fecha: {new Date(notice.date).toLocaleDateString()}
                            </p>
                            {/* Renderizar archivos si existen */}
                            {notice.files && notice.files.length > 0 && (
                                <div className="mt-3">
                                    <h6>Archivos:</h6>
                                    <div className="d-flex flex-wrap gap-2">
                                        {notice.files.map((file) => (
                                            <a
                                                key={file.id}
                                                href={file.path}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-outline-primary btn-sm"
                                            >
                                                {file.originalName}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NoticeCardList;