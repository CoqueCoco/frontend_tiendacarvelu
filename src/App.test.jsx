import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from './App';

describe('Pruebas de Flujo - Carvelu', () => {
  
  beforeEach(() => {
    window.localStorage.clear(); // Limpiamos sesión antes de cada test
  });

  it('debe permitir navegar y buscar productos sin estar logueado', () => {
    render(<App />);
    const input = screen.getByTestId('search-input');
    
    fireEvent.change(input, { target: { value: 'Sobrecostilla' } });
    
    // Verificamos que el producto aparezca en el catálogo
    expect(screen.getByText('Sobrecostilla')).toBeInTheDocument();
  });

  it('debe bloquear el acceso al carrito y mostrar el Login si no hay usuario', () => {
    render(<App />);
    
    // Al clickear el botón del carrito
    const btnCarrito = screen.getByTestId('cart-button');
    fireEvent.click(btnCarrito);
    
    // Tu componente Login muestra el título "Ingresar"
    const loginHeader = screen.getByText(/Ingresar/i);
    expect(loginHeader).toBeInTheDocument();
  });

  it('debe incrementar el contador del carrito al añadir productos', () => {
    render(<App />);
    
    // Tus botones dicen "Añadir al carro"
    const btnAñadir = screen.getAllByText(/Añadir al carro/i)[0];
    fireEvent.click(btnAñadir);
    
    // El contador de la Navbar (dentro del cart-button) debe decir 1
    const cartBtn = screen.getByTestId('cart-button');
    expect(cartBtn).toHaveTextContent('1');
  });

  it('debe filtrar los productos y ocultar los que no coinciden con la búsqueda', () => {
    render(<App />);
    const input = screen.getByTestId('search-input');
    
    // Buscamos algo específico: "Entraña"
    fireEvent.change(input, { target: { value: 'Entraña' } });
    
    // "Entraña Americana" debería estar visible
    expect(screen.getByText(/Entraña Americana/i)).toBeInTheDocument();
    
    // "Sobrecostilla" NO debería estar en el documento
    const sobrecostilla = screen.queryByText('Sobrecostilla');
    expect(sobrecostilla).not.toBeInTheDocument();
  });
});