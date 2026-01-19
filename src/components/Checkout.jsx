import React, { useState } from 'react';

const Carrito = ({ cart, setCart, user, setView }) => {
    const [direccion, setDireccion] = useState("");
    const [metodoPago, setMetodoPago] = useState("efectivo");
    const [cargando, setCargando] = useState(false);
    const [errorDireccion, setErrorDireccion] = useState(false);

    // Cálculos del total
    const totalPedido = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const totalUnidades = cart.reduce((sum, item) => sum + item.cantidad, 0);

    // NUEVO: Ajustar cantidad (+ o -)
    const ajustarCantidad = (id, cambio) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.id === id) {
                    const nuevaCantidad = item.cantidad + cambio;
                    
                    // Si la cantidad llega a 0, pedimos confirmación para eliminar
                    if (nuevaCantidad < 1) {
                        if (window.confirm(`¿Deseas quitar "${item.nombre}" del carrito?`)) {
                            return null;
                        }
                        return item; // Mantiene 1 si cancela
                    }
                    return { ...item, cantidad: nuevaCantidad };
                }
                return item;
            }).filter(Boolean); // Elimina los nulos (productos quitados)
        });
    };

    const eliminarProducto = (id) => {
        const nuevoCarrito = cart.filter(item => item.id !== id);
        setCart(nuevoCarrito);
    };

    const vaciarCarrito = () => {
        if (window.confirm("¿Estás seguro de que quieres vaciar todo el carrito?")) {
            setCart([]);
        }
    };

    const realizarPedido = () => {
        if (!direccion.trim()) {
            setErrorDireccion(true);
            return;
        }

        setCargando(true);
        setErrorDireccion(false);

        setTimeout(() => {
            const historial = JSON.parse(localStorage.getItem('pedidosCarvelu')) || [];
            
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
            localStorage.setItem('ultimoPedido', JSON.stringify(nuevoPedido)); 

            setCargando(false);
            setView('boleta'); 
        }, 1500);
    };

    return (
        <div className="container px-4 px-lg-5 py-5">
            <div className="row gx-5">
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="fw-bold mb-0"><i className="bi bi-basket me-2"></i>Productos seleccionados</h5>
                                {cart.length > 0 && (
                                    <button 
                                        className="btn btn-outline-danger btn-sm fw-bold" 
                                        onClick={vaciarCarrito}
                                    >
                                        <i className="bi bi-trash3 me-1"></i> Vaciar Carrito
                                    </button>
                                )}
                            </div>
                            
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
                                            <img src={item.img} alt={item.nombre} className="rounded me-3" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                                            <div>
                                                <h6 className="mb-0 fw-bold">{item.nombre}</h6>
                                                <div className="d-flex align-items-center mt-2">
                                                    {/* CONTROLES DE CANTIDAD */}
                                                    <div className="btn-group btn-group-sm border rounded me-3">
                                                        <button 
                                                            className="btn btn-light border-end" 
                                                            onClick={() => ajustarCantidad(item.id, -1)}
                                                        >
                                                            <i className="bi bi-dash"></i>
                                                        </button>
                                                        <span className="px-3 py-1 bg-white fw-bold">{item.cantidad}</span>
                                                        <button 
                                                            className="btn btn-light border-start" 
                                                            onClick={() => ajustarCantidad(item.id, 1)}
                                                        >
                                                            <i className="bi bi-plus"></i>
                                                        </button>
                                                    </div>
                                                    <small className="text-muted">
                                                        x ${item.precio.toLocaleString('es-CL')}
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <span className="fw-bold text-primary me-3">
                                                ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                                            </span>
                                            <button 
                                                className="btn btn-sm btn-outline-secondary opacity-50"
                                                onClick={() => eliminarProducto(item.id)}
                                                title="Eliminar producto"
                                            >
                                                <i className="bi bi-x-lg"></i>
                                            </button>
                                        </div>
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
                                    <span className="text-muted">Total unidades:</span>
                                    <span className="fw-bold">{totalUnidades}</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between mb-4">
                                    <span className="fw-bold fs-5">Total a pagar:</span>
                                    <span className="fw-bold fs-4 text-primary">${totalPedido.toLocaleString('es-CL')}</span>
                                </div>
                                
                                <button 
                                    className="btn btn-success w-100 btn-lg fw-bold py-3 mb-3 shadow-sm" 
                                    onClick={realizarPedido}
                                    disabled={cargando}
                                >
                                    {cargando ? (
                                        <><span className="spinner-border spinner-border-sm me-2"></span>Procesando...</>
                                    ) : 'Confirmar Pedido'}
                                </button>
                                <button className="btn btn-link w-100 text-muted btn-sm" onClick={() => setView('tienda')}>
                                    Seguir comprando
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