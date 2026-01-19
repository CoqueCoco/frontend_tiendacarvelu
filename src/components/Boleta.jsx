import React from 'react';

const Boleta = ({ cart, user, setView, setCart }) => {
    const total = cart.reduce((acc, item) => acc + item.precio, 0);
    const fecha = new Date().toLocaleDateString();
    const numeroPedido = Math.floor(Math.random() * 90000) + 10000;

    const terminarProceso = () => {
        setCart([]); // Vaciamos el carrito real
        localStorage.removeItem('carveluCart');
        setView('tienda');
    };

    return (
        <div className="container py-5 mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card border-0 shadow-lg p-4" style={{ backgroundColor: '#fff', borderTop: '10px solid #dc3545' }}>
                        <div className="text-center mb-4">
                            <h2 className="fw-bold mb-0">CARVELU</h2>
                            <p className="text-muted small">Carnicería & Boutique</p>
                            <div className="border-top border-bottom py-2 my-3">
                                <h5 className="mb-0 fw-bold">BOLETA ELECTRÓNICA</h5>
                                <small>N° Pedido: {numeroPedido}</small>
                            </div>
                        </div>

                        <div className="small mb-4">
                            <div className="d-flex justify-content-between">
                                <strong>Fecha:</strong> <span>{fecha}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <strong>Cliente:</strong> <span>{user?.name}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <strong>Email:</strong> <span>{user?.email}</span>
                            </div>
                        </div>

                        <table className="table table-sm table-borderless small">
                            <thead>
                                <tr className="border-bottom text-muted">
                                    <th>DESCRIPCIÓN</th>
                                    <th className="text-end">VALOR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.nombre}</td>
                                        <td className="text-end">${item.precio.toLocaleString('es-CL')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="border-top pt-3 mt-3">
                            <div className="d-flex justify-content-between h4 fw-bold">
                                <span>TOTAL PAGADO</span>
                                <span className="text-danger">${total.toLocaleString('es-CL')}</span>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <button className="btn btn-outline-secondary btn-sm me-2 d-print-none" onClick={() => window.print()}>
                                <i className="bi bi-printer me-1"></i>Imprimir
                            </button>
                            <button className="btn btn-dark btn-sm d-print-none" onClick={terminarProceso}>
                                Volver al Inicio
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Boleta;