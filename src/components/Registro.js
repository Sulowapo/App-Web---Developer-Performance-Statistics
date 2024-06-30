import React, { useState, useEffect } from 'react';
import TextField from './TextField';
import SelectField from './SelectField';
import { obtenerResponsables, obtenerProyectos, registrarUsuario } from './api';
import { validateRegistro } from './validation';

const Registro = ({ onBackToLogin }) => {
  const [values, setValues] = useState({
    usuario: '',
    nombre: '',
    userLevel: '',
    proyecto: '',
    userType: '',
    responsable: '',
    correo: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [disableResponsable, setDisableResponsable] = useState(true);
  const [disableProyecto, setDisableProyecto] = useState(true);
  const [responsables, setResponsables] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState({
    responsables: true,
    proyectos: false,
    registration: false,
  });
  const [registrationError, setRegistrationError] = useState(false);

  useEffect(() => {
    obtenerResponsables()
      .then((data) => {
        if (data) {
          setResponsables(data);
          setLoading((prev) => ({ ...prev, responsables: false }));
        }
      })
      .catch((error) => {
        setRegistrationError(true);
        setTimeout(onBackToLogin, 3000);
      });
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues((prev) => ({ ...prev, [id]: value }));

    if (id === 'userType') {
      if (value === '1') {
        setDisableResponsable(false);
      } else {
        setValues((prev) => ({ ...prev, responsable: '', proyecto: '' }));
        setDisableProyecto(true);
        setDisableResponsable(true);
      }
    }

    if (id === 'responsable') {
      if (value !== '') {
        setLoading((prev) => ({ ...prev, proyectos: true }));
        obtenerProyectos(value)
          .then((data) => {
            if (data) {
              setProyectos(data);
              setLoading((prev) => ({ ...prev, proyectos: false }));
              setDisableProyecto(false);
            }
          })
          .catch((error) => {
            setRegistrationError(true);
            setTimeout(onBackToLogin, 3000);
          });
      } else {
        setValues((prev) => ({ ...prev, proyecto: '' }));
        setProyectos([]);
        setDisableProyecto(true);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateRegistro(values);
  
    if (Object.keys(validationErrors).length === 0) {
      setLoading((prev) => ({ ...prev, registration: true }));
      
      const success = await registrarUsuario(values);
  
      setLoading((prev) => ({ ...prev, registration: false }));
  
      if (success) {
        setRegistrationSuccess(true);
        setTimeout(onBackToLogin, 3000);
      } else {
        setErrors({ registration: 'Error al registrar usuario' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container position-relative">
      {(loading.responsables || loading.proyectos || loading.registration) && (
        <div className="overlay d-flex justify-content-center align-items-center">
          <div className="spinner-border spinner-border-md" role="status" />
          <span className="visually-hidden">Loading...</span>
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
              ) : registrationError ? (
                <div className="alert alert-danger" role="alert">
                  Hubo un error. Inténtelo más tarde. Redirigiendo al inicio de
                  sesión...
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      id="usuario"
                      label="Usuario"
                      value={values.usuario}
                      onChange={handleChange}
                      error={errors.usuario}
                    />
                    <TextField
                      id="nombre"
                      label="Nombre Completo"
                      value={values.nombre}
                      onChange={handleChange}
                      error={errors.nombre}
                    />
                    <SelectField
                      id="userLevel"
                      label="Nivel de Usuario"
                      value={values.userLevel}
                      onChange={handleChange}
                      options={[
                        'Practicante',
                        'Junior',
                        'Semi Senior',
                        'Senior',
                      ]}
                      error={errors.userLevel}
                    />
                    <SelectField
                      id="userType"
                      label="Tipo de Usuario"
                      value={values.userType}
                      onChange={handleChange}
                      options={['Administrador', 'Desarrollador']}
                      error={errors.userType}
                    />
                    <SelectField
                      id="responsable"
                      label="Responsable"
                      value={values.responsable}
                      onChange={handleChange}
                      options={responsables}
                      error={errors.responsable}
                      disabled={disableResponsable}
                    />
                    <SelectField
                      id="proyecto"
                      label="Proyecto"
                      value={values.proyecto}
                      onChange={handleChange}
                      options={proyectos}
                      error={errors.proyecto}
                      disabled={disableProyecto}
                    />
                    <TextField
                      id="correo"
                      label="Correo Electrónico"
                      value={values.correo}
                      onChange={handleChange}
                      error={errors.correo}
                    />
                    <TextField
                      id="password"
                      label="Contraseña"
                      value={values.password}
                      onChange={handleChange}
                      error={errors.password}
                      type="password"
                    />
                    <TextField
                      id="confirmPassword"
                      label="Confirmar Contraseña"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      error={errors.confirmPassword}
                      type="password"
                    />
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
