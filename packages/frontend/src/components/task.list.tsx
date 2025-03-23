import { useEffect, useState } from "react";
import { Task } from "@/shared/task.interface";
import { getTasks, deleteTask, updateTask } from "@/services/tasks.service";
import TaskForm from "./task.form";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  refresh: number;
}

export default function TaskList({ refresh }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  useEffect(() => {
    const loadTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    loadTasks();
  }, [refresh]);

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleComplete = async (id: string, completed: boolean) => {
    await updateTask(id, { completed });
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed } : task)));
  };

  // Filtrar tareas según el estado
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Lista de Tareas</h2>

      {editingTask && <TaskForm task={editingTask} onTaskSaved={() => setEditingTask(null)} />}

      {/* Filtros */}
      <div className="flex justify-center gap-3 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded ${filter === "completed" ? "bg-green-500 text-white" : "bg-gray-200"}`}
        >
          Completadas
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded ${filter === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
        >
          Pendientes
        </button>
      </div>

      <ul className="divide-y divide-gray-200">
        <AnimatePresence>
          {filteredTasks.map((task) => (
            <motion.li
              key={task.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`flex justify-between items-center py-2 ${task.completed ? "bg-green-100" : "bg-white"
                }`}
            >
              <span
                className={`text-lg cursor-pointer ${task.completed ? "line-through text-gray-500" : "text-gray-800"
                  }`}
                onClick={() => handleComplete(task.id, !task.completed)}
              >
                {task.title}
              </span>
              <div className="flex gap-2">
                <button onClick={() => setEditingTask(task)} className="text-blue-500 hover:text-blue-700">
                  ✏
                </button>
                <button onClick={() => handleDelete(task.id)} className="text-red-500 hover:text-red-700">
                  🗑
                </button>
              </div>
            </motion.li>

          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
