import React from "react";

function Task(props) {
  return (
    <li>
      <p>{props.task.title}</p>
      <button
        className="delete-task-btn"
        onClick={() => props.deleteTask(props.task.id)}
      >
        Delete
      </button>
    </li>
  );
}

export default Task;
