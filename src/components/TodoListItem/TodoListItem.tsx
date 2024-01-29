import React, { useState, useEffect, useRef } from "react";
import { Todo } from "../../models/todo";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./TodoListItem.css";
import { Draggable } from "react-beautiful-dnd";
import { dataStorage } from "../../services/dataStorage";

interface Props {
  index: number;
  todo: Todo;
  taskList: Todo[];
  setTaskList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoListItem: React.FC<Props> = ({
  index,
  todo,
  taskList,
  setTaskList,
}) => {
  const [editingValue, setEditingValue] = useState<string>(todo.todo);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number | string) => {
    const newTaskList = taskList.map((task) =>
      task.id === id ? { ...task, isDone: !task.isDone } : task
    );
    setTaskList(newTaskList);
    dataStorage.setItem("taskList", newTaskList);
  };

  const handleDelete = (id: number | string) => {
     const newTaskList = taskList.filter((task) => task.id !== id);
    setTaskList(newTaskList);
    dataStorage.setItem("taskList", newTaskList);
  };

  const handleEdit = (e: React.FormEvent, id: number | string) => {
    e.preventDefault();
    if (editingValue.length > 0) {
      const newTaskList = taskList.map((task) =>
        task.id === id ? { ...task, todo: editingValue } : task
      );
      setTaskList(newTaskList);
      dataStorage.setItem("taskList", newTaskList);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`item ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {isEditing ? (
            <input
              ref={inputRef}
              value={editingValue}
              onChange={(e) => setEditingValue(e.target.value)}
              className="header"
              placeholder={"Set task value..."}
            />
          ) : todo.isDone ? (
            <s className="header">{todo.todo}</s>
          ) : (
            <span className="header">{todo.todo}</span>
          )}

          <div>
            {!todo.isDone && (
              <span
                className="icon"
                onClick={() => {
                  if (!isEditing && !todo.isDone) {
                    setIsEditing(true);
                  }
                }}
              >
                <AiFillEdit />
              </span>
            )}
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            {!todo.isDone && (
              <span className="icon" onClick={() => handleDone(todo.id)}>
                <MdDone />
              </span>
            )}
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TodoListItem;
