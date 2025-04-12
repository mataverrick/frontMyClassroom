import React from "react";

const Tareas = ({ tareas = [] }) => {
  return (
    <>
      <ul className="list-group">
        {tareas.map((value) => (
          <li
            className="list-group-item list-group-item-action d-flex gap-3 py-3"
            aria-current="false"
            key={value.id}
          >
            <div className="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h6 className="mb-0">Aviso</h6>
                <p className="mb-0 opacity-75">{value.message}</p>
              </div>
              <small className="opacity-50 text-nowrap">{value.date}</small>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Tareas;
