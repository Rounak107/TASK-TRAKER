import React, { useState, useCallback } from "react";
import "./App.css";
import InputField from "../InputField/InputField";
import { Todo } from "../../models/todo";
import { v4 as uuidv4 } from "uuid";
import TodoList from "../TodoList/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { dataStorage } from "../../services/dataStorage";

const App: React.FC = () => {
  const [taskList, setTaskList] = useState<Todo[]>(
    dataStorage.getItem("taskList") ? dataStorage.getItem("taskList") : []
  );

  const handleAdd = useCallback(
    (e: React.FormEvent, taskText: string) => {
      e.preventDefault();
      const newTaskList = [
        ...taskList,
        { id: uuidv4(), todo: taskText, isDone: false },
      ];
      setTaskList(newTaskList);
      dataStorage.setItem("taskList", newTaskList);
    },
    [taskList]
  );

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let movingElement: Todo;
    if (source.droppableId === "UncompletedTasks") {
      movingElement = taskList.filter((task) => !task.isDone)[source.index];
      const taskListCopy = [
        ...taskList.filter((task) => task.id !== movingElement.id),
      ];
      if (destination.droppableId === "CompletedTasks") {
        movingElement.isDone = true;
      }
      taskListCopy.splice(destination.index, 0, movingElement);
      setTaskList(taskListCopy);
      dataStorage.setItem("taskList", taskListCopy);
    }
    if (source.droppableId === "CompletedTasks") {
      movingElement = taskList.filter((task) => task.isDone)[source.index];
      const taskListCopy = [
        ...taskList.filter((task) => task.id !== movingElement.id),
      ];
      if (destination.droppableId === "UncompletedTasks") {
        movingElement.isDone = false;
      }
      taskListCopy.splice(destination.index, 0, movingElement);
      setTaskList(taskListCopy);
      dataStorage.setItem("taskList", taskListCopy);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="App">
        <span className="heading">TASK TRACKER</span>
        <InputField handleAdd={handleAdd} />
        <TodoList taskList={taskList} setTaskList={setTaskList} />
      </div>
    </DragDropContext>
  );
};

export default App;
