import React, { useState } from 'react';

const Navbar = ({ cartCount, setView, user, onLogout }) => {
    // Estado para controlar si el menú del usuario está abierto
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    // Función para cerrar sesión y cerrar el menú
    const handleLogoutClick = () => {
        setIsOpen(false);
        onLogout();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand fw-bold" href="#!" onClick={(e) => { e.preventDefault(); setView('tienda'); }}>
                    Carvelu
                </a>
                
                <div className="d-flex align-items-center gap-3 ms-auto">
                    {user ? (
                        <div className="dropdown">
                            <button 
                                className="btn btn-outline-dark dropdown-toggle fw-bold" 
                                type="button"
                                onClick={toggleDropdown} // Control manual
                            >
                                <i className="bi-person-check-fill me-1"></i>
                                {user.name}
                            </button>
                            
                            {/* Menú desplegable condicional */}
                            <ul className={`dropdown-menu dropdown-menu-end shadow border-0 ${isOpen ? 'show' : ''}`} 
                                style={{ 
                                    display: isOpen ? 'block' : 'none', 
                                    position: 'absolute', 
                                    right: 0 
                                }}>
                                <li className="px-3 py-2 small text-muted border-bottom">
                                    {user.email}
                                </li>
                                <li>
                                    <button className="dropdown-item text-danger mt-1" onClick={handleLogoutClick}>
                                        <i className="bi-box-arrow-right me-2"></i>Cerrar Sesión
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <button className="btn btn-outline-dark fw-bold" onClick={() => setView('login')}>
                            <i className="bi-person-fill me-1"></i> Login
                        </button>
                    )}
                    
                    <button className="btn btn-outline-dark fw-bold" onClick={() => setView('carrito')}>
                        <i className="bi-cart-fill me-1"></i>
                        <span className="d-none d-sm-inline">Carrito</span>
                        <span className="badge bg-dark text-white ms-1 rounded-pill">{cartCount}</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;