import React from "react";


const Cards = ({ data = [], onCardClick }) => {
    if (!data.length) return <div>No hay datos</div>;
    // console.log(data)
    return (
        <div className="container d-flex flex-wrap gap-3">
            {data.map((item) => (
                <div
                    key={item.id}
                    className="card text-white bg-dark mb-3"
                    style={{ width: "18rem" , cursor:"pointer" }}
                    onClick={() => onCardClick?.(item.id)}
                >
                    <div className="card-header"> {item.name}</div>
                    <div className="card-body">
                        <p className="card-text">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Cards;
