import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import TaskItem from "./TaskItem";
import { Task, Tasks } from "../pages/ToDoListPage";

type TaskSectionProps = {
  title: string;
  tasks: Task[];
  status: keyof Tasks;
  moveTask: (
    taskId: number,
    oldStatus: keyof Tasks,
    newStatus: keyof Tasks
  ) => void;
  onEdit: (id: number, updatedTask: Partial<Task>) => void;
};

const TaskSection: React.FC<TaskSectionProps & { "data-testid"?: string }> = ({
  title,
  tasks,
  status,
  moveTask,
  onEdit,
  "data-testid": dataTestId,
}) => {
  const ref = useRef<HTMLDivElement>(null); // Create a ref for the drop target

  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item: { id: number; oldStatus: keyof Tasks }) => {
      if (item.oldStatus !== status) {
        moveTask(item.id, item.oldStatus, status);
      }
    },
  });

  drop(ref); // Attach the drop functionality to the ref

  return (
    <div
      ref={ref} // Use the ref connected to the drop functionality
      className="TaskSection"
      data-testid={dataTestId || `section-${status}`}
      style={{ padding: "1rem", border: "1px solid #ccc", minHeight: "100px" }}
    >
      <h2>{title}</h2>

      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} status={status} onEdit={onEdit} />
      ))}

      <div className="TasksPlaceholder"></div>
    </div>
  );
};

export default TaskSection;
