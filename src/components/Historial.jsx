import React from 'react';

// Ahora recibe "pedidos" como prop desde App.jsx
const Historial = ({ setView, pedidos = [] }) => {
    
    // Función para borrar el historial: ahora debe limpiar el historial global
    const limpiarHistorial = () => {
        if (window.confirm("¿Seguro que quieres borrar todo tu historial de pedidos?")) {
            // Eliminamos la base de datos completa de pedidos
            localStorage.removeItem('carvelu_historial');
            // Recargamos para que App.jsx reinicie los estados
            window.location.reload();
        }
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">
                    <i className="bi bi-clock-history text-primary me-2"></i>
                    Mi Historial de Pedidos
                </h2>
                <div className="d-flex gap-2">
                    {/* Solo mostramos borrar historial si el usuario tiene pedidos propios */}
                    {pedidos.length > 0 && (
                        <button className="btn btn-outline-danger btn-sm" onClick={limpiarHistorial}>
                            <i className="bi bi-trash me-1"></i> Borrar Todo
                        </button>
                    )}
                    <button className="btn btn-outline-dark btn-sm fw-bold" onClick={() => setView('tienda')}>
                        <i className="bi bi-arrow-left me-1"></i> Volver
                    </button>
                </div>
            </div>

            {pedidos.length === 0 ? (
                <div className="card border-0 shadow-sm p-5 text-center bg-light">
                    <i className="bi bi-receipt-cutoff text-muted mb-3" style={{ fontSize: '4rem' }}></i>
                    <h4 className="text-muted">No tienes pedidos registrados</h4>
                    <p className="small text-muted">Aquí solo verás las compras realizadas con tu cuenta.</p>
                    <button onClick={() => setView('tienda')} className="btn btn-primary mt-3">Ir a comprar</button>
                </div>
            ) : (
                <div className="row g-4">
                    {/* Invertimos la lista para mostrar el más reciente primero */}
                    {pedidos.slice().reverse().map((pedido, index) => (
                        <div key={pedido.id || index} className="col-12">
                            <div className="card shadow-sm border-0 border-start border-primary border-4">
                                <div className="card-body p-4">
                                    <div className="row align-items-center">
                                        <div className="col-md-3">
                                            <span className="badge bg-light text-dark border mb-2">Pedido #{pedido.id}</span>
                                            <div className="small text-muted">{pedido.fecha}</div>
                                            <div className="text-primary x-small" style={{fontSize: '0.7rem'}}>{pedido.userEmail}</div>
                                        </div>
                                        <div className="col-md-4">
                                            <p className="small fw-bold mb-1 text-muted text-uppercase">Productos:</p>
                                            <div className="small">
                                                {pedido.productos?.map((p, i) => (
                                                    <div key={i} className="text-truncate">
                                                        • {p.nombre} (x{p.cantidad})
                                                    </div>
                                                )) || <span className="text-danger">Error al cargar productos</span>}
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <p className="small fw-bold mb-1 text-muted text-uppercase">Envío:</p>
                                            <div className="small text-truncate">{pedido.direccion}</div>
                                        </div>
                                        <div className="col-md-2 text-md-end">
                                            <h4 className="fw-bold text-primary mb-0">
                                                ${pedido.total?.toLocaleString('es-CL')}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Historial;