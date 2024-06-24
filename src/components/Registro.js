import React, { useState } from 'react';

const Registro = ({ onBackToLogin }) => {
  const [usuario, setUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleUsernameChange = (e) => {
    setUsuario(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setNombre(e.target.value);
  };

  const handleEmailChange = (e) => {
    setCorreo(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validate = () => {
    const errors = {};
    if (!usuario.trim())
      errors.usuario = 'El nombre de usuario es obligatorio.';
    if (!nombre.trim()) errors.nombre = 'El nombre del IS obligatorio.';
    if (!correo.trim()) {
      errors.correo = 'El correo electrónico es obligatorio.';
    } else if (!isValidEmail(correo)) {
      errors.correo = 'Ingresa un correo electrónico válido.';
    }
    if (!password.trim()) errors.password = 'La contraseña es obligatoria.';
    if (!confirmPassword.trim()) {
      errors.confirmPassword = 'Confirma tu contraseña.';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden.';
    }
    return errors;
  };

  const isValidEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const queryParams = new URLSearchParams({
        user: usuario,
        ip: 'sn',
        pass: password,
        usertype: '1',
        userlevel: '3',
        email: correo,
        nombre: nombre,
        proyecto: 'sn',
        responsable: 'sn',
      }).toString();

      const url = `https://200.58.127.244:7001/users?${queryParams}`;

      try {
        const response = await fetch(url, {
          method: 'POST',
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Registration successful', data);
          // Optionally, navigate to login or perform other actions
          onBackToLogin();
        } else {
          console.log('Registration failed', response.statusText);
        }
      } catch (error) {
        console.error('Error during registration', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <h2 className="text-center mb-4 mt-5">Registro</h2>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="usuario" className="form-label">
                    Usuario
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.usuario ? 'is-invalid' : ''
                    }`}
                    id="usuario"
                    value={usuario}
                    onChange={handleUsernameChange}
                  />
                  {errors.usuario && (
                    <div className="invalid-feedback">{errors.usuario}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.nombre ? 'is-invalid' : ''
                    }`}
                    id="nombre"
                    value={nombre}
                    onChange={handleUserNameChange}
                  />
                  {errors.nombre && (
                    <div className="invalid-feedback">{errors.nombre}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="correo" className="form-label">
                    Correo Electrónico
                  </label>
                  <input
                    type="correo"
                    className={`form-control ${
                      errors.correo ? 'is-invalid' : ''
                    }`}
                    id="correo"
                    value={correo}
                    onChange={handleEmailChange}
                  />
                  {errors.correo && (
                    <div className="invalid-feedback">{errors.correo}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? 'is-invalid' : ''
                    }`}
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.confirmPassword ? 'is-invalid' : ''
                    }`}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary col-md-12">
                  Registrarse
                </button>
              </form>
              <div className="mt-3">
                <p>
                  ¿Ya tienes una cuenta?{' '}
                  <button className="btn btn-link p-0" onClick={onBackToLogin}>
                    Volver al inicio de sesión
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
