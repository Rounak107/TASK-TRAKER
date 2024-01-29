import React from "react";
import "./TodoList.css";
import { Todo } from "../../models/todo";
import TodoListItem from "../TodoListItem/TodoListItem";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  taskList: Todo[];
  setTaskList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ taskList, setTaskList }) => {
  return (
    <div className="container">
      <Droppable droppableId="UncompletedTasks">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "drag--active" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active tasks</span>
            {taskList
              .filter((task) => !task.isDone)
              .map((task, index) => (
                <TodoListItem
                  index={index}
                  key={task.id}
                  todo={task}
                  taskList={taskList}
                  setTaskList={setTaskList}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="CompletedTasks">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver ? "drag--remove" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Done tasks</span>
            {taskList
              .filter((task) => task.isDone)
              .map((task, index) => (
                <TodoListItem
                  index={index}
                  key={task.id}
                  todo={task}
                  taskList={taskList}
                  setTaskList={setTaskList}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
