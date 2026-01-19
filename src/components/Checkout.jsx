import React, { useState } from 'react';

const Carrito = ({ cart, setCart, user, setView }) => {
    const [direccion, setDireccion] = useState("");
    const [metodoPago, setMetodoPago] = useState("efectivo");
    const [compraFinalizada, setCompraFinalizada] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [errorDireccion, setErrorDireccion] = useState(false); // Nuevo estado para el error rojo

    const totalPedido = cart.reduce((sum, item) => sum + item.precio, 0);

    const realizarSimulacion = () => {
        // Validación manual: si no hay dirección, activamos el error rojo
        if (!direccion.trim()) {
            setErrorDireccion(true);
            return;
        }

        setCargando(true);
        setErrorDireccion(false);

        setTimeout(() => {
            const historial = JSON.parse(localStorage.getItem('pedidosCarvelu')) || [];
            historial.push({
                cliente: user?.name || "Cliente",
                direccion,
                metodo: metodoPago,
                total: totalPedido,
                fecha: new Date().toLocaleDateString()
            });
            localStorage.setItem('pedidosCarvelu', JSON.stringify(historial));
            
            setCargando(false);
            setCompraFinalizada(true);
            setCart([]);
        }, 1500);
    };

    if (compraFinalizada) {
        return (
            <div className="container py-5 text-center">
                <div className="card shadow border-0 p-5">
                    <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '5rem' }}></i>
                    <h2 className="display-5 fw-bold mt-4">¡Gracias por tu compra!</h2>
                    <p className="lead text-muted">Tu pedido llegará pronto a <strong>{direccion}</strong>.</p>
                    <div className="mt-4">
                        <button onClick={() => setView('tienda')} className="btn btn-primary btn-lg px-5">Volver a la tienda</button>
                    </div>
                </div>
            </div>
        );
    }

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

                            <hr className="my-4" />
                            <h5 className="fw-bold mb-3"><i className="bi bi-truck me-2"></i>Información de entrega</h5>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label fw-bold text-muted">Dirección en Quilpué / Los Pinos:</label>
                                    <input 
                                        type="text" 
                                        // Aquí aplicamos la clase 'is-invalid' condicionalmente
                                        className={`form-control form-control-lg ${errorDireccion ? 'is-invalid' : ''}`} 
                                        value={direccion}
                                        onChange={(e) => {
                                            setDireccion(e.target.value);
                                            if (errorDireccion) setErrorDireccion(false); // Quitamos el rojo al escribir
                                        }}
                                        placeholder="Ej: Av. Los Pinos 1234"
                                    />
                                    {errorDireccion && (
                                        <div className="invalid-feedback">
                                            Debes ingresar una dirección para el despacho.
                                        </div>
                                    )}
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
                        </div>
                    </div>
                </div>

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
                                onClick={realizarSimulacion}
                                disabled={cart.length === 0 || cargando}
                            >
                                {cargando ? 'Procesando...' : 'Confirmar Pedido'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carrito;