import React, { useState, useEffect } from 'react';

const Registro = ({ onBackToLogin }) => {
  const [usuario, setUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [userLevel, setUserLevel] = useState('');
  const [proyecto, setProyecto] = useState('');
  const [userType, setUserType] = useState('');
  const [responsable, setResponsable] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [disableResponsable, setDisableResponsable] = useState(true);
  const [disableProyecto, setDisableProyecto] = useState(true);
  const [responsables, setResponsables] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [loadingResponsables, setLoadingResponsables] = useState(true);
  const [loadingProyectos, setLoadingProyectos] = useState(false);

  useEffect(() => {
    const fetchResponsables = () => {
      obtenerResponsables().then((data) => {
        if (data) {
          setResponsables(data);
          setLoadingResponsables(false);
        }
      });
    };

    fetchResponsables();
  });

  const updateProyectos = (responsable) => {
    setLoadingProyectos(true);
    obtenerProyectos(responsable).then((data) => {
      if (data) {
        setProyectos(data);
        setLoadingProyectos(false);
      }
    });
  };

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

  const handleUserLevelChange = (e) => {
    setUserLevel(e.target.value);
  };

  const handleProyectoChange = (e) => {
    setProyecto(e.target.value);
  };

  const handleUserTypeChange = (e) => {
    const selectedUserType = e.target.value;
    setUserType(selectedUserType);

    if (selectedUserType === '1') {
      setDisableResponsable(false);
    } else {
      setResponsable('');
      setProyecto('');
      setDisableProyecto(true);
      setDisableResponsable(true);
    }
  };

  const handleResponsableChange = (e) => {
    const responsable = e.target.value;
    if (responsable !== '') {
      setResponsable(responsable);
      updateProyectos(responsable);
      setDisableProyecto(false);
    } else {
      setResponsable('');
      setProyectos([]);
      setDisableProyecto(true);
    }
  };

  const obtenerResponsables = (retries = 5) => {
    return fetch('https://200.58.127.244:7001/Project/responsables', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 204 && retries > 0) {
          console.log(
            `Status 204 received, retrying... (${retries} retries left)`
          );
          return obtenerResponsables(retries - 1);
        }
        if (!response.ok) {
          throw new Error('Hubo un problema al obtener los responsables.');
        }
        return response.json();
      })
      .catch((error) => {
        console.error(
          'Se produjo un error al obtener los responsables:',
          error
        );
        return null;
      });
  };

  const obtenerProyectos = (responsable, retries = 5) => {
    return fetch(
      `https://200.58.127.244:7001/Project/proyectos?responsable=${responsable}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        if (response.status === 204 && retries > 0) {
          console.log(
            `Status 204 received, retrying... (${retries} retries left)`
          );
          return obtenerProyectos(responsable, retries - 1);
        }
        if (!response.ok) {
          throw new Error('Hubo un problema al obtener los proyectos.');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Se produjo un error al obtener los proyectos:', error);
        return null;
      });
  };

  const validate = () => {
    const errors = {};
    if (!usuario.trim())
      errors.usuario = 'El nombre de usuario es obligatorio.';
    if (!nombre.trim()) errors.nombre = 'El nombre completo es obligatorio.';
    if (!userLevel) {
      errors.userLevel = 'El nivel de experiencia es obligatorio.';
    }
    if (!proyecto) {
      errors.proyecto = 'El proyecto es obligatorio.';
    }
    if (!userType) {
      errors.userType = 'El tipo de usuario es obligatorio.';
    }
    if (!responsable) {
      errors.responsable = 'El responsable es obligatorio.';
    }
    if (!correo.trim()) {
      errors.correo = 'El correo electrónico es obligatorio.';
    } else if (!isValidEmail(correo)) {
      errors.correo = 'Ingresa un correo electrónico válido.';
    }
    if (!password.trim()) {
      errors.password = 'La contraseña es obligatoria.';
    } else if (password.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres.';
    }
    if (!confirmPassword.trim()) {
      errors.confirmPassword = 'Confirma tu contraseña.';
    } else if (password !== confirmPassword) {
      errors.password = ' ';
      errors.confirmPassword = 'Las contraseñas no coinciden.';
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
      const queryParams = new URLSearchParams({
        user: usuario,
        ip: 'sn',
        pass: password,
        usertype: userType,
        userlevel: userLevel,
        email: correo,
        nombre: nombre,
        proyecto: proyecto,
        responsable: responsable,
      }).toString();

      const url = `https://200.58.127.244:7001/users?${queryParams}`;

      fetch(url, {
        method: 'POST',
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.log('Registration failed', response.statusText);
          }
        })
        .then((data) => {
          if (data) {
            console.log('Registration successful', data);
            setRegistrationSuccess(true);
            setTimeout(onBackToLogin, 3000);
          }
        })
        .catch((error) => {
          console.error('Error during registration', error);
        });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container position-relative">
      {(loadingResponsables || loadingProyectos) && (
        <div className="overlay d-flex justify-content-center align-items-center">
          <div className="spinner-border spinner-border-md" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="row justify-content-center">
        <div className="col-md-5">
          <h2 className="text-center mb-4 mt-5">Registro</h2>
          <div className="card">
            <div className="card-body">
              {registrationSuccess ? (
                <div className="alert alert-success" role="alert">
                  Registro exitoso. Redirigiendo al inicio de sesión...
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="usuario" className="form-label">
                        Usuario<span className="text-danger">*</span>
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
                        Nombre completo<span className="text-danger">*</span>
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
                    <div className="mb-3 row">
                      <div className="col-md-6">
                        <label htmlFor="userType" className="form-label">
                          Tipo de usuario<span className="text-danger">*</span>
                        </label>
                        <select
                          className={`form-select ${
                            errors.userType ? 'is-invalid' : ''
                          }`}
                          id="userType"
                          value={userType}
                          onChange={handleUserTypeChange}
                        >
                          <option value="">
                            Seleccione su tipo de usuario
                          </option>
                          <option value="0">Administrador</option>
                          <option value="1">Desarrollador</option>
                        </select>
                        {errors.userType && (
                          <div className="invalid-feedback">
                            {errors.userType}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="responsable" className="form-label">
                          Responsable<span className="text-danger">*</span>
                        </label>
                        <select
                          className={`form-select ${
                            errors.responsable ? 'is-invalid' : ''
                          }`}
                          id="responsable"
                          value={responsable}
                          onChange={handleResponsableChange}
                          disabled={disableResponsable}
                        >
                          <option value="">Seleccione su responsable</option>
                          {responsables.map((responsable, index) => (
                            <option key={index} value={responsable}>
                              {responsable}
                            </option>
                          ))}
                        </select>
                        {errors.responsable && (
                          <div className="invalid-feedback">
                            {errors.responsable}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="userLevel" className="form-label">
                            Nivel de experiencia
                            <span className="text-danger">*</span>
                          </label>
                          <select
                            className={`form-select ${
                              errors.userLevel ? 'is-invalid' : ''
                            }`}
                            id="userLevel"
                            value={userLevel}
                            onChange={handleUserLevelChange}
                          >
                            <option value="">
                              Seleccione su nivel de experiencia
                            </option>
                            <option value="0">Practicante</option>
                            <option value="1">Junior</option>
                            <option value="2">Semi Senior</option>
                            <option value="3">Senior</option>
                          </select>
                          {errors.userLevel && (
                            <div className="invalid-feedback">
                              {errors.userLevel}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="proyecto" className="form-label">
                            Proyecto
                            <span className="text-danger">*</span>
                          </label>
                          <select
                            className={`form-select ${
                              errors.proyecto ? 'is-invalid' : ''
                            }`}
                            id="proyecto"
                            value={proyecto}
                            onChange={handleProyectoChange}
                            disabled={disableProyecto}
                          >
                            <option value="">Seleccione su proyecto</option>
                            {proyectos.map((proyecto, index) => (
                              <option key={index} value={proyecto}>
                                {proyecto}
                              </option>
                            ))}
                          </select>
                          {errors.proyecto && (
                            <div className="invalid-feedback">
                              {errors.proyecto}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="correo" className="form-label">
                        Correo electrónico<span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
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
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="password" className="form-label">
                          Contraseña<span className="text-danger">*</span>
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
                          <div className="invalid-feedback">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="confirmPassword" className="form-label">
                          Confirmar contraseña
                          <span className="text-danger">*</span>
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
                    </div>

                    <button type="submit" className="btn btn-primary col-md-12">
                      Registrarse
                    </button>
                  </form>
                  <div className="mt-4">
                    <p>
                      ¿Ya tienes una cuenta?{' '}
                      <button
                        className="btn btn-link p-0"
                        onClick={onBackToLogin}
                      >
                        Volver al inicio de sesión
                      </button>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.7);
          z-index: 9999;
        }
      `}</style>
    </div>
  );
};

export default Registro;
