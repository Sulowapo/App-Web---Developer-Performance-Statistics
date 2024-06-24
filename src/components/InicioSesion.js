import React, { useState, useEffect } from 'react';

const InicioSesion = ({ onLogin, onRegisterClick }) => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [desarrolladores, setDesarrolladores] = useState([]);
  const [detallesUsuarios, setDetallesUsuarios] = useState([]);

  useEffect(() => {
    obtenerDesarrolladores();
  }, []);

  const handleEmailChange = (e) => {
    setCorreo(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const obtenerDesarrolladores = () => {
    fetch('https://200.58.127.244:7001/users/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Hubo un problema al obtener los datos.');
        }
        return response.json();
      })
      .then((data) => {
        setDesarrolladores(data);
        console.log('Datos obtenidos:', data);
        obtenerDetallesUsuarios(data);
      })
      .catch((error) => {
        console.error('Se produjo un error:', error);
      });
  };

  const obtenerDetallesUsuarios = (users) => {
    const userDetailsPromises = users.map((username) => {
      return fetch(`https://200.58.127.244:7001/users?username=${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              'Hubo un problema al obtener los detalles del usuario.'
            );
          }
          return response.json();
        })
        .then((data) => {
          return {
            username,
            correo: data[0][5],
            password: data[0][2],
          };
        });
    });

    Promise.all(userDetailsPromises)
      .then((details) => {
        setDetallesUsuarios(details);
        console.log('Detalles de usuarios obtenidos:', details);
      })
      .catch((error) => {
        console.error(
          'Se produjo un error al obtener los detalles de los usuarios:',
          error
        );
      });
  };

  const validate = () => {
    const errors = {};
    if (!correo.trim()) {
      errors.correo = 'Ingresa tu dirección de correo electrónico.';
    } else if (!isValidEmail(correo)) {
      errors.correo = 'Ingresa una dirección de correo electrónico válida.';
    }
    if (!password.trim()) {
      errors.password = 'Ingresa tu contraseña.';
    }
    return errors;
  };

  const isValidEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const user = detallesUsuarios.find(
        (user) => user.correo === correo && user.password === password
      );
      if (user) {
        onLogin();
      } else {
        setErrors({
          correo: ' ',
          password: 'Credenciales inválidas. Por favor inténtalo de nuevo.',
        });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegisterClick = () => {
    onRegisterClick();
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <h2 className="text-center mb-4 mt-5">Inicio de sesión</h2>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="correo" className="form-label">
                    Dirección de correo electrónico
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
                  <div className="input-group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={`form-control ${
                        errors.password ? 'is-invalid' : ''
                      }`}
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={handleTogglePasswordVisibility}
                    >
                      {showPassword ? 'Ocultar' : 'Mostrar'}
                    </button>
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary col-md-12">
                  Iniciar sesión
                </button>
              </form>
              <div className="mt-3">
                <p>
                  ¿No tienes una cuenta?{' '}
                  <button
                    className="btn btn-link p-0"
                    onClick={handleRegisterClick}
                  >
                    Regístrate aquí
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

export default InicioSesion;
