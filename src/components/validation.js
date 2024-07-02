export const validateLogin = (username, password) => {
    const errors = {};
    if (!username.trim()) {
      errors.username = 'Ingresa tu nombre de usuario.';
    }
    if (!password.trim()) {
      errors.password = 'Ingresa tu contraseña.';
    }
    return errors;
  };

  export const validateRegistro = (values) => {
    const errors = {};
    if (!values.usuario.trim())
      errors.usuario = 'El nombre de usuario es obligatorio.';
    if (!values.nombre.trim()) errors.nombre = 'El nombre completo es obligatorio.';
    if (!values.userLevel) errors.userLevel = 'El nivel de experiencia es obligatorio.';
    if (values.userType !== '0') {
      if (!values.proyecto) errors.proyecto = 'El proyecto es obligatorio.';
      if (!values.responsable) errors.responsable = 'El responsable es obligatorio.';
    }
    if (!values.correo.trim()) errors.correo = 'El correo electrónico es obligatorio.';
    else if (!isValidEmail(values.correo)) errors.correo = 'Ingresa un correo electrónico válido.';
    if (!values.password.trim()) errors.password = 'La contraseña es obligatoria.';
    else if (values.password.length < 8) errors.password = 'La contraseña debe tener al menos 8 caracteres.';
    if (!values.confirmPassword.trim()) errors.confirmPassword = 'Confirma tu contraseña.';
    else if (values.password !== values.confirmPassword) {
      errors.password = ' ';
      errors.confirmPassword = 'Las contraseñas no coinciden.';
    }
    return errors;
  };
  
  export const isValidEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  };