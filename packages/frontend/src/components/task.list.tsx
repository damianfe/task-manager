import { useEffect, useState } from "react";
import { Task } from "@/shared/task.interface";
import { getTasks, deleteTask, updateTask } from "@/services/tasks.service";
import TaskForm from "./task.form";

interface Props {
  refresh: boolean;
}

export default function TaskList({ refresh }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    loadTasks();
  }, [refresh]); // Se actualiza cuando cambie `refresh`

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleComplete = async (id: string, completed: boolean) => {
    await updateTask(id, { completed });
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed } : task)));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Lista de Tareas</h2>
      {editingTask && <TaskForm task={editingTask} onTaskSaved={() => setEditingTask(null)} />}
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center py-2">
            <span
              className={`text-lg cursor-pointer ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}
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
          </li>
        ))}
      </ul>
    </div>
  );
}
