import React, { useState, useRef } from "react";
import { useDrag } from "react-dnd";
import { Task } from "../pages/ToDoListPage";

type TaskItemProps = {
  task: Task;
  status: "toDo" | "inProgress" | "completed";
  onEdit: (id: number, updatedTask: Partial<Task>) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, status, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const ref = useRef<HTMLDivElement>(null); // Create a ref for drag-and-drop

  const [, drag] = useDrag({
    type: "TASK",
    item: { id: task.id, oldStatus: status },
    canDrag: () => !isEditing, // Disable drag when editing
  });

  drag(ref); // Attach the drag functionality to the ref

  const handleSave = () => {
    onEdit(task.id, { title: editTitle, description: editDescription });
    setIsEditing(false);
  };

  return (
    <div
      ref={ref}
      data-testid={`taskitem-${task.title}`}
      className={`TaskItem ${isEditing ? " Editing" : ""}`}
      style={{
        cursor: isEditing ? "default" : "move", // Change cursor based on editing state
      }}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Edit title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Edit description"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
