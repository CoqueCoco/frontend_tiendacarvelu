import { useState, useEffect } from 'react'; 
import Navbar from './components/Navbar';
import Header from './components/Header';
import Productos from './components/Productos'; 
import Carrito from './components/Checkout'; 
import Login from './components/Login'; 
import Boleta from './components/Boleta';
import Nosotros from './components/Nosotros';
import Historial from './components/Historial';
import AdminPanel from './components/AdminPanel';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 

const INITIAL_PRODUCTS = [
    { id: 1, nombre: "Sobrecostilla", precio: 8990, precioAnterior: 10990, oferta: true, nuevo: false, img: "https://www.corralesdelsur.cl/cdn/shop/files/Sobrecostilla_ff459257-6c09-4c2f-8655-b1e2f3f15fc5.jpg?v=1732208326&width=1946" },
    { id: 2, nombre: "Lomo Vetado americano", precio: 16990, oferta: false, nuevo: true, img: "https://i0.wp.com/entreparrilleros.cl/wp-content/uploads/2021/09/lomovetadochice.png?fit=1080%2C1080&ssl=1" },
    { id: 3, nombre: "Huachalomo", precio: 9200, precioAnterior: 11490, oferta: true, nuevo: false, img: "https://agrocomercial.cl/wp-content/uploads/2022/06/Huachalomo-CATV.jpg" },
    { id: 4, nombre: "Entraña Americana", precio: 21500, oferta: false, nuevo: true, img: "https://thebeef.cl/wp-content/uploads/2024/12/9.png" }
];

function App() {
  const [productos, setProductos] = useState(() => {
    const saved = localStorage.getItem('carvelu_inventory');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('carveluCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [view, setView] = useState('tienda');
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem('carvelu_inventory', JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    localStorage.setItem('carveluCart', JSON.stringify(cart));
  }, [cart]);

  // CONTROL DE ACCESO: Aquí es donde validamos según la vista
  const handleViewChange = (newView) => {
    // 1. Si intenta ir al Carrito o Historial y NO está logueado
    if ((newView === 'carrito' || newView === 'historial') && !user) {
        alert("Para revisar tu carrito y finalizar la compra, por favor inicia sesión.");
        setView('login');
        return;
    }

    // 2. Si intenta ir al Admin y NO es admin
    if (newView === 'admin' && user?.role !== 'admin') {
        alert("Acceso denegado. Se requieren permisos de administrador.");
        setView('tienda');
        return;
    }

    setView(newView);
    setSearchTerm("");
    window.scrollTo(0, 0); 
  };

  // Añadir al carrito ahora es LIBRE
  const addToCart = (product) => {
    setCart(prev => {
      const existe = prev.find(item => item.id === product.id);
      if (existe) return prev.map(item => item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      return [...prev, { ...product, cantidad: 1 }];
    });
  };

  const productosFiltrados = productos.filter(p => {
    const coincide = p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    if (view === 'ofertas') return p.oferta && coincide;
    if (view === 'recien-llegados') return p.nuevo && coincide;
    return coincide;
  });

  return (
    <div className="d-flex flex-column min-vh-100"> 
      <Navbar 
        cartCount={cart.reduce((acc, i) => acc + i.cantidad, 0)} 
        setView={handleViewChange} 
        user={user} 
        onLogout={() => { setUser(null); localStorage.removeItem('user'); setView('tienda'); }} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />

      <main className="flex-grow-1">
        {(view === 'tienda' || view === 'ofertas' || view === 'recien-llegados') && (
          <>
            {view === 'tienda' && <Header />}
            <section className="py-5 container px-4">
                <h2 className="fw-bolder mb-4 text-center">Catálogo Carvelu</h2>
                <div className="row gx-4 gy-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {productosFiltrados.length > 0 ? (
                        productosFiltrados.map(prod => <Productos key={prod.id} data={prod} onAdd={addToCart} />)
                    ) : (
                        <div className="text-center py-5">
                            <i className="bi bi-search fs-1 text-muted"></i>
                            <p className="mt-3 text-muted">No encontramos ese corte.</p>
                        </div>
                    )}
                </div>
            </section>
          </>
        )}

        {view === 'nosotros' && <Nosotros setView={handleViewChange} />}
        {view === 'carrito' && <Carrito cart={cart} setCart={setCart} user={user} setView={handleViewChange} />}
        {view === 'login' && <Login setUser={(u) => { setUser(u); setView('tienda'); }} setView={handleViewChange} />}
        {view === 'boleta' && <Boleta cart={cart} user={user} setView={handleViewChange} setCart={setCart} />}
        {view === 'historial' && <Historial setView={handleViewChange} />}
        {view === 'admin' && <AdminPanel productos={productos} setProductos={setProductos} setView={handleViewChange} />}
      </main>

      <footer className="py-5 bg-dark mt-auto text-center text-white small">
        <p className="m-0">Copyright © Carvelu 2026</p>
      </footer>
    </div>
  );
}

export default App;