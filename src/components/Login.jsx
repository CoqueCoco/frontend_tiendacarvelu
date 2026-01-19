import React, { useState } from 'react';

const Login = ({ setUser, setView }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    
    const [errores, setErrores] = useState({
        nombre: false,
        email: false,
        pass: false,
        emailFormato: false,
        loginFallido: false
    });

    const validarEmail = (correo) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(correo);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const nuevosErrores = {
            nombre: isRegistering && !nombre.trim(),
            pass: pass.length < 4,
            email: !email.trim(),
            emailFormato: email.trim() !== "" && !validarEmail(email),
            loginFallido: false
        };

        if (nuevosErrores.nombre || nuevosErrores.pass || nuevosErrores.email || nuevosErrores.emailFormato) {
            setErrores(nuevosErrores);
            return;
        }

        const usuariosExistentes = JSON.parse(localStorage.getItem('usuariosCarvelu')) || [];

        if (isRegistering) {
            // No permitir dos cuentas con el mismo correo
            if (usuariosExistentes.find(u => u.email.toLowerCase() === email.toLowerCase())) {
                alert("Este correo ya está registrado. Intenta iniciar sesión.");
                return;
            }

            const nuevoUsuario = { nombre, email, pass };
            usuariosExistentes.push(nuevoUsuario);
            localStorage.setItem('usuariosCarvelu', JSON.stringify(usuariosExistentes));
            
            alert("¡Cuenta creada! Ahora puedes entrar con tu correo.");
            setIsRegistering(false);
            setPass("");
            setErrores({ nombre: false, email: false, pass: false, emailFormato: false, loginFallido: false });
        } else {
            // LOGIN: Buscamos por EMAIL y CONTRASEÑA
            const usuarioEncontrado = usuariosExistentes.find(
                u => u.email.toLowerCase() === email.toLowerCase() && u.pass === pass
            );

            if (usuarioEncontrado) {
                const sessionUser = { name: usuarioEncontrado.nombre, email: usuarioEncontrado.email };
                localStorage.setItem('user', JSON.stringify(sessionUser));
                setUser(sessionUser);
                setView('tienda');
            } else {
                setErrores({...nuevosErrores, loginFallido: true});
            }
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-5 col-lg-4">
                    <div className="card shadow-lg border-0 p-4">
                        <div className="text-center mb-4">
                            <i className="bi bi-person-circle text-dark" style={{ fontSize: '3rem' }}></i>
                            <h3 className="fw-bold mt-2">{isRegistering ? 'Crear Cuenta' : 'Ingresar'}</h3>
                        </div>

                        {errores.loginFallido && (
                            <div className="alert alert-danger py-2 small text-center" role="alert">
                                Correo o contraseña incorrectos.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} noValidate>
                            {isRegistering && (
                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Nombre Completo</label>
                                    <input 
                                        type="text" 
                                        className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        placeholder="Ej: Juan Pérez"
                                    />
                                    <div className="invalid-feedback">El nombre es necesario.</div>
                                </div>
                            )}

                            <div className="mb-3">
                                <label className="form-label small fw-bold">Correo Electrónico</label>
                                <input 
                                    type="email" 
                                    className={`form-control ${errores.email || errores.emailFormato || errores.loginFallido ? 'is-invalid' : ''}`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="correo@ejemplo.com"
                                />
                                <div className="invalid-feedback">
                                    {errores.emailFormato ? 'Formato inválido (Ej: correo@ejemplo.com)' : 'Correo requerido'}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label small fw-bold">Contraseña</label>
                                <input 
                                    type="password" 
                                    className={`form-control ${errores.pass || errores.loginFallido ? 'is-invalid' : ''}`}
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                    placeholder="••••••••"
                                />
                                <div className="invalid-feedback">Mínimo 4 caracteres.</div>
                            </div>

                            <button type="submit" className="btn btn-dark w-100 fw-bold py-2 mb-3">
                                {isRegistering ? 'Registrarse' : 'Entrar'}
                            </button>

                            <div className="text-center">
                                <button 
                                    type="button" 
                                    className="btn btn-link btn-sm text-decoration-none text-muted"
                                    onClick={() => {
                                        setIsRegistering(!isRegistering);
                                        setErrores({ nombre: false, email: false, pass: false, emailFormato: false, loginFallido: false });
                                    }}
                                >
                                    {isRegistering ? '¿Ya tienes cuenta? Login' : '¿No tienes cuenta? Registro'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;