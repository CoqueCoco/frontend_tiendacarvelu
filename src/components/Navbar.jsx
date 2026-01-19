import React from 'react';

const Navbar = ({ cartCount }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand fw-bold" href="/">Carvelu</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item"><a className="nav-link active" href="/">Inicio</a></li>
                        <li className="nav-item"><a className="nav-link" href="#">Sobre nosotros</a></li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Tienda</a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Todos los productos</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Ofertas</a></li>
                            </ul>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center gap-2">
                        <a href="#" className="btn btn-outline-dark">
                            <i className="bi-person-fill me-1"></i> Login
                        </a>
                        <button className="btn btn-outline-dark" type="button">
                            <i className="bi-cart-fill me-1"></i>
                            Carrito
                            <span className="badge bg-dark text-white ms-1 rounded-pill">{cartCount}</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;