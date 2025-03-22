import { useState } from "react";
import TaskList from "@/components/task.list";
import TaskForm from "@/components/task.form";

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Gestor de Tareas</h1>
      <TaskForm onTaskSaved={() => setRefresh(!refresh)} />
      <TaskList refresh={refresh} />
    </div>
  );
}
