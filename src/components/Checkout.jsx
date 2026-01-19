import React, { useState } from 'react';

const Carrito = ({ cart, setCart, user, setView }) => {
    const [direccion, setDireccion] = useState("");
    const [metodoPago, setMetodoPago] = useState("efectivo");
    const [cargando, setCargando] = useState(false);
    const [errorDireccion, setErrorDireccion] = useState(false);

    const totalPedido = cart.reduce((sum, item) => sum + item.precio, 0);

    const realizarPedido = () => {
        // Validación de dirección
        if (!direccion.trim()) {
            setErrorDireccion(true);
            return;
        }

        setCargando(true);
        setErrorDireccion(false);

        // Simulamos un pequeño retraso de red
        setTimeout(() => {
            const historial = JSON.parse(localStorage.getItem('pedidosCarvelu')) || [];
            
            // Guardamos el pedido antes de limpiar
            const nuevoPedido = {
                cliente: user?.name || "Cliente",
                email: user?.email,
                direccion,
                metodo: metodoPago,
                productos: cart,
                total: totalPedido,
                fecha: new Date().toLocaleDateString(),
                id: Math.floor(Math.random() * 90000) + 10000
            };
            
            historial.push(nuevoPedido);
            localStorage.setItem('pedidosCarvelu', JSON.stringify(historial));
            localStorage.setItem('ultimoPedido', JSON.stringify(nuevoPedido)); // Guardamos para la boleta

            setCargando(false);
            setView('boleta'); // Saltamos a la vista de boleta
        }, 1500);
    };

    return (
        <div className="container px-4 px-lg-5 py-5">
            <div className="row gx-5">
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-4"><i className="bi bi-basket me-2"></i>Productos seleccionados</h5>
                            
                            {cart.length === 0 ? (
                                <div className="text-center py-5">
                                    <i className="bi bi-cart-x text-muted" style={{ fontSize: '5rem' }}></i>
                                    <p className="mt-3 text-muted">Tu carrito está vacío.</p>
                                    <button onClick={() => setView('tienda')} className="btn btn-outline-dark">Volver a comprar</button>
                                </div>
                            ) : (
                                cart.map((item, index) => (
                                    <div key={index} className="d-flex justify-content-between align-items-center border-bottom py-3">
                                        <div className="d-flex align-items-center">
                                            <img src={item.img} alt={item.nombre} className="rounded me-3" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                            <div>
                                                <h6 className="mb-0 fw-bold">{item.nombre}</h6>
                                                <small className="text-muted">Corte de Primera</small>
                                            </div>
                                        </div>
                                        <span className="fw-bold">${item.precio.toLocaleString('es-CL')}</span>
                                    </div>
                                ))
                            )}

                            {cart.length > 0 && (
                                <>
                                    <hr className="my-4" />
                                    <h5 className="fw-bold mb-3"><i className="bi bi-truck me-2"></i>Información de entrega</h5>
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <label className="form-label fw-bold text-muted">Dirección en Quilpué / Los Pinos:</label>
                                            <input 
                                                type="text" 
                                                className={`form-control form-control-lg ${errorDireccion ? 'is-invalid' : ''}`} 
                                                value={direccion}
                                                onChange={(e) => {
                                                    setDireccion(e.target.value);
                                                    if (errorDireccion) setErrorDireccion(false);
                                                }}
                                                placeholder="Ej: Av. Los Pinos 1234"
                                            />
                                            <div className="invalid-feedback">Debes ingresar una dirección para el despacho.</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold text-muted">Método de pago:</label>
                                            <select 
                                                className="form-select form-select-lg"
                                                value={metodoPago}
                                                onChange={(e) => setMetodoPago(e.target.value)}
                                            >
                                                <option value="efectivo">Efectivo (al recibir)</option>
                                                <option value="tarjeta">Tarjeta (Débito/Crédito)</option>
                                            </select>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {cart.length > 0 && (
                    <div className="col-lg-4">
                        <div className="card shadow-sm border-0 sticky-top" style={{ top: '5rem' }}>
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-3">Resumen de compra</h5>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Cantidad:</span>
                                    <span className="fw-bold">{cart.length}</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between mb-4">
                                    <span className="fw-bold fs-5">Total:</span>
                                    <span className="fw-bold fs-4 text-primary">${totalPedido.toLocaleString('es-CL')}</span>
                                </div>
                                
                                <button 
                                    className="btn btn-success w-100 btn-lg fw-bold py-3 mb-3" 
                                    onClick={realizarPedido}
                                    disabled={cargando}
                                >
                                    {cargando ? (
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                    ) : 'Confirmar y Ver Boleta'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Carrito;