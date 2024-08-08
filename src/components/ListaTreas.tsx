'use client'
import { useEffect, useState } from "react";
import { deleteTarea, fetchTareas, updateTarea } from "@/pages/api/api";
import { IoMdClose } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/router";
import { Pagination } from "./Pagination";

type EstadoTarea = "Pendiente" | "Completada";

/**
 * Componente que muestra y administra la lista de tareas.
 * Carga las tareas de la API, las muestra en una lista y permite actualizar o eliminar tareas.
 */
export const ListaTreas = () => {
    const [tareas, setTareas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const router = useRouter();

    useEffect(() => {
        async function loadTareas() {
            const data = await fetchTareas(page);
            setTareas(data);
            setLoading(false);
        }
        loadTareas();
    }, [page]);

    if (loading) return <ClipLoader color="#fff" />;

    const colors: Record<EstadoTarea, string[]> = {
        "Pendiente": [
            "bg-yellow-600",
            "bg-yellow-500",
            "bg-yellow-400",
        ],
        "Completada": [
            "bg-green-600",
            "bg-green-500",
            "bg-green-400",
        ],
    };

    /**
     * Obtiene el color de fondo para una tarea según su estado y el índice.
     * @param estado - El estado de la tarea.
     * @param index - El índice de la tarea en la lista.
     * @returns El nombre de la clase CSS para el color de fondo.
     */
    const getBackgroundColor = (estado: EstadoTarea, index: number) => {
        const backgroundColors = colors[estado] || [
            "bg-emerald-600",
            "bg-emerald-500",
            "bg-emerald-400",
        ];
        return backgroundColors[index % backgroundColors.length];
    };

    /**
     * Actualiza el estado de una tarea a "Completada".
     * @param id - El ID de la tarea a actualizar.
     */
    const handleUpdateTarea = async (id: string) => {
        try {
            await updateTarea(id, "Completada");
            const updatedTareas = await fetchTareas(page);
            setTareas(updatedTareas);
        } catch (error) {
            console.error('Error updating tarea:', error);
        }
    };

    /**
     * Elimina una tarea de la lista.
     * @param id - El ID de la tarea a eliminar.
     */
    const handleDeleteTarea = async (id: string) => {
        try {
            await deleteTarea(id);
            // Refrescar la lista de tareas después de la eliminación
            router.push('/');
        } catch (error) {
            console.error('Error deleting tarea:', error);
        }
    };

    return (
        <section className="w-1/2">
            <ul>
                {tareas.map((tarea, index) => (
                    <li 
                        key={tarea._id}
                        onClick={() => handleUpdateTarea(tarea._id)}
                        className={`p-2 m-4 rounded ${getBackgroundColor(tarea.estado as EstadoTarea, index)} flex justify-between items-center hover:cursor-pointer`}>
                        <div>
                            <h3 className="text-base capitalize font-bold">{tarea.titulo}</h3>
                            <p className="text-sm">{tarea.descripcion}</p>
                        </div>
                        <IoMdClose 
                            onClick={() => handleDeleteTarea(tarea._id)} 
                            className="text-zinc-700 text-2xl hover:cursor-pointer hover:text-zinc-900 hover:font-bold"
                        />
                    </li>
                ))}
            </ul>
            <Pagination currentPage={page} setPage={setPage} />
        </section>
    );
};
