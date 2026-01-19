import React from 'react';

const Nosotros = ({ setView }) => {
    return (
        <div className="nosotros-page">
            {/* Header / Hero Section */}
            <header className="bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">Nuestra Historia</h1>
                        <p className="lead fw-normal text-white-50 mb-0">Tradición familiar en el corazón de Los Pinos</p>
                    </div>
                </div>
            </header>

            {/* Historia Section */}
            <section className="py-5">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6">
                            <img 
                                className="img-fluid rounded mb-4 mb-lg-0 shadow" 
                                src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=1000" 
                                alt="Carnicería tradicional" 
                            />
                        </div>
                        <div className="col-md-6">
                            <h2 className="fw-bolder">Desde Quilpué para su mesa</h2>
                            <p>Carvelu nació hace más de 15 años como un pequeño sueño familiar en el sector de <strong>Los Pinos</strong>. Lo que comenzó como un modesto local en una esquina del barrio, se ha transformado en el punto de encuentro para todos los vecinos que buscan calidad y un corte personalizado.</p>
                            <p>Nos enorgullece decir que seleccionamos personalmente cada pieza, trabajando con proveedores locales para asegurar que a su parrilla solo llegue lo mejor de nuestra zona.</p>
                            <div className="bg-light p-3 border-start border-4 border-primary shadow-sm">
                                <p className="fst-italic mb-0 text-muted">"No solo vendemos carne, entregamos el ingrediente principal de sus reuniones familiares."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Características Section */}
            <section className="py-5 bg-light border-top">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5">
                        <div className="col-md-4 mb-5 text-center">
                            <div className="feature bg-primary bg-gradient text-white rounded-circle mb-3 d-inline-flex align-items-center justify-content-center shadow" style={{ width: '4rem', height: '4rem' }}>
                                <i className="bi bi-patch-check-fill fs-2"></i>
                            </div>
                            <h2 className="h4 fw-bolder">Calidad Premium</h2>
                            <p className="text-muted">Seleccionamos rigurosamente cada corte para asegurar la mejor experiencia en su mesa.</p>
                        </div>
                        <div className="col-md-4 mb-5 text-center">
                            <div className="feature bg-primary bg-gradient text-white rounded-circle mb-3 d-inline-flex align-items-center justify-content-center shadow" style={{ width: '4rem', height: '4rem' }}>
                                <i className="bi bi-geo-alt-fill fs-2"></i>
                            </div>
                            <h2 className="h4 fw-bolder">Identidad Local</h2>
                            <p className="text-muted">Orgullosamente situados en Los Pinos, Quilpué, atendiendo a nuestros vecinos por años.</p>
                        </div>
                        <div className="col-md-4 mb-5 text-center">
                            <div className="feature bg-primary bg-gradient text-white rounded-circle mb-3 d-inline-flex align-items-center justify-content-center shadow" style={{ width: '4rem', height: '4rem' }}>
                                <i className="bi bi-people-fill fs-2"></i>
                            </div>
                            <h2 className="h4 fw-bolder">Atención Familiar</h2>
                            <p className="text-muted">Le asesoramos con el corte justo y los mejores tips para su parrilla o cocina.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mapa Section */}
            <section className="py-5">
                <div className="container px-4 px-lg-5">
                    <div className="text-center mb-5">
                        <h2 className="fw-bolder">Encuéntranos en Los Pinos</h2>
                        <p className="lead">Visítanos en el corazón de Quilpué</p>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="ratio ratio-21x9 shadow rounded overflow-hidden border">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3345.228104523177!2d-71.4087856!3d-33.0505199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689df96d5958057%3A0xc6c7619f72740922!2sLos%20Pinos%2C%20Quilpu%C3%A9%2C%20Valpara%C3%ADso!5e0!3m2!1ses!2scl!4v1700000000000!5m2!1ses!2scl" 
                                    style={{ border: 0 }} 
                                    allowFullScreen="" 
                                    loading="lazy"
                                    title="Ubicación Carvelu"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Aside */}
            <aside className="py-5 bg-primary bg-gradient shadow-lg">
                <div className="container px-4 px-lg-5">
                    <div className="d-flex align-items-center justify-content-between flex-column flex-xl-row text-center text-xl-start">
                        <div className="mb-4 mb-xl-0">
                            <div className="fs-3 fw-bold text-white">¿Buscas el corte perfecto?</div>
                            <div className="text-white-50 lead">Explora nuestro catálogo de productos frescos de hoy.</div>
                        </div>
                        <div className="ms-xl-4">
                            <button className="btn btn-outline-light btn-lg px-4 fw-bold" onClick={() => setView('tienda')}>
                                Ver Productos
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default Nosotros;