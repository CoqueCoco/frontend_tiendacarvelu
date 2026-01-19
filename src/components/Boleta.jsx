import React, { useEffect, useRef } from 'react';

const Boleta = ({ user, setView, setCart, onSaveOrder }) => {
    // Obtenemos el último pedido guardado por Carrito.jsx
    const pedido = JSON.parse(localStorage.getItem('ultimoPedido'));
    
    // Usamos un ref para asegurarnos de que el pedido se guarde solo una vez al cargar
    const guardadoRef = useRef(false);

    useEffect(() => {
        // Si hay un pedido y no lo hemos guardado en este ciclo de renderizado
        if (pedido && !guardadoRef.current && onSaveOrder) {
            // Enviamos el pedido al historial global de App.jsx
            // Se le adjunta automáticamente el userEmail para la privacidad
            onSaveOrder(pedido);
            guardadoRef.current = true;
        }
    }, [pedido, onSaveOrder]);

    if (!pedido) {
        return (
            <div className="container py-5 text-center">
                <h3>No hay información de pedido reciente.</h3>
                <button className="btn btn-primary" onClick={() => setView('tienda')}>Volver a la tienda</button>
            </div>
        );
    }

    const finalizarCompra = () => {
        setCart([]); // Limpiamos el carrito global
        // Limpiamos el pedido temporal para que no se duplique al volver a entrar
        localStorage.removeItem('ultimoPedido');
        setView('tienda');
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-success text-white text-center py-4">
                            <i className="bi bi-check-circle-fill fs-1"></i>
                            <h3 className="fw-bold mt-2">¡Pedido Confirmado!</h3>
                            <p className="mb-0">Gracias por preferir Carvelu, {pedido.cliente}</p>
                        </div>
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between mb-4">
                                <div>
                                    <span className="text-muted small">NRO. PEDIDO</span>
                                    <div className="fw-bold">#{pedido.id}</div>
                                </div>
                                <div className="text-end">
                                    <span className="text-muted small">FECHA</span>
                                    <div className="fw-bold">{pedido.fecha}</div>
                                </div>
                            </div>

                            <h6 className="fw-bold border-bottom pb-2">Detalle de Productos</h6>
                            {pedido.productos.map((item, index) => (
                                <div key={index} className="d-flex justify-content-between mb-2">
                                    <span>{item.cantidad}x {item.nombre}</span>
                                    <span className="fw-bold">${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                                </div>
                            ))}

                            <hr />
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Método de Pago:</span>
                                <span className="text-capitalize">{pedido.metodo}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-4">
                                <span className="text-muted">Despacho a:</span>
                                <span className="fw-bold text-end" style={{maxWidth: '200px'}}>{pedido.direccion}</span>
                            </div>

                            <div className="bg-light p-3 rounded d-flex justify-content-between align-items-center mb-4">
                                <span className="h5 mb-0 fw-bold">Total Pagado:</span>
                                <span className="h4 mb-0 fw-bold text-success">${pedido.total.toLocaleString('es-CL')}</span>
                            </div>

                            <div className="alert alert-info small">
                                <i className="bi bi-info-circle-fill me-2"></i>
                                Te hemos enviado un correo de confirmación a <strong>{pedido.email}</strong>.
                            </div>

                            <div className="d-grid gap-2">
                                <button className="btn btn-primary btn-lg fw-bold" onClick={finalizarCompra}>
                                    Volver al Inicio
                                </button>
                                <button className="btn btn-outline-dark" onClick={() => window.print()}>
                                    <i className="bi bi-printer me-2"></i>Imprimir Boleta
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