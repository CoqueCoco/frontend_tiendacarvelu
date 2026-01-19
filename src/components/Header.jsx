import React from 'react';

const Header = () => {
    return (
        <header className="bg-dark py-5" style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1551028150-64b9f398f678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1300&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <div className="container px-4 px-lg-5 my-5">
                <div className="text-center text-white">
                    <h1 className="display-4 fw-bolder">Carvelu</h1>
                    <p className="lead fw-normal text-white-50 mb-0">Cortes Premium & Tradición Familiar</p>
                </div>
            </div>
        </header>
    );
};

export default Header;