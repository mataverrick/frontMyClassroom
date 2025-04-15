import React from "react";

const Tareas = ({ tareas = [] }) => {
  const tareasPlanas = tareas[0] || [];

  return (
    <>
      <ul className="list-group">
        {tareasPlanas.map((tarea) => (
          <li
            className="list-group-item list-group-item-action d-flex gap-3 py-3"
            aria-current="false"
            key={tarea.id}
          >
            <div className="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h6 className="mb-0">{tarea.title}</h6>
                <p className="mb-0 opacity-75">{tarea.description}</p>
                {tarea.assignment && (
                  <p className="mb-0 text-success">
                    Límite: {tarea.assignment.limit}
                  </p>
                )}
              </div>
              <small className="opacity-50 text-nowrap">
                {new Date(tarea.created_at).toLocaleDateString()}
              </small>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Tareas;
