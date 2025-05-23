import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskSection from "../components/TaskSection";
import AddTaskForm from "../components/AddTaskForm";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: "toDo" | "inProgress" | "completed";
};

export type Tasks = {
  toDo: Task[];
  inProgress: Task[];
  completed: Task[];
};

type ToDoListProps = {};

const ToDoList: React.FC<ToDoListProps> = ({}) => {
  const [tasks, setTasks] = useState<Tasks>({
    toDo: [
      { id: 1, title: "Task 1", description: "Description 1", status: "toDo" },
    ],
    inProgress: [],
    completed: [],
  });

  const moveTask = (
    taskId: number,
    oldStatus: keyof Tasks,
    newStatus: keyof Tasks
  ) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };

      const taskToMove = updatedTasks[oldStatus].find(
        (task) => task.id === taskId
      );
      if (taskToMove) {
        updatedTasks[oldStatus] = updatedTasks[oldStatus].filter(
          (task) => task.id !== taskId
        );

        const newTask = { ...taskToMove, status: newStatus };
        updatedTasks[newStatus] = [...updatedTasks[newStatus], newTask];
      }

      return updatedTasks;
    });
  };

  const editTask = (id: number, updatedTask: Partial<Task>) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };

      Object.keys(updatedTasks).forEach((status) => {
        updatedTasks[status as keyof Tasks] = updatedTasks[
          status as keyof Tasks
        ].map((task) => (task.id === id ? { ...task, ...updatedTask } : task));
      });

      return updatedTasks;
    });
  };

  const addTask = (title: string, description: string) => {
    setTasks((prevTasks) => {
      const newTask: Task = {
        id: Date.now(),
        title,
        description,
        status: "toDo",
      };

      return {
        ...prevTasks,
        toDo: [...prevTasks.toDo, newTask],
      };
    });
  };

  const areAllTasksEmpty = (tasks: Tasks): boolean => {
    return Object.values(tasks).every((taskArray) => taskArray.length === 0);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="ToDoListPage">
        <h1>To Do List</h1>

        <AddTaskForm onAddTask={addTask} />

        <div className="Body">
          {areAllTasksEmpty(tasks) ? (
            <p>No tasks available.</p>
          ) : (
            <>
              <TaskSection
                data-testid={`section-toDo`}
                title="To Do"
                tasks={tasks.toDo}
                status="toDo"
                moveTask={moveTask}
                onEdit={editTask}
              />

              <TaskSection
                data-testid={`section-inProgress`}
                title="In Progress"
                tasks={tasks.inProgress}
                status="inProgress"
                moveTask={moveTask}
                onEdit={editTask}
              />

              <TaskSection
                data-testid={`section-completed`}
                title="Completed"
                tasks={tasks.completed}
                status="completed"
                moveTask={moveTask}
                onEdit={editTask}
              />
            </>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default ToDoList;
