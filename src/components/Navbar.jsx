import React, { useState } from 'react';

const Navbar = ({ cartCount, setView, user, onLogout }) => {
    // Estados para los dos dropdowns diferentes
    const [isUserOpen, setIsUserOpen] = useState(false);
    const [isTiendaOpen, setIsTiendaOpen] = useState(false);

    // Función para manejar navegación y cerrar menús
    const navegar = (vista) => {
        setView(vista);
        setIsUserOpen(false);
        setIsTiendaOpen(false);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand fw-bold" href="#!" onClick={() => navegar('tienda')}>
                    Carvelu
                </a>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item">
                            <a className="nav-link active" href="#!" onClick={() => navegar('tienda')}>Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#!" onClick={() => navegar('nosotros')}>Sobre nosotros</a>
                        </li>
                        
                        {/* DROPDOWN TIENDA */}
                        <li className="nav-item dropdown">
                            <a 
                                className={`nav-link dropdown-toggle ${isTiendaOpen ? 'show' : ''}`} 
                                href="#!" 
                                onClick={() => setIsTiendaOpen(!isTiendaOpen)}
                            >
                                Tienda
                            </a>
                            <ul className={`dropdown-menu ${isTiendaOpen ? 'show' : ''}`} style={{ display: isTiendaOpen ? 'block' : 'none' }}>
                                <li><a className="dropdown-item" href="#!" onClick={() => navegar('tienda')}>Todos los productos</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#!" onClick={() => navegar('ofertas')}>Ofertas</a></li>
                                <li><a className="dropdown-item" href="#!" onClick={() => navegar('recien-llegados')}>¡Recién llegados!</a></li>
                            </ul>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center gap-2">
                        {/* SECCIÓN DE USUARIO / LOGIN */}
                        {user ? (
                            <div className="dropdown">
                                <button 
                                    className="btn btn-outline-dark dropdown-toggle fw-bold" 
                                    type="button"
                                    onClick={() => setIsUserOpen(!isUserOpen)}
                                >
                                    <i className="bi-person-check-fill me-1"></i>
                                    {user.name}
                                </button>
                                <ul className={`dropdown-menu dropdown-menu-end shadow border-0 ${isUserOpen ? 'show' : ''}`} 
                                    style={{ display: isUserOpen ? 'block' : 'none', position: 'absolute', right: 0 }}>
                                    <li className="px-3 py-2 small text-muted border-bottom">{user.email}</li>
                                    <li>
                                        <button className="dropdown-item text-danger mt-1" onClick={onLogout}>
                                            <i className="bi-box-arrow-right me-2"></i>Cerrar Sesión
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <button className="btn btn-outline-dark fw-bold" onClick={() => navegar('login')}>
                                <i className="bi-person-fill me-1"></i> Iniciar Sesión
                            </button>
                        )}

                        {/* CARRITO */}
                        <button className="btn btn-outline-dark fw-bold position-relative" onClick={() => navegar('carrito')}>
                            <i className="bi-cart-fill me-1"></i>
                            Carrito
                            <span className="badge bg-dark text-white ms-1 rounded-pill">{cartCount}</span>
                        </button>

                        {/* PANEL ADMIN (Solo si hay usuario o como acceso directo) */}
                        <button className="btn btn-warning fw-bold shadow-sm" onClick={() => navegar('admin')}>
                            <i className="bi bi-gear-fill me-1"></i> Admin Panel
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;