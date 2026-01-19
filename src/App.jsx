import { useState, useEffect } from 'react'; 
import Navbar from './components/Navbar';
import Header from './components/Header';
import Productos from './components/Productos'; 
import Carrito from './components/Checkout'; 
import Login from './components/Login'; 
import Boleta from './components/Boleta'; // <--- Importamos el nuevo componente
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; 

const PRODUCTOS_DATA = [
    { id: 1, nombre: "Sobrecostilla", precio: 8990, precioAnterior: 10990, oferta: true, img: "https://www.corralesdelsur.cl/cdn/shop/files/Sobrecostilla_ff459257-6c09-4c2f-8655-b1e2f3f15fc5.jpg?v=1732208326&width=1946" },
    { id: 2, nombre: "Lomo Vetado americano", precio: 16990, premium: true, img: "https://i0.wp.com/entreparrilleros.cl/wp-content/uploads/2021/09/lomovetadochice.png?fit=1080%2C1080&ssl=1" },
    { id: 3, nombre: "Huachalomo", precio: 9200, precioAnterior: 11490, oferta: true, img: "https://agrocomercial.cl/wp-content/uploads/2022/06/Huachalomo-CATV.jpg" },
    { id: 4, nombre: "Entraña Americana", precio: 21500, premium: true, img: "https://thebeef.cl/wp-content/uploads/2024/12/9.png" },
    { id: 5, nombre: "Asado Carnicero", precio: 8500, precioAnterior: 10500, oferta: true, img: "https://www.corralesdelsur.cl/cdn/shop/files/Asado_Carnicero.jpg?v=1732210501&width=1946" },
    { id: 6, nombre: "Lomo Liso americano", precio: 15990, premium: true, img: "https://jumbocl.vtexassets.com/arquivos/ids/318351-250-250/Lomo-Vetado-Prime-Americana-Brandt-Al-Vacio-kg.jpg?v=638776414123330000" },
    { id: 7, nombre: "Tapabarriga", precio: 9990, precioAnterior: 11990, oferta: true, img: "https://www.corralesdelsur.cl/cdn/shop/files/Tapabarriga_83c86cc2-42e0-4a05-8143-84fc34a3b7a0.jpg?v=1732210294&width=1946" },
    { id: 8, nombre: "Punta de Ganso", precio: 14200, img: "https://www.corralesdelsur.cl/cdn/shop/files/Punta_Ganso_e4d26761-7367-4cad-914b-9d64c88748f2.jpg?v=1732212154" }
];

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('carveluCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [view, setView] = useState('tienda');
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('carveluCart', JSON.stringify(cart));
  }, [cart]);

  const handleViewChange = (newView) => {
    // Protección: Para ir al carrito o ver la boleta DEBE estar logueado
    if ((newView === 'carrito' || newView === 'boleta') && !user) {
      alert("Para realizar esta acción, por favor inicia sesión.");
      setView('login');
      return;
    }
    setView(newView);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setView('tienda');
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="d-flex flex-column min-vh-100"> 
      <Navbar 
        cartCount={cart.length} 
        setView={handleViewChange} 
        user={user} 
        onLogout={handleLogout} 
      />
      
      <main className="flex-grow-1">
        {/* VISTA: TIENDA */}
        {view === 'tienda' && (
          <>
            <Header />
            <section className="py-5">
              <div className="container px-4 px-lg-5">
                <h2 className="fw-bolder mb-4 text-center">Nuestros Cortes Destacados</h2>
                <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                  {PRODUCTOS_DATA.map((prod) => (
                    <Productos key={prod.id} data={prod} onAdd={addToCart} />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* VISTA: CARRITO / CHECKOUT */}
        {view === 'carrito' && (
          <Carrito 
            cart={cart} 
            setCart={setCart} 
            user={user} 
            setView={handleViewChange} 
          />
        )}

        {/* VISTA: LOGIN / REGISTRO */}
        {view === 'login' && (
          <Login setUser={setUser} setView={handleViewChange} />
        )}

        {/* VISTA: BOLETA FINAL */}
        {view === 'boleta' && (
          <Boleta 
            cart={cart} 
            user={user} 
            setView={handleViewChange} 
            setCart={setCart} 
          />
        )}
      </main>

      <footer className="py-5 bg-dark w-100 mt-auto">
        <div className="container text-center text-white small">
          <p className="m-0">Copyright &copy; Carvelu 2026 - Expertos en Carnes</p>
        </div>
      </footer>
    </div>
  );
}

export default App;