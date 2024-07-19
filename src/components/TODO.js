import React, { useContext, useEffect, useState } from "react";
import Task from "./Task";
import { todoContext } from "../AppRoot";

function TODO() {
  const {
    tasks,
    setTasks,
    completedTasks,
    setCompletedTasks,
    pendingTasks,
    setPendingTasks,
    totalTasks,
    setTotalTasks,
  } = useContext(todoContext);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  function addTask(task) {
    try {
      const newTask = {
        id: tasks.length + 1, // Ensure unique ID
        title: task,
      };
      setTasks((prev) => [newTask, ...prev]);
      setTotalTasks(totalTasks + 1);
      setPendingTasks(pendingTasks + 1);

      fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
    } catch (error) {
      console.error(error.message);
    }
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
    setPendingTasks(pendingTasks - 1);
    setTotalTasks(totalTasks - 1);
  }

  return (
    <div className="App">
      <div className="main">
        <div className="dashboard">
          <p>Total Tasks: {totalTasks}</p>
          <p>Completed Tasks: {completedTasks}</p>
          <p>Pending Tasks: {pendingTasks}</p>
        </div>
        <div className="main-child">
          <div className="heading">
            <h1 className="poppins-regular">TO-DO LIST</h1>
          </div>
          <p className="paragraph">Get your to do list here...</p>

          <div className="form">
            <div></div>
            <div className="input-form">
              <div className="input-box">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleChange}
                  id="input-box1"
                />
              </div>
              <div id="button1">
                <input
                  type="submit"
                  value="Add Task"
                  className="add-task-button"
                  onClick={() => {
                    console.log(inputValue);
                    addTask(inputValue);
                  }}
                />
              </div>
            </div>
          </div>

          <ul id="myUL">
            {tasks.map((task) => (
              <Task key={task.id} task={task} deleteTask={deleteTask} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TODO;
