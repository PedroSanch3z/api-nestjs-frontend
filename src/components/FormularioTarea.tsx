'use client'
import { createTarea } from '@/pages/api/api';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

/**
 * Componente de formulario para crear nuevas tareas.
 * Incluye un campo de texto para el título y un área de texto para la descripción.
 * Al enviar el formulario, se llama a la función `createTarea` para guardar la tarea en la base de datos.
 * Muestra un mensaje de éxito o error según el resultado de la operación.
 */
export const FormularioTarea = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      setLoading(true);
      const newTarea = { titulo, descripcion };
      const result = await createTarea(newTarea);

      if (result) {
          // Limpiar el formulario y manejar el éxito (opcional)
          setTitulo('');
          setDescripcion('');
          alert('Tarea creada con éxito')
          router.reload()
          setLoading(false)
      } else {
          // Manejar el error (opcional)
          alert('Error al crear la tarea');
      }
  };
  return (
    <div className='w-1/2 h-auto'>
      <div className='relative mx-auto max-w-xl'>
        <div className='text-center'>
          <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 dark:text-slate-200 sm:text-4xl'>
            Frontend tareas
          </h2>
          <p className='mt-4 text-lg leading-6 text-gray-500 dark:text-slate-400'>
            Crea, edita y elimina tareas.
          </p>
        </div>
        <div className='mt-12'>
          <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8'>
            <div className='sm:col-span-2'>
              <label htmlFor="titulo" className='block text-sm font-medium text-gray-700 dark:text-slate-400'>Titulo</label>
              <div className='mt-1'>
                <input 
                  type="text"
                  id="titulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className='border border-gray-300 block w-full rounded-md py-3 px-4 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-white/5 dark:bg-slate-700/50 dark:text-white' />
              </div>
            </div>
            <div className='sm:col-span-2'>
              <label htmlFor="descripcion" className='block text-sm font-medium text-gray-700 dark:text-slate-400'>descripcion</label>
              <div className="mt-1">
                <textarea 
                  name="descripcion" 
                  id="descripcion" 
                  rows={5}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="border border-gray-300 block w-full rounded-md py-3 px-4 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-white/5 dark:bg-slate-700/50 dark:text-white"></textarea>
              </div>
            </div>
            <div className="flex justify-end sm:col-span-2">
              <button 
                type="submit"
                disabled={loading}
                className="inline-flex items-center rounded-md px-4 py-2 font-medium focus:outline-none focus-visible:ring focus-visible:ring-sky-500 shadow-sm sm:text-sm transition-colors duration-75 text-sky-500 border border-sky-500 hover:bg-sky-50 active:bg-sky-100 disabled:bg-sky-100 dark:hover:bg-gray-900 dark:active:bg-gray-800 dark:disabled:bg-gray-800 disabled:cursor-not-allowed">
                 <span>{loading ? 'Guardando...' : 'Guardar tarea'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
