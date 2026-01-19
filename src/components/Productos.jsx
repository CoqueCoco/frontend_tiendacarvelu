import React from 'react';

export default function Productos({ data, onAdd }) {
    return (
        <div className="col mb-5">
            <div className={`card h-100 shadow-sm ${data.premium ? 'border-primary' : ''}`}>
                {}
                {data.oferta && <div className="badge bg-danger text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>Oferta</div>}
                {data.premium && <div className="badge bg-primary text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>Premium</div>}
                
                {}
                <img 
                    className="card-img-top" 
                    src={data.img} 
                    alt={data.nombre} 
                    style={{ 
                        height: '300px',
                        objectFit: 'cover', 
                        objectPosition: 'center'
                    }} 
                />
                
                <div className="card-body p-4 text-center">
                    <h5 className="fw-bolder">{data.nombre}</h5>
                    <div className="d-flex justify-content-center small text-warning mb-2">
                        {}
                        <div className="bi-star-fill"></div><div className="bi-star-fill"></div><div className="bi-star-fill"></div>
                    </div>
                    {data.precioAnterior && (
                        <span className="text-muted text-decoration-line-through me-2">${data.precioAnterior.toLocaleString()}</span>
                    )}
                    <span className="fw-bold fs-5">${data.precio.toLocaleString()}</span>
                </div>
                
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                        <button 
                            className={`btn mt-auto ${data.premium ? 'btn-primary' : 'btn-outline-dark'}`}
                            onClick={() => onAdd(data)}
                        >
                            Añadir al carro
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}