import { useState, useCallback } from "react";
import TaskList from "@/components/task.list";
import TaskForm from "@/components/task.form";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const [refresh, setRefresh] = useState(0);

  const handleRefresh = useCallback(() => {
    setRefresh((prev) => prev + 1);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen py-10 bg-gray-100 text-gray-900">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-3xl font-bold mb-6"
      >
        Gestor de Tareas
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
      >
        <TaskForm onTaskSaved={handleRefresh} />
        <TaskList refresh={refresh} />
      </motion.div>
    </div>
  );
}
