import { useState } from "react";
import { Task } from "@/shared/task.interface";
import { createTask, updateTask } from "@/services/tasks.service";
import toast from "react-hot-toast";

interface Props {
  task?: Task;
  onTaskSaved: () => void;
}

export default function TaskForm({ task, onTaskSaved }: Props) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (task) {
        await updateTask(task.id, { title, description });
        toast.success("Tarea actualizada correctamente ✅");
      } else {
        await createTask({ title, description });
        toast.success("Tarea creada con éxito 🎉");
      }
      onTaskSaved();
    } catch {
      toast.error("Hubo un error al guardar la tarea ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{task ? "Editar Tarea" : "Nueva Tarea"}</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        className="w-full p-2 border border-gray-300 rounded-md mb-3 focus:ring-2 focus:ring-blue-500"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
        className="w-full p-2 border border-gray-300 rounded-md mb-3 focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all"
      >
        {task ? "Actualizar" : "Agregar"}
      </button>
    </form>
  );
}
