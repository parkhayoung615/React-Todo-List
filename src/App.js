import React, { useState } from "react";
import { nanoid } from "nanoid"; // nanoid는 고유한 ID를 생성하는 라이브러리
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

export default function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, compleated: false };
    setTasks([...tasks, newTask]); // Spread syntax
  }

  const taskList = tasks.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      complete={task.completed}
      key={task.id}
    />
  ));
  // Key는 React가 관리하는 특별한 속성 (고유 해야함)

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="todoapp stack-large">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">3 tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}
