import { motion } from "framer-motion";
import { FaTrash, FaEdit } from "react-icons/fa";

interface TaskItemProps {
  task: { id: string; title: string };
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onEdit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg"
    >
      <span className="text-lg">{task.title}</span>
      <div className="flex gap-2">
        <button onClick={() => onEdit(task.id)} className="text-blue-500 hover:text-blue-700">
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>
    </motion.div>
  );
};
