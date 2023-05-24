import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";

const Todos = (props) => {
  const [mainTitle] = useState("TODOS - TooFan");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const getTodos = async () => {
    props.setProgress(30);
    const url = `https://jsonplaceholder.typicode.com/todos`;
    let data = await fetch(url);
    props.setProgress(40);
    let allTodos = await data.json();
    props.setProgress(75);
    setTodos(allTodos);
    setLoading(false);
    props.setProgress(100);
  };
  useEffect(() => {
    getTodos();
    document.title = mainTitle;
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <h2 className="fw-bold" style={{ margin: "90px 0px 30px" }}>
        TOOFANI TODOS
      </h2>
      {loading && <Spinner />}

      <div className="list-group">
        {todos.map((todo) => {
          return (
            <label className="list-group-item" key={todo.id}>
              <input
                className="form-check-input me-1"
                type="checkbox"
                checked={todo.completed}
                value=""
                onChange={() => {}}
              />
              {todo.title}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default Todos;
