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

function App() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('carveluCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [historialGlobal, setHistorialGlobal] = useState(() => {
    const saved = localStorage.getItem('carvelu_historial');
    return saved ? JSON.parse(saved) : [];
  });

  const [view, setView] = useState('tienda');
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState([]);

  // --- IP DE TU EC2 ACTUALIZADA ---
  const API_URL = "http://34.238.207.193:8080/api/productos";

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error en la respuesta del servidor");
      const data = await response.json();
      
      // Sincronización: El backend envía 'img', React lo recibe como tal
      setProductos(data);
    } catch (error) {
      console.error("Error al conectar con el Backend:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleSaveProduct = async (nuevoProducto) => {
    try {
      // El objeto 'nuevoProducto' ya viene con la llave 'img' desde AdminPanel
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto)
      });
      if (response.ok) {
        fetchProductos(); 
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error al guardar producto:", error);
      return false;
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchProductos(); 
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem('carveluCart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('carvelu_historial', JSON.stringify(historialGlobal));
  }, [historialGlobal]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const showNotification = (nombre) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, nombre }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handleViewChange = (newView) => {
    if ((newView === 'carrito' || newView === 'historial') && !user) {
        alert("Inicia sesión para acceder a esta sección.");
        setView('login');
        return;
    }
    if (newView === 'admin' && user?.role !== 'admin') {
        alert("Acceso denegado. Se requiere cuenta de administrador.");
        setView('tienda');
        return;
    }
    setView(newView);
    setSearchTerm("");
    window.scrollTo(0, 0); 
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existe = prev.find(item => item.id === product.id);
      if (existe) return prev.map(item => item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      return [...prev, { ...product, cantidad: 1 }];
    });
    showNotification(product.nombre);
  };

  const productosFiltrados = productos.filter(p => {
    const coincide = p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    if (view === 'ofertas') return p.oferta && coincide;
    if (view === 'recien-llegados') return p.nuevo && coincide;
    return coincide;
  });

  const misPedidos = historialGlobal.filter(pedido => pedido.userEmail === user?.email);

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

      <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 2000 }}>
        {notifications.map((n) => (
          <div key={n.id} className="toast show align-items-center text-white bg-success border-0 mb-2 shadow-lg" role="alert">
            <div className="d-flex">
              <div className="toast-body">
                <i className="bi bi-cart-check-fill me-2"></i>
                ¡{n.nombre} añadido al carro!
              </div>
              <button 
                type="button" 
                className="btn-close btn-close-white me-2 m-auto" 
                onClick={() => setNotifications(prev => prev.filter(notif => notif.id !== n.id))}
              ></button>
            </div>
          </div>
        ))}
      </div>

      <main className="flex-grow-1">
        {loading ? (
          <div className="text-center py-5 mt-5">
            <div className="spinner-border text-danger" role="status"></div>
            <p className="mt-3">Cargando los mejores cortes de Carvelu...</p>
          </div>
        ) : (
          <>
            {(view === 'tienda' || view === 'ofertas' || view === 'recien-llegados') && (
              <>
                <Header 
                  titulo={view === 'ofertas' ? "Ofertas Imperdibles" : view === 'recien-llegados' ? "Recién Llegados" : "Carvelu"}
                  subtitulo={view === 'ofertas' ? "Los mejores precios" : view === 'recien-llegados' ? "Nuevos productos" : "Cortes Premium"}
                />
                <section className="py-5 container px-4">
                    <h2 className="fw-bolder mb-4 text-center">
                      {view === 'ofertas' ? "Nuestras Ofertas" : view === 'recien-llegados' ? "Novedades" : "Catálogo Carvelu"}
                    </h2>
                    <div className="row gx-4 gy-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {productosFiltrados.length > 0 ? (
                            productosFiltrados.map(prod => <Productos key={prod.id} data={prod} onAdd={addToCart} />)
                        ) : (
                            <div className="text-center py-5">
                                <i className="bi bi-search fs-1 text-muted"></i>
                                <p className="mt-3 text-muted">No encontramos resultados.</p>
                            </div>
                        )}
                    </div>
                </section>
              </>
            )}

            {view === 'nosotros' && <Nosotros setView={handleViewChange} />}
            {view === 'carrito' && <Carrito cart={cart} setCart={setCart} user={user} setView={handleViewChange} />}
            {view === 'login' && <Login setUser={(u) => { setUser(u); setView('tienda'); }} setView={handleViewChange} />}
            
            {view === 'boleta' && (
                <Boleta 
                    cart={cart} user={user} setView={handleViewChange} setCart={setCart} 
                    onSaveOrder={(nuevoPedido) => {
                        const pedidoConDuenio = { ...nuevoPedido, userEmail: user.email };
                        setHistorialGlobal([...historialGlobal, pedidoConDuenio]);
                    }}
                />
            )}

            {view === 'historial' && <Historial pedidos={misPedidos} setView={handleViewChange} />}
            {view === 'admin' && (
                <AdminPanel 
                    productos={productos} 
                    onSave={handleSaveProduct} 
                    onDelete={handleDeleteProduct}
                    setView={handleViewChange} 
                />
            )}
          </>
        )}
      </main>

      <footer className="py-5 bg-dark mt-auto text-center text-white small">
        <p className="m-0">Copyright © Carvelu 2026</p>
      </footer>
    </div>
  );
}

export default App;