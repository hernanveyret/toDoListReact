// exporta la funcion, esto es javascript, no es React
export const helpHttp = () => {
  const customFetch = (endpoint,options) => {
    const defaultHeader = { // acepta aplicaciones json
      accept:"application/json"
    } 
    const controller = new AbortController(); // se crea la constante por si la pagina no funciona asi no queda cargando;
    options.signal = controller.signal;

    options.method = options.method || "GET" // si el usuario no epecifico ningun metodo por defecto es GET
    options.headers = options.headers ? {...defaultHeader, ...options.headers} : defaultHeader
    options.body = JSON.stringify(options.body) || false;
    if(!options.body) delete options.body;

    console.log(options);
    setTimeout(() => controller.abort(),3000) // si no tengo respuesta aborta a los 3 segundos

    return fetch(endpoint,options) // la direccion y las opciones anteriores
      .then((res) => res.ok ? res.json() : Promise.reject({  // si esta ok crea el json sino crea un objeto de error
        err:true,
        status: res.status || "00",
        statusText: res.statusText || "Ocurrio un error"
      }))
      .catch((err) => err); // muestra si hay error
  }

  const get = (url, options = {}) => customFetch(url, options);
  const post = (url, options = {}) => {
    options.method = "POST";
      return customFetch(url, options)
  }

  const put = (url, options = {}) => {
    options.method = "PUT";
      return customFetch(url, options)
  }

  const del = (url, options = {}) => {
    options.method = "DELETE";
      return customFetch(url, options)
  }

  return {
    get,
    post,
    put,
    del,
  };
};