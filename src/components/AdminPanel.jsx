import React, { useState } from 'react';

const AdminPanel = ({ productos, setProductos, setView }) => {
    const [editando, setEditando] = useState(null);
    const [searchTermAdmin, setSearchTermAdmin] = useState("");
    const [nuevoProd, setNuevoProd] = useState({
        nombre: "", precio: "", precioAnterior: "", img: "", oferta: false, nuevo: false
    });

    // Estado para la notificación (Toast)
    const [toast, setToast] = useState({ show: false, msg: "", color: "bg-dark" });

    const mostrarToast = (msg, color = "bg-dark") => {
        setToast({ show: true, msg, color });
        setTimeout(() => setToast({ show: false, msg: "", color: "bg-dark" }), 3000);
    };

    const guardarProducto = (e) => {
        e.preventDefault();
        
        // Preparar el objeto del producto
        const itemData = editando ? editando : nuevoProd;
        const productoFinal = {
            ...itemData,
            precio: Number(itemData.precio),
            // Si no es oferta, eliminamos el precio anterior
            precioAnterior: itemData.oferta ? Number(itemData.precioAnterior) : null 
        };

        if (editando) {
            setProductos(productos.map(p => p.id === editando.id ? productoFinal : p));
            setEditando(null);
            mostrarToast("¡Corte actualizado correctamente!", "bg-success");
        } else {
            const id = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
            setProductos([...productos, { ...productoFinal, id }]);
            setNuevoProd({ nombre: "", precio: "", precioAnterior: "", img: "", oferta: false, nuevo: false });
            mostrarToast("¡Producto añadido al inventario!", "bg-primary");
        }
    };

    const eliminar = (id) => {
        if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
            setProductos(productos.filter(p => p.id !== id));
            mostrarToast("Producto eliminado del stock.", "bg-danger");
        }
    };

    const productosFiltradosAdmin = productos.filter(p => 
        p.nombre.toLowerCase().includes(searchTermAdmin.toLowerCase())
    );

    return (
        <div className="container py-5">
            {/* NOTIFICACIÓN TOAST */}
            <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
                <div className={`toast align-items-center text-white ${toast.color} border-0 shadow-lg ${toast.show ? 'show' : 'hide'}`} role="alert">
                    <div className="d-flex">
                        <div className="toast-body fw-bold">{toast.msg}</div>
                        <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setToast({...toast, show: false})}></button>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <h2 className="fw-bold m-0"><i className="bi bi-gear-fill text-warning me-2"></i>Panel Admin</h2>
                <button className="btn btn-dark shadow-sm" onClick={() => setView('tienda')}>Volver a Tienda</button>
            </div>

            <div className="row g-4">
                {/* FORMULARIO DE GESTIÓN */}
                <div className="col-lg-4">
                    <div className="card shadow border-0 p-4 sticky-top" style={{ top: '100px' }}>
                        <h5 className="fw-bold mb-3 border-bottom pb-2">
                            {editando ? '📝 Editar Producto' : '➕ Nuevo Ingreso'}
                        </h5>
                        <form onSubmit={guardarProducto}>
                            <div className="mb-2">
                                <label className="small fw-bold">Nombre del corte</label>
                                <input type="text" className="form-control" value={editando ? editando.nombre : nuevoProd.nombre} onChange={e => editando ? setEditando({...editando, nombre: e.target.value}) : setNuevoProd({...nuevoProd, nombre: e.target.value})} required />
                            </div>

                            {/* PRECIO (Si es oferta, este es el precio rebajado) */}
                            <div className="mb-2">
                                <label className="small fw-bold">
                                    { (editando ? editando.oferta : nuevoProd.oferta) ? 'Precio Oferta ($)' : 'Precio Normal ($)' }
                                </label>
                                <input type="number" className="form-control" value={editando ? editando.precio : nuevoProd.precio} onChange={e => editando ? setEditando({...editando, precio: e.target.value}) : setNuevoProd({...nuevoProd, precio: e.target.value})} required />
                            </div>

                            {/* PRECIO ANTERIOR (Solo visible si es oferta) */}
                            { (editando ? editando.oferta : nuevoProd.oferta) && (
                                <div className="mb-2 animate__animated animate__fadeIn">
                                    <label className="small fw-bold text-danger">Precio Normal/Anterior ($)</label>
                                    <input 
                                        type="number" 
                                        className="form-control border-danger" 
                                        placeholder="Ej: 12000"
                                        value={editando ? editando.precioAnterior : nuevoProd.precioAnterior} 
                                        onChange={e => editando ? setEditando({...editando, precioAnterior: e.target.value}) : setNuevoProd({...nuevoProd, precioAnterior: e.target.value})} 
                                        required 
                                    />
                                    <div className="form-text text-danger" style={{fontSize: '0.75rem'}}>Este aparecerá tachado.</div>
                                </div>
                            )}

                            <div className="mb-3">
                                <label className="small fw-bold">URL Imagen</label>
                                <input type="text" className="form-control" value={editando ? editando.img : nuevoProd.img} onChange={e => editando ? setEditando({...editando, img: e.target.value}) : setNuevoProd({...nuevoProd, img: e.target.value})} required />
                            </div>
                            
                            <div className="d-flex gap-2 mb-3">
                                <div className={`p-2 rounded border flex-fill text-center ${ (editando ? editando.oferta : nuevoProd.oferta) ? 'bg-danger text-white border-danger' : 'bg-light text-muted' }`} 
                                     onClick={() => editando ? setEditando({...editando, oferta: !editando.oferta}) : setNuevoProd({...nuevoProd, oferta: !nuevoProd.oferta})}
                                     style={{ cursor: 'pointer', transition: '0.3s' }}>
                                    <small className="fw-bold">OFERTA</small>
                                </div>
                                <div className={`p-2 rounded border flex-fill text-center ${ (editando ? editando.nuevo : nuevoProd.nuevo) ? 'bg-info text-dark border-info' : 'bg-light text-muted' }`}
                                     onClick={() => editando ? setEditando({...editando, nuevo: !editando.nuevo}) : setNuevoProd({...nuevoProd, nuevo: !nuevoProd.nuevo})}
                                     style={{ cursor: 'pointer', transition: '0.3s' }}>
                                    <small className="fw-bold">NUEVO</small>
                                </div>
                            </div>

                            <button className={`btn w-100 fw-bold shadow-sm py-2 ${editando ? 'btn-success' : 'btn-primary'}`}>
                                {editando ? 'Guardar Cambios' : 'Registrar producto'}
                            </button>
                            {editando && <button className="btn btn-sm btn-link w-100 text-muted mt-2" onClick={() => setEditando(null)}>Cancelar</button>}
                        </form>
                    </div>
                </div>

                {/* TABLA DE PRODUCTOS */}
                <div className="col-lg-8">
                    <div className="input-group mb-3 shadow-sm">
                        <span className="input-group-text bg-white border-end-0"><i className="bi bi-search text-muted"></i></span>
                        <input type="text" className="form-control border-start-0 ps-0 shadow-none" placeholder="Buscar corte por nombre..." value={searchTermAdmin} onChange={(e) => setSearchTermAdmin(e.target.value)} />
                    </div>

                    <div className="card shadow border-0 overflow-hidden">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr className="small text-uppercase text-muted">
                                        <th className="ps-4">Producto</th>
                                        <th>Precios</th>
                                        <th>Estado</th>
                                        <th className="text-end pe-4">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productosFiltradosAdmin.map(p => (
                                        <tr key={p.id}>
                                            <td className="ps-4">
                                                <div className="d-flex align-items-center">
                                                    <img src={p.img} alt="" style={{ width: '45px', height: '45px', objectFit: 'cover' }} className="rounded border me-3" />
                                                    <span className="fw-bold">{p.nombre}</span>
                                                </div>
                                            </td>
                                            <td>
                                                {p.oferta ? (
                                                    <div>
                                                        <div className="text-danger fw-bold">${p.precio.toLocaleString('es-CL')}</div>
                                                        <div className="text-muted text-decoration-line-through small">${p.precioAnterior?.toLocaleString('es-CL')}</div>
                                                    </div>
                                                ) : (
                                                    <div className="fw-bold text-dark">${p.precio.toLocaleString('es-CL')}</div>
                                                )}
                                            </td>
                                            <td>
                                                {p.oferta && <span className="badge bg-danger rounded-pill me-1">Oferta</span>}
                                                {p.nuevo && <span className="badge bg-info text-dark rounded-pill">Nuevo</span>}
                                            </td>
                                            <td className="text-end pe-4">
                                                <button className="btn btn-sm btn-outline-primary me-1" onClick={() => setEditando(p)}><i className="bi bi-pencil"></i></button>
                                                <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(p.id)}><i className="bi bi-trash"></i></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;