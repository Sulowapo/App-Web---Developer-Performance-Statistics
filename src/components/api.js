export const obtenerDetallesUsuario = async (username) => {
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
      throw new Error('Hubo un problema al obtener los detalles del usuario.');
    }

    const data = await response.json();

    if (
      Array.isArray(data) &&
      data.length > 0 &&
      Array.isArray(data[0]) &&
      data[0].length >= 3
    ) {
      localStorage.setItem('username', data[0][0]);
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

export const obtenerResponsables = (retries = 5) => {
  return fetch('https://200.58.127.244:7001/Project/responsables', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.status === 204 && retries > 0) {
        return obtenerResponsables(retries - 1);
      }
      if (!response.ok) {
        throw new Error('Hubo un problema al obtener los responsables.');
      }
      return response.json();
    })
    .catch((error) => {
      if (retries === 0) {
        throw error;
      }
      return null;
    });
};

export const obtenerProyectos = (responsable, retries = 5) => {
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
        return obtenerProyectos(responsable, retries - 1);
      }
      if (!response.ok) {
        throw new Error('Hubo un problema al obtener los proyectos.');
      }
      return response.json();
    })
    .catch((error) => {
      if (retries === 0) {
        throw error;
      }
      return null;
    });
};

export const registrarUsuario = async (values) => {
  try {
    const queryParams = new URLSearchParams({
      user: values.usuario,
      ip: 'sn',
      pass: values.password,
      usertype: values.userType,
      userlevel: values.userLevel,
      email: values.correo,
      nombre: values.nombre,
      proyecto: values.proyecto,
      responsable: values.responsable,
    }).toString();

    const url = `https://200.58.127.244:7001/users?${queryParams}`;

    const response = await fetch(url, { method: 'POST' });

    if (!response.ok) {
      throw new Error('Error al registrar usuario');
    }

    const result = await response.json();
    return result === true;
  } catch (error) {
    console.error('Error al registrar usuario', error);
    return false;
  }
};