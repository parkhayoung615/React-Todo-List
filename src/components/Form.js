// 이렇게 import하는 이유 : React의 JSX 문법을 사용하기 위해서
import React, { useState } from "react";

function Form(props) {
  const [name, setName] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.addTask(name);
    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}
// Form이라는 이름으로 내보냈지만 원하는 이름으로 import할 수 있다.
// import할 때 중괄호 없이 가능하다.
// 이 모듈 안에 개체가 하나만 있다면 export default를 사용한다
// 만약 여러 개라면 named export를 사용해야 한다.
export default Form;
