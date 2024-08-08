/**
 * Obtiene una lista de tareas desde la API.
 *
 * @param page - El número de página a obtener. Por defecto es 1.
 * @returns Una Promesa que resuelve a las tareas obtenidas o un array vacío si ocurre un error.
 */
export async function fetchTareas(page: number = 1): Promise<any[]> {
  try {
    const response = await fetch(`https://api-tareas-nestjs.vercel.app/api/tarea?page=${page}`);
    if (!response.ok) {
      throw new Error('La respuesta de la red no fue correcta');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    return [];
  }
}

/**
 * Actualiza el estado de una tarea en la API.
 *
 * @param id - El ID de la tarea a actualizar.
 * @param estado - El nuevo estado de la tarea. Puede ser 'Pendiente' o 'Completada'.
 * @returns Una Promesa que resuelve a la tarea actualizada o rechaza con un error si ocurre un error.
 */
export async function updateTarea(id: string, estado: "Pendiente" | "Completada"): Promise<any> {
  try {
    const response = await fetch(`https://api-tareas-nestjs.vercel.app/api/tarea/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ estado }),
    });

    if (!response.ok) {
      throw new Error('La respuesta de la red no fue correcta');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al actualizar tarea:', error);
    throw error;
  }
}

/**
 * Crea una nueva tarea en la API.
 *
 * @param tarea - El objeto de tarea que contiene el título y la descripción.
 * @returns Una Promesa que resuelve a la tarea creada o null si ocurre un error.
 */
export async function createTarea(tarea: { titulo: string; descripcion: string }): Promise<any | null> {
  try {
      const response = await fetch('https://api-tareas-nestjs.vercel.app/api/tarea', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...tarea, estado: 'Pendiente' }),
      });
      if (!response.ok) {
          throw new Error('La respuesta de la red no fue correcta');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error al crear tarea:', error);
      return null;
  }
}

/**
* Elimina una tarea de la API.
*
* @param id - El ID de la tarea a eliminar.
* @returns Una Promesa que resuelve a la tarea eliminada o rechaza con un error si ocurre un error.
*/
export async function deleteTarea(id: string): Promise<any> {
try {
    const response = await fetch(`https://api-tareas-nestjs.vercel.app/api/tarea/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('La respuesta de la red no fue correcta');
    }
    return await response.json();
} catch (error) {
    console.error('Error al eliminar tarea:', error);
    throw error; 
}
}