import React, { useState } from 'react';

const Navbar = ({ cartCount, setView, user, onLogout, searchTerm, setSearchTerm }) => {
    const [isUserOpen, setIsUserOpen] = useState(false);
    const [isTiendaOpen, setIsTiendaOpen] = useState(false);

    const navegar = (vista) => {
        setView(vista);
        setIsUserOpen(false);
        setIsTiendaOpen(false);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand fw-bold fs-4" href="#!" onClick={() => navegar('tienda')}>
                    <span className="text-primary">Car</span>velu
                </a>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item">
                            <a className="nav-link fw-semibold" href="#!" onClick={() => navegar('tienda')}>Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fw-semibold" href="#!" onClick={() => navegar('nosotros')}>Sobre nosotros</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a 
                                className={`nav-link dropdown-toggle fw-semibold ${isTiendaOpen ? 'show' : ''}`} 
                                href="#!" 
                                onClick={() => setIsTiendaOpen(!isTiendaOpen)}
                            >
                                Tienda
                            </a>
                            <ul className={`dropdown-menu shadow border-0 ${isTiendaOpen ? 'show' : ''}`} style={{ display: isTiendaOpen ? 'block' : 'none' }}>
                                <li><a className="dropdown-item" href="#!" onClick={() => navegar('tienda')}>Todos los productos</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#!" onClick={() => navegar('ofertas')}>Ofertas</a></li>
                                <li><a className="dropdown-item" href="#!" onClick={() => navegar('recien-llegados')}>Recién llegados</a></li>
                            </ul>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                        <div className="input-group d-none d-md-flex" style={{ width: '200px' }}>
                            <span className="input-group-text bg-white border-end-0 text-muted">
                                <i className="bi bi-search"></i>
                            </span>
                            <input 
                                type="text" 
                                className="form-control border-start-0 ps-0 shadow-none" 
                                placeholder="Buscar..." 
                                data-testid="search-input" // AÑADIDO PARA TEST
                                style={{ fontSize: '0.85rem' }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {user ? (
                            <div className="dropdown">
                                <button 
                                    className="btn btn-outline-dark dropdown-toggle fw-bold d-flex align-items-center btn-sm py-2" 
                                    type="button"
                                    onClick={() => setIsUserOpen(!isUserOpen)}
                                >
                                    <i className="bi-person-circle me-1 fs-5"></i>
                                    <span className="d-none d-sm-inline">{user.name.split(' ')[0]}</span>
                                </button>
                                <ul className={`dropdown-menu dropdown-menu-end shadow border-0 mt-2 ${isUserOpen ? 'show' : ''}`} 
                                    style={{ display: isUserOpen ? 'block' : 'none', minWidth: '180px' }}>
                                    <li className="px-3 py-2 border-bottom bg-light">
                                        <div className="fw-bold text-dark mb-0 small">{user.name}</div>
                                        <div className="text-muted" style={{ fontSize: '0.7rem' }}>{user.email}</div>
                                    </li>
                                    <li>
                                        <button className="dropdown-item py-2" onClick={() => navegar('historial')}>
                                            <i className="bi bi-clock-history me-2 text-primary"></i>Mis Pedidos
                                        </button>
                                    </li>
                                    <li><hr className="dropdown-divider my-1" /></li>
                                    <li>
                                        <button className="dropdown-item text-danger py-2" onClick={onLogout}>
                                            <i className="bi-box-arrow-right me-2"></i>Cerrar Sesión
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <button className="btn btn-dark fw-bold btn-sm px-3" onClick={() => navegar('login')}>
                                <i className="bi-person-fill me-1"></i> Entrar
                            </button>
                        )}

                        <button 
                            className="btn btn-outline-dark fw-bold position-relative btn-sm py-2 px-3" 
                            onClick={() => navegar('carrito')}
                            data-testid="cart-button" // AÑADIDO PARA TEST
                        >
                            <i className="bi-cart-fill"></i>
                            <span className="ms-1 d-none d-md-inline">Carrito</span>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light">
                                {cartCount}
                            </span>
                        </button>

                        {user && user.role === 'admin' && (
                            <button className="btn btn-warning btn-sm shadow-sm fw-bold" onClick={() => navegar('admin')}>
                                <i className="bi bi-gear-fill me-1"></i> Panel
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;