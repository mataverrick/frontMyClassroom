import React from "react";

const Modal = ({ titulo, formulario }) => {
    return (
        <div
            className="modal fade"
            id="crearClaseModal"
            tabIndex="-1"
            aria-labelledby="crearClaseModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1
                            className="modal-title fs-5"
                            id="crearClaseModalLabel"
                        >
                            {titulo}
                        </h1>
                    </div>
                    <div className="modal-body">
                        {formulario}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
