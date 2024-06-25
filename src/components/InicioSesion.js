import React, { useState } from 'react';

const InicioSesion = ({ onLogin, onRegisterClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [cargando, setCargando] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const obtenerDetallesUsuario = async (username) => {
    try {
      const response = await fetch(
        `https://200.58.127.244:7001/users?username=${username}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          'Hubo un problema al obtener los detalles del usuario.'
        );
      }

      const data = await response.json();

      if (
        Array.isArray(data) &&
        data.length > 0 &&
        Array.isArray(data[0]) &&
        data[0].length >= 3
      ) {
        localStorage.setItem('tipoUsuario', data[0][3]);
        return {
          username: data[0][0],
          password: data[0][2],
        };
      } else {
        throw new Error('Formato de datos inesperado.');
      }
    } catch (error) {
      //console.error('Se produjo un error al obtener los detalles del usuario:', error);
      return null;
    }
  };

  const validate = () => {
    const errors = {};
    if (!username.trim()) {
      errors.username = 'Ingresa tu nombre de usuario.';
    }
    if (!password.trim()) {
      errors.password = 'Ingresa tu contraseña.';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setCargando(true);
      const user = await obtenerDetallesUsuario(username);
      setCargando(false);
      if (user && user.password === password) {
        onLogin();
      } else {
        setErrors({
          username: ' ',
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
              {cargando ? (
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                  </div>
                  <p>Verificando credenciales...</p>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        Nombre de usuario
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.username ? 'is-invalid' : ''
                        }`}
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                      />
                      {errors.username && (
                        <div className="invalid-feedback">
                          {errors.username}
                        </div>
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
                          <div className="invalid-feedback">
                            {errors.password}
                          </div>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InicioSesion;
