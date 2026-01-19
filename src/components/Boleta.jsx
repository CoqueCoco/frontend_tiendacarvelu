import React, { useEffect, useState } from 'react';

const Boleta = ({ cart, user, setView, setCart }) => {
    const [pedido, setPedido] = useState(null);

    useEffect(() => {
        // Recuperamos el pedido recién guardado en el Checkout
        const ultimo = localStorage.getItem('ultimoPedido');
        if (ultimo) {
            setPedido(JSON.parse(ultimo));
        }
    }, []);

    const finalizarCompra = () => {
        setCart([]); // Vaciamos el carrito global
        localStorage.removeItem('carveluCart'); // Limpiamos storage
        setView('tienda');
    };

    if (!pedido) return <div className="container py-5 text-center">Cargando boleta...</div>;

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-success text-white text-center py-4">
                            <i className="bi bi-check-circle-fill fs-1"></i>
                            <h3 className="fw-bold mb-0">¡Pedido Confirmado!</h3>
                            <p className="mb-0">Gracias por preferir Carvelu</p>
                        </div>
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between mb-4">
                                <div>
                                    <h6 className="text-muted mb-1">Nro. de Orden:</h6>
                                    <p className="fw-bold">#{pedido.id}</p>
                                </div>
                                <div className="text-end">
                                    <h6 className="text-muted mb-1">Fecha:</h6>
                                    <p className="fw-bold">{pedido.fecha}</p>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h6 className="fw-bold border-bottom pb-2">Detalle del Cliente</h6>
                                <p className="mb-1"><strong>Nombre:</strong> {pedido.cliente}</p>
                                <p className="mb-1"><strong>Dirección:</strong> {pedido.direccion}</p>
                                <p className="mb-1"><strong>Método de Pago:</strong> {pedido.metodo === 'efectivo' ? 'Efectivo al recibir' : 'Tarjeta'}</p>
                            </div>

                            <div className="mb-4">
                                <h6 className="fw-bold border-bottom pb-2">Productos</h6>
                                {pedido.productos.map((item, index) => (
                                    <div key={index} className="d-flex justify-content-between small mb-2">
                                        <span>{item.cantidad}x {item.nombre}</span>
                                        <span className="fw-bold">${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-light p-3 rounded d-flex justify-content-between align-items-center">
                                <span className="h5 mb-0 fw-bold">Total Pagado:</span>
                                <span className="h4 mb-0 fw-bold text-success">${pedido.total.toLocaleString('es-CL')}</span>
                            </div>

                            <div className="mt-4 text-center">
                                <button className="btn btn-dark btn-lg w-100 fw-bold" onClick={finalizarCompra}>
                                    Volver al Inicio
                                </button>
                                <button className="btn btn-outline-secondary btn-sm mt-3 w-100" onClick={() => window.print()}>
                                    <i className="bi bi-printer me-2"></i>Imprimir Comprobante
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Boleta;