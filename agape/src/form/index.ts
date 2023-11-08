import _ from "lodash";
import { parseData } from "./parse";

// Función para transformar FormData en un objeto usando lodash

// La función reduce de lodash, así como la versión estándar de JavaScript,
// puede trabajar con objetos que tienen propiedades de tipo array.
// Es un proceso en el que tomas un objeto de "entradas" y luego usas reduce
//  para transformar estas entradas en un nuevo objeto.

// La función _.set de lodash te permite cambiar el valor de una propiedad de
// un objeto dada una ruta de acceso a esa propiedad (que puede ser una cadena
// de texto que denote un camino a través de objetos y arrays).

// El fragmento de código que proporcionaste funciona de la siguiente manera:

// Hay un objeto o array entries que contiene pares de clave-valor, donde la clave es un "path" (ruta)
// y el valor es el valor que quieres asignar a esa ruta.
// Usas reduce para acumular un resultado en un objeto nuevo (inicializado como {}).
// En cada iteración del reduce, usas lodash.set(acc, path, value) para establecer el valor en la ruta
// especificada dentro del objeto acumulador (acc).
// Devuelves el acumulador para que sea utilizado en la siguiente iteración.
// El resultado final de reduce es un objeto que ha sido poblado con todas las rutas y valores de las entradas.

export function formDataToObject<T extends {}>(formData: FormData): T {
  return _.reduce(
    Array.from(formData.entries()),
    (result, [path, data]) => {
      const [key, value] = parseData(path, data, formData);

      _.set(result, key, value);
      return result;
    },
    {}
  ) as T;
}
