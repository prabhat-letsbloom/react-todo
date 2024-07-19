import React, { createContext, useState, useEffect } from "react";
import App from "./App";

export const todoContext = createContext();

function AppRoot() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTask] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);

  var pending = 0;
  var completed = 0;

  useEffect(() => {
    getTasksFromAPI();
  }, []);

  async function getTasksFromAPI() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setTasks(json);
      json.forEach((element) => {
        if (element.completed === true) {
          completed = completed + 1;
        } else {
          pending = pending + 1;
        }
      });
      console.log("completed: " + completed);
      console.log("pending: " + pending);
      setCompletedTask(completed);
      setPendingTasks(pending);
      setTotalTasks(pending + completed);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <todoContext.Provider
      value={{
        tasks,
        setTasks,
        completedTasks,
        setCompletedTask,
        pendingTasks,
        setPendingTasks,
        totalTasks,
        setTotalTasks,
      }}
    >
      <App />
    </todoContext.Provider>
  );
}

export default AppRoot;
