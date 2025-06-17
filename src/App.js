import React, { useState } from "react";
import { nanoid } from "nanoid"; // nanoid는 고유한 ID를 생성하는 라이브러리
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

// 이렇게 함수 외부에 정의되어 있으면, 렌더링 될 때마다 초기화됨
const FILTER_MAP = {
  All: () => true, // 모든 목록
  Active: (task) => !task.completed, // 아직 체크 안 한 것
  Completed: (task) => task.completed, // 체크한 것
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, compleated: false };
    setTasks([...tasks, newTask]); // Spread syntax
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // task.id가 id와 같으면 completed를 반전시키고, 아니면 그대로 반환
      if (task.id === id) {
        return { ...task, completed: !task.completed }; // Spread syntax로 기존 task를 복사하고 completed만 반전
      }
      return task; // task.id가 id와 다르면 그대로 반환
    });
    setTasks(updatedTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName }; // Spread syntax로 기존 task를 복사하고 name만 변경
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  function deleteTask(id) {
    // find()를 사용하지 않는 이유
    // 삭제하고 남은 목록을 만들기 위해서임
    const remainingTasks = tasks.filter((task) => task.id !== id);
    setTasks(remainingTasks);
  }

  // filter()가 콜백 함수를 정하기 위해 FILTER_MAP 값에 접근
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        complete={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));
  // Key는 React가 관리하는 특별한 속성 (고유 해야함)

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="todoapp stack-large">{filterList}</div>
      <h2 id="list-heading">{headingText}</h2>
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
